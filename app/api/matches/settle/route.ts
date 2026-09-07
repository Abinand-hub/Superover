import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import { executeMatchSettlement } from '@/lib/settlementEngine';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_dev_key';

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value || cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    if (decoded.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await connectToDatabase();

    const body = await req.json();
    const { matchId, picks, summary } = body;

    const result = await executeMatchSettlement(matchId, picks, summary);

    return NextResponse.json({
      success: true,
      message: `Match settled successfully. ${result.slipsEvaluated} slips evaluated, ${result.payoutsCount} winning payouts distributed.`,
      result
    });

  } catch (error: any) {
    console.error('Settle Match Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
