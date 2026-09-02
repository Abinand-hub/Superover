import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Match from '@/models/Match';
import { autoLockMatches } from '@/lib/cricapi';
import { generateUpcomingEuropeanMatches } from '@/lib/europeanScraper';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    await autoLockMatches();
    await generateUpcomingEuropeanMatches();
    
    // Admins get upcoming matches for the next 7 days (rolling window)
    const now = new Date();
    const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    // Auto-remove any past raw unconfigured matches
    try {
      await Match.deleteMany({
        status: 'FETCHED',
        matchStartTime: { $lt: now.toISOString() }
      });
    } catch (e) {
      console.warn('Failed to cleanup past fetched matches in admin route:', e);
    }

    // Return matches strictly within the next 7 days, or active LIVE/LOCKED matches
    const query = {
      $or: [
        {
          matchStartTime: {
            $gte: now.toISOString(),
            $lte: sevenDaysFromNow.toISOString()
          }
        },
        { status: { $in: ['LIVE', 'LOCKED'] } }
      ]
    };
    
    let matches = await Match.find(query).sort({ matchStartTime: 1 }).lean();

    const ATHLETE_PORTRAITS = [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&auto=format&fit=crop&q=80',
    ];

    // Fallback: If CricAPI failed to provide squad data (e.g. rate limits), inject generic mock players with real athlete photos
    matches = matches.map((match: any) => {
      if (!match.squadTeam1 || match.squadTeam1.length === 0) {
        match.squadTeam1 = Array.from({length: 11}).map((_, i) => ({
          id: `${match.team1.code}_p${i}`,
          name: `${match.team1.name} Player ${i+1}`,
          shortName: `P${i+1}`,
          team: match.team1.code,
          teamName: match.team1.name,
          role: i < 5 ? 'BAT' : i < 7 ? 'AR' : i === 7 ? 'WK' : 'BOWL',
          avatar: ATHLETE_PORTRAITS[i % ATHLETE_PORTRAITS.length],
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
          avatar: ATHLETE_PORTRAITS[(i + 5) % ATHLETE_PORTRAITS.length],
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
