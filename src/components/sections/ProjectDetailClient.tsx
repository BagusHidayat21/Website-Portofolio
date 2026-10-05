'use client';

import { useMemo, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Github, Star } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { KineticHero } from '@/components/sections/KineticHero';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { Project } from '@/data/static-db';
import { useGithubStats } from '@/hooks/useGithubStats';
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap';

interface ProjectDetailClientProps {
    project: Project;
    prevProject?: Project | null;
    nextProject?: Project | null;
}

export function ProjectDetailClient({ project: baseProject, prevProject, nextProject }: ProjectDetailClientProps) {
    const root = useRef<HTMLElement>(null);
    const stats = useGithubStats();
    const project = useMemo(() => ({ ...baseProject, ...stats?.[baseProject.slug] }), [baseProject, stats]);

    const heroImage = project.images?.[0] ?? project.thumbnail ?? null;
    const gallery = project.images?.slice(1) ?? [];
    const year = new Date(project.createdAt).getFullYear();

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add(MOTION_OK, () => {
                gsap.fromTo(
                    '.pd-photo',
                    { yPercent: -9, scale: 1.18 },
                    {
                        yPercent: 9,
                        scale: 1.18,
                        ease: 'none',
                        scrollTrigger: { trigger: '.pd-frame', start: 'top bottom', end: 'bottom top', scrub: true },
                    }
                );
                gsap.fromTo(
                    '.pd-frame',
                    { clipPath: 'inset(14% 10% 14% 10% round 2rem)' },
                    {
                        clipPath: 'inset(0% 0% 0% 0% round 2rem)',
                        ease: 'none',
                        scrollTrigger: { trigger: '.pd-frame', start: 'top 95%', end: 'top 35%', scrub: true },
                    }
                );

                // Next project headline slides in from both sides, as the home contact headline does.
                if (root.current?.querySelector('.pd-next')) {
                    const range = { trigger: '.pd-next', start: 'top bottom', end: 'center center', scrub: 1 };
                    gsap.fromTo('.pd-next-left', { xPercent: -45 }, { xPercent: 0, ease: 'none', scrollTrigger: range });
                    gsap.fromTo('.pd-next-right', { xPercent: 45 }, { xPercent: 0, ease: 'none', scrollTrigger: range });
                }

                gsap.utils.toArray<HTMLElement>('.pd-shot').forEach((el) => {
                    gsap.from(el, {
                        yPercent: 10,
                        autoAlpha: 0,
                        duration: 1,
                        ease: 'expo.out',
                        scrollTrigger: { trigger: el, start: 'top 90%' },
                    });
                });
            });
            return () => mm.revert();
        },
        { scope: root }
    );

    return (
        <article ref={root} className="relative overflow-clip text-ink-fg">
            <KineticHero
                lines={[project.title, String(year)]}
                srTitle={`${project.title}, case study`}
                pill={project.liveUrl ? 'Live site available' : 'Case study'}
                pillLive={Boolean(project.liveUrl)}
                meta={project.techStack.slice(0, 3).join(' / ')}
                kicker="Case study"
                intro={project.description}
                density={0.6}
                actions={
                    project.liveUrl || project.githubUrl ? (
                        <>
                            {project.liveUrl && (
                                <MagneticButton href={project.liveUrl} external size="lg" icon={ArrowUpRight} iconDirection="diagonal">
                                    Visit Live Site
                                </MagneticButton>
                            )}
                            {project.githubUrl && (
                                <MagneticButton href={project.githubUrl} external variant="secondary" size="lg" icon={Github}>
                                    Source Code
                                </MagneticButton>
                            )}
                        </>
                    ) : undefined
                }
            />

            {heroImage && (
                <section className="px-4 sm:px-6 lg:px-10" aria-label={`${project.title} preview`}>
                    <div className="mx-auto max-w-7xl shell">
                        <div className="pd-frame relative aspect-[16/10] overflow-hidden shell-core bg-ink-bg-2">
                            <Image
                                src={heroImage}
                                alt={project.title}
                                fill
                                sizes="(min-width: 1280px) 1240px, 100vw"
                                className="pd-photo object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        </div>
                    </div>
                </section>
            )}

            <section className="py-24 md:py-40">
                <div className="page-x grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-10">
                    <aside className="lg:col-span-4">
                        <div className="shell lg:sticky lg:top-28">
                            <div className="space-y-8 shell-core bg-ink-bg-2 p-7 md:p-9">
                                <div>
                                    <p className="label text-ink-muted">Year</p>
                                    <p className="mt-1 font-wide text-3xl font-extrabold tracking-[-0.03em] tabular-nums">{year}</p>
                                </div>

                                <div>
                                    <p className="label text-ink-muted">Built with</p>
                                    <ul className="mt-3 flex flex-wrap gap-2">
                                        {project.techStack.map((tech) => (
                                            <li
                                                key={tech}
                                                className="chip text-ink-fg/80"
                                            >
                                                {tech}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {typeof project.githubStars === 'number' && (
                                    <div>
                                        <p className="label text-ink-muted">GitHub stars</p>
                                        <p className="mt-1 flex items-center gap-2 font-wide text-3xl font-extrabold tracking-[-0.03em] tabular-nums">
                                            <Star className="h-6 w-6 text-ink-accent-ink" strokeWidth={1.75} aria-hidden="true" />
                                            {project.githubStars}
                                        </p>
                                    </div>
                                )}

                                {(project.githubUrl || project.liveUrl) && (
                                    <div className="flex flex-col gap-2 border-t border-ink-line pt-6">
                                        {project.liveUrl && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group flex h-12 items-center justify-between rounded-full border border-ink-line pl-5 pr-2 text-sm font-medium transition-colors hover:bg-ink-fg hover:text-ink-bg"
                                            >
                                                Live site
                                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-fg/[0.08] transition-transform duration-500 group-hover:rotate-45">
                                                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                                                </span>
                                            </a>
                                        )}
                                        {project.githubUrl && (
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group flex h-12 items-center justify-between rounded-full border border-ink-line pl-5 pr-2 text-sm font-medium transition-colors hover:bg-ink-fg hover:text-ink-bg"
                                            >
                                                Repository
                                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-fg/[0.08] transition-transform duration-500 group-hover:rotate-45">
                                                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                                                </span>
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </aside>

                    <div className="lg:col-span-8 lg:pl-6">
                        {project.content ? (
                            <ReactMarkdown
                                components={{
                                    h2: ({ children }) => (
                                        <h2 className="mb-6 mt-16 font-wide text-[clamp(1.75rem,3.6vw,3.5rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.035em] first:mt-0">
                                            {children}
                                        </h2>
                                    ),
                                    h3: ({ children }) => (
                                        <h3 className="mb-4 mt-10 font-wide text-xl font-extrabold uppercase tracking-[-0.02em]">{children}</h3>
                                    ),
                                    p: ({ children }) => (
                                        <p className="mb-6 max-w-[62ch] text-lg leading-relaxed text-ink-muted">{children}</p>
                                    ),
                                    ul: ({ children }) => <ul className="mb-8 space-y-3">{children}</ul>,
                                    li: ({ children }) => (
                                        <li className="flex max-w-[62ch] items-start gap-3 border-t border-ink-line pt-3 text-lg leading-relaxed text-ink-fg/80">
                                            <span className="mt-[0.7em] h-2 w-2 shrink-0 rounded-full bg-ink-accent-ink" aria-hidden="true" />
                                            <span>{children}</span>
                                        </li>
                                    ),
                                    code: ({ children }) => (
                                        <code className="rounded bg-ink-fg/[0.06] px-1.5 py-0.5 font-mono text-sm text-ink-fg">{children}</code>
                                    ),
                                }}
                            >
                                {project.content.replace(/\\n/g, '\n')}
                            </ReactMarkdown>
                        ) : (
                            <p className="max-w-[62ch] text-lg leading-relaxed text-ink-muted">{project.description}</p>
                        )}

                        {gallery.length > 0 && (
                            <div className="mt-24 grid grid-cols-1 gap-6 sm:grid-cols-2">
                                {gallery.map((src, i) => (
                                    <div
                                        key={src}
                                        className="pd-shot relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-ink-bg-2 ring-1 ring-ink-line"
                                    >
                                        <Image
                                            src={src}
                                            alt={`${project.title} screenshot ${i + 2}`}
                                            fill
                                            sizes="(min-width: 640px) 40vw, 100vw"
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <nav aria-label="More projects" className="border-t border-ink-line pb-16 pt-16 md:pb-24 md:pt-28">
                {nextProject && (
                    <Link href={`/projects/${nextProject.slug}`} className="pd-next group block overflow-hidden">
                        <span className="label page-x block text-ink-muted">Next project</span>
                        <span className="mt-6 block font-wide text-[clamp(1.75rem,6.6vw,6.5rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.04em]">
                            <span className="pd-next-left block sm:whitespace-nowrap px-4 sm:px-6 lg:px-10">Up next</span>
                            <span className="pd-next-right text-outline block sm:whitespace-nowrap px-4 text-right transition-colors duration-500 group-hover:text-ink-fg sm:px-6 lg:px-10">
                                {nextProject.title}
                                <span className="text-ink-accent-ink [-webkit-text-stroke:0]">.</span>
                            </span>
                        </span>
                    </Link>
                )}

                <div className="page-x mt-12 flex flex-wrap items-center justify-between gap-4 md:mt-16">
                    <Link
                        href="/projects"
                        className="group inline-flex h-11 items-center gap-2 rounded-full border border-ink-line pl-3 pr-5 text-sm font-medium text-ink-muted transition-colors hover:border-ink-fg/30 hover:text-ink-fg"
                    >
                        <ArrowLeft
                            className="h-4 w-4 transition-transform duration-500 group-hover:-translate-x-1"
                            strokeWidth={1.75}
                            aria-hidden="true"
                        />
                        All projects
                    </Link>
                    {prevProject && (
                        <Link
                            href={`/projects/${prevProject.slug}`}
                            className="group inline-flex items-center gap-3 text-sm font-medium text-ink-muted transition-colors hover:text-ink-fg"
                        >
                            <span className="label">Previous</span>
                            <span className="font-wide font-extrabold uppercase tracking-[-0.02em]">{prevProject.title}</span>
                        </Link>
                    )}
                </div>
            </nav>
        </article>
    );
}
