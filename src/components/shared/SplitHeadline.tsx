'use client';

import { useRef } from 'react';
import { useLazyGSAP } from '@/hooks/useLazyGSAP';
import { MOTION_OK } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface SplitHeadlineProps {
    id?: string;
    /** First line slides in from the left; the second, outlined with the accent stop, from the right. */
    lines: [string, string];
    as?: 'h2' | 'p';
    /** Fill the outlined line when an ancestor `group` is hovered (headline inside a link). */
    fillOnHover?: boolean;
    className?: string;
}

export function SplitHeadline({ id, lines, as: Tag = 'h2', fillOnHover = false, className }: SplitHeadlineProps) {
    const root = useRef<HTMLDivElement>(null);

    useLazyGSAP(({ gsap }) => {
        const mm = gsap.matchMedia();
        mm.add(MOTION_OK, () => {
            const scrollTrigger = { trigger: root.current, start: 'top bottom', end: 'bottom 40%', scrub: 1 };
            gsap.fromTo('.split-left', { xPercent: -45 }, { xPercent: 0, ease: 'none', scrollTrigger });
            gsap.fromTo('.split-right', { xPercent: 45 }, { xPercent: 0, ease: 'none', scrollTrigger });
        });
        return () => mm.revert();
    }, root);

    return (
        <div ref={root} className={cn('overflow-hidden', className)}>
            <Tag id={id} className="font-wide text-headline uppercase">
                <span className="split-left block px-4 sm:whitespace-nowrap sm:px-6 lg:px-10">{lines[0]}</span>
                <span
                    className={cn(
                        'split-right text-outline block px-4 text-right sm:whitespace-nowrap sm:px-6 lg:px-10',
                        fillOnHover && 'transition-colors duration-500 group-hover:text-ink-fg'
                    )}
                >
                    {lines[1].replace(/\.$/, '')}
                    <span className="text-ink-accent-ink [-webkit-text-stroke:0]">.</span>
                </span>
            </Tag>
        </div>
    );
}
