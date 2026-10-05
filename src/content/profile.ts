import { site } from '@/config/site';
import type { Profile } from './types';

export const profile = {
    name: site.name,
    tagline: 'Full Stack Web Developer',
    bio: 'I build web products end to end, from the database schema to the screen people actually use. Software engineer at PT Universal Big Data and graduate of Universitas Negeri Malang, now working where data engineering and machine learning meet everyday web apps.',
    avatarUrl: '/avatars/profile.webp',
    resumeUrl: site.resumeUrl,
    email: site.email,
    location: site.location,
    codingSince: 2019,
    isAvailableForWork: false,
    currentCompany: 'PT Universal Big Data',
    socials: site.socials,
} satisfies Profile;
