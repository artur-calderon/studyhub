import bcrypt from 'bcryptjs';
import pool from '@/lib/db';

export async function POST(request: Request) {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
        return Response.json(
            { error: 'All fields are required' },
            { status: 400 },
        );
    }

    if (!email.includes('@')) {
        return Response.json({ error: 'Invalid email' }, { status: 400 });
    }

    if (password.length < 6) {
        return Response.json(
            { error: 'Password must have at least 6 characters' },
            { status: 400 },
        );
    }

    try {
        const userExists = await pool.query(
            'SELECT id FROM users WHERE email = $1',
            [email],
        );
        if (userExists.rows.length > 0) {
            return Response.json(
                { error: 'This email is already registered' },
                { status: 400 },
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
            [name, email, hashedPassword],
        );

        return Response.json({ message: 'User created' }, { status: 201 });
    } catch {
        return Response.json(
            { error: 'Something went wrong' },
            { status: 500 },
        );
    }
}
