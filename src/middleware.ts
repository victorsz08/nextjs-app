import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get("nt.authtoken")?.value;

  const isPublicRoute = pathname.startsWith("/auth");

  // if (token && isPublicRoute) {
  //   return NextResponse.redirect(new URL(pathname, request.url));
  // }

  // if (!token && !isPublicRoute) {
  //   return NextResponse.redirect(new URL("/auth/login", request.url));
  // };
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|logo.png|.*\\.svg|.*\\.png|.*\\.jpg|.*\\.webp|api/auth).*)'],
};
