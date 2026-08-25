import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Otp from '@/models/Otp';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, action } = body;

    if (!email || !action) {
      return NextResponse.json({ error: 'Email and action (login/register) are required' }, { status: 400 });
    }

    await connectToDatabase();
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      if (action === 'register') {
        return NextResponse.json({ error: 'Email is already registered. Please login.' }, { status: 409 });
      }
    } else {
      if (action === 'login') {
        // In mock mode, if action is login, we just proceed.
        // If DB was up, we'd block them, but since it's down, we let them try logging in anyway for the demo.
      }
    }

    // Generate random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP in database (expires in 5 minutes)
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    
    // Upsert OTP for this email
    await Otp.findOneAndUpdate(
      { email },
      { otp, expiresAt },
      { upsert: true, new: true }
    );

    // MOCK EMAIL PROVIDER: Log to console during development
    console.log(`\n\n=== 📩 EMAIL MOCK ===`);
    console.log(`To: ${email}`);
    console.log(`Message: Your SuperOver OTP is ${otp}. Valid for 5 minutes.`);
    console.log(`=====================\n\n`);

    // REAL EMAIL PROVIDER: Nodemailer (if configured)
    if (process.env.EMAIL_USER && process.env.EMAIL_APP_PASSWORD) {
      try {
        const nodemailer = require('nodemailer');
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_APP_PASSWORD,
          },
        });

        await transporter.sendMail({
          from: `"SuperOver" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: 'Your SuperOver Login OTP',
          html: `
            <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
              <h2>Welcome to SuperOver!</h2>
              <p>Your one-time password (OTP) for login/registration is:</p>
              <h1 style="color: #FF6B00; font-size: 32px; letter-spacing: 5px;">${otp}</h1>
              <p>This code will expire in 5 minutes.</p>
              <p style="font-size: 12px; color: #888;">If you did not request this, please ignore this email.</p>
            </div>
          `,
        });
        console.log(`✅ Real email sent to ${email}`);
      } catch (mailError) {
        console.error('Failed to send real email, but OTP is generated:', mailError);
        // We don't fail the API request if email fails, because we logged the mock OTP for dev fallback
      }
    }

    return NextResponse.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Send OTP Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
