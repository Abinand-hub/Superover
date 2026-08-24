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

    // Save official results to match if we want to (schema doesn't have it yet, but we can set status)
    match.status = 'COMPLETED';
    await match.save();

    // Fetch all slips for this match
    const slips = await Slip.find({ matchId: matchId });

    for (const slip of slips) {
      // Evaluate slip
      let correctAnswers = 0;
      let totalQuestions = 6;
      
      // Calculate correctness based on 'picks' which maps questionId -> { answerId, answerText, statValue }
      for (const [qId, ans] of Object.entries(slip.answers)) {
         const officialPick = picks[qId];
         if (officialPick && officialPick.answerId) {
            // Note: Admin should input EXACT match. To make it more lenient, compare lower case.
            const userAnsString = String(ans).trim().toLowerCase();
            const officialAnsString = String(officialPick.answerId).trim().toLowerCase();
            if (userAnsString === officialAnsString) {
               correctAnswers++;
            }
         }
      }

      const user = await User.findById(slip.userId);
      if (!user) continue;

      let wonAmount = 0;
      let slipStatus = 'LOST';
      
      const entryFee = slip.entryFee || 50;

      if (correctAnswers === 6) {
         slipStatus = 'PENDING_APPROVAL'; // 100x payout needs admin approval
         wonAmount = entryFee * 100;
      } else if (correctAnswers === 5) {
         slipStatus = 'WON';
         wonAmount = entryFee * 10;
      } else if (correctAnswers === 4) {
         slipStatus = 'WON';
         wonAmount = entryFee * 2;
      }

      slip.status = slipStatus;
      await slip.save();

      // Process automatic payouts for 4 and 5 correct
      if ((correctAnswers === 4 || correctAnswers === 5) && wonAmount > 0) {
         user.wallet.winningsBalance += wonAmount;
         user.wallet.totalBalance = user.wallet.depositBalance + user.wallet.winningsBalance + user.wallet.bonusBalance;
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
