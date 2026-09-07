import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_dev_key';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value || cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ authenticated: false, error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    if (decoded.role !== 'ADMIN') {
      return NextResponse.json({ authenticated: false, error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json({ authenticated: true, role: 'ADMIN', username: decoded.username });
  } catch (err: any) {
    return NextResponse.json({ authenticated: false, error: err.message }, { status: 401 });
  }
}
