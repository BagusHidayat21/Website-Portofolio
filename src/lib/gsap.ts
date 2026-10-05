'use client';

import type { gsap as GsapCore } from 'gsap';
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger';

export type Gsap = typeof GsapCore;
export type ScrollTriggerStatic = typeof ScrollTriggerType;
export interface GsapLib {
    gsap: Gsap;
    ScrollTrigger: ScrollTriggerStatic;
}

export const MOTION_OK = '(prefers-reduced-motion: no-preference)';
export const DESKTOP_MOTION = '(min-width: 1024px) and (prefers-reduced-motion: no-preference)';

let lib: GsapLib | null = null;
let pending: Promise<GsapLib> | null = null;

/**
 * GSAP and ScrollTrigger load on demand, after first paint, so ~50 KB of animation code never sits
 * in front of the LCP. Every caller shares one promise and one registered instance.
 */
export function loadGsap(): Promise<GsapLib> {
    if (lib) return Promise.resolve(lib);
    if (!pending) {
        pending = Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([core, st]) => {
            const gsap = (core.gsap ?? core.default) as Gsap;
            const ScrollTrigger = st.ScrollTrigger as ScrollTriggerStatic;
            gsap.registerPlugin(ScrollTrigger);
            // Mobile address bar show/hide resizes the viewport; re-measuring pins on it causes visible jumps.
            // No refresh on window load: images sit in fixed-ratio boxes and below-fold scenes build lazily.
            ScrollTrigger.config({ ignoreMobileResize: true, autoRefreshEvents: 'visibilitychange,DOMContentLoaded,resize' });
            lib = { gsap, ScrollTrigger };
            return lib;
        });
    }
    return pending;
}

/** The loaded library, or null if it has not arrived yet (for event handlers that can skip a beat). */
export function getGsap(): GsapLib | null {
    return lib;
}

/**
 * Generic scroll parallax: every `[data-speed]` element inside `scope` drifts
 * vertically while it crosses the viewport. Positive speed moves against the
 * scroll (feels further away), negative moves with it (feels closer).
 */
export function applyParallax(gsap: Gsap, scope: Element | null) {
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
