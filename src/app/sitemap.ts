import { MetadataRoute } from 'next';
import { projectsData } from '@/data/static-db';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://bagus-hidayat.my.id';

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/projects`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
    ];

    // Dynamic project pages
    const projectPages: MetadataRoute.Sitemap = projectsData
        .filter(p => p.isVisible)
        .map((project) => ({
            url: `${baseUrl}/projects/${project.slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        }));

    return [...staticPages, ...projectPages];
}
