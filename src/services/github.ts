import { redis } from '@/lib/redis';
import { GithubRepo } from '@/types';

const GITHUB_API_URL = 'https://api.github.com';
const CACHE_KEY = 'github:repos';
const CACHE_TTL = 3600; // 1 hour in seconds

export class GithubService {
    /**
     * Fetch all repositories from GitHub (cached)
     * @param forceRefresh Ignore cache and fetch fresh data
     */
    static async getAllRepos(forceRefresh = false): Promise<GithubRepo[]> {
        if (!forceRefresh) {
            const cached = await redis.get(CACHE_KEY);
            if (cached) {
                return JSON.parse(cached);
            }
        }

        try {
            const token = process.env.GITHUB_TOKEN;
            if (!token) {
                throw new Error('GITHUB_TOKEN is not defined');
            }

            // Fetch from GitHub /user/repos (authenticated user)
            // Per_page=100 is max, might need pagination if > 100 repos, 
            // but simplistic implementation for now.
            const res = await fetch(`${GITHUB_API_URL}/user/repos?sort=updated&per_page=100&type=owner`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/vnd.github.v3+json',
                },
            });

            if (!res.ok) {
                throw new Error(`GitHub API Error: ${res.status} ${res.statusText}`);
            }

            const repos = await res.json();

            // Filter & Map to clean structure
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const cleanedRepos: GithubRepo[] = repos.map((repo: any) => ({
                id: repo.id,
                name: repo.name,
                full_name: repo.full_name,
                html_url: repo.html_url,
                description: repo.description,
                homepage: repo.homepage,
                stargazers_count: repo.stargazers_count,
                language: repo.language,
                topics: repo.topics || [],
                created_at: repo.created_at,
                updated_at: repo.updated_at,
            }));

            // Cache result
            await redis.set(CACHE_KEY, JSON.stringify(cleanedRepos), 'EX', CACHE_TTL);

            return cleanedRepos;
        } catch (error) {
            console.error('Failed to fetch GitHub repos:', error);
            // Fallback: Try to return cached data even if stale, if valid
            const cached = await redis.get(CACHE_KEY);
            if (cached) return JSON.parse(cached);
            return [];
        }
    }

    /**
     * Get a single repo details from the list (Local lookup preferred)
     */
    static async getRepoById(githubId: number): Promise<GithubRepo | null> {
        const repos = await this.getAllRepos();
        return repos.find((r) => r.id === githubId) || null;
    }
}
