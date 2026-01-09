
import { getProfile } from "@/actions/profile.actions";
import { ProfileForm } from "@/components/admin/ProfileForm";

export default async function AdminProfilePage() {
    const profile = await getProfile();

    if (!profile) return <div>No profile found. Seed DB first.</div>;

    return (
        <div>
            <h1 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 mb-2">Edit Profile</h1>
            <p className="text-zinc-500 dark:text-zinc-400 mb-8">
                Manage the content displayed on your profile page
            </p>
            <ProfileForm initialData={profile} />
        </div>
    );
}
