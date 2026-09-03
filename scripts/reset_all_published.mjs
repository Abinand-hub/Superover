import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://superover_admin:Superover2026@superover.iwmzzz4.mongodb.net/?appName=Superover';

async function resetAll() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  // 1. Delete all slips
  const deletedSlips = await mongoose.connection.collection('slips').deleteMany({});
  console.log(`Deleted ${deletedSlips.deletedCount} old prediction slips.`);

  // 2. Delete old mock matches or reset all matches to FETCHED
  const deletedMatches = await mongoose.connection.collection('matches').deleteMany({
    $or: [
      { title: { $regex: /Turkey|Isle Of Man|Scotland Women/i } },
      { status: { $in: ['LOCKED', 'COMPLETED'] } }
    ]
  });
  console.log(`Deleted ${deletedMatches.deletedCount} outdated/locked test matches.`);

  // Reset any remaining published/upcoming matches to FETCHED with clean questions
  const resetMatches = await mongoose.connection.collection('matches').updateMany(
    {},
    {
      $set: {
        status: 'FETCHED',
        questions: [],
        totalPool: 0,
        totalEntries: 0,
        actualResults: null,
        liveScore: ''
      },
      $unset: {
        tossWinner: '',
        tossDecision: '',
        tossSummary: ''
      }
    }
  );
  console.log(`Reset ${resetMatches.modifiedCount} matches to clean FETCHED state.`);

  // 3. Reset users wallet balance to ₹1,000 for smooth testing
  const updatedWallets = await mongoose.connection.collection('wallets').updateMany(
    {},
    {
      $set: {
        balance: 1000,
        totalWon: 0,
        totalStaked: 0
      }
    }
  );
  console.log(`Reset ${updatedWallets.modifiedCount} user wallets to ₹1,000 testing balance.`);

  process.exit(0);
}

resetAll().catch(console.error);
