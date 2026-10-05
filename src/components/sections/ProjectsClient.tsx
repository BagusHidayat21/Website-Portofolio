'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ExternalLink, Github, Search, Star } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import { KineticHero } from '@/components/sections/KineticHero';
import { TechMarquee } from '@/components/sections/TechMarquee';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { Skeleton } from '@/components/ui/skeleton';
import { Project } from '@/data/static-db';
import { useGithubStats } from '@/hooks/useGithubStats';
import { useLazyGSAP } from '@/hooks/useLazyGSAP';
import { MOTION_OK } from '@/lib/gsap';
import { useReveal } from '@/hooks/useReveal';
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

interface ProjectsClientProps {
    projects: Project[];
    marqueeItems: string[];
    githubUrl?: string;
}

export function ProjectsClient({ projects: baseProjects, marqueeItems, githubUrl }: ProjectsClientProps) {
    const root = useRef<HTMLElement>(null);
    useReveal(root, '.pr-fade');
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

    useLazyGSAP(
        ({ gsap }) => {
            const mm = gsap.matchMedia();
            mm.add(MOTION_OK, () => {
                gsap.fromTo(
                    '.pr-heading',
                    { xPercent: 8 },
                    {
                        xPercent: 0,
                        ease: 'none',
                        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'top 30%', scrub: true },
                    }
                );
            });
            return () => mm.revert();
        },
        root
    );

    // Cards re-enter whenever the filter result changes.
    useLazyGSAP(
        ({ gsap }) => {
            const mm = gsap.matchMedia();
            mm.add(MOTION_OK, () => {
                // Same panel motion as the home gallery: frame scales in, image and title drift against each other.
                gsap.utils.toArray<HTMLElement>('.pr-card').forEach((card) => {
                    const media = card.querySelector('.pr-media');
                    const img = card.querySelector('.pr-img');
                    const title = card.querySelector('.pr-title');
                    if (media)
                        gsap.fromTo(
                            media,
                            { scale: 0.86, autoAlpha: 0.35 },
                            {
                                scale: 1,
                                autoAlpha: 1,
                                ease: 'none',
                                scrollTrigger: { trigger: card, start: 'top 95%', end: 'top 40%', scrub: true },
                            }
                        );
                    const range = { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true };
                    if (img) gsap.fromTo(img, { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: range });
                    if (title) gsap.fromTo(title, { xPercent: 12 }, { xPercent: -4, ease: 'none', scrollTrigger: range });
                });
            });
            return () => mm.revert();
        },
        root,
        { dependencies: [category, query, projects.length] }
    );

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
                    githubUrl ? (
                        <MagneticButton href={githubUrl} external size="lg" icon={Github}>
                            GitHub Profile
                        </MagneticButton>
                    ) : undefined
                }
            />

            {marqueeItems.length > 0 && <TechMarquee items={marqueeItems} />}

            <section
                ref={root}
                id="archive"
                aria-labelledby="archive-heading"
                className="relative overflow-hidden pb-20 pt-16 text-ink-fg sm:pb-32 sm:pt-24 md:pb-48 md:pt-40"
            >
                <div className="page-x">
                    <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
                        <div className="overflow-hidden lg:col-span-6">
                            <p className="label text-ink-muted">
                                Archive / {String(projects.length).padStart(2, '0')} projects
                            </p>
                            <h2
                                id="archive-heading"
                                className="pr-heading mt-4 font-wide text-[clamp(2.25rem,6.5vw,5.5rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.04em]"
                            >
                                Everything<span className="text-ink-accent-ink">.</span>
                            </h2>
                        </div>

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
                        <div className="mt-20 shell">
                            <div className="flex flex-col items-center gap-6 shell-core bg-ink-bg-2 px-6 py-24 text-center">
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
                                       
                                    >
                                        <div className="pr-media relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-ink-bg-2 ring-1 ring-ink-line sm:aspect-[16/11]">
                                            {project.images?.[0] && (
                                                <div className="pr-img absolute inset-[-9%]">
                                                    <Image
                                                        src={project.images[0]}
                                                        alt={project.title}
                                                        fill
                                                        sizes="(min-width: 1024px) 50vw, 100vw"
                                                        className="object-cover contrast-[1.08] grayscale-[40%] transition-[filter,transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04] group-hover:grayscale-0"
                                                    />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                                            <span className="label absolute left-5 top-6 text-white/80 md:left-7 md:top-8">
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
                                                <h3 className="pr-title font-wide text-[clamp(2rem,4.2vw,4.25rem)] font-extrabold uppercase leading-[0.85] tracking-[-0.04em] text-white">
                                                    {project.title}
                                                </h3>
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
        </>
    );
}
