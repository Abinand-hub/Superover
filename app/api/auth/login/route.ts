import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_dev_key';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }

    await connectToDatabase();

    // Special handling for master Admin credentials
    if (username === 'admin' && (password === 'superover2026' || password === 'admin123')) {
      let adminUser = await User.findOne({ username: 'admin' });
      if (!adminUser) {
        adminUser = await User.create({
          username: 'admin',
          name: 'SuperOver Admin',
          phone: '+919999999999',
          email: 'admin@superover.com',
          role: 'ADMIN',
          wallet: { depositBalance: 0, winningsBalance: 0, promotionalBonus: 0 }
        });
      } else if (adminUser.role !== 'ADMIN') {
        adminUser.role = 'ADMIN';
        await adminUser.save();
      }

      const token = jwt.sign(
        { userId: adminUser._id, role: 'ADMIN', email: adminUser.email, username: 'admin' },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      const response = NextResponse.json({
        message: 'Admin login successful',
        user: {
          id: adminUser._id,
          username: 'admin',
          name: adminUser.name,
          role: 'ADMIN',
          wallet: adminUser.wallet
        }
      });

      response.cookies.set('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60,
        path: '/'
      });

      return response;
    }
    
    // Find user by username, email, or phone
    const user = await User.findOne({ 
      $or: [
        { username: username },
        { email: username },
        { phone: username }
      ]
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials. User not found.' }, { status: 401 });
    }

    // Since older users might not have a password yet, handle gracefully
    if (!user.password) {
      return NextResponse.json({ error: 'Account requires password setup. Please use Forgot Password.' }, { status: 401 });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role, email: user.email, username: user.username },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Set cookie
    const response = NextResponse.json({ 
      message: 'Login successful',
      user: {
        id: user._id,
        refId: user.refId,
        username: user.username,
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
    console.error('Login Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
