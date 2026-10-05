'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Fragment, useRef } from 'react';
import { gsap, useGSAP, applyParallax, MOTION_OK, DESKTOP_MOTION } from '@/lib/gsap';

interface Stat {
    value: number;
    suffix: string;
    label: string;
}

interface AboutManifestoClientProps {
    name: string;
    avatarUrl: string;
    stats: Stat[];
}

// Manifesto copy, condensed from the existing About section. The portrait pill is inserted after PILL_AFTER words.
const MANIFESTO =
    'I engineer full stack products with modern web architecture, machine learning and data, and I teach vocational students to ship software the way the industry does.';
const PILL_AFTER = 4;
const HIGHLIGHT = new Set(['full', 'stack', 'machine', 'learning', 'data,']);

export function AboutManifestoClient({ name, avatarUrl, stats }: AboutManifestoClientProps) {
    const root = useRef<HTMLElement>(null);
    const words = MANIFESTO.split(' ');

    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            mm.add(MOTION_OK, () => {
                // Words light up one by one as the paragraph scrolls through.
                gsap.fromTo(
                    '.mf-word',
                    { opacity: 0.12 },
                    {
                        opacity: 1,
                        ease: 'none',
                        stagger: 0.08,
                        scrollTrigger: { trigger: '.mf-text', start: 'top 75%', end: 'bottom 40%', scrub: true },
                    }
                );

                gsap.fromTo(
                    '.mf-pill',
                    { scale: 0.4, rotate: -12 },
                    {
                        scale: 1,
                        rotate: 0,
                        ease: 'none',
                        scrollTrigger: { trigger: '.mf-text', start: 'top 80%', end: 'top 35%', scrub: true },
                    }
                );

                // Giant background word slides sideways.
                gsap.fromTo(
                    '.mf-bgword',
                    { xPercent: 10 },
                    {
                        xPercent: -35,
                        ease: 'none',
                        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
                    }
                );

                // Portrait: frame rises, photo inside moves the other way.
                gsap.fromTo(
                    '.mf-photo',
                    { yPercent: -12, scale: 1.2 },
                    {
                        yPercent: 12,
                        scale: 1.2,
                        ease: 'none',
                        scrollTrigger: { trigger: '.mf-frame', start: 'top bottom', end: 'bottom top', scrub: true },
                    }
                );
                gsap.fromTo(
                    '.mf-frame',
                    { clipPath: 'inset(18% 12% 18% 12% round 2rem)' },
                    {
                        clipPath: 'inset(0% 0% 0% 0% round 2rem)',
                        ease: 'none',
                        scrollTrigger: { trigger: '.mf-frame', start: 'top 95%', end: 'top 35%', scrub: true },
                    }
                );

                // Count-up stats.
                gsap.utils.toArray<HTMLElement>('.mf-count').forEach((el) => {
                    const target = Number(el.dataset.value ?? 0);
                    const obj = { v: 0 };
                    gsap.to(obj, {
                        v: target,
                        duration: 1.6,
                        ease: 'power3.out',
                        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
                        onUpdate: () => {
                            el.textContent = String(Math.round(obj.v)).padStart(2, '0');
                        },
                    });
                });

                applyParallax(root.current);
            });

            mm.add(DESKTOP_MOTION, () => {
                gsap.from('.mf-stat', {
                    yPercent: 40,
                    autoAlpha: 0,
                    stagger: 0.12,
                    ease: 'expo.out',
                    duration: 1.2,
                    scrollTrigger: { trigger: '.mf-stats', start: 'top 85%' },
                });
            });

            return () => mm.revert();
        },
        { scope: root }
    );

    return (
        <section ref={root} id="about" className="relative overflow-hidden bg-ink-bg py-32 text-ink-fg md:py-48">
            <span
                aria-hidden="true"
                className="mf-bgword text-outline pointer-events-none absolute left-0 top-16 select-none whitespace-nowrap font-wide text-[clamp(6rem,22vw,22rem)] font-extrabold uppercase leading-none text-ink-fg/[0.07]"
            >
                Code and data
            </span>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
                <h2 className="sr-only">About {name}</h2>
                <p className="mf-text max-w-6xl text-balance font-display text-[clamp(1.85rem,4.2vw,4.25rem)] font-medium leading-[1.12] tracking-[-0.035em]">
                    {words.map((word, i) => (
                        <Fragment key={i}>
                            <span
                                className={
                                    HIGHLIGHT.has(word.toLowerCase())
                                        ? 'mf-word text-ink-accent-ink'
                                        : 'mf-word'
                                }
                            >
                                {word}
                            </span>{' '}
                            {i === PILL_AFTER - 1 && (
                                <span
                                    aria-hidden="true"
                                    className="mf-pill relative mx-1 inline-block h-[0.85em] w-[2.1em] overflow-hidden rounded-full align-[-0.08em] ring-1 ring-ink-line"
                                >
                                    <Image src={avatarUrl} alt="" fill sizes="10rem" className="object-cover object-top" />
                                </span>
                            )}
                        </Fragment>
                    ))}
                </p>

                <div className="mt-24 grid grid-cols-1 gap-12 md:mt-36 lg:grid-cols-12 lg:gap-10">
                    <div className="lg:col-span-5" data-speed="-1">
                        {/* Double-bezel portrait frame */}
                        <div className="rounded-[2.25rem] bg-ink-fg/[0.04] p-2 ring-1 ring-ink-line">
                            <div className="mf-frame relative aspect-[4/5] overflow-hidden rounded-[calc(2.25rem-0.5rem)] bg-ink-bg-2">
                                <Image
                                    src={avatarUrl}
                                    alt={`Portrait of ${name}`}
                                    fill
                                    sizes="(min-width: 1024px) 40vw, 100vw"
                                    className="mf-photo object-cover object-top"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col justify-end lg:col-span-6 lg:col-start-7">
                        <div className="mf-stats grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
                            {stats.map((stat, i) => (
                                <div key={stat.label} data-speed={String(0.6 + i * 0.5)}>
                                <div className="mf-stat border-t border-ink-line pt-6">
                                    <p className="font-wide text-[clamp(3rem,6vw,5.5rem)] font-extrabold leading-none tracking-[-0.04em] tabular-nums">
                                        <span className="mf-count" data-value={stat.value}>
                                            {String(stat.value).padStart(2, '0')}
                                        </span>
                                        <span className="text-ink-accent-ink">{stat.suffix}</span>
                                    </p>
                                    <p className="mt-3 text-sm text-ink-muted">{stat.label}</p>
                                </div>
                                </div>
                            ))}
                        </div>

                        <p className="mt-14 max-w-[52ch] text-lg leading-relaxed text-ink-muted">
                            Graduate of Universitas Negeri Malang, working full-time at PT Universal Big Data. My
                            focus now sits where data engineering and machine learning meet everyday web apps.
                        </p>

                        <Link
                            href="/about"
                            className="group mt-10 inline-flex w-max items-center gap-4 font-wide text-lg font-bold uppercase tracking-[-0.01em]"
                        >
                            <span className="relative">
                                Read full story
                                <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-ink-accent transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-x-100" />
                            </span>
                            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink-accent text-ink-on-accent transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:rotate-45">
                                <ArrowUpRight className="h-5 w-5" strokeWidth={1.75} />
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
