import type { MetadataRoute } from 'next';
import { site } from '@/config/site';
import { getProjects } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();
    return [
        { url: site.url, lastModified: now, changeFrequency: 'monthly', priority: 1 },
        { url: `${site.url}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${site.url}/projects`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
        ...getProjects().map((project) => ({
            url: `${site.url}/projects/${project.slug}`,
            lastModified: project.updatedAt,
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        })),
    ];
}
