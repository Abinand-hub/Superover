import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import connectToDatabase from '@/lib/mongodb';
import Transaction from '@/models/Transaction';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_dev_key';

export async function POST(req: Request) {
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

    const body = await req.json();
    const { action, transactionId, utrNumber, reason } = body;

    if (!transactionId) {
      return NextResponse.json({ error: 'Transaction ID is required' }, { status: 400 });
    }

    await connectToDatabase();

    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      return NextResponse.json({ error: 'Withdrawal transaction not found' }, { status: 404 });
    }

    if (transaction.type !== 'WITHDRAWAL') {
      return NextResponse.json({ error: 'Invalid transaction type' }, { status: 400 });
    }

    if (transaction.status !== 'PENDING') {
      return NextResponse.json({ error: `Transaction is already ${transaction.status}` }, { status: 400 });
    }

    const user = await User.findById(transaction.userId);
    if (!user) {
      return NextResponse.json({ error: 'Associated user not found' }, { status: 404 });
    }

    if (action === 'APPROVE') {
      const finalUtr = utrNumber?.trim() || `IMPS${Date.now().toString().slice(-8)}`;
      transaction.status = 'SUCCESS';
      transaction.referenceId = finalUtr;
      transaction.description = `Withdrawn to ${transaction.paymentMethod || 'UPI'} - Dispatched & Approved by Admin (UTR: ${finalUtr})`;
      await transaction.save();

      return NextResponse.json({
        success: true,
        message: `Withdrawal of ₹${transaction.amount} approved with UTR: ${finalUtr}`,
        transaction: {
          id: String(transaction._id),
          status: 'SUCCESS',
          referenceId: finalUtr,
        }
      });
    } else if (action === 'REJECT') {
      const rejectReason = reason?.trim() || 'Verification or UPI issue';
      transaction.status = 'REJECTED';
      transaction.description = `Withdrawal Rejected (${rejectReason}) - ₹${transaction.amount} Refunded to Winnings`;
      await transaction.save();

      // Refund the amount back to user's winningsBalance
      user.wallet.winningsBalance += transaction.amount;
      await user.save();

      // Create an explicit Refund Transaction for transparency
      await Transaction.create({
        userId: user._id,
        type: 'PAYOUT',
        amount: transaction.amount,
        status: 'SUCCESS',
        referenceId: `REFUND-${transaction.referenceId || String(transaction._id).slice(-6)}`,
        description: `Refund: ₹${transaction.amount} returned to winnings balance (${rejectReason})`,
      });

      return NextResponse.json({
        success: true,
        message: `Withdrawal rejected and ₹${transaction.amount} refunded to user's winnings balance.`,
        transaction: {
          id: String(transaction._id),
          status: 'REJECTED',
        }
      });
    } else {
      return NextResponse.json({ error: 'Invalid action. Must be APPROVE or REJECT' }, { status: 400 });
    }

  } catch (error: any) {
    console.error('Admin Withdrawal Action Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
