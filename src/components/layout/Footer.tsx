'use client';

// Impressive Footer with multiple sections and animations
import { motion, useInView } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, Heart, ArrowUp, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Mail, href: 'mailto:hello@example.com', label: 'Email' },
];

const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/about', label: 'About' },
];

const services = [
    'Web Development',
    'Frontend Development',
    'UI/UX Design',
    'API Integration',
];

export function Footer() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer ref={ref} className="relative border-t border-zinc-800 bg-zinc-950">
            {/* Scroll to top button */}
            <motion.button
                onClick={scrollToTop}
                className="absolute -top-5 left-1/2 -translate-x-1/2 p-3 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-600 transition-all"
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <ArrowUp className="h-5 w-5" />
            </motion.button>

            <div className="container mx-auto px-6 pt-20 pb-12">
                {/* Main Footer Content */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.1 }}
                        className="lg:col-span-1"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-10 w-10 rounded-lg bg-white flex items-center justify-center">
                                <span className="text-black font-bold">BH</span>
                            </div>
                            <span className="font-semibold text-xl">Portfolio</span>
                        </div>
                        <p className="text-sm text-zinc-500 mb-6 max-w-xs">
                            Creating beautiful, performant, and user-friendly web experiences. Let&apos;s build something amazing together.
                        </p>
                        {/* Contact Info */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-zinc-500">
                                <MapPin className="h-4 w-4" />
                                <span>Indonesia</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-zinc-500">
                                <Mail className="h-4 w-4" />
                                <a href="mailto:hello@example.com" className="hover:text-white transition-colors">
                                    hello@example.com
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2 }}
                    >
                        <h3 className="font-semibold mb-4 text-zinc-300">Quick Links</h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-zinc-500 hover:text-white transition-colors inline-flex items-center gap-1 group"
                                    >
                                        <span className="w-0 group-hover:w-2 overflow-hidden transition-all">→</span>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Services */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.3 }}
                    >
                        <h3 className="font-semibold mb-4 text-zinc-300">Services</h3>
                        <ul className="space-y-3">
                            {services.map((service) => (
                                <li key={service} className="text-sm text-zinc-500">
                                    {service}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Newsletter / CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.4 }}
                    >
                        <h3 className="font-semibold mb-4 text-zinc-300">Let&apos;s Connect</h3>
                        <p className="text-sm text-zinc-500 mb-4">
                            Follow me on social media for updates and insights.
                        </p>
                        <div className="flex items-center gap-3">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2.5 rounded-lg border border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-600 hover:bg-zinc-800/50 transition-all"
                                    whileHover={{ y: -3, scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    title={social.label}
                                >
                                    <social.icon className="h-4 w-4" />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent mb-8" />

                {/* Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-500"
                >
                    <p>
                        © {new Date().getFullYear()} Portfolio. All rights reserved.
                    </p>
                    <p className="flex items-center gap-1">
                        Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> in Indonesia
                    </p>
                </motion.div>
            </div>
        </footer>
    );
}
