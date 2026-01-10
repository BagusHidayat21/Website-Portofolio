import { getAboutContent, getExperience } from "@/actions/about.actions";
import { getEducation } from "@/actions/education.actions";
import { AboutPageClient } from "@/components/sections/AboutPageClient";

export default async function AboutPage() {
    const [aboutContent, experience, education] = await Promise.all([
        getAboutContent(),
        getExperience(),
        getEducation()
    ]);

    return <AboutPageClient aboutContent={aboutContent} experience={experience} education={education} />;
}
