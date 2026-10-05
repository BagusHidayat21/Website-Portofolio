'use client';

import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import { useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { useLazyGSAP } from '@/hooks/useLazyGSAP';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { MOTION_OK } from '@/lib/motion';
import { cn } from '@/lib/utils';

const HeroParticles = dynamic(() => import('./HeroParticles'), { ssr: false });

const PARTICLES = {
    light: { color: '#1a1a17', accent: '#4d7c0f' },
    dark: { color: '#f2f2ee', accent: '#c8ff3d' },
} as const;

interface KineticHeroProps {
    /** First line sits left, second line right with the accent full stop. */
    lines: [string, string];
    /** Full heading for assistive tech; the split characters are hidden from it. */
    srTitle: string;
    pill: string;
    pillLive?: boolean;
    meta?: string;
    kicker?: string;
    intro?: ReactNode;
    actions?: ReactNode;
    /** Particle count multiplier; inner pages use a lighter field than home. */
    density?: number;
}

// Wide caps run about 0.78em per character; shrink long lines so the longest fits the viewport.
function displaySize(lines: [string, string]) {
    const longest = Math.max(...lines.map((line) => line.length + 1));
    const vw = Math.min(12, 86 / (longest * 0.78));
    return `clamp(2.25rem, ${vw.toFixed(2)}vw, 14rem)`;
}

function SplitLine({ text, startIndex, accentStop = false }: { text: string; startIndex: number; accentStop?: boolean }) {
    const words = text.split(' ');
    const offsets = words.map((_, w) => startIndex + words.slice(0, w).join('').length);
    const glyph = (ch: string, index: number, className?: string) => (
        <span key={index} className={cn('hero-anim hero-char inline-block', className)} style={{ '--ci': index } as CSSProperties}>
            {ch}
        </span>
    );

    return words.map((word, w) => {
        const start = offsets[w] ?? startIndex;
        const isLast = w === words.length - 1;
        return (
            <span key={w} className={cn('inline-flex', !isLast && 'mr-[0.28em]')}>
                {Array.from(word, (ch, i) => glyph(ch, start + i))}
                {accentStop && isLast ? glyph('.', start + word.length, 'text-ink-accent-ink') : null}
            </span>
        );
    });
}

const fade = (index: number) => ({ '--fi': index }) as CSSProperties;

/** Particle field and split display type; pinned on scroll while the lines tear apart and the field collapses. */
export function KineticHero({ lines, srTitle, pill, pillLive = false, meta, kicker, intro, actions, density = 1 }: KineticHeroProps) {
    const root = useRef<HTMLElement>(null);
    // Our own pin spacer: GSAP otherwise wraps the section in a new div, and that DOM move restarts the CSS entrance.
    const spacer = useRef<HTMLDivElement>(null);
    const progressRef = useRef(0);
    // Entrance x scroll zoom, applied inside the WebGL scene; a CSS transform would make the canvas resize.
    const zoomRef = useRef({ intro: 0.85, scroll: 1 });
    const [canvasActive, setCanvasActive] = useState(true);
    const reduceMotion = !useMediaQuery(MOTION_OK, true);
    const { resolvedTheme } = useTheme();
    const isLight = resolvedTheme === 'light';
    const [first, second] = lines;

    useLazyGSAP(
        ({ gsap }) => {
            const mm = gsap.matchMedia();
            mm.add(MOTION_OK, () => {
                gsap.timeline({
                    defaults: { ease: 'none' },
                    scrollTrigger: {
                        trigger: root.current,
                        start: 'top top',
                        end: '+=110%',
                        pin: true,
                        pinSpacer: spacer.current,
                        anticipatePin: 1,
                        scrub: 1,
                        onUpdate: (self) => {
                            progressRef.current = self.progress;
                        },
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
                    .fromTo(['.hero-canvas', '.hero-title'], { autoAlpha: 1 }, { autoAlpha: 0, immediateRender: false }, 0.55);
            });
            return () => mm.revert();
        },
        root,
        { eager: true }
    );

    return (
        <div ref={spacer} className="!w-full !max-w-none">
            <section ref={root} className="relative isolate flex h-svh min-h-[620px] !w-full !max-w-none shrink-0 flex-col overflow-hidden text-ink-fg">
                <div aria-hidden="true" className="hero-canvas pointer-events-none absolute inset-0 -z-10">
                    <HeroParticles
                        progressRef={progressRef}
                        zoomRef={zoomRef}
                        {...PARTICLES[isLight ? 'light' : 'dark']}
                        glow={!isLight}
                        active={canvasActive}
                        reduceMotion={reduceMotion}
                        density={density}
                    />
                </div>
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_55%,color-mix(in_srgb,var(--ink-bg)_60%,transparent)_100%)]"
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-[45%] -translate-y-1/2 bg-[radial-gradient(ellipse_70%_50%_at_center,color-mix(in_srgb,var(--ink-bg)_70%,transparent),transparent_75%)] md:bg-[radial-gradient(ellipse_55%_45%_at_center,color-mix(in_srgb,var(--ink-bg)_45%,transparent),transparent_75%)]"
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[55%] bg-[linear-gradient(to_top,var(--ink-bg)_15%,color-mix(in_srgb,var(--ink-bg)_80%,transparent)_45%,transparent)] md:h-[40%] md:bg-[linear-gradient(to_top,color-mix(in_srgb,var(--ink-bg)_85%,transparent),transparent)]"
                />

                <div className="relative flex flex-1 flex-col justify-between px-4 pb-6 pt-24 sm:px-6 md:pb-10 lg:px-10">
                    <div className="hero-meta flex flex-wrap items-center justify-between gap-3">
                        <span style={fade(0)} className="hero-anim hero-fade glass-pill inline-flex h-9 items-center gap-2.5 rounded-full pl-3 pr-4 text-xs font-medium text-ink-fg/80">
                            {pillLive ? (
                                <span aria-hidden="true" className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full rounded-full bg-ink-accent opacity-70 motion-safe:animate-ping motion-safe:[animation-iteration-count:4]" />
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-ink-accent" />
                                </span>
                            ) : (
                                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-ink-accent-ink" />
                            )}
                            {pill}
                        </span>
                        {meta ? (
                            <span style={fade(1)} className="hero-anim hero-fade label hidden text-ink-muted sm:block">
                                {meta}
                            </span>
                        ) : null}
                    </div>

                    <h1
                        className="hero-title relative my-auto max-w-full select-none overflow-hidden font-wide uppercase leading-[0.82] tracking-[-0.03em]"
                        style={{ fontSize: displaySize(lines) }}
                    >
                        <span className="sr-only">{srTitle}</span>
                        <span aria-hidden="true" className="hero-line-1 block overflow-hidden pb-[0.04em]">
                            <span className="flex flex-wrap">
                                <SplitLine text={first} startIndex={0} />
                            </span>
                        </span>
                        <span aria-hidden="true" className="hero-line-2 block overflow-hidden pb-[0.04em] text-right">
                            <span className="inline-flex flex-wrap justify-end">
                                <SplitLine text={second.replace(/\.$/, '')} startIndex={first.replaceAll(' ', '').length} accentStop />
                            </span>
                        </span>
                    </h1>

                    <div className="hero-bottom grid grid-cols-1 items-end gap-6 md:grid-cols-12">
                        <div className="md:col-span-6 lg:col-span-5">
                            {kicker ? (
                                <p style={fade(2)} className="hero-anim hero-fade label text-ink-fg">
                                    {kicker}
                                </p>
                            ) : null}
                            {/* The LCP element: deliberately outside the entrance fade so it paints immediately. */}
                            {intro ? <p className="mt-3 max-w-[44ch] text-base leading-relaxed text-ink-muted md:text-lg">{intro}</p> : null}
                        </div>
                        {actions ? (
                            <div style={fade(3)} className="hero-anim hero-fade flex flex-wrap items-center gap-3 md:col-span-6 md:justify-end lg:col-span-7">
                                {actions}
                            </div>
                        ) : null}
                    </div>
                </div>
            </section>
        </div>
    );
}
