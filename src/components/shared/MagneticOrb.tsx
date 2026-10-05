'use client';

import { ArrowUpRight } from 'lucide-react';
import { useRef, type PointerEvent } from 'react';
import { useLazyGSAP } from '@/hooks/useLazyGSAP';
import { getGsap } from '@/lib/gsap';
import { MOTION_OK, prefersReducedMotion } from '@/lib/motion';

/** Big accent CTA disc that follows the pointer; it pops in once (no scrub, so it can never stall half-turned). */
export function MagneticOrb({ href, label }: { href: string; label: string }) {
    const root = useRef<HTMLDivElement>(null);

    useLazyGSAP(({ gsap }) => {
        const mm = gsap.matchMedia();
        mm.add(MOTION_OK, () => {
            gsap.from('a', { scale: 0.6, autoAlpha: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: root.current, start: 'top 85%', once: true } });
        });
        return () => mm.revert();
    }, root);

    const follow = (e: PointerEvent<HTMLAnchorElement>) => {
        if (e.pointerType !== 'mouse' || prefersReducedMotion()) return;
        const rect = e.currentTarget.getBoundingClientRect();
        getGsap()?.gsap.to(e.currentTarget, {
            x: (e.clientX - (rect.left + rect.width / 2)) * 0.35,
            y: (e.clientY - (rect.top + rect.height / 2)) * 0.35,
            duration: 0.6,
            ease: 'power3.out',
            overwrite: 'auto',
        });
    };

    const release = (e: PointerEvent<HTMLAnchorElement>) => {
        getGsap()?.gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.6, ease: 'power3.out', overwrite: 'auto' });
    };

    return (
        <div ref={root} className="flex justify-center lg:justify-end">
            <a
                href={href}
                onPointerMove={follow}
                onPointerLeave={release}
                className="group relative flex aspect-square w-[min(72vw,22rem)] flex-col items-center justify-center gap-3 rounded-full bg-ink-accent text-ink-on-accent shadow-[0_40px_120px_-40px_rgba(200,255,61,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-accent-ink focus-visible:ring-offset-4 focus-visible:ring-offset-ink-bg"
            >
                <span className="px-10 text-center font-wide text-[clamp(1.5rem,2.6vw,2.25rem)] uppercase leading-none tracking-[-0.03em]">{label}</span>
                <ArrowUpRight
                    aria-hidden="true"
                    className="h-9 w-9 transition-transform duration-500 ease-expo group-hover:-translate-y-1 group-hover:translate-x-1"
                    strokeWidth={1.5}
                />
            </a>
        </div>
    );
}
