'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/** Marks itself `data-inview` while on screen, so CSS can pause offscreen animations. */
export function InView({ className, children }: { className?: string; children: ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(([entry]) => el.toggleAttribute('data-inview', Boolean(entry?.isIntersecting)));
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}
