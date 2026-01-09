import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getProjects } from "@/actions/project.actions";
import { Badge } from "@/components/ui/badge";
import { Edit, Plus, ExternalLink, Github, Eye, EyeOff, Star } from "lucide-react";

export default async function AdminProjectsPage() {
    const projects = await getProjects(true);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
                        Projects
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-2">
                        Manage your portfolio projects
                    </p>
                </div>
                <Button asChild size="lg" className="gap-2 shadow-lg">
                    <Link href="/admin/projects/new">
                        <Plus className="w-4 h-4" />
                        Add New Project
                    </Link>
                </Button>
            </div>

            {/* Projects Grid */}
            <div className="grid gap-6 md:grid-cols-2">
                {projects.map((project) => (
                    <Card key={project.id} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-zinc-900 dark:hover:border-zinc-100">
                        <CardContent className="p-6">
                            {/* Image/Thumbnail */}
                            <div className="relative aspect-video bg-zinc-100 dark:bg-zinc-800 rounded-lg mb-4 overflow-hidden">
                                {project.images && project.images[0] ? (
                                    <img
                                        src={project.images[0]}
                                        alt={project.title || ''}
                                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full">
                                        <Github className="h-12 w-12 text-zinc-300 dark:text-zinc-600" />
                                    </div>
                                )}

                                {/* Status Badges */}
                                <div className="absolute top-3 left-3 flex gap-2">
                                    {project.isFeatured && (
                                        <Badge className="gap-1 bg-yellow-500 text-white border-0">
                                            <Star className="h-3 w-3" />
                                            Featured
                                        </Badge>
                                    )}
                                    {!project.isVisible ? (
                                        <Badge variant="secondary" className="gap-1 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900">
                                            <EyeOff className="h-3 w-3" />
                                            Hidden
                                        </Badge>
                                    ) : (
                                        <Badge variant="outline" className="gap-1 bg-white/90 dark:bg-zinc-900/90 backdrop-blur">
                                            <Eye className="h-3 w-3" />
                                            Visible
                                        </Badge>
                                    )}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="space-y-3">
                                <div>
                                    <h3 className="font-bold text-xl text-zinc-900 dark:text-zinc-100 mb-1 line-clamp-1">
                                        {project.title}
                                    </h3>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2">
                                        {project.description}
                                    </p>
                                </div>

                                {/* Tags */}
                                {project.tags && project.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.slice(0, 3).map((tag) => (
                                            <Badge key={tag} variant="secondary" className="text-xs">
                                                {tag}
                                            </Badge>
                                        ))}
                                        {project.tags.length > 3 && (
                                            <Badge variant="secondary" className="text-xs">
                                                +{project.tags.length - 3}
                                            </Badge>
                                        )}
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex gap-2 pt-2">
                                    <Button asChild variant="default" size="sm" className="flex-1">
                                        <Link href={`/admin/projects/${project.id}`}>
                                            <Edit className="w-3 h-3 mr-1" />
                                            Edit
                                        </Link>
                                    </Button>
                                    {project.liveUrl && (
                                        <Button asChild variant="outline" size="sm">
                                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                                <ExternalLink className="w-3 h-3" />
                                            </a>
                                        </Button>
                                    )}
                                    {project.githubUrl && (
                                        <Button asChild variant="outline" size="sm">
                                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                                <Github className="w-3 h-3" />
                                            </a>
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Empty State */}
            {projects.length === 0 && (
                <Card className="border-2 border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="rounded-full bg-zinc-100 dark:bg-zinc-800 p-6 mb-4">
                            <Plus className="h-12 w-12 text-zinc-400" />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                            No projects yet
                        </h3>
                        <p className="text-zinc-500 dark:text-zinc-400 mb-6 max-w-sm">
                            Create your first project to showcase your work and start building your portfolio.
                        </p>
                        <Button asChild size="lg">
                            <Link href="/admin/projects/new">
                                <Plus className="w-4 h-4 mr-2" />
                                Create First Project
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
