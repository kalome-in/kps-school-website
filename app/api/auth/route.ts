import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { readDb, logActivity } from '@/lib/local-db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, username, password } = body;

    const cookieStore = await cookies();

    if (action === 'logout') {
      // Clear the cookie
      cookieStore.set('kps_admin_session', '', {
        path: '/',
        maxAge: 0,
      });
      logActivity('Administrator logged out.', 'auth');
      return NextResponse.json({ status: 'success', message: 'Logged out successfully' });
    }

    // Default to login action
    const db = readDb();
    
    // Get credentials from env or fallback to db settings
    const expectedUsername = process.env.ADMIN_USERNAME || db.settings.username || 'admin';
    const expectedPassword = process.env.ADMIN_PASSWORD || db.settings.password || 'kpsadmin123';

    if (username === expectedUsername && password === expectedPassword) {
      // Set session cookie
      cookieStore.set('kps_admin_session', 'true', {
        path: '/',
        httpOnly: false, // Accessible by clientside for convenience, protected by middleware
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      logActivity(`Successful login by user: ${username}`, 'auth');
      return NextResponse.json({ status: 'success', message: 'Login successful' });
    }

    logActivity(`Failed login attempt for user: ${username}`, 'auth');
    return NextResponse.json({ status: 'error', message: 'Invalid username or password' }, { status: 401 });
  } catch (error: any) {
    console.error('Auth API error:', error);
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get('kps_admin_session')?.value;
  return NextResponse.json({ authenticated: session === 'true' });
}
