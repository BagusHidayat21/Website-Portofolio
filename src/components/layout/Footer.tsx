
import { getProfile } from "@/actions/profile.actions";
import { FooterClient } from "./FooterClient";

export async function Footer() {
    const profile = await getProfile();

    if (!profile) {
        return null;
    }

    return (
        <FooterClient profile={profile} />
    );
}
