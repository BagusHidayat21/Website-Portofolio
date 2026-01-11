import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getProjects } from "@/actions/project.actions";
import { Badge } from "@/components/ui/badge";
import { Edit, Plus, ExternalLink, Github, FolderGit2, ArrowUpRight } from "lucide-react";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default async function AdminProjectsPage() {
    const projects = await getProjects(true);

    return (
        <AdminPageShell>
            <AdminPageHeader
                title="Projects"
                description="Manage your portfolio projects and case studies."
                action={
                    <Button asChild size="sm" className="bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200">
                        <Link href="/admin/projects/new">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Project
                        </Link>
                    </Button>
                }
            />

            {/* Projects Grid */}
            {projects.length > 0 ? (
                <div className="grid gap-5 md:grid-cols-2">
                    {projects.map((project) => (
                        <Card key={project.id} className="group overflow-hidden border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all">
                            <CardContent className="p-0">
                                {/* Image */}
                                <div className="relative aspect-[16/9] bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
                                    {project.images && project.images[0] ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={project.images[0]}
                                            alt={project.title || ''}
                                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full">
                                            <FolderGit2 className="h-10 w-10 text-zinc-300 dark:text-zinc-700" />
                                        </div>
                                    )}

                                    {/* Status Indicators */}
                                    <div className="absolute top-3 left-3 flex gap-2">
                                        {project.isFeatured && (
                                            <Badge className="bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 text-[10px] h-5 border-0">
                                                Featured
                                            </Badge>
                                        )}
                                        {!project.isVisible && (
                                            <Badge variant="secondary" className="bg-zinc-800/80 text-zinc-100 dark:bg-zinc-200/80 dark:text-zinc-900 text-[10px] h-5 border-0 backdrop-blur-sm">
                                                Hidden
                                            </Badge>
                                        )}
                                    </div>

                                    {/* Hover Edit Button */}
                                    <Link
                                        href={`/admin/projects/${project.id}`}
                                        className="absolute inset-0 bg-zinc-900/0 group-hover:bg-zinc-900/60 dark:group-hover:bg-zinc-950/70 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100"
                                    >
                                        <div className="flex items-center gap-2 text-white font-medium text-sm">
                                            <Edit className="w-4 h-4" />
                                            Edit Project
                                        </div>
                                    </Link>
                                </div>

                                {/* Content */}
                                <div className="p-5 space-y-3">
                                    <div>
                                        <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100 mb-1 line-clamp-1">
                                            {project.title}
                                        </h3>
                                        <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                                            {project.description}
                                        </p>
                                    </div>

                                    {/* Tags */}
                                    {project.tags && project.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5">
                                            {project.tags.slice(0, 3).map((tag) => (
                                                <Badge key={tag} variant="secondary" className="text-[10px] h-5 px-1.5 bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-0">
                                                    {tag}
                                                </Badge>
                                            ))}
                                            {project.tags.length > 3 && (
                                                <Badge variant="secondary" className="text-[10px] h-5 px-1.5 bg-zinc-100 dark:bg-zinc-900 text-zinc-400 border-0">
                                                    +{project.tags.length - 3}
                                                </Badge>
                                            )}
                                        </div>
                                    )}

                                    {/* Links */}
                                    <div className="flex items-center gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800/50">
                                        <Link
                                            href={`/admin/projects/${project.id}`}
                                            className="text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center gap-1"
                                        >
                                            Edit
                                            <ArrowUpRight className="w-3 h-3" />
                                        </Link>
                                        {project.liveUrl && (
                                            <Link
                                                href={project.liveUrl}
                                                target="_blank"
                                                className="text-xs font-medium text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 flex items-center gap-1"
                                            >
                                                <ExternalLink className="w-3 h-3" />
                                            </Link>
                                        )}
                                        {project.githubUrl && (
                                            <Link
                                                href={project.githubUrl}
                                                target="_blank"
                                                className="text-xs font-medium text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 flex items-center gap-1"
                                            >
                                                <Github className="w-3 h-3" />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card className="border-2 border-dashed border-zinc-200 dark:border-zinc-800 bg-transparent">
                    <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="w-14 h-14 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mb-4">
                            <FolderGit2 className="h-7 w-7 text-zinc-400" />
                        </div>
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                            No projects yet
                        </h3>
                        <p className="text-zinc-500 dark:text-zinc-400 mb-6 max-w-sm text-sm">
                            Create your first project to showcase your work.
                        </p>
                        <Button asChild size="sm">
                            <Link href="/admin/projects/new">
                                <Plus className="w-4 h-4 mr-2" />
                                Create First Project
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            )}
        </AdminPageShell>
    );
}
