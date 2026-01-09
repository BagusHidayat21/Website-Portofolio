import { getAboutContent } from "@/actions/about.actions";
import { AboutForm } from "@/components/admin/AboutForm";

export default async function AdminAboutPage() {
    const aboutContent = await getAboutContent();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 mb-2">About Page</h1>
                <p className="text-zinc-500 dark:text-zinc-400">
                    Manage the content displayed on your About page
                </p>
            </div>

            <AboutForm initialData={aboutContent} />
        </div>
    );
}
