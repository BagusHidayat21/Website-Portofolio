'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { getGsap, loadGsap } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/motion';
import { getLenis, setLenis } from '@/lib/scroll';

/** Lenis smooth scrolling driven by the GSAP ticker; both load after first paint (native scroll until then). */
export function SmoothScroll() {
    const pathname = usePathname();
    const firstRoute = useRef(true);

    useEffect(() => {
        if (prefersReducedMotion()) return;
        let cancelled = false;
        let teardown = () => {};

        Promise.all([import('lenis'), loadGsap()]).then(([{ default: Lenis }, { gsap, ScrollTrigger }]) => {
            if (cancelled) return;
            const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
            const tick = (time: number) => lenis.raf(time * 1000);
            lenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.add(tick);
            gsap.ticker.lagSmoothing(0);
            setLenis(lenis);

            teardown = () => {
                gsap.ticker.remove(tick);
                lenis.destroy();
                setLenis(null);
            };
        });

        return () => {
            cancelled = true;
            teardown();
        };
    }, []);

    useEffect(() => {
        if (firstRoute.current) {
            firstRoute.current = false;
            return;
        }
        getLenis()?.scrollTo(0, { immediate: true, force: true });
        const timer = setTimeout(() => getGsap()?.ScrollTrigger.refresh(), 500);
        return () => clearTimeout(timer);
    }, [pathname]);

    return null;
}
