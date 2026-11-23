import Link from 'next/link';

type Props = {
    id: number;
    noteNumber: number;
    title: string;
    content: string;
    category: string;
    onDelete: (id: number) => void;
};

export default function NoteCard({
    id,
    noteNumber,
    title,
    content,
    category,
    onDelete,
}: Props) {
    return (
        <div className="card flex flex-col transition-colors hover:border-slate-300 hover:shadow-md">
            <div className="flex items-center justify-between text-xs">
                <span className="rounded-md bg-blue-50 px-2 py-1 font-medium text-blue-700">
                    {category}
                </span>
                <span className="text-slate-400">#{noteNumber}</span>
            </div>
            <h3 className="mt-4 font-medium">{title}</h3>
            <p className="mt-2 line-clamp-4 flex-1 whitespace-pre-wrap text-sm text-slate-500">
                {content}
            </p>
            <div className="mt-5 flex gap-2 border-t border-slate-200 pt-4">
                <Link href={`/notes/${id}/edit`} className="btn-edit">
                    Edit
                </Link>
                <button onClick={() => onDelete(id)} className="btn-danger">
                    Delete
                </button>
            </div>
        </div>
    );
}
