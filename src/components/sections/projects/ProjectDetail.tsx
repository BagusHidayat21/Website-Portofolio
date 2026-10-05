import { ArrowUpRight, Github } from 'lucide-react';
import Image from 'next/image';
import { FramedImage } from '@/components/shared/FramedImage';
import { KineticHero } from '@/components/shared/KineticHero';
import { MagneticButton } from '@/components/shared/MagneticButton';
import { RevealGroup } from '@/components/shared/RevealGroup';
import type { Project } from '@/content/types';
import { ProjectBody } from './ProjectBody';
import { ProjectMeta } from './ProjectMeta';
import { ProjectPager } from './ProjectPager';

interface ProjectDetailProps {
    project: Project;
    stars?: number;
    prev: Project | null;
    next: Project | null;
}

export function ProjectDetail({ project, stars, prev, next }: ProjectDetailProps) {
    const [cover = project.thumbnail, ...gallery] = project.images;
    const hasLinks = Boolean(project.liveUrl || project.githubUrl);

    return (
        <article className="relative overflow-clip">
            <KineticHero
                lines={[project.title, String(project.createdAt.getFullYear())]}
                srTitle={`${project.title}, case study`}
                pill={project.liveUrl ? 'Live site available' : 'Case study'}
                pillLive={Boolean(project.liveUrl)}
                meta={project.techStack.slice(0, 3).join(' / ')}
                kicker="Case study"
                intro={project.description}
                density={0.6}
                actions={
                    hasLinks ? (
                        <>
                            {project.liveUrl ? (
                                <MagneticButton href={project.liveUrl} icon={<ArrowUpRight />}>
                                    Visit Live Site
                                </MagneticButton>
                            ) : null}
                            {project.githubUrl ? (
                                <MagneticButton href={project.githubUrl} icon={<Github />} variant="secondary">
                                    Source Code
                                </MagneticButton>
                            ) : null}
                        </>
                    ) : undefined
                }
            />

            {cover ? (
                <section aria-label={`${project.title} preview`} className="page-x">
                    <FramedImage src={cover} alt={project.title} sizes="(min-width: 1280px) 1240px, 100vw" variant="wide">
                        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
                    </FramedImage>
                </section>
            ) : null}

            <section className="py-24 md:py-40">
                <div className="page-x grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-10">
                    <ProjectMeta project={project} stars={stars} />
                    <div className="lg:col-span-8 lg:pl-6">
                        <ProjectBody content={project.content} fallback={project.description} />
                        {gallery.length > 0 ? (
                            <RevealGroup className="mt-24 grid grid-cols-1 gap-6 sm:grid-cols-2">
                                {gallery.map((src, i) => (
                                    <div key={src} className="rise relative aspect-[4/3] overflow-hidden rounded-card bg-ink-bg-2 ring-1 ring-ink-line">
                                        <Image src={src} alt={`${project.title} screenshot ${i + 2}`} fill sizes="(min-width: 640px) 40vw, 100vw" className="object-cover" />
                                    </div>
                                ))}
                            </RevealGroup>
                        ) : null}
                    </div>
                </div>
            </section>

            <ProjectPager prev={prev} next={next} />
        </article>
    );
}
