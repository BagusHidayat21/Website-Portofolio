// Framer Motion animation variants for portfolio website
import { Variants } from 'framer-motion';

// Fade up animation - elements fade in while moving up
export const fadeUp: Variants = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.4, 0.25, 1],
        },
    },
};

// Fade in animation - simple opacity fade
export const fadeIn: Variants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.4,
            ease: 'easeOut',
        },
    },
};

// Stagger container - used to stagger children animations
export const staggerContainer: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

// Scale animation for cards and interactive elements
export const scaleUp: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.95,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.4,
            ease: [0.25, 0.4, 0.25, 1],
        },
    },
};

// Slide in from left
export const slideInLeft: Variants = {
    hidden: {
        opacity: 0,
        x: -30,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.4, 0.25, 1],
        },
    },
};

// Slide in from right
export const slideInRight: Variants = {
    hidden: {
        opacity: 0,
        x: 30,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.4, 0.25, 1],
        },
    },
};

// Hover scale effect for interactive elements
export const hoverScale = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.2 },
};

// Hover glow effect
export const hoverGlow = {
    whileHover: {
        boxShadow: '0 0 30px rgba(255, 255, 255, 0.1)',
    },
    transition: { duration: 0.3 },
};

// Navbar animation
export const navItem: Variants = {
    hidden: {
        opacity: 0,
        y: -10,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
        },
    },
};

// Text reveal animation for hero section
export const textReveal: Variants = {
    hidden: {
        opacity: 0,
        y: 30,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.4, 0.25, 1],
        },
    },
};

// Icon bounce animation
export const iconBounce = {
    whileHover: {
        y: -3,
        transition: {
            duration: 0.2,
            ease: 'easeOut' as const,
        },
    },
};

