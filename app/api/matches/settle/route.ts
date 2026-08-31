import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import connectToDatabase from '@/lib/mongodb';
import Match from '@/models/Match';
import Slip from '@/models/Slip';
import User from '@/models/User';
import Transaction from '@/models/Transaction';

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
    const { matchId, picks, summary } = body;

    const match = await Match.findById(matchId);
    if (!match) {
      return NextResponse.json({ error: 'Match not found' }, { status: 404 });
    }

    // Save official results to match
    match.status = 'COMPLETED';
    match.actualResults = {
      answers: picks,
      summaryNote: summary
    };
    await match.save();

    // Fetch all slips for this match
    const slips = await Slip.find({ matchId: matchId });

    for (const slip of slips) {
      // Evaluate slip strictly in Q1 -> Q6 sequence (PRD V8 Streak Rule)
      let correctAnswers = 0;
      let streakCount = 0;
      let isStreakBroken = false;
      
      if (match.questions && Array.isArray(match.questions)) {
        for (const q of match.questions) {
          const qId = q.id;
          let userAns: any = '';
          if (slip.answers instanceof Map) {
            userAns = slip.answers.get(qId);
          } else if (typeof slip.answers === 'object' && slip.answers !== null) {
            userAns = (slip.answers as any)[qId];
          }

          const officialPick = picks[qId];
          if (officialPick && officialPick.answerId && userAns) {
            const userAnsString = String(userAns).trim().toLowerCase();
            const officialAnsString = String(officialPick.answerId).trim().toLowerCase();
            if (userAnsString === officialAnsString) {
              correctAnswers++;
              if (!isStreakBroken) {
                streakCount++;
              }
            } else {
              isStreakBroken = true;
            }
          } else {
            isStreakBroken = true;
          }
        }
      }

      const user = await User.findById(slip.userId);
      if (!user) continue;

      let wonAmount = 0;
      let slipStatus = 'LOST';
      let multiplierWon = 0;
      
      const entryFee = slip.entryFee || 50;
      const wheelMult = slip.wheelMultiplier || 50;

      // PRD V8 Multiplier Matrix:
      // Q1Q2Q3 = 0.5X
      // Q1Q2Q3Q4 = 3X
      // Q1Q2Q3Q4Q5 = 10X
      // Q1Q2Q3Q4Q5Q6 = 50X OR WHEEL SPIN
      // Streak < 3 = 0X
      if (streakCount >= 6) {
        multiplierWon = slip.freeHit ? wheelMult : 50;
        slipStatus = 'PENDING_APPROVAL'; // 6/6 jackpot needs admin approval
        wonAmount = entryFee * multiplierWon;
      } else if (streakCount === 5) {
        multiplierWon = 10;
        slipStatus = 'WON';
        wonAmount = entryFee * multiplierWon;
      } else if (streakCount === 4) {
        multiplierWon = 3;
        slipStatus = 'WON';
        wonAmount = entryFee * multiplierWon;
      } else if (streakCount === 3) {
        multiplierWon = 0.5;
        slipStatus = 'WON';
        wonAmount = entryFee * multiplierWon;
      } else {
        multiplierWon = 0;
        slipStatus = 'LOST';
        wonAmount = 0;
      }

      slip.status = slipStatus as any;
      slip.payoutAmount = wonAmount;
      slip.correctCount = correctAnswers;
      slip.streakCount = streakCount;
      slip.multiplierWon = multiplierWon;
      await slip.save();

      if (slipStatus === 'WON' && wonAmount > 0) {
        user.wallet.winningsBalance += wonAmount;
        await user.save();

        // Create Transaction
        await Transaction.create({
          userId: user._id,
          type: 'PAYOUT',
          amount: wonAmount,
          status: 'SUCCESS',
          referenceId: slip._id.toString(),
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Match settled successfully. Automated payouts distributed.`
    });

  } catch (error) {
    console.error('Settle Match Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
