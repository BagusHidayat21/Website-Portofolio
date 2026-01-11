
import { profileData, techStackData } from "@/data/static-db";
import { HeroClient } from "./HeroClient";

export function Hero() {
    const profile = profileData;
    const marqueeTech = techStackData.filter((tech) => tech.inMarquee);

    if (!profile) {
        return null;
    }

    return (
        <HeroClient
            name={profile.name}
            tagline={profile.tagline}
            bio={profile.bio}
            avatarUrl={profile.avatarUrl}
            yearsCoding={profile.yearsCoding}
            projectsCount={profile.projectsCount}
            githubUrl={profile.socials.find(s => s.platform === 'GitHub')?.url || profile.avatarUrl.replace('.png', '')} // Fallback or logic to get GitHub URL
            linkedinUrl={profile.socials.find(s => s.platform === 'LinkedIn')?.url}
            email={profile.email}
            location={profile.location}
            marqueeTech={marqueeTech}
            isAvailableForWork={profile.isAvailableForWork}
        />
    );
}
