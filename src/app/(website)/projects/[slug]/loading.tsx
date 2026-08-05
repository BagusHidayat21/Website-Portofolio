import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectDetailLoading() {
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 pb-20">
            {/* Header hero */}
            <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 pt-24 pb-16">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-6">
                            <Skeleton className="h-7 w-40 rounded-full" />
                            <Skeleton className="h-7 w-24 rounded-full" />
                        </div>
                        <Skeleton className="h-16 sm:h-20 md:h-24 lg:h-28 w-full max-w-2xl mx-auto md:mx-0 mb-3" />
                        <Skeleton className="h-16 sm:h-20 md:h-24 lg:h-28 w-full max-w-md mx-auto md:mx-0 mb-8" />
                        <Skeleton className="h-6 w-full max-w-2xl mx-auto md:mx-0 mb-2" />
                        <Skeleton className="h-6 w-2/3 max-w-lg mx-auto md:mx-0" />
                    </div>
                </div>
            </section>

            {/* Sticky action bar */}
            <section className="bg-white/90 dark:bg-zinc-950/90 border-y border-zinc-200/80 dark:border-zinc-800/80 sticky top-0 z-30">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between gap-4">
                    <Skeleton className="h-9 w-36" />
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-9 w-32 rounded-full" />
                        <Skeleton className="h-9 w-32 rounded-full" />
                    </div>
                </div>
            </section>

            {/* Main content */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
                        {/* Sidebar */}
                        <div className="lg:col-span-4">
                            <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 space-y-6">
                                <div className="space-y-2">
                                    <Skeleton className="h-3 w-16" />
                                    <Skeleton className="h-5 w-40" />
                                </div>
                                <div className="space-y-3">
                                    <Skeleton className="h-3 w-24" />
                                    <div className="flex flex-wrap gap-2">
                                        <Skeleton className="h-6 w-16 rounded-full" />
                                        <Skeleton className="h-6 w-20 rounded-full" />
                                        <Skeleton className="h-6 w-14 rounded-full" />
                                        <Skeleton className="h-6 w-20 rounded-full" />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <Skeleton className="h-3 w-20" />
                                    <div className="flex flex-wrap gap-2">
                                        <Skeleton className="h-6 w-16 rounded-full" />
                                        <Skeleton className="h-6 w-14 rounded-full" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Skeleton className="h-3 w-24" />
                                    <Skeleton className="h-4 w-28" />
                                </div>
                                <div className="pt-4 border-t border-zinc-200/80 dark:border-zinc-800/80 space-y-2">
                                    <Skeleton className="h-3 w-28" />
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-3 w-40" />
                                </div>
                            </div>
                        </div>

                        {/* Article & media */}
                        <div className="lg:col-span-8 space-y-12">
                            <Skeleton className="aspect-[16/10] w-full rounded-2xl" />

                            <div className="space-y-4">
                                <Skeleton className="h-8 w-40" />
                                <Skeleton className="h-5 w-full" />
                                <Skeleton className="h-5 w-full" />
                                <Skeleton className="h-5 w-full" />
                                <Skeleton className="h-5 w-2/3" />
                            </div>

                            <div className="space-y-6 pt-10 border-t border-zinc-200/80 dark:border-zinc-800/80">
                                <Skeleton className="h-6 w-48" />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Skeleton className="aspect-video w-full rounded-xl" />
                                    <Skeleton className="aspect-video w-full rounded-xl" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
