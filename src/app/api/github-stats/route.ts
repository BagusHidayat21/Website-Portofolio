import { NextResponse } from 'next/server';
import { projectsData } from '@/data/static-db';
import { withGithubStats, REVALIDATE_SECONDS } from '@/lib/github';

// Next.js requires route segment config to be a statically analyzable literal.
export const revalidate = 3600;

export type GithubStatsMap = Record<string, { githubStars?: number; githubUpdatedAt?: string }>;

export async function GET() {
    const withStats = await withGithubStats(projectsData);

    const stats: GithubStatsMap = Object.fromEntries(
        withStats.map((project) => [
            project.slug,
            { githubStars: project.githubStars, githubUpdatedAt: project.githubUpdatedAt },
        ])
    );

    return NextResponse.json(stats, {
        headers: {
            'Cache-Control': `public, s-maxage=${REVALIDATE_SECONDS}, stale-while-revalidate=${REVALIDATE_SECONDS}`,
        },
    });
}
