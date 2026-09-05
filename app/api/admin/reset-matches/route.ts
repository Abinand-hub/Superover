import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Match from '@/models/Match';
import Slip from '@/models/Slip';

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

    // 2. Delete all matches completely
    await Match.deleteMany({});

    return NextResponse.json({ 
      success: true, 
      message: "All matches and slips have been completely removed. You can now create matches manually." 
    });
  } catch (error: any) {
    console.error('Reset Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
