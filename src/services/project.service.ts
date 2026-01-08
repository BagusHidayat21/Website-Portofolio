import prisma from '@/lib/prisma';
import { GithubService } from './github';
import { ProjectWithRepo } from '@/types';

export class ProjectService {
    static async getPublicProjects(): Promise<ProjectWithRepo[]> {
        // 1. Fetch DB Projects
        const dbProjects = await prisma.project.findMany({
            where: { isVisible: true },
            orderBy: { order: 'asc' },
        });

        // 2. Fetch GitHub Cache
        const githubRepos = await GithubService.getAllRepos();
        const repoMap = new Map(githubRepos.map((r) => [r.id, r]));

        // 3. Merge
        const merged: ProjectWithRepo[] = dbProjects.map((p) => {
            const repo = repoMap.get(p.githubId);

            return {
                id: p.id,
                githubId: p.githubId,
                repoName: p.repoName,
                url: p.url,
                liveUrl: p.liveUrl || repo?.homepage || null,
                // Allow DB override, else use Repo data
                title: p.title || (repo ? repo.name : p.repoName),
                description: p.description || (repo ? repo.description : null),
                githubDescription: repo ? repo.description : null,

                images: p.images,
                tags: p.tags,
                techStack: p.techStack,
                isFeatured: p.isFeatured,
                isVisible: p.isVisible,
                order: p.order,

                // Live stats
                stars: repo?.stargazers_count || 0,
                lastUpdated: repo?.updated_at || p.updatedAt.toISOString(),
                language: repo?.language,
            };
        });

        return merged;
    }
}
