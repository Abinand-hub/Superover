import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import Slip from '@/models/Slip';
import Transaction from '@/models/Transaction';

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
    
    // Verify user exists
    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (!user.wallet) {
      user.wallet = { depositBalance: 0, winningsBalance: 0, bonusBalance: 0 };
    }

    // Return the formatted wallet
    const walletData = {
      depositBalance: user.wallet.depositBalance || 0,
      winningsBalance: user.wallet.winningsBalance || 0,
      bonusBalance: user.wallet.bonusBalance || 0,
      totalBalance: (user.wallet.depositBalance || 0) + (user.wallet.winningsBalance || 0) + (user.wallet.bonusBalance || 0),
      kycVerified: user.kycVerified || false,
      upiId: user.phone ? `${user.phone}@okaxis` : ''
    };

    return NextResponse.json(walletData);

  } catch (error) {
    console.error('Fetch Wallet Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
