import type { Route } from 'next';

/** App routes, including case-study pages (the bare `Route` type excludes dynamic segments). */
export type AppRoute = Route | `/projects/${string}`;
export type ExternalUrl = `https://${string}`;
export type Href = AppRoute | ExternalUrl | `mailto:${string}` | `/${string}.pdf`;

/** App routes render with next/link; files, mail and other sites use a plain anchor. */
export const isRoute = (href: Href): href is AppRoute => href.startsWith('/') && !href.endsWith('.pdf');

export const isExternal = (href: Href) => /^https?:|\.pdf$/.test(href);
