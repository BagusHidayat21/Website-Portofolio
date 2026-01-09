
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pkg from 'pg';
import 'dotenv/config';

const { Pool } = pkg;
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('Start seeding ...');

    // 1. Profile
    const profile = await prisma.profile.upsert({
        where: { id: 1 },
        update: {},
        create: {
            name: 'Bagus Hidayat',
            tagline: 'Full-Stack Developer',
            bio: "I'm a Full Stack Web Developer currently expanding my expertise into mobile development, machine learning, and data science.",
            avatarUrl: 'https://picsum.photos/seed/avatar/400/400',
            email: 'bagus.hidayat.id@gmail.com',
            location: 'Malang, Indonesia',
            yearsCoding: 3,
            projectsCount: 20,
            githubUrl: 'https://github.com/BagusHidayat21',
            linkedinUrl: 'https://www.linkedin.com/in/bagushidayat-id/',
        },
    });
    console.log('Created/Updated Profile:', profile.name);

    // 2. Tech Stack
    const techs = [
        { name: 'REACT', category: 'Frontend', inMarquee: true },
        { name: 'NEXT.JS', category: 'Frontend', inMarquee: true },
        { name: 'TYPESCRIPT', category: 'Language', inMarquee: true },
        { name: 'REACT NATIVE', category: 'Mobile', inMarquee: true },
        { name: 'NODE.JS', category: 'Backend', inMarquee: true },
        { name: 'MACHINE LEARNING', category: 'AI', inMarquee: true },
        { name: 'POSTGRESQL', category: 'Database', inMarquee: true },
        { name: 'DOCKER', category: 'DevOps', inMarquee: true },
        { name: 'AWS', category: 'Cloud', inMarquee: true },
    ];

    for (const tech of techs) {
        await prisma.techStack.upsert({
            where: { name: tech.name },
            update: {},
            create: tech,
        });
    }
    console.log('Seeded Tech Stack');

    // 3. Projects
    const projects = [
        {
            slug: 'e-commerce-platform',
            title: 'E-Commerce Platform',
            description: 'A headless e-commerce solution built for performance and scalability. Features real-time inventory, seamless checkout, and an intuitive admin dashboard.',
            techStack: ['Next.js', 'Stripe', 'PostgreSQL'],
            tags: ['E-Commerce', 'Full Stack'],
            isFeatured: true,
            order: 1,
        },
        {
            slug: 'ai-analytics-dashboard',
            title: 'AI Analytics Dashboard',
            description: 'Real-time data visualization platform processing thousands of events per second with AI-driven insights and predictive modeling.',
            techStack: ['Python', 'TensorFlow', 'React'],
            tags: ['AI', 'Data Visualization'],
            isFeatured: true,
            order: 2,
        },
        {
            slug: 'modern-banking-app',
            title: 'Modern Banking App',
            description: 'Secure and compliant fintech application focused on user experience. Biometric authentication, instant transfers, and spending analytics.',
            techStack: ['React Native', 'Node.js', 'Redis'],
            tags: ['Fintech', 'Mobile'],
            isFeatured: true,
            order: 3,
        },
    ];

    for (const p of projects) {
        await prisma.project.upsert({
            where: { slug: p.slug },
            update: {},
            create: p,
        });
    }
    console.log('Seeded Projects');

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
