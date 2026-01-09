'use client';

import { motion } from 'framer-motion';

export default function AboutLoading() {
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950">
            {/* Hero Skeleton */}
            <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 bg-zinc-50 dark:bg-zinc-900">
                <div className="container mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="max-w-4xl space-y-6"
                    >
                        <div className="h-16 md:h-24 w-80 bg-zinc-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
                        <div className="h-16 md:h-24 w-64 bg-zinc-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
                        <div className="h-6 w-full max-w-2xl bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
                    </motion.div>
                </div>
            </section>

            {/* Photo Grid Skeleton */}
            <section className="py-12 border-y border-zinc-100 dark:border-zinc-800">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        <div className="md:col-span-8 h-[400px] md:h-[600px] bg-zinc-100 dark:bg-zinc-800 rounded-lg animate-pulse" />
                        <div className="md:col-span-4 flex flex-col gap-6">
                            <div className="h-[250px] md:h-[280px] bg-zinc-100 dark:bg-zinc-800 rounded-lg animate-pulse" />
                            <div className="h-[200px] md:h-[300px] bg-zinc-900 dark:bg-zinc-800 rounded-lg animate-pulse" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Story Skeleton */}
            <section className="py-24 md:py-32">
                <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 md:gap-32">
                    <div className="space-y-4">
                        <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
                        <div className="h-12 w-full bg-zinc-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
                        <div className="h-12 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
                    </div>
                    <div className="space-y-4">
                        <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
                        <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
                        <div className="h-4 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
                    </div>
                </div>
            </section>
        </div>
    );
}
