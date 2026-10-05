import type { Metadata } from 'next';
import { Contact } from '@/components/sections/Contact';
import { Experience } from '@/components/sections/Experience';
import { FeaturedWork } from '@/components/sections/home/FeaturedWork';
import { Hero } from '@/components/sections/home/Hero';
import { Manifesto } from '@/components/sections/home/Manifesto';
import { TechMarquee } from '@/components/shared/TechMarquee';
import { getExperience, getFeaturedProjects, getMarqueeTech, getProfile, getProjects, getYearsCoding, toProjectCard } from '@/lib/content';
import { getRepoStars, starsFor } from '@/lib/github';

export const revalidate = 3600;

export const metadata: Metadata = { alternates: { canonical: '/' } };

export default async function HomePage() {
    const profile = getProfile();
    const stars = await getRepoStars();
    const experience = getExperience();
    const featured = getFeaturedProjects().map((p) => toProjectCard(p, starsFor(stars, p.githubUrl)));

    return (
        <>
            <Hero profile={profile} />
            <TechMarquee items={getMarqueeTech()} />
            <Manifesto
                name={profile.name}
                avatarUrl={profile.avatarUrl}
                stats={[
                    { value: getYearsCoding(), label: 'years writing code' },
                    { value: getProjects().length, suffix: '+', label: 'projects built' },
                    { value: experience.filter((e) => e.category === 'Achievement').length, label: 'papers and awards' },
                ]}
            />
            <FeaturedWork projects={featured} />
            <Experience items={experience.slice(0, 5)} />
            <Contact />
        </>
    );
}
