import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Bagus Hidayat | Full-Stack Web Developer',
        short_name: 'Bagus Hidayat',
        description: 'Portfolio of Bagus Hidayat, specializing in Data Engineering and Full-Stack Development.',
        start_url: '/',
        display: 'standalone',
        background_color: '#08080a',
        theme_color: '#08080a',
        icons: [
            {
                src: '/icon.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icon.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    };
}
