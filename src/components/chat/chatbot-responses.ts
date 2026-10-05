import { techStack } from '@/content/tech';
import { getEducation, getExperience, getFeaturedProjects, getProfile, getProjects, getYearsCoding } from '@/lib/content';

interface Intent {
    patterns: string[];
    reply: () => string;
}

const profile = getProfile();

const intents: Intent[] = [
    {
        patterns: ['hi', 'hello', 'hey', 'halo', 'hai'],
        reply: () =>
            `Hi there! I'm ${profile.name}'s virtual assistant. I can tell you about his skills, projects, experience, or how to get in touch. What would you like to know?`,
    },
    {
        patterns: ['who', 'about', 'yourself', 'introduce', 'name', 'siapa'],
        reply: () =>
            `I'm **${profile.name}**, a ${profile.tagline} based in ${profile.location}.\n\n${profile.bio}\n\nI have ${getYearsCoding()}+ years of coding experience and ${getProjects().length}+ projects completed.`,
    },
    {
        patterns: ['skill', 'tech', 'stack', 'language', 'framework', 'tools', 'keahlian'],
        reply: () => {
            const grouped = new Map<string, string[]>();
            for (const { category, name } of techStack) grouped.set(category, [...(grouped.get(category) ?? []), name]);
            const lines = [...grouped].map(([category, names]) => `• **${category}:** ${names.join(', ')}`);
            return `Here are my technical skills:\n\n${lines.join('\n')}`;
        },
    },
    {
        patterns: ['experience', 'job', 'career', 'work history', 'pengalaman', 'kerja'],
        reply: () => {
            const lines = getExperience()
                .filter((e) => e.category !== 'Achievement')
                .slice(0, 4)
                .map((e) => `• **${e.title}** at ${e.company} (${e.year})`);
            return `Here's a snapshot of my professional experience:\n\n${lines.join('\n')}\n\nCheck out [/about](/about) for the full career timeline!`;
        },
    },
    {
        patterns: ['project', 'portfolio', 'built', 'proyek', 'karya'],
        reply: () => {
            const lines = getFeaturedProjects()
                .slice(0, 3)
                .map((p) => `• **${p.title}** - ${p.description.slice(0, 100)}...`);
            return `Here are some of my featured projects:\n\n${lines.join('\n')}\n\nVisit [/projects](/projects) to see all ${getProjects().length} projects!`;
        },
    },
    {
        patterns: ['education', 'study', 'university', 'school', 'degree', 'kuliah', 'sekolah'],
        reply: () => `My educational background:\n\n${getEducation().map((e) => `**${e.institution}**\n${e.degree} in ${e.field} (${e.year})`).join('\n\n')}`,
    },
    {
        patterns: ['contact', 'email', 'hire', 'reach', 'hubungi', 'kontak'],
        reply: () => {
            const socials = profile.socials.map((s) => `[${s.platform}](${s.url})`).join(' | ');
            const availability = profile.isAvailableForWork ? "\n\nI'm currently **available for work**! Feel free to reach out." : '';
            return `You can reach me at:\n\n**Email:** ${profile.email}\n**Socials:** ${socials}${availability}`;
        },
    },
    {
        patterns: ['available', 'freelance', 'open'],
        reply: () =>
            profile.isAvailableForWork
                ? `Yes! I'm currently **available for freelance work and full-time opportunities**. Send me an email at ${profile.email} to discuss your project!`
                : `I'm currently focused on my full-time role at ${profile.currentCompany}, but feel free to reach out for future opportunities!`,
    },
    {
        patterns: ['where', 'location', 'based', 'live', 'dimana', 'lokasi'],
        reply: () => `I'm based in **${profile.location}**.`,
    },
    { patterns: ['thank', 'thanks', 'terima kasih', 'makasih'], reply: () => "You're welcome! Ask anytime if you have more questions." },
    { patterns: ['bye', 'goodbye', 'see you', 'sampai jumpa'], reply: () => 'Thanks for stopping by. Come back anytime.' },
];

const FALLBACK = `I'm not sure I understand that. Here are some things you can ask me about:
• **About me** - Who is Bagus?
• **Skills** - What technologies do I use?
• **Projects** - What have I built?
• **Experience** - Where have I worked?
• **Contact** - How to reach me?`;

export function getChatResponse(message: string) {
    const text = message.toLowerCase().trim();
    return intents.find(({ patterns }) => patterns.some((p) => text.includes(p)))?.reply() ?? FALLBACK;
}

export const quickSuggestions = ['Who are you?', 'Your skills', 'Show projects', 'Work experience', 'Contact info'];
