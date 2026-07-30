'use client';

import { motion } from 'framer-motion';

export default function ProjectsLoading() {
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950">
            <section className="pt-32 pb-16 border-b border-zinc-100 dark:border-zinc-900">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-4"
                    >
                        <div className="h-16 md:h-24 w-64 bg-zinc-100 dark:bg-zinc-800 rounded-lg animate-pulse" />
                        <div className="h-6 w-96 max-w-full bg-zinc-100 dark:bg-zinc-800 rounded animate-pulse" />
                    </motion.div>
                </div>
            </section>

            <section className="py-16">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800"
                            >
                                <div className="aspect-[16/10] bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                                <div className="p-6 space-y-4">
                                    <div className="h-6 w-3/4 bg-zinc-100 dark:bg-zinc-800 rounded animate-pulse" />
                                    <div className="h-4 w-full bg-zinc-100 dark:bg-zinc-800 rounded animate-pulse" />
                                    <div className="h-4 w-2/3 bg-zinc-100 dark:bg-zinc-800 rounded animate-pulse" />
                                    <div className="flex gap-2">
                                        {[1, 2, 3].map((j) => (
                                            <div key={j} className="h-6 w-16 bg-zinc-100 dark:bg-zinc-800 rounded-full animate-pulse" />
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
