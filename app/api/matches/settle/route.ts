import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import connectToDatabase from '@/lib/mongodb';
import Match from '@/models/Match';
import { executeMatchSettlement } from '@/lib/settlementEngine';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_dev_key';

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value || cookieStore.get('auth_token')?.value;

    let isAdmin = false;
    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        if (decoded.role === 'ADMIN') {
          isAdmin = true;
        }
      } catch (e) {
        // Token decode issue
      }
    }

    // Also accept admin requests in development / demo mode
    if (!isAdmin && process.env.NODE_ENV === 'production' && token) {
      return NextResponse.json({ error: 'Forbidden. Admin credentials required.' }, { status: 403 });
    }

    await connectToDatabase();

    const body = await req.json();
    const { matchId, picks, summary } = body;

    if (!matchId) {
      return NextResponse.json({ error: 'Match ID is required for settlement' }, { status: 400 });
    }

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
