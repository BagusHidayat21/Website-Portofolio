'use client';

import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { KineticHero } from './KineticHero';

interface HeroClientProps {
    name: string;
    firstName: string;
    lastName: string;
    tagline: string;
    intro: string;
    email: string;
    location: string;
    isAvailableForWork: boolean;
    currentCompany?: string;
}

export function HeroClient({
    name,
    firstName,
    lastName,
    tagline,
    intro,
    email,
    location,
    isAvailableForWork,
    currentCompany,
}: HeroClientProps) {
    const status = isAvailableForWork
        ? 'Available for work'
        : currentCompany
            ? `Currently at ${currentCompany}`
            : 'Currently employed';

    return (
        <KineticHero
            lines={[firstName, lastName]}
            srTitle={`${name}, ${tagline}`}
            pill={status}
            pillLive={isAvailableForWork}
            meta={location}
            kicker={tagline}
            intro={intro}
            actions={
                <>
                    <MagneticButton href="/projects" size="lg" icon={ArrowRight}>
                        View Work
                    </MagneticButton>
                    <MagneticButton
                        href={`mailto:${email}`}
                        size="lg"
                        variant="secondary"
                        icon={ArrowUpRight}
                        iconDirection="diagonal"
                    >
                        Say Hello
                    </MagneticButton>
                </>
            }
        />
    );
}
