import { getEducation } from "@/actions/education.actions";
import { EducationClient } from "@/components/admin/EducationClient";

export default async function AdminEducationPage() {
    const education = await getEducation(true);

    return <EducationClient initialData={education} />;
}
