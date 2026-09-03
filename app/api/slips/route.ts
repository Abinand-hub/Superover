import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Slip from '@/models/Slip';
import User from '@/models/User';
import Match from '@/models/Match';
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

    // If admin, return all slips. If user, return only their slips.
    let query = {};
    if (decoded.role !== 'ADMIN') {
      query = { userId: decoded.userId };
    }

    const slips = await Slip.find(query).sort({ submittedAt: -1 }).lean();

    // Transform _id to id for frontend
    const formattedSlips = slips.map((s: any) => ({
      ...s,
      id: s._id,
    }));

    return NextResponse.json(formattedSlips);
  } catch (error: any) {
    console.error('Fetch Slips Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    
    const body = await req.json();
    const { matchId, answers, entryFee, freeHit, freeHitFee, totalPayable } = body;

    if (!matchId || !answers || totalPayable === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await connectToDatabase();

    // 1. Fetch user to check balance
    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // 2. Fetch match to verify it exists and is upcoming
    const match = await Match.findById(matchId);
    if (!match) {
      return NextResponse.json({ error: 'Match not found' }, { status: 404 });
    }
    
    if (match.status !== 'UPCOMING') {
      return NextResponse.json({ error: 'Match is no longer upcoming' }, { status: 400 });
    }

    // Check if match lock time has passed
    const now = new Date();
    if (match.matchStartTime && now >= new Date(match.matchStartTime)) {
      match.status = 'LOCKED';
      await match.save();
      return NextResponse.json({ error: 'Match is locked for predictions' }, { status: 400 });
    }

    // 3. Deduct from wallet
    let newDeposit = user.wallet.depositBalance || 0;
    let newWinnings = user.wallet.winningsBalance || 0;
    let newBonus = user.wallet.bonusBalance || 0;
    let remainingFee = totalPayable;

    // Deduct from deposit first
    if (newDeposit >= remainingFee) {
      newDeposit -= remainingFee;
      remainingFee = 0;
    } else {
      remainingFee -= newDeposit;
      newDeposit = 0;
    }

    // Deduct from winnings next
    if (remainingFee > 0) {
      if (newWinnings >= remainingFee) {
        newWinnings -= remainingFee;
        remainingFee = 0;
      } else {
        remainingFee -= newWinnings;
        newWinnings = 0;
      }
    }

    // Deduct from bonus last
    if (remainingFee > 0) {
      if (newBonus >= remainingFee) {
        newBonus -= remainingFee;
        remainingFee = 0;
      } else {
        remainingFee -= newBonus;
        newBonus = 0;
      }
    }

    if (remainingFee > 0) {
      return NextResponse.json({ error: 'Insufficient balance' }, { status: 400 });
    }

    // 4. Update user wallet
    user.wallet.depositBalance = newDeposit;
    user.wallet.winningsBalance = newWinnings;
    user.wallet.bonusBalance = newBonus;
    await user.save();

    // 5. Create the Slip
    const newSlip = new Slip({
      userId: user._id,
      userName: user.name,
      userPhone: user.phone || '',
      matchId: match._id,
      matchTitle: match.title,
      series: match.series,
      team1Code: match.team1.code,
      team2Code: match.team2.code,
      matchStartTime: match.matchStartTime,
      answers,
      entryFee,
      freeHit: freeHit || false,
      freeHitFee: freeHitFee || 0,
      totalPayable,
      status: 'PENDING',
      submittedAt: new Date()
    });

    await newSlip.save();

    // 6. Update Match Entries Count
    match.totalEntries = (match.totalEntries || 0) + 1;
    match.totalPool = (match.totalPool || 0) + entryFee;
    await match.save();

    return NextResponse.json({
      message: 'Prediction submitted successfully',
      slip: {
        ...newSlip.toObject(),
        id: newSlip._id
      },
      wallet: user.wallet
    });

  } catch (error: any) {
    console.error('Submit Slip Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const body = await req.json();
    const { slipId, answers } = body;

    if (!slipId || !answers) {
      return NextResponse.json({ error: 'Missing slipId or answers' }, { status: 400 });
    }

    await connectToDatabase();

    const slip = await Slip.findOne({ _id: slipId, userId: decoded.userId });
    if (!slip) {
      return NextResponse.json({ error: 'Slip not found' }, { status: 404 });
    }

    const match = await Match.findById(slip.matchId);
    if (!match) {
      return NextResponse.json({ error: 'Match not found' }, { status: 404 });
    }

    // Verify match is still upcoming and before start time
    const now = new Date();
    if (match.status !== 'UPCOMING' || (match.matchStartTime && now >= new Date(match.matchStartTime))) {
      return NextResponse.json({ error: 'Match has locked or started. Editing is no longer allowed.' }, { status: 400 });
    }

    slip.answers = answers;
    slip.updatedAt = new Date();
    await slip.save();

    return NextResponse.json({
      success: true,
      message: 'Predictions and player lineup updated successfully!',
      slip: {
        ...slip.toObject(),
        id: slip._id
      }
    });
  } catch (error: any) {
    console.error('Update Slip Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
