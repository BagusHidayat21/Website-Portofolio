'use client';

// Contact section with CTA cards and social links
import { motion, useInView } from 'framer-motion';
import { Mail, Send, Clock, ArrowRight, Github, Linkedin, Twitter, MessageCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useRef } from 'react';

interface ContactProps {
    email?: string;
    socialLinks?: {
        github?: string;
        linkedin?: string;
        twitter?: string;
    };
}

export function Contact({
    email = 'bagus@example.com',
    socialLinks = {
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
    },
}: ContactProps) {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: '-100px' });

    const contactMethods = [
        {
            icon: Mail,
            title: 'Email',
            value: email,
            description: 'Drop me an email anytime',
        },
        {
            icon: MessageCircle,
            title: 'Social',
            value: '@bagushidayat',
            description: 'Let\'s connect on social media',
        },
        {
            icon: Clock,
            title: 'Response Time',
            value: '< 24 hours',
            description: 'I\'ll get back to you quickly',
        },
    ];

    const socialItems = [
        { icon: Github, href: socialLinks.github, label: 'GitHub' },
        { icon: Linkedin, href: socialLinks.linkedin, label: 'LinkedIn' },
        { icon: Twitter, href: socialLinks.twitter, label: 'Twitter' },
    ];

    return (
        <section ref={containerRef} className="relative py-32 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-900/50 to-zinc-950" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/50 border border-zinc-700/50 mb-6"
                    >
                        <Sparkles className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm text-zinc-300">Get in Touch</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                    >
                        Let&apos;s Work{' '}
                        <span className="bg-gradient-to-r from-zinc-300 to-zinc-500 bg-clip-text text-transparent">
                            Together
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-zinc-400 max-w-2xl mx-auto"
                    >
                        Have a project in mind? I&apos;d love to hear about it. Let&apos;s discuss how we can work together.
                    </motion.p>
                </div>

                {/* Contact Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 }}
                    className="grid md:grid-cols-3 gap-6 mb-16"
                >
                    {contactMethods.map((method, i) => (
                        <motion.div
                            key={method.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.4 + i * 0.1 }}
                            whileHover={{ y: -5 }}
                        >
                            <Card className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-all h-full group">
                                <CardContent className="p-6 text-center">
                                    <div className="p-4 rounded-xl bg-zinc-800/50 w-fit mx-auto mb-4 group-hover:bg-zinc-700/50 transition-colors">
                                        <method.icon className="h-6 w-6 text-zinc-300" />
                                    </div>
                                    <h3 className="font-semibold text-lg mb-1">{method.title}</h3>
                                    <p className="text-zinc-300 font-medium mb-1">{method.value}</p>
                                    <p className="text-sm text-zinc-500">{method.description}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Main CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 }}
                    className="max-w-2xl mx-auto"
                >
                    <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 overflow-hidden">
                        <CardContent className="p-8 md:p-12 text-center relative">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_var(--tw-gradient-stops))] from-zinc-800/30 to-transparent" />

                            <div className="relative z-10">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={isInView ? { scale: 1 } : {}}
                                    transition={{ delay: 0.7, type: 'spring' }}
                                    className="inline-flex p-4 rounded-full bg-zinc-800/50 mb-6"
                                >
                                    <Mail className="h-8 w-8 text-zinc-300" />
                                </motion.div>

                                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                                    Ready to start a project?
                                </h3>
                                <p className="text-zinc-400 mb-8 max-w-md mx-auto">
                                    I&apos;m currently available for freelance work and exciting opportunities.
                                </p>

                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <Button asChild size="lg" className="gap-2 px-8 bg-white text-black hover:bg-zinc-200">
                                        <a href={`mailto:${email}`}>
                                            <Send className="h-4 w-4" />
                                            Send Me an Email
                                        </a>
                                    </Button>
                                    <Button asChild variant="outline" size="lg" className="gap-2 border-zinc-700 hover:bg-zinc-800">
                                        <a href="/projects">
                                            View My Work
                                            <ArrowRight className="h-4 w-4" />
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Social Links */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8 }}
                    className="flex items-center justify-center gap-4 mt-12"
                >
                    {socialItems.map((social) => (
                        <motion.a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-4 rounded-full border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 hover:bg-zinc-800/50 transition-all"
                            whileHover={{ scale: 1.1, y: -3 }}
                            whileTap={{ scale: 0.95 }}
                            title={social.label}
                        >
                            <social.icon className="h-5 w-5" />
                        </motion.a>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
