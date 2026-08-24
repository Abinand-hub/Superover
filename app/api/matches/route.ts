import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Match from '@/models/Match';
import { syncMatchesFromCricAPI } from '@/lib/cricapi';

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    
    // Return all matches, sorted by matchStartTime ascending
    let matches = await Match.find({}).sort({ matchStartTime: 1 }).lean();

    // If the database is completely empty OR the demo match is missing, auto-sync from CricAPI to populate it
    const hasDemoMatch = matches.some(m => m.apiId === 'mock-upcoming-2');
    if (matches.length === 0 || !hasDemoMatch) {
      console.log('Demo match missing or DB empty! Auto-syncing matches from CricAPI...');
      await syncMatchesFromCricAPI();
      // Re-fetch after syncing
      matches = await Match.find({}).sort({ matchStartTime: 1 }).lean();
    }

    return NextResponse.json(matches);
  } catch (error: any) {
    console.error('Fetch Matches Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
