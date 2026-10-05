'use client';

import { ArrowUp } from 'lucide-react';
import { useScrolledPast } from '@/hooks/useScrolledPast';
import { scrollToTop } from '@/lib/scroll';
import { cn } from '@/lib/utils';

export function BackToTop() {
    const visible = useScrolledPast(400);
    return (
        <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            aria-hidden={!visible}
            tabIndex={visible ? 0 : -1}
            className={cn(
                'label fixed bottom-6 right-24 z-40 hidden items-center gap-1.5 rounded-full border border-ink-line bg-ink-bg/90 px-3.5 py-2 font-semibold text-ink-muted shadow-md transition-[opacity,transform,color,border-color] duration-200 hover:border-ink-accent-ink hover:text-ink-accent-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-accent-ink motion-reduce:transition-none sm:flex',
                visible ? 'scale-100 opacity-100' : 'pointer-events-none scale-90 opacity-0'
            )}
        >
            <ArrowUp className="h-3.5 w-3.5" />
            Top
        </button>
    );
}
