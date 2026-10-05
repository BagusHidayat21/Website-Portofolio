import { experienceData, profileData } from "@/data/static-db";
import { AboutManifestoClient } from "./AboutManifestoClient";

export function About() {
    const profile = profileData;

    if (!profile) {
        return null;
    }

    const awards = experienceData.filter((e) => e.isVisible && e.category === 'Achievement').length;

    return (
        <AboutManifestoClient
            name={profile.name}
            avatarUrl={profile.avatarUrl}
            stats={[
                { value: profile.yearsCoding, suffix: '', label: 'years writing code' },
                { value: profile.projectsCount, suffix: '+', label: 'projects built' },
                { value: awards, suffix: '', label: 'papers and awards' },
            ]}
        />
    );
}
