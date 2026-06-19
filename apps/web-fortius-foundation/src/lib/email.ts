"use server";

import { createClient } from "@supabase/supabase-js";

const ORG_DOMAIN = "fundacionfortius.org";
const RESEND_API_URL = "https://api.resend.com/emails";
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ||
  "Fortius Foundation <noreply@fundacionfortius.org>";

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

let cachedOrganizationId: string | null | undefined;

export async function getFoundationOrganizationId() {
  if (cachedOrganizationId !== undefined) return cachedOrganizationId;

  const admin = createAdminClient();

  const { data: byDomain } = await admin
    .from("organizations")
    .select("id")
    .eq("domain", ORG_DOMAIN)
    .maybeSingle();

  if (byDomain?.id) {
    cachedOrganizationId = byDomain.id;
    return cachedOrganizationId;
  }

  const { data: byName } = await admin
    .from("organizations")
    .select("id")
    .ilike("name", "%Fundación Fortius%")
    .limit(1)
    .maybeSingle();

  cachedOrganizationId = byName?.id ?? null;
  return cachedOrganizationId;
}

async function logEmailAttempt({
  to,
  subject,
  kind,
  status,
  providerMessageId,
  relatedTable,
  relatedId,
  metadata,
}: {
  to: string;
  subject: string;
  kind: string;
  status: "sent" | "failed";
  providerMessageId?: string | null;
  relatedTable?: string;
  relatedId?: string;
  metadata?: Record<string, unknown>;
}) {
  try {
    const organizationId = await getFoundationOrganizationId();
    if (!organizationId) return;

    await createAdminClient().from("communication_logs").insert({
      organization_id: organizationId,
      channel: "email",
      kind,
      recipient_email: to,
      subject,
      status,
      provider: "resend",
      provider_message_id: providerMessageId ?? null,
      related_table: relatedTable ?? null,
      related_id: relatedId ?? null,
      metadata: metadata ?? {},
    });
  } catch (error) {
    console.error("[foundation-email] failed to persist communication log", error);
  }
}

export async function sendEmail({
  to,
  replyTo,
  subject,
  html,
  kind,
  attachments,
  relatedTable,
  relatedId,
  metadata,
}: {
  to: string;
  replyTo?: string;
  subject: string;
  html: string;
  kind: string;
  attachments?: Array<{
    filename: string;
    content: string;
    content_type?: string;
  }>;
  relatedTable?: string;
  relatedId?: string;
  metadata?: Record<string, unknown>;
}) {
  if (!process.env.RESEND_API_KEY) {
    await logEmailAttempt({
      to,
      subject,
      kind,
      status: "failed",
      relatedTable,
      relatedId,
      metadata: {
        ...(metadata ?? {}),
        error: "missing_resend_api_key",
      },
    });

    return { success: false, error: "missing_resend_api_key" };
  }

  try {
    const response = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [to],
        subject,
        html,
        ...(replyTo ? { reply_to: replyTo } : {}),
        attachments,
      }),
    });

    const result = (await response.json()) as {
      id?: string;
      message?: string;
      name?: string;
    };

    if (!response.ok) {
      await logEmailAttempt({
        to,
        subject,
        kind,
        status: "failed",
        relatedTable,
        relatedId,
        metadata: {
          ...(metadata ?? {}),
          error: result.message ?? result.name ?? "resend_request_failed",
        },
      });

      return { success: false, error: result.message ?? result.name };
    }

    await logEmailAttempt({
      to,
      subject,
      kind,
      status: "sent",
      providerMessageId: result.id ?? null,
      relatedTable,
      relatedId,
      metadata,
    });

    return { success: true, id: result.id };
  } catch (error) {
    await logEmailAttempt({
      to,
      subject,
      kind,
      status: "failed",
      relatedTable,
      relatedId,
      metadata: {
        ...(metadata ?? {}),
        error: error instanceof Error ? error.message : "unknown_error",
      },
    });

    return { success: false, error };
  }
}