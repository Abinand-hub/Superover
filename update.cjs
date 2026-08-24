const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://pixelbaystudios720_db_user:2NSbu2nn4KecJ878@superover.nk5ffd7.mongodb.net/superover?retryWrites=true&w=majority&appName=Superover';

async function main() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  const questions = [
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

  const db = mongoose.connection.db;
  const result = await db.collection('matches').updateMany(
    {},
    { $set: { questions: questions } }
  );

  console.log(`Updated ${result.modifiedCount} matches with the new 6 questions.`);
  process.exit(0);
}

main().catch(console.error);
