'use client';

import { motion, AnimatePresence, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { useState, useRef } from 'react';
import { ExternalLink, Github, ArrowUpRight, Search, FolderOpen, Layers, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/data/static-db';
import { ProjectWithGithubStats } from '@/lib/github';

const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };

function FloatingParticle({ size, initialX, initialY, scrollY, speed = 1, delay = 0 }: {
    size: number; initialX: string; initialY: string;
    scrollY: MotionValue<number>; speed?: number; delay?: number;
}) {
    const y = useTransform(scrollY, [0, 1], [0, 200 * speed]);
    const smoothY = useSpring(y, springConfig);
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.4, scale: 1 }}
            transition={{ duration: 1.5, delay }}
            style={{ y: smoothY, left: initialX, top: initialY, width: size, height: size }}
            className="absolute rounded-full bg-gradient-to-br from-zinc-400/30 to-zinc-600/20 dark:from-zinc-500/20 dark:to-zinc-300/10 blur-sm pointer-events-none"
        />
    );
}

const categories = [
    { id: 'all', label: 'All' },
    { id: 'web', label: 'Web' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'ai', label: 'AI & Data' },
    { id: 'backend', label: 'Backend' },
    { id: 'tool', label: 'Tools' },
];

function detectCategory(project: Project): string {
    const all = [...(project.techStack || []), ...(project.tags || [])].map(t => t.toLowerCase());
    if (all.some(t => ['android', 'ios', 'flutter', 'dart', 'react native', 'expo', 'kotlin', 'swift'].some(k => t.includes(k)))) return 'mobile';
    if (all.some(t => ['machine learning', 'ai', 'data science', 'python', 'openai', 'pytorch', 'tensorflow', 'scikit', 'pandas', 'fastapi'].some(k => t.includes(k)))) return 'ai';
    if (all.some(t => ['node', 'express', 'nest', 'go', 'rust', 'docker', 'kubernetes'].includes(t)) && !all.some(t => ['react', 'vue', 'next.js', 'frontend'].includes(t))) return 'backend';
    return 'web';
}

function ProjectCard({ project, index }: { project: ProjectWithGithubStats; index: number }) {
    const imageUrl = project.images?.[0] ?? null;
    const category = detectCategory(project);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
            className="group"
        >
            <Link href={`/projects/${project.slug}`} className="block">
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800/60 mb-4">
                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt={project.title}
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex items-center justify-center w-full h-full">
                            <FolderOpen className="w-10 h-10 text-zinc-300 dark:text-zinc-600" />
                        </div>
                    )}

                    <div className="absolute inset-0 bg-zinc-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                        <div className="flex gap-2">
                            {project.githubUrl && (
                                <button
                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(project.githubUrl!, '_blank'); }}
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full transition-colors"
                                >
                                    <Github className="w-3.5 h-3.5" />
                                    Code
                                </button>
                            )}
                            {project.liveUrl && (
                                <button
                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(project.liveUrl!, '_blank'); }}
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full transition-colors"
                                >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                    Live
                                </button>
                            )}
                        </div>
                        <ArrowUpRight className="w-5 h-5 text-white" />
                    </div>
                </div>

                <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-semibold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase mb-1">
                            {category}
                        </p>
                        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 line-clamp-1 mb-1.5 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                            {project.title}
                        </h3>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed line-clamp-2">
                            {project.description}
                        </p>
                    </div>
                    {typeof project.githubStars === 'number' && (
                        <div className="flex items-center gap-1 text-xs font-medium text-zinc-400 dark:text-zinc-500 shrink-0 pt-4">
                            <Star className="w-3.5 h-3.5" />
                            {project.githubStars}
                        </div>
                    )}
                </div>

                <div className="flex flex-wrap gap-1.5 mt-3">
                    {(project.tags || []).slice(0, 3).map((tag: string) => (
                        <span
                            key={tag}
                            className="text-[11px] px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 font-medium"
                        >
                            {tag}
                        </span>
                    ))}
                    {(project.tags?.length || 0) > 3 && (
                        <span className="text-[11px] text-zinc-400 dark:text-zinc-500 self-center">
                            +{project.tags!.length - 3}
                        </span>
                    )}
                </div>
            </Link>
        </motion.div>
    );
}

