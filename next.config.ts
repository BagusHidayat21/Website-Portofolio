import type { NextConfig } from 'next';

const securityHeaders = [
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
];

const nextConfig: NextConfig = {
    output: 'standalone',
    reactCompiler: true,
    typedRoutes: true,
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
    },
    headers: async () => [{ source: '/:path*', headers: securityHeaders }],
};

export default nextConfig;
