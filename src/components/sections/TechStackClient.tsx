'use client';

// Categorized Tech Stack with Grid Layout
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { TechStack } from '@/data/static-db';

interface TechStackClientProps {
    techStack: TechStack[];
}

export function TechStackClient({ techStack }: TechStackClientProps) {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: '-100px' });

    // Group tech by category
    const categories = Array.from(new Set(techStack.map(t => t.category)));
    const groupedTech = categories.reduce((acc, category) => {
        acc[category] = techStack.filter(t => t.category === category);
        return acc;
    }, {} as Record<string, TechStack[]>);

    return (
        <section ref={containerRef} className="py-24 bg-zinc-50 dark:bg-zinc-900 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-sm font-bold tracking-widest text-zinc-500 dark:text-zinc-400 uppercase mb-4">Core Technologies</h2>
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">
                        My Technical Arsenal
                    </h3>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {categories.map((category, catIndex) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                            className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-6 flex items-center gap-2">
                                <span className="w-1 h-6 bg-zinc-900 dark:bg-zinc-100 rounded-full"></span>
                                {category}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {groupedTech[category].map((tech) => (
                                    <Badge
                                        key={tech.name}
                                        variant="outline"
                                        className="text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-zinc-900 dark:hover:border-zinc-100 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors uppercase text-xs py-1.5 px-3"
                                    >
                                        {tech.name}
                                    </Badge>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
