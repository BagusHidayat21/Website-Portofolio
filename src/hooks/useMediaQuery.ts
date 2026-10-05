'use client';

import { useSyncExternalStore } from 'react';

/** Live match for a CSS media query; `serverValue` is used during SSR and hydration. */
export function useMediaQuery(query: string, serverValue = false) {
    return useSyncExternalStore(
        (onChange) => {
            const list = window.matchMedia(query);
            list.addEventListener('change', onChange);
            return () => list.removeEventListener('change', onChange);
        },
        () => window.matchMedia(query).matches,
        () => serverValue
    );
}
