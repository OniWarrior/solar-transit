import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // If logged in and trying to access login/register, redirect to dashboard
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    if (token && (pathname === '/login' || pathname === '/register')) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // Only require auth for protected routes
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;

        // Protected routes — must be logged in
        if (pathname.startsWith('/dashboard')) {
          return !!token;
        }

        // All other routes are public
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/register',
  ],
};
