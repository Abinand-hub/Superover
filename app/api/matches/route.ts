import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Match from '@/models/Match';
import { syncMatchesFromCricAPI } from '@/lib/cricapi';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    
    const now = new Date();
    // Allow up to 48 hours in the past so admins have time to settle results
    const twoDaysAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000);
    const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    // Return matches from 48h ago to 7 days from now, sorted by start time
    // Only return published matches (exclude FETCHED and DRAFT)
    const query = {
      status: { $in: ['UPCOMING', 'LOCKED', 'LIVE', 'COMPLETED'] },
      matchStartTime: {
        $gte: twoDaysAgo.toISOString(),
        $lte: sevenDaysFromNow.toISOString()
      }
    };
    
    let matches = await Match.find(query as any).sort({ matchStartTime: 1 }).lean();

    // If the database has no upcoming matches in this window, auto-sync from CricAPI
    if (matches.length === 0) {
      console.log('No recent/upcoming matches! Auto-syncing matches from CricAPI...');
      await syncMatchesFromCricAPI();
      matches = await Match.find(query as any).sort({ matchStartTime: 1 }).lean();
    }

    // Fallback: If CricAPI failed to provide squad data (e.g. rate limits), inject generic mock players
    matches = matches.map((match: any) => {
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
      return match;
    });

    return NextResponse.json(matches);
  } catch (error: any) {
    console.error('Fetch Matches Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
