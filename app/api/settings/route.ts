import { NextResponse } from 'next/server';
import { readDb, writeDb, logActivity } from '@/lib/local-db';
import { checkAuth } from '@/lib/auth-helper';

export async function GET() {
  try {
    const db = readDb();
    // Exclude security credentials from public GET request
    const { username, password, ...publicSettings } = db.settings;
    return NextResponse.json({ status: 'success', data: publicSettings });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!(await checkAuth())) {
      return NextResponse.json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
    }
    const body = await request.json();
    const db = readDb();

    // Check if password change is requested
    if (body.currentPassword && body.newPassword) {
      const currentExpected = db.settings.password || 'kpsadmin123';
      if (body.currentPassword !== currentExpected) {
        return NextResponse.json({ status: 'error', message: 'Current password does not match' }, { status: 400 });
      }
      db.settings.password = body.newPassword;
      logActivity('Admin password changed.', 'settings');
      writeDb(db);
      return NextResponse.json({ status: 'success', message: 'Password updated successfully' });
    }

    // Update general settings
    db.settings = {
      ...db.settings,
      instagramUrl: body.instagramUrl ?? db.settings.instagramUrl,
      facebookUrl: body.facebookUrl ?? db.settings.facebookUrl,
      youtubeUrl: body.youtubeUrl ?? db.settings.youtubeUrl,
      linkedinUrl: body.linkedinUrl ?? db.settings.linkedinUrl,
      twitterUrl: body.twitterUrl ?? db.settings.twitterUrl,
      phone: body.phone ?? db.settings.phone,
      email: body.email ?? db.settings.email,
    };

    logActivity('System settings updated.', 'settings');
    writeDb(db);

    return NextResponse.json({ status: 'success', data: db.settings });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}
