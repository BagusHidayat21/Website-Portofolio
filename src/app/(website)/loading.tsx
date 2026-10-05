export default function Loading() {
    return (
        <div role="status" className="flex min-h-svh flex-col items-center justify-center gap-6">
            <p className="font-wide text-4xl uppercase tracking-[-0.04em] md:text-6xl">
                HID<span className="text-ink-accent-ink">.</span>
            </p>
            <div className="h-[2px] w-40 overflow-hidden rounded-full bg-ink-line">
                <div className="h-full w-1/3 animate-[loading-bar_1.2s_var(--ease-expo)_infinite] rounded-full bg-ink-accent-ink" />
            </div>
            <span className="sr-only">Loading</span>
        </div>
    );
}
