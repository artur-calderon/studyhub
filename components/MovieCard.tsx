type Props = {
    title: string;
    description: string;
    releaseDate: string;
    rating: number;
};

export default function MovieCard({
    title,
    description,
    releaseDate,
    rating,
}: Props) {
    return (
        <div className="card">
            <div className="flex items-start justify-between gap-4">
                <h3 className="font-medium">{title}</h3>
                <span className="shrink-0 rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                    ★ {rating.toFixed(1)}
                </span>
            </div>
            <p className="mt-1 text-xs text-slate-400">
                {releaseDate || 'Unknown release date'}
            </p>
            <p className="mt-3 line-clamp-3 text-sm text-slate-500">
                {description || 'No description available.'}
            </p>
        </div>
    );
}
