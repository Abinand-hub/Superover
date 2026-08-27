import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import Slip from '@/models/Slip';
import Transaction from '@/models/Transaction';
import mongoose from 'mongoose';

export const dynamic = 'force-dynamic';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    
    // Await params as per Next.js 15+ dynamic route requirements
    const { id } = await params;
    
    // Fetch User, Slips, and Transactions concurrently
    const [user, slipsRaw, transactionsRaw] = await Promise.all([
      User.findOne(mongoose.Types.ObjectId.isValid(id) ? { _id: id } : { id: id }).lean(),
      Slip.find({ userId: id }).sort({ submittedAt: -1 }).lean(),
      Transaction.find({ userId: id }).sort({ createdAt: -1 }).lean()
    ]);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Format Slips
    const slips = slipsRaw.map((s: any) => ({
      ...s,
      id: s._id.toString()
    }));

    // Format Transactions
    const transactions = transactionsRaw.map((tx: any) => ({
      ...tx,
      id: tx._id.toString(),
      timestamp: tx.createdAt?.toISOString() || new Date().toISOString(),
      description: tx.description || `${tx.type} transaction`
    }));

    return NextResponse.json({
      user: {
        ...user,
        id: (user as any)._id?.toString() || id
      },
      slips,
      transactions
    });
  } catch (error: any) {
    console.error('Fetch User Details Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const data = await req.json();

    const user = await User.findOne(mongoose.Types.ObjectId.isValid(id) ? { _id: id } : { id: id });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (data.action === 'BLOCK') {
      user.isBlocked = true;
    } else if (data.action === 'UNBLOCK') {
      user.isBlocked = false;
    }

    await user.save();
    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    console.error('Update User Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
