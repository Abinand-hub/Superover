const mongoose = require('mongoose');

async function check() {
  await mongoose.connect('mongodb+srv://superover_admin:Superover2026@superover.iwmzzz4.mongodb.net/?appName=Superover');
  const matches = await mongoose.connection.db.collection('matches').find().toArray();
  console.log("MATCHES IN DB:");
  console.log(matches.map(m => m.title || m.series || m.name || m.id || m._id));
  process.exit(0);
}
check();
