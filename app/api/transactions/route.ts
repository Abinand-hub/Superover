import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import connectToDatabase from '@/lib/mongodb';
import Transaction from '@/models/Transaction';
import Slip from '@/models/Slip';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_dev_key';

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;

    await connectToDatabase();
    
    // Auto-reconcile any won slips that don't have a transaction yet
    try {
      const wonSlips = await Slip.find({
        userId: decoded.userId,
        status: 'WON',
        payoutAmount: { $gt: 0 }
      });

      for (const s of wonSlips) {
        const existingTx = await Transaction.findOne({
          userId: decoded.userId,
          referenceId: String(s._id)
        });

        if (!existingTx) {
          await Transaction.create({
            userId: decoded.userId,
            type: 'CONTEST_PAYOUT',
            amount: s.payoutAmount,
            status: 'SUCCESS',
            referenceId: String(s._id),
            description: `Won ${s.multiplierWon || 0.5}X Cash Prize for ${s.matchTitle || 'Contest'} (${s.streakCount || 3}/6 Streak)`
          });
        }
      }
    } catch (reconcileErr) {
      console.warn('Transaction reconciliation warning:', reconcileErr);
    }

    // Fetch transactions
    const transactions = await Transaction.find({ userId: decoded.userId }).sort({ createdAt: -1 });

    // Map to frontend format
    const mappedTransactions = transactions.map((tx) => ({
      id: String(tx._id),
      userId: String(tx.userId),
      type: tx.type,
      amount: tx.amount,
      status: tx.status,
      timestamp: tx.createdAt.toISOString(),
      description: tx.description || getTransactionDescription(tx.type, tx.referenceId),
      referenceId: tx.referenceId || String(tx._id)
    }));

    return NextResponse.json(mappedTransactions);

  } catch (error) {
    console.error('Fetch Transactions Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

function getTransactionDescription(type: string, refId?: string) {
  switch (type) {
    case 'DEPOSIT':
      return 'Added via UPI';
    case 'WITHDRAWAL':
      return 'Withdrawn to Bank/UPI';
    case 'ENTRY_FEE':
    case 'CONTEST_ENTRY':
      return 'Entry Fee for Match';
    case 'PAYOUT':
    case 'CONTEST_PAYOUT':
      return 'Contest Cash Winnings Credited';
    case 'BONUS':
    case 'BONUS_REWARD':
      return 'Promotional Bonus Cash';
    case 'FREE_HIT_FEE':
      return 'Free Hit Token Used';
    default:
      return 'Wallet Transaction';
  }
}
