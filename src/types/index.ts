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
    id: number | string; // Changed to support dummy string IDs
    githubId?: number; // Optional now
    repoName?: string; // Optional
    url: string | null;
    liveUrl?: string | null;
    title: string | null;
    description: string | null;
    images: string[];
    tags: string[];
    techStack: string[];
    isFeatured?: boolean;
    isVisible?: boolean;
    order?: number;
    stars?: number;
    githubDescription?: string | null;
    lastUpdated?: string;
    language?: string | null;
    // Enhanced fields for Case Studies
    role?: string;
    timeline?: string;
    year?: string;
    challenge?: string;
    solution?: string;
}
