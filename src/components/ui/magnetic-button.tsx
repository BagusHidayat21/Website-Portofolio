'use client';

import Link from 'next/link';
import { motion, useMotionValue, useReducedMotion, useSpring, type Variants } from 'framer-motion';
import { useRef, type ComponentType, type PointerEvent, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

const MAGNET_SPRING = { stiffness: 150, damping: 15, mass: 0.4 };
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
        'border border-ink-line bg-ink-fg/[0.03] text-ink-fg hover:border-ink-fg/25 hover:bg-ink-fg/[0.06] backdrop-blur-md',
};

const iconWrapClasses: Record<Variant, string> = {
    primary: 'bg-ink-on-accent/10',
    secondary: 'bg-ink-fg/[0.08]',
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
    const reduceMotion = useReducedMotion();
    const x = useSpring(useMotionValue(0), MAGNET_SPRING);
    const y = useSpring(useMotionValue(0), MAGNET_SPRING);

    const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
        if (reduceMotion || e.pointerType !== 'mouse' || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.3;
        const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.3;
        x.set(Math.max(-MAX_PULL, Math.min(MAX_PULL, dx)));
        y.set(Math.max(-MAX_PULL, Math.min(MAX_PULL, dy)));
    };

    const reset = () => {
        x.set(0);
        y.set(0);
    };

    const iconVariants: Variants = {
        rest: { x: 0, y: 0, scale: 1 },
        hover: iconDirection === 'diagonal' ? { x: 2, y: -2, scale: 1.06 } : { x: 3, y: 0, scale: 1.06 },
    };

    const s = sizeClasses[size];

    const content = (
        <>
            <span className="whitespace-nowrap">{children}</span>
            {Icon && (
                <motion.span
                    variants={reduceMotion ? undefined : iconVariants}
                    transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                    className={cn('inline-flex items-center justify-center rounded-full', s.icon, iconWrapClasses[variant])}
                    aria-hidden="true"
                >
                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                </motion.span>
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
        <motion.div
            ref={ref}
            onPointerMove={handlePointerMove}
            onPointerLeave={reset}
            style={{ x, y }}
            initial="rest"
            animate="rest"
            whileHover="hover"
            className="inline-flex"
        >
            {external ? (
                <a href={href} target="_blank" rel="noopener noreferrer" className={classes} onClick={onClick}>
                    {content}
                </a>
            ) : (
                <Link href={href} className={classes} onClick={onClick}>
                    {content}
                </Link>
            )}
        </motion.div>
    );
}
