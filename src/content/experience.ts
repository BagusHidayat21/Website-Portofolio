import type { Experience } from './types';

export const experience = [
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
] satisfies Experience[];
