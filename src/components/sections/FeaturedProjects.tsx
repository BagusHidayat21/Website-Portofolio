'use client';

// Featured Projects section with visual cards and image previews
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ExternalLink, Github, Star, Eye, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProjectWithRepo } from '@/types';

interface FeaturedProjectsProps {
    projects?: ProjectWithRepo[];
}

// Placeholder projects for demo
const placeholderProjects: ProjectWithRepo[] = [
    {
        id: 1,
        githubId: 1,
        repoName: 'ecommerce-platform',
        url: 'https://github.com',
        liveUrl: 'https://example.com',
        title: 'E-Commerce Platform',
        description: 'A modern, full-featured e-commerce platform built with Next.js and Stripe integration.',
        images: [],
        tags: ['Next.js', 'TypeScript', 'Stripe', 'Prisma'],
        techStack: ['React', 'Node.js', 'PostgreSQL'],
        isFeatured: true,
        isVisible: true,
        order: 0,
        stars: 128,
        language: 'TypeScript',
    },
    {
        id: 2,
        githubId: 2,
        repoName: 'ai-chat-app',
        url: 'https://github.com',
        liveUrl: 'https://example.com',
        title: 'AI Chat Application',
        description: 'Real-time AI-powered chat with WebSocket and OpenAI integration.',
        images: [],
        tags: ['React', 'OpenAI', 'WebSocket'],
        techStack: ['Node.js', 'Redis'],
        isFeatured: true,
        isVisible: true,
        order: 1,
        stars: 89,
        language: 'TypeScript',
    },
    {
        id: 3,
        githubId: 3,
        repoName: 'dashboard-analytics',
        url: 'https://github.com',
        title: 'Analytics Dashboard',
        description: 'Beautiful data visualization with interactive charts.',
        images: [],
        tags: ['React', 'D3.js', 'Tailwind'],
        techStack: ['Node.js', 'MongoDB'],
        isFeatured: true,
        isVisible: true,
        order: 2,
        stars: 67,
        language: 'TypeScript',
    },
];

// Project card component
function ProjectCard({ project, index, large = false }: { project: ProjectWithRepo; index: number; large?: boolean }) {
    const [isHovered, setIsHovered] = useState(false);
    const router = useRouter();
    const imageUrl = `https://picsum.photos/seed/featured${project.id}/800/600`;

    const handleCardClick = () => {
        router.push(`/projects/${project.id}`);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1, type: 'spring' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleCardClick}
            className={`cursor-pointer ${large ? 'lg:col-span-2' : ''}`}
        >
            <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                <Card className="bg-zinc-900/50 border-zinc-800 overflow-hidden group hover:border-purple-500/30 transition-all h-full">
                    {/* Image Preview */}
                    <div className={`relative overflow-hidden bg-zinc-800 ${large ? 'aspect-[2/1]' : 'aspect-video'}`}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <motion.img
                            src={imageUrl}
                            alt={project.title || 'Project'}
                            className="w-full h-full object-cover"
                            animate={{ scale: isHovered ? 1.1 : 1 }}
                            transition={{ duration: 0.5 }}
                        />

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent" />

                        {/* Hover overlay */}
                        <motion.div
                            className="absolute inset-0 bg-black/60 flex items-center justify-center gap-3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isHovered ? 1 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: isHovered ? 1 : 0, rotate: isHovered ? 0 : -180 }}
                                transition={{ delay: 0.05, type: 'spring' }}
                                className="p-3 rounded-full bg-white text-black"
                            >
                                <Eye className="h-5 w-5" />
                            </motion.div>
                            <motion.button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    window.open(project.url!, '_blank');
                                }}
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: isHovered ? 1 : 0, rotate: isHovered ? 0 : -180 }}
                                transition={{ delay: 0.1, type: 'spring' }}
                                className="p-3 rounded-full bg-zinc-800 text-white hover:bg-zinc-700"
                            >
                                <Github className="h-5 w-5" />
                            </motion.button>
                            {project.liveUrl && (
                                <motion.button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        window.open(project.liveUrl!, '_blank');
                                    }}
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: isHovered ? 1 : 0, rotate: isHovered ? 0 : -180 }}
                                    transition={{ delay: 0.15, type: 'spring' }}
                                    className="p-3 rounded-full bg-purple-600 text-white hover:bg-purple-500"
                                >
                                    <ExternalLink className="h-5 w-5" />
                                </motion.button>
                            )}
                        </motion.div>

                        {/* Featured badge */}
                        <div className="absolute top-3 left-3">
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                            >
                                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 border-0 text-white">
                                    <Sparkles className="h-3 w-3 mr-1" />
                                    Featured
                                </Badge>
                            </motion.div>
                        </div>

                        {/* Language */}
                        {project.language && (
                            <div className="absolute top-3 right-3">
                                <Badge variant="outline" className="bg-black/50 backdrop-blur-sm border-zinc-700 text-white">
                                    <span className="w-2 h-2 rounded-full bg-blue-500 mr-1.5" />
                                    {project.language}
                                </Badge>
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-2">
                            <h3 className={`font-semibold group-hover:text-purple-400 transition-colors ${large ? 'text-xl' : 'text-lg'}`}>
                                {project.title}
                            </h3>
                            <motion.div
                                animate={{ x: isHovered ? 0 : -5, opacity: isHovered ? 1 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ArrowUpRight className="h-5 w-5 text-purple-400" />
                            </motion.div>
                        </div>

                        <p className={`text-zinc-400 mb-4 ${large ? 'text-base' : 'text-sm line-clamp-2'}`}>
                            {project.description}
                        </p>

                        {/* Stats */}
                        <div className="flex items-center gap-4 text-xs text-zinc-500 mb-4">
                            <div className="flex items-center gap-1">
                                <Star className="h-3.5 w-3.5 text-yellow-500" />
                                <span>{project.stars}</span>
                            </div>
                        </div>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-1.5">
                            {project.tags.slice(0, large ? 5 : 3).map((tag) => (
                                <Badge
                                    key={tag}
                                    variant="secondary"
                                    className="bg-zinc-800/80 text-zinc-300 text-xs"
                                >
                                    {tag}
                                </Badge>
                            ))}
                            {project.tags.length > (large ? 5 : 3) && (
                                <Badge variant="secondary" className="bg-zinc-800/50 text-zinc-500 text-xs">
                                    +{project.tags.length - (large ? 5 : 3)}
                                </Badge>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
}

export function FeaturedProjects({ projects = placeholderProjects }: FeaturedProjectsProps) {
    const displayProjects = projects.slice(0, 3);

    return (
        <section className="relative py-32 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-900/30 to-transparent" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ type: 'spring' }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6"
                        >
                            <motion.div
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                            >
                                <Star className="h-4 w-4 text-yellow-500" />
                            </motion.div>
                            <span className="text-sm text-purple-300">Featured Work</span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-bold mb-4"
                        >
                            <span className="bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
                                Selected Projects
                            </span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-zinc-400 max-w-xl"
                        >
                            A showcase of my best work, featuring modern web applications built with cutting-edge technologies.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Button asChild variant="outline" className="gap-2 group border-zinc-700 hover:bg-purple-500/10 hover:border-purple-500/30">
                            <Link href="/projects">
                                View All Projects
                                <motion.span
                                    animate={{ x: [0, 4, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    <ArrowRight className="h-4 w-4" />
                                </motion.span>
                            </Link>
                        </Button>
                    </motion.div>
                </div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayProjects.map((project, i) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={i}
                            large={i === 0}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
