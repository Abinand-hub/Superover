import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectToDatabase();
    
    // Aggregate users (excluding admin) with their transaction and slip data
    const users = await User.aggregate([
      {
        $match: {
          role: { $ne: 'ADMIN' },
          phone: { $ne: '9999999999' },
          name: { $not: /admin/i }
        }
      },
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
                    cond: { $eq: ['$$tx.type', 'DEPOSIT'] }
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
                    cond: { $in: ['$$tx.type', ['WITHDRAWAL', 'PAYOUT']] }
                  }
                },
                as: 'withdrawal',
                in: '$$withdrawal.amount'
              }
            }
          },
          totalWon: {
            $sum: {
              $map: {
                input: {
                  $filter: {
                    input: '$slips',
                    as: 'slip',
                    cond: { $eq: ['$$slip.status', 'WON'] }
                  }
                },
                as: 'wonSlip',
                in: { $ifNull: ['$$wonSlip.payoutAmount', 0] }
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
                  'https://api.dicebear.com/9.x/avataaars/svg?seed=',
                  '$name',
                  '&backgroundColor=FF6B00'
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
      avatar: u.avatar || `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(u.name || u.phone || 'User')}&backgroundColor=FF6B00`
    }));

    return NextResponse.json(mappedUsers);
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
