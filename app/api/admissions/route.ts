import { NextResponse } from 'next/server';
import { readDb, writeDb, logActivity } from '@/lib/local-db';
import { checkAuth } from '@/lib/auth-helper';

export async function GET() {
  try {
    if (!(await checkAuth())) {
      return NextResponse.json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
    }
    const db = readDb();
    const admissions = db.admissions || [];
    return NextResponse.json({ status: 'success', data: admissions });
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
      return NextResponse.json({ status: 'error', message: 'Inquiry ID is required' }, { status: 400 });
    }

    const id = parseInt(idStr, 10);
    const db = readDb();

    const itemToDelete = db.admissions.find(a => a.id === id);
    if (!itemToDelete) {
      return NextResponse.json({ status: 'error', message: 'Inquiry not found' }, { status: 404 });
    }

    db.admissions = db.admissions.filter(a => a.id !== id);
    writeDb(db);
    logActivity(`Deleted admissions inquiry for student: "${itemToDelete.studentName}"`, 'admission');

    return NextResponse.json({ status: 'success', message: 'Inquiry deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}
