const mongoose = require('mongoose');
const url = 'mongodb+srv://abinandhub:uM8yP6l53jXbZ9jE@cluster0.pud49.mongodb.net/superover?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(url).then(async () => {
  const matches = await mongoose.connection.db.collection('matches').find({}).toArray();
  for (const match of matches) {
    if (!match.squadTeam1 || match.squadTeam1.length === 0) {
      const mockSquad1 = Array.from({length: 11}).map((_, i) => ({
        id: match.team1.code + '_player_' + i,
        name: match.team1.name + ' Player ' + (i+1),
        shortName: 'P' + (i+1),
        team: match.team1.code,
        teamName: match.team1.name,
        role: i < 5 ? 'BAT' : i < 7 ? 'AR' : i === 7 ? 'WK' : 'BOWL',
        avatar: 'https://ui-avatars.com/api/?name=' + match.team1.code + '+' + (i+1) + '&background=random',
        country: match.team1.name,
        recentForm: [],
        careerStatHighlight: 'Pro Player'
      }));
      const mockSquad2 = Array.from({length: 11}).map((_, i) => ({
        id: match.team2.code + '_player_' + i,
        name: match.team2.name + ' Player ' + (i+1),
        shortName: 'P' + (i+1),
        team: match.team2.code,
        teamName: match.team2.name,
        role: i < 5 ? 'BAT' : i < 7 ? 'AR' : i === 7 ? 'WK' : 'BOWL',
        avatar: 'https://ui-avatars.com/api/?name=' + match.team2.code + '+' + (i+1) + '&background=random',
        country: match.team2.name,
        recentForm: [],
        careerStatHighlight: 'Pro Player'
      }));
      await mongoose.connection.db.collection('matches').updateOne(
        { _id: match._id },
        { $set: { squadTeam1: mockSquad1, squadTeam2: mockSquad2 } }
      );
      console.log('Patched mock squads for', match.title);
    }
  }
  process.exit(0);
});
