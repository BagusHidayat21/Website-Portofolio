'use client';

import { useEffect, useState } from 'react';
import { GithubStatsMap } from '@/app/api/github-stats/route';

export function useGithubStats() {
    const [stats, setStats] = useState<GithubStatsMap | null>(null);

    useEffect(() => {
        let active = true;

        fetch('/api/github-stats')
            .then((res) => (res.ok ? res.json() : {}))
            .then((data: GithubStatsMap) => {
                if (active) setStats(data);
            })
            .catch(() => {
                if (active) setStats({});
            });

        return () => {
            active = false;
        };
    }, []);

    return stats;
}
