import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    const url = request.nextUrl.clone();
    const hostname = request.headers.get('host') || '';

    if (!hostname.includes('www.') && !hostname.includes('localhost') && !hostname.includes('127.0.0.1')) {
        url.hostname = `www.${hostname}`;
        return NextResponse.redirect(url, 301); // 301 = Permanent Redirect (SEO Friendly)
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$|.*\\.pdf$).*)',
    ],
};
