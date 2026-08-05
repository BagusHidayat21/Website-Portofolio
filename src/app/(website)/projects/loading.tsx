import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectsLoading() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
            {/* Hero */}
            <section className="relative min-h-[85dvh] flex flex-col justify-center overflow-hidden bg-zinc-50 dark:bg-zinc-950 pt-24 pb-32 lg:py-20">
                <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-8 grid md:grid-cols-12 gap-8 md:gap-10 lg:gap-16 items-center">
                    <div className="md:col-span-8 flex flex-col justify-center">
                        <Skeleton className="h-5 w-40 mb-4" />
                        <Skeleton className="h-14 sm:h-16 lg:h-20 xl:h-24 w-full max-w-lg mb-3" />
                        <Skeleton className="h-14 sm:h-16 lg:h-20 xl:h-24 w-full max-w-md mb-6 lg:mb-8" />
                        <Skeleton className="h-5 w-full max-w-2xl mb-2" />
                        <Skeleton className="h-5 w-2/3 max-w-xl" />
                    </div>
                    <div className="md:col-span-4 flex flex-col items-start md:items-end gap-6">
                        <div className="space-y-2 text-right w-full">
                            <Skeleton className="h-20 w-28 ml-auto" />
                            <Skeleton className="h-3 w-24 ml-auto" />
                        </div>
                        <div className="flex flex-wrap gap-x-5 gap-y-2 md:justify-end w-full">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Skeleton key={i} className="h-5 w-14" />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Sticky filter bar */}
            <section className="sticky top-0 z-30 bg-white/80 dark:bg-zinc-950/80 border-b border-zinc-100 dark:border-zinc-800">
                <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-8 py-3 flex flex-col sm:flex-row items-center gap-3 justify-between">
                    <div className="flex gap-1.5 w-full sm:w-auto">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <Skeleton key={i} className="h-8 w-16 rounded-full shrink-0" />
                        ))}
                    </div>
                    <Skeleton className="h-9 w-full sm:w-56 rounded-full shrink-0" />
                </div>
            </section>

            {/* Grid */}
            <section className="py-14 pb-32">
                <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-8">
                    <Skeleton className="h-4 w-24 mb-8" />

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i}>
                                <Skeleton className="aspect-[16/10] w-full rounded-xl mb-4" />
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1 min-w-0 space-y-1.5">
                                        <Skeleton className="h-3 w-14" />
                                        <Skeleton className="h-5 w-3/4" />
                                        <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-4 w-2/3" />
                                    </div>
                                    <Skeleton className="h-4 w-8 shrink-0 mt-4" />
                                </div>
                                <div className="flex gap-1.5 mt-3">
                                    <Skeleton className="h-5 w-14 rounded-full" />
                                    <Skeleton className="h-5 w-16 rounded-full" />
                                    <Skeleton className="h-5 w-12 rounded-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
