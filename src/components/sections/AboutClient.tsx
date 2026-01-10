'use client';

// Minimalist About Section with Timeline
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Briefcase, GraduationCap, Download, ArrowUpRight } from 'lucide-react';

// Interface matching the updated Experience model
interface ExperienceItem {
    id: number;
    title: string;
    company: string;
    year: string;
    description: string;
    skills: string[];
    location: string | null;
    isVisible: boolean;
    order: number;
}

interface AboutClientProps {
    bio: string;
    resumeUrl?: string | null;
    experiences: ExperienceItem[];
}

export function AboutClient({ bio, resumeUrl, experiences }: AboutClientProps) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start']
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

    return (
        <section id="about" ref={containerRef} className="py-32 bg-white dark:bg-zinc-950 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-zinc-50 dark:from-zinc-900 to-transparent opacity-50 pointer-events-none" />

            <motion.div
                className="container mx-auto px-6 relative z-10"
                style={{ opacity }}
            >
                <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">

                    {/* Left Column: Biography & Intro */}
                    <div className="lg:col-span-5">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-sm font-bold tracking-widest text-zinc-500 dark:text-zinc-400 uppercase mb-4">About Me</h2>
                            <h3 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-zinc-100 mb-8 tracking-tight">
                                Engineering the future with code and AI.
                            </h3>

                            <div className="prose prose-lg dark:prose-invert text-zinc-600 dark:text-zinc-400 mb-10 leading-relaxed">
                                <p>
                                    {bio}
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                {resumeUrl && (
                                    <Button className="rounded-full h-12 px-6 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 shadow-lg shadow-zinc-900/20">
                                        <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                            <Download className="w-4 h-4" />
                                            Download Resume
                                        </a>
                                    </Button>
                                )}
                                <Button variant="outline" className="rounded-full h-12 px-6 border-zinc-200 dark:border-zinc-800">
                                    <a href="#contact" className="flex items-center gap-2">
                                        Let's Talk
                                        <ArrowUpRight className="w-4 h-4" />
                                    </a>
                                </Button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Experience Timeline */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className="flex items-center justify-between mb-10">
                                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Experience & Education</h2>
                                <Badge variant="secondary" className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                                    {experiences.length} Items
                                </Badge>
                            </div>

                            <div className="space-y-8 pl-8 border-l border-zinc-200 dark:border-zinc-800 relative">
                                {experiences.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="relative group"
                                    >
                                        {/* Timeline Dot */}
                                        <div className="absolute -left-[39px] top-1 h-5 w-5 rounded-full border-4 border-white dark:border-zinc-950 bg-zinc-300 dark:bg-zinc-700 group-hover:bg-zinc-900 dark:group-hover:bg-zinc-100 transition-colors" />

                                        <div className="bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all hover:shadow-sm">
                                            <div className="flex flex-wrap justify-between items-start gap-4 mb-2">
                                                <div>
                                                    <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{item.title}</h4>
                                                    <p className="text-zinc-500 dark:text-zinc-400 font-medium">{item.company}</p>
                                                </div>
                                                <Badge variant="outline" className="font-mono text-xs border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-500">
                                                    {item.year}
                                                </Badge>
                                            </div>
                                            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-4">
                                                {item.description}
                                            </p>

                                            {/* Skills */}
                                            {item.skills && item.skills.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {item.skills.map(skill => (
                                                        <Badge key={skill} variant="secondary" className="text-xs bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                                                            {skill}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            )}

                                            {item.location && (
                                                <div className="flex items-center gap-4 text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                                                    <span className="flex items-center gap-1">
                                                        {item.company.toLowerCase().includes('university') || item.company.toLowerCase().includes('universitas') ?
                                                            <GraduationCap className="w-3 h-3" /> :
                                                            <Briefcase className="w-3 h-3" />
                                                        }
                                                        {item.location}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}