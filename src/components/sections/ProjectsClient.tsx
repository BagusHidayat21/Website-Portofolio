'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ExternalLink, Github, Search, Star } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Project } from '@/data/static-db';
import { useGithubStats } from '@/hooks/useGithubStats';
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap';
import { cn } from '@/lib/utils';

const CATEGORIES = [
    { id: 'all', label: 'All' },
    { id: 'web', label: 'Web' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'ai', label: 'AI and Data' },
] as const;

// Buckets a project by its stack and tags so the filter pills stay data driven.
function detectCategory(project: Project): string {
    const all = [...(project.techStack || []), ...(project.tags || [])].map((t) => t.toLowerCase());
    if (all.some((t) => ['android', 'ios', 'flutter', 'dart', 'react native', 'expo', 'kotlin', 'swift'].some((k) => t.includes(k)))) return 'mobile';
    if (all.some((t) => ['machine learning', 'ai model', 'data science', 'openai', 'pytorch', 'tensorflow', 'scikit', 'pandas', 'fastapi', 'ai & data'].some((k) => t.includes(k)))) return 'ai';
    return 'web';
}

export function ProjectsClient({ projects: baseProjects }: { projects: Project[] }) {
    const root = useRef<HTMLElement>(null);
    const stats = useGithubStats();
    const statsLoading = stats === null;
    const [category, setCategory] = useState<string>('all');
    const [query, setQuery] = useState('');

    const projects = useMemo(
        () => baseProjects.map((project) => ({ ...project, ...stats?.[project.slug] })),
        [baseProjects, stats]
    );

    const counts = useMemo(() => {
        const map: Record<string, number> = { all: projects.length };
        projects.forEach((p) => {
            const c = detectCategory(p);
            map[c] = (map[c] ?? 0) + 1;
        });
        return map;
    }, [projects]);

    const visible = useMemo(() => {
        const q = query.trim().toLowerCase();
        return projects.filter((p) => {
            const matchCategory = category === 'all' || detectCategory(p) === category;
            const matchQuery =
                !q ||
                p.title.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q) ||
                p.techStack.some((t) => t.toLowerCase().includes(q));
            return matchCategory && matchQuery;
        });
    }, [projects, category, query]);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add(MOTION_OK, () => {
                gsap.from('.pr-line', { yPercent: 110, duration: 1.3, ease: 'expo.out', stagger: 0.1 });
                gsap.from('.pr-fade', { y: 24, autoAlpha: 0, duration: 1, ease: 'expo.out', stagger: 0.08, delay: 0.45 });

                // Heading halves drift apart as the page scrolls away.
                gsap.to('.pr-h-1', {
                    xPercent: -12,
                    ease: 'none',
                    scrollTrigger: { trigger: '.pr-head', start: 'top top', end: 'bottom top', scrub: true },
                });
                gsap.to('.pr-h-2', {
                    xPercent: 10,
                    ease: 'none',
                    scrollTrigger: { trigger: '.pr-head', start: 'top top', end: 'bottom top', scrub: true },
                });
            });
            return () => mm.revert();
        },
        { scope: root }
    );

    // Cards re-enter whenever the filter result changes.
    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add(MOTION_OK, () => {
                gsap.utils.toArray<HTMLElement>('.pr-card').forEach((card) => {
                    gsap.from(card, {
                        yPercent: 10,
                        autoAlpha: 0,
                        duration: 1,
                        ease: 'expo.out',
                        scrollTrigger: { trigger: card, start: 'top 92%' },
                    });
                    const img = card.querySelector('.pr-img');
                    if (img) {
                        gsap.fromTo(
                            img,
                            { yPercent: -7 },
                            {
                                yPercent: 7,
                                ease: 'none',
                                scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true },
                            }
                        );
                    }
                });
            });
            return () => mm.revert();
        },
        { scope: root, dependencies: [category, query, projects.length], revertOnUpdate: true }
    );

    return (
        <section ref={root} className="relative overflow-hidden pb-20 pt-28 text-ink-fg sm:pb-32 sm:pt-36 md:pb-48 md:pt-44">
            <div className="pr-head overflow-hidden">
                <h1 className="font-wide text-[clamp(2.25rem,7.5vw,6rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.04em]">
                    <span className="pr-h-1 block whitespace-nowrap px-4 sm:px-6 lg:px-10">
                        <span className="pr-line block overflow-hidden pb-[0.06em]">Selected</span>
                    </span>
                    <span className="pr-h-2 text-outline block whitespace-nowrap px-4 text-right sm:px-6 lg:px-10">
                        <span className="pr-line block overflow-hidden pb-[0.06em]">
                            projects<span className="text-ink-accent-ink [-webkit-text-stroke:0]">.</span>
                        </span>
                    </span>
                </h1>
            </div>

            <div className="mx-auto mt-10 max-w-7xl px-4 sm:mt-16 sm:px-6 md:mt-24 lg:px-10">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
                    <p className="pr-fade max-w-[46ch] text-lg leading-relaxed text-ink-muted md:text-xl lg:col-span-6">
                        Web platforms, mobile apps and data work I built for schools, small teams and my own research.
                        Open any one for the full case study.
                    </p>

                    <div className="pr-fade flex flex-col gap-4 lg:col-span-6 lg:items-end">
                        <div className="relative w-full max-w-md">
                            <Search
                                className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted"
                                strokeWidth={1.75}
                                aria-hidden="true"
                            />
                            <input
                                type="search"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search by name or stack"
                                aria-label="Search projects"
                                className="h-12 w-full rounded-full border border-ink-line bg-ink-fg/[0.03] pl-12 pr-5 text-sm text-ink-fg placeholder:text-ink-muted focus-visible:border-ink-accent-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-accent-ink/40"
                            />
                        </div>
                    </div>
                </div>

                <div className="pr-fade mt-10 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
                    {CATEGORIES.filter((c) => c.id === 'all' || counts[c.id]).map((c) => {
                        const active = category === c.id;
                        return (
                            <button
                                key={c.id}
                                type="button"
                                onClick={() => setCategory(c.id)}
                                aria-pressed={active}
                                className={cn(
                                    'inline-flex h-11 items-center gap-2 rounded-full border px-5 text-sm font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-accent-ink',
                                    active
                                        ? 'border-ink-accent bg-ink-accent text-ink-on-accent'
                                        : 'border-ink-line text-ink-muted hover:border-ink-fg/30 hover:text-ink-fg'
                                )}
                            >
                                {c.label}
                                <span className={cn('font-mono text-xs', active ? 'text-ink-on-accent/70' : 'text-ink-muted')}>
                                    {String(counts[c.id] ?? 0).padStart(2, '0')}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {visible.length === 0 ? (
                    <div className="mt-20 rounded-[2.25rem] bg-ink-fg/[0.04] p-2 ring-1 ring-ink-line">
                        <div className="flex flex-col items-center gap-6 rounded-[calc(2.25rem-0.5rem)] bg-ink-bg-2 px-6 py-24 text-center">
                            <p className="font-wide text-[clamp(1.75rem,4vw,3.5rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.035em]">
                                Nothing matches
                            </p>
                            <p className="max-w-[40ch] text-ink-muted">
                                No project fits that search and category. Clear the filters to see the full archive.
                            </p>
                            <button
                                type="button"
                                onClick={() => {
                                    setCategory('all');
                                    setQuery('');
                                }}
                                className="inline-flex h-12 items-center rounded-full bg-ink-accent px-6 text-sm font-semibold text-ink-on-accent transition-transform active:scale-[0.98]"
                            >
                                Clear filters
                            </button>
                        </div>
                    </div>
                ) : (
                    <ul className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 md:mt-20 lg:grid-cols-2">
                        {visible.map((project, index) => (
                            <li key={project.id} className="pr-card lg:[&:nth-child(even)]:mt-24">
                                <Link
                                    href={`/projects/${project.slug}`}
                                    className="group block"
                                    aria-label={`${project.title} case study`}
                                >
                                    <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-ink-bg-2 ring-1 ring-ink-line sm:aspect-[16/11]">
                                        {project.images?.[0] && (
                                            <div className="pr-img absolute inset-[-9%]">
                                                <Image
                                                    src={project.images[0]}
                                                    alt={project.title}
                                                    fill
                                                    sizes="(min-width: 1024px) 50vw, 100vw"
                                                    priority={index < 2}
                                                    className="object-cover contrast-[1.08] grayscale-[40%] transition-[filter,transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04] group-hover:grayscale-0"
                                                />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                                        <span className="absolute left-5 top-6 font-mono text-sm text-white/80 md:left-7 md:top-8">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <span className="absolute right-5 top-5 flex h-14 w-14 items-center justify-center rounded-full bg-ink-accent text-ink-on-accent transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:rotate-45 md:right-7 md:top-7">
                                            <ArrowUpRight className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                                        </span>

                                        <div className="absolute inset-x-5 bottom-5 md:inset-x-8 md:bottom-8">
                                            <div className="mb-4 flex flex-wrap items-center gap-2">
                                                {project.techStack.slice(0, 4).map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-md"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                                {statsLoading && project.githubUrl ? (
                                                    <Skeleton className="h-6 w-12 rounded-full bg-white/15" />
                                                ) : (
                                                    typeof project.githubStars === 'number' && (
                                                        <span className="flex items-center gap-1 rounded-full bg-black/30 px-3 py-1 text-xs font-medium text-white">
                                                            <Star className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
                                                            {project.githubStars}
                                                        </span>
                                                    )
                                                )}
                                            </div>
                                            <h2 className="font-wide text-[clamp(2rem,4.2vw,4.25rem)] font-extrabold uppercase leading-[0.85] tracking-[-0.04em] text-white">
                                                {project.title}
                                            </h2>
                                        </div>
                                    </div>
                                </Link>

                                <div className="mt-6 flex items-start justify-between gap-6">
                                    <p className="max-w-[52ch] text-base leading-relaxed text-ink-muted">{project.description}</p>
                                    <div className="flex shrink-0 items-center gap-1">
                                        {project.githubUrl && (
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`${project.title} on GitHub`}
                                                className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-line text-ink-fg transition-colors hover:bg-ink-fg hover:text-ink-bg"
                                            >
                                                <Github className="h-4 w-4" strokeWidth={1.75} />
                                            </a>
                                        )}
                                        {project.liveUrl && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`${project.title} live site`}
                                                className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-line text-ink-fg transition-colors hover:bg-ink-fg hover:text-ink-bg"
                                            >
                                                <ExternalLink className="h-4 w-4" strokeWidth={1.75} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
}
