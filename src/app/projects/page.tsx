'use client';

// Enhanced Projects page with visual cards, image previews, and rich interactions
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ExternalLink, Github, Star, Search, Filter, Grid, LayoutGrid, Eye, ArrowUpRight, Code2, Layers, Monitor, Smartphone, Brain, Database, Globe, ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ProjectWithRepo } from '@/types';

// Category definitions
const categories = [
    { id: 'all', label: 'All', icon: Globe },
    { id: 'web', label: 'Web', icon: Monitor },
    { id: 'mobile', label: 'Mobile', icon: Smartphone },
    { id: 'ai', label: 'AI/ML', icon: Brain },
    { id: 'backend', label: 'Backend', icon: Database },
];

// Tech stack color mapping for consistent styling
const techColors: Record<string, string> = {
    'React': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    'Next.js': 'bg-white/10 text-white border-white/20',
    'TypeScript': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'JavaScript': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    'Node.js': 'bg-green-500/20 text-green-300 border-green-500/30',
    'Python': 'bg-yellow-600/20 text-yellow-200 border-yellow-600/30',
    'PostgreSQL': 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    'MongoDB': 'bg-green-600/20 text-green-200 border-green-600/30',
    'Prisma': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    'TailwindCSS': 'bg-teal-500/20 text-teal-300 border-teal-500/30',
    'Tailwind': 'bg-teal-500/20 text-teal-300 border-teal-500/30',
    'Stripe': 'bg-violet-500/20 text-violet-300 border-violet-500/30',
    'OpenAI': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    'Docker': 'bg-sky-500/20 text-sky-300 border-sky-500/30',
    'Redis': 'bg-red-500/20 text-red-300 border-red-500/30',
    'GraphQL': 'bg-pink-500/20 text-pink-300 border-pink-500/30',
    'REST': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    'Firebase': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    'Vue.js': 'bg-green-500/20 text-green-300 border-green-500/30',
    'Angular': 'bg-red-600/20 text-red-300 border-red-600/30',
    'Kotlin': 'bg-purple-600/20 text-purple-300 border-purple-600/30',
    'Swift': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    'Flutter': 'bg-cyan-600/20 text-cyan-300 border-cyan-600/30',
    'AWS': 'bg-orange-600/20 text-orange-300 border-orange-600/30',
    'GCP': 'bg-blue-600/20 text-blue-300 border-blue-600/30',
};

// Get tech badge color
function getTechColor(tech: string): string {
    return techColors[tech] || 'bg-zinc-700/50 text-zinc-300 border-zinc-600/50';
}

// Detect project category based on tech stack
function detectCategory(project: ProjectWithRepo): string {
    const allTechs = [...(project.techStack || []), ...(project.tags || [])].map(t => t.toLowerCase());

    if (allTechs.some(t => ['flutter', 'kotlin', 'swift', 'react native', 'android', 'ios'].includes(t))) {
        return 'mobile';
    }
    if (allTechs.some(t => ['openai', 'tensorflow', 'pytorch', 'machine learning', 'ai', 'ml', 'langchain'].includes(t))) {
        return 'ai';
    }
    if (allTechs.some(t => ['express', 'fastapi', 'django', 'flask', 'nestjs', 'spring'].includes(t)) &&
        !allTechs.some(t => ['react', 'next.js', 'vue', 'angular'].includes(t))) {
        return 'backend';
    }
    return 'web';
}

