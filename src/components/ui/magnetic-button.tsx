'use client';

import Link from 'next/link';
import { useEffect, useRef, type ComponentType, type PointerEvent, type ReactNode } from 'react';
import { loadGsap } from '@/lib/gsap';
import { cn } from '@/lib/utils';

const MAX_PULL = 10;

type Variant = 'primary' | 'secondary';
type Size = 'lg' | 'md' | 'sm';

interface MagneticButtonProps {
    href: string;
    children: ReactNode;
    variant?: Variant;
    size?: Size;
    icon?: ComponentType<{ className?: string; strokeWidth?: number }>;
    /** Diagonal nudge for outbound arrows (ArrowUpRight), horizontal otherwise. */
    iconDirection?: 'right' | 'diagonal';
    external?: boolean;
    className?: string;
    onClick?: () => void;
}

const variantClasses: Record<Variant, string> = {
    primary:
        'bg-ink-accent text-ink-on-accent shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_12px_40px_-12px_rgba(200,255,61,0.45)] hover:brightness-105',
    secondary:
        'border border-ink-line bg-ink-fg/[0.03] text-ink-fg hover:border-ink-fg/25 hover:bg-ink-fg/[0.06]',
};

const iconWrapClasses: Record<Variant, string> = {
    primary: 'bg-ink-on-accent/10',
    secondary: 'bg-ink-fg/[0.08]',
};

const iconNudge = {
    right: 'group-hover:translate-x-[3px] group-hover:scale-[1.06]',
    diagonal: 'group-hover:-translate-y-[2px] group-hover:translate-x-[2px] group-hover:scale-[1.06]',
};

const sizeClasses: Record<Size, { button: string; icon: string; withIcon: string }> = {
    lg: { button: 'h-14 px-7 text-base', icon: 'h-10 w-10', withIcon: 'pl-7 pr-2' },
    md: { button: 'h-12 px-6 text-[0.9375rem]', icon: 'h-8 w-8', withIcon: 'pl-6 pr-2' },
    sm: { button: 'h-10 px-4 text-sm', icon: 'h-7 w-7', withIcon: 'pl-4 pr-1.5' },
};

export function MagneticButton({
    href,
    children,
    variant = 'primary',
    size = 'md',
    icon: Icon,
    iconDirection = 'right',
    external = false,
    className,
    onClick,
}: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null);
    const pull = useRef<{ x: (v: number) => void; y: (v: number) => void } | null>(null);

    // Spring-like follow through GSAP quickTo (already loaded for the scroll scenes).
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        let cancelled = false;
        let kill = () => {};
        loadGsap().then(({ gsap }) => {
            if (cancelled) return;
            const x = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.5)' });
            const y = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.5)' });
            pull.current = { x, y };
            kill = () => gsap.killTweensOf(el);
        });
        return () => {
            cancelled = true;
            kill();
            pull.current = null;
        };
    }, []);

    const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
        if (e.pointerType !== 'mouse' || !ref.current || !pull.current) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const rect = ref.current.getBoundingClientRect();
        const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.3;
        const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.3;
        pull.current.x(Math.max(-MAX_PULL, Math.min(MAX_PULL, dx)));
        pull.current.y(Math.max(-MAX_PULL, Math.min(MAX_PULL, dy)));
    };

    const reset = () => {
        pull.current?.x(0);
        pull.current?.y(0);
    };

    const s = sizeClasses[size];

    const content = (
        <>
            <span className="whitespace-nowrap">{children}</span>
            {Icon && (
                <span
                    className={cn(
                        'inline-flex items-center justify-center rounded-full transition-transform duration-300 ease-[cubic-bezier(0.34,1.4,0.64,1)] motion-reduce:transition-none',
                        s.icon,
                        iconWrapClasses[variant],
                        iconNudge[iconDirection]
                    )}
                    aria-hidden="true"
                >
                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                </span>
            )}
        </>
    );

    const classes = cn(
        'group relative inline-flex select-none items-center justify-center gap-3 rounded-full font-medium tracking-[-0.01em] transition-[background-color,border-color,color,filter] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-accent-ink focus-visible:ring-offset-2 focus-visible:ring-offset-ink-bg',
        variantClasses[variant],
        s.button,
        Icon && s.withIcon,
        className
    );

    return (
        <div ref={ref} onPointerMove={handlePointerMove} onPointerLeave={reset} className="inline-flex">
            {external ? (
                <a href={href} target="_blank" rel="noopener noreferrer" className={classes} onClick={onClick}>
                    {content}
                </a>
            ) : (
                <Link href={href} className={classes} onClick={onClick}>
                    {content}
                </Link>
            )}
        </div>
    );
}
