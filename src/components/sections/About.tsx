'use client';

// About section with skills, highlights, and smooth animations
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Code, Palette, Zap, Heart, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useRef } from 'react';

interface AboutProps {
    preview?: string;
}

export function About({
    preview = 'Passionate about creating beautiful, performant, and user-friendly web experiences. I combine technical expertise with creative problem-solving to build products that make a difference.'
}: AboutProps) {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: '-100px' });

    const highlights = [
        { icon: Code, label: 'Clean Code', desc: 'Writing maintainable, scalable solutions' },
        { icon: Palette, label: 'UI/UX Focus', desc: 'Crafting beautiful user interfaces' },
        { icon: Zap, label: 'Performance', desc: 'Optimizing for speed & efficiency' },
        { icon: Heart, label: 'Passion', desc: 'Love what I do, every single day' },
    ];

    const skills = [
        { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
        { category: 'Backend', items: ['Node.js', 'Express', 'PostgreSQL', 'Prisma', 'REST APIs'] },
        { category: 'Tools', items: ['Git', 'Docker', 'VS Code', 'Figma', 'Linux'] },
    ];

    const stats = [
        { value: '3+', label: 'Years of Experience' },
        { value: '50+', label: 'Projects Completed' },
        { value: '100%', label: 'Client Satisfaction' },
        { value: '24/7', label: 'Support Available' },
    ];

    return (
        <section ref={containerRef} className="relative py-32 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-900/50 to-transparent" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/50 border border-zinc-700/50 mb-6"
                    >
                        <BookOpen className="h-4 w-4 text-zinc-400" />
                        <span className="text-sm text-zinc-300">About Me</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold mb-6"
                    >
                        Crafting Digital{' '}
                        <span className="bg-gradient-to-r from-zinc-300 to-zinc-500 bg-clip-text text-transparent">
                            Experiences
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-zinc-400 max-w-2xl mx-auto"
                    >
                        {preview}
                    </motion.p>
                </div>

                {/* Highlights Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 }}
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
                >
                    {highlights.map((item, i) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.4 + i * 0.1 }}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                            <Card className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-all h-full group">
                                <CardContent className="p-6">
                                    <div className="p-3 rounded-xl bg-zinc-800/50 w-fit mb-4 group-hover:bg-zinc-700/50 transition-colors">
                                        <item.icon className="h-6 w-6 text-zinc-300" />
                                    </div>
                                    <h3 className="font-semibold text-lg mb-2">{item.label}</h3>
                                    <p className="text-sm text-zinc-500">{item.desc}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Stats Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 mb-20"
                >
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: 0.6 + i * 0.1 }}
                            className="text-center"
                        >
                            <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                            <div className="text-sm text-zinc-500">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Skills Section */}
                <div className="grid lg:grid-cols-3 gap-8 mb-16">
                    {skills.map((skillSet, i) => (
                        <motion.div
                            key={skillSet.category}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.7 + i * 0.1 }}
                        >
                            <Card className="bg-zinc-900/30 border-zinc-800 h-full">
                                <CardContent className="p-6">
                                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-white" />
                                        {skillSet.category}
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {skillSet.items.map((skill) => (
                                            <Badge
                                                key={skill}
                                                variant="outline"
                                                className="bg-zinc-800/50 border-zinc-700 text-zinc-300 hover:bg-zinc-700 transition-colors"
                                            >
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.9 }}
                    className="text-center"
                >
                    <Button asChild size="lg" variant="outline" className="gap-2 group border-zinc-700 hover:bg-zinc-800">
                        <Link href="/about">
                            Learn More About Me
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