// Project card with image preview
function ProjectCard({ project, index }: { project: ProjectWithRepo; index: number }) {
    const [isHovered, setIsHovered] = useState(false);
    const router = useRouter();

    const imageUrl = project.images?.[0] || `https://picsum.photos/seed/project${project.id}/800/600`;
    const allTechs = [...(project.techStack || []), ...(project.tags || [])];
    const uniqueTechs = Array.from(new Set(allTechs));

    const handleCardClick = () => {
        router.push(`/projects/${project.id}`);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, type: 'spring', bounce: 0.3 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleCardClick}
            className="cursor-pointer"
        >
            <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 400 }}
            >
                <Card className="bg-zinc-900/50 border-zinc-800/50 overflow-hidden group h-full hover:border-purple-500/30 transition-all backdrop-blur-sm">
                    {/* Image Preview */}
                    <div className="relative aspect-video overflow-hidden bg-zinc-800">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <motion.img
                            src={imageUrl}
                            alt={project.title || 'Project'}
                            className="w-full h-full object-cover"
                            animate={{ scale: isHovered ? 1.1 : 1 }}
                            transition={{ duration: 0.4 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/30 to-transparent" />

                        {/* Hover overlay */}
                        <motion.div
                            className="absolute inset-0 bg-black/60 flex items-center justify-center gap-3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isHovered ? 1 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: isHovered ? 1 : 0 }}
                                transition={{ delay: 0.1, type: 'spring' }}
                                className="p-3 rounded-full bg-white text-black"
                            >
                                <Eye className="h-5 w-5" />
                            </motion.div>
                            {project.url && (
                                <motion.button
                                    onClick={(e) => { e.stopPropagation(); window.open(project.url!, '_blank'); }}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: isHovered ? 1 : 0 }}
                                    transition={{ delay: 0.15, type: 'spring' }}
                                    className="p-3 rounded-full bg-zinc-800 text-white hover:bg-zinc-700"
                                >
                                    <Github className="h-5 w-5" />
                                </motion.button>
                            )}
                            {project.liveUrl && (
                                <motion.button
                                    onClick={(e) => { e.stopPropagation(); window.open(project.liveUrl!, '_blank'); }}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: isHovered ? 1 : 0 }}
                                    transition={{ delay: 0.2, type: 'spring' }}
                                    className="p-3 rounded-full bg-purple-600 text-white hover:bg-purple-500"
                                >
                                    <ExternalLink className="h-5 w-5" />
                                </motion.button>
                            )}
                        </motion.div>

                        {/* Badges */}
                        {project.isFeatured && (
                            <div className="absolute top-3 left-3">
                                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 border-0 text-white">
                                    <Star className="h-3 w-3 mr-1" />Featured
                                </Badge>
                            </div>
                        )}
                        <div className="absolute top-3 right-3">
                            <Badge variant="outline" className="bg-black/50 backdrop-blur-sm border-zinc-700 text-white capitalize">
                                {detectCategory(project)}
                            </Badge>
                        </div>
                    </div>

                    {/* Content */}
                    <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-lg group-hover:text-purple-400 transition-colors line-clamp-1">
                                {project.title}
                            </h3>
                            <motion.div
                                animate={{ x: isHovered ? 0 : -5, opacity: isHovered ? 1 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ArrowUpRight className="h-5 w-5 text-purple-400" />
                            </motion.div>
                        </div>

                        <p className="text-sm text-zinc-400 line-clamp-2 mb-4">
                            {project.description || 'No description available'}
                        </p>

                        {/* Stats */}
                        <div className="flex items-center gap-4 text-xs text-zinc-500 mb-4">
                            {project.stars !== undefined && project.stars > 0 && (
                                <div className="flex items-center gap-1">
                                    <Star className="h-3.5 w-3.5 text-yellow-500" />
                                    <span>{project.stars}</span>
                                </div>
                            )}
                            {project.language && (
                                <div className="flex items-center gap-1">
                                    <Code2 className="h-3.5 w-3.5" />
                                    <span>{project.language}</span>
                                </div>
                            )}
                            {uniqueTechs.length > 0 && (
                                <div className="flex items-center gap-1">
                                    <Layers className="h-3.5 w-3.5" />
                                    <span>{uniqueTechs.length} techs</span>
                                </div>
                            )}
                        </div>

                        {/* Tech Stack - Wrapped in container */}
                        <div className="p-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
                            <div className="flex flex-wrap gap-1.5">
                                {uniqueTechs.map((tech) => (
                                    <Badge
                                        key={tech}
                                        variant="outline"
                                        className={`text-xs px-2 py-0.5 ${getTechColor(tech)}`}
                                    >
                                        {tech}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
}

// Loading skeleton
function ProjectSkeleton() {
    return (
        <Card className="bg-zinc-900/50 border-zinc-800 overflow-hidden">
            <Skeleton className="aspect-video" />
            <CardContent className="p-5 space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <div className="flex gap-2 pt-2">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-16" />
                </div>
            </CardContent>
        </Card>
    );
}

export default function ProjectsPage() {
    const [projects, setProjects] = useState<ProjectWithRepo[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedTech, setSelectedTech] = useState<string | null>(null);
    const [layout, setLayout] = useState<'grid' | 'large'>('grid');
    const [filtersOpen, setFiltersOpen] = useState(false);

    useEffect(() => {
        fetch('/api/projects')
            .then((res) => res.json())
            .then((data) => {
                setProjects(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const allTechs = Array.from(new Set(projects.flatMap((p) => [...(p.tags || []), ...(p.techStack || [])]))).sort();
    const activeFilters = (selectedCategory !== 'all' ? 1 : 0) + (selectedTech ? 1 : 0);

    const filteredProjects = projects.filter((project) => {
        const matchesSearch =
            project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            [...(project.tags || []), ...(project.techStack || [])].some(t =>
                t.toLowerCase().includes(searchQuery.toLowerCase())
            );
        const matchesCategory = selectedCategory === 'all' || detectCategory(project) === selectedCategory;
        const matchesTech = !selectedTech ||
            (project.tags || []).includes(selectedTech) ||
            (project.techStack || []).includes(selectedTech);
        return matchesSearch && matchesCategory && matchesTech;
    });

    const clearFilters = () => {
        setSelectedCategory('all');
        setSelectedTech(null);
    };

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="container mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', bounce: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6"
                    >
                        <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                        >
                            <Code2 className="h-4 w-4 text-purple-400" />
                        </motion.div>
                        <span className="text-sm text-purple-300">My Work</span>
                    </motion.div>

                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
                            Projects Portfolio
                        </span>
                    </h1>
                    <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                        A collection of projects showcasing my skills in full-stack development.
                    </p>
                </motion.div>

                {/* Search & Filter Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-col md:flex-row gap-3 mb-6"
                >
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-zinc-900/70 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
                        />
                    </div>

                    {/* Filter Toggle Button */}
                    <motion.button
                        onClick={() => setFiltersOpen(!filtersOpen)}
                        className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl border transition-all ${filtersOpen || activeFilters > 0
                                ? 'bg-purple-500/20 border-purple-500/50 text-purple-300'
                                : 'bg-zinc-900/70 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                            }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Filter className="h-4 w-4" />
                        <span>Filters</span>
                        {activeFilters > 0 && (
                            <span className="flex items-center justify-center h-5 w-5 rounded-full bg-purple-500 text-white text-xs">
                                {activeFilters}
                            </span>
                        )}
                        <motion.div
                            animate={{ rotate: filtersOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ChevronDown className="h-4 w-4" />
                        </motion.div>
                    </motion.button>

                    {/* Layout Toggle */}
                    <div className="flex items-center gap-1 bg-zinc-900/70 rounded-xl p-1 border border-zinc-800">
                        <motion.button
                            onClick={() => setLayout('grid')}
                            className={`p-2.5 rounded-lg transition-colors ${layout === 'grid' ? 'bg-purple-500 text-white' : 'text-zinc-500 hover:text-white'
                                }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Grid className="h-4 w-4" />
                        </motion.button>
                        <motion.button
                            onClick={() => setLayout('large')}
                            className={`p-2.5 rounded-lg transition-colors ${layout === 'large' ? 'bg-purple-500 text-white' : 'text-zinc-500 hover:text-white'
                                }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <LayoutGrid className="h-4 w-4" />
                        </motion.button>
                    </div>
                </motion.div>

                {/* Expandable Filters Panel */}
                <AnimatePresence>
                    {filtersOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden mb-6"
                        >
                            <div className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-5">
                                {/* Active Filters */}
                                {activeFilters > 0 && (
                                    <div className="flex items-center gap-2 pb-4 border-b border-zinc-800">
                                        <span className="text-sm text-zinc-500">Active:</span>
                                        {selectedCategory !== 'all' && (
                                            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 gap-1">
                                                {categories.find(c => c.id === selectedCategory)?.label}
                                                <button onClick={() => setSelectedCategory('all')}>
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </Badge>
                                        )}
                                        {selectedTech && (
                                            <Badge className={`gap-1 ${getTechColor(selectedTech)}`}>
                                                {selectedTech}
                                                <button onClick={() => setSelectedTech(null)}>
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </Badge>
                                        )}
                                        <button
                                            onClick={clearFilters}
                                            className="text-xs text-zinc-500 hover:text-white underline ml-2"
                                        >
                                            Clear all
                                        </button>
                                    </div>
                                )}

                                {/* Category Filter */}
                                <div>
                                    <h4 className="text-sm font-medium text-zinc-300 mb-3">Category</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {categories.map((cat) => (
                                            <motion.button
                                                key={cat.id}
                                                onClick={() => setSelectedCategory(cat.id)}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all ${selectedCategory === cat.id
                                                        ? 'bg-purple-500 text-white'
                                                        : 'bg-zinc-800/50 text-zinc-400 hover:text-white hover:bg-zinc-800'
                                                    }`}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <cat.icon className="h-4 w-4" />
                                                {cat.label}
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>

                                {/* Tech Filter */}
                                <div>
                                    <h4 className="text-sm font-medium text-zinc-300 mb-3">Technology</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {allTechs.map((tech) => (
                                            <motion.button
                                                key={tech}
                                                onClick={() => setSelectedTech(tech === selectedTech ? null : tech)}
                                                className={`px-3 py-1.5 rounded-lg text-xs transition-all border ${selectedTech === tech
                                                        ? 'bg-purple-500 text-white border-purple-500'
                                                        : `${getTechColor(tech)} hover:opacity-80`
                                                    }`}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                {tech}
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Results count */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between mb-6">
                    <p className="text-sm text-zinc-500">
                        Showing <span className="text-white font-medium">{filteredProjects.length}</span> of{' '}
                        <span className="text-white font-medium">{projects.length}</span> projects
                    </p>
                </motion.div>

                {/* Projects Grid */}
                {loading ? (
                    <div className={`grid gap-6 ${layout === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2'}`}>
                        {[1, 2, 3, 4, 5, 6].map((i) => (<ProjectSkeleton key={i} />))}
                    </div>
                ) : (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={layout + selectedCategory + selectedTech + searchQuery}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className={`grid gap-6 ${layout === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2'}`}
                        >
                            {filteredProjects.map((project, i) => (
                                <ProjectCard key={project.id} project={project} index={i} />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                )}

                {/* Empty State */}
                {!loading && filteredProjects.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-20"
                    >
                        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-6xl mb-6">
                            🔍
                        </motion.div>
                        <h3 className="text-2xl font-semibold mb-3">No projects found</h3>
                        <p className="text-zinc-500 mb-8 max-w-md mx-auto">
                            Try adjusting your search or filters.
                        </p>
                        <Button variant="outline" onClick={() => { setSearchQuery(''); clearFilters(); }} className="border-zinc-700 hover:bg-zinc-800">
                            Clear all filters
                        </Button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
