import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    // Exclude /Users from Clerk protection
    '/((?!.*\\..*|_next|Users|StudentYaTeacher).*)',
    '/',
    '/(api|trpc)(.*)',
  ],
};