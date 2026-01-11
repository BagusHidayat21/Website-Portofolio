import { getAboutContent } from "@/actions/about.actions";
import { AboutForm } from "@/components/admin/AboutForm";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default async function AdminAboutPage() {
    const aboutContent = await getAboutContent();

    return (
        <AdminPageShell>
            <AdminPageHeader
                title="About Page"
                description="Manage the content displayed on your About page."
            />
            <AboutForm initialData={aboutContent} />
        </AdminPageShell>
    );
}
