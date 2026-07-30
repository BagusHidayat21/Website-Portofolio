'use client';

import { useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
    children: ReactNode;
}

export function SplashScreen({ children }: SplashScreenProps) {
    const [isSplashComplete, setIsSplashComplete] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const hasShownSplash = sessionStorage.getItem('splashShown');
        if (hasShownSplash) {
            setIsSplashComplete(true);
        }
        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if (isInitialized && !isSplashComplete) {
            const timer = setTimeout(() => {
                sessionStorage.setItem('splashShown', 'true');
                setIsSplashComplete(true);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isInitialized, isSplashComplete]);

    if (!isInitialized) return null;

    return (
        <>
            <AnimatePresence mode="wait">
                {!isSplashComplete && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-zinc-950"
                    >
                        <div
                            className="absolute inset-0 opacity-[0.03]"
                            style={{
                                backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
                                backgroundSize: '40px 40px'
                            }}
                        />
                        <div
                            className="absolute inset-0 hidden dark:block opacity-[0.05]"
                            style={{
                                backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                                backgroundSize: '40px 40px'
                            }}
                        />

                        <div className="relative z-10 flex flex-col items-center gap-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                className="flex flex-col items-center"
                            >
                                <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100">
                                    HID<span className="text-zinc-300 dark:text-zinc-700">.</span>
                                </h1>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                    className="mt-2 text-xs font-medium tracking-[0.3em] uppercase text-zinc-400 dark:text-zinc-500"
                                >
                                    Portfolio
                                </motion.p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scaleX: 0 }}
                                animate={{ opacity: 1, scaleX: 1 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="w-48 h-[2px] bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden"
                            >
                                <motion.div
                                    className="h-full bg-zinc-900 dark:bg-zinc-100 rounded-full origin-left"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="flex items-center gap-1"
                            >
                                {[0, 1, 2].map((i) => (
                                    <motion.div
                                        key={i}
                                        className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500"
                                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                    />
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isSplashComplete && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
