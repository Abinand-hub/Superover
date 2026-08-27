import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Otp from '@/models/Otp';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_dev_key';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, otp, action, name, phone } = body;

    if (!email || !otp || !action) {
      return NextResponse.json({ error: 'Email, OTP, and action are required' }, { status: 400 });
    }

    await connectToDatabase();
    console.log(`[Verify-OTP] Processing for ${email}`);
    
    // Find valid OTP
    let validOtp = null;
    try {
      validOtp = await Otp.findOne({
        email,
        otp,
        expiresAt: { $gt: new Date() }
      });
    } catch (e) {
      console.log('DB error when finding OTP', e);
    }

    if (!validOtp) {
      console.log(`[Verify-OTP] Invalid or expired OTP for ${email}`);
      return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 401 });
    }

    if (action !== 'register' && action !== 'reset-password') {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    // Do NOT delete the OTP here. Let the final register/reset-password endpoint delete it.
    
    return NextResponse.json({ 
      success: true,
      message: 'OTP verified successfully'
    });

  } catch (error) {
    console.error('Verify OTP Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
