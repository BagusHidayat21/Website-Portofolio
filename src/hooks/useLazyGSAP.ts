'use client';

import { useEffect, useEffectEvent, type RefObject } from 'react';
import { loadGsap, type GsapLib } from '@/lib/gsap';

interface LazyGSAPOptions {
    /** Selector inside the scope that arms the scene; defaults to the scope. */
    target?: string;
    rootMargin?: string;
    /** Build as soon as GSAP loads (above-the-fold scenes). */
    eager?: boolean;
    /** Rebuild the scene when this changes. */
    key?: string | number;
}

/** Builds a scoped GSAP scene once the section is near; creating every ScrollTrigger at hydration blocked phones. */
export function useLazyGSAP(
    setup: (lib: GsapLib) => void | (() => void),
    scope: RefObject<HTMLElement | null>,
    { target, rootMargin = '100% 0px', eager = false, key }: LazyGSAPOptions = {}
) {
    const build = useEffectEvent(setup);

    useEffect(() => {
        const root = scope.current;
        if (!root) return;
        let cancelled = false;
        let cleanup: void | (() => void);
        let context: ReturnType<GsapLib['gsap']['context']> | undefined;

        const run = () =>
            loadGsap().then((lib) => {
                if (cancelled) return;
                context = lib.gsap.context(() => {
                    cleanup = build(lib);
                }, root);
            });

        let observer: IntersectionObserver | undefined;
        if (eager) {
            run();
        } else {
            observer = new IntersectionObserver(
                (entries) => {
                    if (!entries.some((e) => e.isIntersecting)) return;
                    observer?.disconnect();
                    run();
                },
                { rootMargin }
            );
            observer.observe((target && root.querySelector(target)) || root);
        }

        return () => {
            cancelled = true;
            observer?.disconnect();
            cleanup?.();
            context?.revert();
        };
    }, [scope, target, rootMargin, eager, key]);
}
