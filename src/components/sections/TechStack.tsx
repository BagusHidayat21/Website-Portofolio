'use client';

// Tech Stack section with animated skill bars and icons
import { motion, useInView } from 'framer-motion';
import { Code2, Server, Wrench } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useRef } from 'react';

interface TechCategory {
    name: string;
    icon: React.ElementType;
    skills: { name: string; level: number; color: string }[];
}

const techCategories: TechCategory[] = [
    {
        name: 'Frontend',
        icon: Code2,
        skills: [
            { name: 'React / Next.js', level: 95, color: '#61DAFB' },
            { name: 'TypeScript', level: 90, color: '#3178C6' },
            { name: 'Tailwind CSS', level: 95, color: '#06B6D4' },
            { name: 'Framer Motion', level: 85, color: '#FF0080' },
        ],
    },
    {
        name: 'Backend',
        icon: Server,
        skills: [
            { name: 'Node.js', level: 88, color: '#339933' },
            { name: 'PostgreSQL', level: 82, color: '#4169E1' },
            { name: 'Prisma', level: 85, color: '#2D3748' },
            { name: 'REST APIs', level: 90, color: '#FF6B6B' },
        ],
    },
    {
        name: 'Tools & Others',
        icon: Wrench,
        skills: [
            { name: 'Git / GitHub', level: 92, color: '#F05032' },
            { name: 'Docker', level: 75, color: '#2496ED' },
            { name: 'Linux', level: 80, color: '#FCC624' },
            { name: 'Figma', level: 78, color: '#F24E1E' },
        ],
    },
];

const techLogos = [
    { name: 'React', icon: '⚛️' },
    { name: 'Next.js', icon: '▲' },
    { name: 'TypeScript', icon: '📘' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'Tailwind', icon: '🎨' },
    { name: 'PostgreSQL', icon: '🐘' },
    { name: 'Prisma', icon: '◆' },
    { name: 'Docker', icon: '🐳' },
    { name: 'Git', icon: '📦' },
    { name: 'Linux', icon: '🐧' },
    { name: 'Redis', icon: '🔴' },
    { name: 'GraphQL', icon: '◈' },
];

function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <div ref={ref} className="mb-4">
            <div className="flex justify-between mb-2">
                <span className="text-sm text-zinc-300">{name}</span>
                <span className="text-sm text-zinc-500">{level}%</span>
            </div>
            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: color }}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${level}%` } : {}}
                    transition={{ duration: 1, delay, ease: [0.25, 0.4, 0.25, 1] }}
                />
            </div>
        </div>
    );
}

export function TechStack() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: '-100px' });

    return (
        <section ref={containerRef} className="relative py-32 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-900/50 to-transparent" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/50 border border-zinc-700/50 mb-6"
                    >
                        <Code2 className="h-4 w-4 text-zinc-400" />
                        <span className="text-sm text-zinc-300">Tech Stack</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold mb-6"
                    >
                        My{' '}
                        <span className="bg-gradient-to-r from-zinc-300 to-zinc-500 bg-clip-text text-transparent">
                            Tech Arsenal
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-zinc-400 max-w-2xl mx-auto"
                    >
                        The tools and technologies I use to bring ideas to life
                    </motion.p>
                </div>

                {/* Floating Tech Logos */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap justify-center gap-4 mb-16"
                >
                    {techLogos.map((tech, i) => (
                        <motion.div
                            key={tech.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: 0.3 + i * 0.05 }}
                            whileHover={{ scale: 1.1, y: -5 }}
                            className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors cursor-default"
                        >
                            <div className="text-2xl mb-1 text-center">{tech.icon}</div>
                            <div className="text-xs text-zinc-500 text-center">{tech.name}</div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Skill Categories with Progress Bars */}
                <div className="grid md:grid-cols-3 gap-8">
                    {techCategories.map((category, categoryIndex) => (
                        <motion.div
                            key={category.name}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.4 + categoryIndex * 0.1 }}
                        >
                            <Card className="bg-zinc-900/30 border-zinc-800 h-full">
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 rounded-lg bg-zinc-800/50">
                                            <category.icon className="h-5 w-5 text-zinc-300" />
                                        </div>
                                        <h3 className="text-lg font-semibold">{category.name}</h3>
                                    </div>

                                    {category.skills.map((skill, skillIndex) => (
                                        <SkillBar
                                            key={skill.name}
                                            name={skill.name}
                                            level={skill.level}
                                            color={skill.color}
                                            delay={0.5 + categoryIndex * 0.1 + skillIndex * 0.1}
                                        />
                                    ))}
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8 }}
                    className="mt-16 text-center"
                >
                    <p className="text-zinc-500 text-sm">
                        ...and always learning new technologies to stay ahead of the curve
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
