import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import connectToDatabase from '@/lib/mongodb';
import Transaction from '@/models/Transaction';
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
    
    // Fetch transactions
    const transactions = await Transaction.find({ userId: decoded.userId }).sort({ createdAt: -1 });

    // Map to frontend format
    const mappedTransactions = transactions.map((tx) => ({
      id: tx._id,
      userId: tx.userId,
      type: tx.type,
      amount: tx.amount,
      status: tx.status,
      timestamp: tx.createdAt.toISOString(),
      description: getTransactionDescription(tx.type, tx.referenceId),
      referenceId: tx.referenceId
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
      return 'Entry Fee for Match';
    case 'PAYOUT':
      return 'Winnings Payout';
    case 'BONUS':
      return 'Promotional Bonus';
    case 'FREE_HIT_FEE':
      return 'Free Hit Token Used';
    default:
      return 'Wallet Transaction';
  }
}
