'use client';

// Animated background with rich effects - grid, particles, orbs, and glow
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';

// Animated grid with pulse effect
export function GridBackground() {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />

            {/* Animated grid */}
            <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
                    backgroundSize: '50px 50px',
                }}
            />

            {/* Pulsing grid lines */}
            <motion.div
                className="absolute inset-0"
                style={{
                    backgroundImage: `
            linear-gradient(to right, rgba(139,92,246,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(139,92,246,0.03) 1px, transparent 1px)
          `,
                    backgroundSize: '100px 100px',
                }}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Large gradient orbs */}
            <motion.div
                className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] bg-gradient-to-r from-purple-500/20 to-blue-500/10 rounded-full blur-[120px]"
                animate={{
                    x: [0, 150, 0],
                    y: [0, 80, 0],
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                }}
            />
            <motion.div
                className="absolute bottom-[-10%] right-[5%] w-[500px] h-[500px] bg-gradient-to-r from-cyan-500/15 to-teal-500/10 rounded-full blur-[100px]"
                animate={{
                    x: [0, -120, 0],
                    y: [0, -100, 0],
                    scale: [1, 1.4, 1],
                    opacity: [0.25, 0.4, 0.25],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                }}
            />
            <motion.div
                className="absolute top-[40%] right-[20%] w-[400px] h-[400px] bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-full blur-[100px]"
                animate={{
                    x: [0, 60, 0],
                    y: [0, -40, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                }}
            />

            {/* Scanning line effect */}
            <motion.div
                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"
                initial={{ top: '0%' }}
                animate={{ top: ['0%', '100%'] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
        </div>
    );
}

// Enhanced floating particles with varying sizes and colors
export function FloatingParticles() {
    const [particles, setParticles] = useState<Array<{
        id: number;
        x: number;
        y: number;
        size: number;
        duration: number;
        color: string;
    }>>([]);

    useEffect(() => {
        const colors = ['rgba(255,255,255,0.3)', 'rgba(139,92,246,0.3)', 'rgba(6,182,212,0.3)', 'rgba(236,72,153,0.2)'];
        const newParticles = Array.from({ length: 40 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 1,
            duration: Math.random() * 10 + 8,
            color: colors[Math.floor(Math.random() * colors.length)],
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: particle.size,
                        height: particle.size,
                        backgroundColor: particle.color,
                        boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
                    }}
                    animate={{
                        y: [0, -40, 0],
                        x: [0, Math.random() * 30 - 15, 0],
                        opacity: [0.2, 0.8, 0.2],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        delay: Math.random() * 3,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    );
}

// Mouse glow with trail effect
export function MouseGlow() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 100 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX - 250);
            mouseY.set(e.clientY - 250);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <>
            <motion.div
                className="fixed w-[500px] h-[500px] pointer-events-none z-0"
                style={{
                    x,
                    y,
                    background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, rgba(6,182,212,0.04) 40%, transparent 70%)',
                }}
            />
            <motion.div
                className="fixed w-[300px] h-[300px] pointer-events-none z-0"
                style={{
                    x: useSpring(mouseX, { damping: 15, stiffness: 150 }),
                    y: useSpring(mouseY, { damping: 15, stiffness: 150 }),
                    background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 60%)',
                    marginLeft: 100,
                    marginTop: 100,
                }}
            />
        </>
    );
}

// Shooting stars effect
export function ShootingStars() {
    const [stars, setStars] = useState<Array<{ id: number; delay: number; duration: number; top: number }>>([]);

    useEffect(() => {
        const newStars = Array.from({ length: 5 }, (_, i) => ({
            id: i,
            delay: i * 4 + Math.random() * 2,
            duration: 1 + Math.random() * 0.5,
            top: 10 + Math.random() * 40,
        }));
        setStars(newStars);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {stars.map((star) => (
                <motion.div
                    key={star.id}
                    className="absolute h-px bg-gradient-to-r from-transparent via-white to-transparent"
                    style={{ top: `${star.top}%`, width: '150px' }}
                    initial={{ left: '-10%', opacity: 0 }}
                    animate={{
                        left: ['0%', '110%'],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: star.duration,
                        repeat: Infinity,
                        repeatDelay: star.delay + 10,
                        ease: 'easeOut',
                    }}
                />
            ))}
        </div>
    );
}

// Floating shapes
export function FloatingShapes() {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {/* Rotating rings */}
            <motion.div
                className="absolute top-[15%] left-[8%] w-20 h-20 border border-zinc-700/30 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
                className="absolute top-[15%] left-[8%] w-28 h-28 border border-zinc-700/20 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            />

            {/* Floating dots */}
            <motion.div
                className="absolute top-[25%] right-[15%] w-2 h-2 bg-purple-500/50 rounded-full"
                animate={{ y: [-10, 10, -10], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
                className="absolute top-[60%] left-[12%] w-3 h-3 bg-cyan-500/40 rounded-full"
                animate={{ y: [10, -10, 10], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
                className="absolute top-[70%] right-[8%] w-2 h-2 bg-pink-500/40 rounded-full"
                animate={{ y: [-15, 15, -15], x: [-5, 5, -5] }}
                transition={{ duration: 5, repeat: Infinity }}
            />

            {/* Pulsing circles */}
            <motion.div
                className="absolute bottom-[20%] left-[20%] w-4 h-4 border border-zinc-600/30 rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
            />
        </div>
    );
}

// Noise overlay for texture
export function NoiseOverlay() {
    return (
        <div
            className="fixed inset-0 pointer-events-none opacity-[0.02] z-50"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
        />
    );
}

// Combined animated background
export function AnimatedBackground() {
    return (
        <>
            <GridBackground />
            <FloatingParticles />
            <FloatingShapes />
            <ShootingStars />
            <MouseGlow />
            <NoiseOverlay />
        </>
    );
}
