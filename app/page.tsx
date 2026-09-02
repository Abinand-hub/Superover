import App from '../src/App';
import connectToDatabase from '@/lib/mongodb';
import Match from '@/models/Match';
import { CricketMatch } from '@/src/types';

export const dynamic = 'force-dynamic';

export default async function Page() {
  let processedMatches: CricketMatch[] = [];

  try {
    await connectToDatabase();
    
    const now = new Date();
    const past = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
    const future = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    const query = {
      status: { $in: ['UPCOMING', 'LOCKED', 'LIVE', 'COMPLETED'] },
      matchStartTime: {
        $gte: past.toISOString(),
        $lte: future.toISOString()
      }
    };
    
    const matches = await Match.find(query).sort({ matchStartTime: 1 }).lean();
    
    // Inject mock players for empty squads (reusing logic from api)
    processedMatches = matches.map((match: any) => {
      const t1 = match.team1 || { name: 'Team 1', code: 'T1' };
      const t2 = match.team2 || { name: 'Team 2', code: 'T2' };

      if (!match.squadTeam1 || match.squadTeam1.length === 0) {
        match.squadTeam1 = Array.from({ length: 11 }).map((_, i) => ({
          id: `${t1.code || 'T1'}_p${i}`,
          name: `${t1.name || 'Team 1'} Player ${i + 1}`,
          shortName: `P${i + 1}`,
          team: t1.code || 'T1',
          teamName: t1.name || 'Team 1',
          role: i < 5 ? 'BAT' : i < 7 ? 'AR' : i === 7 ? 'WK' : 'BOWL',
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(t1.code || 'T1')}+${i + 1}&background=random`,
          country: t1.name || 'International',
          recentForm: [],
          careerStatHighlight: 'Pro Player'
        }));
      }
      if (!match.squadTeam2 || match.squadTeam2.length === 0) {
        match.squadTeam2 = Array.from({ length: 11 }).map((_, i) => ({
          id: `${t2.code || 'T2'}_p${i}`,
          name: `${t2.name || 'Team 2'} Player ${i + 1}`,
          shortName: `P${i + 1}`,
          team: t2.code || 'T2',
          teamName: t2.name || 'Team 2',
          role: i < 5 ? 'BAT' : i < 7 ? 'AR' : i === 7 ? 'WK' : 'BOWL',
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(t2.code || 'T2')}+${i + 1}&background=random`,
          country: t2.name || 'International',
          recentForm: [],
          careerStatHighlight: 'Pro Player'
        }));
      }
      return {
        ...match,
        id: match._id ? match._id.toString() : String(Math.random()),
        _id: match._id ? match._id.toString() : String(Math.random()),
        startTime: match.matchStartTime || match.startTime || new Date().toISOString(),
        lockTime: match.lockTime || match.matchStartTime || new Date().toISOString(),
      } as CricketMatch;
    });
  } catch (error) {
    console.error('Error fetching initial matches in Page SSR:', error);
    // App will load matches client-side if initialMatches is empty
    processedMatches = [];
  }

  return <App initialMatches={processedMatches} />;
}
