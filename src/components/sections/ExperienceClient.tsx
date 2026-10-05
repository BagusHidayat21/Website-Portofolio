'use client';

import { ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap';

interface ExperienceItem {
    id: number;
    title: string;
    company: string;
    year: string;
    description: string;
    skills: string[];
    category: string;
    url?: string;
}

// Sticky stacking needs room for a whole card in the viewport: tablet width and a reasonably tall screen.
const STACK_MOTION = '(min-width: 768px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)';

export function ExperienceClient({ items }: { items: ExperienceItem[] }) {
    const root = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            mm.add(MOTION_OK, () => {
                // Heading slides in and settles on the container edge, never past it.
                gsap.fromTo(
                    '.xp-heading',
                    { xPercent: 8 },
                    {
                        xPercent: 0,
                        ease: 'none',
                        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'top 30%', scrub: true },
                    }
                );

                gsap.utils.toArray<HTMLElement>('.xp-inner').forEach((inner) => {
                    gsap.from(inner.querySelectorAll('.xp-rise'), {
                        yPercent: 40,
                        autoAlpha: 0,
                        stagger: 0.06,
                        duration: 0.9,
                        ease: 'expo.out',
                        scrollTrigger: { trigger: inner, start: 'top 80%', once: true },
                    });
                });
            });

            mm.add(STACK_MOTION, () => {
                // Each card recedes under the next: it scales down and an opaque shade darkens it.
                // The card itself stays opaque, so stacked cards never show through each other.
                const cards = gsap.utils.toArray<HTMLElement>('.xp-card');
                cards.forEach((card, i) => {
                    const next = cards[i + 1];
                    if (!next) return;
                    const range = { trigger: next, start: 'top bottom', end: 'top 25%', scrub: true };
                    gsap.to(card.querySelector('.xp-inner'), { scale: 0.94, ease: 'none', scrollTrigger: range });
                    gsap.fromTo(card.querySelector('.xp-shade'), { opacity: 0 }, { opacity: 0.55, ease: 'none', scrollTrigger: range });
                });
            });

            return () => mm.revert();
        },
        { scope: root }
    );

    return (
        <section
            ref={root}
            aria-labelledby="experience-heading"
            className="relative pb-20 pt-16 text-ink-fg sm:pb-32 sm:pt-24 md:pb-48 md:pt-40"
        >
            <div className="page-x overflow-hidden">
                <p className="label text-ink-muted">Where I have worked</p>
                <h2
                    id="experience-heading"
                    className="xp-heading mt-4 font-wide text-[clamp(2.25rem,6.5vw,5.5rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.04em]"
                >
                    Experience<span className="text-ink-accent-ink">.</span>
                </h2>
            </div>

            <ol className="mx-auto mt-12 w-full max-w-6xl px-4 sm:px-6 md:mt-20 lg:px-10">
                {items.map((item, i) => {
                    const current = i === 0;
                    return (
                        <li
                            key={item.id}
                            className="xp-card mb-6 last:mb-0 [@media(min-width:768px)_and_(min-height:700px)]:sticky [@media(min-width:768px)_and_(min-height:700px)]:mb-[16vh]"
                            style={{ top: `calc(6rem + ${i * 1}rem)` }}
                        >
                            <article className="xp-inner shell relative origin-top">
                                <div
                                    className={cn(
                                        'shell-core grid grid-cols-1 gap-6 p-6 sm:p-8 md:min-h-[420px] md:grid-cols-12 md:gap-8 md:p-12',
                                        current ? 'bg-ink-accent text-ink-on-accent' : 'bg-ink-bg-2 text-ink-fg'
                                    )}
                                >
                                    <div className="flex flex-wrap items-center justify-between gap-4 md:col-span-4 md:flex-col md:items-start md:justify-between">
                                        <p className="xp-rise label">{item.year}</p>
                                        <p
                                            className={cn(
                                                'xp-rise chip',
                                                current ? 'border-black/20 text-black/75' : 'text-ink-muted'
                                            )}
                                        >
                                            {current ? 'Current role' : item.category}
                                        </p>
                                    </div>
                                    <div className="flex min-w-0 flex-col justify-between gap-8 md:col-span-8">
                                        <div>
                                            <h3 className="xp-rise font-wide text-[clamp(1.5rem,3.2vw,3rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.035em] [overflow-wrap:anywhere]">
                                                {item.title}
                                            </h3>
                                            <p
                                                className={cn(
                                                    'xp-rise mt-4 text-base font-medium md:text-lg',
                                                    current ? 'text-black/70' : 'text-ink-muted'
                                                )}
                                            >
                                                {item.company}
                                            </p>
                                        </div>
                                        <div>
                                            <p
                                                className={cn(
                                                    'xp-rise max-w-[60ch] leading-relaxed',
                                                    current ? 'text-black/80' : 'text-ink-fg/75'
                                                )}
                                            >
                                                {item.description}
                                            </p>
                                            <ul className="xp-rise mt-6 flex flex-wrap gap-2">
                                                {item.skills.map((skill) => (
                                                    <li
                                                        key={skill}
                                                        className={cn('chip', current ? 'border-black/15 bg-black/5' : 'text-ink-fg/80')}
                                                    >
                                                        {skill}
                                                    </li>
                                                ))}
                                            </ul>
                                            {item.url && (
                                                <a
                                                    href={item.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="xp-rise group mt-6 inline-flex items-center gap-2 text-sm font-semibold underline decoration-1 underline-offset-4"
                                                >
                                                    Read the paper
                                                    <ArrowUpRight
                                                        className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                                        strokeWidth={1.75}
                                                        aria-hidden="true"
                                                    />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {/* Shade for the recede effect; animated by opacity only. */}
                                <div
                                    aria-hidden="true"
                                    className="xp-shade pointer-events-none absolute inset-0 rounded-[2.25rem] bg-ink-bg opacity-0"
                                />
                            </article>
                        </li>
                    );
                })}
            </ol>
        </section>
    );
}
