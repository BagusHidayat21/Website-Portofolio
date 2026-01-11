
import { profileData } from "@/data/static-db";
import { FooterClient } from "./FooterClient";

export function Footer() {
    const profile = profileData;

    if (!profile) {
        return null;
    }

    return (
        <FooterClient profile={profile} />
    );
}
