import { auth } from '@/auth';
import pool from '@/lib/db';

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    const session = await auth();
    if (!session?.user?.id) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const { name, description } = await request.json();

    if (!name) {
        return Response.json({ error: 'Name is required' }, { status: 400 });
    }

    try {
        const result = await pool.query(
            'UPDATE categories SET name = $1, description = $2 WHERE id = $3 AND user_id = $4 RETURNING *',
            [name, description, id, session.user.id],
        );
        if (result.rows.length === 0) {
            return Response.json(
                { error: 'Category not found' },
                { status: 404 },
            );
        }
        return Response.json(result.rows[0]);
    } catch {
        return Response.json(
            { error: 'Could not update category' },
            { status: 500 },
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    const session = await auth();
    if (!session?.user?.id) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    try {
        await pool.query(
            'DELETE FROM categories WHERE id = $1 AND user_id = $2',
            [id, session.user.id],
        );
        return Response.json({ message: 'Category deleted' });
    } catch {
        return Response.json(
            { error: 'Could not delete category' },
            { status: 500 },
        );
    }
}
