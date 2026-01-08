'use client';

// Impressive Navbar with blur backdrop, animated links, and mobile menu
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, FileText } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/about', label: 'About' },
];

const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
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

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? 'bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50'
                    : 'bg-transparent'
                }`}
        >
            <nav className="container mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="group flex items-center gap-2">
                    <motion.div
                        className="h-8 w-8 rounded-lg bg-white flex items-center justify-center"
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="text-black font-bold text-sm">Hid.</span>
                    </motion.div>
                    <span className="font-semibold text-lg hidden sm:block group-hover:text-zinc-300 transition-colors">
                        Portfolio
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="relative px-4 py-2 text-sm font-medium transition-colors"
                            >
                                <span className={`relative z-10 ${isActive ? 'text-white' : 'text-zinc-400 hover:text-white'}`}>
                                    {link.label}
                                </span>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute inset-0 bg-zinc-800/50 rounded-lg"
                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* Right side - Social & CTA */}
                <div className="hidden md:flex items-center gap-4">
                    {/* Social Links */}
                    <div className="flex items-center gap-2">
                        {socialLinks.map((social) => (
                            <motion.a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-zinc-400 hover:text-white transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <social.icon className="h-4 w-4" />
                            </motion.a>
                        ))}
                    </div>

                    {/* Divider */}
                    <div className="h-4 w-px bg-zinc-700" />

                    {/* CTA Button */}
                    <Button asChild size="sm" className="gap-2 bg-white text-black hover:bg-zinc-200">
                        <a href="mailto:hello@example.com">
                            <FileText className="h-3 w-3" />
                            Hire Me
                        </a>
                    </Button>
                </div>

                {/* Mobile Menu */}
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild className="md:hidden">
                        <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        side="right"
                        className="w-full sm:w-[400px] bg-zinc-950 border-zinc-800 p-0"
                    >
                        <div className="flex flex-col h-full">
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-zinc-800">
                                <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center">
                                    <span className="text-black font-bold text-sm">BH</span>
                                </div>
                                <SheetClose asChild>
                                    <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                                        <X className="h-5 w-5" />
                                    </Button>
                                </SheetClose>
                            </div>

                            {/* Navigation */}
                            <nav className="flex-1 p-6">
                                <div className="space-y-2">
                                    {navLinks.map((link, i) => {
                                        const isActive = pathname === link.href;
                                        return (
                                            <motion.div
                                                key={link.href}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                            >
                                                <SheetClose asChild>
                                                    <Link
                                                        href={link.href}
                                                        className={`block py-4 px-4 text-2xl font-medium rounded-lg transition-colors ${isActive
                                                                ? 'text-white bg-zinc-800/50'
                                                                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/30'
                                                            }`}
                                                    >
                                                        {link.label}
                                                    </Link>
                                                </SheetClose>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </nav>

                            {/* Footer */}
                            <div className="p-6 border-t border-zinc-800">
                                <div className="flex items-center gap-4 mb-6">
                                    {socialLinks.map((social) => (
                                        <a
                                            key={social.label}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-3 rounded-full border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors"
                                        >
                                            <social.icon className="h-5 w-5" />
                                        </a>
                                    ))}
                                </div>
                                <Button asChild className="w-full gap-2 bg-white text-black hover:bg-zinc-200">
                                    <a href="mailto:hello@example.com">
                                        Hire Me
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </nav>
        </motion.header>
    );
}
