'use client';

// Premium Narrative About Page
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowDownRight, AppWindow, Briefcase, Globe, Heart, Zap, Database, BrainCircuit, Server } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

// Types
interface TimelineItem {
    year: string;
    title: string;
    company: string;
    description: string;
    skills: string[];
}

// Data from CV
const experience: TimelineItem[] = [
    {
        year: '2022 - PRESENT',
        title: 'Informatics Engineering Education',
        company: 'Universitas Negeri Malang',
        description: 'Bachelor of Science (S1). Combining technical expertise in software development, computer systems, and networking with pedagogical knowledge for vocational education. Active in academic projects aligned with industry standards.',
        skills: ['Software Engineering', 'Pedagogy', 'Network Systems', 'Educational Tech']
    },
    {
        year: '2024',
        title: 'Laravel Developer (HealMe)',
        company: 'Wintex IID 2024',
        description: 'Developed a mental health consultation platform using Laravel 10. Implemented secure user authentication, appointment scheduling, mood tracking, and anonymous support forums, focusing on accessibility and reducing stigma.',
        skills: ['Laravel 10', 'System Security', 'Full Stack Development', 'Healthcare Tech']
    },
    {
        year: '2024',
        title: 'Web Developer (Cahaya Dunia)',
        company: 'Ngadimulyo Village Govt',
        description: 'Developed a digital library management system including features for book cataloging, member management, and borrowing/returning processes. Designed an intuitive admin dashboard and conducted training sessions.',
        skills: ['Web Development', 'Library Management', 'Admin Dashboard', 'Training']
    },
    {
        year: '2023',
        title: 'API Developer (J-TAG)',
        company: 'SMK Negeri 1 Jenangan',
        description: 'Developed a RESTful API for an RFID-based attendance system (Jenangan Tap Attendance Gateway). Focused on real-time data processing and seamless integration with the existing school management system.',
        skills: ['RESTful API', 'Real-time Data', 'RFID Integration', 'Backend Engineering']
    },
    {
        year: '2019 - 2022',
        title: 'Software Engineering',
        company: 'SMK Negeri 1 Jenangan Ponorogo',
        description: 'High School Diploma. Focused on programming, web development, databases, and software lifecycle. Head of Youth Red Cross (2021), developing leadership and teamwork skills.',
        skills: ['Web Development', 'Databases', 'Leadership', 'Teamwork']
    }
];

const philosophy = [
    {
        title: 'Data Centric',
        description: 'I believe applications are more than just interfaces; they are engines for structured data. I design systems that value data integrity and clear logical flow.',
        icon: Database
    },
    {
        title: 'Intelligent Systems',
        description: 'Moving beyond static logic, I integrate Machine Learning pipelines to create adaptive applications that transform raw data into meaningful, actionable insights.',
        icon: BrainCircuit
    },
    {
        title: 'Robust Infrastructure',
        description: 'Reliability is key. I architect resilient backend APIs and databases that serve as the solid foundation for scalable, modern digital ecosystems.',
        icon: Server
    }
];

