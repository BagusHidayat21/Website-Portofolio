import { cn } from "@/lib/utils";

interface AdminPageHeaderProps {
    title: string;
    description?: string;
    action?: React.ReactNode;
    className?: string;
}

export function AdminPageHeader({ title, description, action, className }: AdminPageHeaderProps) {
    return (
        <div className={cn("flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6", className)}>
            <div className="space-y-1">
                <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
                    {title}
                </h1>
                {description && (
                    <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl">
                        {description}
                    </p>
                )}
            </div>
            {action && (
                <div className="flex-shrink-0">
                    {action}
                </div>
            )}
        </div>
    );
}
