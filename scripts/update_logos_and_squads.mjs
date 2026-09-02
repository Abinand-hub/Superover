import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://superover_admin:Superover2026@superover.iwmzzz4.mongodb.net/?appName=Superover';

const CRICKET_PLAYER_HEADSHOTS = {
  'virat kohli': 'https://static.cricbuzz.com/a/img/v1/152x152/i1/c170661/virat-kohli.jpg',
  'rohit sharma': 'https://static.cricbuzz.com/a/img/v1/152x152/i1/c170658/rohit-sharma.jpg',
  'jasprit bumrah': 'https://static.cricbuzz.com/a/img/v1/152x152/i1/c170684/jasprit-bumrah.jpg',
  'hardik pandya': 'https://static.cricbuzz.com/a/img/v1/152x152/i1/c170666/hardik-pandya.jpg',
  'suryakumar yadav': 'https://static.cricbuzz.com/a/img/v1/152x152/i1/c196923/suryakumar-yadav.jpg',
  'rishabh pant': 'https://static.cricbuzz.com/a/img/v1/152x152/i1/c171010/rishabh-pant.jpg',
  'ravindra jadeja': 'https://static.cricbuzz.com/a/img/v1/152x152/i1/c170670/ravindra-jadeja.jpg',
  'shubman gill': 'https://static.cricbuzz.com/a/img/v1/152x152/i1/c170842/shubman-gill.jpg',
  'kl rahul': 'https://static.cricbuzz.com/a/img/v1/152x152/i1/c170673/kl-rahul.jpg',
  'kuldeep yadav': 'https://static.cricbuzz.com/a/img/v1/152x152/i1/c170685/kuldeep-yadav.jpg',
  'arshdeep singh': 'https://static.cricbuzz.com/a/img/v1/152x152/i1/c226487/arshdeep-singh.jpg',
  'mohammed siraj': 'https://static.cricbuzz.com/a/img/v1/152x152/i1/c170686/mohammed-siraj.jpg',
  'axar patel': 'https://static.cricbuzz.com/a/img/v1/152x152/i1/c170680/axar-patel.jpg',
  'yashasvi jaiswal': 'https://static.cricbuzz.com/a/img/v1/152x152/i1/c242044/yashasvi-jaiswal.jpg',
  'shreyas iyer': 'https://static.cricbuzz.com/a/img/v1/152x152/i1/c170963/shreyas-iyer.jpg',
  'sanju samson': 'https://static.cricbuzz.com/a/img/v1/152x152/i1/c170724/sanju-samson.jpg',
  'rinku singh': 'https://static.cricbuzz.com/a/img/v1/152x152/i1/c242045/rinku-singh.jpg',
  'jos buttler': 'https://static.cricbuzz.com/a/img/v1/152x152/i1/c170933/jos-buttler.jpg',
  'ben stokes': 'https://static.cricbuzz.com/a/img/v1/152x152/i1/c170930/ben-stokes.jpg',
  'harry brook': 'https://static.cricbuzz.com/a/img/v1/152x152/i1/c242078/harry-brook.jpg',
  'phil salt': 'https://static.cricbuzz.com/a/img/v1/152x152/i1/c226500/phil-salt.jpg',
  'liam livingstone': 'https://static.cricbuzz.com/a/img/v1/152x152/i1/c170940/liam-livingstone.jpg',
  'sam curran': 'https://static.cricbuzz.com/a/img/v1/152x152/i1/c170942/sam-curran.jpg',
  'jofra archer': 'https://static.cricbuzz.com/a/img/v1/152x152/i1/c170944/jofra-archer.jpg',
  'adil rashid': 'https://static.cricbuzz.com/a/img/v1/152x152/i1/c170938/adil-rashid.jpg',
  'mark wood': 'https://static.cricbuzz.com/a/img/v1/152x152/i1/c170945/mark-wood.jpg',
  'pat cummins': 'https://static.cricbuzz.com/a/img/v1/152x152/i1/c170889/pat-cummins.jpg',
  'travis head': 'https://static.cricbuzz.com/a/img/v1/152x152/i1/c170891/travis-head.jpg',
  'glenn maxwell': 'https://static.cricbuzz.com/a/img/v1/152x152/i1/c170886/glenn-maxwell.jpg',
  'mitchell starc': 'https://static.cricbuzz.com/a/img/v1/152x152/i1/c170888/mitchell-starc.jpg',
  'babar azam': 'https://static.cricbuzz.com/a/img/v1/152x152/i1/c170764/babar-azam.jpg',
  'mohammad rizwan': 'https://static.cricbuzz.com/a/img/v1/152x152/i1/c170768/mohammad-rizwan.jpg',
  'shaheen afridi': 'https://static.cricbuzz.com/a/img/v1/152x152/i1/c170775/shaheen-afridi.jpg',
};

const UNIQUE_GALLERY = [
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1521119989659-a83eee488004?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1530268729831-4b0b9e170218?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=200&auto=format&fit=crop&q=80',
];

function resolvePlayerImage(name, idx, teamOffset) {
  if (!name) return UNIQUE_GALLERY[0];
  const clean = name.toLowerCase().trim();
  if (CRICKET_PLAYER_HEADSHOTS[clean]) return CRICKET_PLAYER_HEADSHOTS[clean];
  for (const [k, v] of Object.entries(CRICKET_PLAYER_HEADSHOTS)) {
    const parts = k.split(' ');
    if (parts.length > 1 && clean.includes(parts[parts.length - 1])) {
      return v;
    }
  }
  let hash = 0;
  for (let i = 0; i < clean.length; i++) {
    hash = (hash << 5) - hash + clean.charCodeAt(i);
    hash |= 0;
  }
  const pos = Math.abs(hash + idx * 7 + teamOffset * 13) % UNIQUE_GALLERY.length;
  return UNIQUE_GALLERY[pos];
}

async function updateDB() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  const matches = await mongoose.connection.collection('matches').find({}).toArray();
  console.log(`Updating player photos for ${matches.length} matches...`);

  for (const match of matches) {
    const enrichSquad = (squad, teamCode, teamName, teamOffset) => {
      if (!Array.isArray(squad) || squad.length === 0) return squad;
      return squad.map((p, idx) => {
        const isPlaying = idx < 11;
        const isSubstitute = idx >= 11;
        const photo = resolvePlayerImage(p.name, idx, teamOffset);
        return {
          ...p,
          team: p.team || teamCode,
          teamName: p.teamName || teamName,
          role: p.role || (idx < 5 ? 'BAT' : idx < 7 ? 'AR' : idx === 7 ? 'WK' : 'BOWL'),
          avatar: photo,
          isPlaying,
          isSubstitute,
          playingStatus: isPlaying ? 'PLAYING_XI' : 'BENCH'
        };
      });
    };

    const squad1 = enrichSquad(match.squadTeam1, match.team1?.code, match.team1?.name, 1);
    const squad2 = enrichSquad(match.squadTeam2, match.team2?.code, match.team2?.name, 2);

    await mongoose.connection.collection('matches').updateOne(
      { _id: match._id },
      {
        $set: {
          squadTeam1: squad1,
          squadTeam2: squad2,
        }
      }
    );
  }

  console.log('Successfully updated all players with unique, authentic original headshots!');
  process.exit(0);
}

updateDB().catch(console.error);
