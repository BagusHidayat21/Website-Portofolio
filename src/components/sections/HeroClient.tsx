'use client';

// Bold, High-Impact Hero Section - Monochrome Redesign
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowDownRight, Github, Linkedin, Mail, Send, MousePointer2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { useRef } from 'react';
import { TechStack } from '@prisma/client';

interface HeroClientProps {
    name: string;
    tagline: string;
    bio: string;
    avatarUrl?: string | null;
    yearsCoding: number;
    projectsCount: number;
    githubUrl?: string | null;
    linkedinUrl?: string | null;
    email: string;
    location: string;
    marqueeTech: TechStack[];
}

// Infinite text marquee for tech stack
function TechMarquee({ tech }: { tech: TechStack[] }) {
    if (tech.length === 0) return null;

    // Duplicate list for infinite loop
    const displayTech = [...tech, ...tech, ...tech, ...tech];

    return (
        <div className="w-full overflow-hidden border-y border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 py-4 absolute bottom-0 left-0 z-20">
            <motion.div
                className="flex whitespace-nowrap gap-16"
                animate={{ x: [0, -1000] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
                {displayTech.map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                        <span className="text-sm font-bold tracking-widest text-zinc-900 dark:text-zinc-100 uppercase">{item.name}</span>
                        <div className="w-1.5 h-1.5 bg-zinc-300 dark:bg-zinc-600 rounded-full" />
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

export function HeroClient({
    name,
    tagline,
    bio,
    avatarUrl,
    yearsCoding,
    projectsCount,
    githubUrl,
    linkedinUrl,
    email,
    location,
    marqueeTech
}: HeroClientProps) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    // Split bio to highlight role? Or just use as is. 
    // The design had custom structure, I'll adapt to use standard text but try to keep bolding if possible or simplify.
    // For now simple regex to bold "Full Stack Web Developer" if present might be overkill, let's just render bio.

    return (
        <section ref={containerRef} className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden bg-zinc-50 dark:bg-zinc-900 pt-20 pb-20">
            {/* Background Grid - Minimalist */}
            {/* Background Grid - Minimalist */}
            <div className="absolute inset-0 z-0 opacity-[0.03] dark:hidden"
                style={{
                    backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />
            <div className="absolute inset-0 z-0 hidden dark:block opacity-[0.05]"
                style={{
                    backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            <motion.div
                style={{ y, opacity }}
                className="container mx-auto px-6 relative z-10 grid lg:grid-cols-12 gap-12 items-center"
            >
                {/* Main Typography Content - Left Side */}
                <div className="lg:col-span-8 flex flex-col justify-center">

                    {/* Status Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 shadow-sm dark:shadow-zinc-950/50">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 dark:bg-green-500 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 dark:bg-green-400"></span>
                            </span>
                            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">Available for work</span>
                        </div>
                    </motion.div>

                    {/* Bold Headline */}
                    <div className="relative mb-8">
                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            className="text-4xl md:text-8xl lg:text-8xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100 leading-[0.9]"
                        >
                            {/* Split tagline for effect if it's 2 words, otherwise just display */}
                            {tagline.split(' ').slice(0, 2).join(' ').toUpperCase()}
                            <br />
                            <span className="text-zinc-400 dark:text-zinc-500">{tagline.split(' ').slice(2).join(' ').toUpperCase()}</span>
                        </motion.h1>

                        {/* Decorative element next to title */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, type: "spring" }}
                            className="absolute -top-12 right-0 hidden lg:block"
                        >
                            <MousePointer2 className="w-12 h-12 text-zinc-900 dark:text-zinc-100 -rotate-12" />
                            <div className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs px-2 py-1 rounded absolute top-8 left-6 whitespace-nowrap">
                                Code + Scale
                            </div>
                        </motion.div>
                    </div>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-2xl font-medium leading-relaxed mb-10"
                    >
                        {bio}
                    </motion.p>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="flex flex-wrap items-center gap-5"
                    >
                        <Button size="lg" className="h-14 px-8 text-base rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 hover:scale-105 transition-all shadow-xl shadow-zinc-900/10 dark:shadow-zinc-950/50">
                            <Link href="/projects" className="flex items-center gap-2">
                                View Selected Work
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="h-14 px-8 text-base rounded-full border-2 border-zinc-200 dark:border-zinc-700 hover:border-zinc-900 dark:hover:border-zinc-300 hover:bg-transparent dark:hover:bg-transparent transition-all">
                            <a href={`mailto:${email}`} className="flex items-center gap-2">
                                Contact Me
                                <Send className="w-4 h-4" />
                            </a>
                        </Button>
                    </motion.div>
                </div>

                {/* Visual/Stats Column - Right Side */}
                <div className="lg:col-span-4 relative flex flex-col justify-end items-start lg:items-end mt-12 lg:mt-0">

                    {/* Large Profile Image / Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 3 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="relative z-10 w-full max-w-sm ml-auto"
                    >
                        <div className="relative aspect-[4/5] bg-zinc-100 dark:bg-zinc-800 rounded-2xl overflow-hidden border-2 border-zinc-900 dark:border-zinc-100 shadow-[16px_16px_0px_0px_rgba(24,24,27,1)] dark:shadow-[16px_16px_0px_0px_rgba(244,244,245,1)]">
                            <Avatar className="w-full h-full rounded-none">
                                <AvatarImage src={avatarUrl || ''} alt={name} className="object-cover" />
                                <AvatarFallback className="text-9xl font-black bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 rounded-none w-full h-full flex items-center justify-center">
                                    {name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                </AvatarFallback>
                            </Avatar>

                            {/* Floating Card Overlay */}
                            <div className="absolute bottom-6 left-6 right-6 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md p-4 border border-zinc-200 dark:border-zinc-700 shadow-lg dark:shadow-zinc-950/50">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <p className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Based in</p>
                                        <p className="font-bold text-zinc-900 dark:text-zinc-100">{location}</p>
                                    </div>
                                    <ArrowDownRight className="w-5 h-5 text-zinc-900 dark:text-zinc-100" />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Big Numbers Stats */}
                    <div className="absolute -left-20 top-20 hidden xl:flex flex-col gap-8 z-0">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 }}
                            className="text-right"
                        >
                            <h3 className="text-6xl font-black stroke-text tracking-tighter dark:text-transparent"
                                style={{ WebkitTextStroke: '1px #d4d4d8', color: 'transparent' }}>
                                {yearsCoding.toString().padStart(2, '0')}
                            </h3>
                            <p className="text-xs font-bold text-zinc-400 dark:text-zinc-500 tracking-widest mt-1">YEARS CODING</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.0 }}
                            className="text-right"
                        >
                            <h3 className="text-6xl font-black stroke-text tracking-tighter dark:text-transparent"
                                style={{ WebkitTextStroke: '1px #d4d4d8', color: 'transparent' }}>
                                {projectsCount}+
                            </h3>
                            <p className="text-xs font-bold text-zinc-400 dark:text-zinc-500 tracking-widest mt-1">PROJECTS</p>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Social Links Fixed on Left */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="hidden lg:flex flex-col gap-6 absolute left-10 bottom-32 z-20"
            >
                <div className="w-px h-20 bg-zinc-300 dark:bg-zinc-700 mx-auto" />
                {githubUrl && (
                    <a href={githubUrl} className="p-2 text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:scale-110 transition-all">
                        <Github className="w-5 h-5" />
                    </a>
                )}
                {linkedinUrl && (
                    <a href={linkedinUrl} className="p-2 text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:scale-110 transition-all">
                        <Linkedin className="w-5 h-5" />
                    </a>
                )}
                <a href={`mailto:${email}`} className="p-2 text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:scale-110 transition-all">
                    <Mail className="w-5 h-5" />
                </a>
            </motion.div>

            {/* Scroll Indicator */}
            <TechMarquee tech={marqueeTech} />
        </section>
    );
}
