# Study Hub

## Description

Study Hub is a full-stack web application designed for students to securely create, organize, and manage their personal study notes. Users can register for an account, log in, and create private notes containing a **Note Number, Title, Content, and Category**. Each note can be edited or deleted at any time, and only the logged-in user can access their own notes. The application also includes a movie search feature using a Movies API, allowing users to search for movies and view detailed information from their dashboard.

## Problem or Need for the Application

Students need a secure and organized platform where they can store, manage, and access their study notes from anywhere. Study Hub provides students with a private note system while allowing them to organize notes by category and search for movies, helping users find information in one application. *(Still to be added)*

## Group Members

| Name              
|--------------------|
|  Artur Calderon    | 
|  lily nkeiruka obicheozo |

## Tech Stack

- Next.js
- Tailwind CSS
- PostgreSQL on [Neon](https://neon.com) (using the `pg` package)
- Auth.js (NextAuth v5)
- TMDB API for the movie search

## Getting Started

1. Install the dependencies:

```bash
npm install
```

2. Copy `.env.example` to `.env.local` and fill in the values:

- `DATABASE_URL`: Neon pooled connection string (the host has `-pooler`)
- `DATABASE_URL_UNPOOLED`: Neon direct connection string (used only by `npm run db:setup`)
- `AUTH_SECRET`: generate one with `npx auth secret`
- `TMDB_API_KEY`: create an account at https://www.themoviedb.org and get an API key

3. Create the database tables:

```bash
npm run db:setup
```

4. Start the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Pages

- `/` - Home
- `/register` - Create an account
- `/login` - Login
- `/dashboard` - Notes and movie search
- `/notes/new` - Create a note
- `/notes/[id]/edit` - Edit a note
- `/categories` - Manage categories

## Database

The tables are defined in `db/schema.sql`:

- `users` - name, email, password (hashed)
- `categories` - name, description, linked to a user
- `notes` - note number, title, content, linked to a user and a category

## Deployment

The app is deployed on Vercel with the database on Neon.

1. Push the code to GitHub.
2. On Vercel, click **Add New > Project** and import the repository.
3. In **Environment Variables**, add `DATABASE_URL`, `AUTH_SECRET` and `TMDB_API_KEY` with the same values from `.env.local`.
4. Click **Deploy**.

The tables only need to be created once with `npm run db:setup`. They are already created in the Neon project, so there is nothing to run on Vercel.
