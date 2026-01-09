import prisma from '../src/lib/prisma';

async function seedAboutContent() {
    console.log('Checking for existing AboutContent...');

    // @ts-ignore
    const existing = await prisma.aboutContent.findFirst();

    if (existing) {
        console.log('AboutContent already exists, skipping seed.');
        return;
    }

    console.log('Seeding AboutContent...');

    // @ts-ignore
    await prisma.aboutContent.create({
        data: {
            heroTitle: 'ENGINEERING',
            heroSubtitle: 'EXCELLENCE.',
            heroDescription: 'I am a student at Universitas Negeri Malang, majoring in Informatics Engineering Education. I bridge academic theory with real-world application to build robust digital solutions.',
            storyTitle: 'The Story',
            storyContent: `My journey began at SMK Negeri 1 Jenangan Ponorogo, where I majored in Software Engineering. Early on, I developed a strong interest in building practical systems from school projects to real-world applications that emphasize structured data handling and clear system logic.

Currently, I am an undergraduate student at Universitas Negeri Malang, focusing on developing web and application-based systems such as HealMe (a mental health platform) and Carfy (a car rental system). Through these projects, I became increasingly interested in how data can be processed, analyzed, and transformed into meaningful insights.

Lately, my primary focus has shifted toward data engineering and machine learning, particularly how data-driven models can be integrated into modern web and mobile applications. I enjoy exploring how APIs, databases, and machine learning pipelines can work together to support smarter and more adaptive digital systems.`,
            mainImage: 'https://picsum.photos/seed/workspace/1200/800',
            secondaryImage: 'https://picsum.photos/seed/setup/600/600',
        }
    });

    console.log('AboutContent seeded successfully!');
}

seedAboutContent()
    .catch((e) => {
        console.error('Error seeding:', e);
        process.exit(1);
    });
