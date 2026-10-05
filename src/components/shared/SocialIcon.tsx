import { Github, Instagram, Linkedin, type LucideIcon } from 'lucide-react';
import type { SocialLink } from '@/content/types';

export const socialIcons: Record<SocialLink['platform'], LucideIcon> = {
    GitHub: Github,
    LinkedIn: Linkedin,
    Instagram,
};
