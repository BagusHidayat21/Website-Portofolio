import { getProfile } from "@/actions/profile.actions";
import { ContactClient } from "./ContactClient";

export async function Contact() {
    const profile = await getProfile();

    if (!profile) {
        return null;
    }

    return (
        <ContactClient
            email={profile.email}
            socialLinks={{
                github: profile.githubUrl ?? undefined,
                linkedin: profile.linkedinUrl ?? undefined,
            }}
        />
    );
}
