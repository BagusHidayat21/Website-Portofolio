import { Skeleton } from "@/components/ui/skeleton";

function SectionIntro({ labelWidth = "w-24" }: { labelWidth?: string }) {
    return (
        <div className="md:sticky md:top-32 space-y-4">
            <Skeleton className={`h-4 ${labelWidth}`} />
            <Skeleton className="h-10 w-40" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-4 w-full max-w-[220px] mt-2" />
        </div>
    );
}

function TimelineRows({ count }: { count: number }) {
    return (
        <div className="space-y-0 divide-y divide-ink-line">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="py-8 first:pt-0 last:pb-0 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div className="space-y-2">
                            <Skeleton className="h-5 w-48" />
                            <Skeleton className="h-4 w-32" />
                        </div>
                        <Skeleton className="h-3 w-16" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <div className="flex flex-wrap gap-1.5">
                        <Skeleton className="h-5 w-16 rounded-full" />
                        <Skeleton className="h-5 w-20 rounded-full" />
                        <Skeleton className="h-5 w-14 rounded-full" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function AboutLoading() {
    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section className="relative min-h-[85dvh] flex flex-col justify-center overflow-hidden pt-24 pb-32 lg:py-20">
                <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-8 grid md:grid-cols-12 gap-8 md:gap-10 lg:gap-16 items-center">
                    <div className="md:col-span-8 flex flex-col justify-center">
                        <Skeleton className="h-5 w-32 mb-4" />
                        <Skeleton className="h-14 sm:h-16 lg:h-20 xl:h-24 w-full max-w-lg mb-3" />
                        <Skeleton className="h-14 sm:h-16 lg:h-20 xl:h-24 w-full max-w-md mb-6 lg:mb-8" />
                        <Skeleton className="h-5 w-full max-w-2xl mb-2" />
                        <Skeleton className="h-5 w-2/3 max-w-xl" />
                    </div>
                    <div className="md:col-span-4 flex flex-col items-start md:items-end gap-8">
                        <div className="space-y-2 text-right w-full">
                            <Skeleton className="h-16 w-24 ml-auto" />
                            <Skeleton className="h-3 w-28 ml-auto" />
                        </div>
                        <div className="flex flex-row md:flex-col gap-6 md:items-end w-full justify-between md:justify-start">
                            <div className="space-y-2">
                                <Skeleton className="h-6 w-10" />
                                <Skeleton className="h-3 w-16" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-6 w-10" />
                                <Skeleton className="h-3 w-16" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery */}
            <section className="py-16 border-t border-ink-line">
                <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
                        <Skeleton className="md:col-span-8 h-[320px] md:h-[520px] rounded-2xl" />
                        <div className="md:col-span-4 flex flex-col gap-4 md:gap-5">
                            <Skeleton className="flex-1 min-h-[200px] rounded-2xl" />
                            <Skeleton className="min-h-[160px] rounded-2xl" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Story */}
            <section className="py-24 border-t border-ink-line">
                <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-8">
                    <div className="grid md:grid-cols-12 gap-12 md:gap-16">
                        <div className="md:col-span-4">
                            <SectionIntro />
                        </div>
                        <div className="md:col-span-8 space-y-4">
                            <Skeleton className="h-5 w-full" />
                            <Skeleton className="h-5 w-full" />
                            <Skeleton className="h-5 w-full" />
                            <Skeleton className="h-5 w-2/3" />
                            <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-ink-line">
                                <Skeleton className="h-8 w-20 rounded-full" />
                                <Skeleton className="h-8 w-24 rounded-full" />
                                <Skeleton className="h-8 w-16 rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Work Experience */}
            <section className="py-24 border-t border-ink-line">
                <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-8">
                    <div className="grid md:grid-cols-12 gap-12 md:gap-16">
                        <div className="md:col-span-4">
                            <SectionIntro />
                        </div>
                        <div className="md:col-span-8">
                            <TimelineRows count={3} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects & Achievements */}
            <section className="py-24 border-t border-ink-line">
                <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-8">
                    <div className="grid md:grid-cols-12 gap-12 md:gap-16">
                        <div className="md:col-span-4">
                            <SectionIntro />
                        </div>
                        <div className="md:col-span-8">
                            <TimelineRows count={2} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Education */}
            <section className="py-24 border-t border-ink-line">
                <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-8">
                    <div className="grid md:grid-cols-12 gap-12 md:gap-16">
                        <div className="md:col-span-4">
                            <SectionIntro />
                        </div>
                        <div className="md:col-span-8">
                            <TimelineRows count={2} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Philosophy */}
            <section className="py-24 border-t border-ink-line">
                <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-8">
                    <div className="grid md:grid-cols-12 gap-12 md:gap-16">
                        <div className="md:col-span-4">
                            <SectionIntro />
                        </div>
                        <div className="md:col-span-8 grid sm:grid-cols-2 gap-4">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="p-6 rounded-xl space-y-4">
                                    <Skeleton className="h-10 w-10 rounded-lg" />
                                    <Skeleton className="h-5 w-2/3" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-3/4" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-ink-fg">
                <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-8">
                    <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
                        <div className="space-y-4">
                            <Skeleton className="h-3 w-40 bg-ink-muted" />
                            <Skeleton className="h-10 w-64 bg-ink-muted" />
                            <Skeleton className="h-10 w-40 bg-ink-muted" />
                        </div>
                        <Skeleton className="h-12 w-40 rounded-full bg-ink-muted" />
                    </div>
                </div>
            </section>
        </div>
    );
}
