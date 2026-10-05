'use client';

import { Asterisk } from 'lucide-react';
import { useRef } from 'react';
import { useLazyGSAP } from '@/hooks/useLazyGSAP';
import type { GsapLib } from '@/lib/gsap';
import { MOTION_OK } from '@/lib/motion';
import { cn } from '@/lib/utils';

function Tape({ items, outline = false }: { items: string[]; outline?: boolean }) {
    // Two identical halves let the track wrap seamlessly at -50%.
    return (
        <div className="mq-track flex w-max items-center">
            {[...items, ...items].map((item, i) => (
                <span key={`${item}-${i}`} className="flex shrink-0 items-center">
                    <span
                        className={cn(
                            'whitespace-nowrap px-6 font-wide text-[clamp(2.25rem,6vw,5.5rem)] uppercase leading-none tracking-[-0.02em] md:px-10',
                            outline && 'text-outline'
                        )}
                    >
                        {item}
                    </span>
                    <Asterisk aria-hidden="true" className="h-8 w-8 shrink-0 md:h-12 md:w-12" strokeWidth={2.5} />
                </span>
            ))}
        </div>
    );
}

/** Scroll-velocity marquee: tracks run in opposite directions, speed up and skew with scroll, settle at rest. */
function runTapes({ gsap, ScrollTrigger }: GsapLib, root: HTMLElement) {
    const tracks = gsap.utils.toArray<HTMLElement>('.mq-track', root);
    const setX = tracks.map((t) => gsap.quickSetter(t, 'x', 'px'));
    const setSkew = tracks.map((t) => gsap.quickTo(t, 'skewX', { duration: 0.5, ease: 'power3' }));
    const offsets = tracks.map(() => 0);
    // Half-widths are cached: reading scrollWidth every tick forced a reflow per frame.
    let halves = tracks.map((t) => t.scrollWidth / 2);
    const resizeObserver = new ResizeObserver(() => {
        halves = tracks.map((t) => t.scrollWidth / 2);
    });
    tracks.forEach((t) => resizeObserver.observe(t));

    let direction = 1;
    let boost = 0;
    let lastScroll = 0;
    let skewed = false;

    const trigger = ScrollTrigger.create({
        trigger: root,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
            const velocity = self.getVelocity();
            direction = self.direction;
            boost = Math.min(Math.abs(velocity) / 120, 14);
            const skew = gsap.utils.clamp(-10, 10, velocity / -300);
            setSkew.forEach((set, i) => set(i % 2 === 0 ? skew : -skew));
            lastScroll = performance.now();
            skewed = true;
        },
    });

    const tick = (_time: number, delta: number) => {
        if (!trigger.isActive) return;
        const step = (0.06 + boost * 0.03) * Math.min(delta, 50);
        tracks.forEach((_, i) => {
            const half = halves[i];
            if (!half) return;
            const sign = (i % 2 === 0 ? -1 : 1) * direction;
            offsets[i] = gsap.utils.wrap(-half, 0, (offsets[i] ?? 0) + sign * step);
            setX[i]?.(offsets[i]);
        });
        boost *= 0.92;
        // onUpdate only fires while scrolling, so settle the skew once it stops.
        if (skewed && performance.now() - lastScroll > 140) {
            setSkew.forEach((set) => set(0));
            skewed = false;
        }
    };
    gsap.ticker.add(tick);

    gsap.fromTo(
        '.mq-band',
        { yPercent: 30 },
        { yPercent: -30, ease: 'none', scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: true } }
    );

    return () => {
        gsap.ticker.remove(tick);
        resizeObserver.disconnect();
        trigger.kill();
    };
}

export function TechMarquee({ items }: { items: string[] }) {
    const root = useRef<HTMLElement>(null);

    useLazyGSAP((lib) => {
        const mm = lib.gsap.matchMedia();
        mm.add(MOTION_OK, () => (root.current ? runTapes(lib, root.current) : undefined));
        return () => mm.revert();
    }, root);

    if (items.length === 0) return null;

    return (
        <section ref={root} aria-label="Tech stack" className="relative max-w-[100vw] overflow-x-clip py-12 sm:py-16 md:py-28">
            <div className="mq-band relative py-4 sm:py-6">
                <div aria-hidden="true" className="absolute inset-x-[-10%] top-1/2 -translate-y-1/2 rotate-[4deg] border-y border-ink-line bg-ink-bg-2 py-4 md:py-6">
                    <Tape items={items} outline />
                </div>
                <div className="relative -mx-[10%] -rotate-[3deg] bg-ink-accent py-4 text-ink-on-accent shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)] md:py-6 dark:shadow-[0_30px_60px_-30px_rgba(200,255,61,0.5)]">
                    <Tape items={items} />
                </div>
            </div>
        </section>
    );
}
