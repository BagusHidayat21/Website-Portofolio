'use client';

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
}

export function ExperienceClient({ items }: { items: ExperienceItem[] }) {
    const root = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add(MOTION_OK, () => {
                gsap.fromTo(
                    '.xp-heading',
                    { xPercent: 12 },
                    {
                        xPercent: -18,
                        ease: 'none',
                        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'top top', scrub: true },
                    }
                );

                // Each card shrinks and dims as the next one slides over it.
                const cards = gsap.utils.toArray<HTMLElement>('.xp-card');
                cards.forEach((card, i) => {
                    const next = cards[i + 1];
                    if (!next) return;
                    gsap.to(card.querySelector('.xp-inner'), {
                        scale: 0.9,
                        autoAlpha: 0.35,
                        rotate: i % 2 === 0 ? -1.5 : 1.5,
                        ease: 'none',
                        scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 20%', scrub: true },
                    });
                });

                gsap.utils.toArray<HTMLElement>('.xp-inner').forEach((inner) => {
                    gsap.from(inner.querySelectorAll('.xp-rise'), {
                        yPercent: 60,
                        autoAlpha: 0,
                        stagger: 0.08,
                        duration: 1,
                        ease: 'expo.out',
                        scrollTrigger: { trigger: inner, start: 'top 80%' },
                    });
                });
            });
            return () => mm.revert();
        },
        { scope: root }
    );

    return (
        <section ref={root} className="relative pb-20 pt-16 text-ink-fg sm:pb-32 sm:pt-24 md:pb-48 md:pt-40">
            <div className="overflow-hidden">
                <h2 className="xp-heading mb-12 whitespace-nowrap px-4 font-wide text-[clamp(2.5rem,8vw,7rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.04em] sm:px-6 md:mb-20 lg:px-10">
                    Experience<span className="text-ink-accent-ink">.</span>
                </h2>
            </div>

            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
                {items.map((item, i) => {
                    const current = i === 0;
                    return (
                        <div
                            key={item.id}
                            className="xp-card sticky mb-[18vh] last:mb-0"
                            style={{ top: `calc(5.5rem + ${i * 1.1}rem)` }}
                        >
                            {/* Double-bezel shell */}
                            <article className="xp-inner origin-top rounded-[2.25rem] bg-ink-fg/[0.04] p-2 ring-1 ring-ink-line will-change-transform">
                                <div
                                    className={cn(
                                        'grid min-h-[52vh] grid-cols-1 gap-8 rounded-[calc(2.25rem-0.5rem)] p-7 md:min-h-[440px] md:grid-cols-12 md:p-12',
                                        current
                                            ? 'bg-ink-accent text-ink-on-accent'
                                            : 'bg-ink-bg-2 text-ink-fg shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]'
                                    )}
                                >
                                    <div className="flex flex-col justify-between gap-6 md:col-span-4">
                                        <p className="xp-rise font-mono text-sm">{item.year}</p>
                                        <p
                                            className={cn(
                                                'xp-rise w-max rounded-full border px-3 py-1 text-xs font-medium',
                                                current ? 'border-black/20' : 'border-ink-line text-ink-muted'
                                            )}
                                        >
                                            {current ? 'Now' : item.category}
                                        </p>
                                    </div>
                                    <div className="flex flex-col justify-between gap-8 md:col-span-8">
                                        <div>
                                            <h3 className="xp-rise font-wide text-[clamp(1.75rem,3.6vw,3.5rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.035em]">
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
                                                        className={cn(
                                                            'rounded-full px-3 py-1 text-xs font-medium',
                                                            current ? 'bg-black/10' : 'bg-ink-fg/[0.06] text-ink-fg/80'
                                                        )}
                                                    >
                                                        {skill}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
