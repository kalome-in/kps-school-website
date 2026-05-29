import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Protect admin routes
  const isAdminRoute = path.startsWith('/admin') && path !== '/admin/login';
  const isLoginRoute = path === '/admin/login';
  
  // Retrieve session cookie
  const sessionCookie = request.cookies.get('kps_admin_session')?.value;
  const isAuthenticated = sessionCookie === 'true';

  if (isAdminRoute && !isAuthenticated) {
    // Redirect to login page if trying to access admin pages without authentication
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (isLoginRoute && isAuthenticated) {
    // Redirect to dashboard page if already authenticated and accessing login page
    const dashboardUrl = new URL('/admin', request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

// Config to specify matching paths
export const config = {
  matcher: [
    '/admin',
    '/admin/:path*'
  ],
};
