'use client';

// Hero section with rich animations, typing effect, and interactive elements
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, MapPin, Briefcase, Code2, Terminal, Zap, Coffee, Star, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';

interface HeroProps {
    name?: string;
    tagline?: string;
    avatarUrl?: string;
}

// Typing effect hook
function useTypingEffect(texts: string[], typingSpeed = 80, deletingSpeed = 40, pauseTime = 2000) {
    const [displayText, setDisplayText] = useState('');
    const [textIndex, setTextIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentText = texts[textIndex];

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                if (displayText.length < currentText.length) {
                    setDisplayText(currentText.slice(0, displayText.length + 1));
                } else {
                    setTimeout(() => setIsDeleting(true), pauseTime);
                }
            } else {
                if (displayText.length > 0) {
                    setDisplayText(displayText.slice(0, -1));
                } else {
                    setIsDeleting(false);
                    setTextIndex((prev) => (prev + 1) % texts.length);
                }
            }
        }, isDeleting ? deletingSpeed : typingSpeed);

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, textIndex, texts, typingSpeed, deletingSpeed, pauseTime]);

    return displayText;
}

// Animated counter
function AnimatedCounter({ value, duration = 2 }: { value: string; duration?: number }) {
    const numericValue = parseInt(value.replace(/\D/g, ''));
    const suffix = value.replace(/\d/g, '');
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (isNaN(numericValue)) return;

        let start = 0;
        const end = numericValue;
        const incrementTime = (duration * 1000) / end;

        const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start >= end) clearInterval(timer);
        }, incrementTime);

        return () => clearInterval(timer);
    }, [numericValue, duration]);

    if (isNaN(numericValue)) return <span>{value}</span>;
    return <span>{count}{suffix}</span>;
}

// Code block animation component with typing effect
function CodeBlock() {
    const [visibleLines, setVisibleLines] = useState(0);
    const codeLines = [
        { content: 'const developer = {', color: 'text-purple-400' },
        { content: '  name: "Bagus Hidayat",', color: 'text-zinc-300' },
        { content: '  role: "Full-Stack Developer",', color: 'text-zinc-300' },
        { content: '  skills: ["React", "Next.js", "Node.js"],', color: 'text-green-400' },
        { content: '  passion: "Building amazing UX",', color: 'text-cyan-400' },
        { content: '  available: true,', color: 'text-yellow-400' },
        { content: '};', color: 'text-purple-400' },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setVisibleLines(prev => {
                if (prev >= codeLines.length) return prev;
                return prev + 1;
            });
        }, 300);
        return () => clearInterval(timer);
    }, [codeLines.length]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, rotateY: -10 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="hidden xl:block absolute top-1/4 -right-20 2xl:right-0"
        >
            <motion.div
                whileHover={{ scale: 1.02, rotateY: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                <Card className="bg-zinc-900/90 border-zinc-700/50 backdrop-blur-xl w-96 shadow-2xl shadow-purple-500/5">
                    <CardContent className="p-0">
                        <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800">
                            <motion.div
                                className="w-3 h-3 rounded-full bg-red-500"
                                whileHover={{ scale: 1.2 }}
                            />
                            <motion.div
                                className="w-3 h-3 rounded-full bg-yellow-500"
                                whileHover={{ scale: 1.2 }}
                            />
                            <motion.div
                                className="w-3 h-3 rounded-full bg-green-500"
                                whileHover={{ scale: 1.2 }}
                            />
                            <span className="ml-2 text-xs text-zinc-500 font-mono">developer.ts</span>
                        </div>
                        <div className="p-4 font-mono text-sm">
                            {codeLines.slice(0, visibleLines).map((line, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`${line.color} leading-relaxed`}
                                >
                                    {line.content}
                                </motion.div>
                            ))}
                            <motion.span
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                                className="inline-block w-2 h-4 bg-white/80 ml-1"
                            />
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
}

// Floating tech icons around avatar
function FloatingTechBadges() {
    const techs = [
        { icon: '⚛️', x: -60, y: -40, delay: 0 },
        { icon: '▲', x: 60, y: -50, delay: 0.2 },
        { icon: '📘', x: -70, y: 40, delay: 0.4 },
        { icon: '🟢', x: 70, y: 30, delay: 0.6 },
    ];

    return (
        <>
            {techs.map((tech, i) => (
                <motion.div
                    key={i}
                    className="absolute text-xl"
                    style={{ left: '50%', top: '50%' }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        x: tech.x,
                        y: tech.y,
                    }}
                    transition={{ delay: 1 + tech.delay, type: 'spring' }}
                >
                    <motion.div
                        animate={{
                            y: [0, -8, 0],
                            rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                            duration: 3 + i * 0.5,
                            repeat: Infinity,
                            repeatType: 'reverse',
                        }}
                    >
                        {tech.icon}
                    </motion.div>
                </motion.div>
            ))}
        </>
    );
}

