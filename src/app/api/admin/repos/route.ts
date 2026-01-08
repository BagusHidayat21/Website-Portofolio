import { NextResponse } from 'next/server';
import { GithubService } from '@/services/github';

export async function GET(request: Request) {
    // Simple Auth Check
    const authHeader = request.headers.get('x-admin-password');
    if (authHeader !== process.env.ADMIN_PASSWORD) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const url = new URL(request.url);
        const forceRefresh = url.searchParams.get('refresh') === 'true';

        const repos = await GithubService.getAllRepos(forceRefresh);
        return NextResponse.json(repos);
    } catch {
        return NextResponse.json({ error: 'Failed to fetch repos' }, { status: 500 });
    }
}
