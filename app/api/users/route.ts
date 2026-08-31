import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectToDatabase();
    
    // Aggregate users with their transaction and slip data
    const users = await User.aggregate([
      {
        $lookup: {
          from: 'transactions',
          localField: '_id',
          foreignField: 'userId',
          as: 'transactions'
        }
      },
      {
        $lookup: {
          from: 'slips',
          localField: '_id',
          foreignField: 'userId',
          as: 'slips'
        }
      },
      {
        $addFields: {
          totalDeposits: {
            $sum: {
              $map: {
                input: {
                  $filter: {
                    input: '$transactions',
                    as: 'tx',
                    cond: { $in: ['$$tx.type', ['DEPOSIT', 'ADMIN_BONUS']] }
                  }
                },
                as: 'deposit',
                in: '$$deposit.amount'
              }
            }
          },
          totalWithdrawals: {
            $sum: {
              $map: {
                input: {
                  $filter: {
                    input: '$transactions',
                    as: 'tx',
                    cond: { $eq: ['$$tx.type', 'PAYOUT'] }
                  }
                },
                as: 'withdrawal',
                in: '$$withdrawal.amount'
              }
            }
          },
          totalContestsPlayed: { $size: '$slips' },
          joinedDate: { $ifNull: ['$joinedDate', '$createdAt'] },
          dateJoined: { $ifNull: ['$createdAt', '$joinedDate'] },
          avatar: {
            $ifNull: [
              '$avatar',
              {
                $concat: [
                  'https://ui-avatars.com/api/?name=',
                  '$name',
                  '&background=FF6B00&color=fff&bold=true'
                ]
              }
            ]
          },
          currentBalance: {
            $add: [
              { $ifNull: ['$wallet.depositBalance', 0] },
              { $ifNull: ['$wallet.winningsBalance', 0] },
              { $ifNull: ['$wallet.bonusBalance', 0] }
            ]
          }
        }
      },
      {
        $project: {
          transactions: 0,
          slips: 0,
          password: 0
        }
      },
      { $sort: { dateJoined: -1 } }
    ]);
    
    // Map _id to id for frontend consistency
    const mappedUsers = users.map((u: any) => ({
      ...u,
      id: u._id.toString(),
      joinedDate: u.joinedDate || u.createdAt,
      dateJoined: u.dateJoined || u.createdAt,
      avatar: u.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name || 'User')}&background=FF6B00&color=fff&bold=true`
    }));

    return NextResponse.json(mappedUsers);
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
