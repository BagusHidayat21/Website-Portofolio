'use client';

import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRef } from 'react';

export function About() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: '-100px' });

    return (
        <section ref={containerRef} className="relative py-24 md:py-32 bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-700">
            <div className="container mx-auto px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-6">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">

                    <div className="lg:w-1/3 py-2">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6 }}
                            className="flex items-center gap-3 mb-6"
                        >
                            <span className="h-px w-8 bg-zinc-900 dark:bg-zinc-100"></span>
                            <span className="text-sm font-bold tracking-widest uppercase text-zinc-900 dark:text-zinc-100">About Me</span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 leading-tight"
                        >
                            Engineering the future with <span className="text-zinc-400 dark:text-zinc-500">code</span> and <span className="text-zinc-400 dark:text-zinc-500">AI</span>.
                        </motion.h2>
                    </div>

                    <div className="lg:w-2/3">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="space-y-6"
                        >
                            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                                I&apos;m an undergraduate student at <strong className="font-semibold text-zinc-900 dark:text-zinc-100">Universitas Negeri Malang</strong>, specializing in Full Stack Web Development. I focus on building robust, scalable applications with a seamless user experience.
                            </p>

                            <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                Currently, I am deepening my expertise in modern web architectures while expanding my horizons into <strong className="font-semibold text-zinc-900 dark:text-zinc-100">Machine Learning</strong> and <strong className="font-semibold text-zinc-900 dark:text-zinc-100">Data Science</strong> to create more intelligent, data-driven digital solutions.
                            </p>

                            <div className="pt-6">
                                <Button asChild variant="default" className="group h-auto p-0 text-base font-semibold bg-transparent dark:bg-transparent text-zinc-900 dark:text-zinc-100 hover:bg-transparent dark:hover:bg-transparent shadow-none hover:text-zinc-600 dark:hover:text-zinc-400 pl-0 rounded-none transition-all">
                                    <Link href="/about" className="flex items-center gap-2">
                                        Read full story
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section >
    );
}
