'use client';

import * as React from 'react';
import { flushSync } from 'react-dom';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

const noopSubscribe = () => () => {};

export function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    // False during SSR and hydration, true on the client, without a setState-in-effect pass.
    const mounted = React.useSyncExternalStore(noopSubscribe, () => true, () => false);

    const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
        const isDark = resolvedTheme === 'dark';
        const nextTheme = isDark ? 'light' : 'dark';

        if (typeof document === 'undefined' || !('startViewTransition' in document)) {
            setTheme(nextTheme);
            return;
        }

        const rect = e.currentTarget.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        const endRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        );

        const transition = (document as unknown as { startViewTransition: (cb: () => void) => { ready: Promise<void> } }).startViewTransition(() => {
            flushSync(() => {
                setTheme(nextTheme);
            });
        });

        transition.ready.then(() => {
            document.documentElement.animate(
                {
                    clipPath: [
                        `circle(0px at ${x}px ${y}px)`,
                        `circle(${endRadius}px at ${x}px ${y}px)`
                    ]
                },
                {
                    duration: 550,
                    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                    pseudoElement: '::view-transition-new(root)'
                }
            );
        });
    };

    if (!mounted) {
        return (
            <div className="h-9 w-[4.25rem] rounded-full border border-ink-line bg-ink-fg/[0.05]" />
        );
    }

    const isDark = resolvedTheme === 'dark';

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            className="relative flex h-9 w-[4.25rem] cursor-pointer items-center justify-between rounded-full border border-ink-line bg-ink-fg/[0.05] p-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-accent-ink"
        >
            <span
                aria-hidden="true"
                className={`absolute bottom-1 top-1 w-7 rounded-full bg-ink-accent shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.34,1.4,0.64,1)] motion-reduce:transition-none ${isDark ? 'translate-x-7' : 'translate-x-0'}`}
            />

            <div className={`relative z-10 w-7 h-7 flex items-center justify-center transition-colors duration-200 ${!isDark ? 'text-ink-on-accent' : 'text-ink-muted'}`}>
                <Sun className="h-4 w-4" />
            </div>

            <div className={`relative z-10 w-7 h-7 flex items-center justify-center transition-colors duration-200 ${isDark ? 'text-ink-on-accent' : 'text-ink-muted'}`}>
                <Moon className="h-4 w-4" />
            </div>
        </button>
    );
}
