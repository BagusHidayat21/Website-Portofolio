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
            heroTitle: 'BEYOND',
            heroSubtitle: 'CODE.',
            heroDescription: 'Bridging the gap between academic theory and real-world application. I engineer robust digital solutions with a focus on data-driven intelligence and seamless user experiences.',
            storyTitle: 'The Story',
            storyContent: `My journey isn't just about writing code—it's about crafting solutions. It began with a strong foundation in Software Engineering at SMK Negeri 1 Jenangan and has evolved into advanced academic pursuits at Universitas Negeri Malang. I've always been driven by the "why" behind the technology.

From architecting the "HealMe" mental health platform to optimizing logistics for "Website Mobil", I treat every project as an opportunity to push technical boundaries. My work emphasizes not just functionality, but scalability, security, and user-centric design.

Recently, my focus has pivoted toward the intersection of Data Engineering and Machine Learning. I believe the next generation of applications won't just process input; they will understand it. I'm currently exploring how to integrate intelligent data pipelines into modern web architectures to build smarter, more adaptive systems.`,
            images: ['https://picsum.photos/seed/workspace/1200/800', 'https://picsum.photos/seed/setup/600/600'],
            tags: ['Data & Machine Learning', 'Full Stack Engineering', 'System Architecture'],
            philosophy: [
                {
                    title: 'Precision First',
                    description: 'In code and design, every detail matters. I prioritize clean, maintainable architecture that stands the test of time.',
                    icon: 'Database'
                },
                {
                    title: 'Adaptive Intelligence',
                    description: 'Building systems that learn and evolve. Integrating ML pipelines to create smarter, responsive applications.',
                    icon: 'BrainCircuit'
                },
                {
                    title: 'User-Centric Core',
                    description: 'Technology serves people. I build interfaces that are intuitive, accessible, and delight the user at every interaction.',
                    icon: 'Start'
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
        // Work Experience (Current & Recent)
        {
            title: 'Industrial Trainer',
            company: 'PT Universal Big Data',
            year: '2025 - PRESENT',
            description: 'Teaching industrial-grade software development to vocational high school (SMK) students. Delivering curriculum on modern web technologies and industry best practices.',
            skills: ['Teaching', 'Mentoring', 'Curriculum Development', 'Full Stack Development'],
            order: 1
        },
        {
            title: 'Software Developer & Trainer (Intern)',
            company: 'PT Universal Big Data',
            year: 'Jun - Oct 2025',
            description: 'Developed internal software solutions and assisted in training programs. Gained hands-on experience in enterprise software development lifecycles and team collaboration.',
            skills: ['Software Development', 'Training Assistance', 'Team Collaboration', 'Agile'],
            order: 2
        },
        // Awards & Publications (2024)
        {
            title: 'International Innovation Award',
            company: 'Wintex IID 2024',
            year: '2024',
            description: 'Awarded Silver Medal for "HealMe" - a comprehensive mental health platform. Recognized for innovation in healthcare technology at the World Invention and Technology Expo.',
            skills: ['Product Innovation', 'System Architecture', 'HealthTech', 'Public Speaking'],
            order: 3
        },
        {
            title: 'Conference Paper (Scopus)',
            company: 'State University of Malang',
            year: '2024',
            description: 'Co-authored "Comparison of Tesseract OCR, Easy OCR, and Transformer OCR on Handwritten Image". Research analyzing the performance of various OCR technologies on handwritten datasets.',
            skills: ['Computer Vision', 'OCR', 'Python', 'Machine Learning'],
            order: 4
        },
        // Work Experience (2024 - 2021)
        {
            title: 'Full Stack Developer (HealMe)',
            company: 'Wintex IID 2024',
            year: '2024',
            description: 'Sole developer for a comprehensive mental health platform. Architected the entire system using Laravel 10 for the international innovation competition.',
            skills: ['Laravel 10', 'System Architecture', 'Full Stack Development', 'Database Design'],
            order: 5
        },
        {
            title: 'Full Stack Developer (KKN)',
            company: 'Ngadimulyo Village Government',
            year: '2024',
            description: 'Community Service Program (KKN). Led the digital transformation of the village library. Developed "Cahaya Dunia", a complete library management system as part of university community service.',
            skills: ['Web Development', 'Digital Transformation', 'Community Service', 'System Administration'],
            order: 6
        },
        {
            title: 'API Developer (J-TAG)',
            company: 'SMK Negeri 1 Jenangan',
            year: '2023',
            description: 'Engineered the core REST API for J-TAG, an enterprise-grade RFID attendance system. Optimized real-time data handling between hardware scanners and the database.',
            skills: ['REST API Design', 'IoT Integration', 'Real-time Processing', 'Backend Optimization'],
            order: 7
        },
        {
            title: 'Web Developer Intern',
            company: 'Dinas Kominfo Ponorogo',
            year: '2021',
            description: 'Vocational High School Internship. Developed and maintained government websites using WordPress. Assisted in managing digital content and ensuring website accessibility.',
            skills: ['WordPress', 'Web Maintenance', 'Content Management', 'Public Sector IT'],
            order: 8
        },
        // Education
        {
            title: 'Informatics Engineering Education',
            company: 'Universitas Negeri Malang',
            year: '2022 - PRESENT',
            description: 'Bachelor of Science (S1). Maintaining a 3.86 GPA. Active in research groups focusing on Educational Technology and Artificial Intelligence.',
            skills: ['Software Engineering', 'Data Science', 'Pedagogy', 'Algorithm Design'],
            order: 9
        },
        {
            title: 'Software Engineering',
            company: 'SMK Negeri 1 Jenangan Ponorogo',
            year: '2019 - 2022',
            description: 'Vocational High School. Graduated with honors. Specialized in backend development, database management, and network infrastructure.',
            skills: ['PHP Native', 'CodeIgniter', 'MySQL', 'Networking'],
            order: 10
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
