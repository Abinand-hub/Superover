import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import Slip from '@/models/Slip';
import Match from '@/models/Match';
import Transaction from '@/models/Transaction';
import mongoose from 'mongoose';

export const dynamic = 'force-dynamic';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    
    // Await params as per Next.js 15+ dynamic route requirements
    const { id } = await params;
    
    const userQuery = mongoose.Types.ObjectId.isValid(id) ? { _id: id } : { id: id };
    const userDoc = await User.findOne(userQuery);

    if (!userDoc) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const userIdQuery = userDoc._id;

    // Fetch User Slips and Transactions
    const [slipsRaw, transactionsRaw, completedMatches] = await Promise.all([
      Slip.find({ $or: [{ userId: userIdQuery }, { userId: id }] }).sort({ submittedAt: -1 }),
      Transaction.find({ $or: [{ userId: userIdQuery }, { userId: id }] }).sort({ createdAt: -1 }),
      Match.find({ $or: [{ status: 'COMPLETED' }, { 'actualResults.answers': { $exists: true } }] }).lean()
    ]);

    const matchMap = new Map<string, any>();
    completedMatches.forEach((m: any) => {
      matchMap.set(String(m._id), m);
      if (m.apiId) matchMap.set(m.apiId, m);
      if (m.title) matchMap.set(m.title.toLowerCase().trim(), m);
    });

    // Auto-reconcile and evaluate any slips with settled matches
    const slips = await Promise.all(slipsRaw.map(async (s: any) => {
      const match = matchMap.get(String(s.matchId)) || 
                    (s.matchTitle ? matchMap.get(s.matchTitle.toLowerCase().trim()) : null);

      if (match && (match.status === 'COMPLETED' || match.actualResults?.answers)) {
        if (s.status === 'PENDING' || s.status === 'LIVE' || s.streakCount === undefined) {
          const answers = match.actualResults?.answers || {};
          let streak = 0;
          let broken = false;
          let correct = 0;
          const questions = match.questions || [];

          const combinedSquad = [...(match.squadTeam1 || []), ...(match.squadTeam2 || [])];
          const playerMap = new Map(combinedSquad.map((p: any) => [p.id, p]));

          questions.forEach((q: any, idx: number) => {
            let rawUser = '';
            if (s.answers instanceof Map) {
              rawUser = s.answers.get(q.id) || s.answers.get(`q${idx + 1}`) || s.answers.get(String(idx + 1)) || '';
            } else if (typeof s.answers === 'object' && s.answers !== null) {
              rawUser = s.answers[q.id] || s.answers[`q${idx + 1}`] || s.answers[String(idx + 1)] || '';
            }

            const rawOfficial = answers[q.id] || answers[`q${idx + 1}`] || answers[String(idx + 1)];
            const officialAns = typeof rawOfficial === 'object' && rawOfficial !== null ? (rawOfficial.answerId || rawOfficial.answerText || '') : (rawOfficial || '');
            const officialText = typeof rawOfficial === 'object' && rawOfficial !== null ? (rawOfficial.answerText || rawOfficial.answerId || '') : (rawOfficial || '');

            const uClean = String(rawUser || '').trim().toLowerCase();
            const oClean = String(officialAns || '').trim().toLowerCase();
            const oTextClean = String(officialText || '').trim().toLowerCase();

            let isMatch = false;
            if (uClean && (oClean || oTextClean)) {
              if (oClean && uClean === oClean) isMatch = true;
              else if (oTextClean && uClean === oTextClean) isMatch = true;
              else {
                const uPlayer = playerMap.get(rawUser);
                const uName = uPlayer?.name?.toLowerCase().trim();
                const oPlayer = playerMap.get(officialAns) || (officialText ? playerMap.get(officialText) : undefined);
                const oName = oPlayer?.name?.toLowerCase().trim();

                if (uName && (uName === oClean || uName === oTextClean || (oName && uName === oName))) isMatch = true;
                else if (oName && uClean === oName) isMatch = true;
              }
            }

            if (isMatch) {
              correct++;
              if (!broken) streak++;
            } else {
              broken = true;
            }
          });

          let mult = 0;
          if (streak >= 6) mult = s.freeHit ? (s.wheelMultiplier || 50) : 50;
          else if (streak === 5) mult = 10;
          else if (streak === 4) mult = 3;
          else if (streak === 3) mult = 0.5;

          const isWin = mult > 0;
          const wonAmount = isWin ? Math.floor(s.entryFee * mult) : 0;
          const finalStatus = isWin ? 'WON' : 'LOST';

          // Update MongoDB document
          s.status = finalStatus;
          s.streakCount = streak;
          s.correctCount = correct;
          s.multiplierWon = mult;
          s.payoutAmount = wonAmount;
          await s.save();

          if (isWin && wonAmount > 0) {
            // Check if transaction already logged
            const existingTx = await Transaction.findOne({ referenceId: String(s._id) });
            if (!existingTx) {
              userDoc.wallet.winningsBalance = (userDoc.wallet.winningsBalance || 0) + wonAmount;
              userDoc.totalWon = (userDoc.totalWon || 0) + wonAmount;
              await userDoc.save();

              await Transaction.create({
                userId: userDoc._id,
                type: 'CONTEST_PAYOUT',
                amount: wonAmount,
                status: 'SUCCESS',
                referenceId: String(s._id),
                description: `Contest Winnings: ${streak}/6 Streak (${mult}X) on ${match.title}`
              });
            }
          }
        }
      }

      return {
        ...s.toObject(),
        id: String(s._id)
      };
    }));

    // Format Transactions
    const transactions = transactionsRaw.map((tx: any) => ({
      ...tx.toObject(),
      id: String(tx._id),
      timestamp: tx.createdAt?.toISOString() || new Date().toISOString(),
      description: tx.description || `${tx.type} transaction`
    }));

    return NextResponse.json({
      user: {
        ...userDoc.toObject(),
        id: String(userDoc._id)
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
