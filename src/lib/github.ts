import { cache } from 'react';

const OWNER = 'BagusHidayat21';
export const GITHUB_REVALIDATE = 3600;
const REPO_NAME = /github\.com\/[^/]+\/([^/?#]+)/i;

interface Repo {
    name: string;
    stargazers_count: number;
}

const isRepoList = (data: unknown): data is Repo[] =>
    Array.isArray(data) && data.every((r) => typeof r?.name === 'string' && typeof r?.stargazers_count === 'number');

function requestRepos(token?: string) {
    const url = token
        ? 'https://api.github.com/user/repos?type=all&per_page=100'
        : `https://api.github.com/users/${OWNER}/repos?per_page=100`;
    return fetch(url, {
        headers: { Accept: 'application/vnd.github+json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        next: { revalidate: GITHUB_REVALIDATE },
    });
}

/** Stars by lowercased repo name: one hourly-cached request; a bad token falls back to the public endpoint. */
export const getRepoStars = cache(async (): Promise<Map<string, number>> => {
    try {
        const token = process.env.GITHUB_TOKEN;
        let res = await requestRepos(token);
        if (res.status === 401 && token) res = await requestRepos();
        if (!res.ok) return new Map();
        const data: unknown = await res.json();
        return isRepoList(data) ? new Map(data.map((r) => [r.name.toLowerCase(), r.stargazers_count])) : new Map();
    } catch {
        return new Map();
    }
});

export function starsFor(stars: Map<string, number>, githubUrl: string | null) {
    const name = githubUrl?.match(REPO_NAME)?.[1]?.toLowerCase();
    return name ? stars.get(name) : undefined;
}
