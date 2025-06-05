import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const token = request.cookies.get('nt.authtoken')?.value;
    const loginUrl = new URL('/auth/login', request.url);

    if(token && request.nextUrl.pathname === loginUrl.pathname) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    if(!token && request.nextUrl.pathname !== loginUrl.pathname) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    };

    return NextResponse.next();
}
 
export const config = {
  matcher: '/:path*',
}