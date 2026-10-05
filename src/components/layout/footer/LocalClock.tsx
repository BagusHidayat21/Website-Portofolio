'use client';

import { useEffect, useRef } from 'react';

const formatter = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

/** Malang local time, written straight to the DOM (no re-render) and only ticking while visible. */
export function LocalClock() {
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        let timer: ReturnType<typeof setInterval> | undefined;
        const tick = () => {
            el.textContent = formatter.format(new Date());
        };
        const observer = new IntersectionObserver(([entry]) => {
            clearInterval(timer);
            if (!entry?.isIntersecting) return;
            tick();
            timer = setInterval(tick, 1000);
        });
        observer.observe(el);
        return () => {
            observer.disconnect();
            clearInterval(timer);
        };
    }, []);

    return <span ref={ref} className="min-w-[5.5rem] rounded-md border border-ink-line bg-ink-fg/[0.04] px-2.5 py-1 text-center text-ink-fg tabular-nums empty:hidden" />;
}
