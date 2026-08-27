import App from '../src/App';
import connectToDatabase from '@/lib/mongodb';
import Match from '@/models/Match';
import { CricketMatch } from '@/src/types';

export const dynamic = 'force-dynamic';

export default async function Page() {
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
  const processedMatches = matches.map((match: any) => {
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
      _id: match._id.toString(),
      startTime: match.matchStartTime || match.startTime,
      lockTime: match.lockTime || match.matchStartTime,
    } as CricketMatch;
  });

  return <App initialMatches={processedMatches} />;
}
