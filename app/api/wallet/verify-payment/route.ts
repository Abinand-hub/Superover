import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import Transaction from '@/models/Transaction'; // I will create this or use User for transactions if Transaction model doesn't exist. Wait, the frontend expects transactions!
// Actually, I don't have a Transaction model yet. I should check if there is one!
// Let me write the basic verification first and check the Transaction model.

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_dev_key';

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !amount) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // Verify signature
    const generated_signature = crypto
      .createHmac('sha256', secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generated_signature !== razorpay_signature) {
      return NextResponse.json({ error: 'Payment verification failed' }, { status: 400 });
    }

    await connectToDatabase();
    
    // Update user wallet
    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    user.wallet.depositBalance += amount;
    await user.save();

    // Create a transaction record
    const newTx = await Transaction.create({
      userId: user._id,
      type: 'DEPOSIT',
      amount: amount,
      status: 'SUCCESS',
      referenceId: razorpay_payment_id,
    });
    
    return NextResponse.json({
      success: true,
      wallet: user.wallet,
      transaction: {
        id: newTx._id,
        userId: user._id,
        type: newTx.type,
        amount: newTx.amount,
        status: newTx.status,
        timestamp: newTx.createdAt.toISOString(),
        description: `Added via UPI (Razorpay)`,
        referenceId: newTx.referenceId
      }
    });

  } catch (error) {
    console.error('Verify Payment Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
