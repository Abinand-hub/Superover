import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Match from '@/models/Match';
import Slip from '@/models/Slip';
import Transaction from '@/models/Transaction';
import User from '@/models/User';
import { CricketMatch } from '@/src/types';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    
    const now = new Date();
    const past = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const future = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);

    const matchQuery = {
      matchStartTime: {
        $gte: past.toISOString(),
        $lte: future.toISOString()
      }
    };
    
    // Fetch all required data concurrently from DB
    const [matchesRaw, slipsRaw, transactionsRaw, totalUsers] = await Promise.all([
      Match.find(matchQuery).sort({ matchStartTime: 1 }).lean(),
      Slip.find({}).sort({ submittedAt: -1 }).limit(1000).lean(), // Limit to recent slips for performance
      Transaction.find({}).sort({ createdAt: -1 }).limit(1000).lean(), // Limit to recent transactions
      User.countDocuments({})
    ]);

    // Process matches
    const matches = matchesRaw.map((match: any) => {
      if (!match.squadTeam1 || match.squadTeam1.length === 0) {
        match.squadTeam1 = Array.from({length: 11}).map((_, i) => ({
          id: `${match.team1.code}_p${i}`,
          name: `${match.team1.name} Player ${i+1}`,
          shortName: `P${i+1}`,
          team: match.team1.code,
          teamName: match.team1.name,
          role: i < 5 ? 'BAT' : i < 7 ? 'AR' : i === 7 ? 'WK' : 'BOWL',
          avatar: `https://ui-avatars.com/api/?name=${match.team1.code}+${i+1}&background=random`,
          country: match.team1.name,
          recentForm: [],
          careerStatHighlight: 'Pro Player'
        }));
      }
      if (!match.squadTeam2 || match.squadTeam2.length === 0) {
        match.squadTeam2 = Array.from({length: 11}).map((_, i) => ({
          id: `${match.team2.code}_p${i}`,
          name: `${match.team2.name} Player ${i+1}`,
          shortName: `P${i+1}`,
          team: match.team2.code,
          teamName: match.team2.name,
          role: i < 5 ? 'BAT' : i < 7 ? 'AR' : i === 7 ? 'WK' : 'BOWL',
          avatar: `https://ui-avatars.com/api/?name=${match.team2.code}+${i+1}&background=random`,
          country: match.team2.name,
          recentForm: [],
          careerStatHighlight: 'Pro Player'
        }));
      }
      return {
        ...match,
        id: match._id.toString(),
        startTime: match.matchStartTime || match.startTime,
        lockTime: match.lockTime || match.matchStartTime,
      };
    });

    // Process slips
    const slips = slipsRaw.map((s: any) => ({
      ...s,
      id: s._id.toString(),
    }));

    // Process transactions
    const transactions = transactionsRaw.map((tx: any) => ({
      ...tx,
      id: tx._id.toString(),
      timestamp: tx.createdAt?.toISOString() || new Date().toISOString(),
      description: tx.description || `${tx.type} transaction`,
    }));

    // Calculate metrics locally to save DB queries
    const activeMatches = matches.filter((m: any) => m.status === 'LIVE' || m.status === 'UPCOMING' || m.status === 'LOCKED').length;
    const totalPoolCollected = slips.reduce((sum: number, s: any) => sum + (s.entryFee || 0), 0);
    const totalPayoutsDisbursed = transactions.filter((t: any) => t.type === 'CONTEST_PAYOUT' || t.type === 'PAYOUT').reduce((sum: number, t: any) => sum + (t.amount || 0), 0);
    const platformProfit = totalPoolCollected - totalPayoutsDisbursed;

    const metrics = {
      totalUsers,
      activeMatches,
      totalPoolCollected,
      totalPayoutsDisbursed,
      platformProfit,
      commissionRate: 0.15
    };

    return NextResponse.json({
      matches,
      slips,
      transactions,
      metrics
    });
  } catch (error: any) {
    console.error('Fetch Admin Dashboard Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
