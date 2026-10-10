import { NextResponse } from 'next/server';

export function proxy(request) {
    const { pathname } = request.nextUrl;

    const isPublicRoute = pathname === '/';

    const authRoutes = ['/auth/sign-in', '/auth/sign-up', '/privacy-policy'];
    const isAuthRoute = authRoutes.includes(pathname);

    const isAuthenticated = request.cookies.getAll().some(cookie =>
        cookie.name.includes('better-auth.session_token')
    );

    if (!isAuthenticated) {
        if (!isPublicRoute && !isAuthRoute) {
            return NextResponse.redirect(new URL('/auth/sign-in', request.url));
        }
    }

    if (isAuthenticated) {
        if (isAuthRoute) {
            return NextResponse.redirect(new URL('/auth/profile', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.svg$|favicon.ico).*)',
    ],
};