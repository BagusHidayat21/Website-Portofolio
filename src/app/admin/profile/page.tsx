
import { getProfile } from "@/actions/profile.actions";
import { ProfileForm } from "@/components/admin/ProfileForm";

export default async function AdminProfilePage() {
    const profile = await getProfile();

    if (!profile) return <div>No profile found. Seed DB first.</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold tracking-tight mb-8">Edit Profile</h1>
            <ProfileForm initialData={profile} />
        </div>
    );
}
