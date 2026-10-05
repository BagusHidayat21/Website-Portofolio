'use client';

import { useEffect } from 'react';

const SHOW_MS = 1400;
const EXIT_MS = 400;

/** First-visit intro, shown pre-paint by the root layout script; this times it out and releases the hero entrance. */
export function SplashScreen() {
    useEffect(() => {
        const html = document.documentElement;
        if (html.getAttribute('data-splash') !== '') return;

        let exitTimer: ReturnType<typeof setTimeout> | undefined;
        const dismiss = () => {
            if (html.getAttribute('data-splash') !== '') return;
            try {
                sessionStorage.setItem('splashShown', 'true');
            } catch {
                // Storage blocked: the splash simply shows again next visit.
            }
            html.setAttribute('data-splash', 'leaving');
            exitTimer = setTimeout(() => html.removeAttribute('data-splash'), EXIT_MS);
        };

        const showTimer = setTimeout(dismiss, SHOW_MS);
        window.addEventListener('keydown', dismiss);
        window.addEventListener('pointerdown', dismiss);
        return () => {
            clearTimeout(showTimer);
            clearTimeout(exitTimer);
            window.removeEventListener('keydown', dismiss);
            window.removeEventListener('pointerdown', dismiss);
        };
    }, []);

    return (
        <div aria-hidden="true" className="splash fixed inset-0 z-[150] items-center justify-center bg-ink-bg">
            <div className="backdrop-grid absolute inset-0" />
            <div className="relative flex flex-col items-center gap-8">
                <div className="flex flex-col items-center duration-500 ease-out animate-in fade-in slide-in-from-bottom-5">
                    <p className="font-wide text-5xl uppercase tracking-[-0.04em] md:text-7xl">
                        HID<span className="text-ink-accent-ink">.</span>
                    </p>
                    <p className="label mt-3 text-ink-muted delay-300 duration-500 animate-in fade-in fill-mode-both">Bagus Hidayat / Portfolio</p>
                </div>
                <div className="h-[2px] w-48 overflow-hidden rounded-full bg-ink-line">
                    <div className="splash-bar h-full origin-left rounded-full bg-ink-accent-ink" />
                </div>
            </div>
        </div>
    );
}
