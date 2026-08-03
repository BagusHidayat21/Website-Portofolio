
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
        description: 'Undergraduate thesis project implementing a personalized learning content recommendation engine using TF-IDF and Cosine Similarity.',
        content: `## Overview\nEduMatch is an academic research thesis project focused on enhancing personalized learning pathways. It leverages Content-Based Filtering algorithms, specifically TF-IDF vectorization and Cosine Similarity metric, to dynamically analyze student interaction patterns and recommend relevant instructional materials.\n\n## Key Features\n- Personalized content recommendation algorithms\n- TF-IDF feature extraction & Cosine Similarity ranking\n- Student learning progress dashboard\n- Teacher curriculum management\n- Academic performance analytics`,
        githubUrl: 'https://github.com/BagusHidayat21/Skripsi-Rekomendasi-Materi-Pembelajaran',
        liveUrl: null,
        thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
        images: ['https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80'],
        techStack: ['Next.js', 'Supabase', 'TypeScript', 'Tailwind CSS', 'Python', 'Machine Learning'],
        tags: ['Next.js', 'Supabase', 'Thesis', 'Machine Learning', 'Content-Based Filtering'],
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
        description: 'Digital library clearances and book borrowing management platform for academic institutions.',
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
        description: 'Enterprise internship management platform for vocational high schools with role-based dashboards and RLS security.',
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
        description: 'Automated operational reporting bot for scheduling, compiling, and dispatching administrative logs.',
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
        description: 'Freelance digital & academic service marketplace featuring dynamic pricing, HMAC negotiation codes, and order tracking.',
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
        description: 'Daily teaching activity logging application for educators to manage schedules, attendance, and curriculum progression.',
        content: `## Overview\nJurnal Mengajar empowers teachers to log daily classroom activities, track student attendance, and monitor syllabus coverage across academic terms. The system provides institutional administrators with real-time insight into instructional execution.\n\n## Key Features\n- Interactive teaching timetable management\n- Daily teaching entry & lesson progress logs\n- Classroom student attendance tracking\n- Period & term-based summary reports`,
        githubUrl: 'https://github.com/BagusHidayat21/jurnal-mengajar',
        liveUrl: null,
        thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80',
        images: ['https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&auto=format&fit=crop&q=80'],
        techStack: ['Next.js', 'Supabase', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
        tags: ['Next.js', 'Supabase', 'Education', 'Journal'],
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
        description: 'Web-based image processing utility for automated background and unwanted object removal using AI algorithms.',
        content: `## Overview\nMagic Remove provides an intuitive canvas interface for removing background elements and unwanted visual artifacts from uploaded photos. Utilizing machine learning image segmentation models, users can extract high-quality subjects within seconds.\n\n## Key Features\n- AI image background removal\n- Canvas-based mask selection tool\n- High-resolution PNG output export\n- Real-time client-side preview`,
        githubUrl: 'https://github.com/BagusHidayat21/magic-remove',
        liveUrl: null,
        thumbnail: 'https://images.unsplash.com/photo-1542744094-3a31b272c490?w=800&auto=format&fit=crop&q=80',
        images: ['https://images.unsplash.com/photo-1542744094-3a31b272c490?w=1200&auto=format&fit=crop&q=80'],
        techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Python', 'AI Model API'],
        tags: ['Next.js', 'AI', 'Image Processing', 'TypeScript'],
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
        description: 'Award-winning mental health consultation platform offering anonymous peer forums, mood logging, and specialist booking.',
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
    bio: 'Software Engineer & graduate of Universitas Negeri Malang with professional experience at PT Universal Big Data. I engineer robust digital solutions with a focus on data-driven intelligence and seamless user experiences.',
    avatarUrl: '/avatars/profile.png',
    resumeUrl: '/resume.pdf',
    email: 'bagus.hidayat.id@gmail.com',
    location: 'Malang, Indonesia',
    yearsCoding: new Date().getFullYear() - 2019,
    projectsCount: projectsData.length,
    isAvailableForWork: false,
    socials: [
        { platform: 'GitHub', url: 'https://github.com/BagusHidayat21', icon: 'Github' },
        { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/bagushidayat-id/', icon: 'Linkedin' },
        { platform: 'Instagram', url: 'https://www.instagram.com/hid.bgs/', icon: 'Instagram' },
    ]
};

export const aboutData: AboutContent = {
    heroTitle: 'BEYOND',
    heroSubtitle: 'CODE.',
    heroDescription: 'Software Engineer & graduate of Universitas Negeri Malang with professional experience at PT Universal Big Data. I engineer robust digital solutions with a focus on data-driven intelligence and seamless user experiences.',
    storyTitle: 'The Story',
    storyContent: `My journey is not just about writing code; it is about crafting solutions. It began with a strong foundation in Software Engineering at SMK Negeri 1 Jenangan and an academic milestone at Universitas Negeri Malang, where I graduated with a Bachelor's degree in Informatics Engineering Education (S.Pd). Currently, I have been working full-time at PT Universal Big Data.\n\nFrom architecting the "HealMe" mental health platform to optimizing logistics for "CarFy", I treat every project as an opportunity to push technical boundaries. My work emphasizes not just functionality, but scalability, security, and user-centric design.\n\nRecently, my focus has pivoted toward the intersection of Data Engineering and Machine Learning. I believe the next generation of applications will not just process input; they will understand it. I am currently exploring how to integrate intelligent data pipelines into modern web architectures to build smarter, more adaptive systems.`,
    images: ['https://picsum.photos/seed/workspace/1200/800', 'https://picsum.photos/seed/setup/600/600'],
    tags: ['Data & Machine Learning', 'Full Stack Engineering', 'System Architecture'],
    philosophy: [
        {
            title: 'Precision First',
            description: 'In code and design, every detail matters. I prioritize clean, scalable, and maintainable architecture that stands the test of time.',
            icon: 'Database'
        },
        {
            title: 'Adaptive Intelligence',
            description: 'Building systems that learn and evolve. Integrating ML & Data pipelines into modern web applications to create smarter digital solutions.',
            icon: 'BrainCircuit'
        },
        {
            title: 'Knowledge Transfer & Mentorship',
            description: 'Empowering future developers through industrial mentoring and vocational education, bridging academia with real-world software engineering practices.',
            icon: 'Zap'
        },
        {
            title: 'User-Centric Core',
            description: 'Technology serves human needs. I design intuitive, accessible, and high-performance interfaces that deliver seamless user experiences.',
            icon: 'Target'
        },
        {
            title: 'Engineering Integrity & Quality',
            description: 'From security standards to system resilience, I maintain uncompromising quality and industry best practices across the full software engineering lifecycle.',
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
        description: 'Working full-time developing software solutions and teaching industrial-grade software development to vocational high school (SMK) students, delivering curriculum on modern web technologies and industry best practices.',
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
        description: 'Developed internal software solutions and assisted in training programs. Gained hands-on experience in enterprise software development lifecycles and team collaboration.',
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
        description: 'Vocational High School Internship. Developed and maintained government websites using WordPress. Assisted in managing digital content and ensuring website accessibility.',
        skills: ['WordPress', 'Web Maintenance', 'Content Management', 'Public Sector IT'],
        category: 'Work',
        isVisible: true,
        order: 3
    },
    {
        id: 6,
        title: 'Conference Paper (Scopus)',
        company: 'State University of Malang',
        year: '2024',
        description: 'Co-authored "Comparison of Tesseract OCR, Easy OCR, and Transformer OCR on Handwritten Image". Research analyzing the performance of various OCR technologies on handwritten datasets.',
        skills: ['Computer Vision', 'OCR', 'Python', 'Machine Learning'],
        category: 'Achievement',
        isVisible: true,
        order: 4
    },
    {
        id: 5,
        title: 'International Innovation Award',
        company: 'Wintex IID 2024',
        year: '2024',
        description: 'Awarded Silver Medal for "HealMe" - a comprehensive mental health platform. Recognized for innovation in healthcare technology at the World Invention and Technology Expo.',
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
        description: 'Sole developer for a comprehensive mental health platform. Architected the entire system using Laravel 10 for the international innovation competition.',
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
        description: 'Community Service Program (KKN). Led the digital transformation of the village library. Developed "Cahaya Dunia", a complete library management system as part of university community service.',
        skills: ['Web Development', 'Digital Transformation', 'Community Service', 'System Administration'],
        category: 'Project',
        isVisible: true,
        order: 7
    },
    {
        id: 3,
        title: 'API Developer (J-TAG)',
        company: 'SMK Negeri 1 Jenangan',
        year: '2023',
        description: 'Engineered the core REST API for J-TAG, an enterprise-grade RFID attendance system. Optimized real-time data handling between hardware scanners and the database.',
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
        description: 'Graduated with honors. Combined technical software engineering expertise with pedagogical skills for vocational software education and industrial mentoring.',
        isVisible: true,
        order: 1
    },
    {
        id: 2,
        institution: 'SMK Negeri 1 Jenangan Ponorogo',
        degree: 'High School Diploma',
        field: 'Software Engineering',
        year: '2019 - 2022',
        description: 'Focused on programming, web development, databases, and software lifecycle. Developed strong foundation in practical software engineering.',
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
