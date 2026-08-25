import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Match from '@/models/Match';
import { syncMatchesFromCricAPI } from '@/lib/cricapi';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    
    // Return all matches, sorted by matchStartTime ascending
    let matches = await Match.find({}).sort({ matchStartTime: 1 }).lean();

    // If the database is completely empty, auto-sync from CricAPI to populate it
    if (matches.length === 0) {
      console.log('DB empty! Auto-syncing matches from CricAPI...');
      await syncMatchesFromCricAPI();
      matches = await Match.find({}).sort({ matchStartTime: 1 }).lean();
    }

    return NextResponse.json(matches);
  } catch (error: any) {
    console.error('Fetch Matches Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
