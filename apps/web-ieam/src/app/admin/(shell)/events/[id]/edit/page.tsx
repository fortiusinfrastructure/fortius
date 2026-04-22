import { notFound } from 'next/navigation';
import { requireAdminUser } from '@/lib/admin/auth';
import { getEventById } from '@/lib/admin/event-queries';
import { EditEventForm } from './EditEventForm';

interface Props {
    params: Promise<{ id: string }>;
}

export default async function EditEventPage({ params }: Props) {
    await requireAdminUser();
    const { id } = await params;
    const initialData = await getEventById(id);

    if (!initialData) notFound();

    return (
        <EditEventForm
            eventId={id}
            initialData={initialData}
            supabaseUrl={process.env.NEXT_PUBLIC_SUPABASE_URL!}
            supabaseAnonKey={process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}
        />
    );
}
