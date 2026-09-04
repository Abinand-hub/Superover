import Match from '@/models/Match';
import { executeMatchSettlement } from './settlementEngine';

const CRICAPI_KEY = process.env.CRICAPI_KEY || 'MOCK_KEY';
const CRICAPI_BASE_URL = 'https://api.cricapi.com/v1';

export async function syncMatchesFromCricAPI() {
  if (CRICAPI_KEY === 'MOCK_KEY') {
    console.warn('Using MOCK_KEY for CricAPI. You must provide a valid CRICAPI_KEY to fetch real matches.');
    return { success: false, fetched: 0 };
  }

  try {
    let allMatches = [];
    for (let offset of [0, 25, 50]) {
      const res = await fetch(`${CRICAPI_BASE_URL}/matches?apikey=${CRICAPI_KEY}&offset=${offset}`);
      const data = await res.json();
      if (data.status === 'success' && data.data) {
        allMatches = allMatches.concat(data.data);
      }
      await new Promise(resolve => setTimeout(resolve, 300)); // avoid rate limit
    }

    if (allMatches.length === 0) {
      console.warn('CricAPI Sync Failed or Limit Reached');
      return { success: false, fetched: 0 };
    }

    const matches = allMatches;

    const now = new Date();
    const twoDaysFromNow = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);

    // Automatically remove expired unconfigured (FETCHED) matches from past days
    try {
      await Match.deleteMany({
        status: 'FETCHED',
        matchStartTime: { $lt: now.toISOString() }
      });
    } catch (e) {
      console.warn('Failed to cleanup past fetched matches:', e);
    }

    for (const match of matches) {
      const matchDate = new Date(match.dateTimeGMT);
      
      // ONLY fetch upcoming matches strictly within the next 2 days window (now to 2 days)
      if (match.matchStarted === false && matchDate >= now && matchDate <= twoDaysFromNow) {
        
        const existingMatch = await Match.findOne({ apiId: match.id });
        
        // Try to safely extract team info if available
        const t1Info = match.teamInfo && match.teamInfo[0] ? match.teamInfo[0] : null;
        const t2Info = match.teamInfo && match.teamInfo[1] ? match.teamInfo[1] : null;
        
        const team1Code = t1Info?.shortname || match.teams[0].substring(0, 3).toUpperCase();
        const team2Code = t2Info?.shortname || match.teams[1].substring(0, 3).toUpperCase();
        
        const team1Logo = t1Info?.img || '';
        const team2Logo = t2Info?.img || '';

        // Fetch Squads if match hasSquad or if existingMatch is missing real squad
        let squadTeam1: any[] = [];
        let squadTeam2: any[] = [];
        
        const needsSquad = !existingMatch || !existingMatch.squadTeam1 || existingMatch.squadTeam1.length === 0 || existingMatch.squadTeam1[0]?.name?.includes('Player');

        if (needsSquad && match.hasSquad) {
          try {
            await new Promise(resolve => setTimeout(resolve, 400)); // avoid rate limit
            
            const squadRes = await fetch(`${CRICAPI_BASE_URL}/match_squad?apikey=${CRICAPI_KEY}&id=${match.id}`);
            const squadData = await squadRes.json();
            
            if (squadData.status === 'success' && squadData.data && squadData.data.length >= 2) {
              const mapSquad = (teamSquad: any, teamCode: string, teamName: string) => {
                return (teamSquad.players || []).map((p: any) => ({
                  id: p.id,
                  name: p.name,
                  shortName: p.name.split(' ').slice(-1)[0] || p.name,
                  team: teamCode,
                  teamName: teamName,
                  role: (p.role || '').toLowerCase().includes('wicket') ? 'WK' : 
                        (p.role || '').toLowerCase().includes('all') ? 'AR' : 
                        (p.role || '').toLowerCase().includes('bowl') ? 'BOWL' : 'BAT',
                  avatar: p.playerImg || `https://ui-avatars.com/api/?name=${encodeURIComponent(p.name)}&background=random`,
                  country: p.country || teamName,
                  recentForm: [],
                  careerStatHighlight: p.battingStyle || p.bowlingStyle || 'Pro Player'
                }));
              };
              
              const t1squad = squadData.data.find((s: any) => s.teamName === match.teams[0]);
              const t2squad = squadData.data.find((s: any) => s.teamName === match.teams[1]);
              
              if (t1squad) squadTeam1 = mapSquad(t1squad, team1Code, match.teams[0]);
              if (t2squad) squadTeam2 = mapSquad(t2squad, team2Code, match.teams[1]);
            }
          } catch(e) {
            console.log('Failed to fetch squad for match', match.id, e);
          }
        }

        if (!existingMatch) {
          // Create new match
          await Match.create({
            apiId: match.id,
            title: `${match.teams[0]} vs ${match.teams[1]}`,
            series: match.name || match.series_id || 'Cricket Series',
            format: (match.matchType || 'T20').toUpperCase(),
            team1: { name: match.teams[0], code: team1Code, logoUrl: team1Logo },
            team2: { name: match.teams[1], code: team2Code, logoUrl: team2Logo },
            matchStartTime: match.dateTimeGMT,
            status: match.matchStarted ? 'LIVE' : 'FETCHED',
            questions: [],
            entryFees: [25, 50, 100],
            squadTeam1,
            squadTeam2,
          });
        } else if (squadTeam1.length > 0 && squadTeam2.length > 0) {
          // Update existing match with real squad data if it was previously empty/mock
          existingMatch.squadTeam1 = squadTeam1;
          existingMatch.squadTeam2 = squadTeam2;
          await existingMatch.save();
        }
      }
    }
    
    return { success: true, count: matches.length };
  } catch (error) {
    console.error('CricAPI Sync Error:', error);
    return { success: false, error };
  }
}

