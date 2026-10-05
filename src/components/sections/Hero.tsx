import { profileData } from "@/data/static-db";
import { HeroClient } from "./HeroClient";

export function Hero() {
    const profile = profileData;

    if (!profile) {
        return null;
    }

    // Hero subtext stays short: the first sentence of the bio.
    const intro = profile.bio.split(/(?<=\.)\s/)[0] ?? profile.bio;
    const [firstName, ...rest] = profile.name.split(' ');

    return (
        <HeroClient
            name={profile.name}
            firstName={firstName}
            lastName={rest.join(' ') || firstName}
            tagline={profile.tagline}
            intro={intro}
            email={profile.email}
            location={profile.location}
            isAvailableForWork={profile.isAvailableForWork}
            currentCompany={profile.currentCompany}
        />
    );
}
