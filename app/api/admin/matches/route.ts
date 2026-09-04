import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Match from '@/models/Match';
import { autoLockMatches } from '@/lib/cricapi';
import { generateUpcomingFanCodeAndInternationalMatches } from '@/lib/tournamentFeeds';
import { getPlayerImage } from '@/lib/playerImageRegistry';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    await autoLockMatches();
    await generateUpcomingFanCodeAndInternationalMatches();
    
    // Admins get upcoming matches for the next 2 days (rolling 48h window)
    const now = new Date();
    const twoDaysFromNow = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);

    // Auto-remove any past raw unconfigured matches
    try {
      await Match.deleteMany({
        status: 'FETCHED',
        matchStartTime: { $lt: now.toISOString() }
      });
    } catch (e) {
      console.warn('Failed to cleanup past fetched matches in admin route:', e);
    }

    // Return matches strictly within the next 2 days, or active LIVE/LOCKED/COMPLETED matches, or published matches
    const query = {
      $or: [
        {
          matchStartTime: {
            $gte: now.toISOString(),
            $lte: twoDaysFromNow.toISOString()
          }
        },
        { status: { $in: ['LIVE', 'LOCKED', 'COMPLETED'] } },
        { 'questions.0': { $exists: true } }
      ]
    };
    
    let matches = await Match.find(query).sort({ matchStartTime: 1 }).lean();

    // Fallback: If CricAPI failed to provide squad data (e.g. rate limits), inject generic mock players with real athlete photos
    matches = matches.map((match: any) => {
      if (!match.squadTeam1 || match.squadTeam1.length === 0) {
        match.squadTeam1 = Array.from({length: 11}).map((_, i) => {
          const pName = `${match.team1.name} Player ${i+1}`;
          return {
            id: `${match.team1.code}_p${i}`,
            name: pName,
            shortName: `P${i+1}`,
            team: match.team1.code,
            teamName: match.team1.name,
            role: i < 5 ? 'BAT' : i < 7 ? 'AR' : i === 7 ? 'WK' : 'BOWL',
            avatar: getPlayerImage(pName, match.team1.code, i),
            country: match.team1.name,
            recentForm: [],
            careerStatHighlight: 'Pro Player'
          };
        });
      }
      if (!match.squadTeam2 || match.squadTeam2.length === 0) {
        match.squadTeam2 = Array.from({length: 11}).map((_, i) => {
          const pName = `${match.team2.name} Player ${i+1}`;
          return {
            id: `${match.team2.code}_p${i}`,
            name: pName,
            shortName: `P${i+1}`,
            team: match.team2.code,
            teamName: match.team2.name,
            role: i < 5 ? 'BAT' : i < 7 ? 'AR' : i === 7 ? 'WK' : 'BOWL',
            avatar: getPlayerImage(pName, match.team2.code, i + 15),
            country: match.team2.name,
            recentForm: [],
            careerStatHighlight: 'Pro Player'
          };
        });
      }
      return match;
    });

    return NextResponse.json(matches);
  } catch (error: any) {
    console.error('Fetch Admin Matches Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
