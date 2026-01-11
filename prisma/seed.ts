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

async function main() {
    await seedAboutContent();
    await seedExperience();
    await seedEducation();
}

main()
    .catch((e) => {
        console.error('Error seeding:', e);
        process.exit(1);
    });
