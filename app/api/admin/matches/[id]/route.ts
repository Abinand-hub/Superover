import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectToDatabase from '@/lib/mongodb';
import Match from '@/models/Match';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    
    const { id } = await params;
    const body = await req.json();
    
    const query = {
      $or: [
        ...(mongoose.Types.ObjectId.isValid(id) ? [{ _id: id }] : []),
        { apiId: id },
        { id: id }
      ]
    };

    // Body can contain { status: 'DRAFT' } or { status: 'UPCOMING', questions: [...] }
    const match = await Match.findOneAndUpdate(
      query,
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

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const { id } = await params;

    const query = {
      $or: [
        ...(mongoose.Types.ObjectId.isValid(id) ? [{ _id: id }] : []),
        { apiId: id },
        { id: id }
      ]
    };

    const deleted = await Match.findOneAndDelete(query);
    if (!deleted) {
      return NextResponse.json({ error: 'Match not found' }, { status: 404 });
    }

    console.log(`🗑️ Admin deleted match: ${deleted.title} (${deleted._id})`);
    return NextResponse.json({ success: true, message: 'Match deleted successfully' });
  } catch (error: any) {
    console.error('Delete Match Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
