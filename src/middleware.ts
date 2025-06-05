import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

export function middleware(request: NextRequest) {
    const token = request.cookies.get('nt.authtoken')?.value;
    const isLoginRoute = request.nextUrl.pathname.startsWith('/auth')

    if(token && isLoginRoute) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    if(!token && !isLoginRoute) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    };
}
 
export const config = {
  matcher: '/auth/:path*',
}