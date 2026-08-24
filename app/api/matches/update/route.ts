import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import connectToDatabase from '@/lib/mongodb';
import Match from '@/models/Match';
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
    
    await connectToDatabase();
    
    // Verify admin
    const admin = await User.findById(decoded.userId);
    if (!admin || admin.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await req.json();
    
    // Body should be the updated match object
    const matchId = body.id || body._id;
    if (!matchId) {
       return NextResponse.json({ error: 'Match ID required' }, { status: 400 });
    }

    const updatedMatch = await Match.findByIdAndUpdate(matchId, { $set: body }, { new: true });
    
    if (!updatedMatch) {
       return NextResponse.json({ error: 'Match not found' }, { status: 404 });
    }

    return NextResponse.json(updatedMatch);

  } catch (error) {
    console.error('Update Match Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
