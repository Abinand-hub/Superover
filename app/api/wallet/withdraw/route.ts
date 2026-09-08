import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import Transaction from '@/models/Transaction';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_dev_key';

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized. Please login.' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const body = await req.json();
    const { amount, upiId } = body;

    const withdrawAmount = Number(amount);

    if (isNaN(withdrawAmount) || withdrawAmount < 5) {
      return NextResponse.json({ error: 'Minimum withdrawal amount is ₹5' }, { status: 400 });
    }

    if (!upiId || typeof upiId !== 'string' || !upiId.includes('@')) {
      return NextResponse.json({ error: 'Please enter a valid UPI ID (e.g., name@okaxis)' }, { status: 400 });
    }

    await connectToDatabase();

    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const currentWinnings = user.wallet?.winningsBalance || 0;
    if (currentWinnings < withdrawAmount) {
      return NextResponse.json({ 
        error: `Insufficient winnings balance. Available: ₹${currentWinnings}` 
      }, { status: 400 });
    }

    // Deduct from winnings
    user.wallet.winningsBalance -= withdrawAmount;
    await user.save();

    // High-value threshold: >= ₹2000 requires admin review, or can be flagged as PENDING
    const isHighValue = withdrawAmount >= 2000;
    const txStatus = isHighValue ? 'PENDING' : 'PENDING'; // Kept in PENDING queue for admin real-money payout verification
    const refCode = `WDR-UPI-${Date.now().toString().slice(-6)}`;

    const transaction = await Transaction.create({
      userId: user._id,
      type: 'WITHDRAWAL',
      amount: withdrawAmount,
      status: txStatus,
      paymentMethod: `UPI: ${upiId.trim()}`,
      referenceId: refCode,
      description: isHighValue 
        ? `High-Value Withdrawal to UPI (${upiId.trim()}) - Under Admin Review`
        : `Withdrawal to UPI (${upiId.trim()}) - Processing Instant UPI Payout`,
    });

    const mappedTx = {
      id: String(transaction._id),
      userId: String(transaction.userId),
      type: transaction.type,
      amount: transaction.amount,
      status: transaction.status,
      timestamp: transaction.createdAt.toISOString(),
      description: transaction.description,
      paymentMethod: transaction.paymentMethod,
      referenceId: transaction.referenceId,
    };

    const mappedWallet = {
      depositBalance: user.wallet.depositBalance,
      winningsBalance: user.wallet.winningsBalance,
      bonusBalance: user.wallet.bonusBalance,
      totalBalance: user.wallet.depositBalance + user.wallet.winningsBalance + user.wallet.bonusBalance,
      kycVerified: user.kycVerified,
      upiId: upiId.trim(),
    };

    return NextResponse.json({
      success: true,
      message: isHighValue
        ? `Withdrawal request for ₹${withdrawAmount} submitted for high-value admin verification.`
        : `Withdrawal request for ₹${withdrawAmount} placed successfully.`,
      wallet: mappedWallet,
      transaction: mappedTx,
    });

  } catch (error: any) {
    console.error('Withdrawal API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
