'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { useRef } from 'react';
import {
    ArrowUpRight, Briefcase, Globe, Database, BrainCircuit,
    Server, Code, Layers, Cpu, Shield, Zap, Target, LucideIcon, GraduationCap, Download
} from 'lucide-react';

export interface PhilosophyItem { title: string; description: string; icon: string; }
export interface ExperienceItem {
    id: number; title: string; company: string; year: string;
    description: string; skills: string[]; location?: string | null;
    category?: string | null;
    isVisible: boolean; order: number;
}
export interface EducationItem {
    id: number; institution: string; degree: string; field: string;
    year: string; description: string; location?: string | null;
    isVisible: boolean; order: number;
}
export interface AboutContentData {
    heroTitle: string; heroSubtitle: string; heroDescription: string;
    storyTitle: string | null; storyContent: string | null;
    images: string[]; tags: string[]; philosophy?: PhilosophyItem[] | null;
}
interface AboutPageClientProps {
    aboutContent: AboutContentData | null;
    experience: ExperienceItem[];
    education: EducationItem[];
}

const ICON_MAP: Record<string, LucideIcon> = {
    Database, BrainCircuit, Server, Code, Globe, Layers, Cpu, Shield, Zap, Target,
};

const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };

function FloatingParticle({ size, initialX, initialY, scrollY, speed = 1, delay = 0 }: {
    size: number; initialX: string; initialY: string;
    scrollY: MotionValue<number>; speed?: number; delay?: number;
}) {
    const y = useTransform(scrollY, [0, 1], [0, 200 * speed]);
    const smoothY = useSpring(y, springConfig);
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.4, scale: 1 }}
            transition={{ duration: 1.5, delay }}
            style={{ y: smoothY, left: initialX, top: initialY, width: size, height: size }}
            className="absolute rounded-full bg-gradient-to-br from-zinc-400/30 to-zinc-600/20 dark:from-zinc-500/20 dark:to-zinc-300/10 blur-sm pointer-events-none"
        />
    );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-4"
        >
            <div className="h-[2px] w-8 bg-zinc-900 dark:bg-zinc-100 flex-shrink-0" />
            <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">{children}</span>
        </motion.div>
    );
}

