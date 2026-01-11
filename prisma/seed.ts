import prisma from '../src/lib/prisma';

async function seedAboutContent() {
    console.log('Checking for existing AboutContent...');

    const existing = await prisma.aboutContent.findFirst();

    if (existing) {
        console.log('AboutContent already exists, skipping seed.');
        return;
    }

    console.log('Seeding AboutContent...');

    await prisma.aboutContent.create({
        data: {
            heroTitle: 'ENGINEERING',
            heroSubtitle: 'EXCELLENCE.',
            heroDescription: 'I am a student at Universitas Negeri Malang, majoring in Informatics Engineering Education. I bridge academic theory with real-world application to build robust digital solutions.',
            storyTitle: 'The Story',
            storyContent: `My journey began at SMK Negeri 1 Jenangan Ponorogo, where I majored in Software Engineering. Early on, I developed a strong interest in building practical systems from school projects to real-world applications that emphasize structured data handling and clear system logic.

Currently, I am an undergraduate student at Universitas Negeri Malang, focusing on developing web and application-based systems such as HealMe (a mental health platform) and Carfy (a car rental system). Through these projects, I became increasingly interested in how data can be processed, analyzed, and transformed into meaningful insights.

Lately, my primary focus has shifted toward data engineering and machine learning, particularly how data-driven models can be integrated into modern web and mobile applications. I enjoy exploring how APIs, databases, and machine learning pipelines can work together to support smarter and more adaptive digital systems.`,
            images: ['https://picsum.photos/seed/workspace/1200/800', 'https://picsum.photos/seed/setup/600/600'],
            tags: ['Data & Machine Learning', 'Web & Application Development'],
            philosophy: [
                {
                    title: 'Data Centric',
                    description: 'I believe applications are more than just interfaces; they are engines for structured data.',
                    icon: 'Database'
                },
                {
                    title: 'Intelligent Systems',
                    description: 'Moving beyond static logic, I integrate Machine Learning pipelines to create adaptive applications.',
                    icon: 'BrainCircuit'
                },
                {
                    title: 'Robust Infrastructure',
                    description: 'Reliability is key. I architect resilient backend APIs and databases as the solid foundation.',
                    icon: 'Server'
                }
            ]
        }
    });

    console.log('AboutContent seeded successfully!');
}

async function seedExperience() {
    console.log('Checking for existing Experience...');

    const existingCount = await prisma.experience.count();

    if (existingCount > 0) {
        console.log('Experience data already exists, skipping seed.');
        return;
    }

    console.log('Seeding Experience...');

    const experienceData = [
        {
            title: 'Informatics Engineering Education',
            company: 'Universitas Negeri Malang',
            year: '2022 - PRESENT',
            description: 'Bachelor of Science (S1). Combining technical expertise in software development, computer systems, and networking with pedagogical knowledge for vocational education.',
            skills: ['Software Engineering', 'Pedagogy', 'Network Systems', 'Educational Tech'],
            order: 1
        },
        {
            title: 'Laravel Developer (HealMe)',
            company: 'Wintex IID 2024',
            year: '2024',
            description: 'Developed a mental health consultation platform using Laravel 10. Implemented secure user authentication, appointment scheduling, mood tracking, and anonymous support forums.',
            skills: ['Laravel 10', 'System Security', 'Full Stack Development', 'Healthcare Tech'],
            order: 2
        },
        {
            title: 'Web Developer (Cahaya Dunia)',
            company: 'Ngadimulyo Village Govt',
            year: '2024',
            description: 'Developed a digital library management system including features for book cataloging, member management, and borrowing/returning processes.',
            skills: ['Web Development', 'Library Management', 'Admin Dashboard', 'Training'],
            order: 3
        },
        {
            title: 'API Developer (J-TAG)',
            company: 'SMK Negeri 1 Jenangan',
            year: '2023',
            description: 'Developed a RESTful API for an RFID-based attendance system. Focused on real-time data processing and seamless integration.',
            skills: ['RESTful API', 'Real-time Data', 'RFID Integration', 'Backend Engineering'],
            order: 4
        },
        {
            title: 'Software Engineering',
            company: 'SMK Negeri 1 Jenangan Ponorogo',
            year: '2019 - 2022',
            description: 'High School Diploma. Focused on programming, web development, databases, and software lifecycle.',
            skills: ['Web Development', 'Databases', 'Leadership', 'Teamwork'],
            order: 5
        }
    ];

    await prisma.experience.createMany({
        data: experienceData
    });

    console.log('Experience seeded successfully!');
}

