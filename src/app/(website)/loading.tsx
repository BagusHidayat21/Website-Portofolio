export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-zinc-950">
            <div
                className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
                style={{
                    backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />
            <div
                className="absolute inset-0 hidden dark:block opacity-[0.05]"
                style={{
                    backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="relative z-10 flex flex-col items-center gap-8">
                <div className="animate-in fade-in zoom-in-95 duration-500">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100">
                        BH<span className="text-zinc-300 dark:text-zinc-700">.</span>
                    </h1>
                </div>

                <div className="w-48 h-[2px] bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full w-1/2 bg-zinc-900 dark:bg-zinc-100 rounded-full animate-loading-bar" />
                </div>

                <p className="animate-in fade-in duration-500 delay-300 fill-mode-both text-xs font-medium tracking-widest uppercase text-zinc-400 dark:text-zinc-500">
                    Loading
                </p>
            </div>
        </div>
    );
}
