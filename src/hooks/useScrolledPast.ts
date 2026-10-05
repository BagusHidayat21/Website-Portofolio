'use client';

import { useSyncExternalStore } from 'react';

const subscribe = (onChange: () => void) => {
    window.addEventListener('scroll', onChange, { passive: true });
    return () => window.removeEventListener('scroll', onChange);
};

/** Whether the page is scrolled beyond `offset`; re-renders only when that boolean flips. */
export const useScrolledPast = (offset: number) => useSyncExternalStore(subscribe, () => window.scrollY > offset, () => false);
