'use client';

// Wrapper component for scroll-triggered animations
import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import { fadeUp, staggerContainer } from '@/lib/animations';

interface AnimatedSectionProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    stagger?: boolean;
}

export function AnimatedSection({
    children,
    className = '',
    delay = 0,
    stagger = false,
}: AnimatedSectionProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const variants = stagger ? staggerContainer : fadeUp;

    return (
        <motion.section
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={variants}
            transition={{ delay }}
            className={className}
        >
            {children}
        </motion.section>
    );
}

// Animated div for individual elements within sections
interface AnimatedDivProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

export function AnimatedDiv({
    children,
    className = '',
    delay = 0,
}: AnimatedDivProps) {
    return (
        <motion.div
            variants={fadeUp}
            transition={{ delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
