import { NextResponse } from 'next/server';
import { readDb, writeDb, logActivity } from '@/lib/local-db';
import { checkAuth } from '@/lib/auth-helper';

export async function GET() {
  try {
    if (!(await checkAuth())) {
      return NextResponse.json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
    }
    const db = readDb();
    const applications = db.careersApplications || [];
    return NextResponse.json({ status: 'success', data: applications });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    if (!(await checkAuth())) {
      return NextResponse.json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
    }
    const { searchParams } = new URL(request.url);
    const idStr = searchParams.get('id');
    if (!idStr) {
      return NextResponse.json({ status: 'error', message: 'Application ID is required' }, { status: 400 });
    }

    const id = parseInt(idStr, 10);
    const db = readDb();

    const appToDelete = db.careersApplications.find(a => a.id === id);
    if (!appToDelete) {
      return NextResponse.json({ status: 'error', message: 'Application not found' }, { status: 404 });
    }

    db.careersApplications = db.careersApplications.filter(a => a.id !== id);
    writeDb(db);
    logActivity(`Deleted job application from candidate: "${appToDelete.name}"`, 'job');

    return NextResponse.json({ status: 'success', message: 'Application deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}
