'use client';

import { motion } from 'framer-motion';

export function NoiseOverlay() {
    return (
        <div
            className="fixed inset-0 pointer-events-none opacity-[0.015] dark:opacity-[0.025] z-0"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
        />
    );
}

export function MinimalGrid() {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            <div
                className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
                style={{
                    backgroundImage: `radial-gradient(circle, rgb(0 0 0 / 1) 1px, transparent 1px)`,
                    backgroundSize: '24px 24px',
                }}
            />
            <div
                className="absolute inset-0 opacity-0 dark:opacity-[0.05]"
                style={{
                    backgroundImage: `radial-gradient(circle, rgb(255 255 255 / 1) 1px, transparent 1px)`,
                    backgroundSize: '24px 24px',
                }}
            />
        </div>
    );
}

export function GradientAccent() {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            <motion.div
                className="absolute -top-[30%] -right-[20%] w-[800px] h-[800px] rounded-full blur-[100px] transform-gpu"
                style={{
                    background: 'radial-gradient(circle, rgba(0,0,0,0.03) 0%, transparent 70%)',
                }}
                animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.15, 0.2, 0.15],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                }}
            />
            <motion.div
                className="absolute -top-[30%] -right-[20%] w-[800px] h-[800px] rounded-full blur-[100px] opacity-0 dark:opacity-100 transform-gpu"
                style={{
                    background: 'radial-gradient(circle, rgba(100,100,255,0.08) 0%, transparent 70%)',
                }}
                animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0, 0, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                }}
            />

            <motion.div
                className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] rounded-full blur-[80px] transform-gpu"
                style={{
                    background: 'radial-gradient(circle, rgba(0,0,0,0.02) 0%, transparent 70%)',
                }}
                animate={{
                    scale: [1, 1.08, 1],
                    opacity: [0.1, 0.15, 0.1],
                }}
                transition={{
                    duration: 14,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                }}
            />
            <motion.div
                className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] rounded-full blur-[80px] opacity-0 dark:opacity-100 transform-gpu"
                style={{
                    background: 'radial-gradient(circle, rgba(150,100,255,0.06) 0%, transparent 70%)',
                }}
                animate={{
                    scale: [1, 1.08, 1],
                    opacity: [0, 0, 0],
                }}
                transition={{
                    duration: 14,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                }}
            />
        </div>
    );
}

export function AnimatedBackground() {
    return (
        <>
            <MinimalGrid />
            <NoiseOverlay />
        </>
    );
}

export { NoiseOverlay as Noise, MinimalGrid as Grid };
