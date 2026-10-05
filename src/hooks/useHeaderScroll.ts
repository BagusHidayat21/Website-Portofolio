'use client';

import { useEffect, useRef, useState } from 'react';

const SCROLLED_AFTER = 20;
const HIDE_AFTER = 360;

/** Header scroll state from one passive listener; the progress bar (`progressRef`) is written without re-rendering. */
export function useHeaderScroll() {
    const progressRef = useRef<HTMLSpanElement>(null);
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        let last = window.scrollY;
        let frame = 0;
        const update = () => {
            frame = 0;
            const y = window.scrollY;
            const max = document.documentElement.scrollHeight - window.innerHeight;
            if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
            setScrolled(y > SCROLLED_AFTER);
            setHidden(y > HIDE_AFTER && y > last);
            last = y;
        };
        const onScroll = () => {
            frame ||= requestAnimationFrame(update);
        };
        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
            cancelAnimationFrame(frame);
        };
    }, []);

    return { scrolled, hidden, progressRef };
}
