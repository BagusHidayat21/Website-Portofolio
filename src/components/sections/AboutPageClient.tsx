'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowDownRight, Briefcase, Globe, Database, BrainCircuit, Server, Code, Layers, Cpu, Shield, Zap, Target, LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface PhilosophyItem {
    title: string;
    description: string;
    icon: string;
}

interface AboutContentData {
    heroTitle: string;
    heroSubtitle: string;
    heroDescription: string;
    storyTitle: string | null;
    storyContent: string | null;
    mainImage: string | null;
    secondaryImage: string | null;
    tags: string[];
    philosophy?: PhilosophyItem[] | null;
}

interface AboutPageClientProps {
    aboutContent: AboutContentData | null;
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

interface TimelineItem {
    year: string;
    title: string;
    company: string;
    description: string;
    skills: string[];
}

// Static data for experience (can be made dynamic later)
const experience: TimelineItem[] = [
    {
        year: '2022 - PRESENT',
        title: 'Informatics Engineering Education',
        company: 'Universitas Negeri Malang',
        description: 'Bachelor of Science (S1). Combining technical expertise in software development, computer systems, and networking with pedagogical knowledge for vocational education.',
        skills: ['Software Engineering', 'Pedagogy', 'Network Systems', 'Educational Tech']
    },
    {
        year: '2024',
        title: 'Laravel Developer (HealMe)',
        company: 'Wintex IID 2024',
        description: 'Developed a mental health consultation platform using Laravel 10. Implemented secure user authentication, appointment scheduling, mood tracking, and anonymous support forums.',
        skills: ['Laravel 10', 'System Security', 'Full Stack Development', 'Healthcare Tech']
    },
    {
        year: '2024',
        title: 'Web Developer (Cahaya Dunia)',
        company: 'Ngadimulyo Village Govt',
        description: 'Developed a digital library management system including features for book cataloging, member management, and borrowing/returning processes.',
        skills: ['Web Development', 'Library Management', 'Admin Dashboard', 'Training']
    },
    {
        year: '2023',
        title: 'API Developer (J-TAG)',
        company: 'SMK Negeri 1 Jenangan',
        description: 'Developed a RESTful API for an RFID-based attendance system. Focused on real-time data processing and seamless integration.',
        skills: ['RESTful API', 'Real-time Data', 'RFID Integration', 'Backend Engineering']
    },
    {
        year: '2019 - 2022',
        title: 'Software Engineering',
        company: 'SMK Negeri 1 Jenangan Ponorogo',
        description: 'High School Diploma. Focused on programming, web development, databases, and software lifecycle.',
        skills: ['Web Development', 'Databases', 'Leadership', 'Teamwork']
    }
];

export function AboutPageClient({ aboutContent }: AboutPageClientProps) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef });

    // If no content, show loading state
    if (!aboutContent) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950">
                <p className="text-zinc-500">Loading...</p>
            </div>
        );
    }

    const { heroTitle, heroSubtitle, heroDescription, storyContent, mainImage, secondaryImage, tags, philosophy } = aboutContent;

    return (
        <div ref={containerRef} className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
            {/* 1. Hero / Introduction */}
            <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 relative overflow-hidden bg-zinc-50 dark:bg-zinc-900">
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
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="md:col-span-8 h-[400px] md:h-[600px] relative group overflow-hidden bg-zinc-100 dark:bg-zinc-900"
                        >
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
            <section className="py-24 md:py-32">
                <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 md:gap-32">
                    <div>
                        <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-6">The Story</h2>
                        <h3 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
                            Design and Building <span className="underline decoration-4 decoration-zinc-200 dark:decoration-zinc-700 underline-offset-4">web application</span> powered by <span className="underline decoration-4 decoration-zinc-200 dark:decoration-zinc-700 underline-offset-4">modern frontend</span> & <span className="underline decoration-4 decoration-zinc-200 dark:decoration-zinc-700 underline-offset-4">reliable backend API&apos;s</span>.
                        </h3>
                    </div>
                    <div className="space-y-8 text-lg text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
                        {(storyContent ?? '').split('\n\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}

                        {tags.length > 0 && (
                            <div className="pt-4 flex flex-wrap items-center gap-4">
                                {tags.map((tag) => (
                                    <Badge
                                        key={tag}
                                        variant="outline"
                                        className="px-4 py-2 text-zinc-900 dark:text-zinc-100 border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 rounded-full"
                                    >
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* 4. Experience Timeline */}
            <section className="py-24 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row gap-16">
                        <div className="md:w-1/3">
                            <h2 className="text-5xl font-bold mb-6">Journey</h2>
                            <p className="text-zinc-500 dark:text-zinc-400 max-w-sm">
                                A timeline of my professional career and the key milestones that shaped my expertise.
                            </p>
                            <a href="#" className="inline-flex items-center gap-2 mt-8 text-zinc-900 dark:text-zinc-100 font-bold hover:underline underline-offset-4">
                                Download Resume <ArrowDownRight className="w-4 h-4" />
                            </a>
                        </div>

                        <div className="md:w-2/3 space-y-0">
                            {experience.map((exp, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="relative pl-8 md:pl-0 border-l md:border-l-0 border-zinc-200 dark:border-zinc-700 md:grid md:grid-cols-12 md:gap-8 pb-12 md:pb-16 last:pb-0"
                                >
                                    <div className="hidden md:block absolute left-0 top-2 bottom-0 w-px bg-zinc-100 dark:bg-zinc-800 md:left-[25%]" />
                                    <div className="hidden md:block absolute left-0 top-2.5 w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-600 outline outline-4 outline-white dark:outline-zinc-900 md:left-[25%] md:-translate-x-[50%]" />
                                    <div className="md:hidden absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-600 outline outline-4 outline-zinc-50 dark:outline-zinc-900" />

                                    <div className="md:col-span-3 mb-2 md:mb-0 md:text-right md:pr-8">
                                        <span className="inline-block py-1 px-2 rounded bg-zinc-100 dark:bg-zinc-800 text-xs font-bold tracking-wider text-zinc-500 dark:text-zinc-400">
                                            {exp.year}
                                        </span>
                                    </div>

                                    <div className="md:col-span-9">
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
                                                <Badge key={skill} variant="secondary" className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 font-normal hover:bg-zinc-50 dark:hover:bg-zinc-700">
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

            {/* 5. Philosophy Grid */}
            {philosophy && philosophy.length > 0 && (
                <section className="py-24 container mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-8">
                        {(philosophy as PhilosophyItem[]).map((item, i) => {
                            const IconComponent = ICON_MAP[item.icon] || Database;
                            return (
                                <Card key={i} className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-900 dark:hover:border-zinc-600 transition-colors duration-300 group cursor-default">
                                    <CardContent className="p-8">
                                        <IconComponent className="w-10 h-10 text-zinc-300 dark:text-zinc-700 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors mb-6" />
                                        <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                        <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </section>
            )}
        </div>
    );
}
