import mongoose from 'mongoose';
import Match from './models/Match';
import Slip from './models/Slip';

async function run() {
  await mongoose.connect('mongodb+srv://superover_admin:Superover2026@superover.iwmzzz4.mongodb.net/?appName=Superover');
  const match = await Match.findOne({ apiId: 'mock-upcoming-2' });
  if (match) {
    match.status = 'UPCOMING';
    match.matchStartTime = new Date(Date.now() + 60 * 60 * 1000).toISOString();
    await match.save();
    await Slip.updateMany({ matchId: match._id }, { $set: { status: 'PENDING' }, $unset: { correctCount: "", multiplierWon: "", payoutAmount: "" } });
    console.log('Reset complete');
  }
  process.exit(0);
}
run();