async function seedEducation() {
    console.log('Checking for existing Education...');

    const existingCount = await prisma.education.count();

    if (existingCount > 0) {
        console.log('Education data already exists, skipping seed.');
        return;
    }

    console.log('Seeding Education...');

    const educationData = [
        {
            institution: 'Universitas Negeri Malang',
            degree: 'Bachelor of Science (S1)',
            field: 'Informatics Engineering Education',
            year: '2022 - Present',
            description: 'Combining technical expertise in software development, computer systems, and networking with pedagogical knowledge for vocational education.',
            order: 1
        },
        {
            institution: 'SMK Negeri 1 Jenangan Ponorogo',
            degree: 'High School Diploma',
            field: 'Software Engineering',
            year: '2019 - 2022',
            description: 'Focused on programming, web development, databases, and software lifecycle. Developed strong foundation in practical software engineering.',
            order: 2
        }
    ];

    await prisma.education.createMany({
        data: educationData
    });

    console.log('Education seeded successfully!');
}

async function seedProjects() {
    console.log('Checking for existing Projects...');

    const existingCount = await prisma.project.count();

    if (existingCount > 0) {
        console.log('Project data already exists, skipping seed.');
        return;
    }

    console.log('Seeding Projects...');

    const projectsData = [
        {
            title: 'Perpustakaan Desa Ngadimulyo',
            slug: 'perpustakaan-desa-ngadimulyo',
            description: 'Village library digitalization project for Desa Ngadimulyo, providing digital access to book catalog and member services.',
            content: `## Overview
Digital transformation project for village library.

## Features
- Digital book catalog
- Member registration
- Borrowing management
- Village community access
- Simple admin interface`,
            tags: ['HTML', 'PHP', 'Community', 'Library'],
            githubUrl: 'https://github.com/BagusHidayat21/Perpustaakan-Desa-Ngadimulyo',
            isFeatured: true,
            isVisible: true,
            order: 1
        },
        {
            title: 'HealMe',
            slug: 'healme',
            description: 'A mental health consultation platform providing anonymous support, mood tracking, and professional consultation scheduling.',
            content: `## Overview
Mental health platform built to support users in their wellness journey.

## Features
- Anonymous support forums
- Mood tracking and journaling
- Professional consultation booking
- Resource library
- Community support`,
            tags: ['Laravel', 'Healthcare', 'Mental Health', 'Consultation'],
            githubUrl: 'https://github.com/BagusHidayat21/HealMe',
            isFeatured: true,
            isVisible: true,
            order: 2
        },
        {
            title: 'Website Mobil Laravel',
            slug: 'website-mobil-laravel',
            description: 'A car rental web application built with Laravel 10, featuring vehicle catalog, booking system, and admin management dashboard.',
            content: `## Overview
Complete car rental platform with booking and management features.

## Features
- Vehicle catalog with filters
- Online booking system
- Payment integration
- Admin dashboard
- Customer management`,
            tags: ['Laravel 10', 'CSS', 'Car Rental', 'E-commerce'],
            githubUrl: 'https://github.com/BagusHidayat21/Website-Mobil-Laravel-10',
            liveUrl: 'https://rental-mobil-one.vercel.app',
            isFeatured: true,
            isVisible: true,
            order: 3
        },
        {
            title: 'RFID Attendance System',
            slug: 'rfid-absen',
            description: 'A modern RFID-based attendance system built with Next.js and TypeScript. Features real-time attendance tracking, dashboard analytics, and seamless hardware integration.',
            content: `## Overview
This project implements a complete RFID-based attendance system with a modern web interface.

## Features
- Real-time RFID card scanning
- Dashboard with attendance analytics
- Employee/student management
- Export reports to Excel/PDF
- Multi-location support

## Tech Stack
- Next.js 14 with App Router
- TypeScript for type safety
- Prisma ORM with PostgreSQL
- Tailwind CSS for styling
- Real-time updates via WebSocket`,
            tags: ['Next.js', 'TypeScript', 'Prisma', 'RFID', 'IoT'],
            githubUrl: 'https://github.com/BagusHidayat21/RFID-Absen',
            liveUrl: 'https://rfid-absen.vercel.app',
            isFeatured: false,
            isVisible: true,
            order: 4
        },
        {
            title: 'RFID Attendance UBIG',
            slug: 'rfid-absen-ubig',
            description: 'Enhanced RFID attendance system designed for UBIG organization with advanced features including shift management and multi-department support.',
            content: `## Overview
An enhanced version of the RFID attendance system specifically designed for UBIG organization.

## Key Features
- Multi-department attendance tracking
- Shift management system
- Advanced reporting and analytics
- Admin dashboard with role-based access
- API integration for external systems`,
            tags: ['Next.js', 'TypeScript', 'Prisma', 'RFID', 'Enterprise'],
            githubUrl: 'https://github.com/BagusHidayat21/RFID-Absen-UBIG',
            liveUrl: 'https://rfid-absen-ubig.vercel.app',
            isFeatured: false,
            isVisible: true,
            order: 5
        },
        {
            title: 'Web Framework KPTK',
            slug: 'web-framework-kptk',
            description: 'A comprehensive web framework project for KPTK course, demonstrating modern web development practices with Next.js and TypeScript.',
            content: `## Overview
A complete web application showcasing modern web development techniques.

## Features
- Server-side rendering with Next.js
- Type-safe development with TypeScript
- Responsive design with Tailwind CSS
- Database integration with Prisma`,
            tags: ['Next.js', 'TypeScript', 'Web Framework', 'Education'],
            githubUrl: 'https://github.com/BagusHidayat21/Web-Framework-KPTK',
            liveUrl: 'https://web-framework-kptk.vercel.app',
            isFeatured: false,
            isVisible: true,
            order: 6
        },
        {
            title: 'Media Pembelajaran',
            slug: 'media-pembelajaran',
            description: 'An interactive learning media platform built with PHP for educational purposes, featuring multimedia content management and student progress tracking.',
            content: `## Overview
A learning management system designed for educational institutions.

## Features
- Multimedia content management
- Student progress tracking
- Quiz and assessment modules
- Teacher dashboard
- Course management`,
            tags: ['PHP', 'Laravel', 'Education', 'LMS'],
            githubUrl: 'https://github.com/BagusHidayat21/Media-Pembelajaran',
            isFeatured: false,
            isVisible: true,
            order: 7
        },
        {
            title: 'Perpustakaan NextJS',
            slug: 'perpustakaan-nextjs',
            description: 'A modern library management system built with Next.js, featuring book cataloging, member management, and borrowing system.',
            content: `## Overview
Digital library management system for modern institutions.

## Features
- Book catalog with search
- Member registration and management
- Borrowing and returning system
- Overdue notifications
- Reports and analytics`,
            tags: ['Next.js', 'TypeScript', 'Library', 'Management'],
            githubUrl: 'https://github.com/BagusHidayat21/Perpustakaan-NextJS',
            isFeatured: false,
            isVisible: true,
            order: 8
        },
        {
            title: 'UangKita',
            slug: 'uangkita',
            description: 'A personal finance management application built with Laravel, helping users track expenses, set budgets, and achieve financial goals.',
            content: `## Overview
Personal finance tracker to help manage daily expenses.

## Features
- Expense tracking
- Budget management
- Financial reports
- Goal setting
- Transaction categories`,
            tags: ['Laravel', 'Blade', 'Finance', 'Management'],
            githubUrl: 'https://github.com/BagusHidayat21/UangKita',
            isFeatured: false,
            isVisible: true,
            order: 9
        },
        {
            title: 'Latihan API',
            slug: 'latihan-api',
            description: 'API development practice project demonstrating RESTful API design patterns, authentication, and database integration.',
            content: `## Overview
Practice project for learning RESTful API development.

## Topics Covered
- RESTful API design
- Authentication with JWT
- Database operations
- Error handling
- API documentation`,
            tags: ['TypeScript', 'API', 'REST', 'Learning'],
            githubUrl: 'https://github.com/BagusHidayat21/Latihan-Api',
            isFeatured: false,
            isVisible: true,
            order: 10
        }
    ];

    await prisma.project.createMany({
        data: projectsData
    });

    console.log('Projects seeded successfully!');
}

async function main() {
    await seedAboutContent();
    await seedExperience();
    await seedEducation();
    await seedProjects();
}

main()
    .catch((e) => {
        console.error('Error seeding:', e);
        process.exit(1);
    });
