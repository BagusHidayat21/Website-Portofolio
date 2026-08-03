import { Project } from '@/data/static-db';

const GITHUB_USERNAME = 'BagusHidayat21';

// One batched request covers every project's repo, and Next.js's fetch cache
// dedupes/persists that request across all pages and requests until this
// window elapses — so this stays at ~1 request/hour to GitHub regardless of
// traffic, comfortably under the unauthenticated 60 req/hour limit (and far
// under the 5,000 req/hour limit once GITHUB_TOKEN is set).
const REVALIDATE_SECONDS = 60 * 60;

export type ProjectWithGithubStats = Project & {
    githubStars?: number;
    githubUpdatedAt?: string;
};

interface GithubApiRepo {
    name: string;
    stargazers_count: number;
    updated_at: string;
}

function repoNameFromUrl(githubUrl: string | null): string | null {
    if (!githubUrl) return null;
    const match = githubUrl.match(/github\.com\/[^/]+\/([^/?#]+)/i);
    return match ? match[1].toLowerCase() : null;
}

async function fetchRepoList(useToken: boolean): Promise<Response> {
    const headers: HeadersInit = { Accept: 'application/vnd.github+json' };
    const hasToken = useToken && Boolean(process.env.GITHUB_TOKEN);

    if (hasToken) {
        headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const url = hasToken
        ? 'https://api.github.com/user/repos?type=all&per_page=100'
        : `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`;

    return fetch(url, { headers, next: { revalidate: REVALIDATE_SECONDS } });
}

async function fetchRepos(): Promise<Map<string, GithubApiRepo>> {
    try {
        let res = await fetchRepoList(true);

        // A stale/invalid token would otherwise take the whole feature down;
        // our request volume is well within the unauthenticated limit anyway,
        // so fall back to it rather than surface nothing.
        if (res.status === 401 && process.env.GITHUB_TOKEN) {
            res = await fetchRepoList(false);
        }

        if (!res.ok) return new Map();

        const repos: GithubApiRepo[] = await res.json();
        return new Map(repos.map((repo) => [repo.name.toLowerCase(), repo]));
    } catch {
        return new Map();
    }
}

export async function withGithubStats<T extends Project>(
    projects: T[]
): Promise<(T & ProjectWithGithubStats)[]> {
    const repos = await fetchRepos();

    return projects.map((project) => {
        const repoName = repoNameFromUrl(project.githubUrl);
        const repo = repoName ? repos.get(repoName) : undefined;

        return {
            ...project,
            githubStars: repo?.stargazers_count,
            githubUpdatedAt: repo?.updated_at,
        };
    });
}
