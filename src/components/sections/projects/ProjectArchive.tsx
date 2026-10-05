'use client';

import { Search } from 'lucide-react';
import { useDeferredValue, useRef, useState } from 'react';
import { ProjectCard } from '@/components/shared/ProjectCard';
import { SectionHeading } from '@/components/shared/SectionHeading';
import type { ProjectCard as ProjectCardData, ProjectCategory } from '@/content/types';
import { useLazyGSAP } from '@/hooks/useLazyGSAP';
import { useReveal } from '@/hooks/useReveal';
import { MOTION_OK } from '@/lib/motion';
import { cn } from '@/lib/utils';

type Filter = 'all' | ProjectCategory;

const FILTERS: { id: Filter; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'web', label: 'Web' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'ai', label: 'AI and Data' },
];

const pad = (n: number) => String(n).padStart(2, '0');

const countByCategory = (projects: ProjectCardData[]) => {
    const counts: Record<Filter, number> = { all: projects.length, web: 0, mobile: 0, ai: 0 };
    for (const project of projects) counts[project.category] += 1;
    return counts;
};

const matchesQuery = (project: ProjectCardData, query: string) =>
    !query ||
    project.title.toLowerCase().includes(query) ||
    project.description.toLowerCase().includes(query) ||
    project.techStack.some((tech) => tech.toLowerCase().includes(query));

export function ProjectArchive({ projects }: { projects: ProjectCardData[] }) {
    const root = useRef<HTMLElement>(null);
    const [filter, setFilter] = useState<Filter>('all');
    const [query, setQuery] = useState('');
    const deferredQuery = useDeferredValue(query.trim().toLowerCase());
    useReveal(root, '.rise');

    const counts = countByCategory(projects);
    const visible = projects.filter((p) => (filter === 'all' || p.category === filter) && matchesQuery(p, deferredQuery));

    useLazyGSAP(
        ({ gsap }) => {
            const mm = gsap.matchMedia();
            mm.add(MOTION_OK, () => {
                for (const card of gsap.utils.toArray<HTMLElement>('.archive-card')) {
                    gsap.fromTo(
                        card.querySelector('.card-media'),
                        { scale: 0.86, autoAlpha: 0.35 },
                        { scale: 1, autoAlpha: 1, ease: 'none', scrollTrigger: { trigger: card, start: 'top 95%', end: 'top 40%', scrub: true } }
                    );
                    const scrollTrigger = { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true };
                    gsap.fromTo(card.querySelector('.card-img'), { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger });
                    gsap.fromTo(card.querySelector('.card-title'), { xPercent: 12 }, { xPercent: -4, ease: 'none', scrollTrigger });
                }
            });
            return () => mm.revert();
        },
        root,
        { key: `${filter}|${deferredQuery}` }
    );

    const reset = () => {
        setFilter('all');
        setQuery('');
    };

    return (
        <section ref={root} id="archive" aria-labelledby="archive-heading" className="relative overflow-hidden pb-20 pt-16 sm:pb-32 sm:pt-24 md:pb-48 md:pt-40">
            <div className="page-x">
                <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
                    <SectionHeading id="archive-heading" label={`Archive / ${pad(projects.length)} projects`} title="Everything" className="lg:col-span-6" />
                    <div className="rise flex lg:col-span-6 lg:justify-end">
                        <label className="relative w-full max-w-md">
                            <span className="sr-only">Search projects</span>
                            <Search aria-hidden="true" className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" strokeWidth={1.75} />
                            <input
                                type="search"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search by name or stack"
                                className="h-12 w-full rounded-full border border-ink-line bg-ink-fg/[0.03] pl-12 pr-5 text-sm placeholder:text-ink-muted focus-visible:border-ink-accent-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-accent-ink/40"
                            />
                        </label>
                    </div>
                </div>

                <div role="group" aria-label="Filter by category" className="rise mt-10 flex flex-wrap gap-2">
                    {FILTERS.map(({ id, label }) => {
                        const count = counts[id];
                        if (count === 0) return null;
                        const active = filter === id;
                        return (
                            <button
                                key={id}
                                type="button"
                                onClick={() => setFilter(id)}
                                aria-pressed={active}
                                className={cn(
                                    'inline-flex h-11 items-center gap-2 rounded-full border px-5 text-sm font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-accent-ink',
                                    active ? 'border-ink-accent bg-ink-accent text-ink-on-accent' : 'border-ink-line text-ink-muted hover:border-ink-fg/30 hover:text-ink-fg'
                                )}
                            >
                                {label}
                                <span className={cn('font-mono text-xs', active ? 'text-ink-on-accent/70' : 'text-ink-muted')}>{pad(count)}</span>
                            </button>
                        );
                    })}
                </div>

                {visible.length === 0 ? (
                    <div className="shell mt-20">
                        <div className="shell-core flex flex-col items-center gap-6 bg-ink-bg-2 px-6 py-24 text-center">
                            <p className="font-wide text-[clamp(1.75rem,4vw,3.5rem)] uppercase leading-[0.9] tracking-[-0.035em]">Nothing matches</p>
                            <p className="max-w-[40ch] text-ink-muted">No project fits that search and category. Clear the filters to see the full archive.</p>
                            <button
                                type="button"
                                onClick={reset}
                                className="inline-flex h-12 items-center rounded-full bg-ink-accent px-6 text-sm font-semibold text-ink-on-accent transition-transform active:scale-[0.98]"
                            >
                                Clear filters
                            </button>
                        </div>
                    </div>
                ) : (
                    <ul className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 md:mt-20 lg:grid-cols-2">
                        {visible.map((project, index) => (
                            <li key={project.id} className="lg:even:mt-24">
                                <ProjectCard
                                    project={project}
                                    index={index}
                                    sizes="(min-width: 1024px) 50vw, 100vw"
                                    className="archive-card"
                                    mediaClassName="aspect-[4/5] sm:aspect-[16/11]"
                                    titleClassName="text-[clamp(2rem,4.2vw,4.25rem)]"
                                />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
}
