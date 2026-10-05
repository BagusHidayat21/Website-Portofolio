'use client';

import { Check, Copy } from 'lucide-react';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';

export function CopyEmailButton({ email }: { email: string }) {
    const { copied, copy } = useCopyToClipboard();
    return (
        <button
            type="button"
            onClick={() => copy(email)}
            className="inline-flex h-11 w-max items-center gap-2 rounded-full border border-ink-line px-4 text-sm font-medium text-ink-muted transition-colors hover:border-ink-fg/30 hover:text-ink-fg"
        >
            {copied ? (
                <Check aria-hidden="true" className="h-4 w-4 text-ink-accent-ink" strokeWidth={1.75} />
            ) : (
                <Copy aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />
            )}
            <span aria-live="polite">{copied ? 'Email copied' : 'Copy email'}</span>
        </button>
    );
}
