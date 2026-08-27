import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Match from '@/models/Match';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    
    const { id } = await params;
    const body = await req.json();
    
    // Body can contain { status: 'DRAFT' } or { status: 'UPCOMING', questions: [...] }
    const match = await Match.findOneAndUpdate(
      { apiId: id },
      { $set: body },
      { new: true }
    ).lean();

    if (!match) {
      return NextResponse.json({ error: 'Match not found' }, { status: 404 });
    }

    return NextResponse.json(match);
  } catch (error: any) {
    console.error('Update Match Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
