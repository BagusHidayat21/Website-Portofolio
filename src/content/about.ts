import type { AboutContent } from './types';

export const about = {
    heroTitle: 'Builder,',
    heroSubtitle: 'teacher.',
    heroDescription: 'Software engineer at PT Universal Big Data. I spend my weeks building web systems and teaching vocational students to write software the way industry teams do.',
    storyTitle: 'How I got here',
    storyContent: `I started writing software in the Software Engineering program at SMK Negeri 1 Jenangan, then earned a Bachelor's degree in Informatics Engineering Education (S.Pd) at Universitas Negeri Malang. Today I work full-time at PT Universal Big Data, building software and training vocational students in industrial-grade development.\n\nAlong the way I have shipped things for real users: HealMe, a mental health platform that won a Silver Medal at Wintex IID 2024; Cahaya Dunia, a library system for a village during community service; and CarFy, a car rental portal with an admin panel and database-driven return tracking. Each one taught me the same lesson. Working software is the baseline. Security, maintainability and a clear interface are what make it last.\n\nLately my focus has moved toward data engineering and machine learning, including an IEEE conference paper that benchmarks OCR models on handwritten text. The goal is web apps that do more than store what people type in. They should help people make sense of it.`,
    tags: ['Data & Machine Learning', 'Full Stack Engineering', 'System Architecture'],
    philosophy: [
        {
            title: 'Get the details right',
            description: 'Clear structure, honest names, predictable behavior. I write code the next developer can read and change without fear.',
            icon: 'Target',
            proof: [
                { label: 'CV Builder: A4 page-break guides and ATS-safe layouts', href: '/projects/cv-builder' },
                { label: 'SIMMAS: audit logs and activity tracking', href: '/projects/simmas' },
            ]
        },
        {
            title: 'Put data to work',
            description: 'I look for places where a pipeline or a model can replace guesswork, then wire it into the product so people actually use it.',
            icon: 'Database',
            proof: [
                { label: 'IEEE paper: OCR models benchmarked with CER and WER', href: 'https://ieeexplore.ieee.org/document/11252079/' },
                { label: 'EduMatch: learning content recommendations', href: '/projects/edumatch' },
            ]
        },
        {
            title: 'Teach what I use',
            description: 'I train vocational students on the same tools and practices I use at work, so the gap between classroom and industry gets smaller every term.',
            icon: 'GraduationCap',
            proof: [
                { label: 'Industrial trainer at PT Universal Big Data' },
                { label: 'S.Pd, Informatics Engineering Education, Universitas Negeri Malang' },
            ]
        },
        {
            title: 'Design for people',
            description: 'Fast pages, accessible markup and interfaces that explain themselves. Software only helps when it is easy to use.',
            icon: 'HeartHandshake',
            proof: [
                { label: 'HealMe: anonymous forums and mood logging', href: '/projects/healme' },
                { label: 'Jurnal Mengajar: a mobile log built for teachers', href: '/projects/jurnal-mengajar' },
            ]
        },
        {
            title: 'Secure by default',
            description: 'Access control, input validation and careful releases. Security and reliability are part of the build, not a phase after it.',
            icon: 'Shield',
            proof: [
                { label: 'SIMMAS: Supabase RLS with role-based access', href: '/projects/simmas' },
                { label: 'JasaOne.id: HMAC-signed price negotiation codes', href: '/projects/jasaone-id' },
            ]
        }
    ]
} satisfies AboutContent;
