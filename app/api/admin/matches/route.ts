import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Match from '@/models/Match';
import { autoLockMatches } from '@/lib/matchLifecycle';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    await autoLockMatches();
    
    // Return all matches sorted by start time (newest / upcoming first)
    const matches = await Match.find({}).sort({ matchStartTime: -1 }).lean();

    return NextResponse.json(matches);
  } catch (error: any) {
    console.error('Admin Matches Fetch Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const title = body.title || `${body.team1?.name || 'Team 1'} vs ${body.team2?.name || 'Team 2'}`;
    const series = body.series || 'Cricket Contest Series';
    const format = body.format || 'T20';
    const matchStartTime = body.startTime || body.matchStartTime || new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString();
    const status = body.status || 'UPCOMING';
    const entryFees = body.entryFees || [25, 50, 100];
    const totalPool = body.totalPool || 100000;
    const questions = body.questions || [];
    const squadTeam1 = body.squadTeam1 || [];
    const squadTeam2 = body.squadTeam2 || [];
    const team1 = body.team1 || { name: 'Team 1', code: 'T1' };
    const team2 = body.team2 || { name: 'Team 2', code: 'T2' };

    const newMatch = await Match.create({
      apiId: `custom_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      title,
      series,
      format,
      team1,
      team2,
      matchStartTime,
      status,
      totalPool,
      totalEntries: 0,
      entryFees,
      questions,
      squadTeam1,
      squadTeam2,
      liveScore: body.liveScore || '',
    });

    console.log(`✅ Admin created and published match: ${newMatch.title} (${newMatch._id})`);
    return NextResponse.json(newMatch, { status: 201 });
  } catch (error: any) {
    console.error('Admin Create Match Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
