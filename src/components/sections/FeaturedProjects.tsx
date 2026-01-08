'use client';

// Premium Minimalist Projects Section
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useRef } from 'react';
import { ProjectWithRepo } from '@/types';

interface FeaturedProjectsProps {
    projects?: ProjectWithRepo[];
}

// Placeholder data if none provided
const placeholderProjects: ProjectWithRepo[] = [
    {
        id: 1,
        githubId: 1,
        repoName: 'ecommerce',
        url: '#',
        liveUrl: '#',
        title: 'E-Commerce Platform',
        description: 'A headless e-commerce solution built for performance and scalability. Features real-time inventory, seamless checkout, and an intuitive admin dashboard.',
        images: [], // We'll use random images in the component
        tags: ['Next.js', 'Stripe', 'PostgreSQL'],
        techStack: [],
        isFeatured: true,
        isVisible: true,
        order: 0,
        stars: 0,
        language: 'TypeScript'
    },
    {
        id: 2,
        githubId: 2,
        repoName: 'ai-dashboard',
        url: '#',
        liveUrl: '#',
        title: 'AI Analytics Dashboard',
        description: 'Real-time data visualization platform processing thousands of events per second with AI-driven insights and predictive modeling.',
        images: [],
        tags: ['React', 'Python', 'D3.js'],
        techStack: [],
        isFeatured: true,
        isVisible: true,
        order: 1,
        stars: 0,
        language: 'TypeScript'
    },
    {
        id: 3,
        githubId: 3,
        repoName: 'banking-app',
        url: '#',
        liveUrl: '#',
        title: 'Modern Banking App',
        description: 'Secure and compliant fintech application focused on user experience. Biometric authentication, instant transfers, and spending analytics.',
        images: [],
        tags: ['React Native', 'Node.js', 'Redis'],
        techStack: [],
        isFeatured: true,
        isVisible: true,
        order: 2,
        stars: 0,
        language: 'TypeScript'
    }
];

function ProjectItem({ project, index }: { project: ProjectWithRepo; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
            className="group py-12 md:py-24 border-b border-zinc-200 last:border-0"
        >
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
                {/* Visual Side */}
                <div className={`lg:w-3/5 w-full ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <Link href={`/projects/${project.id}`}>
                        <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 rounded-sm">
                            <div className="absolute inset-0 bg-zinc-900/5 group-hover:bg-transparent transition-colors duration-500 z-10" />
                            {/* Image Placeholder */}
                            <motion.img
                                src={`https://picsum.photos/seed/${project.id + 10}/1600/1000`}
                                alt={project.title}
                                className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
                                whileHover={{ scale: 1.03 }}
                            />
                        </div>
                    </Link>
                </div>

                {/* Content Side */}
                <div className="lg:w-2/5 w-full flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                        <span className="text-xs font-mono text-zinc-400">0{index + 1}</span>
                        <div className="h-px w-12 bg-zinc-200" />
                    </div>

                    <h3 className="text-3xl md:text-5xl font-bold text-zinc-900 leading-tight group-hover:underline decoration-1 underline-offset-8 decoration-zinc-300 transition-all">
                        <Link href={`/projects/${project.id}`}>
                            {project.title}
                        </Link>
                    </h3>

                    <p className="text-zinc-500 text-lg leading-relaxed">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-2">
                        {project.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="bg-zinc-100 text-zinc-600 hover:bg-zinc-200 font-normal rounded-md px-3 py-1">
                                {tag}
                            </Badge>
                        ))}
                    </div>

                    <div className="pt-4">
                        <Button asChild variant="outline" className="rounded-full h-12 px-6 border-zinc-200 text-zinc-900 hover:bg-zinc-900 hover:text-white transition-colors group/btn">
                            <Link href={`/projects/${project.id}`}>
                                View Case Study
                                <ArrowUpRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export function FeaturedProjects({ projects = placeholderProjects }: FeaturedProjectsProps) {
    const displayProjects = projects.slice(0, 3);

    return (
        <section className="bg-white py-24 md:py-32">
            <div className="container mx-auto px-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 md:mb-32 gap-6">
                    <div>
                        <h2 className="text-5xl md:text-7xl font-bold text-zinc-900 tracking-tight mb-4">
                            Selected Works
                        </h2>
                        <p className="text-zinc-500 text-lg md:text-xl max-w-md">
                            A curation of projects that showcase my passion for design and engineering.
                        </p>
                    </div>
                    <Button asChild variant="link" className="text-zinc-900 text-lg p-0 h-auto underline-offset-4 hover:text-zinc-600">
                        <Link href="/projects">
                            See all archive
                        </Link>
                    </Button>
                </div>

                {/* Projects List */}
                <div className="flex flex-col">
                    {displayProjects.map((project, index) => (
                        <ProjectItem key={project.id} project={project} index={index} />
                    ))}
                </div>

            </div>
        </section>
    );
}
