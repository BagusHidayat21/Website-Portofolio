import { ArrowUpRight, FileText } from 'lucide-react';
import { KineticHero } from '@/components/shared/KineticHero';
import { MagneticButton } from '@/components/shared/MagneticButton';
import type { AboutContent, Profile } from '@/content/types';

interface AboutHeroProps {
    profile: Profile;
    about: AboutContent;
    currentRole?: string;
}

export function AboutHero({ profile, about, currentRole }: AboutHeroProps) {
    return (
        <KineticHero
            lines={[about.heroTitle, about.heroSubtitle]}
            srTitle={`About ${profile.name}`}
            pill={profile.currentCompany ? `Currently at ${profile.currentCompany}` : 'About'}
            pillLive={profile.isAvailableForWork}
            meta={profile.location}
            kicker={currentRole}
            intro={about.heroDescription}
            density={0.6}
            actions={
                <>
                    <MagneticButton href={profile.resumeUrl} icon={<FileText />}>
                        Download Resume
                    </MagneticButton>
                    <MagneticButton href={`mailto:${profile.email}`} icon={<ArrowUpRight />} variant="secondary">
                        Say Hello
                    </MagneticButton>
                </>
            }
        />
    );
}
