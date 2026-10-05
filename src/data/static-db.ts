
export interface SocialLink {
    platform: string;
    url: string;
    icon: string; // We'll use string names for icons and map them in components if needed, or just use text for now
}

export interface Profile {
    name: string;
    tagline: string;
    bio: string;
    avatarUrl: string;
    resumeUrl: string;
    email: string;
    location: string;
    yearsCoding: number;
    projectsCount: number;
    socials: SocialLink[];
    isAvailableForWork: boolean;
    currentCompany?: string;
}

export interface AboutContent {
    heroTitle: string;
    heroSubtitle: string;
    heroDescription: string;
    storyTitle: string;
    storyContent: string;
    images: string[];
    tags: string[];
    philosophy: {
        title: string;
        description: string;
        icon: string;
    }[];
}

export interface Experience {
    id: number;
    title: string;
    company: string;
    year: string;
    description: string;
    skills: string[];
    location?: string;
    category?: 'Work' | 'Project' | 'Achievement';
    url?: string;
    isVisible: boolean;
    order: number;
}

export interface Education {
    id: number;
    institution: string;
    degree: string;
    field: string;
    year: string;
    description: string;
    location?: string;
    isVisible: boolean;
    order: number;
}

export interface Project {
    id: number;
    title: string;
    slug: string;
    description: string;
    content: string | null;
    githubUrl: string | null;
    liveUrl: string | null;
    thumbnail: string | null;
    images: string[];
    techStack: string[];
    tags: string[];
    isFeatured: boolean;
    isVisible: boolean;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface TechStack {
    id: number;
    name: string;
    category: 'Frontend' | 'Backend' | 'Language' | 'Tool' | 'Other';
    icon: string | null;
    isVisible: boolean;
    inMarquee: boolean;
    order: number;
}


export const projectsData: Project[] = [
    {
        id: 1,
        title: 'EduMatch',
        slug: 'edumatch',
        description: 'Undergraduate thesis web application providing interactive learning content recommendations and student progress tracking.',
        content: `## Overview\nEduMatch is an interactive educational web application developed as an undergraduate thesis project. Built to streamline learning material discovery, it features a responsive web interface, student progress dashboards, and automated content recommendation workflows.\n\n## Key Features\n- Interactive student learning portal\n- Automated content recommendation workflow\n- Comprehensive student progress dashboard\n- Teacher curriculum & material management\n- Responsive web design & performance optimization`,
        githubUrl: 'https://github.com/BagusHidayat21/Skripsi-Rekomendasi-Materi-Pembelajaran',
        liveUrl: null,
        thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
        images: ['https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80'],
        techStack: ['Next.js', 'Supabase', 'TypeScript', 'Tailwind CSS', 'Python'],
        tags: ['Next.js', 'Supabase', 'TypeScript', 'Web Application', 'Thesis'],
        isFeatured: true,
        isVisible: true,
        order: 1,
        createdAt: new Date('2026-07-09'),
        updatedAt: new Date('2026-07-09')
    },
    {
        id: 2,
        title: 'Bebas Pustaka',
        slug: 'bebas-pustaka',
        description: 'Library clearance and book borrowing platform for academic institutions, with digital certificates for graduating students.',
        content: `## Overview\nBebas Pustaka simplifies academic library operations by automating student library clearance verifications and book circulation. The platform tracks member borrowing histories, overdue fines, and generates official digital clearance certificates required for graduation.\n\n## Key Features\n- Automated digital library clearance generation\n- Book catalog search & reservation\n- Overdue borrowing fine tracking\n- Admin circulation desk dashboard\n- Export clearance verification reports`,
        githubUrl: 'https://github.com/BagusHidayat21/bebas-pustaka',
        liveUrl: null,
        thumbnail: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&auto=format&fit=crop&q=80',
        images: ['https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&auto=format&fit=crop&q=80'],
        techStack: ['Next.js', 'Supabase', 'TypeScript', 'Tailwind CSS'],
        tags: ['Next.js', 'Supabase', 'TypeScript', 'Library Management'],
        isFeatured: false,
        isVisible: true,
        order: 2,
        createdAt: new Date('2026-07-23'),
        updatedAt: new Date('2026-07-23')
    },
    {
        id: 3,
        title: 'SIMMAS',
        slug: 'simmas',
        description: 'Internship management platform for vocational high schools, with role-based dashboards secured by Supabase RLS.',
        content: `## Overview\nSIMMAS (Sistem Informasi Manajemen Magang Siswa) is a centralized internship program management application for vocational schools. Built with Next.js 16 and Supabase RLS, it streamlines company placements, student daily journal submissions, attendance check-ins, and supervisory teacher monitoring.\n\n## Key Features\n- Role-Based Access Control (Admin, Guru, Siswa)\n- Supabase Row Level Security (RLS) policies\n- Student check-in/out attendance with geotagging\n- Daily activity journal verification\n- DUDI (industry partner) placement management\n- Comprehensive audit logs & activity tracking`,
        githubUrl: 'https://github.com/BagusHidayat21/simmas',
        liveUrl: null,
        thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
        images: ['https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80'],
        techStack: ['Next.js 16', 'Supabase', 'TypeScript', 'Tailwind CSS v4', 'Docker', 'PostgreSQL'],
        tags: ['Next.js 16', 'Supabase', 'Tailwind CSS v4', 'Docker', 'RLS'],
        isFeatured: true,
        isVisible: true,
        order: 3,
        createdAt: new Date('2026-07-27'),
        updatedAt: new Date('2026-07-27')
    },
    {
        id: 4,
        title: 'Bot Laporan',
        slug: 'bot-laporan',
        description: 'Bot that compiles operational logs into daily reports and sends them to team chats on a schedule.',
        content: `## Overview\nBot Laporan automates the routine collection and distribution of daily operational summaries across team messaging platforms. It aggregates activity logs, formats concise status updates, and schedules automated notifications to streamline administrative workflow.\n\n## Key Features\n- Scheduled automated report generation\n- Integration with messaging platforms (Telegram/WhatsApp)\n- Operational log aggregation\n- Customizable report templates\n- Failed submission retry queue`,
        githubUrl: 'https://github.com/BagusHidayat21/bot-laporan',
        liveUrl: null,
        thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
        images: ['https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80'],
        techStack: ['Next.js', 'TypeScript', 'Supabase', 'Node.js', 'Tailwind CSS'],
        tags: ['Next.js', 'Node.js', 'Bot', 'Automation'],
        isFeatured: false,
        isVisible: true,
        order: 4,
        createdAt: new Date('2026-07-27'),
        updatedAt: new Date('2026-07-27')
    },
    {
        id: 5,
        title: 'JasaOne.id',
        slug: 'jasaone-id',
        description: 'Marketplace for digital and academic services, with dynamic pricing, HMAC-signed negotiation codes and order tracking.',
        content: `## Overview\nJasaOne.id is a comprehensive web service marketplace designed for digital project order fulfillment across 6 service divisions. Features an interactive order wizard with automatic rush-fee calculation, secure HMAC-signed price negotiation codes, real-time order tracking, and invoice generation.\n\n## Key Features\n- 4-step interactive Order Wizard\n- Automatic rush fee & service complexity pricing\n- HMAC-SHA256 signed price negotiation code generator\n- Service catalog fuzzy search using Fuse.js\n- Self-service order tracking & digital invoice generator\n- Revision request management & client rating system`,
        githubUrl: 'https://github.com/JasaOne/jasa-one.id',
        liveUrl: 'https://jasa-one.id',
        thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
        images: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80'],
        techStack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Supabase', 'TanStack Query'],
        tags: ['Next.js 16', 'React 19', 'Tailwind CSS v4', 'Marketplace', 'E-commerce'],
        isFeatured: true,
        isVisible: true,
        order: 5,
        createdAt: new Date('2026-07-19'),
        updatedAt: new Date('2026-07-19')
    },
    {
        id: 6,
        title: 'EduStack',
        slug: 'edustack',
        description: 'Student management system with discipline tracking, analytics dashboards, and multi-format document exporting.',
        content: `## Overview\nEduStack (Manajemen Siswa) provides educational institutions with a suite for managing student directories, class enrollments, and behavioral discipline logs. Features interactive data tables, analytical charts via Recharts, and automated report generation in PDF and Excel formats.\n\n## Key Features\n- Student records directory with sorting & filtering\n- Student violation & offense discipline log\n- Analytics charts for student activity metrics\n- Class & enrollment organization\n- Multi-format document export (PDF & Excel)`,
        githubUrl: 'https://github.com/BagusHidayat21/manajemen-siswa',
        liveUrl: null,
        thumbnail: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80',
        images: ['https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&auto=format&fit=crop&q=80'],
        techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'TanStack Table', 'Recharts', 'jsPDF'],
        tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Management System'],
        isFeatured: false,
        isVisible: true,
        order: 6,
        createdAt: new Date('2026-07-23'),
        updatedAt: new Date('2026-07-23')
    },
    {
        id: 7,
        title: 'Cahaya Dunia',
        slug: 'cahaya-dunia',
        description: 'Digital village library portal developed during university community service for book cataloging and member circulation.',
        content: `## Overview\nCahaya Dunia (Perpustakaan Desa Ngadimulyo) is a community library digitalization initiative aimed at enhancing rural literacy access. The application offers a searchable digital book catalog, online member registration, and streamlined borrowing records for village administrators.\n\n## Key Features\n- Searchable public book catalog\n- Online member registration\n- Circulation desk borrowing & return tracking\n- Community access metrics dashboard`,
        githubUrl: 'https://github.com/BagusHidayat21/Perpustaakan-Desa-Ngadimulyo',
        liveUrl: null,
        thumbnail: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&auto=format&fit=crop&q=80',
        images: ['https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1200&auto=format&fit=crop&q=80'],
        techStack: ['PHP', 'HTML', 'CSS', 'MySQL'],
        tags: ['PHP', 'MySQL', 'Library', 'Community Service'],
        isFeatured: false,
        isVisible: true,
        order: 7,
        createdAt: new Date('2025-05-26'),
        updatedAt: new Date('2025-05-26')
    },
    {
        id: 8,
        title: 'Jurnal Mengajar',
        slug: 'jurnal-mengajar',
        description: 'Flutter app for teachers to log daily lessons, track attendance and follow curriculum progress.',
        content: `## Overview\nJurnal Mengajar is a mobile application built with Flutter that lets teachers log daily classroom activities, track student attendance, and monitor syllabus coverage across academic terms on iOS and Android devices.\n\n## Key Features\n- Mobile teaching timetable management\n- Daily teaching entry & lesson progress logs\n- Classroom student attendance tracking\n- Period & term-based summary reports`,
        githubUrl: 'https://github.com/BagusHidayat21/jurnal-mengajar',
        liveUrl: null,
        thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80',
        images: ['https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&auto=format&fit=crop&q=80'],
        techStack: ['Flutter', 'Dart', 'Supabase', 'PostgreSQL'],
        tags: ['Flutter', 'Dart', 'Mobile App', 'Education', 'Journal'],
        isFeatured: false,
        isVisible: true,
        order: 8,
        createdAt: new Date('2026-07-23'),
        updatedAt: new Date('2026-07-23')
    },
    {
        id: 9,
        title: 'CV Builder',
        slug: 'cv-builder',
        description: 'ATS-compliant automated resume builder featuring live side-by-side preview and server-side Puppeteer PDF generation.',
        content: `## Overview\nCV Builder (ResumeATS) allows job seekers to construct clean, ATS-optimized resumes designed for parsing compatibility. Features dynamic A4 page break guides, custom typography controls, Zustand state management, and high-precision server-side vector PDF generation via Puppeteer.\n\n## Key Features\n- ATS-optimized layout architecture (no parsing errors)\n- Live side-by-side editing preview with A4 page break guides\n- Server-side vector PDF rendering with Puppeteer\n- Professional typography & margin calibration\n- Auto-saving state management powered by Zustand`,
        githubUrl: 'https://github.com/BagusHidayat21/CV-Builder',
        liveUrl: null,
        thumbnail: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop&q=80',
        images: ['https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&auto=format&fit=crop&q=80'],
        techStack: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL', 'Puppeteer', 'Zustand'],
        tags: ['Next.js 16', 'TypeScript', 'Prisma', 'Puppeteer', 'ATS Resume'],
        isFeatured: false,
        isVisible: true,
        order: 9,
        createdAt: new Date('2026-01-15'),
        updatedAt: new Date('2026-01-15')
    },
    {
        id: 10,
        title: 'Magic Remove',
        slug: 'magic-remove',
        description: 'Browser-based photo tool for canvas mask selection and background removal.',
        content: `## Overview\nMagic Remove is an interactive web application designed for photo editing and image cleanup. Utilizing an HTML5 canvas mask selector and responsive web interface, users can upload images, select regions, and process extracted graphics directly in their web browser.\n\n## Key Features\n- Web-based photo canvas mask selection tool\n- Client-side image preview & subject extraction\n- High-resolution PNG image download\n- Responsive web UI for desktop and mobile browsers`,
        githubUrl: 'https://github.com/BagusHidayat21/magic-remove',
        liveUrl: null,
        thumbnail: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop&q=80',
        images: ['https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200&auto=format&fit=crop&q=80'],
        techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Canvas', 'Web API'],
        tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Web Tool', 'Canvas'],
        isFeatured: false,
        isVisible: true,
        order: 10,
        createdAt: new Date('2026-07-23'),
        updatedAt: new Date('2026-07-23')
    },
    {
        id: 11,
        title: 'HealMe',
        slug: 'healme',
        description: 'Mental health platform with anonymous peer forums, mood logging and therapist booking. Silver Medal, Wintex IID 2024.',
        content: `## Overview\nHealMe is an international award-winning mental health application (Silver Medal Wintex IID 2024). It provides users with a safe digital space featuring encrypted anonymous support forums, daily emotional mood tracking, educational wellness resources, and online therapist scheduling.\n\n## Key Features\n- Anonymous peer discussion forums\n- Mood tracking & emotional journaling\n- Professional therapist consultation booking\n- Interactive mental health resource library`,
        githubUrl: 'https://github.com/dimassetio/healme-project',
        liveUrl: null,
        thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
        images: ['https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80'],
        techStack: ['Laravel 10', 'PHP', 'MySQL', 'Bootstrap', 'Tailwind CSS'],
        tags: ['Laravel 10', 'PHP', 'Healthcare', 'Award Winner'],
        isFeatured: false,
        isVisible: true,
        order: 11,
        createdAt: new Date('2024-07-31'),
        updatedAt: new Date('2024-07-31')
    },
    {
        id: 12,
        title: 'CarFy',
        slug: 'carfy',
        description: 'Vehicle rental portal with customer booking workflows, MySQL database triggers for vehicle returns, and Filament admin panel.',
        content: `## Overview\nCarFy is a web-based car rental platform featuring an interactive vehicle inventory catalog, NIK-based booking verification, and online rental contracts. The backend admin portal utilizes Filament PHP and automated MySQL triggers to handle return processing and fleet availability state management.\n\n## Key Features\n- Customer vehicle catalog with specification filters\n- Online booking form with ID document upload\n- MySQL database trigger for automated vehicle return tracking\n- Filament PHP v3 administrative dashboard\n- domPDF landscape report generation`,
        githubUrl: 'https://github.com/BagusHidayat21/carify-car-rental-laravel',
        liveUrl: 'https://rental-mobil-one.vercel.app',
        thumbnail: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80',
        images: ['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1200&auto=format&fit=crop&q=80'],
        techStack: ['Laravel 10', 'Filament PHP v3', 'MySQL', 'Bootstrap', 'Blade'],
        tags: ['Laravel 10', 'Filament PHP', 'MySQL Triggers', 'Car Rental'],
        isFeatured: false,
        isVisible: true,
        order: 12,
        createdAt: new Date('2026-07-23'),
        updatedAt: new Date('2026-07-23')
    },
    {
        id: 13,
        title: 'KostHub',
        slug: 'kosthub',
        description: 'Boarding house discovery and tenant management platform featuring spatial filters and room availability management.',
        content: `## Overview\nKostHub simplifies the boarding house search experience for students and workers by providing location filtering, amenity comparisons, and direct owner communication channels. Property managers gain access to room vacancy tracking and tenant billing updates.\n\n## Key Features\n- Location & price filtering for room searches\n- Room amenity comparison tables\n- Tenant rental application submission\n- Property manager room availability dashboard`,
        githubUrl: 'https://github.com/BagusHidayat21/kost-hub',
        liveUrl: null,
        thumbnail: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80',
        images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&auto=format&fit=crop&q=80'],
        techStack: ['Next.js', 'Supabase', 'TypeScript', 'Tailwind CSS'],
        tags: ['Next.js', 'Supabase', 'Property', 'TypeScript'],
        isFeatured: false,
        isVisible: true,
        order: 13,
        createdAt: new Date('2026-07-23'),
        updatedAt: new Date('2026-07-23')
    },
    {
        id: 14,
        title: 'UangKita',
        slug: 'uangkita',
        description: 'Personal finance management application for tracking daily expenses, establishing budgets, and financial reporting.',
        content: `## Overview\nUangKita helps users maintain personal financial discipline through expense categorization, monthly budget limits, and intuitive spending reports. The web application allows users to set savings goals and visualize income-to-expense ratios over custom date ranges.\n\n## Key Features\n- Daily income & expense tracking\n- Custom financial category tagging\n- Monthly budget threshold alerts\n- Financial summary breakdown charts`,
        githubUrl: 'https://github.com/BagusHidayat21/UangKita',
        liveUrl: null,
        thumbnail: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80',
        images: ['https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&auto=format&fit=crop&q=80'],
        techStack: ['Laravel', 'PHP', 'MySQL', 'Blade'],
        tags: ['Laravel', 'PHP', 'Finance', 'Management'],
        isFeatured: false,
        isVisible: true,
        order: 14,
        createdAt: new Date('2024-05-27'),
        updatedAt: new Date('2024-05-27')
    }
];

