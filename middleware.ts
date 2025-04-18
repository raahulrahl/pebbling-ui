import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This file is intentionally empty after removing Clerk authentication
// It can be used for future middleware needs if required

// This middleware function replaces the previous Clerk middleware
export function middleware(request: NextRequest) {
  // You can implement custom middleware logic here if needed
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Add specific routes where middleware should be applied
    // For now, we're keeping this minimal since we removed Clerk
    '/api/:path*',
  ],
};