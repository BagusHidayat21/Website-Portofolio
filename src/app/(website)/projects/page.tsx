import { Github } from 'lucide-react';
import { Contact } from '@/components/sections/Contact';
import { ProjectArchive } from '@/components/sections/projects/ProjectArchive';
import { KineticHero } from '@/components/shared/KineticHero';
import { MagneticButton } from '@/components/shared/MagneticButton';
import { TechMarquee } from '@/components/shared/TechMarquee';
import { socialUrl } from '@/config/site';
import { getMarqueeTech, getProjects, toProjectCard } from '@/lib/content';
import { getRepoStars, starsFor } from '@/lib/github';
import { pageMetadata } from '@/lib/seo';

export const revalidate = 3600;

export const metadata = pageMetadata({
    title: 'Projects',
    description:
        'Explore the portfolio of projects by Bagus Hidayat - featuring web applications, mobile apps, and data engineering solutions built with Next.js, Laravel, Flutter, and more.',
    path: '/projects',
});

export default async function ProjectsPage() {
    const stars = await getRepoStars();
    const projects = getProjects().map((p) => toProjectCard(p, starsFor(stars, p.githubUrl)));
    const github = socialUrl('GitHub');

    return (
        <>
            <KineticHero
                lines={['Selected', 'projects']}
                srTitle="Selected projects by Bagus Hidayat"
                pill={`${projects.length} projects in the archive`}
                meta="Web / Mobile / Data"
                kicker="Archive"
                intro="Web platforms, mobile apps and data work I built for schools, small teams and my own research. Open any one for the full case study."
                density={0.6}
                actions={
                    github ? (
                        <MagneticButton href={github} icon={<Github />}>
                            GitHub Profile
                        </MagneticButton>
                    ) : undefined
                }
            />
            <TechMarquee items={getMarqueeTech()} />
            <ProjectArchive projects={projects} />
            <Contact />
        </>
    );
}
