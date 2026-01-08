export interface GithubRepo {
    id: number;
    name: string;
    full_name: string;
    html_url: string;
    description: string | null;
    homepage: string | null;
    stargazers_count: number;
    language: string | null;
    topics: string[];
    created_at: string;
    updated_at: string;
}

export interface ProjectWithRepo {
    id: number;
    githubId: number;
    repoName: string;
    url: string;
    liveUrl?: string | null;
    title: string | null;
    description: string | null; // From DB or Fallback to Repo
    images: string[];
    tags: string[];
    techStack: string[];
    isFeatured: boolean;
    isVisible: boolean;
    order: number;
    // Merged Data from GitHub (Real-time/Cached)
    stars?: number;
    githubDescription?: string | null;
    lastUpdated?: string;
    language?: string | null;
}
