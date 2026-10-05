'use client';

import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

/** False during SSR and hydration, true afterwards, without a setState-in-effect pass. */
export const useIsClient = () => useSyncExternalStore(subscribe, () => true, () => false);
