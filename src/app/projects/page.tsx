'use client';

// Premium Monochrome Projects Archive
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ExternalLink, Github, ArrowUpRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ProjectWithRepo } from '@/types';
import { dummyProjects } from '@/lib/dummy-data';
import Link from 'next/link';

// Simplified categories
const categories = [
    { id: 'all', label: 'All Work' },
    { id: 'web', label: 'Web Development' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'ai', label: 'AI & Data' },
    { id: 'backend', label: 'Backend' },
];

function detectCategory(project: ProjectWithRepo): string {
    const allTechs = [...(project.techStack || []), ...(project.tags || [])].map(t => t.toLowerCase());
    if (allTechs.some(t => ['flutter', 'dart', 'kotlin', 'swift', 'react native'].includes(t))) return 'mobile';
    if (allTechs.some(t => ['ai', 'ml', 'openai', 'python', 'fastapi'].includes(t))) return 'ai';
    if (allTechs.some(t => ['node', 'express', 'nest', 'go', 'rust', 'backend'].includes(t)) && !allTechs.some(t => ['react', 'vue', 'next.js'])) return 'backend';
    return 'web';
}

function ProjectCard({ project, index }: { project: ProjectWithRepo; index: number }) {
    const imageUrl = project.images?.[0] || `https://picsum.photos/seed/project${project.id}/800/600`;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="group"
        >
            <Link href={`/projects/${project.id}`} className="block h-full">
                <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 h-full overflow-hidden hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-zinc-950/50 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-500 rounded-sm group-hover:-translate-y-1">
                    {/* Visual */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100 dark:bg-zinc-800 border-b border-zinc-100 dark:border-zinc-800">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <motion.img
                            src={imageUrl}
                            alt={project.title || 'Project'}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            whileHover={{ scale: 1.05 }}
                        />

                        {/* Overlay with Quick Actions */}
                        <div className="absolute inset-0 bg-black/50 dark:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                            {project.url && (
                                <button className="p-3 bg-white dark:bg-zinc-800 text-black dark:text-white rounded-full hover:scale-110 transition-transform" onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(project.url!, '_blank'); }}>
                                    <Github className="w-5 h-5" />
                                </button>
                            )}
                            {project.liveUrl && (
                                <button className="p-3 bg-white dark:bg-zinc-800 text-black dark:text-white rounded-full hover:scale-110 transition-transform" onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(project.liveUrl!, '_blank'); }}>
                                    <ExternalLink className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Metadata */}
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:underline decoration-1 underline-offset-4 decoration-zinc-300 dark:decoration-zinc-700 mb-1">
                                    {project.title}
                                </h3>
                                <p className="text-xs font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                                    {project.language || 'Development'}
                                </p>
                            </div>
                            <ArrowUpRight className="w-5 h-5 text-zinc-300 dark:text-zinc-700 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                        </div>

                        <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed line-clamp-2 mb-6">
                            {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {(project.tags || []).slice(0, 3).map((tag: string) => (
                                <Badge key={tag} variant="secondary" className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 border-0 font-normal">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </Link>
        </motion.div>
    );
}

export default function ProjectsPage() {
    const [projects, setProjects] = useState<ProjectWithRepo[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    useEffect(() => {
        // Simulating API latency for better UX feel
        setTimeout(() => {
            setProjects(dummyProjects);
            setLoading(false);
        }, 800);
    }, []);

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
                    <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 w-full md:w-auto no-scrollbar">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${selectedCategory === cat.id
                                    ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900'
                                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-zinc-500" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all font-medium placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
                        />
                    </div>
                </div>
            </section>

            {/* Grid Section */}
            <section className="py-16">
                <div className="container mx-auto px-6">
                    {loading ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <Skeleton key={i} className="aspect-[4/5] rounded-sm" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <AnimatePresence mode="popLayout">
                                {filteredProjects.map((project, index) => (
                                    <ProjectCard key={project.id} project={project} index={index} />
                                ))}
                            </AnimatePresence>
                        </div>
                    )}

                    {!loading && filteredProjects.length === 0 && (
                        <div className="text-center py-24">
                            <p className="text-zinc-400 dark:text-zinc-500 text-lg">No projects found matching your criteria.</p>
                            <Button
                                variant="link"
                                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                                className="mt-4"
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
