import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import QuestionBank from '@/models/QuestionBank';

// Seed questions requested by the user
const DEFAULT_BANK = [
  { shortTitle: 'Match Winner', title: 'Which team will win the match?', subtitle: 'Pick the winning team', type: 'TEAM', optionsType: 'FIXED', options: [], iconName: 'TROPHY' },
  { shortTitle: 'Top Batter Match', title: 'Who will be the Top Batter in the match?', subtitle: 'Most runs scored in the match', type: 'PLAYER', optionsType: 'DYNAMIC_SQUAD', options: [], iconName: 'BAT' },
  { shortTitle: 'Top Bowler Match', title: 'Who will be the Top Bowler in the match?', subtitle: 'Most wickets taken in the match', type: 'PLAYER', optionsType: 'DYNAMIC_SQUAD', options: [], iconName: 'BOWL' },
  { shortTitle: 'Top Batter Team 1', title: 'Top Batter (Team 1)', subtitle: 'Most runs scored for Team 1', type: 'PLAYER', optionsType: 'DYNAMIC_SQUAD', options: [], iconName: 'BAT' },
  { shortTitle: 'Top Batter Team 2', title: 'Top Batter (Team 2)', subtitle: 'Most runs scored for Team 2', type: 'PLAYER', optionsType: 'DYNAMIC_SQUAD', options: [], iconName: 'BAT' },
  { shortTitle: 'Top Bowler Team 1', title: 'Top Bowler (Team 1)', subtitle: 'Most wickets for Team 1', type: 'PLAYER', optionsType: 'DYNAMIC_SQUAD', options: [], iconName: 'BOWL' },
  { shortTitle: 'Top Bowler Team 2', title: 'Top Bowler (Team 2)', subtitle: 'Most wickets for Team 2', type: 'PLAYER', optionsType: 'DYNAMIC_SQUAD', options: [], iconName: 'BOWL' },
  { shortTitle: 'Best Striker', title: 'Who will be the Best Striker?', subtitle: 'Highest strike rate', type: 'PLAYER', optionsType: 'DYNAMIC_SQUAD', options: [], iconName: 'STAR' },
  { shortTitle: 'Most Economical Bowler', title: 'Most Economical Bowler', subtitle: 'Lowest economy rate', type: 'PLAYER', optionsType: 'DYNAMIC_SQUAD', options: [], iconName: 'SHIELD' },
  { shortTitle: 'Most Dot Balls', title: 'Who will bowl the most dot balls?', subtitle: 'Most dot balls in the match', type: 'PLAYER', optionsType: 'DYNAMIC_SQUAD', options: [], iconName: 'SHIELD' },
  { shortTitle: 'Most 6s', title: 'Which batter will hit the most 6s?', subtitle: 'Highest number of 6s by a batter', type: 'PLAYER', optionsType: 'DYNAMIC_SQUAD', options: [], iconName: 'TICKET' },
  { shortTitle: 'Total Boundaries', title: 'Total Boundaries (4s + 6s)', subtitle: 'Over or Under 24.5?', type: 'MULTIPLE_CHOICE', optionsType: 'FIXED', options: ['Over 24.5', 'Under 24.5'], iconName: 'TICKET' },
  { shortTitle: 'Total Extras', title: 'Total Extras in the Match', subtitle: 'Over or Under 15.5?', type: 'MULTIPLE_CHOICE', optionsType: 'FIXED', options: ['Over 15.5', 'Under 15.5'], iconName: 'ALERT' },
  { shortTitle: 'Total Runs', title: 'Total Runs Scored', subtitle: 'Over or Under 310.5?', type: 'MULTIPLE_CHOICE', optionsType: 'FIXED', options: ['Over 310.5', 'Under 310.5'], iconName: 'STAR' },
  { shortTitle: 'Total Wickets', title: 'Total Wickets Fallen', subtitle: 'Over or Under 12.5?', type: 'MULTIPLE_CHOICE', optionsType: 'FIXED', options: ['Over 12.5', 'Under 12.5'], iconName: 'BOWL' },
  { shortTitle: 'Most Expensive Bowler', title: 'Most Expensive Bowler', subtitle: 'Most runs conceded', type: 'PLAYER', optionsType: 'DYNAMIC_SQUAD', options: [], iconName: 'ALERT' },
];

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    let questions = await QuestionBank.find().sort({ createdAt: 1 }).lean();

    // Auto-seed if empty
    if (questions.length === 0) {
      await QuestionBank.insertMany(DEFAULT_BANK);
      questions = await QuestionBank.find().sort({ createdAt: 1 }).lean();
    }

    return NextResponse.json(questions);
  } catch (error) {
    console.error('Fetch QuestionBank Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const newQuestion = await QuestionBank.create(body);
    return NextResponse.json(newQuestion, { status: 201 });
  } catch (error) {
    console.error('Create Question Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
