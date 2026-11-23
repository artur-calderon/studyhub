'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';

const linkClass =
    'text-sm text-slate-500 hover:text-slate-900 transition-colors';

export default function Navbar() {
    const { data: session } = useSession();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
                <Link
                    href="/"
                    className="flex items-center gap-2 font-semibold"
                >
                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-600 text-sm text-white">
                        S
                    </span>
                    Study Hub
                </Link>

                <button
                    className="btn-outline md:hidden"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? 'Close' : 'Menu'}
                </button>

                <div
                    className={`${menuOpen ? 'flex' : 'hidden'} absolute left-0 right-0 top-16 flex-col items-start gap-4 border-b border-slate-200 bg-white px-4 py-4 md:static md:flex md:flex-row md:items-center md:gap-6 md:border-0 md:bg-transparent md:p-0`}
                >
                    {session ? (
                        <>
                            <Link
                                href="/dashboard"
                                className={linkClass}
                                onClick={() => setMenuOpen(false)}
                            >
                                Dashboard
                            </Link>
                            <Link
                                href="/categories"
                                className={linkClass}
                                onClick={() => setMenuOpen(false)}
                            >
                                Categories
                            </Link>
                            <button
                                onClick={() => signOut({ callbackUrl: '/' })}
                                className="btn-danger"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className={linkClass}
                                onClick={() => setMenuOpen(false)}
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="btn-primary"
                                onClick={() => setMenuOpen(false)}
                            >
                                Get started
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
