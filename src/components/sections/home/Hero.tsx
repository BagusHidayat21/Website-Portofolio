import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { KineticHero } from '@/components/shared/KineticHero';
import { MagneticButton } from '@/components/shared/MagneticButton';
import type { Profile } from '@/content/types';

export function Hero({ profile }: { profile: Profile }) {
    const [firstName = profile.name, ...rest] = profile.name.split(' ');
    const status = profile.isAvailableForWork ? 'Available for work' : `Currently at ${profile.currentCompany}`;

    return (
        <KineticHero
            lines={[firstName, rest.join(' ') || firstName]}
            srTitle={`${profile.name}, ${profile.tagline}`}
            pill={status}
            pillLive={profile.isAvailableForWork}
            meta={profile.location}
            kicker={profile.tagline}
            intro={profile.bio.split(/(?<=\.)\s/)[0]}
            actions={
                <>
                    <MagneticButton href="/projects" icon={<ArrowRight />}>
                        View Work
                    </MagneticButton>
                    <MagneticButton href={`mailto:${profile.email}`} icon={<ArrowUpRight />} variant="secondary">
                        Say Hello
                    </MagneticButton>
                </>
            }
        />
    );
}
