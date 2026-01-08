'use client';

// Enhanced project detail page with gallery, animations, and rich content
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    ArrowLeft, ExternalLink, Github, Star, GitFork, Eye, Calendar,
    Code2, ChevronLeft, ChevronRight, X, Maximize2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { ProjectWithRepo } from '@/types';

// Image viewer modal
function ImageModal({
    images,
    currentIndex,
    onClose,
    onNext,
    onPrev
}: {
    images: string[];
    currentIndex: number;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
}) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors"
            >
                <X className="h-6 w-6" />
            </button>

            {images.length > 1 && (
                <>
                    <button
                        onClick={(e) => { e.stopPropagation(); onPrev(); }}
                        className="absolute left-4 p-2 text-white/50 hover:text-white transition-colors"
                    >
                        <ChevronLeft className="h-8 w-8" />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onNext(); }}
                        className="absolute right-4 p-2 text-white/50 hover:text-white transition-colors"
                    >
                        <ChevronRight className="h-8 w-8" />
                    </button>
                </>
            )}

            <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="max-w-5xl max-h-[80vh] relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Placeholder for actual image */}
                <div className="bg-zinc-800 rounded-xl aspect-video flex items-center justify-center min-w-[600px]">
                    <div className="text-center">
                        <p className="text-zinc-400">Image {currentIndex + 1} of {images.length}</p>
                        <p className="text-xs text-zinc-600 mt-2">{images[currentIndex]}</p>
                    </div>
                </div>
            </motion.div>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, i) => (
                    <div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-colors ${i === currentIndex ? 'bg-white' : 'bg-white/30'
                            }`}
                    />
                ))}
            </div>
        </motion.div>
    );
}

// Project gallery component
function ProjectGallery({ images }: { images: string[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const displayImages = images.length > 0 ? images : ['placeholder1.jpg', 'placeholder2.jpg', 'placeholder3.jpg'];

    return (
        <>
            <div className="space-y-4">
                {/* Main image */}
                <motion.div
                    className="relative aspect-video rounded-xl overflow-hidden bg-zinc-900 cursor-pointer group"
                    onClick={() => setIsModalOpen(true)}
                    whileHover={{ scale: 1.01 }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                        <div className="text-center">
                            <Code2 className="h-16 w-16 text-zinc-700 mx-auto mb-4" />
                            <p className="text-zinc-500">Project Screenshot</p>
                            <p className="text-xs text-zinc-600 mt-1">Click to expand</p>
                        </div>
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileHover={{ opacity: 1, scale: 1 }}
                            className="p-3 rounded-full bg-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <Maximize2 className="h-6 w-6 text-white" />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Thumbnails */}
                {displayImages.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                        {displayImages.slice(0, 4).map((img, i) => (
                            <motion.div
                                key={i}
                                className={`aspect-video rounded-lg overflow-hidden bg-zinc-900 cursor-pointer border-2 transition-colors ${i === currentIndex ? 'border-white/50' : 'border-transparent hover:border-zinc-700'
                                    }`}
                                onClick={() => setCurrentIndex(i)}
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                                    <span className="text-xs text-zinc-600">{i + 1}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <ImageModal
                        images={displayImages}
                        currentIndex={currentIndex}
                        onClose={() => setIsModalOpen(false)}
                        onNext={() => setCurrentIndex((prev) => (prev + 1) % displayImages.length)}
                        onPrev={() => setCurrentIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}

// Stats card
function StatsCard({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string | number }) {
    return (
        <Card className="bg-zinc-900/30 border-zinc-800">
            <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-zinc-800/50">
                    <Icon className="h-4 w-4 text-zinc-400" />
                </div>
                <div>
                    <p className="text-xs text-zinc-500">{label}</p>
                    <p className="font-semibold">{value}</p>
                </div>
            </CardContent>
        </Card>
    );
}

export default function ProjectDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [project, setProject] = useState<ProjectWithRepo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await fetch(`/api/projects/${params.id}`);
                const data = await res.json();

                if (data.error) {
                    setError(data.error);
                } else {
                    setProject(data);
                }
            } catch {
                setError('Failed to load project');
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchProject();
        }
    }, [params.id]);

    if (loading) {
        return (
            <div className="min-h-screen pt-24 pb-16">
                <div className="container mx-auto px-6">
                    <div className="max-w-5xl mx-auto">
                        <Skeleton className="h-8 w-32 mb-8" />
                        <div className="grid lg:grid-cols-5 gap-8">
                            <div className="lg:col-span-3">
                                <Skeleton className="aspect-video rounded-xl mb-4" />
                                <div className="grid grid-cols-4 gap-2">
                                    {[1, 2, 3, 4].map((i) => (
                                        <Skeleton key={i} className="aspect-video rounded-lg" />
                                    ))}
                                </div>
                            </div>
                            <div className="lg:col-span-2 space-y-4">
                                <Skeleton className="h-10 w-3/4" />
                                <Skeleton className="h-24" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
                    <p className="text-zinc-500 mb-8">{error || 'The project you&apos;re looking for doesn&apos;t exist.'}</p>
                    <Button asChild>
                        <Link href="/projects">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Projects
                        </Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="container mx-auto px-6">
                <div className="max-w-5xl mx-auto">
                    {/* Back button */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mb-8"
                    >
                        <Button
                            variant="ghost"
                            onClick={() => router.back()}
                            className="gap-2 text-zinc-400 hover:text-white"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back
                        </Button>
                    </motion.div>

                    {/* Main content */}
                    <div className="grid lg:grid-cols-5 gap-8">
                        {/* Left - Gallery */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="lg:col-span-3"
                        >
                            <ProjectGallery images={project.images} />
                        </motion.div>

                        {/* Right - Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="lg:col-span-2 space-y-6"
                        >
                            {/* Title */}
                            <div>
                                <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
                                <p className="text-zinc-400">{project.description}</p>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="bg-zinc-800 text-zinc-300">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-3">
                                <StatsCard icon={Star} label="Stars" value={project.stars || 0} />
                                <StatsCard icon={Code2} label="Language" value={project.language || 'N/A'} />
                                <StatsCard
                                    icon={Calendar}
                                    label="Last Updated"
                                    value={project.lastUpdated ? new Date(project.lastUpdated).toLocaleDateString() : 'N/A'}
                                />
                                <StatsCard icon={Eye} label="Views" value="1.2k" />
                            </div>

                            {/* Tech Stack */}
                            <div>
                                <h3 className="text-sm font-medium text-zinc-400 mb-3">Tech Stack</h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.map((tech) => (
                                        <Badge
                                            key={tech}
                                            variant="outline"
                                            className="bg-zinc-900/50 border-zinc-700 text-zinc-300"
                                        >
                                            {tech}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col gap-3 pt-4">
                                {project.liveUrl && (
                                    <Button asChild className="w-full gap-2 bg-white text-black hover:bg-zinc-200">
                                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="h-4 w-4" />
                                            View Live Demo
                                        </a>
                                    </Button>
                                )}
                                <Button asChild variant="outline" className="w-full gap-2 border-zinc-700 hover:bg-zinc-800">
                                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                                        <Github className="h-4 w-4" />
                                        View on GitHub
                                    </a>
                                </Button>
                            </div>
                        </motion.div>
                    </div>

                    {/* GitHub Description */}
                    {project.githubDescription && project.githubDescription !== project.description && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="mt-12"
                        >
                            <Card className="bg-zinc-900/30 border-zinc-800">
                                <CardContent className="p-6">
                                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                        <Github className="h-5 w-5" />
                                        From GitHub
                                    </h3>
                                    <p className="text-zinc-400">{project.githubDescription}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
