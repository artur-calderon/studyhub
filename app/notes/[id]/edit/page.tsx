import { Suspense } from 'react';
import Link from 'next/link';
import EditNote from './EditNote';

export default function EditNotePage() {
    return (
        <div className="mx-auto max-w-2xl">
            <Link
                href="/dashboard"
                className="text-sm text-slate-500 hover:text-slate-900"
            >
                ← Back to notes
            </Link>
            <h1 className="mb-6 mt-4 text-2xl font-semibold tracking-tight">
                Edit note
            </h1>
            <Suspense
                fallback={<p className="text-sm text-slate-400">Loading...</p>}
            >
                <EditNote />
            </Suspense>
        </div>
    );
}
