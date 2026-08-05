'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Calendar, Code2, ExternalLink, FolderGit2, Github, Layers, Star, UserCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Project } from '@/data/static-db';
import { useGithubStats } from '@/hooks/useGithubStats';
import ReactMarkdown from 'react-markdown';

export function ProjectDetailClient({ project: baseProject }: { project: Project }) {
    const router = useRouter();
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef });
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
    const stats = useGithubStats();
    const statsLoading = stats === null;
    const project = useMemo(
        () => ({ ...baseProject, ...stats?.[baseProject.slug] }),
        [baseProject, stats]
    );

    return (
        <div ref={containerRef} className="min-h-screen bg-white dark:bg-zinc-950 pb-20">
            {/* Header Hero Section */}
            <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white pt-24 pb-16">
                <motion.div
                    style={{ opacity: heroOpacity, scale: heroScale }}
                    className="container mx-auto px-6 relative z-10"
                >
                    <div className="max-w-4xl mx-auto text-center md:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-6">
                                <Badge variant="outline" className="text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md">
                                    {project.isFeatured ? 'Featured Case Study' : 'Case Study'}
                                </Badge>
                                {project.tags && project.tags[0] && (
                                    <Badge variant="secondary" className="bg-zinc-200/80 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 px-3 py-1 text-xs font-medium rounded-full">
                                        {project.tags[0]}
                                    </Badge>
                                )}
                            </div>

                            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[0.95] text-zinc-900 dark:text-white">
                                {project.title}
                            </h1>
                            <p className="text-lg md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed font-normal">
                                {project.description}
                            </p>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Decorative background grid */}
                <div className="absolute inset-0 z-0 opacity-[0.04] dark:hidden"
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

            {/* Sticky Bar */}
            <section className="bg-white/90 dark:bg-zinc-950/90 border-y border-zinc-200/80 dark:border-zinc-800/80 sticky top-0 z-30 backdrop-blur-xl">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between gap-4">
                    <Button
                        variant="ghost"
                        onClick={() => router.back()}
                        className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 gap-2 pl-0 hover:bg-transparent"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Projects</span>
                    </Button>

                    <div className="flex items-center gap-3">
                        {project.githubUrl && (
                            <Button asChild variant="outline" className="rounded-full border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 shadow-sm">
                                <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                    <Github className="w-4 h-4 mr-2" />
                                    <span>Repository</span>
                                </Link>
                            </Button>
                        )}
                        {project.liveUrl && (
                            <Button asChild className="rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 shadow-sm">
                                <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                    <span>Live Preview</span>
                                    <ArrowUpRight className="w-4 h-4 ml-2" />
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>
            </section>

            {/* Main Content Layout */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
                        {/* Sidebar */}
                        <div className="lg:col-span-4 space-y-8">
                            <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 space-y-6 shadow-sm">
                                {/* Role */}
                                <div>
                                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2">
                                        <UserCheck className="w-3.5 h-3.5" />
                                        <span>Role</span>
                                    </div>
                                    <p className="text-zinc-900 dark:text-zinc-100 font-semibold text-base">
                                        Full-Stack Developer
                                    </p>
                                </div>

                                {/* Tech Stack */}
                                <div>
                                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3">
                                        <Code2 className="w-3.5 h-3.5" />
                                        <span>Technologies</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {(project.techStack || []).map((t: string) => (
                                            <Badge key={t} variant="outline" className="text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-medium px-2.5 py-1">
                                                {t}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {/* Tags / Categories */}
                                <div>
                                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3">
                                        <Layers className="w-3.5 h-3.5" />
                                        <span>Categories</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {(project.tags || []).map((t: string) => (
                                            <Badge key={t} variant="secondary" className="bg-zinc-200/70 dark:bg-zinc-800/70 text-zinc-700 dark:text-zinc-300 font-normal px-2.5 py-1">
                                                {t}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {/* Date */}
                                <div>
                                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2">
                                        <Calendar className="w-3.5 h-3.5" />
                                        <span>Created / Year</span>
                                    </div>
                                    <p className="text-zinc-900 dark:text-zinc-100 font-medium text-sm">
                                        {new Date(project.createdAt || project.updatedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                    </p>
                                </div>

                                {/* GitHub Live Stats */}
                                {project.githubUrl && statsLoading ? (
                                    <div className="pt-4 border-t border-zinc-200/80 dark:border-zinc-800/80">
                                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3">
                                            <FolderGit2 className="w-3.5 h-3.5" />
                                            <span>Repository Stats</span>
                                        </div>
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-32" />
                                            <Skeleton className="h-3 w-40" />
                                        </div>
                                    </div>
                                ) : (typeof project.githubStars === 'number' || project.githubUpdatedAt) && (
                                    <div className="pt-4 border-t border-zinc-200/80 dark:border-zinc-800/80">
                                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3">
                                            <FolderGit2 className="w-3.5 h-3.5" />
                                            <span>Repository Stats</span>
                                        </div>
                                        <div className="space-y-2">
                                            {typeof project.githubStars === 'number' && (
                                                <p className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-medium text-sm">
                                                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                                    <span>{project.githubStars} GitHub stars</span>
                                                </p>
                                            )}
                                            {project.githubUpdatedAt && (
                                                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                                    Latest commit: {new Date(project.githubUpdatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Main Article & Media Column */}
                        <div className="lg:col-span-8 space-y-12">
                            {/* Main Cover Image */}
                            {project.thumbnail && (
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xl"
                                >
                                    <Image
                                        src={project.thumbnail}
                                        alt={project.title}
                                        fill
                                        sizes="(min-width: 1024px) 66vw, 100vw"
                                        priority
                                        className="object-cover"
                                    />
                                </motion.div>
                            )}

                            {/* Markdown Content */}
                            {project.content ? (
                                <div className="prose prose-zinc dark:prose-invert max-w-none">
                                    <ReactMarkdown
                                        components={{
                                            h1: ({ children }) => (
                                                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mt-10 mb-4 pb-2 border-b border-zinc-200 dark:border-zinc-800">
                                                    {children}
                                                </h1>
                                            ),
                                            h2: ({ children }) => (
                                                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mt-10 mb-4 pb-2 border-b border-zinc-200 dark:border-zinc-800">
                                                    {children}
                                                </h2>
                                            ),
                                            h3: ({ children }) => (
                                                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-3">
                                                    {children}
                                                </h3>
                                            ),
                                            p: ({ children }) => (
                                                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed my-4 text-base md:text-lg">
                                                    {children}
                                                </p>
                                            ),
                                            ul: ({ children }) => (
                                                <ul className="my-6 space-y-3 list-none pl-0">
                                                    {children}
                                                </ul>
                                            ),
                                            li: ({ children }) => (
                                                <li className="flex items-start gap-3 text-zinc-700 dark:text-zinc-300 text-base md:text-lg">
                                                    <span className="inline-block w-2 h-2 rounded-full bg-zinc-900 dark:bg-zinc-100 mt-2.5 shrink-0" />
                                                    <div className="flex-1">{children}</div>
                                                </li>
                                            ),
                                            code: ({ children }) => (
                                                <code className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-2 py-0.5 rounded-md font-mono text-sm border border-zinc-200 dark:border-zinc-700">
                                                    {children}
                                                </code>
                                            ),
                                            blockquote: ({ children }) => (
                                                <blockquote className="border-l-4 border-zinc-900 dark:border-zinc-100 pl-5 italic text-zinc-700 dark:text-zinc-300 my-8 text-lg bg-zinc-50 dark:bg-zinc-900/50 py-3 rounded-r-xl">
                                                    {children}
                                                </blockquote>
                                            ),
                                            table: ({ children }) => (
                                                <div className="overflow-x-auto my-8 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                                                    <table className="w-full text-left text-sm text-zinc-700 dark:text-zinc-300">
                                                        {children}
                                                    </table>
                                                </div>
                                            ),
                                            th: ({ children }) => (
                                                <th className="bg-zinc-100 dark:bg-zinc-900 px-4 py-3 font.bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800">
                                                    {children}
                                                </th>
                                            ),
                                            td: ({ children }) => (
                                                <td className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800/60">
                                                    {children}
                                                </td>
                                            ),
                                        }}
                                    >
                                        {project.content}
                                    </ReactMarkdown>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">Overview</h2>
                                    <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                        {project.description}
                                    </p>
                                </div>
                            )}

                            {/* Additional Images Gallery */}
                            {project.images && project.images.length > 0 && (
                                <div className="space-y-6 pt-10 border-t border-zinc-200/80 dark:border-zinc-800/80">
                                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                                        Project Screenshots
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {project.images.map((img, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: i * 0.1 }}
                                                className="relative aspect-video rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 group border border-zinc-200/80 dark:border-zinc-800/80 shadow-md"
                                            >
                                                <Image
                                                    src={img}
                                                    alt={`${project.title} screenshot ${i + 1}`}
                                                    fill
                                                    sizes="(min-width: 768px) 50vw, 100vw"
                                                    className="object-cover transition-all duration-500 group-hover:scale-105"
                                                />
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

