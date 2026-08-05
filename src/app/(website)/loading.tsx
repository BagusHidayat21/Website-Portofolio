import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950">
            {/* Hero */}
            <section className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden bg-zinc-50 dark:bg-zinc-950 pt-24 pb-32 lg:py-20">
                <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-8 grid lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
                    <div className="lg:col-span-8 flex flex-col justify-center">
                        <Skeleton className="h-7 w-44 rounded-full mb-6 lg:mb-8" />
                        <Skeleton className="h-5 w-56 mb-4" />
                        <Skeleton className="h-14 sm:h-16 lg:h-20 xl:h-24 w-full max-w-xl mb-3" />
                        <Skeleton className="h-14 sm:h-16 lg:h-20 xl:h-24 w-full max-w-md mb-6 lg:mb-8" />
                        <Skeleton className="h-5 w-full max-w-2xl mb-2" />
                        <Skeleton className="h-5 w-2/3 max-w-xl mb-8 lg:mb-10" />
                        <div className="flex flex-wrap items-center gap-4 lg:gap-5">
                            <Skeleton className="h-12 w-36 rounded-full" />
                            <Skeleton className="h-12 w-32 rounded-full" />
                        </div>
                    </div>

                    <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-6 mt-8 lg:mt-0">
                        <Skeleton className="relative aspect-[4/5] w-full max-w-sm rounded-2xl" />
                        <div className="w-full flex flex-row justify-between gap-4">
                            <div className="space-y-2">
                                <Skeleton className="h-12 w-16" />
                                <Skeleton className="h-3 w-20" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-12 w-16" />
                                <Skeleton className="h-3 w-20" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full overflow-hidden border-y border-zinc-200 dark:border-zinc-700 py-4 absolute bottom-0 left-0 z-20">
                    <div className="flex items-center gap-8 px-6">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <Skeleton key={i} className="h-3 w-20 shrink-0" />
                        ))}
                    </div>
                </div>
            </section>

            {/* About teaser */}
            <section className="py-24 md:py-32 bg-white dark:bg-zinc-900 border-y border-zinc-100 dark:border-zinc-700">
                <div className="container mx-auto px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-6">
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
                        <div className="lg:w-1/3 space-y-4">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-9 w-full" />
                            <Skeleton className="h-9 w-2/3" />
                        </div>
                        <div className="lg:w-2/3 space-y-4">
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-5 w-32 mt-4" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Projects */}
            <section className="py-24 md:py-32 bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-700">
                <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                        <div className="space-y-4">
                            <Skeleton className="h-3 w-32" />
                            <Skeleton className="h-10 w-72 max-w-full" />
                        </div>
                        <Skeleton className="h-12 w-44 rounded-full" />
                    </div>

                    <div className="grid gap-20">
                        {[0, 1].map((i) => (
                            <div key={i} className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                                <div className={`lg:col-span-7 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                                    <Skeleton className="aspect-[16/10] w-full rounded-2xl" />
                                </div>
                                <div className={`lg:col-span-5 space-y-4 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                                    <div className="flex gap-2">
                                        <Skeleton className="h-6 w-16 rounded-full" />
                                        <Skeleton className="h-6 w-20 rounded-full" />
                                        <Skeleton className="h-6 w-14 rounded-full" />
                                    </div>
                                    <Skeleton className="h-9 w-3/4" />
                                    <Skeleton className="h-5 w-full" />
                                    <Skeleton className="h-5 w-full" />
                                    <Skeleton className="h-5 w-2/3" />
                                    <Skeleton className="h-4 w-36" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section className="py-24 md:py-32 bg-white dark:bg-zinc-900">
                <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-8">
                    <div className="flex flex-col md:flex-row gap-12 md:gap-16 lg:gap-24 items-start">
                        <div className="md:w-1/2 space-y-4">
                            <Skeleton className="h-4 w-28" />
                            <Skeleton className="h-11 w-full" />
                            <Skeleton className="h-11 w-2/3" />
                            <Skeleton className="h-5 w-full mt-4" />
                            <Skeleton className="h-5 w-full" />
                            <Skeleton className="h-5 w-3/4" />
                            <div className="grid grid-cols-2 gap-4 max-w-sm pt-4">
                                <Skeleton className="h-14 rounded-xl" />
                                <Skeleton className="h-14 rounded-xl" />
                            </div>
                        </div>
                        <div className="md:w-1/2 w-full">
                            <Skeleton className="h-64 w-full rounded-2xl" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
