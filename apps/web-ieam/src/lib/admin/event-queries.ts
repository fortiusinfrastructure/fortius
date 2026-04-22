import { createAdminClient } from '@fortius/database';
import type { EventFormData } from '@fortius/admin-ui';

export async function getEventById(activityId: string): Promise<Partial<EventFormData> | null> {
    const admin = createAdminClient();
    const { data } = await admin
        .from('activities')
        .select('*, activity_speakers(*)')
        .eq('id', activityId)
        .single();

    if (!data) return null;

    type RawSpeaker = {
        name: string;
        role_es: string | null;
        role_en: string | null;
        group_name_es: string | null;
        group_name_en: string | null;
    };

    const rawAgenda = Array.isArray(data.agenda) ? data.agenda : [];

    return {
        slug: data.slug,
        title_es: data.title_es,
        title_en: data.title_en ?? '',
        subtitle_es: data.subtitle_es ?? '',
        subtitle_en: data.subtitle_en ?? '',
        excerpt_es: data.excerpt_es ?? '',
        excerpt_en: data.excerpt_en ?? '',
        content_es: data.content_es,
        content_en: data.content_en ?? '',
        category: data.type ?? '',
        format: data.format ?? '',
        format_en: data.format_en ?? '',
        event_date: data.event_date,
        end_date: data.end_date ?? '',
        location: data.location ?? '',
        organizer: data.organizer ?? 'IEAM',
        image_url: data.image_url ?? '',
        highlight_image_url: data.highlight_image_url ?? '',
        agenda_title_es: data.agenda_title_es ?? 'Programa del evento',
        agenda_title_en: data.agenda_title_en ?? 'Event Programme',
        agenda: rawAgenda.map((item: { time?: string; title?: string; title_en?: string; speaker?: string; speaker_en?: string }) => ({
            time: item.time ?? '',
            title: item.title ?? '',
            title_en: item.title_en ?? '',
            speaker: item.speaker ?? '',
            speaker_en: item.speaker_en ?? '',
        })),
        registration_open: data.registration_open ?? false,
        is_featured: data.is_featured ?? false,
        status: (data.status as 'draft' | 'published' | 'archived') ?? 'draft',
        speakers: (data.activity_speakers as RawSpeaker[]).map((s) => ({
            name: s.name,
            role_es: s.role_es ?? '',
            role_en: s.role_en ?? '',
            group_name_es: s.group_name_es ?? '',
            group_name_en: s.group_name_en ?? '',
        })),
    };
}
