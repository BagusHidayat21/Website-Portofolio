'use client';

import { Fragment, useRef } from 'react';
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap';
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

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add(MOTION_OK, () => {
                gsap.fromTo(
                    '.sw-word',
                    { opacity: 0.12 },
                    {
                        opacity: 1,
                        ease: 'none',
                        stagger: 0.08,
                        scrollTrigger: { trigger: root.current, start: 'top 75%', end: 'bottom 40%', scrub: true },
                    }
                );
            });
            return () => mm.revert();
        },
        { scope: root }
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
                    <span className={cn('sw-word', marked.has(clean(word)) && 'text-ink-accent-ink')}>{word}</span>{' '}
                </Fragment>
            ))}
        </p>
    );
}
