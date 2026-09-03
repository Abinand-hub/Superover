import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import QuestionBank from '@/models/QuestionBank';

// Seed questions requested by the user: Pure Squad / Player performance questions without fixed options
const DEFAULT_BANK = [
  { shortTitle: 'Top Batter Match', title: 'Who will be the Top Batter in the match?', subtitle: 'Most runs scored in the match', type: 'PLAYER', optionsType: 'DYNAMIC_SQUAD', options: [], iconName: 'BAT' },
  { shortTitle: 'Top Bowler Match', title: 'Who will be the Top Bowler in the match?', subtitle: 'Most wickets taken in the match', type: 'PLAYER', optionsType: 'DYNAMIC_SQUAD', options: [], iconName: 'BOWL' },
  { shortTitle: 'Top Batter Team 1', title: 'Top Batter (Team 1)', subtitle: 'Most runs scored for Team 1', type: 'PLAYER', optionsType: 'DYNAMIC_SQUAD', options: [], iconName: 'BAT' },
  { shortTitle: 'Top Batter Team 2', title: 'Top Batter (Team 2)', subtitle: 'Most runs scored for Team 2', type: 'PLAYER', optionsType: 'DYNAMIC_SQUAD', options: [], iconName: 'BAT' },
  { shortTitle: 'Top Bowler Team 1', title: 'Top Bowler (Team 1)', subtitle: 'Most wickets for Team 1', type: 'PLAYER', optionsType: 'DYNAMIC_SQUAD', options: [], iconName: 'BOWL' },
  { shortTitle: 'Top Bowler Team 2', title: 'Top Bowler (Team 2)', subtitle: 'Most wickets for Team 2', type: 'PLAYER', optionsType: 'DYNAMIC_SQUAD', options: [], iconName: 'BOWL' },
  { shortTitle: 'Best Striker', title: 'Who will be the Best Striker?', subtitle: 'Highest batting strike rate in the match', type: 'PLAYER', optionsType: 'DYNAMIC_SQUAD', options: [], iconName: 'STAR' },
  { shortTitle: 'Most Economical Bowler', title: 'Most Economical Bowler', subtitle: 'Lowest economy rate in the match', type: 'PLAYER', optionsType: 'DYNAMIC_SQUAD', options: [], iconName: 'SHIELD' },
  { shortTitle: 'Most Dot Balls', title: 'Who will bowl the most dot balls?', subtitle: 'Highest number of dot balls bowled', type: 'PLAYER', optionsType: 'DYNAMIC_SQUAD', options: [], iconName: 'SHIELD' },
  { shortTitle: 'Most 6s', title: 'Which batter will hit the most 6s?', subtitle: 'Highest number of 6s by a batter', type: 'PLAYER', optionsType: 'DYNAMIC_SQUAD', options: [], iconName: 'TICKET' },
  { shortTitle: 'Most 4s', title: 'Which batter will hit the most 4s?', subtitle: 'Highest number of boundaries (4s) hit', type: 'PLAYER', optionsType: 'DYNAMIC_SQUAD', options: [], iconName: 'TICKET' },
  { shortTitle: 'Most Expensive Bowler', title: 'Most Expensive Bowler', subtitle: 'Most runs conceded in the match', type: 'PLAYER', optionsType: 'DYNAMIC_SQUAD', options: [], iconName: 'ALERT' },
  { shortTitle: 'Man of the Match', title: 'Man of the Match', subtitle: 'Who will be awarded Player of the Match?', type: 'PLAYER', optionsType: 'DYNAMIC_SQUAD', options: [], iconName: 'TROPHY' },
  { shortTitle: 'Most Catches', title: 'Most Catches / Dismissals', subtitle: 'Wicketkeeper or fielder with most catches', type: 'PLAYER', optionsType: 'DYNAMIC_SQUAD', options: [], iconName: 'SHIELD' },
  { shortTitle: 'Match Winner', title: 'Which team will win the match?', subtitle: 'Pick the winning team', type: 'TEAM', optionsType: 'DYNAMIC_SQUAD', options: [], iconName: 'TROPHY' },
];

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    
    // Purge any outdated multiple-choice / Over-Under fixed option questions from the question bank
    await QuestionBank.deleteMany({
      $or: [
        { type: 'MULTIPLE_CHOICE' },
        { shortTitle: { $in: ['Total Boundaries', 'Total Extras', 'Total Runs', 'Total Wickets'] } }
      ]
    });

    let questions = await QuestionBank.find().sort({ createdAt: 1 }).lean();

    // Auto-seed if empty or missing default questions
    if (questions.length < DEFAULT_BANK.length) {
      for (const defQ of DEFAULT_BANK) {
        const exists = questions.some((q: any) => q.shortTitle === defQ.shortTitle);
        if (!exists) {
          await QuestionBank.create(defQ);
        }
      }
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
