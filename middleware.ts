import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';

// List of public routes (no authentication required)
const publicRoutes = ["/", "/api/subscribe", "/blog"];

// Routes to be ignored by auth checks completely
const ignoredRoutes = ["/api/webhook"];

export default async function middleware(req: NextRequest) {
  // Check if the route should be ignored
  if (ignoredRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
    return NextResponse.next();
  }
  
  // Check if the route is public
  if (publicRoutes.some(route => req.nextUrl.pathname === route || 
                           (route.endsWith('*') && req.nextUrl.pathname.startsWith(route.slice(0, -1))))) {
    return NextResponse.next();
  }
  
  // Get auth state
  const { userId } = getAuth(req);
  
  // If the user is not signed in and it's not a public route, redirect to sign-in
  if (!userId) {
    const signInUrl = new URL('/sign-in', req.url);
    signInUrl.searchParams.set('redirect_url', req.url);
    return NextResponse.redirect(signInUrl);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!.+\\.[\\w]+$|_next).*)',
    '/',
    '/(api|trpc)(.*)',
  ],
};