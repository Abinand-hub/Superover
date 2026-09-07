import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import Razorpay from 'razorpay';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_dev_key';

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    let userId: string | null = null;

    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        userId = decoded.userId;
      } catch (err) {
        // Guest mode fallback
      }
    }

    const { amount } = await req.json();

    if (!amount || amount < 5) {
      return NextResponse.json({ error: 'Minimum deposit is ₹5' }, { status: 400 });
    }

    // If Razorpay keys are not configured or in test mode, return dummy order immediately
    if (!userId || !process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json({
        orderId: `dummy_order_${Date.now()}`,
        amount: amount * 100,
        currency: 'INR',
        isDummy: true
      });
    }

    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // Create Razorpay Order
    const options = {
      amount: amount * 100, // Razorpay works in subunits (paise)
      currency: 'INR',
      receipt: `rcpt_${Date.now()}_${userId ? userId.substring(0, 5) : 'guest'}`,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency
    });

  } catch (error) {
    console.error('Create Order Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
