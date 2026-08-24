import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    
    const user = await User.findOneAndUpdate(
      { email: 'abinand720@gmail.com' },
      { $set: { role: 'ADMIN' } },
      { new: true }
    );

    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
