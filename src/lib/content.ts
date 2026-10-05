import { about } from '@/content/about';
import { education } from '@/content/education';
import { experience } from '@/content/experience';
import { profile } from '@/content/profile';
import { projects } from '@/content/projects';
import { techStack } from '@/content/tech';
import type { Education, Experience, Project, ProjectCard, ProjectCategory } from '@/content/types';

const listed = <T extends { isVisible: boolean; order: number }>(items: readonly T[]): T[] =>
    items.filter((item) => item.isVisible).toSorted((a, b) => a.order - b.order);

export const getProfile = () => profile;
export const getAbout = () => about;

export const getProjects = (): Project[] => listed(projects);
export const getFeaturedProjects = () => getProjects().filter((p) => p.isFeatured);
export const getProject = (slug: string) => getProjects().find((p) => p.slug === slug);

export function getAdjacentProjects(slug: string) {
    const list = getProjects();
    const index = list.findIndex((p) => p.slug === slug);
    return { prev: list[index - 1] ?? null, next: list[index + 1] ?? null };
}

export const getExperience = (limit?: number): Experience[] => listed(experience).slice(0, limit);
export const getEducation = (): Education[] => listed(education);

export const getMarqueeTech = () => listed(techStack).flatMap((t) => (t.inMarquee ? [t.name] : []));

export const getYearsCoding = () => new Date().getFullYear() - profile.codingSince;

const MOBILE_HINTS = ['android', 'ios', 'flutter', 'dart', 'react native', 'expo', 'kotlin', 'swift'];
const AI_HINTS = ['machine learning', 'ai model', 'data science', 'openai', 'pytorch', 'tensorflow', 'scikit', 'pandas', 'fastapi'];

/** Buckets a project by its stack and tags so the archive filters stay data driven. */
export function projectCategory(project: Project): ProjectCategory {
    const terms = [...project.techStack, ...project.tags].map((t) => t.toLowerCase());
    const matches = (hints: string[]) => terms.some((term) => hints.some((hint) => term.includes(hint)));
    if (matches(MOBILE_HINTS)) return 'mobile';
    if (matches(AI_HINTS)) return 'ai';
    return 'web';
}

export const toProjectCard = (project: Project, stars?: number): ProjectCard => ({
    id: project.id,
    slug: project.slug,
    title: project.title,
    description: project.description,
    image: project.images[0] ?? project.thumbnail,
    techStack: project.techStack,
    category: projectCategory(project),
    githubUrl: project.githubUrl,
    liveUrl: project.liveUrl,
    stars,
});
