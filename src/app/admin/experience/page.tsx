
import { getExperiences } from "@/actions/experience.actions";
import { ExperienceClient } from "@/components/admin/ExperienceClient";

export default async function AdminExperiencePage() {
    const experienceData = await getExperiences(true);

    return <ExperienceClient initialData={experienceData} />;
}
