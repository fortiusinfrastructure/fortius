import { createAdminClient } from '@fortius/database';

export const EH_ORG_SLUG = 'escuela-hispanica';

export async function getAdminOrganization() {
    const admin = createAdminClient();
    const { data } = await admin
        .from('organizations')
        .select('id, name, slug')
        .eq('slug', EH_ORG_SLUG)
        .single();

    if (!data) {
        throw new Error('Organización Escuela Hispánica no encontrada');
    }

    return data;
}