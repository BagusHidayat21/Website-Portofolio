'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import type { MouseEvent } from 'react';
import { flushSync } from 'react-dom';
import { useIsClient } from '@/hooks/useIsClient';
import { cn } from '@/lib/utils';

/** Light/dark switch; supporting browsers reveal the new theme as a circle growing from the button. */
export function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const isClient = useIsClient();
    const isDark = resolvedTheme === 'dark';

    if (!isClient) return <div aria-hidden="true" className="h-9 w-[4.25rem] rounded-full border border-ink-line bg-ink-fg/[0.05]" />;

    const toggle = (e: MouseEvent<HTMLButtonElement>) => {
        const next = isDark ? 'light' : 'dark';
        if (!document.startViewTransition) {
            setTheme(next);
            return;
        }
        const rect = e.currentTarget.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

        document
            .startViewTransition(() => flushSync(() => setTheme(next)))
            .ready.then(() => {
                document.documentElement.animate(
                    { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
                    { duration: 550, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', pseudoElement: '::view-transition-new(root)' }
                );
            });
    };

    const icon = (active: boolean) => cn('relative z-10 flex h-7 w-7 items-center justify-center transition-colors duration-200', active ? 'text-ink-on-accent' : 'text-ink-muted');

    return (
        <button
            type="button"
            onClick={toggle}
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            className="relative flex h-9 w-[4.25rem] items-center justify-between rounded-full border border-ink-line bg-ink-fg/[0.05] p-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-accent-ink"
        >
            <span
                aria-hidden="true"
                className={cn(
                    'absolute inset-y-1 w-7 rounded-full bg-ink-accent shadow-sm transition-transform duration-300 ease-spring motion-reduce:transition-none',
                    isDark ? 'translate-x-7' : 'translate-x-0'
                )}
            />
            <span className={icon(!isDark)}>
                <Sun className="h-4 w-4" />
            </span>
            <span className={icon(isDark)}>
                <Moon className="h-4 w-4" />
            </span>
        </button>
    );
}
