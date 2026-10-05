'use client';

import { useRef } from 'react';
import { useLazyGSAP } from '@/hooks/useLazyGSAP';
import { MOTION_OK } from '@/lib/motion';

const pad = (n: number) => String(Math.round(n)).padStart(2, '0');

export function CountUp({ value }: { value: number }) {
    const root = useRef<HTMLSpanElement>(null);

    useLazyGSAP(({ gsap }) => {
        const mm = gsap.matchMedia();
        mm.add(MOTION_OK, () => {
            const el = root.current;
            if (!el) return;
            const counter = { n: 0 };
            gsap.to(counter, {
                n: value,
                duration: 1.6,
                ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 85%', once: true },
                onUpdate: () => {
                    el.textContent = pad(counter.n);
                },
            });
        });
        return () => mm.revert();
    }, root);

    return (
        <span ref={root} className="tabular-nums">
            {pad(value)}
        </span>
    );
}
