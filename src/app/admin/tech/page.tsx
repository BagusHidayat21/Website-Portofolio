
import { getTechStack } from "@/actions/tech.actions";
import { TechStackClient } from "@/components/admin/TechStackClient";

export default async function AdminTechPage() {
    const techStack = await getTechStack(true);

    return <TechStackClient initialData={techStack} />;
}
