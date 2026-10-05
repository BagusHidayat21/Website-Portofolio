'use client';

import { useEffect, useState } from 'react';

/** `copy(text)` writes to the clipboard; `copied` stays true for `resetMs`. */
export function useCopyToClipboard(resetMs = 2000) {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!copied) return;
        const timer = setTimeout(() => setCopied(false), resetMs);
        return () => clearTimeout(timer);
    }, [copied, resetMs]);

    const copy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
        } catch {
            setCopied(false);
        }
    };

    return { copied, copy };
}
