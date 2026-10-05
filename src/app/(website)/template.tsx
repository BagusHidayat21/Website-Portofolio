'use client';

import { useEffect, useState } from 'react';

// Templates remount on every navigation; only those later mounts fade in, so the first load paints at once.
let hasMounted = false;

export default function Template({ children }: { children: React.ReactNode }) {
    const [fadeIn] = useState(() => hasMounted);

    useEffect(() => {
        hasMounted = true;
    }, []);

    return <div className={fadeIn ? 'relative duration-300 animate-in fade-in' : 'relative'}>{children}</div>;
}
