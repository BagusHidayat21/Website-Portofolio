'use client';

import { useMemo, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Github, Star } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
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
                gsap.from('.pd-line', { yPercent: 110, duration: 1.3, ease: 'expo.out', stagger: 0.1 });
                gsap.from('.pd-fade', { y: 24, autoAlpha: 0, duration: 1, ease: 'expo.out', stagger: 0.08, delay: 0.4 });

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
        <article ref={root} className="relative overflow-hidden bg-ink-bg text-ink-fg">
            <header className="px-4 pb-12 pt-28 sm:px-6 sm:pb-16 sm:pt-36 md:pb-24 md:pt-48 lg:px-10">
                <div className="mx-auto max-w-7xl">
                    <Link
                        href="/projects"
                        className="pd-fade group inline-flex h-11 items-center gap-2 rounded-full border border-ink-line pl-3 pr-5 text-sm font-medium text-ink-muted transition-colors hover:border-ink-fg/30 hover:text-ink-fg"
                    >
                        <ArrowLeft
                            className="h-4 w-4 transition-transform duration-500 group-hover:-translate-x-1"
                            strokeWidth={1.75}
                            aria-hidden="true"
                        />
                        All projects
                    </Link>

                    <h1 className="mt-8 font-wide text-[clamp(2.25rem,6vw,5.25rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.035em] break-words">
                        <span className="pd-line block overflow-hidden pb-[0.06em]">
                            {project.title}
                            <span className="text-ink-accent">.</span>
                        </span>
                    </h1>

                    <div className="mt-8 grid grid-cols-1 gap-8 sm:mt-12 sm:gap-10 lg:grid-cols-12">
                        <p className="pd-fade max-w-[46ch] text-lg leading-relaxed text-ink-muted md:text-xl lg:col-span-7">
                            {project.description}
                        </p>
                        <div className="pd-fade flex flex-wrap items-start gap-3 lg:col-span-5 lg:justify-end">
                            {project.liveUrl && (
                                <MagneticButton href={project.liveUrl} external size="lg" icon={ArrowUpRight} iconDirection="diagonal">
                                    Visit live site
                                </MagneticButton>
                            )}
                            {project.githubUrl && (
                                <MagneticButton
                                    href={project.githubUrl}
                                    external
                                    variant="secondary"
                                    size="lg"
                                    icon={Github}
                                >
                                    Source code
                                </MagneticButton>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {heroImage && (
                <section className="px-4 sm:px-6 lg:px-10" aria-label={`${project.title} preview`}>
                    <div className="mx-auto max-w-7xl rounded-[2.25rem] bg-ink-fg/[0.04] p-2 ring-1 ring-ink-line">
                        <div className="pd-frame relative aspect-[16/10] overflow-hidden rounded-[calc(2.25rem-0.5rem)] bg-ink-bg-2">
                            <Image
                                src={heroImage}
                                alt={project.title}
                                fill
                                priority
                                sizes="(min-width: 1280px) 1240px, 100vw"
                                className="pd-photo object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        </div>
                    </div>
                </section>
            )}

            <section className="px-4 py-24 sm:px-6 md:py-40 lg:px-10">
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-10">
                    <aside className="lg:col-span-4">
                        <div className="rounded-[2.25rem] bg-ink-fg/[0.04] p-2 ring-1 ring-ink-line lg:sticky lg:top-28">
                            <div className="space-y-8 rounded-[calc(2.25rem-0.5rem)] bg-ink-bg-2 p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] md:p-9">
                                <div>
                                    <p className="font-mono text-sm text-ink-muted">Year</p>
                                    <p className="mt-1 font-wide text-3xl font-extrabold tracking-[-0.03em] tabular-nums">{year}</p>
                                </div>

                                <div>
                                    <p className="font-mono text-sm text-ink-muted">Built with</p>
                                    <ul className="mt-3 flex flex-wrap gap-2">
                                        {project.techStack.map((tech) => (
                                            <li
                                                key={tech}
                                                className="rounded-full bg-ink-fg/[0.06] px-3 py-1 text-xs font-medium text-ink-fg/80"
                                            >
                                                {tech}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {typeof project.githubStars === 'number' && (
                                    <div>
                                        <p className="font-mono text-sm text-ink-muted">GitHub stars</p>
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
                                        <h3 className="mb-4 mt-10 font-wide text-xl font-bold uppercase tracking-[-0.02em]">{children}</h3>
                                    ),
                                    p: ({ children }) => (
                                        <p className="mb-6 max-w-[62ch] text-lg leading-relaxed text-ink-muted">{children}</p>
                                    ),
                                    ul: ({ children }) => <ul className="mb-8 space-y-3">{children}</ul>,
                                    li: ({ children }) => (
                                        <li className="flex max-w-[62ch] items-start gap-3 border-t border-ink-line pt-3 text-lg leading-relaxed text-ink-fg/80">
                                            <span className="mt-[0.7em] h-2 w-2 shrink-0 rounded-full bg-ink-accent" aria-hidden="true" />
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

            {(prevProject || nextProject) && (
                <nav
                    aria-label="More projects"
                    className="border-t border-ink-line px-4 py-16 sm:px-6 md:py-24 lg:px-10"
                >
                    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 md:grid-cols-2">
                        {prevProject ? (
                            <Link href={`/projects/${prevProject.slug}`} className="group block">
                                <p className="font-mono text-sm text-ink-muted">Previous</p>
                                <p className="mt-3 font-wide text-[clamp(1.5rem,3.2vw,2.75rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.035em] text-ink-fg/60 transition-colors duration-500 group-hover:text-ink-fg">
                                    {prevProject.title}
                                </p>
                            </Link>
                        ) : (
                            <span aria-hidden="true" />
                        )}
                        {nextProject && (
                            <Link href={`/projects/${nextProject.slug}`} className="group block md:text-right">
                                <p className="font-mono text-sm text-ink-muted">Next</p>
                                <p className="mt-3 flex items-center gap-5 font-wide text-[clamp(1.5rem,3.2vw,2.75rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.035em] md:justify-end">
                                    <span>{nextProject.title}</span>
                                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink-accent text-ink-on-accent transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:rotate-45 md:h-16 md:w-16">
                                        <ArrowUpRight className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.75} aria-hidden="true" />
                                    </span>
                                </p>
                            </Link>
                        )}
                    </div>
                </nav>
            )}
        </article>
    );
}
