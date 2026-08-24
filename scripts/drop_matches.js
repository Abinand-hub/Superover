import mongoose from 'mongoose';

const MONGODB_URI = "mongodb+srv://pixelbaystudios720_db_user:2NSbu2nn4KecJ878@superover.nk5ffd7.mongodb.net/superover?retryWrites=true&w=majority&appName=Superover";

async function clearMatches() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    
    const db = mongoose.connection.db;
    
    // Check if matches collection exists
    const collections = await db.listCollections({ name: 'matches' }).toArray();
    
    if (collections.length > 0) {
      await db.collection('matches').drop();
      console.log('Matches collection dropped successfully!');
    } else {
      console.log('Matches collection does not exist, nothing to drop.');
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  }
}

clearMatches();
