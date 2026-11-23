'use client';

import { useParams } from 'next/navigation';
import NoteForm from '@/components/NoteForm';

export default function EditNote() {
    const params = useParams<{ id: string }>();

    return <NoteForm noteId={params.id} />;
}
