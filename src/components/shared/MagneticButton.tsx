'use client';

import Link from 'next/link';
import { useEffect, useRef, type PointerEvent, type ReactNode } from 'react';
import { loadGsap } from '@/lib/gsap';
import { isExternal, isRoute, type Href } from '@/lib/links';
import { prefersReducedMotion } from '@/lib/motion';
import { cn } from '@/lib/utils';

const MAX_PULL = 10;

const variants = {
    primary: {
        button: 'bg-ink-accent text-ink-on-accent shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_12px_40px_-12px_rgba(200,255,61,0.45)] hover:brightness-105',
        icon: 'bg-ink-on-accent/10',
    },
    secondary: {
        button: 'border border-ink-line bg-ink-fg/[0.03] text-ink-fg hover:border-ink-fg/25 hover:bg-ink-fg/[0.06]',
        icon: 'bg-ink-fg/[0.08]',
    },
} as const;

const sizes = {
    lg: { button: 'h-14 pl-7 pr-2 text-base', icon: 'h-10 w-10' },
    sm: { button: 'h-10 pl-4 pr-1.5 text-sm', icon: 'h-7 w-7' },
} as const;

interface MagneticButtonProps {
    href: Href;
    children: ReactNode;
    /** A rendered icon element, e.g. `<ArrowRight />` (components cannot cross the server boundary). */
    icon: ReactNode;
    variant?: keyof typeof variants;
    size?: keyof typeof sizes;
}

/** Pill CTA that leans toward the pointer. Internal routes use Link; files, mail and other sites use a plain anchor. */
export function MagneticButton({ href, children, icon, variant = 'primary', size = 'lg' }: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null);
    const pull = useRef<{ x: (v: number) => void; y: (v: number) => void } | null>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        let cancelled = false;
        loadGsap().then(({ gsap }) => {
            if (cancelled) return;
            pull.current = {
                x: gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.5)' }),
                y: gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.5)' }),
            };
        });
        return () => {
            cancelled = true;
            pull.current = null;
        };
    }, []);

    const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
        if (e.pointerType !== 'mouse' || !pull.current || prefersReducedMotion()) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const clamp = (v: number) => Math.max(-MAX_PULL, Math.min(MAX_PULL, v * 0.3));
        pull.current.x(clamp(e.clientX - (rect.left + rect.width / 2)));
        pull.current.y(clamp(e.clientY - (rect.top + rect.height / 2)));
    };

    const reset = () => {
        pull.current?.x(0);
        pull.current?.y(0);
    };

    const className = cn(
        'group relative inline-flex select-none items-center justify-center gap-3 rounded-full font-medium tracking-[-0.01em] transition-[background-color,border-color,color,filter] duration-300 ease-expo active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-accent-ink focus-visible:ring-offset-2 focus-visible:ring-offset-ink-bg',
        variants[variant].button,
        sizes[size].button
    );

    const content = (
        <>
            <span className="whitespace-nowrap">{children}</span>
            <span
                aria-hidden="true"
                className={cn(
                    'inline-flex items-center justify-center rounded-full transition-transform duration-300 ease-spring motion-reduce:transition-none [&>svg]:size-4 [&>svg]:stroke-[1.75]',
                    sizes[size].icon,
                    variants[variant].icon,
                    isRoute(href) ? 'group-hover:translate-x-[3px] group-hover:scale-[1.06]' : 'group-hover:-translate-y-[2px] group-hover:translate-x-[2px] group-hover:scale-[1.06]'
                )}
            >
                {icon}
            </span>
        </>
    );

    return (
        <div ref={ref} onPointerMove={onPointerMove} onPointerLeave={reset} className="inline-flex">
            {isRoute(href) ? (
                <Link href={href} className={className}>
                    {content}
                </Link>
            ) : (
                <a href={href} className={className} {...(isExternal(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                    {content}
                </a>
            )}
        </div>
    );
}
