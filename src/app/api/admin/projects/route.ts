import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { GithubService } from '@/services/github';

// Helper for Auth
const checkAuth = (req: Request) => {
    const authHeader = req.headers.get('x-admin-password');
    return authHeader === process.env.ADMIN_PASSWORD;
};

export async function GET(req: Request) {
    if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const projects = await prisma.project.findMany({
        orderBy: { order: 'asc' },
    });
    return NextResponse.json(projects);
}

export async function POST(req: Request) {
    if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const body = await req.json();
        const { githubId } = body;

        // Validate repo exists in our cache/GitHub
        const repo = await GithubService.getRepoById(Number(githubId));

        if (!repo) {
            return NextResponse.json({ error: 'Repository not found on GitHub' }, { status: 404 });
        }

        // Create Project
        const newProject = await prisma.project.create({
            data: {
                githubId: repo.id,
                repoName: repo.name,
                url: repo.html_url,
                title: body.title || repo.name,
                description: body.description || repo.description,
                liveUrl: body.liveUrl || repo.homepage || null,
                tags: body.tags || [],
                techStack: body.techStack || [],
                images: body.images || [],
                isVisible: true,
            },
        });

        return NextResponse.json(newProject);
    } catch {
        return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const body = await req.json();
        const { id, ...data } = body;

        const updated = await prisma.project.update({
            where: { id: Number(id) },
            data: data,
        });

        return NextResponse.json(updated);
    } catch {
        return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
    }
}
