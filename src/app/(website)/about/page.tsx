import { getAboutContent } from "@/actions/about.actions";
import { AboutPageClient } from "@/components/sections/AboutPageClient";

export default async function AboutPage() {
    const aboutContent = await getAboutContent();

    return <AboutPageClient aboutContent={aboutContent} />;
}
