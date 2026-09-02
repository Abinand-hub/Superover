import Match from '@/models/Match';

// Authentic European Cricket Teams & Squad Rosters Database (ECS T10 / European Cricket League)
export interface EuropeanTeamPreset {
  name: string;
  code: string;
  logoUrl?: string;
  country: string;
  players: Array<{
    name: string;
    role: 'BAT' | 'BOWL' | 'AR' | 'WK';
    careerStatHighlight?: string;
  }>;
}

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

export const EUROPEAN_TEAMS_ROSTER: Record<string, EuropeanTeamPreset> = {
  MADRID: {
    name: 'Madrid Cricket Club',
    code: 'MAD',
    logoUrl: 'https://flagcdn.com/w160/es.png',
    country: 'Spain',
    players: [
      { name: 'Galileo Finlayson-Ble', role: 'AR', careerStatHighlight: 'SR: 185.0 • 12 Wkts' },
      { name: 'Marcus Harvey', role: 'WK', careerStatHighlight: 'Avg: 38.5 • 450+ Runs' },
      { name: 'Daniel Walker', role: 'BAT', careerStatHighlight: 'SR: 165.2' },
      { name: 'Adam Langhans', role: 'BAT', careerStatHighlight: 'High Score: 88*' },
      { name: 'Jon Woodward', role: 'BAT', careerStatHighlight: 'SR: 145.0' },
      { name: 'Sumon Hossain', role: 'AR', careerStatHighlight: 'Avg: 28.0 • 15 Wkts' },
      { name: 'Lewis Clark', role: 'AR', careerStatHighlight: 'Econ: 7.2' },
      { name: 'Raheel Shafique', role: 'BOWL', careerStatHighlight: 'Best: 4/12' },
      { name: 'James Bentley', role: 'BOWL', careerStatHighlight: 'Econ: 6.8' },
      { name: 'Sean Stevenson', role: 'BOWL', careerStatHighlight: '18 Wkts in ECS' },
      { name: 'David Stirling', role: 'BOWL', careerStatHighlight: 'Best: 3/9' },
    ]
  },
  CATALUNYA: {
    name: 'Catalunya Cricket Club',
    code: 'CTL',
    logoUrl: 'https://flagcdn.com/w160/es-ct.png',
    country: 'Spain',
    players: [
      { name: 'Awais Ahmed', role: 'WK', careerStatHighlight: 'SR: 210.5 • ECS Legend' },
      { name: 'Muhammad Armghan Khan', role: 'BAT', careerStatHighlight: 'Avg: 42.0 • 600+ Runs' },
      { name: 'Yasir Ali', role: 'AR', careerStatHighlight: 'Highest Score: 124*' },
      { name: 'Hamza Nisar', role: 'BAT', careerStatHighlight: 'SR: 175.0' },
      { name: 'Ali Azam', role: 'AR', careerStatHighlight: 'SR: 190.0 • 14 Wkts' },
      { name: 'Sheraz Iqbal', role: 'AR', careerStatHighlight: 'Econ: 8.1 • 10 Wkts' },
      { name: 'Syed Sherazi', role: 'BOWL', careerStatHighlight: 'Best: 4/8' },
      { name: 'Ameer Abdullah', role: 'BOWL', careerStatHighlight: 'Econ: 7.5' },
      { name: 'Gulam Sarwar', role: 'BOWL', careerStatHighlight: '30+ ECS Wkts' },
      { name: 'Rauf Zaman', role: 'WK', careerStatHighlight: 'Safe Hands Behind Stumps' },
      { name: 'Asim Javeed', role: 'BOWL', careerStatHighlight: 'Best: 3/14' },
    ]
  },
  PAK_I_CARE: {
    name: 'Pak I Care Badalona',
    code: 'PIC',
    logoUrl: 'https://flagcdn.com/w160/es.png',
    country: 'Spain',
    players: [
      { name: 'Muhammad Ihsan', role: 'WK', careerStatHighlight: 'Record: 156 Off 48 Balls' },
      { name: 'Muhammad Babar', role: 'AR', careerStatHighlight: 'ECL MVP • 50+ Wkts' },
      { name: 'Asad Abbas', role: 'BAT', careerStatHighlight: 'SR: 182.0' },
      { name: 'Shehroz Ahmed', role: 'AR', careerStatHighlight: 'Captained 20+ ECS Wins' },
      { name: 'Umair Ahmed', role: 'BAT', careerStatHighlight: 'Avg: 35.0' },
      { name: 'Kamran Muhammad', role: 'AR', careerStatHighlight: 'SR: 195.0 • 18 Wkts' },
      { name: 'Atif Muhammad', role: 'BOWL', careerStatHighlight: 'Econ: 6.9' },
      { name: 'Adeel Shafqat', role: 'BOWL', careerStatHighlight: 'Best: 3/11' },
      { name: 'Ali Ahmed', role: 'BOWL', careerStatHighlight: 'Econ: 7.2' },
      { name: 'Hassan Ali', role: 'BOWL', careerStatHighlight: 'Death Over Specialist' },
      { name: 'Moazzam Rafique', role: 'AR', careerStatHighlight: 'SR: 160.0' },
    ]
  },
  ROYAL_ROMA: {
    name: 'Royal Roma Cricket Club',
    code: 'ROR',
    logoUrl: 'https://flagcdn.com/w160/it.png',
    country: 'Italy',
    players: [
      { name: 'Mubarak Hossain', role: 'WK', careerStatHighlight: 'SR: 205.0' },
      { name: 'Arif Muhammad', role: 'BAT', careerStatHighlight: 'Avg: 40.2' },
      { name: 'Rajwinder Singh', role: 'AR', careerStatHighlight: 'SR: 180.0 • 20 Wkts' },
      { name: 'Gagandeep Singh', role: 'BAT', careerStatHighlight: 'SR: 168.0' },
      { name: 'Hassan Mubashar', role: 'BAT', careerStatHighlight: 'Avg: 31.0' },
      { name: 'Tinusha Shehanka', role: 'AR', careerStatHighlight: 'SR: 172.0 • 15 Wkts' },
      { name: 'Umar Shahzad', role: 'BOWL', careerStatHighlight: 'Best: 4/15' },
      { name: 'Jitendra Prakash', role: 'BOWL', careerStatHighlight: 'Econ: 7.0' },
      { name: 'Usman Mubashar', role: 'BOWL', careerStatHighlight: 'Econ: 7.8' },
      { name: 'Sukhwinder Singh', role: 'BOWL', careerStatHighlight: 'Best: 3/8' },
      { name: 'Surajpal Singh', role: 'AR', careerStatHighlight: 'All-round impact' },
    ]
  },
  BRESCIA: {
    name: 'Brescia Cricket Club',
    code: 'BRE',
    logoUrl: 'https://flagcdn.com/w160/it.png',
    country: 'Italy',
    players: [
      { name: 'Yasir Dullu', role: 'WK', careerStatHighlight: 'SR: 198.0 • 35 6s' },
      { name: 'Imad Khan', role: 'BAT', careerStatHighlight: 'High Score: 92*' },
      { name: 'Babar Hussain', role: 'BAT', careerStatHighlight: 'Avg: 36.5' },
      { name: 'Qalab Sajjad', role: 'AR', careerStatHighlight: 'Econ: 6.5 • 22 Wkts' },
      { name: 'Ali Raza', role: 'AR', careerStatHighlight: 'SR: 185.0' },
      { name: 'Naveed Chaudhary', role: 'BAT', careerStatHighlight: 'SR: 155.0' },
      { name: 'Basharat Ali', role: 'BOWL', careerStatHighlight: 'Best: 4/10' },
      { name: 'Imran Naveed', role: 'BOWL', careerStatHighlight: 'Econ: 7.1' },
      { name: 'Farooq Khan', role: 'BOWL', careerStatHighlight: 'Best: 3/16' },
      { name: 'Javed Muhammad', role: 'BOWL', careerStatHighlight: 'Econ: 7.9' },
      { name: 'Ahsan Akbar', role: 'AR', careerStatHighlight: 'SR: 170.0' },
    ]
  },
  DREUX: {
    name: 'Dreux Cricket Club',
    code: 'DRX',
    logoUrl: 'https://flagcdn.com/w160/fr.png',
    country: 'France',
    players: [
      { name: 'Hamza Niaz', role: 'BAT', careerStatHighlight: 'SR: 220.0 • Fastest 50' },
      { name: 'Ahmad Nabi', role: 'BAT', careerStatHighlight: 'Avg: 45.0 • 3 100s' },
      { name: 'Mohammad Nisar', role: 'AR', careerStatHighlight: 'SR: 190.0 • 18 Wkts' },
      { name: 'Tabish Bhatti', role: 'AR', careerStatHighlight: 'Econ: 6.2 • 25 Wkts' },
      { name: 'Kamran Ahmadzai', role: 'AR', careerStatHighlight: 'Match winner' },
      { name: 'Ammar Zahir', role: 'WK', careerStatHighlight: 'Safe Hands' },
      { name: 'Wahid Abdul', role: 'BOWL', careerStatHighlight: 'Best: 4/14' },
      { name: 'Afridi Yaseen', role: 'BOWL', careerStatHighlight: 'Econ: 7.4' },
      { name: 'Muhammad Rafah', role: 'BOWL', careerStatHighlight: 'Best: 3/7' },
      { name: 'Usman Khan', role: 'BAT', careerStatHighlight: 'SR: 160.0' },
      { name: 'Alexandre Harkouk', role: 'BOWL', careerStatHighlight: 'Econ: 8.0' },
    ]
  },
  OLD_VICTORIANS: {
    name: 'Old Victorians Cricket Club',
    code: 'OV',
    logoUrl: 'https://flagcdn.com/w160/je.png',
    country: 'Jersey',
    players: [
      { name: 'Jonty Jenner', role: 'BAT', careerStatHighlight: 'Jersey Captain • SR: 195.0' },
      { name: 'Charlie Brennan', role: 'BAT', careerStatHighlight: 'Avg: 38.0' },
      { name: 'Jamie Watling', role: 'WK', careerStatHighlight: 'SR: 170.0' },
      { name: 'Scott Simpson', role: 'AR', careerStatHighlight: 'Econ: 7.0 • 14 Wkts' },
      { name: 'Rob Duckett', role: 'BAT', careerStatHighlight: 'SR: 150.0' },
      { name: 'James Duckett', role: 'AR', careerStatHighlight: 'Best: 3/12' },
      { name: 'Luke Gallichan', role: 'AR', careerStatHighlight: 'Jersey All-rounder' },
      { name: 'Theo Pullman', role: 'BOWL', careerStatHighlight: 'Econ: 7.3' },
      { name: 'Louis Kelly', role: 'BOWL', careerStatHighlight: 'Best: 4/16' },
      { name: 'Matthew Webb', role: 'BOWL', careerStatHighlight: 'Econ: 6.9' },
      { name: 'Will Perchard', role: 'BOWL', careerStatHighlight: 'Young pacer' },
    ]
  },
  FORFARSHIRE: {
    name: 'Forfarshire Cricket Club',
    code: 'FOR',
    logoUrl: 'https://flagcdn.com/w160/gb-sct.png',
    country: 'Scotland',
    players: [
      { name: 'Michael Leask', role: 'AR', careerStatHighlight: 'Scotland International • 6s King' },
      { name: 'Craig Wallace', role: 'WK', careerStatHighlight: 'Avg: 41.0 • 500+ Runs' },
      { name: 'Callum Garden', role: 'BAT', careerStatHighlight: 'SR: 180.0' },
      { name: 'Jack Hogarth', role: 'AR', careerStatHighlight: 'Best: 4/11' },
      { name: 'Scott Cameron', role: 'AR', careerStatHighlight: 'Econ: 6.8 • 16 Wkts' },
      { name: 'Fraser Ross', role: 'BAT', careerStatHighlight: 'SR: 155.0' },
      { name: 'Bryce Carnegie', role: 'BOWL', careerStatHighlight: 'Econ: 7.2' },
      { name: 'Lewis James', role: 'BOWL', careerStatHighlight: 'Best: 3/18' },
      { name: 'Glenn Carnegie', role: 'BAT', careerStatHighlight: 'Solid Opener' },
      { name: 'Lyle Robertson', role: 'BOWL', careerStatHighlight: 'Econ: 7.5' },
      { name: 'James Sim', role: 'BOWL', careerStatHighlight: 'Best: 3/15' },
    ]
  },
  NETHERLANDS_XI: {
    name: 'Netherlands XI',
    code: 'NED',
    logoUrl: 'https://flagcdn.com/w160/nl.png',
    country: 'Netherlands',
    players: [
      { name: 'Max O\'Dowd', role: 'BAT', careerStatHighlight: 'Top Dutch Batter • Avg: 36.0' },
      { name: 'Vikramjit Singh', role: 'BAT', careerStatHighlight: 'Power Hitter • SR: 160.0' },
      { name: 'Bas de Leede', role: 'AR', careerStatHighlight: 'World Class All-Rounder' },
      { name: 'Scott Edwards', role: 'WK', careerStatHighlight: 'Captain & Wicket-Keeper' },
      { name: 'Colin Ackermann', role: 'BAT', careerStatHighlight: 'T20 Specialist • Avg: 32.0' },
      { name: 'Roelof van der Merwe', role: 'AR', careerStatHighlight: 'Spin Legend • Econ: 6.4' },
      { name: 'Logan van Beek', role: 'AR', careerStatHighlight: 'Super Over Hero • 30+ Runs' },
      { name: 'Paul van Meekeren', role: 'BOWL', careerStatHighlight: 'Fast Bowler • 145 km/h' },
      { name: 'Fred Klaassen', role: 'BOWL', careerStatHighlight: 'Left-arm Swing Specialist' },
      { name: 'Aryan Dutt', role: 'BOWL', careerStatHighlight: 'Off-spinner • Econ: 5.8' },
      { name: 'Shariz Ahmad', role: 'BOWL', careerStatHighlight: 'Leg-spin Mystery' },
    ]
  },
  ITALY_XI: {
    name: 'Italy XI',
    code: 'ITA',
    logoUrl: 'https://flagcdn.com/w160/it.png',
    country: 'Italy',
    players: [
      { name: 'Anthony Mosca', role: 'BAT', careerStatHighlight: 'Italian Opener • SR: 175.0' },
      { name: 'Marcus Campopiano', role: 'BAT', careerStatHighlight: 'Avg: 34.0' },
      { name: 'Harry Manenti', role: 'AR', careerStatHighlight: 'SR: 190.0 • 16 Wkts' },
      { name: 'Gareth Berg', role: 'AR', careerStatHighlight: 'Italian Legend & Captain' },
      { name: 'Gian-Piero Meade', role: 'WK', careerStatHighlight: 'SR: 155.0' },
      { name: 'Grant Stewart', role: 'AR', careerStatHighlight: 'Sussex / Kent All-Rounder' },
      { name: 'Joe Burns', role: 'BAT', careerStatHighlight: 'Former Australian Test Player' },
      { name: 'Stefano di Bartolomeo', role: 'BOWL', careerStatHighlight: 'Best: 4/12' },
      { name: 'Crishan Kalugamage', role: 'BOWL', careerStatHighlight: 'Econ: 6.8' },
      { name: 'Jaspreet Singh', role: 'BOWL', careerStatHighlight: 'Best: 3/9' },
      { name: 'Damith Kosala', role: 'BOWL', careerStatHighlight: 'Econ: 7.2' },
    ]
  },
  SPAIN_XI: {
    name: 'Spain XI',
    code: 'ESP',
    logoUrl: 'https://flagcdn.com/w160/es.png',
    country: 'Spain',
    players: [
      { name: 'Christian Munoz-Mills', role: 'BAT', careerStatHighlight: 'Spanish Captain' },
      { name: 'Awais Ahmed', role: 'WK', careerStatHighlight: 'ECS Record 6s Hitter' },
      { name: 'Yasir Ali', role: 'AR', careerStatHighlight: 'Avg: 48.0 • 20 Wkts' },
      { name: 'Hamza Dar', role: 'BAT', careerStatHighlight: 'SR: 185.0' },
      { name: 'Daniel Doyle-Calle', role: 'BAT', careerStatHighlight: 'Avg: 38.0' },
      { name: 'Ravi Panchal', role: 'AR', careerStatHighlight: 'Econ: 7.0 • 15 Wkts' },
      { name: 'Muhammad Ihsan', role: 'BAT', careerStatHighlight: 'Power Batsman' },
      { name: 'Atif Mehmood', role: 'BOWL', careerStatHighlight: 'Best: 4/6' },
      { name: 'Charlie Rumistrzewicz', role: 'BOWL', careerStatHighlight: 'Young Spin Talent' },
      { name: 'Lorne Burns', role: 'BOWL', careerStatHighlight: 'Econ: 6.9' },
      { name: 'Muhammad Atif', role: 'BOWL', careerStatHighlight: 'Best: 3/10' },
    ]
  }
};

