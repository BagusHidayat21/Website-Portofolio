import type { Metadata } from 'next';
import { site } from '@/config/site';

interface PageSeo {
    title?: string;
    description: string;
    path: string;
    image?: string;
}

export function pageMetadata({ title, description, path, image }: PageSeo): Metadata {
    const fullTitle = title ? `${title} | ${site.name}` : site.title;
    return {
        ...(title ? { title } : {}),
        description,
        alternates: { canonical: path },
        openGraph: {
            type: 'website',
            locale: 'en_US',
            siteName: `${site.name} Portfolio`,
            title: fullTitle,
            description,
            url: path,
            images: image ? [{ url: image }] : [site.ogImage],
        },
        twitter: { card: 'summary_large_image', title: fullTitle, description, images: [image ?? site.ogImage.url] },
    };
}

export const personJsonLd = () => ({
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'WebSite',
            '@id': `${site.url}/#website`,
            url: site.url,
            name: site.name,
            inLanguage: 'en',
            publisher: { '@id': `${site.url}/#person` },
        },
        {
            '@type': 'Person',
            '@id': `${site.url}/#person`,
            name: site.name,
            url: site.url,
            image: `${site.url}/avatars/profile.webp`,
            description: 'Full-Stack Web Developer specializing in Data Engineering, Machine Learning, and modern web technologies.',
            jobTitle: 'Full-Stack Web Developer',
            worksFor: { '@type': 'Organization', name: 'PT Universal Big Data' },
            address: { '@type': 'PostalAddress', addressLocality: 'Malang', addressCountry: 'ID' },
            alumniOf: { '@type': 'CollegeOrUniversity', name: 'Universitas Negeri Malang' },
            knowsAbout: ['Next.js', 'React', 'Laravel', 'Machine Learning', 'Data Engineering', 'TypeScript', 'PostgreSQL'],
            sameAs: site.socials.map((s) => s.url),
        },
    ],
});
