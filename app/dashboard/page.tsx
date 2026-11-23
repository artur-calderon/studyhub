'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import NoteCard from '@/components/NoteCard';
import MovieSearch from '@/components/MovieSearch';

type Note = {
    id: number;
    noteNumber: number;
    title: string;
    content: string;
    categoryName: string | null;
};

export default function DashboardPage() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('/api/notes')
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setNotes(data);
                }
                setLoading(false);
            });
    }, []);

    async function deleteNote(id: number) {
        if (!confirm('Delete this note?')) {
            return;
        }

        const res = await fetch(`/api/notes/${id}`, { method: 'DELETE' });

        if (!res.ok) {
            alert('Could not delete note');
            return;
        }

        setNotes(notes.filter((note) => note.id !== id));
    }

    return (
        <div className="space-y-16">
            <section>
                <div className="flex items-end justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            My notes
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">
                            {notes.length}{' '}
                            {notes.length === 1 ? 'note' : 'notes'}
                        </p>
                    </div>
                    <Link href="/notes/new" className="btn-primary">
                        + Add Note
                    </Link>
                </div>

                {loading && (
                    <p className="mt-8 text-sm text-slate-400">Loading...</p>
                )}
                {error && <div className="error-box mt-8">{error}</div>}
                {!loading && !error && notes.length === 0 && (
                    <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center">
                        <p className="font-medium">No notes yet</p>
                        <p className="mt-1 text-sm text-slate-500">
                            Create your first note to get started.
                        </p>
                    </div>
                )}

                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {notes.map((note) => (
                        <NoteCard
                            key={note.id}
                            id={note.id}
                            noteNumber={note.noteNumber}
                            title={note.title}
                            content={note.content}
                            category={note.categoryName || 'No category'}
                            onDelete={deleteNote}
                        />
                    ))}
                </div>
            </section>

            <MovieSearch />
        </div>
    );
}