export default function AboutPage() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef });
    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

    return (
        <div ref={containerRef} className="min-h-screen bg-white text-zinc-900">
            {/* 1. Hero / Introduction */}
            <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6">
                <div className="container mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="max-w-4xl"
                    >
                        <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.9] mb-8">
                            ENGINEERING <br />
                            <span className="text-zinc-300">EXCELLENCE.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-zinc-500 font-light leading-relaxed max-w-2xl">
                            I am a student at <strong className="font-bold text-zinc-900">Universitas Negeri Malang</strong>, majoring in <strong className="font-bold text-zinc-900">Pendidikan Teknik Informatika</strong>. I bridge academic theory with real-world application to build robust digital solutions.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 2. The Photo Grid (Brutalist Style) */}
            <section className="py-12 border-y border-zinc-100 overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[600px] md:h-[500px]">
                        {/* Main Photo */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="md:col-span-8 h-full relative group overflow-hidden bg-zinc-100"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="https://picsum.photos/seed/workspace/1200/800"
                                alt="Workspace"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-105"
                            />
                            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-4 py-2 text-xs font-bold uppercase tracking-widest text-zinc-900">
                                My Workspace
                            </div>
                        </motion.div>

                        {/* Secondary Photos Stack */}
                        <div className="md:col-span-4 flex flex-col gap-6 h-full">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="flex-1 relative group overflow-hidden bg-zinc-100"
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="https://picsum.photos/seed/setup/600/600"
                                    alt="Setup"
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-105"
                                />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                className="flex-1 bg-zinc-900 p-8 flex flex-col justify-between text-white"
                            >
                                <Globe className="w-8 h-8" />
                                <div>
                                    <h3 className="text-3xl font-bold mb-1">Malang</h3>
                                    <p className="text-zinc-500 text-sm uppercase tracking-wider">Universitas Negeri Malang</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Narrative Bio */}
            <section className="py-24 md:py-32">
                <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 md:gap-32">
                    <div>
                        <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-6">The Story</h2>
                        <h3 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
                            Design and Building <span className="underline decoration-4 decoration-zinc-200 underline-offset-4">web application</span> powered by <span className="underline decoration-4 decoration-zinc-200 underline-offset-4">modern frontend</span> & <span className="underline decoration-4 decoration-zinc-200 underline-offset-4">reliable backend API&apos;s</span>.
                        </h3>
                    </div>
                    <div className="space-y-8 text-lg text-zinc-600 font-light leading-relaxed">
                        <p>
                            My journey began at <strong>SMK Negeri 1 Jenangan Ponorogo</strong>, where I majored in Software Engineering.
                            Early on, I developed a strong interest in building practical systems from school projects to real-world
                            applications that emphasize structured data handling and clear system logic.
                        </p>

                        <p>
                            Currently, I am an undergraduate student at <strong>Universitas Negeri Malang</strong>, focusing on developing
                            web and application-based systems such as <em>HealMe</em> (a mental health platform) and <em>Carfy</em>
                            (a car rental system). Through these projects, I became increasingly interested in how data can be processed,
                            analyzed, and transformed into meaningful insights.
                        </p>

                        <p>
                            Lately, my primary focus has shifted toward <strong>data engineering and machine learning</strong>,
                            particularly how data-driven models can be integrated into modern web and mobile applications.
                            I enjoy exploring how APIs, databases, and machine learning pipelines can work together to support
                            smarter and more adaptive digital systems.
                        </p>

                        <div className="pt-4 flex items-center gap-4">
                            <Badge
                                variant="outline"
                                className="px-4 py-2 text-zinc-900 border-zinc-200 bg-zinc-50 rounded-full"
                            >
                                Data & Machine Learning
                            </Badge>
                            <Badge
                                variant="outline"
                                className="px-4 py-2 text-zinc-900 border-zinc-200 bg-zinc-50 rounded-full"
                            >
                                Web & Application Development
                            </Badge>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Experience Timeline (Minimalist) */}
            <section className="py-24 bg-zinc-50 border-t border-zinc-200">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row gap-16">
                        <div className="md:w-1/3">
                            <h2 className="text-5xl font-bold mb-6">Journey</h2>
                            <p className="text-zinc-500 max-w-sm">
                                A timeline of my professional career and the key milestones that shaped my expertise.
                            </p>
                            <a href="#" className="inline-flex items-center gap-2 mt-8 text-zinc-900 font-bold hover:underline underline-offset-4">
                                Download Resume <ArrowDownRight className="w-4 h-4" />
                            </a>
                        </div>

                        <div className="md:w-2/3 space-y-0">
                            {experience.map((exp, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="relative pl-8 md:pl-0 border-l md:border-l-0 border-zinc-200 md:grid md:grid-cols-12 md:gap-8 pb-12 md:pb-16 last:pb-0"
                                >
                                    {/* Timeline Line (Desktop) */}
                                    <div className="hidden md:block absolute left-0 top-2 bottom-0 w-px bg-zinc-100 md:left-[25%]" />
                                    <div className="hidden md:block absolute left-0 top-2.5 w-2 h-2 rounded-full bg-zinc-300 outline outline-4 outline-white md:left-[25%] md:-translate-x-[50%]" />

                                    {/* Timeline Line (Mobile) - reusing existing relative positioning but adjusting dot */}
                                    <div className="md:hidden absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full bg-zinc-300 outline outline-4 outline-zinc-50" />

                                    {/* Year / Date */}
                                    <div className="md:col-span-3 mb-2 md:mb-0 md:text-right md:pr-8">
                                        <span className="inline-block py-1 px-2 rounded bg-zinc-100 text-xs font-bold tracking-wider text-zinc-500">
                                            {exp.year}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="md:col-span-9">
                                        <h3 className="text-xl font-bold text-zinc-900 mb-1">{exp.title}</h3>
                                        <p className="text-zinc-500 font-medium mb-4 flex items-center gap-2">
                                            <Briefcase className="w-4 h-4" />
                                            {exp.company}
                                        </p>
                                        <p className="text-zinc-600 leading-relaxed mb-6 text-base">
                                            {exp.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2">
                                            {exp.skills.map(skill => (
                                                <Badge key={skill} variant="secondary" className="bg-white border border-zinc-200 text-zinc-600 font-normal hover:bg-zinc-50">
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Philosophy Grid */}
            <section className="py-24 container mx-auto px-6">
                <div className="grid md:grid-cols-3 gap-8">
                    {philosophy.map((item, i) => (
                        <Card key={i} className="bg-white border-zinc-200 hover:border-zinc-900 transition-colors duration-300 group cursor-default">
                            <CardContent className="p-8">
                                <item.icon className="w-10 h-10 text-zinc-300 group-hover:text-zinc-900 transition-colors mb-6" />
                                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                <p className="text-zinc-500 leading-relaxed">
                                    {item.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
}
