'use client';

import { useRef, type ReactNode } from 'react';
import { useLazyGSAP } from '@/hooks/useLazyGSAP';
import { MOTION_OK } from '@/lib/motion';

interface ParallaxProps {
    /** Drift while crossing the viewport; positive feels farther away, negative closer. */
    speed: number;
    className?: string;
    children: ReactNode;
}

export function Parallax({ speed, className, children }: ParallaxProps) {
    const root = useRef<HTMLDivElement>(null);

    useLazyGSAP(({ gsap }) => {
        const mm = gsap.matchMedia();
        mm.add(MOTION_OK, () => {
            gsap.fromTo(
                root.current,
                { yPercent: -speed * 10 },
                { yPercent: speed * 10, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } }
            );
        });
        return () => mm.revert();
    }, root);

    return (
        <div ref={root} className={className}>
            {children}
        </div>
    );
}
