import { NextResponse } from 'next/server';
import { readDb } from '@/lib/local-db';
import { checkAuth } from '@/lib/auth-helper';

export async function GET() {
  try {
    if (!(await checkAuth())) {
      return NextResponse.json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
    }
    const db = readDb();
    
    const totalNotices = db.notices?.length || 0;
    const totalJobs = db.jobs?.length || 0;
    const totalAdmissions = db.admissions?.length || 0;
    const totalQueries = db.queries?.length || 0;
    const totalGallery = db.gallery?.length || 0;
    
    const unreadQueries = db.queries?.filter(q => !q.read).length || 0;
    const openJobs = db.jobs?.filter(j => j.status === 'Open').length || 0;
    const publishedNotices = db.notices?.filter(n => n.status === 'Published').length || 0;

    // Last 5 activities
    const recentActivity = db.activities?.slice(0, 8) || [];
    
    // Last 3 admissions
    const recentAdmissions = db.admissions?.slice(0, 3) || [];
    
    // Last 3 notices
    const recentNotices = db.notices?.slice(0, 3) || [];

    return NextResponse.json({
      status: 'success',
      data: {
        stats: {
          totalNotices,
          publishedNotices,
          totalJobs,
          openJobs,
          totalAdmissions,
          totalQueries,
          unreadQueries,
          totalGallery
        },
        recentActivity,
        recentAdmissions,
        recentNotices
      }
    });
  } catch (error: any) {
    console.error('Admin Overview API error:', error);
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}