export function AboutPageClient({ aboutContent, experience, education }: AboutPageClientProps) {
    const heroRef = useRef(null);

    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });

    const bgY      = useSpring(useTransform(scrollYProgress, [0, 1], [0, 100]), springConfig);
    const bgScale  = useSpring(useTransform(scrollYProgress, [0, 1], [1, 1.1]), springConfig);
    const bgOpac   = useSpring(useTransform(scrollYProgress, [0, 0.5], [0.06, 0.02]), springConfig);
    const contentY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 80]), springConfig);
    const contentO = useSpring(useTransform(scrollYProgress, [0.6, 1], [1, 0]), springConfig);
    const orbLY    = useSpring(useTransform(scrollYProgress, [0, 1], [0, 80]), springConfig);
    const orbRY    = useSpring(useTransform(scrollYProgress, [0, 1], [0, 120]), springConfig);
    const statsY   = useSpring(useTransform(scrollYProgress, [0, 1], [0, 60]), springConfig);
    const decorY   = useSpring(useTransform(scrollYProgress, [0, 1], [0, 150]), springConfig);
    const decorR   = useSpring(useTransform(scrollYProgress, [0, 1], [-12, 20]), springConfig);

    if (!aboutContent) return null;

    const { heroTitle, heroSubtitle, heroDescription, storyContent, images, tags, philosophy } = aboutContent;
    const mainImage      = images?.[0];
    const secondaryImage = images?.[1];
    const visibleExp         = experience.filter(e => e.isVisible).sort((a, b) => a.order - b.order);
    const workExperiences    = visibleExp.filter(e => e.category === 'Work');
    const projectExperiences = visibleExp.filter(e => e.category === 'Project' || e.category === 'Achievement');
    const visibleEdu         = education.filter(e => e.isVisible).sort((a, b) => a.order - b.order);

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">

            <section
                ref={heroRef}
                className="relative min-h-[85dvh] flex flex-col justify-center overflow-hidden bg-zinc-50 dark:bg-zinc-950 pt-24 pb-32 lg:py-20"
            >
                <div className="hidden lg:block">
                    <FloatingParticle size={120} initialX="10%" initialY="20%" scrollY={scrollYProgress} speed={0.5} delay={0.2} />
                    <FloatingParticle size={80}  initialX="85%" initialY="15%" scrollY={scrollYProgress} speed={0.8} delay={0.4} />
                    <FloatingParticle size={60}  initialX="75%" initialY="60%" scrollY={scrollYProgress} speed={1.2} delay={0.6} />
                    <FloatingParticle size={100} initialX="5%"  initialY="70%" scrollY={scrollYProgress} speed={0.6} delay={0.3} />
                    <FloatingParticle size={40}  initialX="50%" initialY="80%" scrollY={scrollYProgress} speed={1.5} delay={0.5} />
                </div>

                <motion.div className="absolute inset-0 z-0 dark:hidden pointer-events-none"
                    style={{ y: bgY, scale: bgScale, opacity: bgOpac,
                        backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
                        backgroundSize: '40px 40px' }} />
                <motion.div className="absolute inset-0 z-0 hidden dark:block pointer-events-none"
                    style={{ y: bgY, scale: bgScale, opacity: bgOpac,
                        backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                        backgroundSize: '40px 40px' }} />

                <motion.div className="absolute top-1/4 -left-32 w-96 h-96 bg-gradient-to-br from-zinc-200/40 to-transparent dark:from-zinc-700/20 rounded-full blur-3xl pointer-events-none" style={{ y: orbLY }} />
                <motion.div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-gradient-to-tl from-zinc-300/30 to-transparent dark:from-zinc-600/15 rounded-full blur-3xl pointer-events-none" style={{ y: orbRY }} />

                <motion.div
                    style={{ y: contentY, opacity: contentO }}
                    className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-8 relative z-10 grid md:grid-cols-12 gap-8 md:gap-10 lg:gap-16 items-center"
                >
                    <div className="md:col-span-8 flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="mb-3 lg:mb-4 flex items-center gap-3"
                        >
                            <div className="h-[2px] w-8 bg-zinc-900 dark:bg-zinc-100" />
                            <span className="text-lg font-medium text-zinc-600 dark:text-zinc-400">
                                Who I <span className="text-zinc-900 dark:text-zinc-100 font-bold">Am</span>
                            </span>
                        </motion.div>

                        <div className="relative mb-6 lg:mb-8">
                            <motion.h1
                                initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                                className="text-5xl sm:text-6xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100 leading-[0.95]"
                            >
                                {heroTitle.toUpperCase()}
                                <br />
                                <span className="text-zinc-900 dark:text-zinc-400">{heroSubtitle.toUpperCase()}</span>
                            </motion.h1>

                            <motion.div
                                initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                style={{ y: decorY, rotate: decorR }}
                                className="absolute -top-6 right-0 sm:-top-8 sm:right-4 lg:-top-12 lg:right-8 block"
                            >
                                <Code className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 text-zinc-900 dark:text-zinc-100" />
                                <div className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-[10px] sm:text-xs px-2 py-1 rounded absolute top-8 right-0 sm:top-10 sm:left-6 sm:right-auto whitespace-nowrap">
                                    GPA 3.86
                                </div>
                            </motion.div>
                        </div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl font-medium leading-relaxed"
                        >
                            {heroDescription}
                        </motion.p>
                    </div>

                    <div className="md:col-span-4 flex flex-col items-start md:items-end gap-8">
                        <motion.div
                            style={{ y: statsY }}
                            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 }}
                            className="text-center lg:text-right"
                        >
                            <h2
                                className="text-7xl sm:text-8xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black tracking-tighter leading-none"
                                style={{ WebkitTextStroke: '1px #d4d4d8', color: 'transparent' }}
                            >
                                {(new Date().getFullYear() - 2019).toString().padStart(2, '0')}
                            </h2>
                            <p className="text-sm font-bold text-zinc-400 dark:text-zinc-500 tracking-widest uppercase mt-1">
                                Years Coding
                            </p>
                        </motion.div>

                        <motion.div
                            style={{ y: statsY }}
                            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.9 }}
                            className="flex flex-row md:flex-col gap-6 md:items-end"
                        >
                            {[
                                { value: `${experience.length}+`, label: 'Experience' },
                                { value: '3.86', label: 'GPA' },
                            ].map(stat => (
                                <div key={stat.label} className="text-center lg:text-right">
                                    <span className="text-2xl font-black text-zinc-900 dark:text-zinc-100">{stat.value}</span>
                                    <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">{stat.label}</p>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            <section className="py-16 bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-800">
                <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="md:col-span-8 h-[320px] md:h-[520px] relative group overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800"
                        >
                            {mainImage && (
                                <Image src={mainImage} alt="Workspace" fill
                                    sizes="(min-width: 768px) 66vw, 100vw"
                                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                            )}
                            <div className="absolute top-5 left-5 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">
                                My Workspace
                            </div>
                        </motion.div>

                        <div className="md:col-span-4 flex flex-col gap-4 md:gap-5">
                            <motion.div
                                initial={{ opacity: 0, x: 16 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.15 }}
                                className="flex-1 relative group overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800 min-h-[200px]"
                            >
                                {secondaryImage && (
                                    <Image src={secondaryImage} alt="Setup" fill
                                        sizes="(min-width: 768px) 33vw, 100vw"
                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                                )}
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 16 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="rounded-2xl bg-zinc-900 dark:bg-zinc-800 p-6 md:p-7 flex flex-col justify-between min-h-[160px]"
                            >
                                <Globe className="w-6 h-6 text-zinc-400" />
                                <div>
                                    <h3 className="text-2xl font-black tracking-tight text-white mb-0.5">Malang</h3>
                                    <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">Universitas Negeri Malang</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-800">
                <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-8">
                    <div className="grid md:grid-cols-12 gap-12 md:gap-16">
                        <div className="md:col-span-4">
                            <div className="md:sticky md:top-32">
                                <SectionLabel>Background</SectionLabel>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter leading-[0.95] mb-5">
                                    The<br />Story.
                                </h2>
                                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-sm">
                                    Design and building web applications powered by modern frontend & reliable backend APIs.
                                </p>
                            </div>
                        </div>

                        <div className="md:col-span-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="space-y-5 text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed"
                            >
                                {(storyContent ?? '').split('\n\n').map((paragraph, i) => (
                                    <p key={i}>{paragraph}</p>
                                ))}
                            </motion.div>

                            {tags.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 }}
                                    className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-zinc-100 dark:border-zinc-800"
                                >
                                    {tags.map(tag => (
                                        <span key={tag} className="px-4 py-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-semibold">
                                            {tag}
                                        </span>
                                    ))}
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-800">
                <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-8">
                    <div className="grid md:grid-cols-12 gap-12 md:gap-16">
                        <div className="md:col-span-4">
                            <div className="md:sticky md:top-32">
                                <SectionLabel>Career Path</SectionLabel>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter leading-[0.95] mb-5">
                                    Work Experience
                                </h2>
                                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-sm mb-8">
                                    Professional engineering roles and industrial positions.
                                </p>
                                <Link
                                    href="/resume.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-zinc-100 hover:underline underline-offset-4"
                                >
                                    <Download className="w-4 h-4" />
                                    Download Resume
                                </Link>
                            </div>
                        </div>

                        <div className="md:col-span-8 space-y-0 divide-y divide-zinc-100 dark:divide-zinc-800">
                            {workExperiences.map((exp, i) => (
                                <motion.div
                                    key={exp.id}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.07 }}
                                    className="py-8 first:pt-0 last:pb-0 group"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                                        <div>
                                            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                                                {exp.title}
                                            </h3>
                                            <p className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5 mt-0.5">
                                                <Briefcase className="w-3.5 h-3.5 flex-shrink-0" />
                                                {exp.company}
                                            </p>
                                        </div>
                                        <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest whitespace-nowrap">
                                            {exp.year}
                                        </span>
                                    </div>

                                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                                        {exp.description}
                                    </p>

                                    <div className="flex flex-wrap gap-1.5">
                                        {exp.skills.map(skill => (
                                            <span key={skill} className="px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-xs font-medium">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {projectExperiences.length > 0 && (
                <section className="py-24 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-800">
                    <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-8">
                        <div className="grid md:grid-cols-12 gap-12 md:gap-16">
                            <div className="md:col-span-4">
                                <div className="md:sticky md:top-32">
                                    <SectionLabel>Key Highlights</SectionLabel>
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter leading-[0.95] mb-5">
                                        Projects & Achievements
                                    </h2>
                                    <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-sm">
                                        Award-winning products, research publications, and community projects.
                                    </p>
                                </div>
                            </div>

                            <div className="md:col-span-8 space-y-0 divide-y divide-zinc-100 dark:divide-zinc-800">
                                {projectExperiences.map((exp, i) => (
                                    <motion.div
                                        key={exp.id}
                                        initial={{ opacity: 0, y: 16 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.07 }}
                                        className="py-8 first:pt-0 last:pb-0 group"
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                                            <div>
                                                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                                                    {exp.title}
                                                </h3>
                                                <p className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5 mt-0.5">
                                                    <Briefcase className="w-3.5 h-3.5 flex-shrink-0" />
                                                    {exp.company}
                                                </p>
                                            </div>
                                            <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest whitespace-nowrap">
                                                {exp.year}
                                            </span>
                                        </div>

                                        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                                            {exp.description}
                                        </p>

                                        <div className="flex flex-wrap gap-1.5">
                                            {exp.skills.map(skill => (
                                                <span key={skill} className="px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-xs font-medium">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {visibleEdu.length > 0 && (
                <section className="py-24 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-800">
                    <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-8">
                        <div className="grid md:grid-cols-12 gap-12 md:gap-16">
                            <div className="md:col-span-4">
                                <div className="md:sticky md:top-32">
                                    <SectionLabel>Academic</SectionLabel>
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter leading-[0.95] mb-5">
                                        Education
                                    </h2>
                                    <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-sm">
                                        Academic background that built my foundation.
                                    </p>
                                </div>
                            </div>

                            <div className="md:col-span-8 space-y-0 divide-y divide-zinc-100 dark:divide-zinc-800">
                                {visibleEdu.map((edu, i) => (
                                    <motion.div
                                        key={edu.id}
                                        initial={{ opacity: 0, y: 16 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="py-8 first:pt-0 last:pb-0"
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                                            <div>
                                                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                                                    {edu.institution}
                                                </h3>
                                                <p className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5 mt-0.5">
                                                    <GraduationCap className="w-3.5 h-3.5 flex-shrink-0" />
                                                    {edu.degree} · {edu.field}
                                                </p>
                                            </div>
                                            <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest whitespace-nowrap">
                                                {edu.year}
                                            </span>
                                        </div>
                                        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                            {edu.description}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {philosophy && philosophy.length > 0 && (
                <section className="py-24 bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-800">
                    <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-8">
                        <div className="grid md:grid-cols-12 gap-12 md:gap-16">
                            <div className="md:col-span-4">
                                <div className="md:sticky md:top-32">
                                    <SectionLabel>Principles</SectionLabel>
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter leading-[0.95] mb-5">
                                        Philosophy
                                    </h2>
                                    <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-sm">
                                        Core principles that guide my approach to software and problem-solving.
                                    </p>
                                </div>
                            </div>

                            <div className="md:col-span-8">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {(philosophy as PhilosophyItem[]).map((item, i) => {
                                        const Icon = ICON_MAP[item.icon] || Database;
                                        const isOdd = philosophy.length % 2 !== 0;
                                        const isLast = i === philosophy.length - 1;
                                        return (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 16 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: i * 0.08 }}
                                                className={`group p-6 rounded-xl bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-300 ${isOdd && isLast ? 'sm:col-span-2' : ''}`}
                                            >
                                                <div className="w-10 h-10 rounded-lg bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center mb-4">
                                                    <Icon className="w-5 h-5 text-white dark:text-zinc-900" />
                                                </div>
                                                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                                                    {item.title}
                                                </h3>
                                                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                                    {item.description}
                                                </p>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            <section className="py-24 bg-zinc-900 dark:bg-zinc-900">
                <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8"
                    >
                        <div>
                            <p className="text-zinc-400 text-xs font-bold tracking-[0.25em] uppercase mb-4">Let&apos;s Work Together</p>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white leading-[0.95]">
                                Have a project<br />
                                <span className="text-zinc-400">in mind?</span>
                            </h2>
                        </div>
                        <Link
                            href="mailto:bagus.hidayat.id@gmail.com"
                            className="group inline-flex items-center gap-3 px-6 py-3 bg-white text-zinc-900 rounded-full font-bold text-sm hover:bg-zinc-100 transition-colors"
                        >
                            Get in touch
                            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
