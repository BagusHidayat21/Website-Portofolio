// Admin API endpoint for managing profile data
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Helper for Auth
const checkAuth = (req: Request) => {
    const authHeader = req.headers.get('x-admin-password');
    return authHeader === process.env.ADMIN_PASSWORD;
};

export async function GET(req: Request) {
    if (!checkAuth(req)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const profile = await prisma.profile.findFirst();
        return NextResponse.json(profile);
    } catch {
        return NextResponse.json(
            { error: 'Failed to fetch profile' },
            { status: 500 }
        );
    }
}

export async function PUT(req: Request) {
    if (!checkAuth(req)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { name, tagline, about, avatarUrl, resumeUrl, socialLinks } = body;

        // Upsert profile (create if not exists, update if exists)
        const profile = await prisma.profile.upsert({
            where: { id: 1 },
            update: {
                name,
                tagline,
                about,
                avatarUrl,
                resumeUrl,
                socialLinks,
            },
            create: {
                id: 1,
                name,
                tagline,
                about,
                avatarUrl,
                resumeUrl,
                socialLinks,
            },
        });

        return NextResponse.json(profile);
    } catch {
        return NextResponse.json(
            { error: 'Failed to update profile' },
            { status: 500 }
        );
    }
}
