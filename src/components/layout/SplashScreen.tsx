'use client';

import { useEffect, type ReactNode } from 'react';

interface SplashScreenProps {
    children: ReactNode;
}

const SHOW_MS = 1400;
const EXIT_MS = 400;

/**
 * First-visit intro. The overlay is server-rendered and only displayed when the inline script in the
 * root layout has set html[data-splash] before first paint, so there is no flash and no hydration delay.
 * This component just times it out (or lets a click/key dismiss it) and releases the paused hero entrance.
 */
export function SplashScreen({ children }: SplashScreenProps) {
    useEffect(() => {
        const html = document.documentElement;
        if (html.getAttribute('data-splash') !== '') return;

        let exitTimer = 0;
        const dismiss = () => {
            if (html.getAttribute('data-splash') !== '') return;
            try {
                sessionStorage.setItem('splashShown', 'true');
            } catch {
                // Storage unavailable: the splash simply shows again next visit.
            }
            html.setAttribute('data-splash', 'leaving');
            exitTimer = window.setTimeout(() => html.removeAttribute('data-splash'), EXIT_MS);
        };

        const timer = window.setTimeout(dismiss, SHOW_MS);
        window.addEventListener('keydown', dismiss);
        window.addEventListener('pointerdown', dismiss);
        return () => {
            window.clearTimeout(timer);
            window.clearTimeout(exitTimer);
            window.removeEventListener('keydown', dismiss);
            window.removeEventListener('pointerdown', dismiss);
        };
    }, []);

    return (
        <>
            {children}
            <div
                aria-hidden="true"
                className="splash fixed inset-0 z-[150] items-center justify-center bg-ink-bg text-ink-fg"
            >
                <div className="backdrop-grid absolute inset-0" />

                <div className="relative z-10 flex flex-col items-center gap-8">
                    <div className="flex flex-col items-center duration-500 ease-out animate-in fade-in slide-in-from-bottom-5">
                        <p className="font-wide text-5xl font-extrabold uppercase tracking-[-0.04em] md:text-7xl">
                            HID<span className="text-ink-accent-ink">.</span>
                        </p>
                        <p className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-ink-muted delay-300 duration-500 animate-in fade-in fill-mode-both">
                            Bagus Hidayat / Portfolio
                        </p>
                    </div>

                    <div className="h-[2px] w-48 overflow-hidden rounded-full bg-ink-line">
                        <div className="splash-bar h-full origin-left rounded-full bg-ink-accent-ink" />
                    </div>
                </div>
            </div>
        </>
    );
}
