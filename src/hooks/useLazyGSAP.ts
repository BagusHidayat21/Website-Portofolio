'use client';

import { useEffect, type RefObject } from 'react';
import { loadGsap, type GsapLib } from '@/lib/gsap';

interface LazyGSAPOptions {
    /** Element that arms the setup when it nears the viewport; defaults to the scope itself. */
    target?: string;
    /** How far ahead of the viewport to arm, so the animated state is in place before it is seen. */
    rootMargin?: string;
    /** Run as soon as GSAP has loaded instead of waiting for the section to approach (above-the-fold scenes). */
    eager?: boolean;
    dependencies?: unknown[];
}

/**
 * Builds a section's GSAP scene lazily: GSAP itself is loaded on demand, and the scene is only set up
 * when the section is about one viewport away. Creating ScrollTriggers measures layout, and doing it for
 * every section during hydration was the main source of blocking time on phones.
 * Everything runs inside a gsap.context scoped to `scope`, reverted on unmount or dependency change.
 */
export function useLazyGSAP(
    setup: (lib: GsapLib) => void | (() => void),
    scope: RefObject<HTMLElement | null>,
    { target, rootMargin = '100% 0px', eager = false, dependencies = [] }: LazyGSAPOptions = {}
) {
    useEffect(() => {
        const root = scope.current;
        if (!root) return;
        let cancelled = false;
        let cleanup: void | (() => void);
        let context: ReturnType<GsapLib['gsap']['context']> | null = null;

        const run = () => {
            loadGsap().then((lib) => {
                if (cancelled) return;
                context = lib.gsap.context(() => {
                    cleanup = setup(lib);
                }, root);
            });
        };

        let observer: IntersectionObserver | null = null;
        if (eager) {
            run();
        } else {
            const el = (target && root.querySelector<HTMLElement>(target)) || root;
            observer = new IntersectionObserver(
                (entries) => {
                    if (!entries.some((e) => e.isIntersecting)) return;
                    observer?.disconnect();
                    run();
                },
                { rootMargin }
            );
            observer.observe(el);
        }

        return () => {
            cancelled = true;
            observer?.disconnect();
            if (typeof cleanup === 'function') cleanup();
            context?.revert();
        };
        // The setup closure is rebuilt each render; re-running is driven by `dependencies` only.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scope, target, rootMargin, eager, ...dependencies]);
}
