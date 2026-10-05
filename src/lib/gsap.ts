'use client';

import type { gsap as GsapCore } from 'gsap';
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger';

export interface GsapLib {
    gsap: typeof GsapCore;
    ScrollTrigger: typeof ScrollTriggerType;
}

let lib: GsapLib | null = null;
let pending: Promise<GsapLib> | null = null;

/** GSAP loads on demand after first paint so it never sits on the LCP path; all callers share one instance. */
export function loadGsap(): Promise<GsapLib> {
    if (lib) return Promise.resolve(lib);
    pending ??= Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([core, st]) => {
        const { gsap } = core;
        const { ScrollTrigger } = st;
        gsap.registerPlugin(ScrollTrigger);
        // ignoreMobileResize: address-bar resizes would re-pin and jump. No load refresh: scenes build lazily.
        ScrollTrigger.config({ ignoreMobileResize: true, autoRefreshEvents: 'visibilitychange,DOMContentLoaded,resize' });
        lib = { gsap, ScrollTrigger };
        return lib;
    });
    return pending;
}

export const getGsap = () => lib;
