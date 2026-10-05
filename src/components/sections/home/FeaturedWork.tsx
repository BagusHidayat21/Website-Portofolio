'use client';

import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';
import { ProjectCard } from '@/components/shared/ProjectCard';
import type { ProjectCard as ProjectCardData } from '@/content/types';
import { useLazyGSAP } from '@/hooks/useLazyGSAP';
import { DESKTOP_MOTION, MOBILE_MOTION } from '@/lib/motion';

/** Desktop: pinned horizontal gallery with counter-moving images and titles. Mobile: stacked cards that scale in. */
export function FeaturedWork({ projects }: { projects: ProjectCardData[] }) {
    const root = useRef<HTMLElement>(null);

    useLazyGSAP(({ gsap }) => {
        const mm = gsap.matchMedia();

        mm.add(DESKTOP_MOTION, () => {
            const pin = root.current?.querySelector<HTMLElement>('.gallery-pin');
            const track = root.current?.querySelector<HTMLElement>('.gallery-track');
            if (!pin || !track) return;
            const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

            const pan = gsap.to(track, {
                x: () => -distance(),
                ease: 'none',
                scrollTrigger: {
                    trigger: pin,
                    start: 'top top',
                    end: () => `+=${distance()}`,
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => gsap.set('.gallery-bar', { scaleX: self.progress }),
                },
            });

            for (const card of gsap.utils.toArray<HTMLElement>('.gallery-card')) {
                const scrollTrigger = { trigger: card, containerAnimation: pan, start: 'left right', end: 'right left', scrub: true };
                gsap.fromTo(card.querySelector('.card-img'), { xPercent: -9 }, { xPercent: 9, ease: 'none', scrollTrigger });
                gsap.fromTo(card.querySelector('.card-title'), { xPercent: 30 }, { xPercent: -12, ease: 'none', scrollTrigger });
            }

            gsap.to('.gallery-intro-word', {
                xPercent: -40,
                ease: 'none',
                stagger: 0.1,
                scrollTrigger: { trigger: pin, start: 'top top', end: () => `+=${window.innerWidth}`, scrub: true },
            });
        });

        mm.add(MOBILE_MOTION, () => {
            for (const card of gsap.utils.toArray<HTMLElement>('.gallery-card')) {
                gsap.fromTo(
                    card.querySelector('.card-media'),
                    { scale: 0.86, autoAlpha: 0.35 },
                    { scale: 1, autoAlpha: 1, ease: 'none', scrollTrigger: { trigger: card, start: 'top 95%', end: 'top 40%', scrub: true } }
                );
                gsap.fromTo(
                    card.querySelector('.card-img'),
                    { yPercent: -8 },
                    { yPercent: 8, ease: 'none', scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true } }
                );
            }
        });

        return () => mm.revert();
    }, root);

    return (
        <section ref={root} id="projects" aria-labelledby="work-heading" className="relative">
            <div className="gallery-pin relative overflow-hidden py-16 sm:py-24 md:py-40 lg:motion-safe:flex lg:motion-safe:h-svh lg:motion-safe:items-center lg:motion-safe:py-0">
                <div className="gallery-track flex flex-col gap-14 sm:gap-20 lg:motion-safe:w-max lg:motion-safe:flex-row lg:motion-safe:items-center lg:motion-safe:gap-[5vw] lg:motion-safe:pl-10 lg:motion-safe:pr-[12vw]">
                    <div className="shrink-0 px-4 sm:px-6 lg:motion-safe:w-[38vw] lg:motion-safe:px-0">
                        <h2 id="work-heading" className="font-wide text-[clamp(2.25rem,7vw,7.5rem)] uppercase leading-[0.88] tracking-[-0.04em]">
                            <span className="gallery-intro-word block">Selected</span>
                            <span className="gallery-intro-word text-outline block">work</span>
                        </h2>
                        <p className="mt-8 max-w-[38ch] text-lg leading-relaxed text-ink-muted">
                            A few builds I am proud of, from thesis research to a marketplace running in production.
                        </p>
                        <Link href="/projects" className="group mt-8 inline-flex min-h-11 items-center gap-3 text-sm font-semibold uppercase tracking-[0.08em]">
                            View all projects
                            <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-500 ease-expo group-hover:translate-x-1" strokeWidth={1.75} />
                        </Link>
                    </div>

                    {projects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            sizes="(min-width: 1024px) 60vw, 100vw"
                            className="gallery-card shrink-0 px-4 sm:px-6 lg:motion-safe:w-[56vw] lg:motion-safe:px-0"
                            mediaClassName="aspect-[4/5] sm:aspect-[16/11] lg:motion-safe:aspect-auto lg:motion-safe:h-[66vh]"
                            titleClassName="text-[clamp(2.25rem,5.5vw,6rem)]"
                        />
                    ))}

                    <div className="flex shrink-0 justify-center px-4 sm:px-6 lg:motion-safe:w-[30vw] lg:motion-safe:px-0">
                        <Link
                            href="/projects"
                            className="group relative flex aspect-square w-36 sm:w-48 lg:w-60 flex-col items-center justify-center gap-2 sm:gap-3 rounded-full bg-ink-accent text-ink-on-accent transition-transform duration-700 ease-expo hover:scale-[1.04]"
                        >
                            <span className="text-center font-wide text-sm sm:text-lg lg:text-2xl uppercase leading-[0.9] tracking-[-0.03em]">
                                All
                                <br />
                                projects
                            </span>
                            <ArrowUpRight aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 transition-transform duration-500 group-hover:rotate-45" strokeWidth={1.5} />
                        </Link>
                    </div>
                </div>

                <div aria-hidden="true" className="absolute inset-x-10 bottom-10 hidden h-px bg-ink-line lg:motion-safe:block">
                    <div className="gallery-bar h-full origin-left scale-x-0 bg-ink-accent" />
                </div>
            </div>
        </section>
    );
}
