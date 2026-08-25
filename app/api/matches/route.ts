import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Match from '@/models/Match';
import { syncMatchesFromCricAPI } from '@/lib/cricapi';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    
    const now = new Date();
    // Allow up to 48 hours in the past so admins have time to settle results
    const twoDaysAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000);
    const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    // Return matches from 48h ago to 7 days from now, sorted by start time
    const query = {
      matchStartTime: {
        $gte: twoDaysAgo.toISOString(),
        $lte: sevenDaysFromNow.toISOString()
      }
    };
    
    let matches = await Match.find(query).sort({ matchStartTime: 1 }).lean();
    // If the database has no upcoming matches in this window, auto-sync from CricAPI
    if (matches.length === 0) {
      console.log('No recent/upcoming matches! Auto-syncing matches from CricAPI...');
      await syncMatchesFromCricAPI();
      matches = await Match.find(query).sort({ matchStartTime: 1 }).lean();
    }

    return NextResponse.json(matches);
  } catch (error: any) {
    console.error('Fetch Matches Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
