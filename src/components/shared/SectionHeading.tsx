'use client';

import { useRef } from 'react';
import { useLazyGSAP } from '@/hooks/useLazyGSAP';
import { MOTION_OK } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
    id: string;
    label: string;
    title: string;
    className?: string;
}

/** Mono label over a wide display title with the accent full stop; the title slides in and settles on the edge. */
export function SectionHeading({ id, label, title, className }: SectionHeadingProps) {
    const root = useRef<HTMLDivElement>(null);

    useLazyGSAP(({ gsap }) => {
        const mm = gsap.matchMedia();
        mm.add(MOTION_OK, () => {
            gsap.fromTo(
                'h2',
                { xPercent: 8 },
                { xPercent: 0, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'top 30%', scrub: true } }
            );
        });
        return () => mm.revert();
    }, root);

    return (
        <div ref={root} className={cn('overflow-hidden', className)}>
            <p className="label text-ink-muted">{label}</p>
            <h2 id={id} className="mt-4 font-wide text-section uppercase">
                {title}
                <span className="text-ink-accent-ink">.</span>
            </h2>
        </div>
    );
}
