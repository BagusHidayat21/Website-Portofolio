import { AboutHero } from '@/components/sections/about/AboutHero';
import { Education } from '@/components/sections/about/Education';
import { Principles } from '@/components/sections/about/Principles';
import { Story } from '@/components/sections/about/Story';
import { Contact } from '@/components/sections/Contact';
import { Experience } from '@/components/sections/Experience';
import { TechMarquee } from '@/components/shared/TechMarquee';
import { getAbout, getEducation, getExperience, getMarqueeTech, getProfile } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
    title: 'About',
    description:
        'Learn about Bagus Hidayat, Full-Stack Web Developer specializing in Data Engineering, Machine Learning, and modern web architectures. Graduate of Universitas Negeri Malang currently working at PT Universal Big Data.',
    path: '/about',
});

export default function AboutPage() {
    const profile = getProfile();
    const about = getAbout();
    const experience = getExperience();

    return (
        <>
            <AboutHero profile={profile} about={about} currentRole={experience.find((e) => e.category === 'Work')?.title} />
            <TechMarquee items={[...about.tags, ...getMarqueeTech()]} />
            <Story profile={profile} about={about} />
            <Principles principles={about.philosophy} />
            <Experience items={experience} />
            <Education items={getEducation()} />
            <Contact />
        </>
    );
}
