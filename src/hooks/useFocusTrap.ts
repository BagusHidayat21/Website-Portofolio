'use client';

import { useEffect, useEffectEvent, type RefObject } from 'react';

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** While `active`, keeps Tab inside `container`, focuses it on open and calls `onEscape` on Escape. */
export function useFocusTrap(container: RefObject<HTMLElement | null>, active: boolean, onEscape: () => void) {
    const escape = useEffectEvent(onEscape);

    useEffect(() => {
        const panel = container.current;
        if (!active || !panel) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') return escape();
            if (e.key !== 'Tab') return;
            const focusable = panel.querySelectorAll<HTMLElement>(FOCUSABLE);
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (!first || !last) return;
            if (e.shiftKey && (document.activeElement === first || document.activeElement === panel)) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };

        const frame = requestAnimationFrame(() => panel.focus());
        window.addEventListener('keydown', onKeyDown);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [container, active]);
}
