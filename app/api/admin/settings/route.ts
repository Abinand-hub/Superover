import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import PlatformSettings from '@/models/PlatformSettings';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectToDatabase();
    let settings = await PlatformSettings.findOne({});
    
    if (!settings) {
      settings = await PlatformSettings.create({});
    }
    
    return NextResponse.json(settings);
  } catch (error: any) {
    console.error('Fetch Settings Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    // In a real app, verify admin token here. 
    // Since we are mocking admin for now, we'll allow it.
    await connectToDatabase();
    const data = await req.json();
    
    // Validate wheel probabilities
    if (data.wheelProbabilities) {
      const sum = data.wheelProbabilities.reduce((acc: number, curr: any) => acc + curr.probability, 0);
      if (Math.abs(sum - 100) > 0.01) {
        return NextResponse.json({ error: 'Wheel probabilities must sum to exactly 100%' }, { status: 400 });
      }
    }
    
    let settings = await PlatformSettings.findOne({});
    if (!settings) {
      settings = new PlatformSettings(data);
    } else {
      settings.flashMessage = data.flashMessage ?? settings.flashMessage;
      settings.homeBanners = data.homeBanners ?? settings.homeBanners;
      settings.wheelProbabilities = data.wheelProbabilities ?? settings.wheelProbabilities;
      settings.updatedAt = new Date();
    }
    
    await settings.save();
    return NextResponse.json(settings);
  } catch (error: any) {
    console.error('Update Settings Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
