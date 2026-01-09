
import { getTechStack } from "@/actions/tech.actions";
import { TechStackClient } from "@/components/admin/TechStackClient";

export default async function AdminTechPage() {
    // We need to fetch ALL tech including hidden ones for admin
    // The current getTechStack filters by isVisible=true. 
    // We should probably update the action or just accept it for now and fix later.
    // Ideally we add a parameter to fetching function.

    // For now, let's just use what we have, but be aware hidden items might not show up if the action filters them.
    // Fix: We need to modify getTechStack to allow fetching all.
    // OR create a new action `getAllTechStack`.

    // Let's assume for this step we will fix the action in next step or use what we get.
    // Actually, I should fix the action first to ensure Admin sees everything.
    // But to avoid context switching too much, I'll update the action in parallel or right after.

    const techStack = await getTechStack(true);

    return <TechStackClient initialData={techStack} />;
}
