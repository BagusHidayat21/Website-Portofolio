'use client';

// Premium Navbar with Full Screen Mobile Menu
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, ArrowUpRight, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useState, useEffect } from 'react';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/about', label: 'About' },
];

const socialLinks = [
    { icon: Github, href: 'https://github.com/BagusHidayat21', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/bagushidayat-id/', label: 'LinkedIn' },
];

export function Navbar() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when menu is open
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
                className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled
                    ? 'bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-200/50 dark:border-zinc-800/50'
                    : 'bg-transparent'
                    }`}
            >
                <nav className="container mx-auto px-6 h-20 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="relative z-50 group flex items-center gap-3">
                        <div className="h-10 w-10 bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center rounded-sm transition-transform group-hover:scale-105 active:scale-95">
                            <span className="text-white dark:text-zinc-900 font-bold text-sm">HID</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
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

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <ThemeToggle />
                        <Button asChild variant="outline" size="sm" className="hidden lg:flex gap-2 rounded-full border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                                <FileText className="h-4 w-4" />
                                Resume
                            </a>
                        </Button>
                        <Button asChild size="sm" className="gap-2 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 shadow-lg shadow-zinc-900/20 dark:shadow-zinc-100/20">
                            <a href="mailto:bagus.hidayat.id@gmail.com">
                                Hire Me
                                <ArrowUpRight className="h-4 w-4" />
                            </a>
                        </Button>
                    </div>

                    {/* Mobile Menu Trigger */}
                    <div className="md:hidden flex items-center gap-2">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="relative z-[101] p-2 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </nav>
            </motion.header>

            {/* Full Screen Mobile Menu - Rendered Sibling to Header to escape Transform Context */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
                        animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
                        exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
                        transition={{ duration: 0.5, ease: [0.32, 0, 0.67, 0] }}
                        className="fixed inset-0 bg-white dark:bg-zinc-900 z-[99] flex flex-col pt-32 px-6 pb-12 overflow-y-auto"
                    >
                        <div className="flex flex-col gap-6">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`text-5xl font-black tracking-tighter ${pathname === link.href ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-300 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-100'
                                            } transition-colors`}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mt-auto pt-12"
                        >
                            <div className="h-px w-full bg-zinc-100 dark:bg-zinc-800 mb-8" />

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <Button asChild variant="outline" size="lg" className="w-full gap-2 rounded-xl border-zinc-200 dark:border-zinc-700 dark:hover:bg-zinc-800 h-14">
                                    <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                                        <FileText className="h-5 w-5" />
                                        Resume
                                    </a>
                                </Button>
                                <Button asChild size="lg" className="w-full gap-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 h-14 hover:bg-zinc-800 dark:hover:bg-zinc-200">
                                    <a href="mailto:bagus.hidayat.id@gmail.com">
                                        Hire Me
                                        <ArrowUpRight className="h-5 w-5" />
                                    </a>
                                </Button>
                            </div>

                            <div className="flex gap-6">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors font-medium text-sm uppercase tracking-widest"
                                    >
                                        {social.label}
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
