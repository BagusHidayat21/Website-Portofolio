// Floating button to smoothly scroll the viewport back to the top of the page.
'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { getLenis } from '@/components/providers/SmoothScroll';
import { cn } from '@/lib/utils';

export function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            const next = window.scrollY > 400;
            setIsVisible((prev) => (prev === next ? prev : next));
        };

        window.addEventListener('scroll', toggleVisibility, { passive: true });
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        const lenis = getLenis();
        if (lenis) lenis.scrollTo(0);
        else window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            aria-hidden={!isVisible}
            tabIndex={isVisible ? 0 : -1}
            className={cn(
                'fixed bottom-6 right-24 z-40 hidden items-center gap-1.5 rounded-full border border-ink-line bg-ink-bg/90 px-3.5 py-2 font-mono text-xs font-semibold uppercase text-ink-muted shadow-md transition-[opacity,transform,color,border-color] duration-200 hover:border-ink-accent-ink hover:text-ink-accent-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-accent-ink motion-reduce:transition-none sm:flex',
                isVisible ? 'scale-100 opacity-100' : 'pointer-events-none scale-90 opacity-0'
            )}
        >
            <ArrowUp className="h-3.5 w-3.5" />
            <span>Top</span>
        </button>
    );
}
