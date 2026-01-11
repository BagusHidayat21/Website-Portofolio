import { aboutData, educationData, experienceData } from "@/data/static-db";
import { AboutPageClient, AboutContentData } from "@/components/sections/AboutPageClient";

export default function AboutPage() {
    return <AboutPageClient aboutContent={aboutData as unknown as AboutContentData} experience={experienceData} education={educationData} />;
}
