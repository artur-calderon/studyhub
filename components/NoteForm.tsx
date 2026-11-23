'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Category = {
    id: number;
    name: string;
};

type Props = {
    noteId?: string;
};

export default function NoteForm({ noteId }: Props) {
    const router = useRouter();
    const [noteNumber, setNoteNumber] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch('/api/categories')
            .then((res) => res.json())
            .then((data) => {
                if (!data.error) {
                    setCategories(data);
                }
            });

        if (noteId) {
            fetch(`/api/notes/${noteId}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.error) {
                        setError(data.error);
                        return;
                    }
                    setNoteNumber(String(data.noteNumber));
                    setTitle(data.title);
                    setContent(data.content);
                    setCategoryId(
                        data.categoryId ? String(data.categoryId) : '',
                    );
                });
        }
    }, [noteId]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');

        if (!noteNumber || !title || !content || !categoryId) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);

        const url = noteId ? `/api/notes/${noteId}` : '/api/notes';
        const method = noteId ? 'PUT' : 'POST';

        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                noteNumber: Number(noteNumber),
                title,
                content,
                categoryId: Number(categoryId),
            }),
        });

        const data = await res.json();
        setLoading(false);

        if (!res.ok) {
            setError(data.error);
            return;
        }

        router.push('/dashboard');
    }

    return (
        <form onSubmit={handleSubmit} className="card space-y-5">
            <div className="grid gap-5 sm:grid-cols-[120px_1fr]">
                <div>
                    <label className="label" htmlFor="noteNumber">
                        Number
                    </label>
                    <input
                        id="noteNumber"
                        type="number"
                        placeholder="1"
                        value={noteNumber}
                        onChange={(e) => setNoteNumber(e.target.value)}
                        className="input"
                    />
                </div>
                <div>
                    <label className="label" htmlFor="title">
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        placeholder="What is this note about?"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="input"
                    />
                </div>
            </div>

            <div>
                <label className="label" htmlFor="category">
                    Category
                </label>
                <select
                    id="category"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="input"
                >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
                {categories.length === 0 && (
                    <p className="mt-2 text-xs text-slate-400">
                        You need to create a category first on the{' '}
                        <Link
                            href="/categories"
                            className="font-medium text-blue-600 underline"
                        >
                            Categories
                        </Link>{' '}
                        page.
                    </p>
                )}
            </div>

            <div>
                <label className="label" htmlFor="content">
                    Content
                </label>
                <textarea
                    id="content"
                    placeholder="Write your note..."
                    rows={10}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="input resize-y"
                />
            </div>

            {error && <div className="error-box">{error}</div>}

            <div className="flex justify-end gap-2 border-t border-slate-200 pt-5">
                <button
                    type="button"
                    onClick={() => router.push('/dashboard')}
                    className="btn-outline"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary"
                >
                    {loading ? 'Saving...' : 'Save note'}
                </button>
            </div>
        </form>
    );
}
