'use client';

import { useState, Suspense, useSyncExternalStore } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Sparkles } from 'lucide-react';
import Link from 'next/link';

// Secret key to reveal admin login page (add to URL: ?key=YOUR_SECRET_KEY)
const ADMIN_SECRET_KEY = process.env.NEXT_PUBLIC_ADMIN_SECRET_KEY || 'opensesame';
// Password for actual login
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';
const AUTH_KEY = 'portfolio_admin_auth';
const ACCESS_KEY = 'portfolio_admin_access';

interface AdminAuthGuardProps {
    children: React.ReactNode;
}

// Custom 404 component to show when no access
function NotFoundPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-900 p-4">
            <div className="text-center space-y-4">
                <h1 className="text-6xl font-black text-zinc-900 dark:text-zinc-100">404</h1>
                <p className="text-lg text-zinc-500 dark:text-zinc-400">Page not found</p>
                <Button asChild variant="outline">
                    <Link href="/">Go Home</Link>
                </Button>
            </div>
        </div>
    );
}

// Loading component
function LoadingSpinner() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-900">
            <div className="w-6 h-6 border-2 border-zinc-900 dark:border-zinc-100 border-t-transparent rounded-full animate-spin" />
        </div>
    );
}

// Helper to read sessionStorage safely
function useSessionStorage(key: string) {
    return useSyncExternalStore(
        (callback) => {
            window.addEventListener('storage', callback);
            return () => window.removeEventListener('storage', callback);
        },
        () => {
            try {
                return sessionStorage.getItem(key);
            } catch {
                return null;
            }
        },
        () => null // SSR fallback
    );
}

// Inner component that uses useSearchParams
function AdminAuthGuardInner({ children }: AdminAuthGuardProps) {
    const searchParams = useSearchParams();
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [forceUpdate, setForceUpdate] = useState(0);

    // Read from sessionStorage
    const storedAccess = useSessionStorage(ACCESS_KEY);
    const storedAuth = useSessionStorage(AUTH_KEY);

    // Check URL key
    const urlKey = searchParams.get('key');
    const hasValidUrlKey = urlKey === ADMIN_SECRET_KEY;

    // If valid URL key, store access
    if (hasValidUrlKey && typeof window !== 'undefined') {
        try {
            sessionStorage.setItem(ACCESS_KEY, 'true');
        } catch {
            // Ignore storage errors
        }
    }

    const hasAccess = hasValidUrlKey || storedAccess === 'true';
    const isAuthenticated = storedAuth === 'true';

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            sessionStorage.setItem(AUTH_KEY, 'true');
            setForceUpdate(f => f + 1); // Force re-render
            setError('');
        } else {
            setError('Invalid password');
        }
    };

    // Use forceUpdate to trigger re-render after login
    void forceUpdate;

    // No access - show 404
    if (!hasAccess) {
        return <NotFoundPage />;
    }

    // Has access but not authenticated - show login
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 p-4">
                <Card className="w-full max-w-sm border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
                    <CardHeader className="text-center space-y-4">
                        <div className="mx-auto w-12 h-12 rounded-xl bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-zinc-100 dark:text-zinc-900" />
                        </div>
                        <div>
                            <CardTitle className="text-xl">Admin Access</CardTitle>
                            <CardDescription>Enter password to continue</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="password" className="sr-only">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10"
                                        autoFocus
                                    />
                                </div>
                                {error && (
                                    <p className="text-sm text-red-500">{error}</p>
                                )}
                            </div>
                            <Button type="submit" className="w-full">
                                Access Admin
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Authenticated - render children
    return <>{children}</>;
}

// Wrapper with Suspense for useSearchParams
export function AdminAuthGuard({ children }: AdminAuthGuardProps) {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <AdminAuthGuardInner>{children}</AdminAuthGuardInner>
        </Suspense>
    );
}
