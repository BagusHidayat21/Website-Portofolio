'use client';

// Dynamic, Hover-Rich Projects Grid
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useRef } from 'react';
import { Project } from '@/data/static-db';

export function FeaturedProjectsClient({ projects }: { projects: Project[] }) {
    const containerRef = useRef(null);

    return (
        <section id="projects" ref={containerRef} className="py-24 md:py-32 bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-700">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-sm font-bold tracking-widest text-zinc-500 dark:text-zinc-400 uppercase mb-4">Selected Works</h2>
                        <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-900 dark:text-zinc-100 max-w-xl leading-tight">
                            Digital products crafted with precision.
                        </h3>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Button variant="outline" className="h-12 px-6 rounded-full border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all font-medium">
                            <Link href="/projects" className="flex items-center gap-2">
                                View All Archive
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>

                {/* Projects Display */}
                <div className="grid gap-20">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8 }}
                            className="group relative"
                        >
                            <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                                {/* Image / Visual (Left or Right based on index?) - For consistency, visual left, text right mostly clean */}
                                <div className={`lg:col-span-7 relative ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                                    <div className="relative aspect-[16/10] bg-zinc-200 dark:bg-zinc-800 rounded-2xl overflow-hidden shadow-2xl group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500">
                                        {/* Fallback pattern if no image */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center">
                                            <span className="text-9xl font-black text-zinc-50 dark:text-zinc-800 select-none opacity-50">{index + 1}</span>
                                        </div>
                                        {/* Real Image Placeholder - replace with Image component when using actual images */}
                                        {project.images && project.images[0] && (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={project.images[0]} alt={project.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                        )}

                                        {/* Overlay Actions */}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm">
                                            {project.liveUrl && (
                                                <Button size="icon" className="h-14 w-14 rounded-full bg-white text-zinc-900 hover:bg-zinc-200 border-none shadow-xl hover:scale-110 transition-all" asChild>
                                                    <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                                        <ExternalLink className="w-6 h-6" />
                                                    </Link>
                                                </Button>
                                            )}
                                            {project.githubUrl && (
                                                // Renders transparent GitHub button with white border to avoid invisible icon in light mode
                                                <Button size="icon" variant="ghost" className="h-14 w-14 rounded-full border-2 border-white bg-transparent text-white hover:bg-white hover:text-zinc-900 shadow-xl hover:scale-110 transition-all" asChild>
                                                    <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                                        <Github className="w-6 h-6" />
                                                    </Link>
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Text Content */}
                                <div className={`lg:col-span-5 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                                    <div className="flex flex-col h-full justify-center">
                                        <div className="flex gap-2 flex-wrap mb-6">
                                            {project.techStack.slice(0, 4).map((tech, i) => (
                                                <Badge key={i} variant="secondary" className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                                                    {tech}
                                                </Badge>
                                            ))}
                                        </div>

                                        <h3 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            <Link href={`/projects/${project.slug}`}>
                                                {project.title}
                                            </Link>
                                        </h3>

                                        <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed mb-8 line-clamp-3">
                                            {project.description}
                                        </p>

                                        <Link href={`/projects/${project.slug}`} className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100 hover:underline underline-offset-4">
                                            View Case Study
                                            <ArrowUpRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
