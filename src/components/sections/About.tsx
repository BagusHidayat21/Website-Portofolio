
import { getProfile } from "@/actions/profile.actions";
import { getExperiences } from "@/actions/experience.actions";
import { AboutClient } from "./AboutClient";

export async function About() {
    const profile = await getProfile();
    const experiences = await getExperiences();

    if (!profile) {
        return null;
    }

    return (
        <AboutClient
            bio={profile.bio}
            resumeUrl={profile.resumeUrl}
            experiences={experiences}
        />
    );
}
