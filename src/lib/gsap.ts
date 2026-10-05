'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
    // Mobile address bar show/hide resizes the viewport; re-measuring pins on it causes visible jumps.
    ScrollTrigger.config({ ignoreMobileResize: true });
}

export const MOTION_OK = '(prefers-reduced-motion: no-preference)';
export const DESKTOP_MOTION = '(min-width: 1024px) and (prefers-reduced-motion: no-preference)';

/**
 * Generic scroll parallax: every `[data-speed]` element inside `scope` drifts
 * vertically while it crosses the viewport. Positive speed moves against the
 * scroll (feels further away), negative moves with it (feels closer).
 */
export function applyParallax(scope: Element | null) {
    if (!scope) return;
    gsap.utils.toArray<HTMLElement>('[data-speed]', scope).forEach((el) => {
        const speed = parseFloat(el.dataset.speed ?? '0');
        if (!speed) return;
        gsap.fromTo(
            el,
            { yPercent: -speed * 10 },
            {
                yPercent: speed * 10,
                ease: 'none',
                scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
            }
        );
    });
}

export { gsap, ScrollTrigger, useGSAP };
