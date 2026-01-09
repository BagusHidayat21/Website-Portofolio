import { AdminSidebar } from '@/components/admin/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex bg-zinc-50 dark:bg-zinc-900">
            <AdminSidebar />

            {/* Main Content */}
            <main className="flex-1 ml-72">
                <div className="p-8 lg:p-12 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
