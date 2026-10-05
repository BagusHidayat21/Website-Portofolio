'use client';

import { useRef } from 'react';
import { useLazyGSAP } from '@/hooks/useLazyGSAP';
import { DESKTOP_POINTER_MOTION } from '@/lib/motion';

const GRAIN =
    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/** Grid, light pools and grain behind every page; the drift costs a layer per plane, so phones stay static. */
export function Backdrop() {
    const root = useRef<HTMLDivElement>(null);

    useLazyGSAP(
        ({ gsap }) => {
            const mm = gsap.matchMedia();
            mm.add(DESKTOP_POINTER_MOTION, () => {
                const scrollTrigger = { start: 0, end: 'max', scrub: true };
                gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger })
                    .to('.bd-glow-1', { x: '-28vw', y: '35vh' })
                    .to('.bd-glow-1', { x: '6vw', y: '70vh' });
                gsap.to('.bd-glow-2', { y: '-55vh', ease: 'none', scrollTrigger });
                gsap.to('.bd-grid', { y: '-16vh', ease: 'none', scrollTrigger });
            });
            return () => mm.revert();
        },
        root,
        { eager: true }
    );

    return (
        <div ref={root} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
            <div className="bd-glow-1 absolute -right-[18vw] -top-[22vh] size-[80vh] rounded-full bg-[radial-gradient(closest-side,var(--ink-glow),transparent)]" />
            <div className="bd-glow-2 absolute -left-[22vw] top-[55vh] size-[90vh] rounded-full bg-[radial-gradient(closest-side,var(--ink-glow-2),transparent)]" />
            {/* Oversized so the drift never exposes an edge. */}
            <div className="bd-grid backdrop-grid absolute inset-x-0 -top-[4vh] h-[124vh]" />
            <div className="absolute inset-0 opacity-(--ink-grain)" style={{ backgroundImage: GRAIN, backgroundSize: '200px 200px' }} />
        </div>
    );
}
