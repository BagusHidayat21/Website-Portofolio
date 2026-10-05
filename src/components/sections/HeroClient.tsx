'use client';

import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useRef, useState } from 'react';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from '@/lib/gsap';

const HeroParticles = dynamic(() => import('@/components/three/HeroParticles'), { ssr: false });

interface HeroClientProps {
    name: string;
    firstName: string;
    lastName: string;
    tagline: string;
    intro: string;
    email: string;
    location: string;
    isAvailableForWork: boolean;
    currentCompany?: string;
}

export function HeroClient({
    name,
    firstName,
    lastName,
    tagline,
    intro,
    email,
    location,
    isAvailableForWork,
    currentCompany,
}: HeroClientProps) {
    const root = useRef<HTMLElement>(null);
    const progressRef = useRef(0);
    const [canvasActive, setCanvasActive] = useState(true);
    const [reduceMotion, setReduceMotion] = useState(false);
    const { resolvedTheme } = useTheme();
    const particleColor = resolvedTheme === 'light' ? '#0b0b0c' : '#f2f2ee';

    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            mm.add({ motion: MOTION_OK, reduce: '(prefers-reduced-motion: reduce)' }, (ctx) => {
                const { motion } = ctx.conditions as { motion: boolean; reduce: boolean };
                setReduceMotion(!motion);
                if (!motion) return;

                // Entrance: wait for the first-visit splash screen.
                let splashPending = false;
                try {
                    splashPending = !sessionStorage.getItem('splashShown');
                } catch {
                    splashPending = false;
                }
                const delay = splashPending ? 2.1 : 0.15;

                gsap.set('.hero-char', { yPercent: 115 });
                gsap.set('.hero-fade', { autoAlpha: 0, y: 24 });
                gsap.set('.hero-canvas', { autoAlpha: 0, scale: 0.85 });

                gsap.timeline({ delay, defaults: { ease: 'expo.out' } })
                    .to('.hero-canvas', { autoAlpha: 1, scale: 1, duration: 2.2 }, 0)
                    .to('.hero-char', { yPercent: 0, duration: 1.4, stagger: 0.045 }, 0.1)
                    .to('.hero-fade', { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.08 }, 0.6);

                // Scroll: pin and tear the name apart while the particles collapse into terrain.
                gsap.timeline({
                    defaults: { ease: 'none' },
                    scrollTrigger: {
                        trigger: root.current,
                        start: 'top top',
                        end: '+=110%',
                        pin: true,
                        scrub: 1,
                        onUpdate: (self) => {
                            progressRef.current = self.progress;
                        },
                    },
                })
                    .to('.hero-line-1', { xPercent: -28 }, 0)
                    .to('.hero-line-2', { xPercent: 22 }, 0)
                    .to('.hero-title', { scale: 1.12, yPercent: -12 }, 0)
                    .to('.hero-meta', { yPercent: -120, autoAlpha: 0 }, 0)
                    .to('.hero-bottom', { yPercent: -60, autoAlpha: 0 }, 0)
                    .to('.hero-canvas', { scale: 1.35 }, 0)
                    .to('.hero-veil', { autoAlpha: 1 }, 0.55);

                // Pause the WebGL loop once the hero is fully scrolled past.
                ScrollTrigger.create({
                    trigger: root.current,
                    start: 'top top',
                    end: () => `+=${window.innerHeight * 2.2}`,
                    onLeave: () => setCanvasActive(false),
                    onEnterBack: () => setCanvasActive(true),
                });
            });

            return () => mm.revert();
        },
        { scope: root }
    );

    const status = isAvailableForWork
        ? 'Available for work'
        : currentCompany
            ? `Currently at ${currentCompany}`
            : 'Currently employed';

    return (
        <section
            ref={root}
            className="relative isolate flex h-[100dvh] min-h-[620px] flex-col overflow-hidden bg-ink-bg text-ink-fg"
        >
            {/* WebGL particle field */}
            <div className="hero-canvas pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
                <HeroParticles
                    progressRef={progressRef}
                    eventSource={root}
                    color={particleColor}
                    active={canvasActive}
                    reduceMotion={reduceMotion}
                />
            </div>
            {/* Edge vignette keeps the type legible over the particles. */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--ink-bg)_88%)]"
            />
            <div
                aria-hidden="true"
                className="hero-veil pointer-events-none invisible absolute inset-0 z-20 bg-ink-bg opacity-0"
            />

            <div className="relative flex flex-1 flex-col justify-between px-4 pb-6 pt-24 sm:px-6 md:pb-10 lg:px-10">
                <div className="hero-meta flex flex-wrap items-center justify-between gap-3">
                    <span className="hero-fade glass-pill inline-flex h-9 items-center gap-2.5 rounded-full pl-3 pr-4 text-xs font-medium text-ink-fg/80">
                        {isAvailableForWork ? (
                            <span className="relative flex h-2 w-2" aria-hidden="true">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-ink-accent opacity-70 motion-safe:animate-ping" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-ink-accent" />
                            </span>
                        ) : (
                            <span className="h-2 w-2 rounded-full bg-ink-muted" aria-hidden="true" />
                        )}
                        {status}
                    </span>
                    <span className="hero-fade hidden font-mono text-xs text-ink-muted sm:block">{location}</span>
                </div>

                <h1 className="hero-title relative my-auto select-none font-wide font-extrabold uppercase leading-[0.8] tracking-[-0.03em] will-change-transform">
                    <span className="sr-only">
                        {name}, {tagline}
                    </span>
                    <span
                        aria-hidden="true"
                        className="hero-line-1 block overflow-hidden pb-[0.04em] text-[clamp(3.6rem,15vw,17rem)]"
                    >
                        <span className="flex">
                            {Array.from(firstName).map((ch, i) => (
                                <span key={i} className="hero-char inline-block">
                                    {ch}
                                </span>
                            ))}
                        </span>
                    </span>
                    <span
                        aria-hidden="true"
                        className="hero-line-2 block overflow-hidden pb-[0.04em] text-right text-[clamp(3.6rem,15vw,17rem)]"
                    >
                        <span className="inline-flex">
                            {Array.from(lastName).map((ch, i) => (
                                <span key={i} className="hero-char inline-block">
                                    {ch}
                                </span>
                            ))}
                            <span className="hero-char inline-block text-ink-accent">.</span>
                        </span>
                    </span>
                </h1>

                <div className="hero-bottom grid grid-cols-1 items-end gap-6 md:grid-cols-12">
                    <div className="md:col-span-6 lg:col-span-5">
                        <p className="hero-fade font-wide text-sm font-semibold uppercase tracking-[0.02em] text-ink-fg">
                            {tagline}
                        </p>
                        <p className="hero-fade mt-3 max-w-[44ch] text-base leading-relaxed text-ink-muted md:text-lg">
                            {intro}
                        </p>
                    </div>
                    <div className="hero-fade flex flex-wrap items-center gap-3 md:col-span-6 md:justify-end lg:col-span-7">
                        <MagneticButton href="/projects" size="lg" icon={ArrowRight}>
                            View Work
                        </MagneticButton>
                        <MagneticButton
                            href={`mailto:${email}`}
                            size="lg"
                            variant="secondary"
                            icon={ArrowUpRight}
                            iconDirection="diagonal"
                        >
                            Hire Me
                        </MagneticButton>
                    </div>
                </div>
            </div>
        </section>
    );
}