export const profileData: Profile = {
    name: 'Bagus Hidayat',
    tagline: 'Full Stack Web Developer',
    bio: 'I build web products end to end, from the database schema to the screen people actually use. Software engineer at PT Universal Big Data and graduate of Universitas Negeri Malang, now working where data engineering and machine learning meet everyday web apps.',
    avatarUrl: '/avatars/profile.png',
    resumeUrl: '/resume.pdf',
    email: 'bagus.hidayat.id@gmail.com',
    location: 'Malang, Indonesia',
    yearsCoding: new Date().getFullYear() - 2019,
    projectsCount: projectsData.length,
    isAvailableForWork: false,
    currentCompany: 'PT Universal Big Data',
    socials: [
        { platform: 'GitHub', url: 'https://github.com/BagusHidayat21', icon: 'Github' },
        { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/bagushidayat-id/', icon: 'Linkedin' },
        { platform: 'Instagram', url: 'https://www.instagram.com/hid.bgs/', icon: 'Instagram' },
    ]
};

export const aboutData: AboutContent = {
    heroTitle: 'Builder,',
    heroSubtitle: 'teacher.',
    heroDescription: 'Software engineer at PT Universal Big Data. I spend my weeks building web systems and teaching vocational students to write software the way industry teams do.',
    storyTitle: 'How I got here',
    storyContent: `I started writing software in the Software Engineering program at SMK Negeri 1 Jenangan, then earned a Bachelor's degree in Informatics Engineering Education (S.Pd) at Universitas Negeri Malang. Today I work full-time at PT Universal Big Data, building software and training vocational students in industrial-grade development.\n\nAlong the way I have shipped things for real users: HealMe, a mental health platform that won a Silver Medal at Wintex IID 2024; Cahaya Dunia, a library system for a village during community service; and CarFy, a car rental portal with an admin panel and database-driven return tracking. Each one taught me the same lesson. Working software is the baseline. Security, maintainability and a clear interface are what make it last.\n\nLately my focus has moved toward data engineering and machine learning, including an IEEE conference paper that benchmarks OCR models on handwritten text. The goal is web apps that do more than store what people type in. They should help people make sense of it.`,
    images: ['https://picsum.photos/seed/workspace/1200/800', 'https://picsum.photos/seed/setup/600/600'],
    tags: ['Data & Machine Learning', 'Full Stack Engineering', 'System Architecture'],
    philosophy: [
        {
            title: 'Get the details right',
            description: 'Clear structure, honest names, predictable behavior. I write code the next developer can read and change without fear.',
            icon: 'Database'
        },
        {
            title: 'Put data to work',
            description: 'I look for places where a pipeline or a model can replace guesswork, then wire it into the product so people actually use it.',
            icon: 'BrainCircuit'
        },
        {
            title: 'Teach what I use',
            description: 'I train vocational students on the same tools and practices I use at work, so the gap between classroom and industry gets smaller every term.',
            icon: 'Zap'
        },
        {
            title: 'Design for people',
            description: 'Fast pages, accessible markup and interfaces that explain themselves. Software only helps when it is easy to use.',
            icon: 'Target'
        },
        {
            title: 'Secure by default',
            description: 'Access control, input validation and careful releases. Security and reliability are part of the build, not a phase after it.',
            icon: 'Shield'
        }
    ]
};

export const experienceData: Experience[] = [
    {
        id: 1,
        title: 'Industrial Trainer & Software Engineer',
        company: 'PT Universal Big Data',
        year: 'Oct 2025 - PRESENT',
        description: 'A full-time role split between building software and teaching it. I deliver an industrial-grade web development curriculum to vocational high school (SMK) students, from modern frameworks to the practices real teams follow.',
        skills: ['Teaching', 'Mentoring', 'Curriculum Development', 'Full Stack Development'],
        category: 'Work',
        isVisible: true,
        order: 1
    },
    {
        id: 2,
        title: 'Software Developer & Trainer (Intern)',
        company: 'PT Universal Big Data',
        year: 'Jun - Oct 2025',
        description: 'Built internal software and assisted the training program. My first hands-on look at an enterprise development lifecycle and how a product team works day to day.',
        skills: ['Software Development', 'Training Assistance', 'Team Collaboration', 'Agile'],
        category: 'Work',
        isVisible: true,
        order: 2
    },
    {
        id: 4,
        title: 'Web Developer Intern',
        company: 'Dinas Kominfo Ponorogo',
        year: 'Dec 2020 - May 2021',
        description: 'Vocational high school internship. Built and maintained government websites on WordPress, managed digital content and kept the sites accessible to the public.',
        skills: ['WordPress', 'Web Maintenance', 'Content Management', 'Public Sector IT'],
        category: 'Work',
        isVisible: true,
        order: 3
    },
    {
        id: 6,
        title: 'Conference Paper (IEEE)',
        company: '2025 9th International Conference on Electrical, Electronics and Information Engineering (ICEEIE)',
        year: '2025',
        description: 'Co-authored "Comparison of Tesseract OCR, Easy OCR, and Transformer OCR on Handwritten Image" with Kartika Candra Kirana, Ira Kumalasari, and Gulpi Qorik Oktagalu. Benchmarked Tesseract, EasyOCR, and Transformer-based OCR (TrOCR, Donut) on crossed-out handwritten text using CER/WER metrics.',
        skills: ['Computer Vision', 'OCR', 'Python', 'Machine Learning'],
        category: 'Achievement',
        url: 'https://ieeexplore.ieee.org/document/11252079/',
        isVisible: true,
        order: 4
    },
    {
        id: 5,
        title: 'International Innovation Award',
        company: 'Wintex IID 2024',
        year: '2024',
        description: 'Silver Medal for HealMe, a mental health platform, at the World Invention and Technology Expo. Recognized for innovation in healthcare technology.',
        skills: ['Product Innovation', 'System Architecture', 'HealthTech', 'Public Speaking'],
        category: 'Achievement',
        isVisible: true,
        order: 5
    },
    {
        id: 7,
        title: 'Full Stack Developer (HealMe)',
        company: 'Wintex IID 2024',
        year: '2024',
        description: 'Core full stack developer on the small team behind HealMe, built for an international innovation competition. I designed the database and built the system on Laravel 10.',
        skills: ['Laravel 10', 'System Architecture', 'Full Stack Development', 'Database Design'],
        category: 'Project',
        isVisible: true,
        order: 6
    },
    {
        id: 8,
        title: 'Full Stack Developer (KKN)',
        company: 'Ngadimulyo Village Government',
        year: '2024',
        description: 'University community service program (KKN). Led the move of the village library to digital and built Cahaya Dunia, a complete library management system.',
        skills: ['Web Development', 'Digital Transformation', 'Community Service', 'System Administration'],
        category: 'Project',
        isVisible: true,
        order: 7
    },
    {
        id: 3,
        title: 'API Developer (J-TAG)',
        company: 'Independent Project (Alumnus of SMK Negeri 1 Jenangan)',
        year: '2023',
        description: 'Built the core REST API for J-TAG, an RFID attendance system made independently after graduating. Tuned real-time data flow between the hardware scanners and the database.',
        skills: ['REST API Design', 'IoT Integration', 'Real-time Processing', 'Backend Optimization'],
        category: 'Project',
        isVisible: true,
        order: 8
    }
];

export const educationData: Education[] = [
    {
        id: 1,
        institution: 'Universitas Negeri Malang',
        degree: 'Bachelor of Education (S1 / S.Pd)',
        field: 'Informatics Engineering Education',
        year: '2022 - 2026',
        description: 'Graduated with honors. Paired software engineering with teaching practice, the mix behind my work in vocational education and industrial mentoring.',
        isVisible: true,
        order: 1
    },
    {
        id: 2,
        institution: 'SMK Negeri 1 Jenangan Ponorogo',
        degree: 'High School Diploma',
        field: 'Software Engineering',
        year: '2019 - 2022',
        description: 'Programming, web development, databases and the software lifecycle. Where I wrote my first real applications.',
        isVisible: true,
        order: 2
    }
];

export const techStackData: TechStack[] = [
    { id: 1, name: 'TypeScript', category: 'Language', icon: null, isVisible: true, inMarquee: true, order: 1 },
    { id: 2, name: 'JavaScript', category: 'Language', icon: null, isVisible: true, inMarquee: true, order: 2 },
    { id: 3, name: 'Python', category: 'Language', icon: null, isVisible: true, inMarquee: false, order: 3 },
    { id: 4, name: 'PHP', category: 'Language', icon: null, isVisible: true, inMarquee: false, order: 4 },
    { id: 5, name: 'React', category: 'Frontend', icon: null, isVisible: true, inMarquee: true, order: 5 },
    { id: 6, name: 'Next.js', category: 'Frontend', icon: null, isVisible: true, inMarquee: true, order: 6 },
    { id: 7, name: 'Tailwind CSS', category: 'Frontend', icon: null, isVisible: true, inMarquee: true, order: 7 },
    { id: 8, name: 'Laravel', category: 'Backend', icon: null, isVisible: true, inMarquee: true, order: 8 },
    { id: 9, name: 'Node.js', category: 'Backend', icon: null, isVisible: true, inMarquee: true, order: 9 },
    { id: 10, name: 'PostgreSQL', category: 'Backend', icon: null, isVisible: true, inMarquee: true, order: 10 },
    { id: 11, name: 'MySQL', category: 'Backend', icon: null, isVisible: true, inMarquee: true, order: 11 },
    { id: 12, name: 'Prisma', category: 'Tool', icon: null, isVisible: true, inMarquee: true, order: 12 },
    { id: 13, name: 'Docker', category: 'Tool', icon: null, isVisible: true, inMarquee: true, order: 13 },
    { id: 14, name: 'Git', category: 'Tool', icon: null, isVisible: true, inMarquee: true, order: 14 },
];
