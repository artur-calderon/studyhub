import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import pool from './lib/db';

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                const result = await pool.query(
                    'SELECT * FROM users WHERE email = $1',
                    [credentials.email],
                );
                const user = result.rows[0];
                if (!user) {
                    return null;
                }

                const passwordOk = await bcrypt.compare(
                    credentials.password as string,
                    user.password,
                );
                if (!passwordOk) {
                    return null;
                }

                return {
                    id: String(user.id),
                    name: user.name,
                    email: user.email,
                };
            },
        }),
    ],
    pages: {
        signIn: '/login',
    },
    callbacks: {
        session({ session, token }) {
            session.user.id = token.sub as string;
            return session;
        },
    },
});
