'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';
import {
    LayoutDashboard,
    User,
    FolderGit2,
    Layers,
    Briefcase,
    Home,
    FileText,
    GraduationCap,
    ChevronRight,
    Sparkles,
    Menu,
    X
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
    {
        title: 'Overview',
        items: [
            { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
            { href: '/', label: 'View Site', icon: Home, external: true },
        ]
    },
    {
        title: 'Content',
        items: [
            { href: '/admin/profile', label: 'Profile', icon: User },
            { href: '/admin/about', label: 'About', icon: FileText },
            { href: '/admin/projects', label: 'Projects', icon: FolderGit2 },
            { href: '/admin/experience', label: 'Experience', icon: Briefcase },
            { href: '/admin/education', label: 'Education', icon: GraduationCap },
            { href: '/admin/tech', label: 'Tech Stack', icon: Layers },
        ]
    }
];

export function AdminSidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-14 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-4">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-zinc-100 dark:text-zinc-900" />
                    </div>
                    <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">Admin</span>
                </div>
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="h-9 w-9">
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={cn(
                "fixed h-full overflow-y-auto flex flex-col bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 z-50 transition-transform duration-300",
                "w-64 lg:w-60",
                "lg:translate-x-0",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                {/* Logo/Brand - Hidden on mobile (header shows it) */}
                <div className="hidden lg:block p-5 border-b border-zinc-100 dark:border-zinc-800/50">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-zinc-100 dark:text-zinc-900" />
                        </div>
                        <div>
                            <h1 className="text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                                Admin Panel
                            </h1>
                            <p className="text-[10px] text-zinc-400 dark:text-zinc-500">
                                Portfolio
                            </p>
                        </div>
                    </div>
                </div>

                {/* Spacer for mobile header */}
                <div className="lg:hidden h-14" />

                {/* Navigation */}
                <nav className="flex-1 p-3 space-y-5">
                    {menuItems.map((section) => (
                        <div key={section.title}>
                            <h3 className="px-3 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2">
                                {section.title}
                            </h3>
                            <div className="space-y-0.5">
                                {section.items.map((item) => {
                                    // External links should never be active
                                    const isActive = item.external
                                        ? false
                                        : (item.href === '/admin'
                                            ? pathname === '/admin'
                                            : pathname.startsWith(item.href));
                                    const Icon = item.icon;

                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            target={item.external ? '_blank' : undefined}
                                            onClick={() => setIsOpen(false)}
                                            className={cn(
                                                "group flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                                                isActive
                                                    ? "bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900"
                                                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100"
                                            )}
                                        >
                                            <Icon className="h-4 w-4" />
                                            <span className="flex-1">{item.label}</span>
                                            {item.external && (
                                                <ChevronRight className="w-3 h-3 opacity-50" />
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>

                {/* Footer */}
                <div className="p-3 border-t border-zinc-100 dark:border-zinc-800/50">
                    <div className="flex items-center justify-between px-3 py-2">
                        <span className="text-xs text-zinc-400 dark:text-zinc-500">Theme</span>
                        <ThemeToggle />
                    </div>
                </div>
            </aside>
        </>
    );
}
