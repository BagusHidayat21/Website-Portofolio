'use client';

import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';
import { Profile } from '@/data/static-db';

interface FooterClientProps {
    profile: Profile;
}

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/about', label: 'About' },
];

export function FooterClient({ profile }: FooterClientProps) {
    const currentYear = new Date().getFullYear();
    const github = profile.socials.find(s => s.platform === 'GitHub')?.url;
    const linkedin = profile.socials.find(s => s.platform === 'LinkedIn')?.url;

    return (
        <footer className="relative bg-zinc-950 dark:bg-black border-t border-zinc-800 overflow-hidden">

            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1.5px, transparent 1.5px)',
                    backgroundSize: '28px 28px',
                }}
            />

            <div
                className="absolute bottom-0 right-0 font-display font-black leading-none tracking-tighter pointer-events-none select-none"
                style={{
                    fontSize: 'clamp(60px, 12vw, 180px)',
                    WebkitTextStroke: '1px #27272a',
                    color: 'transparent',
                    transform: 'translateX(6%) translateY(18%)',
                }}
                aria-hidden="true"
            >
                HID.
            </div>

            <div className="relative z-10 section-container pt-14 pb-10 border-b border-zinc-800">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">

                    <div>
                        <h2 className="font-display text-3xl md:text-4xl font-black tracking-tighter text-white leading-none mb-2">
                            {profile.name}<span className="text-zinc-700">.</span>
                        </h2>
                        <p className="text-zinc-600 text-sm font-medium max-w-xs">
                            {profile.tagline}
                        </p>
                    </div>

                    <div className="flex items-center gap-1">
                        {github && (
                            <Link
                                href={github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2.5 text-zinc-600 hover:text-white transition-colors"
                                aria-label="GitHub"
                            >
                                <Github className="w-4 h-4" />
                            </Link>
                        )}
                        {linkedin && (
                            <Link
                                href={linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2.5 text-zinc-600 hover:text-white transition-colors"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-4 h-4" />
                            </Link>
                        )}
                        <Link
                            href={`mailto:${profile.email}`}
                            className="p-2.5 text-zinc-600 hover:text-white transition-colors"
                            aria-label="Email"
                        >
                            <Mail className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="relative z-10 section-container py-5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">

                    <p className="text-zinc-700 text-xs font-mono tracking-wide">
                        © {currentYear} {profile.name} · {profile.location}
                    </p>

                    <nav className="flex items-center gap-5">
                        {navLinks.map(link => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-zinc-600 hover:text-zinc-300 transition-colors text-xs tracking-widest uppercase font-medium"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>

        </footer>
    );
}
