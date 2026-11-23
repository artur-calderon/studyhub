import Link from 'next/link';
import NoteForm from '@/components/NoteForm';

export default function NewNotePage() {
    return (
        <div className="mx-auto max-w-2xl">
            <Link
                href="/dashboard"
                className="text-sm text-slate-500 hover:text-slate-900"
            >
                ← Back to notes
            </Link>
            <h1 className="mb-6 mt-4 text-2xl font-semibold tracking-tight">
                New note
            </h1>
            <NoteForm />
        </div>
    );
}
