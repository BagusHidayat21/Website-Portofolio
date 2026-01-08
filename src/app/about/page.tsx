'use client';

// Enhanced About page with photo gallery, timeline, tech stack, and animations
import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import {
    MapPin, Calendar, Code2, Heart, Server, Wrench,
    ChevronLeft, ChevronRight, Quote, ExternalLink,
    Briefcase, GraduationCap, Star, Zap, Coffee, BookOpen
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Profile {
    id: number;
    name: string;
    tagline: string;
    about: string;
    avatarUrl?: string;
    resumeUrl?: string;
}

// Photo carousel with enhanced animations
function PhotoGallery() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const photos = [
        { url: 'https://picsum.photos/seed/dev1/600/450', caption: 'Working on exciting projects' },
        { url: 'https://picsum.photos/seed/dev2/600/450', caption: 'Team collaboration' },
        { url: 'https://picsum.photos/seed/dev3/600/450', caption: 'Conference speaker' },
        { url: 'https://picsum.photos/seed/dev4/600/450', caption: 'Creative workspace' },
    ];

    const nextPhoto = () => {
        setCurrentIndex((prev) => (prev + 1) % photos.length);
        setProgress(0);
    };
    const prevPhoto = () => {
        setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
        setProgress(0);
    };

    useEffect(() => {
        const progressTimer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    nextPhoto();
                    return 0;
                }
                return prev + 2;
            });
        }, 100);
        return () => clearInterval(progressTimer);
    }, [currentIndex]);

    return (
        <motion.div
            className="relative group"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
        >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-900 relative shadow-2xl shadow-purple-500/10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, scale: 1.1, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95, x: -20 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={photos[currentIndex].url}
                            alt={photos[currentIndex].caption}
                            className="w-full h-full object-cover"
                        />
                        <motion.div
                            className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <p className="text-white font-medium">{photos[currentIndex].caption}</p>
                            <p className="text-zinc-400 text-sm mt-1">Photo {currentIndex + 1} of {photos.length}</p>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation buttons with hover effects */}
                <motion.button
                    onClick={prevPhoto}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white backdrop-blur-sm z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(139,92,246,0.5)' }}
                    whileTap={{ scale: 0.9 }}
                >
                    <ChevronLeft className="h-5 w-5" />
                </motion.button>
                <motion.button
                    onClick={nextPhoto}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white backdrop-blur-sm z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(139,92,246,0.5)' }}
                    whileTap={{ scale: 0.9 }}
                >
                    <ChevronRight className="h-5 w-5" />
                </motion.button>

                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30 z-20">
                    <motion.div
                        className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Dots */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {photos.map((_, i) => (
                        <motion.button
                            key={i}
                            onClick={() => { setCurrentIndex(i); setProgress(0); }}
                            className={`w-2 h-2 rounded-full transition-all ${i === currentIndex ? 'bg-white w-6' : 'bg-white/30 hover:bg-white/60'}`}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.8 }}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

// Personal info cards
function PersonalInfoCards() {
    const info = [
        { icon: MapPin, label: 'Location', value: 'Indonesia' },
        { icon: Calendar, label: 'Experience', value: '3+ Years' },
        { icon: Code2, label: 'Projects', value: '50+' },
        { icon: Coffee, label: 'Daily Coffee', value: '3 Cups' },
    ];

    return (
        <div className="grid grid-cols-2 gap-4">
            {info.map((item, i) => (
                <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    whileHover={{ y: -3 }}
                >
                    <Card className="bg-zinc-900/30 border-zinc-800">
                        <CardContent className="p-4 flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-zinc-800/50">
                                <item.icon className="h-4 w-4 text-zinc-400" />
                            </div>
                            <div>
                                <p className="text-xs text-zinc-500">{item.label}</p>
                                <p className="font-medium">{item.value}</p>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
}

// Values section
function ValuesSection() {
    const values = [
        { icon: Zap, title: 'Fast & Efficient', desc: 'Building performant applications that users love' },
        { icon: Heart, title: 'User-Centric', desc: 'Focusing on creating the best user experience' },
        { icon: Star, title: 'Quality Code', desc: 'Writing clean, maintainable, and scalable code' },
        { icon: BookOpen, title: 'Always Learning', desc: 'Constantly exploring new technologies and methods' },
    ];

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Heart className="h-6 w-6 text-red-500" />
                What I Value
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
                {values.map((value, i) => (
                    <motion.div
                        key={value.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        whileHover={{ y: -3 }}
                    >
                        <Card className="bg-zinc-900/30 border-zinc-800 hover:border-zinc-700 transition-colors h-full">
                            <CardContent className="p-5">
                                <div className="p-2 rounded-lg bg-zinc-800/50 w-fit mb-3">
                                    <value.icon className="h-5 w-5 text-zinc-300" />
                                </div>
                                <h3 className="font-semibold mb-1">{value.title}</h3>
                                <p className="text-sm text-zinc-500">{value.desc}</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

// Experience timeline
function ExperienceTimeline() {
    const experiences = [
        {
            type: 'work',
            title: 'Senior Frontend Developer',
            company: 'Tech Company',
            period: '2022 - Present',
            description: 'Leading frontend development for enterprise applications using React and Next.js.',
            skills: ['React', 'Next.js', 'TypeScript'],
        },
        {
            type: 'work',
            title: 'Full-Stack Developer',
            company: 'Startup Inc',
            period: '2020 - 2022',
            description: 'Built and maintained multiple web applications and APIs.',
            skills: ['Node.js', 'PostgreSQL', 'React'],
        },
        {
            type: 'education',
            title: 'Computer Science Degree',
            company: 'University',
            period: '2016 - 2020',
            description: 'Bachelor\'s degree in Computer Science with focus on software engineering.',
            skills: ['Algorithms', 'Data Structures', 'Web Development'],
        },
    ];

    return (
        <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-zinc-700 via-zinc-800 to-transparent" />

            <div className="space-y-8">
                {experiences.map((exp, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + i * 0.2 }}
                        className="relative pl-20"
                    >
                        <motion.div
                            className="absolute left-4 top-0 p-2 rounded-full bg-zinc-900 border border-zinc-700"
                            whileHover={{ scale: 1.1 }}
                        >
                            {exp.type === 'work' ? (
                                <Briefcase className="h-4 w-4 text-zinc-400" />
                            ) : (
                                <GraduationCap className="h-4 w-4 text-zinc-400" />
                            )}
                        </motion.div>

                        <Card className="bg-zinc-900/30 border-zinc-800 hover:border-zinc-700 transition-colors">
                            <CardContent className="p-6">
                                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                                    <h3 className="font-semibold text-lg">{exp.title}</h3>
                                    <Badge variant="outline" className="bg-zinc-800/50 border-zinc-700">
                                        {exp.period}
                                    </Badge>
                                </div>
                                <p className="text-zinc-400 text-sm mb-3">{exp.company}</p>
                                <p className="text-zinc-500 text-sm mb-4">{exp.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {exp.skills.map((skill) => (
                                        <Badge key={skill} variant="secondary" className="bg-zinc-800 text-zinc-300 text-xs">
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

// Tech Stack section
function TechStackSection() {
    const techCategories = [
        {
            name: 'Frontend',
            icon: Code2,
            skills: [
                { name: 'React / Next.js', level: 95, color: '#61DAFB' },
                { name: 'TypeScript', level: 90, color: '#3178C6' },
                { name: 'Tailwind CSS', level: 95, color: '#06B6D4' },
                { name: 'Framer Motion', level: 85, color: '#FF0080' },
            ],
        },
        {
            name: 'Backend',
            icon: Server,
            skills: [
                { name: 'Node.js', level: 88, color: '#339933' },
                { name: 'PostgreSQL', level: 82, color: '#4169E1' },
                { name: 'Prisma', level: 85, color: '#2D3748' },
                { name: 'REST APIs', level: 90, color: '#FF6B6B' },
            ],
        },
        {
            name: 'Tools & Others',
            icon: Wrench,
            skills: [
                { name: 'Git / GitHub', level: 92, color: '#F05032' },
                { name: 'Docker', level: 75, color: '#2496ED' },
                { name: 'Linux', level: 80, color: '#FCC624' },
                { name: 'Figma', level: 78, color: '#F24E1E' },
            ],
        },
    ];

    return (
        <div>
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                <Code2 className="h-6 w-6" />
                Tech Stack
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
                {techCategories.map((category, categoryIndex) => (
                    <motion.div
                        key={category.name}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + categoryIndex * 0.1 }}
                    >
                        <Card className="bg-zinc-900/30 border-zinc-800 h-full">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 rounded-lg bg-zinc-800/50">
                                        <category.icon className="h-5 w-5 text-zinc-300" />
                                    </div>
                                    <h3 className="text-lg font-semibold">{category.name}</h3>
                                </div>

                                {category.skills.map((skill) => (
                                    <div key={skill.name} className="mb-4">
                                        <div className="flex justify-between mb-2">
                                            <span className="text-sm text-zinc-300">{skill.name}</span>
                                            <span className="text-sm text-zinc-500">{skill.level}%</span>
                                        </div>
                                        <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full rounded-full"
                                                style={{ backgroundColor: skill.color }}
                                                initial={{ width: 0 }}
                                                animate={{ width: `${skill.level}%` }}
                                                transition={{ duration: 1, delay: 1 + categoryIndex * 0.1 }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default function AboutPage() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/profile')
            .then((res) => res.json())
            .then((data) => {
                if (!data.error) setProfile(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const defaultProfile: Profile = {
        id: 1,
        name: 'Bagus Hidayat',
        tagline: 'Full-Stack Developer',
        avatarUrl: 'https://picsum.photos/seed/profile/200/200',
        about: `I'm a passionate full-stack developer with a strong focus on creating beautiful, performant, and user-friendly web experiences. With over 3 years of experience in the industry, I've had the opportunity to work on diverse projects ranging from startup MVPs to enterprise applications.

My journey in tech started with a curiosity about how websites work, which led me to pursue a career in software development. Today, I specialize in React, Next.js, Node.js, and TypeScript, and I'm constantly learning and exploring new technologies to stay ahead of the curve.

When I'm not coding, you can find me contributing to open-source projects, writing technical blog posts, exploring new technologies, or enjoying a good cup of coffee while brainstorming my next project.

I believe in writing clean, maintainable code and creating user experiences that make a real difference. I'm always open to new opportunities and collaborations—let's build something amazing together!`,
    };

    const displayProfile = profile || defaultProfile;

    if (loading) {
        return (
            <div className="min-h-screen pt-24 pb-16">
                <div className="container mx-auto px-6">
                    <div className="max-w-5xl mx-auto animate-pulse space-y-8">
                        <div className="h-64 bg-zinc-800/50 rounded-2xl" />
                        <div className="h-8 bg-zinc-800/50 rounded w-1/3" />
                        <div className="h-32 bg-zinc-800/50 rounded" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="container mx-auto px-6">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <Badge className="mb-4 bg-zinc-800/50 text-zinc-300 border-zinc-700">
                            About Me
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            The Story Behind the{' '}
                            <span className="bg-gradient-to-r from-zinc-300 to-zinc-500 bg-clip-text text-transparent">
                                Code
                            </span>
                        </h1>
                        <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                            Get to know the person behind the projects
                        </p>
                    </motion.div>

                    {/* Main Grid */}
                    <div className="grid lg:grid-cols-5 gap-8 mb-16">
                        {/* Left Column - Photo & Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="lg:col-span-2 space-y-6"
                        >
                            <PhotoGallery />
                            <PersonalInfoCards />
                        </motion.div>

                        {/* Right Column - Bio */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="lg:col-span-3"
                        >
                            {/* Avatar & Name */}
                            <div className="flex items-center gap-4 mb-6">
                                <Avatar className="h-16 w-16 border-2 border-zinc-800">
                                    <AvatarImage src={displayProfile.avatarUrl} alt={displayProfile.name} />
                                    <AvatarFallback className="bg-zinc-800 text-xl">
                                        {displayProfile.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h2 className="text-2xl font-bold">{displayProfile.name}</h2>
                                    <p className="text-zinc-400">{displayProfile.tagline}</p>
                                </div>
                            </div>

                            {/* Bio Text */}
                            <Card className="bg-zinc-900/30 border-zinc-800 mb-8">
                                <CardContent className="p-6">
                                    <div className="flex gap-2 mb-4">
                                        <Quote className="h-6 w-6 text-zinc-600 flex-shrink-0" />
                                    </div>
                                    <div className="space-y-4">
                                        {displayProfile.about.split('\n\n').map((paragraph, index) => (
                                            <p key={index} className="text-zinc-300 leading-relaxed">
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Resume Button */}
                            {displayProfile.resumeUrl && (
                                <Button asChild className="gap-2">
                                    <a href={displayProfile.resumeUrl} target="_blank" rel="noopener noreferrer">
                                        Download Resume
                                        <ExternalLink className="h-4 w-4" />
                                    </a>
                                </Button>
                            )}
                        </motion.div>
                    </div>

                    {/* Values Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mb-16"
                    >
                        <ValuesSection />
                    </motion.div>

                    {/* Tech Stack Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mb-16"
                    >
                        <TechStackSection />
                    </motion.div>

                    {/* Experience Timeline */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                            <Briefcase className="h-6 w-6" />
                            Experience & Education
                        </h2>
                        <ExperienceTimeline />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
