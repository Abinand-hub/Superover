import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Match from '@/models/Match';
import { autoLockMatches } from '@/lib/cricapi';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    await autoLockMatches();
    
    // Return all published matches (exclude FETCHED and DRAFT without questions)
    const query = {
      status: { $in: ['UPCOMING', 'LOCKED', 'LIVE', 'COMPLETED'] },
    };
    
    let matches = await Match.find(query as any).sort({ matchStartTime: 1 }).lean();

    // Map and sanitize match objects
    const sanitizedMatches = matches.map((match: any) => ({
      ...match,
      id: match._id.toString(),
      startTime: match.matchStartTime || match.startTime,
      lockTime: match.lockTime || match.matchStartTime,
    }));

    return NextResponse.json(sanitizedMatches);
  } catch (error: any) {
    console.error('Fetch Matches API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
