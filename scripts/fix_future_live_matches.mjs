import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://superover_admin:Superover2026@superover.iwmzzz4.mongodb.net/?appName=Superover';

async function fixFutureMatches() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  const now = new Date();
  
  // Find matches that are set to LIVE but have their matchStartTime in the future
  const prematureLiveMatches = await mongoose.connection.collection('matches').find({
    status: 'LIVE',
    matchStartTime: { $gt: now.toISOString() }
  }).toArray();

  console.log(`Found ${prematureLiveMatches.length} future matches currently marked as LIVE.`);

  for (const m of prematureLiveMatches) {
    const hasQuestions = Array.isArray(m.questions) && m.questions.length > 0;
    const targetStatus = hasQuestions ? 'UPCOMING' : 'FETCHED';
    await mongoose.connection.collection('matches').updateOne(
      { _id: m._id },
      { $set: { status: targetStatus } }
    );
    console.log(`Reverted match "${m.title}" to ${targetStatus}`);
  }

  console.log('Done!');
  process.exit(0);
}

fixFutureMatches().catch(console.error);
