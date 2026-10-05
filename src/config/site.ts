import type { SocialLink } from '@/content/types';

export const site = {
    name: 'Bagus Hidayat',
    url: 'https://www.bagus-hidayat.my.id',
    title: 'Bagus Hidayat | Full-Stack Web Developer',
    description:
        'Portfolio of Bagus Hidayat, Software Engineer & Graduate of Universitas Negeri Malang working full-time at PT Universal Big Data, specializing in Full-Stack Development, Data Engineering, and Machine Learning.',
    email: 'bagus.hidayat.id@gmail.com',
    resumeUrl: '/resume.pdf',
    location: 'Malang, Indonesia',
    ogImage: { url: '/og-image.png', width: 1200, height: 630, alt: 'Bagus Hidayat Portfolio' },
    socials: [
        { platform: 'GitHub', url: 'https://github.com/BagusHidayat21' },
        { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/bagushidayat-id/' },
        { platform: 'Instagram', url: 'https://www.instagram.com/hid.bgs/' },
    ] satisfies SocialLink[],
    nav: [
        { href: '/', label: 'Home', index: '01' },
        { href: '/projects', label: 'Projects', index: '02' },
        { href: '/about', label: 'About', index: '03' },
    ],
} as const;

export const socialUrl = (platform: SocialLink['platform']) => site.socials.find((s) => s.platform === platform)?.url;
