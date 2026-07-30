'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, ArrowUpRight, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useState, useEffect } from 'react';

const navLinks = [
    { href: '/', label: 'Home', number: '01' },
    { href: '/projects', label: 'Projects', number: '02' },
    { href: '/about', label: 'About', number: '03' },
];

const socialLinks = [
    { icon: Github, href: 'https://github.com/BagusHidayat21', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/bagushidayat-id/', label: 'LinkedIn' },
];

export function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Delayed navigation handler allowing circular wave exit animation to complete smoothly on mobile
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (!isOpen) return;
        e.preventDefault();
        setIsOpen(false);
        if (pathname !== href) {
            setTimeout(() => {
                router.push(href);
            }, 350);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
                className={`fixed top-0 left-0 right-0 z-[100] transform-gpu transition-all duration-300 ${scrolled
                    ? 'bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border-b border-zinc-200/50 dark:border-zinc-800/50'
                    : 'bg-transparent'
                    }`}
            >
                <nav className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="relative z-[101] group flex items-center gap-3">
                        <div className="h-10 w-10 bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center rounded-sm transition-transform group-hover:scale-105 active:scale-95 shadow-sm">
                            <span className="text-white dark:text-zinc-900 font-bold text-sm">HID</span>
                        </div>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => {
                            const isActive = link.href === '/'
                                ? pathname === '/'
                                : pathname?.startsWith(link.href);
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="relative text-sm font-medium transition-colors"
                                >
                                    <span className={`${isActive ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'}`}>
                                        {link.label}
                                    </span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="desktopNav"
                                            className="absolute -bottom-1 left-0 right-0 h-px bg-zinc-900 dark:bg-zinc-100"
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        <ThemeToggle />
                        <Button asChild variant="outline" size="sm" className="hidden md:flex gap-2 rounded-full border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                            <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                                <FileText className="h-4 w-4" />
                                Resume
                            </Link>
                        </Button>
                        <Button asChild size="sm" className="gap-2 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 shadow-lg shadow-zinc-900/20 dark:shadow-zinc-100/20">
                            <Link href="mailto:bagus.hidayat.id@gmail.com">
                                Hire Me
                                <ArrowUpRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </div>

                    <div className="md:hidden flex items-center gap-2 relative z-[101]">
                        <ThemeToggle />
                        {/* Animated hamburger icon button transitioning smoothly to X */}
                        <motion.button
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle Navigation Menu"
                            className="p-2 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors focus:outline-none"
                            animate={isOpen ? "open" : "closed"}
                            initial="closed"
                        >
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                                <motion.line
                                    x1="4" y1="6" x2="20" y2="6"
                                    variants={{
                                        closed: { rotate: 0, translateY: 0 },
                                        open: { rotate: 45, translateY: 6 }
                                    }}
                                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                                    style={{ transformOrigin: "12px 6px" }}
                                />
                                <motion.line
                                    x1="4" y1="12" x2="20" y2="12"
                                    variants={{
                                        closed: { opacity: 1, scaleX: 1 },
                                        open: { opacity: 0, scaleX: 0 }
                                    }}
                                    transition={{ duration: 0.2 }}
                                />
                                <motion.line
                                    x1="4" y1="18" x2="20" y2="18"
                                    variants={{
                                        closed: { rotate: 0, translateY: 0 },
                                        open: { rotate: -45, translateY: -6 }
                                    }}
                                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                                    style={{ transformOrigin: "12px 18px" }}
                                />
                            </svg>
                        </motion.button>
                    </div>
                </nav>
            </motion.header>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, clipPath: "circle(0% at 90% 2.5rem)" }}
                        animate={{ opacity: 1, clipPath: "circle(150% at 90% 2.5rem)" }}
                        exit={{ opacity: 0, clipPath: "circle(0% at 90% 2.5rem)" }}
                        transition={{ duration: 0.5, ease: [0.32, 0, 0.67, 0] }}
                        className="fixed inset-0 bg-zinc-50 dark:bg-zinc-950 z-[99] flex flex-col justify-between items-center px-6 pt-28 pb-10 overflow-y-auto text-zinc-900 dark:text-white transform-gpu"
                    >
                        {/* Grid background matching Hero section pattern */}
                        <div
                            className="absolute inset-0 z-0 dark:hidden pointer-events-none opacity-[0.05]"
                            style={{
                                backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
                                backgroundSize: '40px 40px'
                            }}
                        />
                        <div
                            className="absolute inset-0 z-0 hidden dark:block pointer-events-none opacity-[0.05]"
                            style={{
                                backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                                backgroundSize: '40px 40px'
                            }}
                        />

                        {/* Centered Large Navigation Links */}
                        <div className="w-full my-auto flex flex-col items-center justify-center gap-6 sm:gap-8 relative z-10">
                            {navLinks.map((link, i) => {
                                const isActive = link.href === '/'
                                    ? pathname === '/'
                                    : pathname?.startsWith(link.href);

                                return (
                                    <motion.div
                                        key={link.href}
                                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                        transition={{ delay: 0.05 * i + 0.1, duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                                        className="w-full flex justify-center"
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={(e) => handleNavClick(e, link.href)}
                                            className="group relative flex flex-col items-center justify-center text-center py-2"
                                        >
                                            <span className="text-xs font-bold tracking-[0.3em] text-zinc-400 dark:text-zinc-500 uppercase mb-1">
                                                {link.number}
                                            </span>
                                            <span
                                                className={`text-4xl sm:text-5xl font-black tracking-tight transition-colors duration-300 ${
                                                    isActive
                                                        ? 'text-zinc-900 dark:text-white'
                                                        : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                                                }`}
                                            >
                                                {link.label}
                                            </span>
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeMobileIndicator"
                                                    className="w-12 h-1 bg-zinc-900 dark:bg-white rounded-full mt-2"
                                                />
                                            )}
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Centered Actions and Social Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ delay: 0.35, duration: 0.4 }}
                            className="w-full max-w-sm flex flex-col items-center gap-6 mt-6 relative z-10"
                        >
                            <div className="w-full grid grid-cols-2 gap-3">
                                <Button asChild variant="outline" size="lg" className="w-full gap-2 rounded-full border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 h-12 text-sm font-semibold shadow-sm">
                                    <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                                        <FileText className="h-4 w-4" />
                                        Resume
                                    </Link>
                                </Button>
                                <Button asChild size="lg" className="w-full gap-2 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 h-12 text-sm font-bold shadow-md">
                                    <Link href="mailto:bagus.hidayat.id@gmail.com">
                                        Hire Me
                                        <ArrowUpRight className="h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>

                            <div className="flex items-center justify-center gap-6 pt-4 border-t border-zinc-200 dark:border-zinc-800 w-full">
                                {socialLinks.map((social) => (
                                    <Link
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors text-xs font-semibold uppercase tracking-widest p-2"
                                    >
                                        {social.label}
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