export async function autoLockMatches() {
  const now = new Date();
  const oneMinuteFromNow = new Date(now.getTime() + 60 * 1000);
  const matchDurationMs = 3.5 * 60 * 60 * 1000; // 3.5 hours average T20 duration
  const matchFinishedThreshold = new Date(now.getTime() - matchDurationMs);
  
  // 1. Matches starting within 1 minute -> Auto-transition to LOCKED
  const matchesToLock = await Match.find({
    status: 'UPCOMING',
    matchStartTime: { $lte: oneMinuteFromNow.toISOString(), $gt: now.toISOString() }
  });

  for (const match of matchesToLock) {
    match.status = 'LOCKED';
    await match.save();
    console.log(`🔒 Auto-locked match: ${match.title}`);
  }

  // 2. Matches whose official start time has arrived -> Auto-transition to LIVE
  const matchesToLive = await Match.find({
    status: { $in: ['UPCOMING', 'LOCKED'] },
    matchStartTime: { $lte: now.toISOString(), $gt: matchFinishedThreshold.toISOString() }
  });

  for (const match of matchesToLive) {
    match.status = 'LIVE';
    if (!match.liveScore || match.liveScore === '') {
      match.liveScore = `${match.team1?.code || 'T1'} 0/0 (0.1 ov) • Match In Progress`;
    }
    await match.save();
    console.log(`🔴 Auto-transitioned match to LIVE: ${match.title}`);
  }

  // 3. Matches whose play has finished -> Auto-settle results and disburse wallet payouts
  const matchesToComplete = await Match.find({
    status: { $in: ['LIVE', 'LOCKED', 'UPCOMING'] },
    matchStartTime: { $lte: matchFinishedThreshold.toISOString() },
    'questions.0': { $exists: true }
  });

  for (const match of matchesToComplete) {
    try {
      console.log(`🏁 Auto-settling finished match: ${match.title}`);
      await executeMatchSettlement(match._id.toString());
    } catch (e) {
      console.error(`Error auto-settling match ${match._id}:`, e);
      match.status = 'COMPLETED';
      await match.save();
    }
  }
}

function generateDefaultQuestions() {
  return [
    {
      id: 'q1_top_batter',
      title: 'Top Batter',
      subtitle: 'Who will score the most runs?',
      type: 'PLAYER',
      iconName: 'BAT',
      statValue: 'TOP_BATTER'
    },
    {
      id: 'q2_top_bowler',
      title: 'Top Bowler',
      subtitle: 'Who will take the most wickets?',
      type: 'PLAYER',
      iconName: 'BOWL',
      statValue: 'TOP_BOWLER'
    },
    {
      id: 'q3_top_striker',
      title: 'Top Striker',
      subtitle: 'Who will have the highest strike rate?',
      type: 'PLAYER',
      iconName: 'STAR',
      statValue: 'TOP_STRIKER'
    },
    {
      id: 'q4_econ_bowler',
      title: 'Most Economical Bowler',
      subtitle: 'Who will concede the fewest runs per over?',
      type: 'PLAYER',
      iconName: 'SHIELD',
      statValue: 'MOST_ECON_BOWLER'
    },
    {
      id: 'q5_most_6s',
      title: 'Most 6s',
      subtitle: 'Which player will hit the most 6s?',
      type: 'PLAYER',
      iconName: 'TICKET',
      statValue: 'MOST_SIXES'
    },
    {
      id: 'q6_most_wickets',
      title: 'Most Wickets',
      subtitle: 'Which player will take the most wickets?',
      type: 'PLAYER',
      iconName: 'BOWL',
      statValue: 'MOST_WICKETS'
    }
  ];
}

