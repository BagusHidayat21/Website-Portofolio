'use client';

import * as React from 'react';
import { flushSync } from 'react-dom';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    // Circular wave theme transition using View Transitions API originating from button coordinates
    const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
        const isDark = theme === 'dark';
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
            <div className="h-9 w-16 rounded-full bg-zinc-200/60 dark:bg-zinc-800/60" />
        );
    }

    const isDark = theme === 'dark';

    return (
        <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="relative h-9 w-[4.25rem] p-1 flex items-center justify-between rounded-full bg-zinc-200/80 dark:bg-zinc-800/80 border border-zinc-300/80 dark:border-zinc-700/80 transition-colors focus:outline-none cursor-pointer"
        >
            {/* Animated sliding active indicator background pill */}
            <motion.div
                className="absolute top-1 bottom-1 w-7 rounded-full bg-white dark:bg-zinc-900 shadow-sm border border-zinc-200/50 dark:border-zinc-700/50 transform-gpu"
                initial={false}
                animate={{
                    x: isDark ? 28 : 0
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 32 }}
            />

            {/* Sun Icon (Left - Light) */}
            <div className={`relative z-10 w-7 h-7 flex items-center justify-center transition-colors duration-200 ${!isDark ? 'text-amber-500 font-bold scale-105' : 'text-zinc-400 dark:text-zinc-500'}`}>
                <Sun className="h-4 w-4" />
            </div>

            {/* Moon Icon (Right - Dark) */}
            <div className={`relative z-10 w-7 h-7 flex items-center justify-center transition-colors duration-200 ${isDark ? 'text-zinc-100 font-bold scale-105' : 'text-zinc-400'}`}>
                <Moon className="h-4 w-4" />
            </div>
            <span className="sr-only">Toggle theme</span>
        </button>
    );
}
