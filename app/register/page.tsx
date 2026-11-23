'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');

        if (!name || !email || !password) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);

        const res = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();
        setLoading(false);

        if (!res.ok) {
            setError(data.error);
            return;
        }

        router.push('/login');
    }

    return (
        <div className="mx-auto max-w-sm py-10">
            <h1 className="text-2xl font-semibold tracking-tight">
                Create your account
            </h1>
            <p className="mt-1 text-sm text-slate-500">
                Start organizing your study notes today.
            </p>

            <form onSubmit={handleSubmit} className="card mt-8 space-y-4">
                {error && <div className="error-box">{error}</div>}

                <div>
                    <label className="label" htmlFor="name">
                        Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input"
                    />
                </div>
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
                        placeholder="At least 6 characters"
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
                    {loading ? 'Loading...' : 'Create account'}
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
                Already have an account?{' '}
                <Link
                    href="/login"
                    className="font-medium text-blue-600 hover:underline"
                >
                    Login
                </Link>
            </p>
        </div>
    );
}
