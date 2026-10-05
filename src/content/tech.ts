import type { TechStack } from './types';

export const techStack = [
    { id: 1, name: 'TypeScript', category: 'Language', isVisible: true, inMarquee: true, order: 1 },
    { id: 2, name: 'JavaScript', category: 'Language', isVisible: true, inMarquee: true, order: 2 },
    { id: 3, name: 'Python', category: 'Language', isVisible: true, inMarquee: false, order: 3 },
    { id: 4, name: 'PHP', category: 'Language', isVisible: true, inMarquee: false, order: 4 },
    { id: 5, name: 'React', category: 'Frontend', isVisible: true, inMarquee: true, order: 5 },
    { id: 6, name: 'Next.js', category: 'Frontend', isVisible: true, inMarquee: true, order: 6 },
    { id: 7, name: 'Tailwind CSS', category: 'Frontend', isVisible: true, inMarquee: true, order: 7 },
    { id: 8, name: 'Laravel', category: 'Backend', isVisible: true, inMarquee: true, order: 8 },
    { id: 9, name: 'Node.js', category: 'Backend', isVisible: true, inMarquee: true, order: 9 },
    { id: 10, name: 'PostgreSQL', category: 'Backend', isVisible: true, inMarquee: true, order: 10 },
    { id: 11, name: 'MySQL', category: 'Backend', isVisible: true, inMarquee: true, order: 11 },
    { id: 12, name: 'Prisma', category: 'Tool', isVisible: true, inMarquee: true, order: 12 },
    { id: 13, name: 'Docker', category: 'Tool', isVisible: true, inMarquee: true, order: 13 },
    { id: 14, name: 'Git', category: 'Tool', isVisible: true, inMarquee: true, order: 14 },
] satisfies TechStack[];
