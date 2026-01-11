'use client';

import Link from 'next/link';
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { Profile } from '@/data/static-db';

interface FooterClientProps {
    profile: Profile;
}

export function FooterClient({ profile }: FooterClientProps) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 py-24 relative overflow-hidden">
            {/* Small black accent line top */}
            <div className="absolute top-0 left-0 w-24 h-[2px] bg-zinc-900 dark:bg-zinc-100 z-10" />

            {/* Dot Pattern */}
            <div className="absolute inset-0 z-0 opacity-[0.15] dark:opacity-10 bg-[radial-gradient(#000_1.5px,transparent_1px)] dark:bg-[radial-gradient(#fff_1.5px,transparent_1px)] [background-size:16px_16px]" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">

                    {/* Brand & Local Info */}
                    <div className="space-y-6">
                        <div className="space-y-1">
                            <h2 className="text-2xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100">{profile.name}.</h2>
                            <p className="text-zinc-500 dark:text-zinc-400 font-medium max-w-xs">{profile.tagline}</p>
                        </div>

                        <div className="flex flex-col gap-1 text-sm text-zinc-500 dark:text-zinc-500">
                            <p>Based in {profile.location}</p>
                            <p>&copy; {currentYear} {profile.name}</p>
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    <div className="flex gap-12 md:gap-24 flex-wrap">

                        {/* Local Links */}
                        <div className="space-y-4">
                            <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">Explore</h4>
                            <nav className="flex flex-col gap-3">
                                <Link href="/" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Home</Link>
                                <Link href="/projects" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Projects</Link>
                                <Link href="/about" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">About</Link>
                            </nav>
                        </div>

                        {/* Social Links */}
                        <div className="space-y-4">
                            <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">Connect</h4>
                            <nav className="flex flex-col gap-3">
                                {profile.socials.find(s => s.platform === 'LinkedIn') && (
                                    <Link href={profile.socials.find(s => s.platform === 'LinkedIn')?.url || '#'} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors group">
                                        <Linkedin className="w-4 h-4" />
                                        LinkedIn
                                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                )}
                                {profile.socials.find(s => s.platform === 'GitHub') && (
                                    <Link href={profile.socials.find(s => s.platform === 'GitHub')?.url || '#'} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors group">
                                        <Github className="w-4 h-4" />
                                        GitHub
                                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                )}
                                <Link href={`mailto:${profile.email}`} className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors group">
                                    <Mail className="w-4 h-4" />
                                    Email
                                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            </nav>
                        </div>

                    </div>
                </div>
            </div>
        </footer>
    );
}
