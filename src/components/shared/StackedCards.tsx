'use client';

import { useRef, type ReactNode } from 'react';
import { useLazyGSAP } from '@/hooks/useLazyGSAP';
import { useReveal } from '@/hooks/useReveal';
import { STACK_MOTION } from '@/lib/motion';

interface StackedCardsProps {
    /** Card bodies. The first is the accent card; style for it with `group-data-current/card:`. */
    cards: { id: string | number; content: ReactNode }[];
}

/** Sticky cards that recede under the next behind an opaque shade; a plain list on phones and short screens. */
export function StackedCards({ cards }: StackedCardsProps) {
    const root = useRef<HTMLOListElement>(null);
    useReveal(root, '.rise');

    useLazyGSAP(({ gsap }) => {
        const mm = gsap.matchMedia();
        mm.add(STACK_MOTION, () => {
            const cards = gsap.utils.toArray<HTMLElement>('.stack-card');
            cards.forEach((card, i) => {
                const next = cards[i + 1];
                if (!next) return;
                const scrollTrigger = { trigger: next, start: 'top bottom', end: 'top 25%', scrub: true };
                gsap.to(card.querySelector('.stack-inner'), { scale: 0.94, ease: 'none', scrollTrigger });
                gsap.fromTo(card.querySelector('.stack-shade'), { opacity: 0 }, { opacity: 0.55, ease: 'none', scrollTrigger });
            });
        });
        return () => mm.revert();
    }, root);

    return (
        <ol ref={root} className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-10">
            {cards.map(({ id, content }, i) => (
                <li
                    key={id}
                    className="stack-card mb-6 last:mb-0 [@media(min-width:768px)_and_(min-height:700px)]:sticky [@media(min-width:768px)_and_(min-height:700px)]:mb-[12vh]"
                    style={{ top: `calc(6rem + ${i}rem)` }}
                >
                    <article className="stack-inner shell relative origin-top">
                        <div
                            data-current={i === 0 ? '' : undefined}
                            className="group/card shell-core grid grid-cols-1 gap-6 bg-ink-bg-2 p-6 text-ink-fg data-current:bg-ink-accent data-current:text-ink-on-accent sm:p-8 md:grid-cols-12 md:gap-10 md:p-10"
                        >
                            {content}
                        </div>
                        <div aria-hidden="true" className="stack-shade pointer-events-none absolute inset-0 rounded-shell bg-ink-bg opacity-0" />
                    </article>
                </li>
            ))}
        </ol>
    );
}
