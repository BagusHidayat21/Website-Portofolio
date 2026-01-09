'use client';

// Premium Minimalist Contact Section - Refined
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Copy, Check, Mail, HandMetal, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ContactProps {
    email?: string;
    socialLinks?: {
        github?: string;
        linkedin?: string;
    };  
}

export function Contact({
    email = 'bagus.hidayat.id@gmail.com',
    socialLinks = {
        github: 'https://github.com/BagusHidayat21',
        linkedin: 'https://www.linkedin.com/in/bagushidayat-id/',
    },
}: ContactProps) {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: '-100px' });
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const socials = [
        { label: 'GitHub', href: socialLinks.github, icon: Github },
        { label: 'LinkedIn', href: socialLinks.linkedin, icon: Linkedin },
    ];

    return (
        <section ref={containerRef} className="relative py-24 md:py-32 bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-800 overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

                    {/* Left: Heading & Context */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="lg:w-1/2"
                    >
                        <div className="flex items-center gap-2 mb-6">
                            <span className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800">
                                <HandMetal className="w-5 h-5 text-zinc-900 dark:text-zinc-100" />
                            </span>
                            <span className="text-sm font-bold tracking-widest uppercase text-zinc-500 dark:text-zinc-400">Say Hello</span>
                        </div>

                        <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-6 leading-tight">
                            Have an idea? <br />
                            <span className="text-zinc-400 dark:text-zinc-500">Let&apos;s build it.</span>
                        </h2>

                        <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed mb-8 max-w-md">
                            I&apos;m currently available for freelance work and open to full-time opportunities. If you have a project that needs some creative touch, I&apos;d love to hear about it.
                        </p>

                        {/* Socials Grid */}
                        <div className="grid grid-cols-2 gap-4 max-w-sm">
                            {socials.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:border-zinc-900 dark:hover:border-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all group"
                                >
                                    <span className="flex items-center gap-2 font-medium text-zinc-600 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100">
                                        <social.icon className="w-4 h-4 mr-2" />
                                        {social.label}
                                    </span>
                                    <ArrowRight className="w-4 h-4 text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Email Action Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:w-1/2 w-full"
                    >
                        <Card className="bg-zinc-900 dark:bg-zinc-800 text-white dark:text-zinc-100 border-0 overflow-hidden relative min-h-[400px] flex flex-col justify-between p-8 md:p-12 shadow-2xl dark:shadow-zinc-900/50">
                            {/* Texture */}
                            <div className="absolute inset-0 opacity-20 dark:opacity-10"
                                style={{
                                    backgroundImage: `radial-gradient(circle, #333 1px, transparent 1px)`,
                                    backgroundSize: '20px 20px'
                                }}
                            />

                            <div className="relative z-10">
                                <h3 className="text-2xl font-semibold mb-2">Send me a message</h3>
                                <p className="text-zinc-400 dark:text-zinc-300">Directly to my inbox, I reply quickly.</p>
                            </div>

                            <div className="relative z-10 mt-auto">
                                <div className="flex flex-col gap-4">
                                    <a
                                        href={`mailto:${email}`}
                                        className="group flex items-center justify-between w-full p-6 rounded-2xl bg-white/10 dark:bg-white/5 hover:bg-white/15 dark:hover:bg-white/10 border border-white/10 dark:border-white/5 hover:border-white/20 dark:hover:border-white/15 transition-all backdrop-blur-sm"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 rounded-full bg-white dark:bg-zinc-100 text-zinc-900">
                                                <Mail className="w-5 h-5" />
                                            </div>
                                            <span className="text-xl md:text-2xl font-medium tracking-tight break-all">{email}</span>
                                        </div>
                                        <ArrowRight className="w-6 h-6 rotate-45 group-hover:rotate-0 transition-transform" />
                                    </a>

                                    <Button
                                        onClick={handleCopy}
                                        variant="ghost"
                                        className="w-full justify-between h-auto py-4 px-6 rounded-2xl text-zinc-400 dark:text-zinc-300 hover:text-white dark:hover:text-zinc-100 hover:bg-white/5 dark:hover:bg-white/10 font-normal"
                                    >
                                        <span className="flex items-center gap-2">
                                            {copied ? <Check className="w-4 h-4 text-green-400 dark:text-green-500" /> : <Copy className="w-4 h-4" />}
                                            {copied ? 'Copied to clipboard' : 'Copy address'}
                                        </span>
                                        <span className="text-xs uppercase tracking-wider opacity-50">Click to copy</span>
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
