'use client';

// Premium Project Detail Page
// Immersive monochrome design with rich content and smooth motion
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Github, Calendar, Layers, Cpu, Globe } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import { dummyProjects } from '@/lib/dummy-data';

export default function ProjectDetail() {
    const params = useParams(); // Need to unwrap params in Next 15, but standard use for now
    // Find project from dummy data
    const project = dummyProjects.find(p => p.id === params.id) || dummyProjects[0];

    const router = useRouter();
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef });
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

    return (
        <div ref={containerRef} className="min-h-screen bg-white dark:bg-zinc-950">
            {/* 1. Immersive Hero */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-zinc-900 dark:bg-zinc-950 text-white">
                <motion.div
                    style={{ opacity: heroOpacity, scale: heroScale }}
                    className="container mx-auto px-6 relative z-10"
                >
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Badge variant="outline" className="text-zinc-400 dark:text-zinc-500 border-zinc-700 dark:border-zinc-800 mb-6 px-4 py-1 text-xs tracking-widest uppercase">
                                Case Study
                            </Badge>
                            <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
                                {project.title}
                            </h1>
                            <p className="text-xl md:text-2xl text-zinc-400 dark:text-zinc-500 max-w-2xl leading-relaxed">
                                {project.description}
                            </p>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Background Pattern */}
                <div className="absolute inset-0 z-0 opacity-20 dark:opacity-10 bg-[radial-gradient(#333_1px,transparent_1px)] dark:bg-[radial-gradient(#555_1px,transparent_1px)] [background-size:16px_16px]" />
            </section>

            {/* 2. Project Meta & Links */}
            <section className="bg-white dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-800 sticky top-0 z-30 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl">
                <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    <Button
                        variant="ghost"
                        onClick={() => router.back()}
                        className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 gap-2 pl-0 hover:bg-transparent dark:hover:bg-transparent"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Projects
                    </Button>

                    <div className="flex items-center gap-3">
                        <Button asChild variant="outline" className="rounded-full border-zinc-200 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white">
                            <a href="#" target="_blank">
                                <Github className="w-4 h-4 mr-2" />
                                Source Code
                            </a>
                        </Button>
                        <Button asChild className="rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200">
                            <a href="#" target="_blank">
                                Visit Live Site
                                <ArrowUpRight className="w-4 h-4 ml-2" />
                            </a>
                        </Button>
                    </div>
                </div>
            </section>

            {/* 3. Detailed Info Grid */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-12 gap-16">
                        {/* Sidebar */}
                        <div className="lg:col-span-4 space-y-12">
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4">Role</h3>
                                <p className="text-xl font-medium text-zinc-900 dark:text-zinc-100">{project.role}</p>
                            </div>
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4">Timeline</h3>
                                <p className="text-xl font-medium text-zinc-900 dark:text-zinc-100">{project.timeline} ({project.year})</p>
                            </div>
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4">Tech Stack</h3>
                                <div className="flex flex-wrap gap-2">
                                    {(project.techStack || []).map((t: string) => (
                                        <Badge key={t} variant="secondary" className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                                            {t}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-8 space-y-16">
                            <div>
                                <h2 className="text-3xl font-bold mb-6 dark:text-zinc-100">The Challenge</h2>
                                <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                    {project.challenge}
                                </p>
                            </div>

                            {/* Main Image */}
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800"
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={project.images[0]} alt="Project Highlight" className="w-full h-auto" />
                            </motion.div>

                            <div>
                                <h2 className="text-3xl font-bold mb-6 dark:text-zinc-100">The Solution</h2>
                                <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                    {project.solution}
                                </p>
                            </div>

                            {/* Secondary Images Grid */}
                            <div className="grid md:grid-cols-2 gap-6">
                                {project.images.slice(1).map((img, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 40 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.2 }}
                                        className="rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800"
                                    >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={img} alt={`Screenshot ${i + 2}`} className="w-full h-full object-cover" />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Next Project */}
            <section className="py-24 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-zinc-400 dark:text-zinc-500 text-sm uppercase tracking-widest mb-4">Next Project</p>
                    <Link href="/projects" className="group inline-flex items-center justify-center gap-4">
                        <span className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-zinc-100 group-hover:underline decoration-4 underline-offset-8">
                            AI Content Generator
                        </span>
                        <ArrowUpRight className="w-8 h-8 md:w-12 md:h-12 text-zinc-300 dark:text-zinc-700 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
