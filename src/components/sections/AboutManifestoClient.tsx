'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';
import { ScrollWords } from './ScrollWords';
import { useReveal } from '@/hooks/useReveal';
import { useLazyGSAP } from '@/hooks/useLazyGSAP';
import { applyParallax, MOTION_OK } from '@/lib/gsap';

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

// Manifesto copy, condensed from the About story.
const MANIFESTO =
    'I build full stack products, put data and machine learning to work inside them, and teach vocational students to ship software the way real teams do.';
const HIGHLIGHT = ['full', 'stack', 'data', 'machine', 'learning'];

export function AboutManifestoClient({ name, avatarUrl, stats }: AboutManifestoClientProps) {
    const root = useRef<HTMLElement>(null);
    useReveal(root, '.mf-stat');

    useLazyGSAP(
        ({ gsap }) => {
            const mm = gsap.matchMedia();

            mm.add(MOTION_OK, () => {
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

                applyParallax(gsap, root.current);
            });

            return () => mm.revert();
        },
        root
    );

    return (
        <section ref={root} id="about" className="relative overflow-hidden py-14 text-ink-fg sm:py-20 md:py-28">
            <div className="page-x relative">
                <div className="label mb-6 flex items-center gap-2 text-ink-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-ink-accent" />
                    <span>About</span>
                </div>
                <h2 className="sr-only">About {name}</h2>
                <ScrollWords text={MANIFESTO} highlight={HIGHLIGHT} />

                <div className="mt-10 grid grid-cols-1 gap-10 sm:mt-14 md:mt-20 md:gap-12 lg:grid-cols-12 lg:gap-10">
                    <div className="lg:col-span-5" data-speed="-0.4">
                        {/* Double-bezel portrait frame */}
                        <div className="shell">
                            <div className="mf-frame relative aspect-[4/5] overflow-hidden shell-core bg-ink-bg-2">
                                <Image
                                    src={avatarUrl}
                                    alt={`Portrait of ${name}`}
                                    fill
                                    sizes="(min-width: 1024px) 40vw, 100vw"
                                    className="mf-photo object-cover object-top"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                                <div className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1 font-mono text-[11px] text-white backdrop-blur-md">
                                    <span className="h-1.5 w-1.5 rounded-full bg-ink-accent" />
                                    <span>{name}</span>
                                </div>
                                <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-xs text-white/90">
                                    <span className="font-medium">Software Engineer</span>
                                    <span className="font-mono text-[11px] text-white/70">Malang, ID</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col justify-end lg:col-span-6 lg:col-start-7">
                        <div className="mf-stats grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
                            {stats.map((stat, i) => (
                                <div key={stat.label} data-speed={String(0.3 + i * 0.25)}>
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
                            Software engineer at PT Universal Big Data and graduate of Universitas Negeri Malang. Most
                            of my week goes to two things: building web systems and teaching students to build them.
                        </p>

                        <Link
                            href="/about"
                            className="group mt-10 inline-flex w-max items-center gap-4 font-wide text-lg font-extrabold uppercase tracking-[-0.01em]"
                        >
                            <span className="relative">
                                Read the story
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
