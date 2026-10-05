import type { ExternalUrl, Href } from '@/lib/links';

export interface SocialLink {
    platform: 'GitHub' | 'LinkedIn' | 'Instagram';
    url: ExternalUrl;
}

export interface Profile {
    name: string;
    tagline: string;
    bio: string;
    avatarUrl: string;
    resumeUrl: `/${string}.pdf`;
    email: string;
    location: string;
    codingSince: number;
    socials: readonly SocialLink[];
    isAvailableForWork: boolean;
    currentCompany?: string;
}

export interface Principle {
    title: string;
    description: string;
    icon: 'Target' | 'Database' | 'GraduationCap' | 'HeartHandshake' | 'Shield';
    proof: { label: string; href?: Href }[];
}

export interface AboutContent {
    heroTitle: string;
    heroSubtitle: string;
    heroDescription: string;
    storyTitle: string;
    storyContent: string;
    tags: string[];
    philosophy: Principle[];
}

interface Listed {
    id: number;
    isVisible: boolean;
    order: number;
}

export interface Experience extends Listed {
    title: string;
    company: string;
    year: string;
    description: string;
    skills: string[];
    category: 'Work' | 'Project' | 'Achievement';
    url?: ExternalUrl;
}

export interface Education extends Listed {
    institution: string;
    degree: string;
    field: string;
    year: string;
    description: string;
}

export interface Project extends Listed {
    title: string;
    slug: string;
    description: string;
    content: string | null;
    githubUrl: ExternalUrl | null;
    liveUrl: ExternalUrl | null;
    thumbnail: string | null;
    images: string[];
    techStack: string[];
    tags: string[];
    isFeatured: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface TechStack extends Listed {
    name: string;
    category: 'Frontend' | 'Backend' | 'Language' | 'Tool' | 'Other';
    inMarquee: boolean;
}

export type ProjectCategory = 'web' | 'mobile' | 'ai';

/** The slice of a project that list views render; keeps markdown bodies out of client payloads. */
export interface ProjectCard {
    id: number;
    slug: string;
    title: string;
    description: string;
    image: string | null;
    techStack: string[];
    category: ProjectCategory;
    githubUrl: ExternalUrl | null;
    liveUrl: ExternalUrl | null;
    stars?: number;
}
