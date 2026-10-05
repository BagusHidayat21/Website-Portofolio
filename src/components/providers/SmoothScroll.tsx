'use client';

import type Lenis from 'lenis';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, type ReactNode } from 'react';
import { getGsap, loadGsap } from '@/lib/gsap';

let lenisInstance: Lenis | null = null;

/** Access the active Lenis instance (null when smooth scroll is disabled or still loading). */
export function getLenis() {
    return lenisInstance;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    // Lenis and GSAP load after first paint; until then the page scrolls natively, which is identical at rest.
    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        let cancelled = false;
        let teardown = () => {};

        Promise.all([import('lenis'), loadGsap()]).then(([{ default: LenisCtor }, { gsap, ScrollTrigger }]) => {
            if (cancelled) return;
            const lenis = new LenisCtor({ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1 });
            lenisInstance = lenis;
            lenis.on('scroll', ScrollTrigger.update);

            const tick = (time: number) => lenis.raf(time * 1000);
            gsap.ticker.add(tick);
            gsap.ticker.lagSmoothing(0);

            teardown = () => {
                gsap.ticker.remove(tick);
                lenis.destroy();
                lenisInstance = null;
            };
        });

        return () => {
            cancelled = true;
            teardown();
        };
    }, []);

    // Client-side navigation: jump to top and re-measure after the new page has painted. Skipped on first load.
    const firstRoute = useRef(true);
    useEffect(() => {
        if (firstRoute.current) {
            firstRoute.current = false;
            return;
        }
        lenisInstance?.scrollTo(0, { immediate: true, force: true });
        const id = window.setTimeout(() => getGsap()?.ScrollTrigger.refresh(), 500);
        return () => window.clearTimeout(id);
    }, [pathname]);

    return <>{children}</>;
}
