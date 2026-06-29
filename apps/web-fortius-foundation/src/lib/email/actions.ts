"use server";

import { createClient } from "@supabase/supabase-js";
import { getFoundationOrganizationId, sendEmail } from "@/lib/email";
import {
  getContactConfirmationHtml,
  getContactNotificationHtml,
  getDonationNotificationHtml,
  getDonationConfirmationHtml,
  getNewsletterConfirmationHtml,
  getNewsletterNotificationHtml,
} from "@/lib/email/templates";

const NOTIFICATION_EMAIL = "info@fundacionfortius.org";
const ORG_SLUG = process.env.NEXT_PUBLIC_ORG_SLUG || "fortius-foundation";
const NEWSLETTER_ERROR_MESSAGE = "No hemos podido completar la suscripción. Inténtalo de nuevo.";
const MAX_ATTACHMENT_SIZE = 8 * 1024 * 1024;
const ALLOWED_ATTACHMENT_EXTENSIONS = new Set(["pdf", "doc", "docx", "txt", "md"]);

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

function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { firstName: "", lastName: "" };
  if (parts.length === 1) return { firstName: parts[0], lastName: "-" };
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

async function normalizeAttachment(fileEntry: FormDataEntryValue | null) {
  if (!(fileEntry instanceof File) || fileEntry.size === 0) return null;
  const fileName = fileEntry.name || "adjunto";
  const extension = fileName.split(".").pop()?.toLowerCase() ?? "";

  if (!ALLOWED_ATTACHMENT_EXTENSIONS.has(extension)) {
    throw new Error("El adjunto debe estar en formato PDF, DOC, DOCX, TXT o MD.");
  }
  if (fileEntry.size > MAX_ATTACHMENT_SIZE) {
    throw new Error("El archivo adjunto no puede superar los 8 MB.");
  }

  const buffer = Buffer.from(await fileEntry.arrayBuffer());
  return {
    file: fileEntry,
    encoded: buffer.toString("base64"),
  };
}

export async function submitFoundationContact(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const organization = String(formData.get("organization") ?? "").trim();
  const attachment = await normalizeAttachment(formData.get("attachment"));

  if (!name || !email || !subject || !message) {
    throw new Error("Missing required contact fields.");
  }

  const organizationId = await getFoundationOrganizationId();
  if (!organizationId) {
    throw new Error("Foundation organization lookup failed.");
  }

  const { firstName, lastName } = splitName(name);
  const finalMessageParts = [] as string[];

  if (organization) finalMessageParts.push(`Organización: ${organization}`);
  finalMessageParts.push(message);
  if (attachment) finalMessageParts.push(`Archivo adjunto: ${attachment.file.name}`);

  const finalMessage = finalMessageParts.join("\n\n");
  const admin = createAdminClient();

  const { data: submission, error: insertError } = await admin
    .from("contact_submissions")
    .insert({
      organization_id: organizationId,
      first_name: firstName,
      last_name: lastName,
      email,
      subject,
      message: finalMessage,
      status: "new",
    })
    .select("id")
    .single();

  if (insertError || !submission) {
    console.error("[submitFoundationContact] insert failed", insertError);
    throw new Error("Contact insert failed.");
  }

  const notificationSubject = `Nuevo contacto web · ${subject}`;

  const notificationResult = await sendEmail({
    to: NOTIFICATION_EMAIL,
    replyTo: email,
    subject: notificationSubject,
    kind: "contact_notification",
    relatedTable: "contact_submissions",
    relatedId: submission.id,
    metadata: {
      source: "web-fortius-foundation",
      contactEmail: email,
      contactSubject: subject,
      organization: organization || null,
    },
    html: getContactNotificationHtml({
      name,
      email,
      subject,
      organization,
      message,
      attachmentName: attachment?.file.name,
    }),
    attachments: attachment
      ? [
          {
            filename: attachment.file.name,
            content: attachment.encoded,
            content_type: attachment.file.type || undefined,
          },
        ]
      : undefined,
  });

  if (!notificationResult.success) {
    console.error("[submitFoundationContact] notification failed", notificationResult.error);
  }

  const confirmationResult = await sendEmail({
    to: email,
    replyTo: NOTIFICATION_EMAIL,
    subject: "Hemos recibido tu mensaje — Fundación Fortius",
    html: getContactConfirmationHtml({ name, subject }),
    kind: "contact_confirmation",
    relatedTable: "contact_submissions",
    relatedId: submission.id,
    metadata: {
      source: "web-fortius-foundation",
      contactSubject: subject,
    },
  });

  if (!confirmationResult.success) {
    console.error("[submitFoundationContact] confirmation failed", confirmationResult.error);
  }

  return {
    success: true,
    message: "Tu mensaje ha quedado registrado. El equipo de la Fundación te responderá lo antes posible.",
  };
}

// ─── Donation interest form ───────────────────────────────────────────────────

