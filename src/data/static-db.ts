// --- Interfaces ---

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

// --- Data ---

export const profileData: Profile = {
    name: 'Bagus Hidayat',
    tagline: 'Full Stack Web Developer',
    bio: 'Bridging the gap between academic theory and real-world application. I engineer robust digital solutions with a focus on data-driven intelligence and seamless user experiences.',
    avatarUrl: 'https://github.com/BagusHidayat21.png',
    resumeUrl: '#',
    email: 'bagus.hidayat.id@gmail.com', // Placeholder
    location: 'Malang, Indonesia',
    yearsCoding: 4,
    projectsCount: 15,
    isAvailableForWork: true,
    socials: [
        { platform: 'GitHub', url: 'https://github.com/BagusHidayat21', icon: 'Github' },
        { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/bagushidayat-id/', icon: 'Linkedin' },
        { platform: 'Instagram', url: 'https://www.instagram.com/hid.bgs/', icon: 'Instagram' },
    ]
};

export const aboutData: AboutContent = {
    heroTitle: 'BEYOND',
    heroSubtitle: 'CODE.',
    heroDescription: 'Bridging the gap between academic theory and real-world application. I engineer robust digital solutions with a focus on data-driven intelligence and seamless user experiences.',
    storyTitle: 'The Story',
    storyContent: `My journey isn't just about writing code—it's about crafting solutions. It began with a strong foundation in Software Engineering at SMK Negeri 1 Jenangan and has evolved into advanced academic pursuits at Universitas Negeri Malang. I've always been driven by the "why" behind the technology.\n\nFrom architecting the "HealMe" mental health platform to optimizing logistics for "Website Mobil", I treat every project as an opportunity to push technical boundaries. My work emphasizes not just functionality, but scalability, security, and user-centric design.\n\nRecently, my focus has pivoted toward the intersection of Data Engineering and Machine Learning. I believe the next generation of applications won't just process input; they will understand it. I'm currently exploring how to integrate intelligent data pipelines into modern web architectures to build smarter, more adaptive systems.`,
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
            icon: 'Star' // Changed from 'Start' to 'Star' as 'Start' is likely a typo or custom
        }
    ]
};