export function Hero({
    name = 'Bagus Hidayat',
    tagline = 'Full-Stack Developer',
    avatarUrl = 'https://picsum.photos/seed/avatar/400/400'
}: HeroProps) {
    const roles = ['Full-Stack Developer', 'React Specialist', 'UI/UX Enthusiast', 'Problem Solver', 'Tech Explorer'];
    const typedText = useTypingEffect(roles);
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
    const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

    const stats = [
        { icon: Briefcase, label: 'Years Experience', value: '3+' },
        { icon: Code2, label: 'Projects Built', value: '50+' },
        { icon: Star, label: 'Happy Clients', value: '30+' },
        { icon: Coffee, label: 'Cups of Coffee', value: '∞' },
    ];

    const techStack = [
        { name: 'React', color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' },
        { name: 'Next.js', color: 'bg-white/10 text-white border-white/20' },
        { name: 'TypeScript', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
        { name: 'Node.js', color: 'bg-green-500/10 text-green-400 border-green-500/20' },
        { name: 'Tailwind', color: 'bg-teal-500/10 text-teal-400 border-teal-500/20' },
        { name: 'PostgreSQL', color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' },
    ];

    return (
        <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden pt-16">
            <motion.div
                style={{ opacity, scale, y }}
                className="container mx-auto px-6 relative z-10"
            >
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-16 mb-12">
                        {/* Avatar with floating effects */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ duration: 0.7, type: 'spring', bounce: 0.4 }}
                            className="relative group"
                        >
                            {/* Animated glow */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-cyan-500/30 rounded-full blur-3xl"
                                animate={{
                                    scale: [1.5, 1.8, 1.5],
                                    opacity: [0.3, 0.5, 0.3],
                                }}
                                transition={{ duration: 3, repeat: Infinity }}
                            />

                            {/* Rotating dashed border */}
                            <motion.div
                                className="absolute -inset-4 rounded-full border-2 border-dashed border-zinc-600/50"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                            />
                            <motion.div
                                className="absolute -inset-8 rounded-full border border-zinc-700/30"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                            />

                            {/* Pulsing rings */}
                            <motion.div
                                className="absolute -inset-2 rounded-full border border-purple-500/30"
                                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />

                            {/* Avatar */}
                            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring' }}>
                                <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-zinc-800 shadow-2xl relative z-10">
                                    <AvatarImage src={avatarUrl} alt={name} className="object-cover" />
                                    <AvatarFallback className="text-4xl bg-gradient-to-br from-zinc-800 to-zinc-900">
                                        {name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                </Avatar>
                            </motion.div>

                            {/* Floating tech badges */}
                            <FloatingTechBadges />

                            {/* Status indicator */}
                            <motion.div
                                className="absolute -bottom-2 -right-2 z-20"
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.8, type: 'spring', bounce: 0.5 }}
                            >
                                <motion.div
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/20 border border-green-500/30 backdrop-blur-sm"
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                    </span>
                                    <span className="text-xs text-green-400 font-medium">Available</span>
                                </motion.div>
                            </motion.div>
                        </motion.div>

                        {/* Text Content */}
                        <div className="flex-1 text-center lg:text-left">
                            {/* Greeting with wave */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="flex items-center justify-center lg:justify-start gap-2 mb-4"
                            >
                                <motion.span
                                    animate={{ rotate: [0, 20, -10, 20, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                                    className="text-3xl origin-bottom-right"
                                >
                                    👋
                                </motion.span>
                                <span className="text-zinc-400 text-lg">Hey there! I&apos;m</span>
                            </motion.div>

                            {/* Name with gradient */}
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, type: 'spring' }}
                                className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4"
                            >
                                <motion.span
                                    className="bg-gradient-to-r from-white via-zinc-300 to-zinc-500 bg-clip-text text-transparent inline-block"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    {name}
                                </motion.span>
                            </motion.h1>

                            {/* Typing Effect */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="flex items-center justify-center lg:justify-start gap-2 text-xl md:text-2xl text-zinc-400 mb-6 h-8"
                            >
                                <motion.div
                                    animate={{ rotate: [0, 360] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                                >
                                    <Terminal className="h-5 w-5 text-purple-400" />
                                </motion.div>
                                <span className="font-mono">{typedText}</span>
                                <motion.span
                                    animate={{ opacity: [1, 0] }}
                                    transition={{ duration: 0.5, repeat: Infinity }}
                                    className="w-0.5 h-6 bg-purple-400"
                                />
                            </motion.div>

                            {/* Location & Status */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-zinc-500 mb-8"
                            >
                                <motion.div
                                    className="flex items-center gap-1.5"
                                    whileHover={{ scale: 1.05, color: '#fff' }}
                                >
                                    <MapPin className="h-4 w-4" />
                                    <span>Indonesia</span>
                                </motion.div>
                                <div className="h-1 w-1 rounded-full bg-zinc-700" />
                                <motion.div
                                    className="flex items-center gap-1.5"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <motion.div
                                        animate={{ rotate: [0, 15, -15, 0] }}
                                        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                                    >
                                        <Zap className="h-4 w-4 text-yellow-500" />
                                    </motion.div>
                                    <span>Open to opportunities</span>
                                </motion.div>
                            </motion.div>

                            {/* Tech Stack Badges */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-8"
                            >
                                {techStack.map((tech, i) => (
                                    <motion.div
                                        key={tech.name}
                                        initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                        transition={{ delay: 0.7 + i * 0.08, type: 'spring', bounce: 0.4 }}
                                        whileHover={{
                                            scale: 1.1,
                                            y: -5,
                                            transition: { type: 'spring', stiffness: 400 }
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Badge className={`${tech.color} border cursor-pointer`}>
                                            {tech.name}
                                        </Badge>
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* CTA Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button asChild size="lg" className="gap-2 px-8 bg-white text-black hover:bg-zinc-200 group relative overflow-hidden">
                                        <Link href="/projects">
                                            <motion.span
                                                className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20"
                                                initial={{ x: '-100%' }}
                                                whileHover={{ x: '100%' }}
                                                transition={{ duration: 0.5 }}
                                            />
                                            <span className="relative flex items-center gap-2">
                                                View My Work
                                                <motion.span
                                                    animate={{ x: [0, 5, 0] }}
                                                    transition={{ duration: 1, repeat: Infinity }}
                                                >
                                                    <ArrowRight className="h-4 w-4" />
                                                </motion.span>
                                            </span>
                                        </Link>
                                    </Button>
                                </motion.div>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button asChild variant="outline" size="lg" className="gap-2 border-zinc-700 hover:bg-zinc-800/50 backdrop-blur-sm">
                                        <a href="mailto:hello@example.com">
                                            <Mail className="h-4 w-4" />
                                            Get in Touch
                                        </a>
                                    </Button>
                                </motion.div>
                                <div className="flex items-center gap-2">
                                    {[
                                        { icon: Github, href: 'https://github.com' },
                                        { icon: Linkedin, href: 'https://linkedin.com' },
                                    ].map((social, i) => (
                                        <motion.a
                                            key={social.href}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2.5 rounded-full border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 transition-all"
                                            whileHover={{ scale: 1.2, y: -3, rotate: 5 }}
                                            whileTap={{ scale: 0.9 }}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 1 + i * 0.1 }}
                                        >
                                            <social.icon className="h-5 w-5" />
                                        </motion.a>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Stats Row */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4"
                    >
                        {stats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ delay: 1.2 + i * 0.1, type: 'spring' }}
                                whileHover={{
                                    y: -8,
                                    scale: 1.02,
                                    transition: { type: 'spring', stiffness: 400 }
                                }}
                            >
                                <Card className="bg-zinc-900/40 border-zinc-800/50 backdrop-blur-sm hover:border-zinc-700/50 hover:bg-zinc-900/60 transition-all cursor-pointer group">
                                    <CardContent className="p-4 flex items-center gap-3">
                                        <motion.div
                                            className="p-2 rounded-lg bg-zinc-800/50 group-hover:bg-zinc-700/50 transition-colors"
                                            whileHover={{ rotate: [0, -10, 10, 0] }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <stat.icon className="h-5 w-5 text-zinc-400 group-hover:text-zinc-200 transition-colors" />
                                        </motion.div>
                                        <div>
                                            <div className="text-2xl font-bold">
                                                <AnimatedCounter value={stat.value} />
                                            </div>
                                            <div className="text-xs text-zinc-500">{stat.label}</div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                <CodeBlock />

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <motion.span
                        className="text-xs text-zinc-500 uppercase tracking-widest"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        Scroll to explore
                    </motion.span>
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="p-2 rounded-full border border-zinc-800 hover:border-zinc-600 transition-colors cursor-pointer"
                    >
                        <ArrowDown className="h-4 w-4 text-zinc-500" />
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
}
