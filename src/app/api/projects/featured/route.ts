// Public API endpoint for fetching featured projects
import { NextResponse } from 'next/server';
import { ProjectService } from '@/services/project.service';

export async function GET() {
    try {
        const allProjects = await ProjectService.getPublicProjects();

        // Filter only featured projects
        const featuredProjects = allProjects.filter((p) => p.isFeatured);

        return NextResponse.json(featuredProjects, {
            headers: {
                'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
            },
        });
    } catch {
        return NextResponse.json(
            { error: 'Failed to fetch featured projects' },
            { status: 500 }
        );
    }
}
