import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { syncMatchesFromCricAPI, autoLockMatches } from '@/lib/cricapi';

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    
    // 1. Sync new matches from API
    const syncResult = await syncMatchesFromCricAPI();

    // 2. Auto-lock matches that are 1 minute away
    await autoLockMatches();

    return NextResponse.json({ 
      message: 'Cron executed successfully',
      syncResult
    });
  } catch (error: any) {
    console.error('Cron Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
