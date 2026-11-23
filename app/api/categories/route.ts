import { auth } from '@/auth';
import pool from '@/lib/db';

export async function GET() {
    const session = await auth();
    if (!session?.user?.id) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const result = await pool.query(
            'SELECT id, name, description FROM categories WHERE user_id = $1 ORDER BY name',
            [session.user.id],
        );
        return Response.json(result.rows);
    } catch {
        return Response.json(
            { error: 'Could not load categories' },
            { status: 500 },
        );
    }
}

export async function POST(request: Request) {
    const session = await auth();
    if (!session?.user?.id) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, description } = await request.json();

    if (!name) {
        return Response.json({ error: 'Name is required' }, { status: 400 });
    }

    try {
        const result = await pool.query(
            'INSERT INTO categories (name, description, user_id) VALUES ($1, $2, $3) RETURNING *',
            [name, description, session.user.id],
        );
        return Response.json(result.rows[0], { status: 201 });
    } catch {
        return Response.json(
            { error: 'Could not create category' },
            { status: 500 },
        );
    }
}