export const experienceData: Experience[] = [
    {
        id: 1,
        title: 'Industrial Trainer',
        company: 'PT Universal Big Data',
        year: '2025 - PRESENT',
        description: 'Teaching industrial-grade software development to vocational high school (SMK) students. Delivering curriculum on modern web technologies and industry best practices.',
        skills: ['Teaching', 'Mentoring', 'Curriculum Development', 'Full Stack Development'],
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
        isVisible: true,
        order: 2
    },
    {
        id: 3,
        title: 'International Innovation Award',
        company: 'Wintex IID 2024',
        year: '2024',
        description: 'Awarded Silver Medal for "HealMe" - a comprehensive mental health platform. Recognized for innovation in healthcare technology at the World Invention and Technology Expo.',
        skills: ['Product Innovation', 'System Architecture', 'HealthTech', 'Public Speaking'],
        isVisible: true,
        order: 3
    },
    {
        id: 4,
        title: 'Conference Paper (Scopus)',
        company: 'State University of Malang',
        year: '2024',
        description: 'Co-authored "Comparison of Tesseract OCR, Easy OCR, and Transformer OCR on Handwritten Image". Research analyzing the performance of various OCR technologies on handwritten datasets.',
        skills: ['Computer Vision', 'OCR', 'Python', 'Machine Learning'],
        isVisible: true,
        order: 4
    },
    {
        id: 5,
        title: 'Full Stack Developer (HealMe)',
        company: 'Wintex IID 2024',
        year: '2024',
        description: 'Sole developer for a comprehensive mental health platform. Architected the entire system using Laravel 10 for the international innovation competition.',
        skills: ['Laravel 10', 'System Architecture', 'Full Stack Development', 'Database Design'],
        isVisible: true,
        order: 5
    },
    {
        id: 6,
        title: 'Full Stack Developer (KKN)',
        company: 'Ngadimulyo Village Government',
        year: '2024',
        description: 'Community Service Program (KKN). Led the digital transformation of the village library. Developed "Cahaya Dunia", a complete library management system as part of university community service.',
        skills: ['Web Development', 'Digital Transformation', 'Community Service', 'System Administration'],
        isVisible: true,
        order: 6
    },
    {
        id: 7,
        title: 'API Developer (J-TAG)',
        company: 'SMK Negeri 1 Jenangan',
        year: '2023',
        description: 'Engineered the core REST API for J-TAG, an enterprise-grade RFID attendance system. Optimized real-time data handling between hardware scanners and the database.',
        skills: ['REST API Design', 'IoT Integration', 'Real-time Processing', 'Backend Optimization'],
        isVisible: true,
        order: 7
    },
    {
        id: 8,
        title: 'Web Developer Intern',
        company: 'Dinas Kominfo Ponorogo',
        year: '2021',
        description: 'Vocational High School Internship. Developed and maintained government websites using WordPress. Assisted in managing digital content and ensuring website accessibility.',
        skills: ['WordPress', 'Web Maintenance', 'Content Management', 'Public Sector IT'],
        isVisible: true,
        order: 8
    },
    {
        id: 9,
        title: 'Informatics Engineering Education',
        company: 'Universitas Negeri Malang',
        year: '2022 - PRESENT',
        description: 'Bachelor of Science (S1). Maintaining a 3.86 GPA. Active in research groups focusing on Educational Technology and Artificial Intelligence.',
        skills: ['Software Engineering', 'Data Science', 'Pedagogy', 'Algorithm Design'],
        isVisible: true,
        order: 9
    },
    {
        id: 10,
        title: 'Software Engineering',
        company: 'SMK Negeri 1 Jenangan Ponorogo',
        year: '2019 - 2022',
        description: 'Vocational High School. Graduated with honors. Specialized in backend development, database management, and network infrastructure.',
        skills: ['PHP Native', 'CodeIgniter', 'MySQL', 'Networking'],
        isVisible: true,
        order: 10
    }
];

