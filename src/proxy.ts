import { type NextRequest } from 'next/server';
import { updateSessionProxy } from '@/lib/supabase/middleware';

export async function proxy(request: NextRequest) {
  return await updateSessionProxy(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for static files & images
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