export function ProjectsClient({ projects }: { projects: ProjectWithGithubStats[] }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const heroRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    });

    const bgY     = useSpring(useTransform(scrollYProgress, [0, 1], [0, 100]), springConfig);
    const bgScale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 1.1]), springConfig);
    const bgOpacity = useSpring(useTransform(scrollYProgress, [0, 0.5], [0.06, 0.02]), springConfig);
    const contentY  = useSpring(useTransform(scrollYProgress, [0, 1], [0, 80]), springConfig);
    const contentOpacity = useSpring(useTransform(scrollYProgress, [0.6, 1], [1, 0]), springConfig);
    const orbLeftY  = useSpring(useTransform(scrollYProgress, [0, 1], [0, 80]), springConfig);
    const orbRightY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 120]), springConfig);
    const statsY    = useSpring(useTransform(scrollYProgress, [0, 1], [0, 60]), springConfig);
    const decorY    = useSpring(useTransform(scrollYProgress, [0, 1], [0, 150]), springConfig);
    const decorRotate = useSpring(useTransform(scrollYProgress, [0, 1], [-12, 20]), springConfig);

    const filteredProjects = projects.filter((project) => {
        const matchesSearch =
            project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || detectCategory(project) === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const catCounts = categories.slice(1).map(c => ({
        ...c,
        count: projects.filter(p => detectCategory(p) === c.id).length,
    }));

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">

            <section
                ref={heroRef}
                className="relative min-h-[85dvh] flex flex-col justify-center overflow-hidden bg-zinc-50 dark:bg-zinc-950 pt-24 pb-32 lg:py-20"
            >
                <div className="hidden lg:block">
                    <FloatingParticle size={120} initialX="10%" initialY="20%" scrollY={scrollYProgress} speed={0.5} delay={0.2} />
                    <FloatingParticle size={80}  initialX="85%" initialY="15%" scrollY={scrollYProgress} speed={0.8} delay={0.4} />
                    <FloatingParticle size={60}  initialX="75%" initialY="60%" scrollY={scrollYProgress} speed={1.2} delay={0.6} />
                    <FloatingParticle size={100} initialX="5%"  initialY="70%" scrollY={scrollYProgress} speed={0.6} delay={0.3} />
                    <FloatingParticle size={40}  initialX="50%" initialY="80%" scrollY={scrollYProgress} speed={1.5} delay={0.5} />
                </div>

                <motion.div
                    className="absolute inset-0 z-0 dark:hidden pointer-events-none"
                    style={{ y: bgY, scale: bgScale, opacity: bgOpacity,
                        backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
                        backgroundSize: '40px 40px' }}
                />
                <motion.div
                    className="absolute inset-0 z-0 hidden dark:block pointer-events-none"
                    style={{ y: bgY, scale: bgScale, opacity: bgOpacity,
                        backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                        backgroundSize: '40px 40px' }}
                />

                <motion.div
                    className="absolute top-1/4 -left-32 w-96 h-96 bg-gradient-to-br from-zinc-200/40 to-transparent dark:from-zinc-700/20 rounded-full blur-3xl pointer-events-none"
                    style={{ y: orbLeftY }}
                />
                <motion.div
                    className="absolute bottom-1/4 -right-32 w-80 h-80 bg-gradient-to-tl from-zinc-300/30 to-transparent dark:from-zinc-600/15 rounded-full blur-3xl pointer-events-none"
                    style={{ y: orbRightY }}
                />

                <motion.div
                    style={{ y: contentY, opacity: contentOpacity }}
                    className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-8 relative z-10 grid md:grid-cols-12 gap-8 md:gap-10 lg:gap-16 items-center"
                >
                    <div className="md:col-span-8 flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="mb-3 lg:mb-4 flex items-center gap-3"
                        >
                            <div className="h-[2px] w-8 bg-zinc-900 dark:bg-zinc-100" />
                            <span className="text-base sm:text-lg font-medium text-zinc-600 dark:text-zinc-400">
                                Portfolio <span className="text-zinc-900 dark:text-zinc-100 font-bold">Archive</span>
                            </span>
                        </motion.div>

                        <div className="relative mb-6 lg:mb-8">
                            <motion.h1
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                                className="text-5xl sm:text-6xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100 leading-[0.95]"
                            >
                                ALL WORK
                                <br />
                                <span className="text-zinc-900 dark:text-zinc-400">& PROJECTS.</span>
                            </motion.h1>

                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                style={{ y: decorY, rotate: decorRotate }}
                                className="absolute -top-6 right-0 sm:-top-8 sm:right-4 lg:-top-12 lg:right-8 block"
                            >
                                <Layers className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 text-zinc-900 dark:text-zinc-100" />
                                <div className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-[10px] sm:text-xs px-2 py-1 rounded absolute top-8 right-0 sm:top-10 sm:left-6 sm:right-auto whitespace-nowrap">
                                    {projects.length}+ projects
                                </div>
                            </motion.div>
                        </div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl font-medium leading-relaxed"
                        >
                            A complete archive of engineering work — web apps, mobile solutions, data pipelines, and open source tools built with precision.
                        </motion.p>
                    </div>

                    <div className="md:col-span-4 flex flex-col items-start md:items-end gap-6">
                        <motion.div
                            style={{ y: statsY }}
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 }}
                            className="text-center lg:text-right"
                        >
                            <h2
                                className="text-7xl sm:text-8xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter leading-none"
                                style={{ WebkitTextStroke: '1px #d4d4d8', color: 'transparent' }}
                            >
                                {String(projects.length).padStart(2, '0')}
                            </h2>
                            <p className="text-sm font-bold text-zinc-400 dark:text-zinc-500 tracking-widest uppercase mt-1">
                                Total Projects
                            </p>
                        </motion.div>

                        <motion.div
                            style={{ y: statsY }}
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.85 }}
                            className="flex flex-wrap gap-x-5 gap-y-2 md:justify-end"
                        >
                            {catCounts.map(c => (
                                <div key={c.id} className="flex items-baseline gap-1.5">
                                    <span className="text-xl font-black text-zinc-900 dark:text-zinc-100">{c.count}</span>
                                    <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">{c.label}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            <section className="sticky top-0 z-30 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-100 dark:border-zinc-800">
                <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-8 py-3 flex flex-col sm:flex-row items-center gap-3 justify-between">
                    <div className="flex gap-1 overflow-x-auto no-scrollbar w-full sm:w-auto">
                        {categories.map(cat => {
                            const count = cat.id === 'all'
                                ? projects.length
                                : projects.filter(p => detectCategory(p) === cat.id).length;

                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                                        selectedCategory === cat.id
                                            ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900'
                                            : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                                    }`}
                                >
                                    {cat.label}
                                    <span className={`text-[10px] ${selectedCategory === cat.id ? 'opacity-60' : 'opacity-50'}`}>
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="relative w-full sm:w-56 flex-shrink-0">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-zinc-50 dark:bg-zinc-900 rounded-full pl-9 pr-4 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-zinc-200 dark:focus:ring-zinc-700 transition-all"
                        />
                    </div>
                </div>
            </section>

            <section className="py-14 pb-32">
                <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-8">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={`${selectedCategory}-${searchQuery}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-xs text-zinc-400 dark:text-zinc-500 mb-8"
                        >
                            {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
                            {(selectedCategory !== 'all' || searchQuery) && ` found`}
                        </motion.p>
                    </AnimatePresence>

                    {filteredProjects.length > 0 ? (
                        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
                            <AnimatePresence mode="popLayout">
                                {filteredProjects.map((project, index) => (
                                    <ProjectCard key={project.id} project={project} index={index} />
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col items-center py-28 text-center"
                        >
                            <Search className="w-8 h-8 text-zinc-300 dark:text-zinc-600 mb-4" />
                            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                                No projects found
                            </h3>
                            <p className="text-sm text-zinc-400 dark:text-zinc-500 mb-6">
                                Try adjusting your search or filter.
                            </p>
                            <button
                                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                                className="px-5 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-sm font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                            >
                                Clear filters
                            </button>
                        </motion.div>
                    )}
                </div>
            </section>
        </div>
    );
}