export const educationData: Education[] = [
    {
        id: 1,
        institution: 'Universitas Negeri Malang',
        degree: 'Bachelor of Science (S1)',
        field: 'Informatics Engineering Education',
        year: '2022 - Present',
        description: 'Combining technical expertise in software development, computer systems, and networking with pedagogical knowledge for vocational education.',
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

export const projectsData: Project[] = [
    {
        id: 1,
        title: 'Perpustakaan Desa Ngadimulyo',
        slug: 'perpustakaan-desa-ngadimulyo',
        description: 'Village library digitalization project for Desa Ngadimulyo, providing digital access to book catalog and member services.',
        content: `## Overview\nDigital transformation project for village library.\n\n## Features\n- Digital book catalog\n- Member registration\n- Borrowing management\n- Village community access\n- Simple admin interface`,
        tags: ['HTML', 'PHP', 'Community', 'Library'],
        githubUrl: 'https://github.com/BagusHidayat21/Perpustaakan-Desa-Ngadimulyo',
        liveUrl: null,
        thumbnail: 'https://loremflickr.com/800/600/library?lock=1',
        images: ['https://loremflickr.com/800/600/reading?lock=11', 'https://loremflickr.com/800/600/books?lock=12'],
        techStack: [],
        isFeatured: true,
        isVisible: true,
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 2,
        title: 'HealMe',
        slug: 'healme',
        description: 'A mental health consultation platform providing anonymous support, mood tracking, and professional consultation scheduling.',
        content: `## Overview\nMental health platform built to support users in their wellness journey.\n\n## Features\n- Anonymous support forums\n- Mood tracking and journaling\n- Professional consultation booking\n- Resource library\n- Community support`,
        tags: ['Laravel', 'Healthcare', 'Mental Health', 'Consultation'],
        githubUrl: 'https://github.com/BagusHidayat21/HealMe',
        liveUrl: null,
        thumbnail: 'https://loremflickr.com/800/600/health?lock=2',
        images: ['https://loremflickr.com/800/600/wellness?lock=21', 'https://loremflickr.com/800/600/doctor?lock=22'],
        techStack: [],
        isFeatured: true,
        isVisible: true,
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 3,
        title: 'Website Mobil Laravel',
        slug: 'website-mobil-laravel',
        description: 'A car rental web application built with Laravel 10, featuring vehicle catalog, booking system, and admin management dashboard.',
        content: `## Overview\nComplete car rental platform with booking and management features.\n\n## Features\n- Vehicle catalog with filters\n- Online booking system\n- Payment integration\n- Admin dashboard\n- Customer management`,
        tags: ['Laravel 10', 'CSS', 'Car Rental', 'E-commerce'],
        githubUrl: 'https://github.com/BagusHidayat21/Website-Mobil-Laravel-10',
        liveUrl: 'https://rental-mobil-one.vercel.app',
        thumbnail: 'https://loremflickr.com/800/600/car?lock=3',
        images: ['https://loremflickr.com/800/600/transport?lock=31', 'https://loremflickr.com/800/600/driving?lock=32'],
        techStack: [],
        isFeatured: true,
        isVisible: true,
        order: 3,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 4,
        title: 'RFID Attendance System',
        slug: 'rfid-absen',
        description: 'A modern RFID-based attendance system built with Next.js and TypeScript. Features real-time attendance tracking, dashboard analytics, and seamless hardware integration.',
        content: `## Overview\nThis project implements a complete RFID-based attendance system with a modern web interface.\n\n## Features\n- Real-time RFID card scanning\n- Dashboard with attendance analytics\n- Employee/student management\n- Export reports to Excel/PDF\n- Multi-location support\n\n## Tech Stack\n- Next.js 14 with App Router\n- TypeScript for type safety\n- Prisma ORM with PostgreSQL\n- Tailwind CSS for styling\n- Real-time updates via WebSocket`,
        tags: ['Next.js', 'TypeScript', 'Prisma', 'RFID', 'IoT'],
        githubUrl: 'https://github.com/BagusHidayat21/RFID-Absen',
        liveUrl: 'https://rfid-absen.vercel.app',
        thumbnail: 'https://loremflickr.com/800/600/technology?lock=4',
        images: ['https://loremflickr.com/800/600/electronics?lock=41', 'https://loremflickr.com/800/600/chip?lock=42'],
        techStack: [],
        isFeatured: false,
        isVisible: true,
        order: 4,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 5,
        title: 'RFID Attendance UBIG',
        slug: 'rfid-absen-ubig',
        description: 'Enhanced RFID attendance system designed for UBIG organization with advanced features including shift management and multi-department support.',
        content: `## Overview\nAn enhanced version of the RFID attendance system specifically designed for UBIG organization.\n\n## Key Features\n- Multi-department attendance tracking\n- Shift management system\n- Advanced reporting and analytics\n- Admin dashboard with role-based access\n- API integration for external systems`,
        tags: ['Next.js', 'TypeScript', 'Prisma', 'RFID', 'Enterprise'],
        githubUrl: 'https://github.com/BagusHidayat21/RFID-Absen-UBIG',
        liveUrl: 'https://rfid-absen-ubig.vercel.app',
        thumbnail: 'https://loremflickr.com/800/600/office?lock=5',
        images: ['https://loremflickr.com/800/600/meeting?lock=51', 'https://loremflickr.com/800/600/work?lock=52'],
        techStack: [],
        isFeatured: false,
        isVisible: true,
        order: 5,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 6,
        title: 'Web Framework KPTK',
        slug: 'web-framework-kptk',
        description: 'A comprehensive web framework project for KPTK course, demonstrating modern web development practices with Next.js and TypeScript.',
        content: `## Overview\nA complete web application showcasing modern web development techniques.\n\n## Features\n- Server-side rendering with Next.js\n- Type-safe development with TypeScript\n- Responsive design with Tailwind CSS\n- Database integration with Prisma`,
        tags: ['Next.js', 'TypeScript', 'Web Framework', 'Education'],
        githubUrl: 'https://github.com/BagusHidayat21/Web-Framework-KPTK',
        liveUrl: 'https://web-framework-kptk.vercel.app',
        thumbnail: 'https://loremflickr.com/800/600/code?lock=6',
        images: ['https://loremflickr.com/800/600/laptop?lock=61', 'https://loremflickr.com/800/600/programming?lock=62'],
        techStack: [],
        isFeatured: false,
        isVisible: true,
        order: 6,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 7,
        title: 'Media Pembelajaran',
        slug: 'media-pembelajaran',
        description: 'An interactive learning media platform built with PHP for educational purposes, featuring multimedia content management and student progress tracking.',
        content: `## Overview\nA learning management system designed for educational institutions.\n\n## Features\n- Multimedia content management\n- Student progress tracking\n- Quiz and assessment modules\n- Teacher dashboard\n- Course management`,
        tags: ['PHP', 'Laravel', 'Education', 'LMS'],
        githubUrl: 'https://github.com/BagusHidayat21/Media-Pembelajaran',
        liveUrl: null,
        thumbnail: 'https://loremflickr.com/800/600/education?lock=7',
        images: ['https://loremflickr.com/800/600/classroom?lock=71', 'https://loremflickr.com/800/600/student?lock=72'],
        techStack: [],
        isFeatured: false,
        isVisible: true,
        order: 7,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 8,
        title: 'Perpustakaan NextJS',
        slug: 'perpustakaan-nextjs',
        description: 'A modern library management system built with Next.js, featuring book cataloging, member management, and borrowing system.',
        content: `## Overview\nDigital library management system for modern institutions.\n\n## Features\n- Book catalog with search\n- Member registration and management\n- Borrowing and returning system\n- Overdue notifications\n- Reports and analytics`,
        tags: ['Next.js', 'TypeScript', 'Library', 'Management'],
        githubUrl: 'https://github.com/BagusHidayat21/Perpustakaan-NextJS',
        liveUrl: null,
        thumbnail: 'https://loremflickr.com/800/600/books?lock=8',
        images: ['https://loremflickr.com/800/600/library?lock=81', 'https://loremflickr.com/800/600/reading?lock=82'],
        techStack: [],
        isFeatured: false,
        isVisible: true,
        order: 8,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 9,
        title: 'UangKita',
        slug: 'uangkita',
        description: 'A personal finance management application built with Laravel, helping users track expenses, set budgets, and achieve financial goals.',
        content: `## Overview\nPersonal finance tracker to help manage daily expenses.\n\n## Features\n- Expense tracking\n- Budget management\n- Financial reports\n- Goal setting\n- Transaction categories`,
        tags: ['Laravel', 'Blade', 'Finance', 'Management'],
        githubUrl: 'https://github.com/BagusHidayat21/UangKita',
        liveUrl: null,
        thumbnail: 'https://loremflickr.com/800/600/finance?lock=9',
        images: ['https://loremflickr.com/800/600/money?lock=91', 'https://loremflickr.com/800/600/calculator?lock=92'],
        techStack: [],
        isFeatured: false,
        isVisible: true,
        order: 9,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 10,
        title: 'Latihan API',
        slug: 'latihan-api',
        description: 'API development practice project demonstrating RESTful API design patterns, authentication, and database integration.',
        content: `## Overview\nPractice project for learning RESTful API development.\n\n## Topics Covered\n- RESTful API design\n- Authentication with JWT\n- Database operations\n- Error handling\n- API documentation`,
        tags: ['TypeScript', 'API', 'REST', 'Learning'],
        githubUrl: 'https://github.com/BagusHidayat21/Latihan-Api',
        liveUrl: null,
        thumbnail: 'https://loremflickr.com/800/600/server?lock=10',
        images: ['https://loremflickr.com/800/600/network?lock=101', 'https://loremflickr.com/800/600/internet?lock=102'],
        techStack: [],
        isFeatured: false,
        isVisible: true,
        order: 10,
        createdAt: new Date(),
        updatedAt: new Date()
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
