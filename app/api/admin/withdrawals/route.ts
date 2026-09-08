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
    if (decoded.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    await connectToDatabase();

    // Fetch all withdrawal transactions with user info
    const withdrawals = await Transaction.find({ type: 'WITHDRAWAL' })
      .populate('userId', 'name phone email refId wallet totalWon')
      .sort({ createdAt: -1 });

    const users = await User.find({}, 'wallet');
    const totalPlatformWinningsLiability = users.reduce((sum, u) => sum + (u.wallet?.winningsBalance || 0), 0);
    const totalPlatformDepositLiability = users.reduce((sum, u) => sum + (u.wallet?.depositBalance || 0), 0);

    const pendingWithdrawals = withdrawals.filter(w => w.status === 'PENDING');
    const completedWithdrawals = withdrawals.filter(w => w.status === 'SUCCESS');
    const totalDisbursed = completedWithdrawals.reduce((sum, w) => sum + (w.amount || 0), 0);
    const totalPendingAmount = pendingWithdrawals.reduce((sum, w) => sum + (w.amount || 0), 0);

    const mapped = withdrawals.map((tx: any) => {
      const u = tx.userId || {};
      return {
        id: String(tx._id),
        userId: String(u._id || tx.userId),
        userName: u.name || 'Unknown User',
        userPhone: u.phone || 'N/A',
        userEmail: u.email || 'N/A',
        userRefId: u.refId || 'N/A',
        userWinningsBalance: u.wallet?.winningsBalance || 0,
        userTotalWon: u.totalWon || 0,
        type: tx.type,
        amount: tx.amount,
        status: tx.status,
        timestamp: tx.createdAt.toISOString(),
        description: tx.description,
        paymentMethod: tx.paymentMethod || 'UPI',
        referenceId: tx.referenceId || String(tx._id),
      };
    });

    return NextResponse.json({
      success: true,
      withdrawals: mapped,
      treasury: {
        totalPlatformWinningsLiability,
        totalPlatformDepositLiability,
        totalDisbursed,
        totalPendingAmount,
        pendingCount: pendingWithdrawals.length,
        completedCount: completedWithdrawals.length,
      }
    });

  } catch (error: any) {
    console.error('Admin Withdrawals GET Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
