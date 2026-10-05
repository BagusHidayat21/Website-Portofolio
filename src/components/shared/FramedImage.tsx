'use client';

import Image from 'next/image';
import { useRef, type ReactNode } from 'react';
import { useLazyGSAP } from '@/hooks/useLazyGSAP';
import { MOTION_OK } from '@/lib/motion';
import { cn } from '@/lib/utils';

const presets = {
    portrait: { aspect: 'aspect-[4/5]', image: 'object-top', clip: 'inset(18% 12% 18% 12% round 2rem)', drift: 12, scale: 1.2 },
    wide: { aspect: 'aspect-[16/10]', image: '', clip: 'inset(14% 10% 14% 10% round 2rem)', drift: 9, scale: 1.18 },
} as const;

interface FramedImageProps {
    src: string;
    alt: string;
    sizes: string;
    variant?: keyof typeof presets;
    /** Overlay content (scrims, captions) drawn over the image. */
    children?: ReactNode;
}

/** Double-bezel image frame: opens from an inset clip while the image drifts the other way. */
export function FramedImage({ src, alt, sizes, variant = 'portrait', children }: FramedImageProps) {
    const frame = useRef<HTMLDivElement>(null);
    const preset = presets[variant];

    useLazyGSAP(({ gsap }) => {
        const mm = gsap.matchMedia();
        mm.add(MOTION_OK, () => {
            gsap.fromTo(
                '.framed-image',
                { yPercent: -preset.drift, scale: preset.scale },
                { yPercent: preset.drift, scale: preset.scale, ease: 'none', scrollTrigger: { trigger: frame.current, start: 'top bottom', end: 'bottom top', scrub: true } }
            );
            gsap.fromTo(
                frame.current,
                { clipPath: preset.clip },
                { clipPath: 'inset(0% 0% 0% 0% round 2rem)', ease: 'none', scrollTrigger: { trigger: frame.current, start: 'top 95%', end: 'top 35%', scrub: true } }
            );
        });
        return () => mm.revert();
    }, frame);

    return (
        <div className="shell">
            <div ref={frame} className={cn('shell-core relative overflow-hidden bg-ink-bg-2', preset.aspect)}>
                <Image src={src} alt={alt} fill sizes={sizes} className={cn('framed-image object-cover', preset.image)} />
                {children}
            </div>
        </div>
    );
}
