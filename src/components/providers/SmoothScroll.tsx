'use client';

import Lenis from 'lenis';
import { usePathname } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

let lenisInstance: Lenis | null = null;

/** Access the active Lenis instance (null when smooth scroll is disabled). */
export function getLenis() {
    return lenisInstance;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1 });
        lenisInstance = lenis;
        lenis.on('scroll', ScrollTrigger.update);

        const tick = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(tick);
            lenis.destroy();
            lenisInstance = null;
        };
    }, []);

    // Recalculate pin/scrub positions once fonts and images have settled.
    useEffect(() => {
        const refresh = () => ScrollTrigger.refresh();
        window.addEventListener('load', refresh);
        document.fonts?.ready.then(refresh).catch(() => undefined);
        return () => window.removeEventListener('load', refresh);
    }, []);

    // New route: jump to top and re-measure after the page has painted.
    useEffect(() => {
        lenisInstance?.scrollTo(0, { immediate: true, force: true });
        const id = window.setTimeout(() => ScrollTrigger.refresh(), 500);
        return () => window.clearTimeout(id);
    }, [pathname]);

    return <>{children}</>;
}
