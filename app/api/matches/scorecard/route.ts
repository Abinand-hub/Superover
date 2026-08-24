import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Match from '@/models/Match';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const CRICAPI_KEY = process.env.CRICAPI_KEY || 'MOCK_KEY';
const CRICAPI_BASE_URL = 'https://api.cricapi.com/v1';
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_dev_key';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const matchId = searchParams.get('matchId');

    if (!matchId) {
      return NextResponse.json({ error: 'Match ID required' }, { status: 400 });
    }

    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    
    await connectToDatabase();
    
    // Verify admin
    const admin = await User.findById(decoded.userId);
    if (!admin || admin.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const match = await Match.findById(matchId);
    if (!match) {
      return NextResponse.json({ error: 'Match not found' }, { status: 404 });
    }

    const squads = [...(match.squadTeam1 || []), ...(match.squadTeam2 || [])];
    
    // If we have a mock key, generate realistic mock answers using the real squad list!
    if (CRICAPI_KEY === 'MOCK_KEY') {
      console.log('Generating MOCK scorecard results...');
      
      const batters = squads.filter(p => p.role === 'BAT' || p.role === 'AR' || p.role === 'WK');
      const bowlers = squads.filter(p => p.role === 'BOWL' || p.role === 'AR');
      
      const getRandom = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];
      
      const topBatter = getRandom(batters) || getRandom(squads);
      const topBowler = getRandom(bowlers) || getRandom(squads);
      const topStriker = getRandom(batters) || getRandom(squads);
      const econBowler = getRandom(bowlers) || getRandom(squads);
      const most6s = getRandom(batters) || getRandom(squads);
      const mostWickets = topBowler; // Usually same

      return NextResponse.json({
        answers: {
          q1_top_batter: topBatter.id,
          q2_top_bowler: topBowler.id,
          q3_top_striker: topStriker.id,
          q4_econ_bowler: econBowler.id,
          q5_most_6s: most6s.id,
          q6_most_wickets: mostWickets.id
        },
        summaryNote: `Auto-generated mock results since CRICAPI_KEY is not set.`
      });
    }

    // --- REAL CRICAPI LOGIC ---
    let scorecard = null;
    try {
      const res = await fetch(`${CRICAPI_BASE_URL}/match_scorecard?apikey=${CRICAPI_KEY}&id=${match.apiId}`);
      const data = await res.json();
      if (data.status === 'success') {
        scorecard = data.data;
      }
    } catch (e) {
      console.warn('CricAPI Fetch Failed', e);
    }

    if (!scorecard || !scorecard.scorecard) {
      console.log('Scorecard not available, falling back to mock results for testing.');
      const batters = squads.filter(p => p.role === 'BAT' || p.role === 'AR' || p.role === 'WK');
      const bowlers = squads.filter(p => p.role === 'BOWL' || p.role === 'AR');
      
      const getRandom = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];
      
      const topBatter = getRandom(batters) || getRandom(squads);
      const topBowler = getRandom(bowlers) || getRandom(squads);
      const topStriker = getRandom(batters) || getRandom(squads);
      const econBowler = getRandom(bowlers) || getRandom(squads);
      const most6s = getRandom(batters) || getRandom(squads);
      const mostWickets = topBowler;

      return NextResponse.json({
        answers: {
          q1_top_batter: topBatter?.id || '',
          q2_top_bowler: topBowler?.id || '',
          q3_top_striker: topStriker?.id || '',
          q4_econ_bowler: econBowler?.id || '',
          q5_most_6s: most6s?.id || '',
          q6_most_wickets: mostWickets?.id || ''
        },
        summaryNote: `Scorecard not available on CricAPI yet. Mock results auto-generated for testing purposes.`
      });
    }

    let allBatting: any[] = [];
    let allBowling: any[] = [];

    scorecard.scorecard.forEach((inning: any) => {
      if (inning.batting) allBatting = allBatting.concat(inning.batting);
      if (inning.bowling) allBowling = allBowling.concat(inning.bowling);
    });

    // Helper to find our DB player ID from CricAPI player name
    const findPlayerId = (cricapiName: string) => {
      // Very basic matching, in reality might need exact ID matching if cricapi provides it
      const matchName = cricapiName.toLowerCase().replace(/[^a-z0-9]/g, '');
      const found = squads.find(p => p.name.toLowerCase().replace(/[^a-z0-9]/g, '').includes(matchName) || matchName.includes(p.name.toLowerCase().replace(/[^a-z0-9]/g, '')));
      return found ? found.id : '';
    };

    let topBatter = '';
    let maxRuns = -1;
    let topStriker = '';
    let maxSr = -1;
    let most6s = '';
    let max6s = -1;

    allBatting.forEach((b: any) => {
      const runs = parseInt(b.r || 0);
      const sr = parseFloat(b.sr || 0);
      const sixes = parseInt(b['6s'] || 0);
      const balls = parseInt(b.b || 0);
      
      if (runs > maxRuns) { maxRuns = runs; topBatter = b.name; }
      if (balls >= 10 && sr > maxSr) { maxSr = sr; topStriker = b.name; }
      if (sixes > max6s) { max6s = sixes; most6s = b.name; }
    });

    let topBowler = '';
    let maxWickets = -1;
    let econBowler = '';
    let minEcon = 999;

    allBowling.forEach((b: any) => {
      const w = parseInt(b.w || 0);
      const econ = parseFloat(b.eco || 999);
      const overs = parseFloat(b.o || 0);

      if (w > maxWickets) { maxWickets = w; topBowler = b.name; }
      if (overs >= 2 && econ < minEcon) { minEcon = econ; econBowler = b.name; }
    });

    const answers = {
      q1_top_batter: findPlayerId(topBatter),
      q2_top_bowler: findPlayerId(topBowler),
      q3_top_striker: findPlayerId(topStriker),
      q4_econ_bowler: findPlayerId(econBowler),
      q5_most_6s: findPlayerId(most6s),
      q6_most_wickets: findPlayerId(topBowler)
    };

    return NextResponse.json({
      answers,
      summaryNote: `Auto-fetched via CricAPI. Top Batter: ${topBatter} (${maxRuns} runs). Top Bowler: ${topBowler} (${maxWickets} wkt).`
    });

  } catch (error: any) {
    console.error('Scorecard API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
