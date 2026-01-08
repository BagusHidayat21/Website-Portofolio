'use client';

// Minimalist Swiss-Style Footer
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function Footer() {
    const [time, setTime] = useState('');
    const currentYear = new Date().getFullYear();

    // Live Clock for Malang (WIB)
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
                timeZone: 'Asia/Jakarta'
            }));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const links = [
        { label: 'Home', href: '/' },
        { label: 'Projects', href: '/projects' },
        { label: 'About', href: '/about' },
    ];

    const socials = [
        { label: 'LinkedIn', href: "https://www.linkedin.com/in/bagushidayat-id/" },
        { label: 'GitHub', href: "https://github.com/BagusHidayat21" },
    ];

    return (
        <footer className="bg-zinc-950 text-white py-20 border-t border-zinc-900">
            <div className="container mx-auto px-6">

                {/* Top Row: Brand & Contact */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-8">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-2">Bagus Hidayat.</h2>
                        <p className="text-zinc-500 max-w-sm">
                            Full-Stack Developer & Machine Learning Enthusiast.
                            Building digital products with code and data.
                        </p>
                    </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-zinc-900 mb-8" />

                {/* Bottom Row: Grid Layout */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12">

                    {/* Navigation */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-600 mb-6">Explore</h4>
                        <ul className="space-y-3">
                            {links.map(link => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-zinc-400 hover:text-white transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Socials */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-600 mb-6">Connect</h4>
                        <ul className="space-y-3">
                            {socials.map(social => (
                                <li key={social.label}>
                                    <a href={social.href} className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2">
                                        {social.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Location */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-600 mb-6">Location</h4>
                        <p className="text-zinc-400">Malang, Indonesia</p>
                        <p className="text-zinc-600 text-sm mt-1">Universitas Negeri Malang</p>
                    </div>

                    {/* Status / Time */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-600 mb-6">Local Time</h4>
                        <div className="flex items-center gap-3">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="font-mono text-zinc-400">{time} WIB</span>
                        </div>
                        <p className="text-zinc-600 text-xs mt-4">
                            &copy; {currentYear} Bagus Hidayat.
                        </p>
                    </div>

                </div>
            </div>
        </footer>
    );
}
