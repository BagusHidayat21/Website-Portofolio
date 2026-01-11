import { profileData } from "@/data/static-db";
import { ContactClient } from "./ContactClient";

export function Contact() {
    const profile = profileData;

    if (!profile) {
        return null;
    }

    return (
        <ContactClient
            email={profile.email}
            socialLinks={{
                github: profile.socials.find(s => s.platform === 'GitHub')?.url,
                linkedin: profile.socials.find(s => s.platform === 'LinkedIn')?.url,
            }}
        />
    );
}
