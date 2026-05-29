import { NextResponse } from 'next/server';
import { readDb, writeDb, logActivity, Job } from '@/lib/local-db';
import { checkAuth } from '@/lib/auth-helper';

export async function GET() {
  try {
    const db = readDb();
    const jobs = db.jobs || [];
    return NextResponse.json({ status: 'success', data: jobs });
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

    const newJob: Job = {
      id: Date.now(),
      title: body.title || '',
      department: body.department || '',
      qualification: body.qualification || '',
      experience: body.experience || '',
      salary: body.salary || 'Negotiable',
      lastDate: body.lastDate || '',
      applyLink: body.applyLink || '/careers',
      status: body.status || 'Open'
    };

    db.jobs.unshift(newJob);
    writeDb(db);
    logActivity(`Created job posting: "${newJob.title}"`, 'job');

    return NextResponse.json({ status: 'success', data: newJob });
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

    const index = db.jobs.findIndex(j => j.id === body.id);
    if (index === -1) {
      return NextResponse.json({ status: 'error', message: 'Job not found' }, { status: 404 });
    }

    const updatedJob = {
      ...db.jobs[index],
      title: body.title ?? db.jobs[index].title,
      department: body.department ?? db.jobs[index].department,
      qualification: body.qualification ?? db.jobs[index].qualification,
      experience: body.experience ?? db.jobs[index].experience,
      salary: body.salary ?? db.jobs[index].salary,
      lastDate: body.lastDate ?? db.jobs[index].lastDate,
      applyLink: body.applyLink ?? db.jobs[index].applyLink,
      status: body.status ?? db.jobs[index].status
    };

    db.jobs[index] = updatedJob;
    writeDb(db);
    logActivity(`Updated job posting: "${updatedJob.title}"`, 'job');

    return NextResponse.json({ status: 'success', data: updatedJob });
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
      return NextResponse.json({ status: 'error', message: 'Job ID is required' }, { status: 400 });
    }

    const id = parseInt(idStr, 10);
    const db = readDb();

    const jobToDelete = db.jobs.find(j => j.id === id);
    if (!jobToDelete) {
      return NextResponse.json({ status: 'error', message: 'Job not found' }, { status: 404 });
    }

    db.jobs = db.jobs.filter(j => j.id !== id);
    writeDb(db);
    logActivity(`Deleted job posting: "${jobToDelete.title}"`, 'job');

    return NextResponse.json({ status: 'success', message: 'Job deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}
