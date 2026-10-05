'use client';

import { useEffect, useLayoutEffect, useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
    children: ReactNode;
}

export function SplashScreen({ children }: SplashScreenProps) {
    const [showSplash, setShowSplash] = useState(false);

    useLayoutEffect(() => {
        if (!sessionStorage.getItem('splashShown')) {
            setShowSplash(true);
        }
    }, []);

    useEffect(() => {
        if (!showSplash) return;
        const timer = setTimeout(() => {
            sessionStorage.setItem('splashShown', 'true');
            setShowSplash(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, [showSplash]);

    return (
        <>
            {children}
            <AnimatePresence>
                {showSplash && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-[150] flex items-center justify-center bg-ink-bg text-ink-fg"
                    >
                        <div aria-hidden="true" className="backdrop-grid absolute inset-0" />

                        <div className="relative z-10 flex flex-col items-center gap-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                className="flex flex-col items-center"
                            >
                                <p className="font-wide text-5xl font-extrabold uppercase tracking-[-0.04em] md:text-7xl">
                                    HID<span className="text-ink-accent-ink">.</span>
                                </p>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                    className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-ink-muted"
                                >
                                    Bagus Hidayat / Portfolio
                                </motion.p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scaleX: 0 }}
                                animate={{ opacity: 1, scaleX: 1 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="h-[2px] w-48 overflow-hidden rounded-full bg-ink-line"
                            >
                                <motion.div
                                    className="h-full origin-left rounded-full bg-ink-accent-ink"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
