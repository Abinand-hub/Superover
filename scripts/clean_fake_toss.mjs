import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://superover_admin:Superover2026@superover.iwmzzz4.mongodb.net/?appName=Superover';

async function cleanFakeToss() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  const now = new Date();
  const thirtyMinsFromNow = new Date(now.getTime() + 30 * 60 * 1000);

  // Future matches (>30 mins away) cannot have a real toss yet
  const result = await mongoose.connection.collection('matches').updateMany(
    {
      matchStartTime: { $gt: thirtyMinsFromNow.toISOString() },
      status: { $in: ['FETCHED', 'DRAFT', 'UPCOMING'] }
    },
    {
      $unset: {
        tossWinner: '',
        tossDecision: '',
        tossSummary: ''
      }
    }
  );

  console.log(`Cleaned fake toss data from ${result.modifiedCount} future matches.`);
  process.exit(0);
}

cleanFakeToss().catch(console.error);
