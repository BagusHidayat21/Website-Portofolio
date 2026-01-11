import { getProfile } from "@/actions/profile.actions";
import { ProfileForm } from "@/components/admin/ProfileForm";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default async function AdminProfilePage() {
    const profile = await getProfile();

    if (!profile) {
        return (
            <AdminPageShell>
                <AdminPageHeader title="Profile" description="Manage your profile information" />
                <div className="p-12 text-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl">
                    <p className="text-zinc-500">No profile found. Please seed the database first.</p>
                </div>
            </AdminPageShell>
        );
    }

    return (
        <AdminPageShell>
            <AdminPageHeader
                title="Profile"
                description="Manage the content displayed on your homepage and public profile."
            />
            <ProfileForm initialData={profile} />
        </AdminPageShell>
    );
}
