'use client';

import { motion } from 'framer-motion';

export default function AdminLoading() {
    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="flex flex-col items-center gap-6">
                {/* Spinning Logo */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="w-12 h-12 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 border-t-zinc-900 dark:border-t-zinc-100"
                />

                {/* Loading Text */}
                <div className="flex flex-col items-center gap-2">
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        Loading...
                    </p>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500">
                        Please wait
                    </p>
                </div>
            </div>
        </div>
    );
}
