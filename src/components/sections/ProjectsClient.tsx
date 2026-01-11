'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ExternalLink, Github, ArrowUpRight, Search, FolderGit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Project } from '@/data/static-db';

// Simplified categories
const categories = [
    { id: 'all', label: 'All Work' },
    { id: 'web', label: 'Web Development' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'ai', label: 'AI & Data' },
    { id: 'backend', label: 'Backend' },
    { id: 'tool', label: 'Tools' }
];

function detectCategory(project: Project): string {
    const allTechs = [...(project.techStack || []), ...(project.tags || [])].map(t => t.toLowerCase());

    // Explicit overrides based on tags if present
    if (allTechs.some(t => t.includes('android') || t.includes('ios') || t.includes('flutter') || t.includes('react native'))) return 'mobile';
    if (allTechs.some(t => t.includes('machine learning') || t.includes('ai') || t.includes('data science') || t.includes('python'))) return 'ai';

    // Default fallback heuristics
    if (allTechs.some(t => ['flutter', 'dart', 'kotlin', 'swift', 'react native', 'expo'].includes(t))) return 'mobile';
    if (allTechs.some(t => ['ai', 'ml', 'openai', 'pytorch', 'tensorflow', 'scikit', 'pandas', 'fastapi'].includes(t))) return 'ai';
    if (allTechs.some(t => ['node', 'express', 'nest', 'go', 'rust', 'docker', 'kubernetes'].includes(t)) && !allTechs.some(t => ['react', 'vue', 'next.js', 'frontend'].includes(t))) return 'backend';

    return 'web';
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
    const imageUrl = project.images?.[0] || null; // Fallback handled by UI if null

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="group h-full"
        >
            <Link href={`/projects/${project.slug}`} className="block h-full">
                <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 h-full overflow-hidden hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-zinc-950/50 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-500 rounded-lg group-hover:-translate-y-1 flex flex-col">
                    {/* Visual */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-zinc-800 border-b border-zinc-100 dark:border-zinc-800">
                        {imageUrl ? (
                            <motion.img
                                src={imageUrl}
                                alt={project.title}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                whileHover={{ scale: 1.05 }}
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center w-full h-full text-zinc-300 dark:text-zinc-700 bg-zinc-50 dark:bg-zinc-900">
                                <FolderGit2 className="w-16 h-16 mb-2 opacity-50" />
                            </div>
                        )}

                        {/* Overlay with Quick Actions */}
                        <div className="absolute inset-0 bg-black/50 dark:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                            {project.githubUrl && (
                                <button className="p-3 bg-white dark:bg-zinc-800 text-black dark:text-white rounded-full hover:scale-110 transition-transform shadow-lg" onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(project.githubUrl!, '_blank'); }}>
                                    <Github className="w-5 h-5" />
                                </button>
                            )}
                            {project.liveUrl && (
                                <button className="p-3 bg-white dark:bg-zinc-800 text-black dark:text-white rounded-full hover:scale-110 transition-transform shadow-lg" onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(project.liveUrl!, '_blank'); }}>
                                    <ExternalLink className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Metadata */}
                    <CardContent className="p-6 flex flex-col flex-1">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:underline decoration-1 underline-offset-4 decoration-zinc-300 dark:decoration-zinc-700 mb-1 line-clamp-1">
                                    {project.title}
                                </h3>
                                <p className="text-xs font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                                    {detectCategory(project)} Project
                                </p>
                            </div>
                            <ArrowUpRight className="w-5 h-5 text-zinc-300 dark:text-zinc-700 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                        </div>

                        <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
                            {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-auto">
                            {(project.tags || []).slice(0, 3).map((tag: string) => (
                                <Badge key={tag} variant="secondary" className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 border-0 font-normal shadow-none">
                                    {tag}
                                </Badge>
                            ))}
                            {(project.tags?.length || 0) > 3 && (
                                <span className="text-xs text-zinc-400 self-center">+{project.tags!.length - 3}</span>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </Link>
        </motion.div>
    );
}

export function ProjectsClient({ projects }: { projects: Project[] }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const filteredProjects = projects.filter((project) => {
        const matchesSearch =
            project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || detectCategory(project) === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950">
            {/* Header Section */}
            <section className="pt-32 pb-16 border-b border-zinc-100 dark:border-zinc-900">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100 mb-6">
                            ARCHIVE
                        </h1>
                        <p className="text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed">
                            A complete collection of my engineering work, experiments, and open source contributions.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Controls Section */}
            <section className="py-8 sticky top-0 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-100 dark:border-zinc-900 z-30">
                <div className="container mx-auto px-6 flex flex-col md:flex-row gap-6 items-center justify-between">
                    {/* Category Tabs */}
                    <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 w-full md:w-auto no-scrollbar mask-gradient-right">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${selectedCategory === cat.id
                                    ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-lg'
                                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="relative w-full md:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-zinc-500" />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-full pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:focus:ring-zinc-100/10 transition-all font-medium placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
                        />
                    </div>
                </div>
            </section>

            {/* Grid Section */}
            <section className="py-16">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pb-24">
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project, index) => (
                                <ProjectCard key={project.id} project={project} index={index} />
                            ))}
                        </AnimatePresence>
                    </div>

                    {filteredProjects.length === 0 && (
                        <div className="text-center py-24">
                            <div className="bg-zinc-100 dark:bg-zinc-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-6 h-6 text-zinc-400" />
                            </div>
                            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1">No projects found</h3>
                            <p className="text-zinc-400 dark:text-zinc-500 text-sm mb-6">We couldn&apos;t find any projects matching your search.</p>
                            <Button
                                variant="outline"
                                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                                className="rounded-full"
                            >
                                Clear filters
                            </Button>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
