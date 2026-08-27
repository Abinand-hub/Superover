import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Match from '@/models/Match';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    await Match.updateMany({}, {
      $set: { status: 'FETCHED', questions: [], maxEntriesPerUser: 1 }
    });
    return NextResponse.json({ success: true, message: "Reset all matches to FETCHED with 0 questions." });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
