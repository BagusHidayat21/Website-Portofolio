'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

// Grain tile: fractal noise, tinted by the theme through the layer opacity.
const GRAIN =
    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/**
 * Site-wide atmosphere behind every page: measured grid with crosshair marks,
 * two drifting light pools and film grain. Fixed, decorative, transform-only motion.
 */
export function Backdrop() {
    const reduceMotion = useReducedMotion();
    const { scrollYProgress } = useScroll();
    const gridY = useTransform(scrollYProgress, [0, 1], ['0vh', '-16vh']);
    const glowY = useTransform(scrollYProgress, [0, 1], ['0vh', '70vh']);
    const glowX = useTransform(scrollYProgress, [0, 0.5, 1], ['0vw', '-28vw', '6vw']);
    const glow2Y = useTransform(scrollYProgress, [0, 1], ['0vh', '-55vh']);

    return (
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
            {/* Light pools: plain radial gradients, no filter blur, so they stay cheap to composite. */}
            <motion.div
                style={reduceMotion ? undefined : { x: glowX, y: glowY }}
                className="absolute -right-[18vw] -top-[22vh] h-[80vh] w-[80vh] rounded-full bg-[radial-gradient(closest-side,var(--ink-glow),transparent)] will-change-transform"
            />
            <motion.div
                style={reduceMotion ? undefined : { y: glow2Y }}
                className="absolute -left-[22vw] top-[55vh] h-[90vh] w-[90vh] rounded-full bg-[radial-gradient(closest-side,var(--ink-glow-2),transparent)] will-change-transform"
            />

            {/* Measured grid, oversized so the scroll drift never exposes an edge. */}
            <motion.div
                style={reduceMotion ? undefined : { y: gridY }}
                className="backdrop-grid absolute inset-x-0 -top-[4vh] h-[124vh] will-change-transform"
            />

            {/* Film grain */}
            <div className="absolute inset-0 opacity-[var(--ink-grain)]" style={{ backgroundImage: GRAIN, backgroundSize: '200px 200px' }} />
        </div>
    );
}
