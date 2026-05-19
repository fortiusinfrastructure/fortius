import { createClient } from "@supabase/supabase-js";

let cachedOrgId: string | null | undefined;

function createAdminClient() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
            },
        },
    );
}

export async function getWebhookOrganizationId(orgSlug = "fortius-consulting") {
    if (cachedOrgId !== undefined && orgSlug === "fortius-consulting") return cachedOrgId;

    const admin = createAdminClient();
    const { data } = await admin.from("organizations").select("id").eq("slug", orgSlug).single();
    const orgId = data?.id ?? null;

    if (orgSlug === "fortius-consulting") cachedOrgId = orgId;
    return orgId;
}

export async function recordStripeEvent(eventId: string, eventType: string, organizationId: string | null) {
    const admin = createAdminClient();
    const { error } = await admin.from("stripe_events").insert({
        event_id: eventId,
        event_type: eventType,
        organization_id: organizationId,
    });

    if (!error) return true;
    if (error.code === "23505") return false;
    throw error;
}