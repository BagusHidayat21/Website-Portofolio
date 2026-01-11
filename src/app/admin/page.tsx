import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getProfile } from '@/actions/profile.actions';
import { getProjects } from '@/actions/project.actions';
import { FolderGit2, Star, Activity, ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { AdminPageShell } from '@/components/admin/AdminPageShell';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';

export default async function AdminDashboard() {
    const profile = await getProfile();
    const projects = await getProjects();

    const featuredProjects = projects.filter(p => p.isFeatured);
    const visibleProjects = projects.filter(p => p.isVisible);

    const stats = [
        {
            label: 'Total Projects',
            value: projects.length,
            subtext: `${visibleProjects.length} visible`,
            icon: FolderGit2
        },
        {
            label: 'Featured',
            value: featuredProjects.length,
            subtext: 'Highlighted works',
            icon: Star
        },
        {
            label: 'Years Coding',
            value: `${profile?.yearsCoding || 0}+`,
            subtext: 'Experience',
            icon: Activity
        },
    ];

    return (
        <AdminPageShell>
            <AdminPageHeader
                title="Dashboard"
                description="Welcome back! Here's an overview of your portfolio."
            />

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-3">
                {stats.map((stat) => (
                    <Card key={stat.label} className="group border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                                <div className="space-y-3">
                                    <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                                        {stat.label}
                                    </p>
                                    <p className="text-4xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">
                                        {stat.value}
                                    </p>
                                    <p className="text-xs text-zinc-400 dark:text-zinc-500">
                                        {stat.subtext}
                                    </p>
                                </div>
                                <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <stat.icon className="w-5 h-5 text-zinc-400" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Recent Projects */}
            <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden">
                <CardHeader className="border-b border-zinc-100 dark:border-zinc-800/50">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-lg font-bold">Recent Projects</CardTitle>
                            <CardDescription>Your latest portfolio entries</CardDescription>
                        </div>
                        <Link href="/admin/projects">
                            <Badge variant="outline" className="gap-1 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
                                View All
                                <ArrowUpRight className="h-3 w-3" />
                            </Badge>
                        </Link>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="divide-y divide-zinc-100 dark:divide-zinc-800/50">
                        {projects.slice(0, 5).map((project) => (
                            <Link
                                key={project.id}
                                href={`/admin/projects/${project.id}`}
                                className="flex items-center justify-between p-5 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors group"
                            >
                                <div className="space-y-1 min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                                            {project.title}
                                        </h4>
                                        {project.isFeatured && (
                                            <Badge className="bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 text-[10px] h-5">
                                                Featured
                                            </Badge>
                                        )}
                                        {!project.isVisible && (
                                            <Badge variant="secondary" className="text-[10px] h-5 bg-zinc-100 dark:bg-zinc-800">
                                                Hidden
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-1">
                                        {project.description}
                                    </p>
                                </div>
                                <ArrowUpRight className="w-4 h-4 text-zinc-300 dark:text-zinc-700 group-hover:text-zinc-500 dark:group-hover:text-zinc-400 transition-colors ml-4 shrink-0" />
                            </Link>
                        ))}

                        {projects.length === 0 && (
                            <div className="text-center py-16 text-zinc-400 dark:text-zinc-500">
                                <FolderGit2 className="h-10 w-10 mx-auto mb-3 opacity-50" />
                                <p className="text-sm">No projects yet. Create one to get started!</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </AdminPageShell>
    );
}
