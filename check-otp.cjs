const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function checkDb() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://superover_admin:Superover2026@superover.iwmzzz4.mongodb.net/?appName=Superover');
  const db = mongoose.connection.db;
  const otps = await db.collection('otps').find({}).toArray();
  console.log('Total OTPs in DB:', otps.length);
  console.log(otps);
  process.exit(0);
}
checkDb();
