import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Otp from '@/models/Otp';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, otp, newPassword } = body;

    if (!email || !otp || !newPassword) {
      return NextResponse.json({ error: 'Email, OTP, and new password are required' }, { status: 400 });
    }

    await connectToDatabase();

    // 1. Verify OTP
    const validOtp = await Otp.findOne({
      email,
      otp,
      expiresAt: { $gt: new Date() }
    });

    if (!validOtp) {
      return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 401 });
    }

    // 2. Find user
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // 3. Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // 4. Update password
    user.password = hashedPassword;
    await user.save();

    // 5. Delete OTP
    await Otp.deleteOne({ _id: validOtp._id });

    return NextResponse.json({ 
      success: true,
      message: 'Password reset successfully. You can now login.'
    });

  } catch (error) {
    console.error('Reset Password Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
