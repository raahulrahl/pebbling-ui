import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// List of public routes (no authentication required)
const publicRoutes = ["/", "/api/subscribe", "/blog"];

// Routes to be ignored by auth checks completely
const ignoredRoutes = ["/api/webhook"];

// Create a route matcher for protected routes (all routes not in publicRoutes)
const isProtectedRoute = createRouteMatcher([
  "/((?!\.|_next|api/webhook|sign-in|sign-up).*)",
  "/api/((?!subscribe).*)" // Protect all API routes except /api/subscribe
]);

export default clerkMiddleware(async (auth, request) => {
  const { nextUrl } = request;
  
  // Check if the route should be ignored
  if (ignoredRoutes.some(route => nextUrl.pathname.startsWith(route))) {
    return NextResponse.next();
  }
  
  // Check if the route is public
  if (publicRoutes.some(route => nextUrl.pathname === route || 
                           (route.endsWith('*') && nextUrl.pathname.startsWith(route.slice(0, -1))))) {
    return NextResponse.next();
  }
  
  // Get auth state
  const { userId } = await auth();
  
  // If the user is not signed in and it's a protected route, redirect to home page
  if (!userId && isProtectedRoute(request)) {
    return NextResponse.redirect(new URL('/', nextUrl.origin));
  }
  
  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next/image|_next/static|favicon.ico|.*\.\w+$).*)',
    '/',
    '/(api|trpc)(.*)',
  ],
};