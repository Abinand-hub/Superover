const mongoose = require('mongoose');

async function run() {
  const MONGODB_URI = 'mongodb+srv://superover_admin:Superover2026@superover.iwmzzz4.mongodb.net/?appName=Superover';
  await mongoose.connect(MONGODB_URI);

  const db = mongoose.connection.db;

  console.log('Connected to MongoDB');

  // 1. Update the user role for abinand720@gmail.com
  const userResult = await db.collection('users').updateOne(
    { email: 'abinand720@gmail.com' },
    { $set: { role: 'USER' } }
  );
  console.log('User update result:', userResult.modifiedCount);

  // 2. Clear all demo matches, slips, and transactions
  const matchResult = await db.collection('matches').deleteMany({});
  console.log('Matches cleared result:', matchResult.deletedCount);

  const slipsResult = await db.collection('slips').deleteMany({});
  console.log('Slips cleared result:', slipsResult.deletedCount);

  const txResult = await db.collection('transactions').deleteMany({});
  console.log('Transactions cleared result:', txResult.deletedCount);

  await mongoose.disconnect();
  console.log('Disconnected');
}

run().catch(console.error);
