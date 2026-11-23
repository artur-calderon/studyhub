import { auth } from '@/auth';
import pool from '@/lib/db';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    const session = await auth();
    if (!session?.user?.id) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    try {
        const result = await pool.query(
            `SELECT id, note_number AS "noteNumber", title, content,
                category_id AS "categoryId"
            FROM notes
            WHERE id = $1 AND user_id = $2`,
            [id, session.user.id],
        );
        if (result.rows.length === 0) {
            return Response.json({ error: 'Note not found' }, { status: 404 });
        }
        return Response.json(result.rows[0]);
    } catch {
        return Response.json({ error: 'Could not load note' }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    const session = await auth();
    if (!session?.user?.id) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const { noteNumber, title, content, categoryId } = await request.json();

    if (!noteNumber || !title || !content || !categoryId) {
        return Response.json(
            { error: 'All fields are required' },
            { status: 400 },
        );
    }

    try {
        const result = await pool.query(
            `UPDATE notes
            SET note_number = $1, title = $2, content = $3, category_id = $4,
                updated_at = NOW()
            WHERE id = $5 AND user_id = $6
            RETURNING *`,
            [noteNumber, title, content, categoryId, id, session.user.id],
        );
        if (result.rows.length === 0) {
            return Response.json({ error: 'Note not found' }, { status: 404 });
        }
        return Response.json(result.rows[0]);
    } catch {
        return Response.json(
            { error: 'Could not update note' },
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
        await pool.query('DELETE FROM notes WHERE id = $1 AND user_id = $2', [
            id,
            session.user.id,
        ]);
        return Response.json({ message: 'Note deleted' });
    } catch {
        return Response.json(
            { error: 'Could not delete note' },
            { status: 500 },
        );
    }
}
