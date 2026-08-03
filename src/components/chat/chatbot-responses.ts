'use client';

import { profileData, projectsData, techStackData, experienceData, educationData } from '@/data/static-db';

interface ChatResponse {
    patterns: string[];
    getResponse: () => string;
}

const responses: ChatResponse[] = [
    {
        patterns: ['hi', 'hello', 'hey', 'halo', 'hai'],
        getResponse: () => `Hi there! I'm ${profileData.name}'s virtual assistant. I can tell you about his skills, projects, experience, or how to get in touch. What would you like to know?`
    },
    {
        patterns: ['who', 'about', 'yourself', 'introduce', 'name', 'siapa'],
        getResponse: () => `I'm **${profileData.name}**, a ${profileData.tagline} based in ${profileData.location}.\n\n${profileData.bio}\n\nI have ${profileData.yearsCoding}+ years of coding experience and ${profileData.projectsCount}+ projects completed.`
    },
    {
        patterns: ['skill', 'tech', 'stack', 'language', 'framework', 'tools', 'keahlian'],
        getResponse: () => {
            const grouped = techStackData.reduce((acc, tech) => {
                if (!acc[tech.category]) acc[tech.category] = [];
                acc[tech.category].push(tech.name);
                return acc;
            }, {} as Record<string, string[]>);

            let response = "Here are my technical skills:\n\n";
            Object.entries(grouped).forEach(([category, techs]) => {
                response += `• **${category}:** ${techs.join(', ')}\n`;
            });
            return response;
        }
    },
    {
        patterns: ['experience', 'job', 'career', 'work history', 'pengalaman', 'kerja'],
        getResponse: () => {
            const workExp = experienceData.filter(e =>
                !e.title.includes('Award') &&
                !e.title.includes('Paper') &&
                !e.title.includes('Education')
            ).slice(0, 4);

            let response = "Here's a snapshot of my professional experience:\n\n";
            workExp.forEach(e => {
                response += `• **${e.title}** at ${e.company} (${e.year})\n`;
            });
            response += `\nCheck out [/about](/about) for the full career timeline!`;
            return response;
        }
    },
    {
        patterns: ['project', 'portfolio', 'built', 'proyek', 'karya'],
        getResponse: () => {
            const featured = projectsData.filter(p => p.isFeatured).slice(0, 3);
            let response = "Here are some of my featured projects:\n\n";
            featured.forEach(p => {
                response += `• **${p.title}** - ${p.description.slice(0, 100)}...\n`;
            });
            response += `\nVisit [/projects](/projects) to see all ${projectsData.length} projects!`;
            return response;
        }
    },
    {
        patterns: ['education', 'study', 'university', 'school', 'degree', 'kuliah', 'sekolah'],
        getResponse: () => {
            let response = "My educational background:\n\n";
            educationData.forEach(e => {
                response += `**${e.institution}**\n${e.degree} in ${e.field} (${e.year})\n\n`;
            });
            return response;
        }
    },
    {
        patterns: ['contact', 'email', 'hire', 'reach', 'hubungi', 'kontak'],
        getResponse: () => {
            const socials = profileData.socials.map(s => `[${s.platform}](${s.url})`).join(' | ');
            return `You can reach me at:\n\n**Email:** ${profileData.email}\n**Socials:** ${socials}\n\n${profileData.isAvailableForWork ? "I'm currently **available for work**! Feel free to reach out." : ""}`;
        }
    },
    {
        patterns: ['available', 'hire', 'freelance', 'open'],
        getResponse: () => profileData.isAvailableForWork
            ? `Yes! I'm currently **available for freelance work and full-time opportunities**. Send me an email at ${profileData.email} to discuss your project!`
            : "I'm currently focused on my full-time role at PT Universal Big Data, but feel free to reach out for future opportunities!"
    },
    {
        patterns: ['where', 'location', 'based', 'live', 'dimana', 'lokasi'],
        getResponse: () => `I'm based in **${profileData.location}**. I work remotely and am open to opportunities worldwide.`
    },
    {
        patterns: ['thank', 'thanks', 'terima kasih', 'makasih'],
        getResponse: () => "You're welcome! Feel free to ask if you have more questions. 😊"
    },
    {
        patterns: ['bye', 'goodbye', 'see you', 'sampai jumpa'],
        getResponse: () => "Goodbye! Thanks for chatting. Feel free to come back anytime! 👋"
    }
];

const fallbackResponse = `I'm not sure I understand that. Here are some things you can ask me about:
• **About me** - Who is Bagus?
• **Skills** - What technologies do I use?
• **Projects** - What have I built?
• **Experience** - Where have I worked?
• **Contact** - How to reach me?`;

export function getChatResponse(message: string): string {
    const lowerMessage = message.toLowerCase().trim();

    for (const response of responses) {
        for (const pattern of response.patterns) {
            if (lowerMessage.includes(pattern)) {
                return response.getResponse();
            }
        }
    }

    return fallbackResponse;
}

export const quickSuggestions = [
    "Who are you?",
    "Your skills",
    "Show projects",
    "Work experience",
    "Contact info"
];
