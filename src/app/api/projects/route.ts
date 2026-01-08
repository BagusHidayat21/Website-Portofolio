import { NextResponse } from 'next/server';
import { ProjectService } from '@/services/project.service';

export async function GET() {
    const projects = await ProjectService.getPublicProjects();
    // Cache control headers for public API
    return NextResponse.json(projects, {
        headers: {
            'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
    });
}
