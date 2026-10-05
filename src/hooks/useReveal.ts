'use client';

import { useEffect, type RefObject } from 'react';
import { prefersReducedMotion } from '@/lib/motion';

/** Reveals `selector` matches in `scope` via CSS transitions ([data-reveal] in globals.css), staggered through `--i`. */
export function useReveal(scope: RefObject<HTMLElement | null>, selector = '[data-reveal]') {
    useEffect(() => {
        const root = scope.current;
        if (!root || prefersReducedMotion()) return;
        const items = Array.from(root.querySelectorAll<HTMLElement>(selector));
        if (items.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                let order = 0;
                for (const entry of entries) {
                    if (!entry.isIntersecting) continue;
                    const item = entry.target as HTMLElement;
                    item.style.setProperty('--i', String(order++));
                    item.toggleAttribute('data-revealed', true);
                    observer.unobserve(item);
                }
            },
            { rootMargin: '0px 0px -12% 0px' }
        );

        // Items already on screen stay visible instead of flashing out and back in.
        const viewport = window.innerHeight;
        for (const item of items) {
            item.toggleAttribute('data-reveal', true);
            if (item.getBoundingClientRect().top < viewport) item.toggleAttribute('data-revealed', true);
            else observer.observe(item);
        }
        root.toggleAttribute('data-reveal-ready', true);

        return () => {
            observer.disconnect();
            root.removeAttribute('data-reveal-ready');
        };
    }, [scope, selector]);
}
