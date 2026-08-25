import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

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
    
    const user = await User.findById(decoded.userId).lean();
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      id: user._id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      role: user.role,
      wallet: user.wallet,
      kycStatus: user.kycStatus || 'PENDING',
      isBlocked: user.isBlocked || false,
      joinedDate: user.joinedDate || new Date().toISOString().split('T')[0],
      dailyDepositLimit: user.dailyDepositLimit || 10000,
      totalContestsJoined: user.totalContestsJoined || 0,
      totalWon: user.totalWon || 0,
      avatar: user.avatar || `https://api.dicebear.com/9.x/avataaars/svg?seed=${user.name}&backgroundColor=FF6B00`,
    });
  } catch (error: any) {
    console.error('Fetch Current User Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
