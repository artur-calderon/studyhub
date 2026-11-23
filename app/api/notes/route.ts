import { auth } from '@/auth';
import pool from '@/lib/db';

export async function GET() {
    const session = await auth();
    if (!session?.user?.id) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const result = await pool.query(
            `SELECT notes.id, notes.note_number AS "noteNumber", notes.title,
                notes.content, notes.category_id AS "categoryId",
                categories.name AS "categoryName"
            FROM notes
            LEFT JOIN categories ON categories.id = notes.category_id
            WHERE notes.user_id = $1
            ORDER BY notes.note_number`,
            [session.user.id],
        );
        return Response.json(result.rows);
    } catch {
        return Response.json(
            { error: 'Could not load notes' },
            { status: 500 },
        );
    }
}

export async function POST(request: Request) {
    const session = await auth();
    if (!session?.user?.id) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { noteNumber, title, content, categoryId } = await request.json();

    if (!noteNumber || !title || !content || !categoryId) {
        return Response.json(
            { error: 'All fields are required' },
            { status: 400 },
        );
    }

    try {
        const result = await pool.query(
            `INSERT INTO notes (note_number, title, content, category_id, user_id)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
            [noteNumber, title, content, categoryId, session.user.id],
        );
        return Response.json(result.rows[0], { status: 201 });
    } catch {
        return Response.json(
            { error: 'Could not create note' },
            { status: 500 },
        );
    }
}
