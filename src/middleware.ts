import { NextRequest, NextResponse } from 'next/server';

const publicPaths = [
  '/',
  '/tournament/list',
  '/tournament/public(.*)',
  '/api(.*)', // need to remove this later
  '/api/webhooks(.*)' // set webhooks to be public
];

export function middleware(request: NextRequest) {
  // If the request matches a public path, allow it through
  const { pathname } = request.nextUrl;

  const isPublic = publicPaths.some((pattern) => {
    const regex = new RegExp(`^${pattern}$`);
    return regex.test(pathname);
  });

  if (isPublic) {
    return NextResponse.next();
  }

  // Add any additional logic here if needed (e.g., redirects, logging)
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
