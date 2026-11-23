type Props = {
    name: string;
    description: string;
    onEdit: () => void;
    onDelete: () => void;
};

export default function CategoryCard({
    name,
    description,
    onEdit,
    onDelete,
}: Props) {
    return (
        <div className="card flex flex-col transition-colors hover:border-slate-300 hover:shadow-md">
            <h3 className="font-medium">{name}</h3>
            <p className="mt-1 flex-1 text-sm text-slate-500">
                {description || 'No description'}
            </p>
            <div className="mt-5 flex gap-2 border-t border-slate-200 pt-4">
                <button onClick={onEdit} className="btn-edit">
                    Edit
                </button>
                <button onClick={onDelete} className="btn-danger">
                    Delete
                </button>
            </div>
        </div>
    );
}
