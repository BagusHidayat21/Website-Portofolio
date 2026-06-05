'use client';

// Bold, High-Impact Hero Section - Monochrome Redesign with Premium Parallax
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { ArrowRight, ArrowDownRight, Github, Linkedin, Mail, Send, MousePointer2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { useRef } from 'react';
import { TechStack } from '@/data/static-db';

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
    isAvailableForWork: boolean;
}

// Smooth spring config for premium feel
const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };

// Custom hook for parallax layer with spring smoothing
function useParallaxLayer(scrollYProgress: MotionValue<number>, yRange: [number, number], opacityRange?: [number, number]) {
    const y = useTransform(scrollYProgress, [0, 1], yRange);
    const smoothY = useSpring(y, springConfig);
    const opacity = opacityRange
        ? useSpring(useTransform(scrollYProgress, [opacityRange[0], opacityRange[1]], [1, 0]), springConfig)
        : undefined;
    return { y: smoothY, opacity };
}

// Floating particle component for depth
function FloatingParticle({
    size,
    initialX,
    initialY,
    scrollY,
    speed = 1,
    delay = 0
}: {
    size: number;
    initialX: string;
    initialY: string;
    scrollY: MotionValue<number>;
    speed?: number;
    delay?: number;
}) {
    const y = useTransform(scrollY, [0, 1], [0, 200 * speed]);
    const smoothY = useSpring(y, springConfig);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.4, scale: 1 }}
            transition={{ duration: 1.5, delay }}
            style={{
                y: smoothY,
                left: initialX,
                top: initialY,
                width: size,
                height: size,
            }}
            className="absolute rounded-full bg-gradient-to-br from-zinc-400/30 to-zinc-600/20 dark:from-zinc-500/20 dark:to-zinc-300/10 blur-sm pointer-events-none"
        />
    );
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
    marqueeTech,
    isAvailableForWork
}: HeroClientProps) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });

    // Multi-layer parallax transforms with different speeds for depth
    // Background layer - slowest movement
    const bgY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 100]), springConfig);
    const bgScale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 1.1]), springConfig);
    const bgOpacity = useSpring(useTransform(scrollYProgress, [0, 0.5], [0.06, 0.02]), springConfig);

    // Content layer - medium movement
    const contentY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 80]), springConfig);
    const contentOpacity = useSpring(useTransform(scrollYProgress, [0.6, 1], [1, 0]), springConfig);

    // Profile card layer - faster movement (foreground effect)
    const cardY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 120]), springConfig);
    const cardRotate = useSpring(useTransform(scrollYProgress, [0, 1], [3, -5]), springConfig);
    const cardScale = useSpring(useTransform(scrollYProgress, [0, 0.5], [1, 0.95]), springConfig);

    // Stats layer - subtle floating effect
    const statsY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 60]), springConfig);

    // Social links - slowest for anchored feel
    const socialY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 30]), springConfig);
    const socialOpacity = useSpring(useTransform(scrollYProgress, [0.7, 1], [1, 0]), springConfig);

    // Decorative elements - varied speeds for visual interest
    const decorY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 150]), springConfig);
    const decorRotate = useSpring(useTransform(scrollYProgress, [0, 1], [-12, 20]), springConfig);
    const decorScale = useSpring(useTransform(scrollYProgress, [0, 0.3], [1, 1.2]), springConfig);

    // Badge layer - slight movement
    const badgeY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 40]), springConfig);

    // Gradient orbs for premium visual depth
    const orbLeftY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 80]), springConfig);
    const orbRightY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 120]), springConfig);

    return (
        <section ref={containerRef} className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden bg-zinc-50 dark:bg-zinc-950 pt-24 pb-32 lg:py-20">
            {/* Floating Particles for Depth - Desktop Only */}
            <div className="hidden lg:block">
                <FloatingParticle size={120} initialX="10%" initialY="20%" scrollY={scrollYProgress} speed={0.5} delay={0.2} />
                <FloatingParticle size={80} initialX="85%" initialY="15%" scrollY={scrollYProgress} speed={0.8} delay={0.4} />
                <FloatingParticle size={60} initialX="75%" initialY="60%" scrollY={scrollYProgress} speed={1.2} delay={0.6} />
                <FloatingParticle size={100} initialX="5%" initialY="70%" scrollY={scrollYProgress} speed={0.6} delay={0.3} />
                <FloatingParticle size={40} initialX="50%" initialY="80%" scrollY={scrollYProgress} speed={1.5} delay={0.5} />
                <FloatingParticle size={90} initialX="30%" initialY="10%" scrollY={scrollYProgress} speed={0.7} delay={0.1} />
            </div>

            {/* Background Grid - Parallax Layer (Slowest) */}
            <motion.div
                className="absolute inset-0 z-0 dark:hidden pointer-events-none"
                style={{
                    y: bgY,
                    scale: bgScale,
                    opacity: bgOpacity,
                    backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />
            <motion.div
                className="absolute inset-0 z-0 hidden dark:block pointer-events-none"
                style={{
                    y: bgY,
                    scale: bgScale,
                    opacity: bgOpacity,
                    backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Gradient Orbs for Premium Feel */}
            <motion.div
                className="absolute top-1/4 -left-32 w-96 h-96 bg-gradient-to-br from-zinc-200/40 to-transparent dark:from-zinc-700/20 rounded-full blur-3xl pointer-events-none"
                style={{ y: orbLeftY }}
            />
            <motion.div
                className="absolute bottom-1/4 -right-32 w-80 h-80 bg-gradient-to-tl from-zinc-300/30 to-transparent dark:from-zinc-600/15 rounded-full blur-3xl pointer-events-none"
                style={{ y: orbRightY }}
            />

            {/* Main Content - Medium Parallax Speed */}
            <motion.div
                style={{ y: contentY, opacity: contentOpacity }}
                className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-8 relative z-10 grid lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center"
            >
                {/* Main Typography Content - Left Side */}
                <div className="lg:col-span-8 flex flex-col justify-center">

                    {/* Status Badge - Slight Parallax */}
                    {isAvailableForWork && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            style={{ y: badgeY }}
                            className="mb-6 lg:mb-8"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 shadow-sm dark:shadow-zinc-950/50">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 dark:bg-green-500 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 dark:bg-green-400"></span>
                                </span>
                                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">Available for work</span>
                            </div>
                        </motion.div>
                    )}

                    {/* Greeting / Name */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mb-3 lg:mb-4 flex items-center gap-3"
                    >
                        <div className="h-[2px] w-8 bg-zinc-900 dark:bg-zinc-100" />
                        <span className="text-base sm:text-lg 2xl:text-2xl font-medium text-zinc-600 dark:text-zinc-400">
                            Hi, I&apos;m <span className="text-zinc-900 dark:text-zinc-100 font-bold">{name || "Bagus Hidayat"}</span>
                        </span>
                    </motion.div>

                    {/* Bold Headline */}
                    <div className="relative mb-6 lg:mb-8">
                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            className="text-5xl sm:text-6xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100 leading-[0.95]"
                        >
                            {/* Split tagline for effect */}
                            {tagline.split(' ').slice(0, 2).join(' ').toUpperCase()}
                            <br />
                            <span className="text-zinc-900 dark:text-zinc-400">{tagline.split(' ').slice(2).join(' ').toUpperCase()}</span>
                        </motion.h1>

                        {/* Decorative element - Fastest Parallax for Depth */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            style={{
                                y: decorY,
                                rotate: decorRotate,
                                scale: decorScale
                            }}
                            className="absolute -top-6 right-0 sm:-top-8 sm:right-4 md:-top-12 md:right-0 xl:-top-12 xl:right-8 2xl:-top-16 2xl:right-1 block"
                        >
                            <MousePointer2 className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-10 lg:h-10 xl:w-12 xl:h-12 2xl:w-12 2xl:h-12 text-zinc-900 dark:text-zinc-100" />
                            <div className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-[10px] sm:text-[11px] md:text-xs lg:text-[10px] xl:text-sm 2xl:text-xs px-2 py-1 rounded absolute top-8 right-0 md:top-8 md:left-6 md:right-auto xl:top-12 xl:left-8 2xl:top-10 2xl:left-8 whitespace-nowrap">
                                Code + Scale
                            </div>
                        </motion.div>
                    </div>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="text-base sm:text-lg md:text-xl 2xl:text-2xl text-zinc-600 dark:text-zinc-400 max-w-2xl font-medium leading-relaxed mb-8 lg:mb-10"
                    >
                        {bio}
                    </motion.p>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="flex flex-wrap items-center gap-4 lg:gap-5"
                    >
                        <Button size="lg" className="h-12 px-6 text-sm rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 hover:scale-105 transition-all shadow-xl shadow-zinc-900/10 dark:shadow-zinc-950/50">
                            <Link href="/projects" className="flex items-center gap-2">
                                View Work
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="h-12 px-6 text-sm rounded-full border-2 border-zinc-200 dark:border-zinc-700 hover:border-zinc-900 dark:hover:border-zinc-300 hover:bg-transparent dark:hover:bg-transparent transition-all">
                            <Link href={`mailto:${email}`} className="flex items-center gap-2">
                                Contact
                                <Send className="w-4 h-4" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>

                {/* Visual/Stats Column */}
                <div className="lg:col-span-4 relative flex flex-col justify-end items-start lg:items-end mt-8 lg:mt-0">

                    {/* Big Numbers Stats - 2xl Desktop with Parallax */}
                    <motion.div
                        className="hidden 2xl:flex flex-col gap-12 absolute -left-32 top-1/2 -translate-y-1/2 z-0"
                        style={{ y: statsY }}
                    >
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 }}
                            className="text-center"
                        >
                            <h3 className="text-7xl font-black stroke-text tracking-tighter dark:text-transparent"
                                style={{ WebkitTextStroke: '1px #d4d4d8', color: 'transparent' }}>
                                {yearsCoding.toString().padStart(2, '0')}
                            </h3>
                            <p className="text-sm font-bold text-zinc-400 dark:text-zinc-500 tracking-widest mt-1">YEARS CODING</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.0 }}
                            className="text-center"
                        >
                            <h3 className="text-7xl font-black stroke-text tracking-tighter dark:text-transparent"
                                style={{ WebkitTextStroke: '1px #d4d4d8', color: 'transparent' }}>
                                {projectsCount}+
                            </h3>
                            <p className="text-sm font-bold text-zinc-400 dark:text-zinc-500 tracking-widest mt-1">PROJECTS</p>
                        </motion.div>
                    </motion.div>

                    {/* Large Profile Image / Card - Foreground Parallax with 3D Transform */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 3 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        style={{
                            y: cardY,
                            rotate: cardRotate,
                            scale: cardScale,
                            transformPerspective: 1000
                        }}
                        className="relative z-10 w-full max-w-sm xl:max-w-xs 2xl:max-w-sm ml-auto"
                    >
                        <div className="relative aspect-[4/5] bg-zinc-100 dark:bg-zinc-800 rounded-2xl overflow-hidden border-2 border-zinc-900 dark:border-zinc-100 shadow-[12px_12px_0px_0px_rgba(24,24,27,1)] md:shadow-[16px_16px_0px_0px_rgba(24,24,27,1)] dark:shadow-[12px_12px_0px_0px_rgba(244,244,245,1)] dark:md:shadow-[16px_16px_0px_0px_rgba(244,244,245,1)] transition-shadow duration-500 hover:shadow-[16px_16px_0px_0px_rgba(24,24,27,1)] hover:md:shadow-[24px_24px_0px_0px_rgba(24,24,27,1)] dark:hover:shadow-[16px_16px_0px_0px_rgba(244,244,245,1)] dark:hover:md:shadow-[24px_24px_0px_0px_rgba(244,244,245,1)]">
                            <Avatar className="w-full h-full rounded-none">
                                <AvatarImage src={avatarUrl || ''} alt={name} className="object-cover" />
                                <AvatarFallback className="text-9xl font-black bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 rounded-none w-full h-full flex items-center justify-center">
                                    Hi, I&apos;m {name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                </AvatarFallback>
                            </Avatar>

                            {/* Floating Card Overlay */}
                            <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md p-3 md:p-4 border border-zinc-200 dark:border-zinc-700 shadow-lg dark:shadow-zinc-950/50">
                                <div className="flex justify-between items-start mb-1 md:mb-2">
                                    <div>
                                        <p className="text-[10px] md:text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Based in</p>
                                        <p className="text-sm md:text-base font-bold text-zinc-900 dark:text-zinc-100">{location}</p>
                                    </div>
                                    <ArrowDownRight className="w-4 h-4 md:w-5 md:h-5 text-zinc-900 dark:text-zinc-100" />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Big Numbers Stats - Mobile/Tablet with Parallax */}
                    <motion.div
                        className="mt-8 w-full flex flex-row justify-between lg:justify-between gap-4 lg:gap-8 z-0 2xl:hidden"
                        style={{ y: statsY }}
                    >
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 }}
                            className="text-center xl:text-center"
                        >
                            <h3 className="text-5xl sm:text-6xl lg:text-5xl xl:text-7xl font-black tracking-tighter"
                                style={{ WebkitTextStroke: '1px #d4d4d8', color: 'transparent' }}>
                                {yearsCoding.toString().padStart(2, '0')}
                            </h3>
                            <p className="text-[10px] sm:text-xs font-bold text-zinc-400 dark:text-zinc-500 tracking-widest mt-1">YEARS CODING</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.0 }}
                            className="text-center xl:text-center"
                        >
                            <h3 className="text-5xl sm:text-6xl lg:text-5xl xl:text-7xl font-black tracking-tighter"
                                style={{ WebkitTextStroke: '1px #d4d4d8', color: 'transparent' }}>
                                {projectsCount}+
                            </h3>
                            <p className="text-[10px] sm:text-xs font-bold text-zinc-400 dark:text-zinc-500 tracking-widest mt-1">PROJECTS</p>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Social Links Fixed on Left - Anchored Parallax */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                style={{ y: socialY, opacity: socialOpacity }}
                className="hidden lg:flex flex-col gap-6 absolute left-6 xl:left-10 bottom-32 z-20"
            >
                <div className="w-px h-20 bg-zinc-300 dark:bg-zinc-700 mx-auto" />
                {githubUrl && (
                    <Link href={githubUrl} className="p-2 text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:scale-110 transition-all">
                        <Github className="w-5 h-5" />
                    </Link>
                )}
                {linkedinUrl && (
                    <Link href={linkedinUrl} className="p-2 text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:scale-110 transition-all">
                        <Linkedin className="w-5 h-5" />
                    </Link>
                )}
                <Link href={`mailto:${email}`} className="p-2 text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:scale-110 transition-all">
                    <Mail className="w-5 h-5" />
                </Link>
            </motion.div>

            {/* Tech Marquee */}
            <TechMarquee tech={marqueeTech} />
        </section>
    );
}
