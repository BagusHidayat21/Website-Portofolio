'use client';

import type Lenis from 'lenis';

let lenis: Lenis | null = null;

export const setLenis = (instance: Lenis | null) => {
    lenis = instance;
};

export const getLenis = () => lenis;

export function scrollToTop() {
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: 'smooth' });
}

/** Freezes page scrolling (overlays, menus); returns the release function. */
export function lockScroll() {
    const previous = document.body.style.overflow;
    lenis?.stop();
    document.body.style.overflow = 'hidden';
    return () => {
        document.body.style.overflow = previous;
        lenis?.start();
    };
}
