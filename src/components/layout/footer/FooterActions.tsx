'use client';

import { ArrowUp, Check, Copy } from 'lucide-react';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { scrollToTop } from '@/lib/scroll';

export function CopyEmailPill({ email }: { email: string }) {
    const { copied, copy } = useCopyToClipboard(2200);
    return (
        <button
            type="button"
            onClick={() => copy(email)}
            className="group flex h-12 max-w-[calc(100%-4.25rem)] items-center gap-2.5 rounded-full border border-ink-line bg-ink-fg/[0.04] px-4 text-xs font-medium transition-all duration-300 hover:border-ink-accent-ink hover:bg-ink-fg hover:text-ink-bg sm:h-14 sm:gap-3 sm:px-6 sm:text-sm"
        >
            {copied ? (
                <Check className="h-4 w-4 shrink-0 text-ink-accent-ink" />
            ) : (
                <Copy className="h-4 w-4 shrink-0 text-ink-muted transition-colors group-hover:text-ink-bg" />
            )}
            <span className="truncate" aria-live="polite">
                {copied ? 'Email copied' : email}
            </span>
        </button>
    );
}

export function ScrollTopButton() {
    return (
        <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="group flex min-h-11 items-center gap-1.5 transition-colors hover:text-ink-fg"
        >
            Back to top
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </button>
    );
}
