'use server';

import { revalidatePath } from 'next/cache';
import { createAdminClient } from '@fortius/database';
import { requireAdminUser } from './auth';
import { getAdminOrganization } from './org';

export async function updateAttendanceAction(formData: FormData) {
    await requireAdminUser();

    const registrationId = formData.get('registrationId');
    const attendanceStatus = formData.get('attendanceStatus');

    if (typeof registrationId !== 'string' || typeof attendanceStatus !== 'string') {
        throw new Error('Datos de asistencia inválidos');
    }

    const org = await getAdminOrganization();
    const admin = createAdminClient();
    await admin
        .from('event_registrations')
        .update({
            attendance_status: attendanceStatus,
            attended_at: attendanceStatus === 'attended' ? new Date().toISOString() : null,
        })
        .eq('id', registrationId)
        .eq('organization_id', org.id);

    revalidatePath('/admin/events');
}