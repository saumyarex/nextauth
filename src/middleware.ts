import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const token = request.cookies.get('token')?.value || "";

  const isPublicPath = (path === "/login") ||  (path === "/signup") ||  (path === "/verify-email") ||  (path === "/password-reset" ||  (path === "/reset-password"))

  if(!isPublicPath && !token ){
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if(isPublicPath && token){
    return NextResponse.redirect(new URL('/profile', request.url))
  }

  
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/profile/:path*",
    "/login",
    "/signup",
    "/verify-email",
    "/reset-password",
    "/password-reset"
  ],
}