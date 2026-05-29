import { NextResponse } from 'next/server';
import { readDb, writeDb, logActivity } from '@/lib/local-db';
import { checkAuth } from '@/lib/auth-helper';

export async function GET() {
  try {
    if (!(await checkAuth())) {
      return NextResponse.json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
    }
    const db = readDb();
    const queries = db.queries || [];
    return NextResponse.json({ status: 'success', data: queries });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    if (!(await checkAuth())) {
      return NextResponse.json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
    }
    const body = await request.json();
    const db = readDb();

    const index = db.queries.findIndex(q => q.id === body.id);
    if (index === -1) {
      return NextResponse.json({ status: 'error', message: 'Query not found' }, { status: 404 });
    }

    db.queries[index].read = body.read !== undefined ? body.read : true;
    writeDb(db);
    logActivity(`Marked contact query from "${db.queries[index].name}" as ${db.queries[index].read ? 'read' : 'unread'}`, 'query');

    return NextResponse.json({ status: 'success', data: db.queries[index] });
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
      return NextResponse.json({ status: 'error', message: 'Query ID is required' }, { status: 400 });
    }

    const id = parseInt(idStr, 10);
    const db = readDb();

    const queryToDelete = db.queries.find(q => q.id === id);
    if (!queryToDelete) {
      return NextResponse.json({ status: 'error', message: 'Query not found' }, { status: 404 });
    }

    db.queries = db.queries.filter(q => q.id !== id);
    writeDb(db);
    logActivity(`Deleted contact query from: "${queryToDelete.name}"`, 'query');

    return NextResponse.json({ status: 'success', message: 'Query deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}
