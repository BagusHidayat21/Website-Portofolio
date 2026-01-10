import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getProfile } from '@/actions/profile.actions';
import { getProjects } from '@/actions/project.actions';
import { FolderGit2, Eye, Star, TrendingUp, Activity, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default async function AdminDashboard() {
    const profile = await getProfile();
    const projects = await getProjects();

    const featuredProjects = projects.filter(p => p.isFeatured);
    const visibleProjects = projects.filter(p => p.isVisible);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="space-y-2">
                <h1 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
                    Dashboard
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400">
                    Welcome back! Here&apos;s an overview of your portfolio.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-2 hover:border-zinc-900 dark:hover:border-zinc-100 transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                            Total Projects
                        </CardTitle>
                        <FolderGit2 className="h-5 w-5 text-zinc-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black text-zinc-900 dark:text-zinc-100">{projects.length}</div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                            {visibleProjects.length} visible
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-2 hover:border-zinc-900 dark:hover:border-zinc-100 transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                            Featured
                        </CardTitle>
                        <Star className="h-5 w-5 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black text-zinc-900 dark:text-zinc-100">{featuredProjects.length}</div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                            Highlighted works
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-2 hover:border-zinc-900 dark:hover:border-zinc-100 transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                            Total Views
                        </CardTitle>
                        <Eye className="h-5 w-5 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black text-zinc-900 dark:text-zinc-100">12,234</div>
                        <p className="text-xs text-green-600 dark:text-green-400 mt-2 flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" />
                            +19% from last month
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-2 hover:border-zinc-900 dark:hover:border-zinc-100 transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                            Experience
                        </CardTitle>
                        <Activity className="h-5 w-5 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black text-zinc-900 dark:text-zinc-100">{profile?.yearsCoding || 0}y</div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                            Years of coding
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Projects */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-xl font-bold">Recent Projects</CardTitle>
                            <CardDescription>Your latest portfolio entries</CardDescription>
                        </div>
                        <Badge variant="secondary" className="gap-1">
                            <Clock className="h-3 w-3" />
                            Updated recently
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {projects.slice(0, 5).map((project) => (
                            <div
                                key={project.id}
                                className="flex items-center justify-between p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-900 dark:hover:border-zinc-100 transition-colors"
                            >
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">
                                            {project.title}
                                        </h4>
                                        {project.isFeatured && (
                                            <Badge variant="default" className="text-xs">
                                                Featured
                                            </Badge>
                                        )}
                                        {!project.isVisible && (
                                            <Badge variant="secondary" className="text-xs">
                                                Hidden
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-1">
                                        {project.description}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                                    {project.tags && project.tags.length > 0 && (
                                        <div className="flex gap-1">
                                            {project.tags.slice(0, 2).map((tag) => (
                                                <Badge key={tag} variant="outline" className="text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                        {projects.length === 0 && (
                            <div className="text-center py-12 text-zinc-500 dark:text-zinc-400">
                                <FolderGit2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                <p>No projects yet. Create one to get started!</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
