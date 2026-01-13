'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Briefcase, Globe, Database, BrainCircuit, Server, Code, Layers, Cpu, Shield, Zap, Target, LucideIcon, GraduationCap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export interface PhilosophyItem {
    title: string;
    description: string;
    icon: string;
}

export interface ExperienceItem {
    id: number;
    title: string;
    company: string;
    year: string;
    description: string;
    skills: string[];
    location?: string | null;
    isVisible: boolean;
    order: number;
}

export interface EducationItem {
    id: number;
    institution: string;
    degree: string;
    field: string;
    year: string;
    description: string;
    location?: string | null;
    isVisible: boolean;
    order: number;
}

export interface AboutContentData {
    heroTitle: string;
    heroSubtitle: string;
    heroDescription: string;
    storyTitle: string | null;
    storyContent: string | null;
    images: string[];
    tags: string[];
    philosophy?: PhilosophyItem[] | null;
}

interface AboutPageClientProps {
    aboutContent: AboutContentData | null;
    experience: ExperienceItem[];
    education: EducationItem[];
}

// Icon mapping for dynamic philosophy cards
const ICON_MAP: Record<string, LucideIcon> = {
    Database,
    BrainCircuit,
    Server,
    Code,
    Globe,
    Layers,
    Cpu,
    Shield,
    Zap,
    Target,
};

