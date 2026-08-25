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
    const validOtp = await Otp.findOne({
      email,
      otp,
      expiresAt: { $gt: new Date() }
    });

    if (!validOtp) {
      console.log(`[Verify-OTP] Invalid or expired OTP for ${email}`);
      return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 401 });
    }

    // Mark OTP as used (or delete it)
    await Otp.deleteOne({ _id: validOtp._id });

    // Find or create user
    let user = await User.findOne({ email });

    if (action === 'register') {
      if (user) {
        console.log(`[Verify-OTP] User ${email} already exists, logging them in and updating details`);
        if (name) user.name = name;
        if (phone) user.phone = phone;
        await user.save();
      } else {
        if (!name || !phone) {
          return NextResponse.json({ error: 'Name and phone are required for registration.' }, { status: 400 });
        }

        console.log(`[Verify-OTP] Registering new user ${email}`);
        user = await User.create({
          name,
          phone,
          email,
          role: 'FAN',
          wallet: { depositBalance: 0, winningsBalance: 0, bonusBalance: 50 }, // Give 50 bonus for joining
        });
      }
    } else if (action === 'login') {
      if (!user) {
        return NextResponse.json({ error: 'User not found. Please register.' }, { status: 404 });
      }
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Set cookie
    const response = NextResponse.json({ 
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        role: user.role,
        wallet: user.wallet
      }
    });

    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/'
    });

    return response;

  } catch (error) {
    console.error('Verify OTP Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
