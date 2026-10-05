'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, ExternalLink, Github, Star } from 'lucide-react';
import { useMemo, useRef } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Project } from '@/data/static-db';
import { useGithubStats } from '@/hooks/useGithubStats';
import { gsap, useGSAP, DESKTOP_MOTION } from '@/lib/gsap';

export function FeaturedProjectsClient({ projects: baseProjects }: { projects: Project[] }) {
    const root = useRef<HTMLElement>(null);
    const stats = useGithubStats();
    const statsLoading = stats === null;

    const projects = useMemo(
        () => baseProjects.map((project) => ({ ...project, ...stats?.[project.slug] })),
        [baseProjects, stats]
    );

    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            mm.add(DESKTOP_MOTION, () => {
                const scope = root.current;
                if (!scope) return;
                const pinEl = scope.querySelector<HTMLElement>('.pj-pin');
                const track = scope.querySelector<HTMLElement>('.pj-track');
                if (!pinEl || !track) return;

                const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

                const pan = gsap.to(track, {
                    x: () => -distance(),
                    ease: 'none',
                    scrollTrigger: {
                        trigger: pinEl,
                        start: 'top top',
                        end: () => `+=${distance()}`,
                        pin: true,
                        scrub: 1,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                        onUpdate: (self) => gsap.set('.pj-bar', { scaleX: self.progress }),
                    },
                });

                gsap.utils.toArray<HTMLElement>('.pj-panel').forEach((panel) => {
                    const img = panel.querySelector('.pj-img');
                    const title = panel.querySelector('.pj-title');
                    const range = {
                        trigger: panel,
                        containerAnimation: pan,
                        start: 'left right',
                        end: 'right left',
                        scrub: true,
                    };
                    if (img) gsap.fromTo(img, { xPercent: -9 }, { xPercent: 9, ease: 'none', scrollTrigger: range });
                    if (title) gsap.fromTo(title, { xPercent: 30 }, { xPercent: -12, ease: 'none', scrollTrigger: range });
                });

                gsap.fromTo(
                    '.pj-intro-word',
                    { xPercent: 0 },
                    {
                        xPercent: -40,
                        ease: 'none',
                        stagger: 0.1,
                        scrollTrigger: { trigger: pinEl, start: 'top top', end: () => `+=${window.innerWidth}`, scrub: true },
                    }
                );
            });

            mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
                gsap.utils.toArray<HTMLElement>('.pj-panel').forEach((panel) => {
                    const card = panel.querySelector('.pj-media');
                    const img = panel.querySelector('.pj-img');
                    if (card)
                        gsap.fromTo(
                            card,
                            { scale: 0.86, autoAlpha: 0.35 },
                            {
                                scale: 1,
                                autoAlpha: 1,
                                ease: 'none',
                                scrollTrigger: { trigger: panel, start: 'top 95%', end: 'top 40%', scrub: true },
                            }
                        );
                    if (img)
                        gsap.fromTo(
                            img,
                            { yPercent: -8 },
                            {
                                yPercent: 8,
                                ease: 'none',
                                scrollTrigger: { trigger: panel, start: 'top bottom', end: 'bottom top', scrub: true },
                            }
                        );
                });
            });

            return () => mm.revert();
        },
        { scope: root }
    );

    return (
        <section ref={root} id="projects" className="relative text-ink-fg">
            <div className="pj-pin relative overflow-hidden py-16 sm:py-24 md:py-40 lg:motion-safe:flex lg:motion-safe:h-[100dvh] lg:motion-safe:items-center lg:motion-safe:py-0">
                <div
                    className="pj-track flex flex-col gap-14 sm:gap-20 lg:motion-safe:w-max lg:motion-safe:flex-row lg:motion-safe:items-center lg:motion-safe:gap-[5vw] lg:motion-safe:pl-10 lg:motion-safe:pr-[12vw]"
                >
                    {/* Intro panel */}
                    <div className="shrink-0 px-4 sm:px-6 lg:motion-safe:w-[38vw] lg:motion-safe:px-0">
                        <h2 className="font-wide text-[clamp(2.25rem,7vw,7.5rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.04em]">
                            <span className="pj-intro-word block">Selected</span>
                            <span className="pj-intro-word text-outline block">work</span>
                        </h2>
                        <p className="mt-8 max-w-[38ch] text-lg leading-relaxed text-ink-muted">
                            A few builds I am proud of, from thesis research to a marketplace running in production.
                        </p>
                        <Link
                            href="/projects"
                            className="group mt-8 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.08em] text-ink-fg"
                        >
                            View all projects
                            <ArrowRight
                                className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1"
                                strokeWidth={1.75}
                            />
                        </Link>
                    </div>

                    {projects.map((project, index) => (
                        <article key={project.id} className="pj-panel shrink-0 px-4 sm:px-6 lg:motion-safe:w-[56vw] lg:motion-safe:px-0">
                            <Link href={`/projects/${project.slug}`} className="group block" aria-label={`${project.title}: read the case study`}>
                                <div
                                    className="pj-media relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-ink-bg-2 ring-1 ring-ink-line sm:aspect-[16/11] lg:motion-safe:aspect-auto lg:motion-safe:h-[66vh]"
                                >
                                    {project.images?.[0] && (
                                        <div className="pj-img absolute inset-[-12%]">
                                            <Image
                                                src={project.images[0]}
                                                alt={project.title}
                                                fill
                                                sizes="(min-width: 1024px) 60vw, 100vw"
                                                priority={index === 0}
                                                className="object-cover contrast-[1.08] grayscale-[40%] transition-[filter,transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04] group-hover:grayscale-0"
                                            />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

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
                                        <h3 className="pj-title font-wide text-[clamp(2.25rem,5.5vw,6rem)] font-extrabold uppercase leading-[0.85] tracking-[-0.04em] text-white">
                                            {project.title}
                                        </h3>
                                    </div>
                                </div>
                            </Link>

                            <div className="mt-6 flex items-start justify-between gap-6">
                                <p className="max-w-[56ch] text-base leading-relaxed text-ink-muted">{project.description}</p>
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
                        </article>
                    ))}

                    {/* Closing panel */}
                    <div className="flex shrink-0 justify-center px-4 sm:px-6 lg:motion-safe:w-[30vw] lg:motion-safe:px-0">
                        <Link
                            href="/projects"
                            className="group relative flex aspect-square w-full max-w-[22rem] flex-col items-center justify-center gap-4 rounded-full bg-ink-accent text-ink-on-accent transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.04]"
                        >
                            <span className="font-wide text-[clamp(1.75rem,3vw,2.75rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.03em]">
                                All
                                <br />
                                projects
                            </span>
                            <ArrowUpRight
                                className="h-8 w-8 transition-transform duration-500 group-hover:rotate-45"
                                strokeWidth={1.5}
                                aria-hidden="true"
                            />
                        </Link>
                    </div>
                </div>

                <div aria-hidden="true" className="absolute inset-x-10 bottom-10 hidden h-px bg-ink-line lg:motion-safe:block">
                    <div className="pj-bar h-full origin-left scale-x-0 bg-ink-accent" />
                </div>
            </div>
        </section>
    );
}
