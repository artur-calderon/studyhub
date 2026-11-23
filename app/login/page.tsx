'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);

        const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
        });

        setLoading(false);

        if (result?.error) {
            setError('Sign in failed. Check your email and password.');
            return;
        }

        router.push('/dashboard');
    }

    return (
        <div className="mx-auto max-w-sm py-10">
            <h1 className="text-2xl font-semibold tracking-tight">
                Welcome back
            </h1>
            <p className="mt-1 text-sm text-slate-500">
                Login to continue to your notes.
            </p>

            <form onSubmit={handleSubmit} className="card mt-8 space-y-4">
                {error && <div className="error-box">{error}</div>}

                <div>
                    <label className="label" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="you@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input"
                    />
                </div>
                <div>
                    <label className="label" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full py-2.5"
                >
                    {loading ? 'Loading...' : 'Login'}
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
                Don&apos;t have an account?{' '}
                <Link
                    href="/register"
                    className="font-medium text-blue-600 hover:underline"
                >
                    Register
                </Link>
            </p>
        </div>
    );
}
