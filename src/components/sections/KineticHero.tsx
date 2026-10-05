'use client';

import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import { useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { useLazyGSAP } from '@/hooks/useLazyGSAP';
import { MOTION_OK } from '@/lib/gsap';
import { cn } from '@/lib/utils';

const HeroParticles = dynamic(() => import('@/components/three/HeroParticles'), { ssr: false });

interface KineticHeroProps {
    /** Two display lines: the first sits left, the second right with the accent full stop. */
    lines: [string, string];
    /** Full heading for assistive tech; the split characters are hidden from it. */
    srTitle: string;
    pill: string;
    /** Live pill gets the pulsing accent dot, otherwise a muted dot. */
    pillLive?: boolean;
    meta?: string;
    kicker?: string;
    intro?: ReactNode;
    actions?: ReactNode;
    /** Particle count multiplier; inner pages use a lighter field than home. */
    density?: number;
}

// Wide caps run about 0.78em per character; shrink long lines so the longest one fits the viewport.
function displaySize(lines: [string, string]) {
    const longest = Math.max(...lines.map((l) => l.length + 1));
    const vw = Math.min(12, 86 / (longest * 0.78));
    return `clamp(2.25rem, ${vw.toFixed(2)}vw, 14rem)`;
}

function Chars({ text, accentStop, offset = 0 }: { text: string; accentStop?: boolean; offset?: number }) {
    const words = text.split(' ');
    let index = offset;
    // Each character carries its stagger index for the CSS entrance.
    const char = (ch: string, key: string | number, className = '') => (
        <span key={key} className={cn('hero-anim hero-char inline-block', className)} style={{ '--ci': index++ } as CSSProperties}>
            {ch}
        </span>
    );
    return (
        <>
            {words.map((word, w) => (
                <span key={w} className={cn('inline-flex', w < words.length - 1 && 'mr-[0.28em]')}>
                    {Array.from(word).map((ch, i) => char(ch, i))}
                    {accentStop && w === words.length - 1 && char('.', 'stop', 'text-ink-accent-ink')}
                </span>
            ))}
        </>
    );
}

/**
 * The home hero's motion language, shared by every page: particle field, split display type
 * revealed per character, then pinned on scroll while the lines tear apart and the field collapses.
 */
export function KineticHero({
    lines,
    srTitle,
    pill,
    pillLive = false,
    meta,
    kicker,
    intro,
    actions,
    density = 1,
}: KineticHeroProps) {
    const root = useRef<HTMLElement>(null);
    const progressRef = useRef(0);
    // Particle zoom (entrance x scroll), tweened by GSAP and applied inside the WebGL scene, never as a CSS transform on the canvas.
    const zoomRef = useRef({ intro: 0.85, scroll: 1 });
    const [canvasActive, setCanvasActive] = useState(true);
    const [reduceMotion, setReduceMotion] = useState(false);
    const { resolvedTheme } = useTheme();
    const isLight = resolvedTheme === 'light';
    // Light theme: dark ink points with a deep lime accent; dark theme: pale points with the neon accent.
    const particleColor = isLight ? '#1a1a17' : '#f2f2ee';
    const particleAccent = isLight ? '#4d7c0f' : '#c8ff3d';
    const [first, second] = lines;
    const secondText = second.replace(/\.$/, '');

    useLazyGSAP(
        ({ gsap }) => {
            const mm = gsap.matchMedia();

            mm.add({ motion: MOTION_OK, reduce: '(prefers-reduced-motion: reduce)' }, (ctx) => {
                const { motion } = ctx.conditions as { motion: boolean; reduce: boolean };
                setReduceMotion(!motion);
                if (!motion) return;

                // The entrance is pure CSS (see .hero-anim in globals.css) so it costs no main-thread work at hydration.
                // Scroll: pin and tear the lines apart while the particles collapse into terrain.
                gsap.timeline({
                    defaults: { ease: 'none' },
                    scrollTrigger: {
                        trigger: root.current,
                        start: 'top top',
                        end: '+=110%',
                        pin: true,
                        anticipatePin: 1,
                        scrub: 1,
                        onUpdate: (self) => {
                            progressRef.current = self.progress;
                        },
                        // Fully faded at the end of the pin: stop the WebGL loop, resume when scrolling back.
                        onLeave: () => setCanvasActive(false),
                        onEnterBack: () => setCanvasActive(true),
                    },
                })
                    .to('.hero-line-1', { xPercent: -28 }, 0)
                    .to('.hero-line-2', { xPercent: 22 }, 0)
                    .to('.hero-title', { scale: 1.12, yPercent: -12 }, 0)
                    .to('.hero-meta', { yPercent: -120, autoAlpha: 0 }, 0)
                    .to('.hero-bottom', { yPercent: -60, autoAlpha: 0 }, 0)
                    .fromTo(zoomRef.current, { scroll: 1 }, { scroll: 1.35, immediateRender: false }, 0)
                    .fromTo(
                        ['.hero-canvas', '.hero-title'],
                        { autoAlpha: 1 },
                        { autoAlpha: 0, immediateRender: false },
                        0.55
                    );
            });

            return () => mm.revert();
        },
        root,
        { eager: true }
    );

    return (
        <section
            ref={root}
            className="relative isolate flex h-[100svh] min-h-[620px] flex-col overflow-hidden text-ink-fg"
        >
            {/* WebGL particle field */}
            <div className="hero-canvas pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
                <div className="absolute inset-0">
                    <HeroParticles
                        progressRef={progressRef}
                        zoomRef={zoomRef}
                        color={particleColor}
                        accent={particleAccent}
                        glow={!isLight}
                        active={canvasActive}
                        reduceMotion={reduceMotion}
                        density={density}
                    />
                </div>
            </div>
            {/* Soft edge vignette: keeps type legible over the particles while the site grid still shows through. */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_55%,color-mix(in_srgb,var(--ink-bg)_60%,transparent)_100%)]"
            />

            <div className="relative flex flex-1 flex-col justify-between px-4 pb-6 pt-24 sm:px-6 md:pb-10 lg:px-10">
                <div className="hero-meta flex flex-wrap items-center justify-between gap-3">
                    <span style={{ '--fi': 0 } as CSSProperties} className="hero-anim hero-fade glass-pill inline-flex h-9 items-center gap-2.5 rounded-full pl-3 pr-4 text-xs font-medium text-ink-fg/80">
                        {pillLive ? (
                            <span className="relative flex h-2 w-2" aria-hidden="true">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-ink-accent opacity-70 motion-safe:animate-ping motion-safe:[animation-iteration-count:4]" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-ink-accent" />
                            </span>
                        ) : (
                            <span className="h-2 w-2 rounded-full bg-ink-accent-ink" aria-hidden="true" />
                        )}
                        {pill}
                    </span>
                    {meta && <span style={{ '--fi': 1 } as CSSProperties} className="hero-anim hero-fade label hidden text-ink-muted sm:block">{meta}</span>}
                </div>

                <h1
                    className="hero-title relative my-auto max-w-full overflow-hidden select-none font-wide font-extrabold uppercase leading-[0.82] tracking-[-0.03em]"
                    style={{ fontSize: displaySize(lines) }}
                >
                    <span className="sr-only">{srTitle}</span>
                    <span aria-hidden="true" className="hero-line-1 block overflow-hidden pb-[0.04em]">
                        <span className="flex flex-wrap">
                            <Chars text={first} />
                        </span>
                    </span>
                    <span aria-hidden="true" className="hero-line-2 block overflow-hidden pb-[0.04em] text-right">
                        <span className="inline-flex flex-wrap justify-end">
                            <Chars text={secondText} accentStop offset={first.replace(/ /g, '').length} />
                        </span>
                    </span>
                </h1>

                <div className="hero-bottom grid grid-cols-1 items-end gap-6 md:grid-cols-12">
                    <div className="md:col-span-6 lg:col-span-5">
                        {kicker && <p style={{ '--fi': 2 } as CSSProperties} className="hero-anim hero-fade label text-ink-fg">{kicker}</p>}
                        {intro && (
                            // Not part of the entrance fade: this paragraph is the LCP element and must paint immediately.
                            <p className="mt-3 max-w-[44ch] text-base leading-relaxed text-ink-muted md:text-lg">
                                {intro}
                            </p>
                        )}
                    </div>
                    {actions && (
                        <div style={{ '--fi': 3 } as CSSProperties} className="hero-anim hero-fade flex flex-wrap items-center gap-3 md:col-span-6 md:justify-end lg:col-span-7">
                            {actions}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
