'use client';

import { useRef } from 'react';
import { useLazyGSAP } from '@/hooks/useLazyGSAP';
import { MOTION_OK } from '@/lib/motion';
import { cn } from '@/lib/utils';

const normalize = (word: string) => word.toLowerCase().replace(/[^\p{L}\p{N}-]/gu, '');

interface ScrollWordsProps {
    text: string;
    /** Words (case and punctuation ignored) drawn in the accent color. */
    highlight?: string[];
    className?: string;
}

export function ScrollWords({ text, highlight = [], className }: ScrollWordsProps) {
    const root = useRef<HTMLParagraphElement>(null);
    const marked = new Set(highlight.map(normalize));

    useLazyGSAP(({ gsap }) => {
        const mm = gsap.matchMedia();
        mm.add(MOTION_OK, () => {
            const el = root.current;
            if (!el) return;
            // One scroll-linked value fanned out with style writes only: no per-word tweens, no layout reads.
            const words = Array.from(el.querySelectorAll<HTMLElement>('.sw-word'));
            const painted = new Float32Array(words.length).fill(-1);
            const paint = (progress: number) => {
                const head = progress * (words.length + 2);
                words.forEach((word, i) => {
                    const p = Math.round(Math.min(1, Math.max(0, head - i)) * 100) / 100;
                    if (p === painted[i]) return;
                    painted[i] = p;
                    word.style.setProperty('--sw-p', String(p));
                });
            };
            paint(0);
            const state = { progress: 0 };
            gsap.to(state, {
                progress: 1,
                ease: 'none',
                onUpdate: () => paint(state.progress),
                scrollTrigger: { trigger: el, start: 'top 75%', end: 'bottom 40%', scrub: true },
            });
            return () => words.forEach((word) => word.style.removeProperty('--sw-p'));
        });
        return () => mm.revert();
    }, root);

    return (
        <p ref={root} className={cn('max-w-6xl text-balance text-statement font-medium', className)}>
            {text.split(' ').map((word, i) => (
                <span key={i}>
                    <span className={cn('sw-word', marked.has(normalize(word)) && 'sw-hl')}>{word}</span>{' '}
                </span>
            ))}
        </p>
    );
}
