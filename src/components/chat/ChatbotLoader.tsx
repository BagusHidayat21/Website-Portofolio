'use client';

import dynamic from 'next/dynamic';
import { MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

const Chatbot = dynamic(() => import('./Chatbot').then((mod) => mod.Chatbot), { ssr: false });

// The full assistant (and its markdown renderer) loads on the first interaction, keeping it out of the initial bundle.
export function ChatbotLoader() {
    const [load, setLoad] = useState(false);
    const [openOnLoad, setOpenOnLoad] = useState(false);

    useEffect(() => {
        if (load) return;
        const events = ['pointerdown', 'keydown', 'touchstart', 'wheel'] as const;
        const trigger = () => setLoad(true);
        events.forEach((e) => window.addEventListener(e, trigger, { once: true, passive: true }));
        return () => events.forEach((e) => window.removeEventListener(e, trigger));
    }, [load]);

    if (load) return <Chatbot defaultOpen={openOnLoad} />;

    return (
        <button
            type="button"
            onClick={() => {
                setOpenOnLoad(true);
                setLoad(true);
            }}
            aria-label="Open chat"
            className="fixed bottom-6 right-6 z-[1000] flex h-14 w-14 items-center justify-center rounded-full bg-ink-fg text-ink-bg shadow-lg shadow-ink-line transition-transform hover:scale-110"
        >
            <MessageCircle className="relative z-10 h-6 w-6" />
        </button>
    );
}
