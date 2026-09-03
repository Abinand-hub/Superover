import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Match from '@/models/Match';
import Slip from '@/models/Slip';
import { generateUpcomingFanCodeAndInternationalMatches } from '@/lib/tournamentFeeds';

export async function GET(req: NextRequest) {
  return handleReset();
}

export async function POST(req: NextRequest) {
  return handleReset();
}

async function handleReset() {
  try {
    await connectDB();
    
    // 1. Delete all old slips
    await Slip.deleteMany({});

    // 2. Delete outdated test matches (e.g. Turkey Women, Isle of Man, old LOCKED)
    await Match.deleteMany({
      $or: [
        { title: { $regex: /Turkey|Isle Of Man|Scotland Women/i } },
        { status: { $in: ['LOCKED', 'COMPLETED'] } }
      ]
    });

    // 3. Reset all remaining matches to clean FETCHED state
    await Match.updateMany({}, {
      $set: { 
        status: 'FETCHED', 
        questions: [], 
        totalPool: 0, 
        totalEntries: 0,
        actualResults: null,
        liveScore: ''
      },
      $unset: {
        tossWinner: '',
        tossDecision: '',
        tossSummary: ''
      }
    });

    // 4. Regenerate clean FanCode domestic & international upcoming matches (next 48h)
    await generateUpcomingFanCodeAndInternationalMatches();

    return NextResponse.json({ 
      success: true, 
      message: "Successfully reset all contests. Database is completely clean and ready for new contest testing." 
    });
  } catch (error: any) {
    console.error('Reset Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
