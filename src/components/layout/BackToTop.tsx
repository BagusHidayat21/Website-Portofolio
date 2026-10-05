// Floating button to smoothly scroll the viewport back to the top of the page.
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 400);
        };

        window.addEventListener('scroll', toggleVisibility, { passive: true });
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-24 z-40 hidden sm:flex items-center gap-1.5 rounded-full border border-ink-line bg-ink-bg/90 px-3.5 py-2 font-mono text-xs font-semibold uppercase text-ink-muted backdrop-blur-md shadow-md transition-all duration-200 hover:border-ink-accent hover:text-ink-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-accent"
                    aria-label="Back to top"
                >
                    <ArrowUp className="h-3.5 w-3.5" />
                    <span>Top</span>
                </motion.button>
            )}
        </AnimatePresence>
    );
}
