'use client';

import { useState } from 'react';
import MovieCard from './MovieCard';

type Movie = {
    id: number;
    title: string;
    description: string;
    releaseDate: string;
    rating: number;
};

export default function MovieSearch() {
    const [search, setSearch] = useState('');
    const [movies, setMovies] = useState<Movie[]>([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        setError('');

        if (!search) {
            setError('Type a movie name');
            return;
        }

        setLoading(true);
        const res = await fetch(
            `/api/movies?search=${encodeURIComponent(search)}`,
        );
        const data = await res.json();
        setLoading(false);

        if (!res.ok) {
            setError(data.error);
            setMovies([]);
            return;
        }

        setMovies(data);
    }

    return (
        <section>
            <h2 className="text-lg font-semibold">Search movies</h2>
            <p className="mt-1 text-sm text-slate-500">
                Need a break? Find something to watch.
            </p>

            <form
                onSubmit={handleSearch}
                className="mt-4 flex flex-col gap-2 sm:flex-row"
            >
                <input
                    type="text"
                    placeholder="Search for a movie..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="input flex-1"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary px-6"
                >
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </form>

            {error && <div className="error-box mt-4">{error}</div>}

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        title={movie.title}
                        description={movie.description}
                        releaseDate={movie.releaseDate}
                        rating={movie.rating}
                    />
                ))}
            </div>
        </section>
    );
}
