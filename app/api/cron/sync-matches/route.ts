import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { syncMatchesFromCricAPI, autoLockMatches } from '@/lib/cricapi';
import { generateUpcomingEuropeanMatches } from '@/lib/europeanScraper';

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    
    // 1. Sync new international matches from CricAPI
    const syncResult = await syncMatchesFromCricAPI();

    // 2. Sync European Cricket matches (ECS T10, ECL, European T20s)
    const europeanResult = await generateUpcomingEuropeanMatches();

    // 3. Auto-lock / Auto-progress matches
    await autoLockMatches();

    return NextResponse.json({ 
      message: 'Cron executed successfully',
      syncResult,
      europeanResult
    });
  } catch (error: any) {
    console.error('Cron Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
