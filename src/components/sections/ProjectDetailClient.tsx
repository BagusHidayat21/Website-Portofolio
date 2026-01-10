'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Project } from '@prisma/client';
import ReactMarkdown from 'react-markdown';

export function ProjectDetailClient({ project }: { project: Project }) {
    const router = useRouter();
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef });
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

    return (
        <div ref={containerRef} className="min-h-screen bg-white dark:bg-zinc-950 pb-20">
            {/* 1. Immersive Hero */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white">
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
                            <Badge variant="outline" className="text-zinc-600 dark:text-zinc-400 border-zinc-300 dark:border-zinc-800 mb-6 px-4 py-1.5 text-xs tracking-widest uppercase rounded-full">
                                Case Study
                            </Badge>
                            <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
                                {project.title}
                            </h1>
                            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
                                {project.description}
                            </p>
                        </motion.div>
                    </div>
                </motion.div>

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
            </section>

            {/* 2. Project Meta & Links */}
            <section className="bg-white dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-800 sticky top-0 z-30 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl">
                <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
                    <Button
                        variant="ghost"
                        onClick={() => router.back()}
                        className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 gap-2 pl-0 hover:bg-transparent dark:hover:bg-transparent"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Projects
                    </Button>

                    <div className="flex items-center gap-3">
                        {project.githubUrl && (
                            <Button asChild variant="outline" className="rounded-full border-zinc-200 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white">
                                <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                    <Github className="w-4 h-4 mr-2" />
                                    Source Code
                                </Link>
                            </Button>
                        )}
                        {project.liveUrl && (
                            <Button asChild className="rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200">
                                <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                    Visit Live Site
                                    <ArrowUpRight className="w-4 h-4 ml-2" />
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>
            </section>

            {/* 3. Detailed Info Grid */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-12 gap-16">
                        {/* Sidebar */}
                        <div className="lg:col-span-4 space-y-12">
                            {/* Tags / Categories */}
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4">Categories</h3>
                                <div className="flex flex-wrap gap-2">
                                    {(project.tags || []).map((t: string) => (
                                        <Badge key={t} variant="secondary" className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border-0 font-normal">
                                            {t}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            {/* Tech Stack */}
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4">Tech Stack</h3>
                                <div className="flex flex-wrap gap-2">
                                    {(project.techStack || []).map((t: string) => (
                                        <Badge key={t} variant="outline" className="text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700">
                                            {t}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4">Date</h3>
                                <p className="text-zinc-900 dark:text-zinc-100 font-medium">
                                    {new Date(project.updatedAt).getFullYear()}
                                </p>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-8 space-y-16">

                            {/* Main Image */}
                            {project.images && project.images[0] && (
                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-2xl dark:shadow-zinc-950/50"
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={project.images[0]} alt="Project Highlight" className="w-full h-auto" />
                                </motion.div>
                            )}

                            {/* Markdown Content */}
                            {project.content ? (
                                <div className="prose prose-zinc dark:prose-invert max-w-none">
                                    <ReactMarkdown>{project.content}</ReactMarkdown>
                                </div>
                            ) : (
                                <div>
                                    <h2 className="text-3xl font-bold mb-6 dark:text-zinc-100">Overview</h2>
                                    <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                        {project.description}
                                    </p>
                                    <div className="p-8 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg border border-dashed border-zinc-200 dark:border-zinc-800 text-center text-zinc-500 mt-8">
                                        No detailed case study content available for this project yet.
                                    </div>
                                </div>
                            )}

                            {/* Secondary Images Grid */}
                            {project.images && project.images.length > 1 && (
                                <div className="grid md:grid-cols-2 gap-6 pt-8 border-t border-zinc-100 dark:border-zinc-800">
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
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
