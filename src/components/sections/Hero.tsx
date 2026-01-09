
import { getProfile } from "@/actions/profile.actions";
import { getMarqueeTech } from "@/actions/tech.actions";
import { HeroClient } from "./HeroClient";

export async function Hero() {
    const profile = await getProfile();
    const marqueeTech = await getMarqueeTech();

    if (!profile) {
        return null; // Or skeleton / error state
    }

    return (
        <HeroClient
            name={profile.name}
            tagline={profile.tagline}
            bio={profile.bio}
            avatarUrl={profile.avatarUrl}
            yearsCoding={profile.yearsCoding}
            projectsCount={profile.projectsCount}
            githubUrl={profile.githubUrl}
            linkedinUrl={profile.linkedinUrl}
            email={profile.email}
            location={profile.location}
            marqueeTech={marqueeTech}
        />
    );
}
