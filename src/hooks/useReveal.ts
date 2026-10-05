'use client';

import { useEffect, type RefObject } from 'react';

/**
 * Reveals the items matching `selector` inside `scope` as they scroll into view, with CSS transitions
 * (see [data-reveal] in globals.css). One IntersectionObserver, no per-element tweens and no layout
 * thrash at hydration. Items entering together are staggered through a `--i` custom property.
 */
export function useReveal(scope: RefObject<HTMLElement | null>, selector = '[data-reveal]') {
    useEffect(() => {
        const root = scope.current;
        if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const items = Array.from(root.querySelectorAll<HTMLElement>(selector));
        if (items.length === 0) return;
        items.forEach((item) => item.setAttribute('data-reveal', ''));

        const observer = new IntersectionObserver(
            (entries) => {
                let order = 0;
                for (const entry of entries) {
                    if (!entry.isIntersecting) continue;
                    (entry.target as HTMLElement).style.setProperty('--i', String(order++));
                    entry.target.setAttribute('data-revealed', '');
                    observer.unobserve(entry.target);
                }
            },
            { rootMargin: '0px 0px -12% 0px' }
        );
        // Anything already on screen when armed stays visible instead of flashing out and back in.
        const viewport = window.innerHeight;
        for (const item of items) {
            const top = item.getBoundingClientRect().top;
            if (top < viewport) item.setAttribute('data-revealed', '');
            else observer.observe(item);
        }
        root.setAttribute('data-reveal-ready', '');

        return () => {
            observer.disconnect();
            root.removeAttribute('data-reveal-ready');
        };
    }, [scope, selector]);
}
