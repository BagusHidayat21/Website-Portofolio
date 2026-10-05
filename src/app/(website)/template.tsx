'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const prevPathname = useRef(pathname);
    const [overlay, setOverlay] = useState(false);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (prevPathname.current !== pathname) {
            prevPathname.current = pathname;
            setVisible(false);
            const t = requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setVisible(true);
                });
            });
            return () => cancelAnimationFrame(t);
        }
    }, [pathname]);

    return (
        <div
            className="relative"
            style={{
                opacity: visible ? 1 : 0,
                transition: visible ? 'opacity 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)' : 'none',
                willChange: 'opacity',
            }}
        >
            {children}
        </div>
    );
}
