'use client';

import { Asterisk } from 'lucide-react';
import { Fragment, useRef } from 'react';
import { cn } from '@/lib/utils';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from '@/lib/gsap';

function Row({ items, className, outline }: { items: string[]; className?: string; outline?: boolean }) {
    // Two identical halves so the track can wrap seamlessly at -50%.
    const doubled = [...items, ...items];
    return (
        <div className={cn('flex w-max items-center will-change-transform', className)}>
            {doubled.map((item, i) => (
                <Fragment key={`${item}-${i}`}>
                    <span
                        className={cn(
                            'shrink-0 whitespace-nowrap px-6 font-wide text-[clamp(2.25rem,6vw,5.5rem)] font-extrabold uppercase leading-none tracking-[-0.02em] md:px-10',
                            outline && 'text-outline'
                        )}
                    >
                        {item}
                    </span>
                    <Asterisk className="h-8 w-8 shrink-0 md:h-12 md:w-12" strokeWidth={2.5} aria-hidden="true" />
                </Fragment>
            ))}
        </div>
    );
}

export function TechMarquee({ items }: { items: string[] }) {
    const root = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add(MOTION_OK, () => {
                const tracks = gsap.utils.toArray<HTMLElement>('.mq-track', root.current);
                const state = { dir: 1, boost: 0 };
                const offsets = tracks.map(() => 0);
                const skewers = tracks.map((t) => gsap.quickTo(t, 'skewX', { duration: 0.5, ease: 'power3' }));

                const st = ScrollTrigger.create({
                    trigger: root.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    onUpdate: (self) => {
                        const v = self.getVelocity();
                        state.dir = self.direction;
                        state.boost = Math.min(Math.abs(v) / 120, 14);
                        const skew = gsap.utils.clamp(-10, 10, v / -300);
                        skewers.forEach((s, i) => s(i % 2 === 0 ? skew : -skew));
                    },
                });

                const tick = (_t: number, delta: number) => {
                    const step = (0.06 + state.boost * 0.03) * delta;
                    tracks.forEach((track, i) => {
                        const half = track.scrollWidth / 2;
                        const sign = (i % 2 === 0 ? -1 : 1) * state.dir;
                        offsets[i] = gsap.utils.wrap(-half, 0, offsets[i] + sign * step);
                        gsap.set(track, { x: offsets[i] });
                    });
                    state.boost *= 0.92;
                };
                gsap.ticker.add(tick);

                // The whole tape drifts against the scroll for depth.
                gsap.fromTo(
                    '.mq-band',
                    { yPercent: 30 },
                    {
                        yPercent: -30,
                        ease: 'none',
                        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
                    }
                );

                return () => {
                    gsap.ticker.remove(tick);
                    st.kill();
                };
            });
            return () => mm.revert();
        },
        { scope: root }
    );

    if (items.length === 0) return null;

    return (
        <section
            ref={root}
            aria-label="Tech stack"
            className="relative max-w-[100vw] overflow-hidden py-12 sm:py-16 md:py-28"
        >
            <div className="mq-band relative overflow-hidden py-4 sm:py-6">
                {/* Back tape, outlined, crossing the other way. */}
                <div className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 rotate-[4deg] border-y border-ink-line bg-ink-bg-2 py-4 text-ink-fg/40 md:py-6">
                    <div className="mq-track">
                        <Row items={items} outline />
                    </div>
                </div>
                {/* Front tape, accent. */}
                <div className="relative -mx-[5%] -rotate-[3deg] bg-ink-accent py-4 text-ink-on-accent shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)] dark:shadow-[0_30px_60px_-30px_rgba(200,255,61,0.5)] md:py-6">
                    <div className="mq-track">
                        <Row items={items} />
                    </div>
                </div>
            </div>
        </section>
    );
}
