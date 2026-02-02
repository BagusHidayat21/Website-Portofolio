import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    const hostname = request.headers.get('host') || '';

    // Force www
    // Jika hostname adalah 'bagus-hidayat.my.id' (tanpa www) dan bukan localhost
    if (!hostname.includes('www.') && !hostname.includes('localhost') && !hostname.includes('127.0.0.1')) {
        url.hostname = `www.${hostname}`;
        return NextResponse.redirect(url, 301); // 301 = Permanent Redirect (SEO Friendly)
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