async function mockSyncMatches() {
  const getMockSquad = (teamName: string, teamCode: string) => [
    { id: `p_${teamCode}_1`, name: `${teamName} Player 1`, shortName: `Player 1`, team: teamCode, teamName: teamName, role: 'BAT', avatar: 'https://ui-avatars.com/api/?name=P1', country: 'IND', recentForm: [], careerStatHighlight: 'BAT' },
    { id: `p_${teamCode}_2`, name: `${teamName} Player 2`, shortName: `Player 2`, team: teamCode, teamName: teamName, role: 'BAT', avatar: 'https://ui-avatars.com/api/?name=P2', country: 'IND', recentForm: [], careerStatHighlight: 'BAT' },
    { id: `p_${teamCode}_3`, name: `${teamName} Player 3`, shortName: `Player 3`, team: teamCode, teamName: teamName, role: 'AR', avatar: 'https://ui-avatars.com/api/?name=P3', country: 'IND', recentForm: [], careerStatHighlight: 'AR' },
    { id: `p_${teamCode}_4`, name: `${teamName} Player 4`, shortName: `Player 4`, team: teamCode, teamName: teamName, role: 'WK', avatar: 'https://ui-avatars.com/api/?name=P4', country: 'IND', recentForm: [], careerStatHighlight: 'WK' },
    { id: `p_${teamCode}_5`, name: `${teamName} Player 5`, shortName: `Player 5`, team: teamCode, teamName: teamName, role: 'BOWL', avatar: 'https://ui-avatars.com/api/?name=P5', country: 'IND', recentForm: [], careerStatHighlight: 'BOWL' },
    { id: `p_${teamCode}_6`, name: `${teamName} Player 6`, shortName: `Player 6`, team: teamCode, teamName: teamName, role: 'BOWL', avatar: 'https://ui-avatars.com/api/?name=P6', country: 'IND', recentForm: [], careerStatHighlight: 'BOWL' },
  ];

  const mockLiveMatch = await Match.findOne({ apiId: 'mock-live-1' });
  if (!mockLiveMatch) {
    await Match.create({
      apiId: 'mock-live-1',
      title: 'Chennai Super Kings vs Mumbai Indians',
      series: 'IPL 2026',
      format: 'T20',
      team1: { name: 'Chennai Super Kings', code: 'CSK' },
      team2: { name: 'Mumbai Indians', code: 'MI' },
      matchStartTime: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 mins ago
      status: 'LIVE',
      liveScore: 'CSK 142/3 (14.2)  CRR: 10.00',
      totalPool: 0,
      totalEntries: 0,
      questions: generateDefaultQuestions(),
      squadTeam1: getMockSquad('Chennai Super Kings', 'CSK'),
      squadTeam2: getMockSquad('Mumbai Indians', 'MI'),
    });
  } else {
    // Keep score moving for demo
    const overs = (Math.random() * 20).toFixed(1);
    mockLiveMatch.liveScore = `CSK ${Math.floor(Math.random() * 200)}/3 (${overs})  CRR: ${(Math.random() * 10).toFixed(2)}`;
    await mockLiveMatch.save();
  }

  const mockUpcomingMatch = await Match.findOne({ apiId: 'mock-upcoming-2' });
  if (!mockUpcomingMatch) {
    await Match.create({
      apiId: 'mock-upcoming-2',
      title: 'Client Demo: India vs Australia',
      series: 'T20 World Cup 2026',
      format: 'T20',
      team1: { name: 'India', code: 'IND' },
      team2: { name: 'Australia', code: 'AUS' },
      matchStartTime: new Date(Date.now() + 5 * 60 * 1000).toISOString(), // Starts in exactly 5 minutes!
      status: 'UPCOMING',
      liveScore: '',
      totalPool: 0,
      totalEntries: 0,
      entryFees: [5, 25, 50, 100], // Allow 5 rupees entry
      questions: [], // For mock, we can leave it empty or generate default. We'll generate default for testing player app.
      squadTeam1: getMockSquad('India', 'IND'),
      squadTeam2: getMockSquad('Australia', 'AUS'),
    });
    
    // Add default questions to the upcoming match to ensure app works
    mockUpcomingMatch.questions = generateDefaultQuestions();
    await mockUpcomingMatch.save();
  } else {
    // Push the demo match into the future if it's about to lock or already passed, so we can always test!
    if (new Date(mockUpcomingMatch.matchStartTime).getTime() < Date.now() + 2 * 60 * 1000) {
      mockUpcomingMatch.matchStartTime = new Date(Date.now() + 60 * 60 * 1000).toISOString(); // 1 hour ahead
      mockUpcomingMatch.status = 'UPCOMING';
      await mockUpcomingMatch.save();
    }
  }

  return { success: true, count: 2, mock: true };
}