// Generates upcoming European T10/T20 matches for the next 7 days
export async function generateUpcomingEuropeanMatches() {
  const matchups = [
    { t1: 'PAK_I_CARE', t2: 'CATALUNYA', series: 'ECS Spain T10 Barcelona', format: 'T10', hoursOffset: 4 },
    { t1: 'MADRID', t2: 'SPAIN_XI', series: 'ECS Spain T10 Series', format: 'T10', hoursOffset: 8 },
    { t1: 'ROYAL_ROMA', t2: 'BRESCIA', series: 'ECS Italy T10 Rome', format: 'T10', hoursOffset: 24 },
    { t1: 'DREUX', t2: 'OLD_VICTORIANS', series: 'European Cricket League (ECL) 2026', format: 'T10', hoursOffset: 32 },
    { t1: 'NETHERLANDS_XI', t2: 'ITALY_XI', series: 'European T20 International Series', format: 'T20', hoursOffset: 48 },
    { t1: 'FORFARSHIRE', t2: 'DREUX', series: 'European Cricket League (ECL) 2026', format: 'T10', hoursOffset: 56 },
    { t1: 'SPAIN_XI', t2: 'ITALY_XI', series: 'European T20 Quadrangular Trophy', format: 'T20', hoursOffset: 72 },
    { t1: 'CATALUNYA', t2: 'ROYAL_ROMA', series: 'European Cricket League Champions Cup', format: 'T10', hoursOffset: 96 },
  ];

  const now = new Date();
  let createdCount = 0;

  for (const m of matchups) {
    const team1Data = EUROPEAN_TEAMS_ROSTER[m.t1];
    const team2Data = EUROPEAN_TEAMS_ROSTER[m.t2];

    if (!team1Data || !team2Data) continue;

    const matchStartTime = new Date(now.getTime() + m.hoursOffset * 60 * 60 * 1000);
    const apiId = `euro_${m.t1.toLowerCase()}_vs_${m.t2.toLowerCase()}_${matchStartTime.toISOString().slice(0, 10)}`;

    const mapSquad = (team: EuropeanTeamPreset, teamIndex: number) => {
      return team.players.map((p, idx) => {
        const portraitIndex = (teamIndex * 6 + idx) % ATHLETE_PORTRAITS.length;
        return {
          id: `p_${team.code.toLowerCase()}_${idx + 1}`,
          name: p.name,
          shortName: p.name.split(' ').slice(-1)[0] || p.name,
          team: team.code,
          teamName: team.name,
          role: p.role,
          avatar: ATHLETE_PORTRAITS[portraitIndex],
          country: team.country,
          recentForm: ['45', '2/18', '31*'],
          careerStatHighlight: p.careerStatHighlight || 'European League Star'
        };
      });
    };

    const matchPayload = {
      apiId,
      title: `${team1Data.name} vs ${team2Data.name}`,
      series: m.series,
      format: m.format,
      team1: { 
        name: team1Data.name, 
        code: team1Data.code, 
        logoUrl: team1Data.logoUrl || `https://flagcdn.com/w160/${team1Data.country.toLowerCase().slice(0, 2)}.png` 
      },
      team2: { 
        name: team2Data.name, 
        code: team2Data.code, 
        logoUrl: team2Data.logoUrl || `https://flagcdn.com/w160/${team2Data.country.toLowerCase().slice(0, 2)}.png` 
      },
      matchStartTime: matchStartTime.toISOString(),
      squadTeam1: mapSquad(team1Data, 0),
      squadTeam2: mapSquad(team2Data, 1),
    };

    const existingMatch = await Match.findOne({ apiId });
    if (!existingMatch) {
      await Match.create({
        ...matchPayload,
        status: 'FETCHED',
        questions: [],
        entryFees: [25, 50, 100],
      });
      createdCount++;
    } else if (existingMatch.status === 'FETCHED' || existingMatch.status === 'DRAFT') {
      // Update logos and player avatars
      await Match.updateOne({ apiId }, { $set: matchPayload });
    }
  }

  return { success: true, added: createdCount };
}
