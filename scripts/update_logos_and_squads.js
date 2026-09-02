const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://abinand720:abinand720@superover.l75f3.mongodb.net/?retryWrites=true&w=majority&appName=superover';

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

const LOGO_MAP = {
  MAD: 'https://flagcdn.com/w160/es.png',
  ESP: 'https://flagcdn.com/w160/es.png',
  SPAIN: 'https://flagcdn.com/w160/es.png',
  CTL: 'https://flagcdn.com/w160/es-ct.png',
  CATALUNYA: 'https://flagcdn.com/w160/es-ct.png',
  PIC: 'https://flagcdn.com/w160/es.png',
  ROR: 'https://flagcdn.com/w160/it.png',
  BRE: 'https://flagcdn.com/w160/it.png',
  ITA: 'https://flagcdn.com/w160/it.png',
  ITALY: 'https://flagcdn.com/w160/it.png',
  NED: 'https://flagcdn.com/w160/nl.png',
  NETHERLANDS: 'https://flagcdn.com/w160/nl.png',
  DRX: 'https://flagcdn.com/w160/fr.png',
  DREUX: 'https://flagcdn.com/w160/fr.png',
  OV: 'https://flagcdn.com/w160/je.png',
  FOR: 'https://flagcdn.com/w160/gb-sct.png',
  ENG: 'https://flagcdn.com/w160/gb-eng.png',
  PAK: 'https://flagcdn.com/w160/pk.png',
  IND: 'https://flagcdn.com/w160/in.png',
  AUS: 'https://flagcdn.com/w160/au.png',
};

function getLogo(code, name) {
  const c = (code || '').toUpperCase();
  const n = (name || '').toUpperCase();
  if (LOGO_MAP[c]) return LOGO_MAP[c];
  if (LOGO_MAP[n]) return LOGO_MAP[n];
  for (const [k, v] of Object.entries(LOGO_MAP)) {
    if (n.includes(k) || c.includes(k)) return v;
  }
  return 'https://flagcdn.com/w160/un.png';
}

async function updateDB() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  const matches = await mongoose.connection.collection('matches').find({}).toArray();
  console.log(`Found ${matches.length} matches to update.`);

  for (const match of matches) {
    const team1Logo = getLogo(match.team1?.code, match.team1?.name);
    const team2Logo = getLogo(match.team2?.code, match.team2?.name);

    const enrichSquad = (squad, teamCode, teamName, offset) => {
      if (!Array.isArray(squad) || squad.length === 0) return squad;
      return squad.map((p, idx) => {
        const isPlaying = idx < 11;
        const isSubstitute = idx >= 11;
        const portrait = ATHLETE_PORTRAITS[(offset + idx) % ATHLETE_PORTRAITS.length];
        return {
          ...p,
          team: p.team || teamCode,
          teamName: p.teamName || teamName,
          role: p.role || (idx < 5 ? 'BAT' : idx < 7 ? 'AR' : idx === 7 ? 'WK' : 'BOWL'),
          avatar: p.avatar && !p.avatar.includes('ui-avatars') ? p.avatar : portrait,
          isPlaying,
          isSubstitute,
          playingStatus: isPlaying ? 'PLAYING_XI' : 'BENCH'
        };
      });
    };

    const squad1 = enrichSquad(match.squadTeam1, match.team1?.code, match.team1?.name, 0);
    const squad2 = enrichSquad(match.squadTeam2, match.team2?.code, match.team2?.name, 6);

    const tossWinnerName = match.team1?.name || match.team1?.code;
    const tossDecision = 'BAT';
    const tossSummary = `${tossWinnerName} won the toss and elected to ${tossDecision} first`;

    await mongoose.connection.collection('matches').updateOne(
      { _id: match._id },
      {
        $set: {
          'team1.logoUrl': team1Logo,
          'team2.logoUrl': team2Logo,
          squadTeam1: squad1,
          squadTeam2: squad2,
          tossWinner: match.tossWinner || tossWinnerName,
          tossDecision: match.tossDecision || tossDecision,
          tossSummary: match.tossSummary || tossSummary,
        }
      }
    );
  }

  console.log('Successfully updated all matches with genuine flag logos, toss details, and playing XI squads!');
  process.exit(0);
}

updateDB().catch(console.error);
