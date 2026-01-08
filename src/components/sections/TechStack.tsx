'use client';

// Premium Tech Stack with monochrome progress bars
import { motion, useInView } from 'framer-motion';
import { Code2, Server, Wrench } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useRef } from 'react';

interface TechCategory {
    name: string;
    icon: React.ElementType;
    skills: { name: string; level: number }[];
}

const techCategories: TechCategory[] = [
    {
        name: 'Frontend',
        icon: Code2,
        skills: [
            { name: 'React / Next.js', level: 95 },
            { name: 'TypeScript', level: 90 },
            { name: 'Tailwind CSS', level: 95 },
            { name: 'Framer Motion', level: 85 },
        ],
    },
    {
        name: 'Backend',
        icon: Server,
        skills: [
            { name: 'Node.js', level: 88 },
            { name: 'PostgreSQL', level: 82 },
            { name: 'Prisma', level: 85 },
            { name: 'REST APIs', level: 90 },
        ],
    },
    {
        name: 'Tools & Others',
        icon: Wrench,
        skills: [
            { name: 'Git / GitHub', level: 92 },
            { name: 'Docker', level: 75 },
            { name: 'Linux', level: 80 },
            { name: 'Figma', level: 78 },
        ],
    },
];

const techLogos = [
    { name: 'React', abbr: 'Re' },
    { name: 'Next.js', abbr: 'Nx' },
    { name: 'TypeScript', abbr: 'TS' },
    { name: 'Node.js', abbr: 'No' },
    { name: 'Tailwind', abbr: 'TW' },
    { name: 'PostgreSQL', abbr: 'PG' },
    { name: 'Prisma', abbr: 'Pr' },
    { name: 'Docker', abbr: 'Dk' },
    { name: 'Git', abbr: 'Gt' },
    { name: 'Linux', abbr: 'Lx' },
    { name: 'Redis', abbr: 'Rd' },
    { name: 'GraphQL', abbr: 'GQ' },
];

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <div ref={ref} className="mb-4">
            <div className="flex justify-between mb-2">
                <span className="text-sm text-zinc-700">{name}</span>
                <span className="text-sm text-zinc-400">{level}%</span>
            </div>
            <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                <motion.div
                    className="h-full rounded-full bg-zinc-900"
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
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 border border-zinc-200 mb-6"
                    >
                        <Code2 className="h-4 w-4 text-zinc-600" />
                        <span className="text-sm text-zinc-600">Tech Stack</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold mb-6 text-zinc-900"
                    >
                        My Tech Arsenal
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-zinc-500 max-w-2xl mx-auto"
                    >
                        The tools and technologies I use to bring ideas to life
                    </motion.p>
                </div>

                {/* Tech Logos Grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap justify-center gap-4 mb-16"
                >
                    {techLogos.map((tech, i) => (
                        <motion.div
                            key={tech.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: 0.3 + i * 0.03 }}
                            whileHover={{ scale: 1.05, y: -3 }}
                            className="p-4 rounded-xl bg-white border border-zinc-200 hover:border-zinc-300 transition-all cursor-default"
                        >
                            <div className="w-8 h-8 rounded bg-zinc-900 text-white flex items-center justify-center text-xs font-bold mb-2 mx-auto">
                                {tech.abbr}
                            </div>
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
                            <Card className="bg-white border-zinc-200 h-full">
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 rounded-lg bg-zinc-100">
                                            <category.icon className="h-5 w-5 text-zinc-700" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-zinc-900">{category.name}</h3>
                                    </div>

                                    {category.skills.map((skill, skillIndex) => (
                                        <SkillBar
                                            key={skill.name}
                                            name={skill.name}
                                            level={skill.level}
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
                    <p className="text-zinc-400 text-sm">
                        ...and always learning new technologies to stay ahead of the curve
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
