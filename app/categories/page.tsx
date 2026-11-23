'use client';

import { useEffect, useState } from 'react';
import CategoryCard from '@/components/CategoryCard';

type Category = {
    id: number;
    name: string;
    description: string;
};

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [editingId, setEditingId] = useState<number | null>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    function loadCategories() {
        fetch('/api/categories')
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setCategories(data);
                }
                setLoading(false);
            });
    }

    useEffect(() => {
        loadCategories();
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');

        if (!name) {
            setError('Category name is required');
            return;
        }

        setSaving(true);

        const url = editingId
            ? `/api/categories/${editingId}`
            : '/api/categories';
        const method = editingId ? 'PUT' : 'POST';

        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, description }),
        });

        const data = await res.json();
        setSaving(false);

        if (!res.ok) {
            setError(data.error);
            return;
        }

        setName('');
        setDescription('');
        setEditingId(null);
        loadCategories();
    }

    function startEdit(category: Category) {
        setEditingId(category.id);
        setName(category.name);
        setDescription(category.description);
    }

    function cancelEdit() {
        setEditingId(null);
        setName('');
        setDescription('');
    }

    async function deleteCategory(id: number) {
        if (!confirm('Delete this category?')) {
            return;
        }

        const res = await fetch(`/api/categories/${id}`, {
            method: 'DELETE',
        });

        if (!res.ok) {
            alert('Could not delete category');
            return;
        }

        setCategories(categories.filter((cat) => cat.id !== id));
    }

    return (
        <div>
            <h1 className="text-2xl font-semibold tracking-tight">
                Categories
            </h1>
            <p className="mt-1 text-sm text-slate-500">
                Organize your notes by subject.
            </p>

            <div className="mt-8 grid items-start gap-8 lg:grid-cols-[320px_1fr]">
                <form onSubmit={handleSubmit} className="card space-y-4">
                    <h2 className="font-medium">
                        {editingId ? 'Edit category' : 'New category'}
                    </h2>
                    <div>
                        <label className="label" htmlFor="name">
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="e.g. Math"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="input"
                        />
                    </div>
                    <div>
                        <label className="label" htmlFor="description">
                            Description
                        </label>
                        <input
                            id="description"
                            type="text"
                            placeholder="Optional"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="input"
                        />
                    </div>

                    {error && <div className="error-box">{error}</div>}

                    <div className="flex gap-2">
                        <button
                            type="submit"
                            disabled={saving}
                            className="btn-primary flex-1"
                        >
                            {saving
                                ? 'Saving...'
                                : editingId
                                  ? 'Save Category'
                                  : 'Add Category'}
                        </button>
                        {editingId && (
                            <button
                                type="button"
                                onClick={cancelEdit}
                                className="btn-outline"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>

                <div>
                    {loading && (
                        <p className="text-sm text-slate-400">Loading...</p>
                    )}
                    {!loading && categories.length === 0 && (
                        <div className="rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center">
                            <p className="font-medium">No categories yet</p>
                            <p className="mt-1 text-sm text-slate-500">
                                Add your first category using the form.
                            </p>
                        </div>
                    )}

                    <div className="grid gap-4 sm:grid-cols-2">
                        {categories.map((category) => (
                            <CategoryCard
                                key={category.id}
                                name={category.name}
                                description={category.description}
                                onEdit={() => startEdit(category)}
                                onDelete={() => deleteCategory(category.id)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
