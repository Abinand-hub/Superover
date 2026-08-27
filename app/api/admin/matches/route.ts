import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Match from '@/models/Match';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    
    // Admins get ALL matches, including FETCHED and DRAFT, from the last 7 days to next 14 days
    const now = new Date();
    const past = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const future = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);

    const query = {
      matchStartTime: {
        $gte: past.toISOString(),
        $lte: future.toISOString()
      }
    };
    
    let matches = await Match.find(query).sort({ matchStartTime: 1 }).lean();

    return NextResponse.json(matches);
  } catch (error: any) {
    console.error('Fetch Admin Matches Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
