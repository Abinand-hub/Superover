import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import Transaction from '@/models/Transaction';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_dev_key';

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    
    // Get token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const userId = decoded.userId;

    const body = await req.json();
    const { amount, method } = body;

    if (!amount || amount < 5) {
      return NextResponse.json({ error: 'Minimum deposit is ₹5' }, { status: 400 });
    }

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Update wallet balance
    user.wallet.depositBalance += amount;
    await user.save();

    // Create transaction record
    const transaction = await Transaction.create({
      userId: user._id,
      type: 'DEPOSIT',
      amount: amount,
      status: 'SUCCESS',
      description: `Added cash via ${method}`,
      paymentMethod: method,
      referenceId: `UPI-DEP-${Date.now().toString().slice(-6)}`,
    });

    return NextResponse.json({ 
      success: true, 
      wallet: user.wallet,
      transaction 
    });
  } catch (error: any) {
    console.error('Wallet Deposit Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
