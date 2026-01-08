// Public API endpoint for fetching single project by ID
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { GithubService } from '@/services/github';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const projectId = parseInt(id, 10);

        if (isNaN(projectId)) {
            return NextResponse.json(
                { error: 'Invalid project ID' },
                { status: 400 }
            );
        }

        const project = await prisma.project.findUnique({
            where: { id: projectId, isVisible: true },
        });

        if (!project) {
            return NextResponse.json(
                { error: 'Project not found' },
                { status: 404 }
            );
        }

        // Fetch GitHub repo data for live stats
        const githubRepos = await GithubService.getAllRepos();
        const repo = githubRepos.find((r) => r.id === project.githubId);

        const projectWithRepo = {
            id: project.id,
            githubId: project.githubId,
            repoName: project.repoName,
            url: project.url,
            liveUrl: project.liveUrl || repo?.homepage || null,
            title: project.title || (repo ? repo.name : project.repoName),
            description: project.description || (repo ? repo.description : null),
            githubDescription: repo ? repo.description : null,
            images: project.images,
            tags: project.tags,
            techStack: project.techStack,
            isFeatured: project.isFeatured,
            isVisible: project.isVisible,
            order: project.order,
            stars: repo?.stargazers_count || 0,
            lastUpdated: repo?.updated_at || project.updatedAt.toISOString(),
            language: repo?.language,
        };

        return NextResponse.json(projectWithRepo, {
            headers: {
                'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
            },
        });
    } catch {
        return NextResponse.json(
            { error: 'Failed to fetch project' },
            { status: 500 }
        );
    }
}
