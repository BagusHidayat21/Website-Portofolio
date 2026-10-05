'use client';

import { Fragment, useRef } from 'react';
import { useLazyGSAP } from '@/hooks/useLazyGSAP';
import { MOTION_OK } from '@/lib/gsap';
import { cn } from '@/lib/utils';

interface ScrollWordsProps {
    text: string;
    /** Lowercased words (punctuation stripped) drawn in the accent color. */
    highlight?: string[];
    className?: string;
}

const clean = (word: string) => word.toLowerCase().replace(/[^\p{L}\p{N}-]/gu, '');

/** Statement paragraph whose words light up one by one as it scrolls through, as on the home manifesto. */
export function ScrollWords({ text, highlight = [], className }: ScrollWordsProps) {
    const root = useRef<HTMLParagraphElement>(null);
    const marked = new Set(highlight.map(clean));
    const words = text.split(' ');

    useLazyGSAP(
        ({ gsap }) => {
            const mm = gsap.matchMedia();
            mm.add(MOTION_OK, () => {
                // One scroll-linked value, fanned out to the words with style writes only (no per-word tweens or reads).
                const el = root.current;
                if (!el) return;
                const words = Array.from(el.querySelectorAll<HTMLElement>('.sw-word'));
                const last = new Array<number>(words.length).fill(-1);
                const paint = (progress: number) => {
                    const head = progress * (words.length + 2);
                    words.forEach((word, i) => {
                        const p = Math.round(Math.min(1, Math.max(0, head - i)) * 100) / 100;
                        if (p !== last[i]) {
                            last[i] = p;
                            word.style.setProperty('--sw-p', String(p));
                        }
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
        },
        root
    );

    return (
        <p
            ref={root}
            className={cn(
                'max-w-6xl text-balance font-sans text-[clamp(1.75rem,4vw,4.25rem)] font-medium leading-[1.15] tracking-[-0.03em]',
                className
            )}
        >
            {words.map((word, i) => (
                <Fragment key={i}>
                    <span className={cn('sw-word', marked.has(clean(word)) && 'sw-hl')}>{word}</span>{' '}
                </Fragment>
            ))}
        </p>
    );
}
