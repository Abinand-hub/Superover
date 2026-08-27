import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Match from '@/models/Match';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    
    // Admins get ALL matches, including FETCHED and DRAFT, from the last 7 days to next 14 days
    const now = new Date();
    const past = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const future = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);

    const query = {
      matchStartTime: {
        $gte: past.toISOString(),
        $lte: future.toISOString()
      }
    };
    
    let matches = await Match.find(query).sort({ matchStartTime: 1 }).lean();

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
    console.error('Fetch Admin Matches Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
