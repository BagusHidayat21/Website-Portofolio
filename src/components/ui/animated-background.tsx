'use client';

// Minimal, elegant background with subtle texture
import { motion } from 'framer-motion';

// Subtle noise texture overlay
export function NoiseOverlay() {
    return (
        <div
            className="fixed inset-0 pointer-events-none opacity-[0.015] z-0"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
        />
    );
}

// Minimal grid pattern - very subtle
export function MinimalGrid() {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {/* Subtle dot pattern */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
                    backgroundSize: '24px 24px',
                }}
            />
        </div>
    );
}

// Elegant gradient accent - very subtle, positioned
export function GradientAccent() {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {/* Top-right subtle gradient */}
            <motion.div
                className="absolute -top-[30%] -right-[20%] w-[800px] h-[800px] rounded-full blur-[150px] opacity-20"
                style={{
                    background: 'radial-gradient(circle, rgba(0,0,0,0.03) 0%, transparent 70%)',
                }}
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.15, 0.2, 0.15],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                }}
            />

            {/* Bottom-left subtle gradient */}
            <motion.div
                className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] rounded-full blur-[120px] opacity-15"
                style={{
                    background: 'radial-gradient(circle, rgba(0,0,0,0.02) 0%, transparent 70%)',
                }}
                animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.1, 0.15, 0.1],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                }}
            />
        </div>
    );
}

// Clean animated background - minimal for professional look
export function AnimatedBackground() {
    return (
        <>
            <MinimalGrid />
            <NoiseOverlay />
        </>
    );
}

// Export individual components for flexibility
export { NoiseOverlay as Noise, MinimalGrid as Grid };