export function AboutPageClient({ aboutContent, experience, education }: AboutPageClientProps) {
    const containerRef = useRef(null);


    // If no content, show loading state
    if (!aboutContent) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950">
                <p className="text-zinc-500">Loading...</p>
            </div>
        );
    }

    const { heroTitle, heroSubtitle, heroDescription, storyContent, images, tags, philosophy } = aboutContent;
    const mainImage = images?.[0];
    const secondaryImage = images?.[1];

    return (
        <div ref={containerRef} className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
            {/* 1. Hero / Introduction */}
            <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-6 relative overflow-hidden bg-zinc-50 dark:bg-zinc-900">
                {/* Background Grid */}
                <div className="absolute inset-0 z-0 opacity-[0.06] dark:hidden"
                    style={{
                        backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}
                />
                <div className="absolute inset-0 z-0 hidden dark:block opacity-[0.06]"
                    style={{
                        backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}
                />

                <div className="container mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="max-w-4xl"
                    >
                        <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.9] mb-8">
                            {heroTitle} <br />
                            <span className="text-zinc-400 dark:text-zinc-600">{heroSubtitle}</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 font-light leading-relaxed max-w-2xl">
                            {heroDescription}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 2. The Photo Grid */}
            <section className="py-12 border-y border-zinc-100 dark:border-zinc-800 overflow-hidden">
                <div className="container mx-auto px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="md:col-span-8 h-[400px] md:h-[600px] relative group overflow-hidden bg-zinc-100 dark:bg-zinc-900"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={mainImage ?? undefined}
                                alt="Workspace"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-105"
                            />
                            <div className="absolute top-6 left-6 bg-white/90 dark:bg-zinc-900/90 backdrop-blur px-4 py-2 text-xs font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">
                                My Workspace
                            </div>
                        </motion.div>

                        <div className="md:col-span-4 flex flex-col gap-6">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="h-[250px] md:h-[280px] relative group overflow-hidden bg-zinc-100 dark:bg-zinc-900"
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={secondaryImage ?? undefined}
                                    alt="Setup"
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-105"
                                />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                className="h-[200px] md:h-[300px] bg-zinc-900 dark:bg-zinc-800 p-6 md:p-8 flex flex-col justify-between text-white"
                            >
                                <Globe className="w-6 h-6 md:w-8 md:h-8" />
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-bold mb-1">Malang</h3>
                                    <p className="text-zinc-500 dark:text-zinc-400 text-xs md:text-sm uppercase tracking-wider">Universitas Negeri Malang</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Narrative Bio */}
            <section className="py-24 bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-800">
                <div className="container mx-auto px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-6">
                    <div className="flex flex-col md:flex-row gap-16">
                        <div className="md:w-1/3">
                            <div className="sticky top-32">
                                <span className="inline-block px-3 py-1 text-xs font-bold tracking-widest uppercase bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-full mb-4">
                                    Background
                                </span>
                                <h2 className="text-4xl md:text-5xl font-black mb-6 text-zinc-900 dark:text-zinc-100">The Story</h2>
                                <p className="text-zinc-500 dark:text-zinc-400 max-w-sm leading-relaxed">
                                    Design and building web applications powered by modern frontend & reliable backend APIs.
                                </p>
                            </div>
                        </div>

                        <div className="md:w-2/3">
                            <div className="bg-zinc-50 dark:bg-zinc-900 p-8 md:p-10 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                                <div className="space-y-6 text-lg text-justify text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                    {(storyContent ?? '').split('\n\n').map((paragraph, index) => (
                                        <p key={index}>{paragraph}</p>
                                    ))}
                                </div>

                                {tags.length > 0 && (
                                    <div className="pt-8 mt-8 border-t border-zinc-200 dark:border-zinc-700 flex flex-wrap items-center gap-3">
                                        {tags.map((tag) => (
                                            <Badge
                                                key={tag}
                                                variant="secondary"
                                                className="px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-0 font-medium rounded-full"
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3.5. Gallery Section */}
            {images && images.length > 2 && (
                <section className="py-24 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800">
                    <div className="container mx-auto px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-6">
                        <div className="mb-12">
                            <span className="inline-block px-3 py-1 text-xs font-bold tracking-widest uppercase bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-full mb-4">
                                Gallery
                            </span>
                            <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-zinc-100">
                                Life in Pictures
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                            {images.slice(2).map((img, index) => {
                                const gallery = images.slice(2);
                                const remainder = gallery.length % 3;
                                const isLastRow = index >= gallery.length - remainder;
                                let spanClass = "md:col-span-2"; // Default 1/3 (2 cols out of 6)

                                if (isLastRow) {
                                    if (remainder === 1) spanClass = "md:col-span-4 md:col-start-2"; // Centered 2/3 width
                                    if (remainder === 2) spanClass = "md:col-span-3"; // Half width
                                }

                                return (
                                    <motion.div
                                        key={`gallery-${index}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className={`relative rounded-2xl overflow-hidden group w-full ${spanClass}`}
                                    >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={img}
                                            alt={`Gallery ${index + 3}`}
                                            className="w-full h-auto block grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}
            <section className="py-24 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800">
                <div className="container mx-auto px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-6">
                    <div className="flex flex-col md:flex-row gap-16">
                        <div className="md:w-1/3">
                            <div className="sticky top-32">
                                <span className="inline-block px-3 py-1 text-xs font-bold tracking-widest uppercase bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-full mb-4">
                                    Work & Projects
                                </span>
                                <h2 className="text-4xl md:text-5xl font-black mb-6 text-zinc-900 dark:text-zinc-100">Experience</h2>
                                <p className="text-zinc-500 dark:text-zinc-400 max-w-sm leading-relaxed">
                                    Projects and work experience that shaped my expertise.
                                </p>
                                <Link href="#" className="group inline-flex items-center gap-2 mt-8 text-zinc-900 dark:text-zinc-100 font-bold hover:underline underline-offset-4">
                                    Download Resume <ArrowRight className="w-5 h-5 md:w-6 md:h-6 rotate-45 group-hover:rotate-0 transition-transform flex-shrink-0 ml-2" />
                                </Link>
                            </div>
                        </div>

                        <div className="md:w-2/3 space-y-0">
                            {experience.map((exp, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="relative pl-8 md:pl-0 border-l-2 md:border-l-0 border-zinc-200 dark:border-zinc-700 md:grid md:grid-cols-12 md:gap-8 pb-12 md:pb-16 last:pb-0"
                                >
                                    <div className="hidden md:block absolute left-0 top-2 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800 md:left-[25%]" />
                                    <div className="hidden md:block absolute left-0 top-2 w-3 h-3 rounded-full bg-zinc-900 dark:bg-zinc-100 outline outline-4 outline-zinc-50 dark:outline-zinc-900 md:left-[25%] md:-translate-x-[50%]" />
                                    <div className="md:hidden absolute left-[-7px] top-1 w-3 h-3 rounded-full bg-zinc-900 dark:bg-zinc-100 outline outline-4 outline-zinc-50 dark:outline-zinc-900" />

                                    <div className="md:col-span-3 mb-2 md:mb-0 md:text-right md:pr-8">
                                        <span className="inline-block py-1.5 px-3 rounded-full bg-zinc-900 dark:bg-zinc-100 text-xs font-bold tracking-wider text-white dark:text-zinc-900">
                                            {exp.year}
                                        </span>
                                    </div>

                                    <div className="md:col-span-9 bg-white dark:bg-zinc-800 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors">
                                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">{exp.title}</h3>
                                        <p className="text-zinc-500 dark:text-zinc-400 font-medium mb-4 flex items-center gap-2">
                                            <Briefcase className="w-4 h-4" />
                                            {exp.company}
                                        </p>
                                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 text-base">
                                            {exp.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2">
                                            {exp.skills.map(skill => (
                                                <Badge key={skill} variant="secondary" className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-0 font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200">
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Education Timeline */}
            {education && education.length > 0 && (
                <section className="py-24 bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-800">
                    <div className="container mx-auto px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-6">
                        <div className="flex flex-col md:flex-row gap-16">
                            <div className="md:w-1/3">
                                <div className="sticky top-32">
                                    <span className="inline-block px-3 py-1 text-xs font-bold tracking-widest uppercase bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-full mb-4">
                                        Academic
                                    </span>
                                    <h2 className="text-4xl md:text-5xl font-black mb-6 text-zinc-900 dark:text-zinc-100">Education</h2>
                                    <p className="text-zinc-500 dark:text-zinc-400 max-w-sm leading-relaxed">
                                        Academic background and certifications that built my foundation.
                                    </p>
                                </div>
                            </div>

                            <div className="md:w-2/3 space-y-0">
                                {education.map((edu, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="relative pl-8 md:pl-0 border-l-2 md:border-l-0 border-zinc-300 dark:border-zinc-700 md:grid md:grid-cols-12 md:gap-8 pb-12 md:pb-16 last:pb-0"
                                    >
                                        <div className="hidden md:block absolute left-0 top-2 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800 md:left-[25%]" />
                                        <div className="hidden md:block absolute left-0 top-2 w-3 h-3 rounded-full bg-zinc-900 dark:bg-zinc-100 outline outline-4 outline-white dark:outline-zinc-950 md:left-[25%] md:-translate-x-[50%]" />
                                        <div className="md:hidden absolute left-[-7px] top-1 w-3 h-3 rounded-full bg-zinc-900 dark:bg-zinc-100 outline outline-4 outline-white dark:outline-zinc-950" />

                                        <div className="md:col-span-3 mb-2 md:mb-0 md:text-right md:pr-8">
                                            <span className="inline-block py-1.5 px-3 rounded-full bg-zinc-900 dark:bg-zinc-100 text-xs font-bold tracking-wider text-white dark:text-zinc-900">
                                                {edu.year}
                                            </span>
                                        </div>

                                        <div className="md:col-span-9 bg-zinc-100 dark:bg-zinc-800 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors">
                                            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">{edu.institution}</h3>
                                            <p className="text-zinc-500 dark:text-zinc-400 font-medium mb-3 flex items-center gap-2">
                                                <GraduationCap className="w-4 h-4" />
                                                {edu.degree} - {edu.field}
                                            </p>
                                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-base">
                                                {edu.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}


            {/* 6. Philosophy Grid */}
            {philosophy && philosophy.length > 0 && (
                <section className="py-24 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800">
                    <div className="container mx-auto px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-6">
                        <div className="flex flex-col md:flex-row gap-16">
                            <div className="md:w-1/3">
                                <div className="sticky top-32">
                                    <span className="inline-block px-3 py-1 text-xs font-bold tracking-widest uppercase bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-full mb-4">
                                        Principles
                                    </span>
                                    <h2 className="text-4xl md:text-5xl font-black mb-6 text-zinc-900 dark:text-zinc-100">Philosophy</h2>
                                    <p className="text-zinc-500 dark:text-zinc-400 max-w-sm leading-relaxed">
                                        Core principles that guide my approach to software development and problem-solving.
                                    </p>
                                </div>
                            </div>

                            <div className="md:w-2/3">
                                <div className="grid md:grid-cols-2 gap-6">
                                    {(philosophy as PhilosophyItem[]).map((item, i) => {
                                        const IconComponent = ICON_MAP[item.icon] || Database;
                                        return (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: i * 0.1 }}
                                            >
                                                <Card className="bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors duration-300 group cursor-default h-full">
                                                    <CardContent className="p-6">
                                                        <div className="h-12 w-12 rounded-xl bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center mb-5">
                                                            <IconComponent className="w-6 h-6 text-white dark:text-zinc-900" />
                                                        </div>
                                                        <h3 className="text-lg font-bold mb-2 text-zinc-900 dark:text-zinc-100 mt-2">{item.title}</h3>
                                                        <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-sm">
                                                            {item.description}
                                                        </p>
                                                    </CardContent>
                                                </Card>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

        </div>
    );
}
