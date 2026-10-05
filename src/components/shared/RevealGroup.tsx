'use client';

import { useRef, type ReactNode } from 'react';
import { useReveal } from '@/hooks/useReveal';

/** Reveals descendants marked `.rise` as they scroll in. */
export function RevealGroup({ className, children }: { className?: string; children: ReactNode }) {
    const root = useRef<HTMLDivElement>(null);
    useReveal(root, '.rise');
    return (
        <div ref={root} className={className}>
            {children}
        </div>
    );
}