export async function submitDonationInterest(formData: FormData): Promise<{
  success: boolean;
  message: string;
}> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const organization = String(formData.get("organization") ?? "").trim();
  const amount = String(formData.get("amount") ?? "").trim();
  const entity = String(formData.get("entity") ?? "").trim();
  const target = String(formData.get("target") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();

  if (!name || !email || !entity || !target) {
    return { success: false, message: "Por favor, completa los campos obligatorios." };
  }

  const [notifResult, confirmResult] = await Promise.all([
    sendEmail({
      to: NOTIFICATION_EMAIL,
      replyTo: email,
      subject: `Nuevo interés de donación · ${entity} · ${target}`,
      html: getDonationNotificationHtml({ name, email, entity, target, amount, organization, notes }),
      kind: "donation_interest_notification",
      metadata: { entity, target, amount: amount || null },
    }),
    sendEmail({
      to: email,
      replyTo: NOTIFICATION_EMAIL,
      subject: "Hemos recibido tu interés de donación — Fundación Fortius",
      html: getDonationConfirmationHtml({ name, entity, target }),
      kind: "donation_interest_confirmation",
      metadata: { entity, target },
    }),
  ]);

  if (!notifResult.success) {
    console.error("[submitDonationInterest] notification failed", notifResult.error);
    return {
      success: false,
      message: "No hemos podido procesar tu solicitud. Por favor, escríbenos a info@fundacionfortius.org.",
    };
  }

  if (!confirmResult.success) {
    console.error("[submitDonationInterest] confirmation email failed", confirmResult.error);
  }

  return {
    success: true,
    message: confirmResult.success
      ? "¡Gracias! Hemos recibido tu interés y te hemos enviado un email de confirmación."
      : "¡Gracias! Hemos recibido tu interés. Nos pondremos en contacto contigo pronto.",
  };
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function subscribeToNewsletter(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!isValidEmail(email)) {
    return { success: false, message: "Introduce un email válido." };
  }

  try {
    const admin = createAdminClient();
    const { data: organizationRow, error: orgError } = await admin
      .from("organizations")
      .select("id")
      .eq("slug", ORG_SLUG)
      .single();

    if (orgError || !organizationRow) {
      console.error("[subscribeToNewsletter] organization lookup failed", orgError);
      throw new Error("Organization lookup failed.");
    }

    const organizationId = organizationRow.id;
    const now = new Date().toISOString();
    const subscriptionData = {
      organization_id: organizationId,
      email,
      status: "active",
      source: "website",
      metadata: { source: "web-fortius-foundation" },
      confirmed_at: now,
      updated_at: now,
    };

    const { data: existingRows, error: findError } = await admin
      .from("newsletter_subscriptions")
      .select("id")
      .eq("organization_id", organizationId)
      .eq("email", email)
      .order("updated_at", { ascending: false })
      .limit(1);

    if (findError) {
      console.error("[subscribeToNewsletter] subscription lookup failed", findError);
      throw new Error("Newsletter lookup failed.");
    }

    let subscriptionId: string;
    const existingSubscription = existingRows?.[0];

    if (existingSubscription) {
      const { data: updated, error: updateError } = await admin
        .from("newsletter_subscriptions")
        .update(subscriptionData)
        .eq("id", existingSubscription.id)
        .select("id")
        .single();
      if (updateError || !updated) {
        console.error("[subscribeToNewsletter] update failed", updateError);
        throw new Error("Newsletter update failed.");
      }
      subscriptionId = updated.id;
    } else {
      const { data: inserted, error: insertError } = await admin
        .from("newsletter_subscriptions")
        .insert(subscriptionData)
        .select("id")
        .single();
      if (insertError || !inserted) {
        console.error("[subscribeToNewsletter] insert failed", insertError);
        throw new Error("Newsletter insert failed.");
      }
      subscriptionId = inserted.id;
    }

    const internalResult = await sendEmail({
      to: NOTIFICATION_EMAIL,
      replyTo: email,
      subject: "Nueva suscripción al boletín — Fundación Fortius",
      html: getNewsletterNotificationHtml(email),
      kind: "newsletter_notification",
      relatedTable: "newsletter_subscriptions",
      relatedId: subscriptionId,
      metadata: { source: "web-fortius-foundation" },
    });

    if (!internalResult.success) {
      console.error("[subscribeToNewsletter] internal notification failed", internalResult.error);
    }

    const confirmationResult = await sendEmail({
      to: email,
      replyTo: NOTIFICATION_EMAIL,
      subject: "Suscripción confirmada — Fundación Fortius",
      html: getNewsletterConfirmationHtml(email),
      kind: "newsletter_confirmation",
      relatedTable: "newsletter_subscriptions",
      relatedId: subscriptionId,
      metadata: { source: "web-fortius-foundation" },
    });

    if (!confirmationResult.success) {
      console.error("[subscribeToNewsletter] confirmation failed", confirmationResult.error);
    }

    return {
      success: true,
      message: confirmationResult.success
        ? "Te hemos suscrito al boletín y te hemos enviado un email de confirmación."
        : "Te hemos suscrito al boletín correctamente.",
    };
  } catch (error) {
    console.error("[subscribeToNewsletter] failed", error);
    return { success: false, message: NEWSLETTER_ERROR_MESSAGE };
  }
}