'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { 
    LayoutDashboard, 
    User, 
    FolderGit2, 
    Layers, 
    Briefcase,
    Home,
    LogOut,
    Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
    {
        title: 'Overview',
        items: [
            { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
            { href: '/', label: 'View Site', icon: Home },
        ]
    },
    {
        title: 'Content',
        items: [
            { href: '/admin/profile', label: 'Profile', icon: User },
            { href: '/admin/projects', label: 'Projects', icon: FolderGit2 },
            { href: '/admin/tech', label: 'Tech Stack', icon: Layers },
            { href: '/admin/experience', label: 'Experience', icon: Briefcase },
        ]
    }
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-72 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 fixed h-full overflow-y-auto flex flex-col">
            {/* Logo/Brand */}
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
                            Admin Panel
                        </h1>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                            Portfolio Management
                        </p>
                    </div>
                    <ThemeToggle />
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-6">
                {menuItems.map((section) => (
                    <div key={section.title}>
                        <h3 className="px-3 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                            {section.title}
                        </h3>
                        <div className="space-y-1">
                            {section.items.map((item) => {
                                const isActive = pathname === item.href;
                                const Icon = item.icon;
                                
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                                            isActive
                                                ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-sm"
                                                : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100"
                                        )}
                                    >
                                        <Icon className="h-4 w-4" />
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            {/* Footer Actions */}
            <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 space-y-2">
                <Button variant="ghost" className="w-full justify-start text-zinc-700 dark:text-zinc-300">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                </Button>
                <Button variant="ghost" className="w-full justify-start text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/20">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </Button>
            </div>
        </aside>
    );
}
