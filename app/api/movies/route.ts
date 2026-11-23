export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');

    if (!search) {
        return Response.json(
            { error: 'Type something to search' },
            { status: 400 },
        );
    }

    try {
        const res = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(search)}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
                },
            },
        );

        if (!res.ok) {
            return Response.json(
                { error: 'Could not search movies' },
                { status: 500 },
            );
        }

        const data = await res.json();

        const movies = data.results.map(
            (movie: {
                id: number;
                title: string;
                overview: string;
                release_date: string;
                vote_average: number;
            }) => ({
                id: movie.id,
                title: movie.title,
                description: movie.overview,
                releaseDate: movie.release_date,
                rating: movie.vote_average,
            }),
        );

        return Response.json(movies);
    } catch {
        return Response.json(
            { error: 'Could not search movies' },
            { status: 500 },
        );
    }
}
