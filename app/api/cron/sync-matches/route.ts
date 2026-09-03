import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { syncMatchesFromCricAPI, autoLockMatches } from '@/lib/cricapi';
import { generateUpcomingFanCodeAndInternationalMatches } from '@/lib/tournamentFeeds';

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    
    // 1. Sync new international matches from CricAPI
    const syncResult = await syncMatchesFromCricAPI();

    // 2. Sync FanCode domestic & international matches (Dehradun T20, Sher-E-Punjab, CPL, DPL, ECL)
    const fanCodeResult = await generateUpcomingFanCodeAndInternationalMatches();

    // 3. Auto-lock / Auto-progress matches
    await autoLockMatches();

    return NextResponse.json({ 
      message: 'Cron executed successfully',
      syncResult,
      fanCodeResult
    });
  } catch (error: any) {
    console.error('Cron Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
