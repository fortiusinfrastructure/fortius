"use server";

import { createClient } from "@supabase/supabase-js";
import {
  getFoundationOrganizationId,
  sendEmail,
} from "@/lib/email";
import {
  getContactConfirmationHtml,
  getContactNotificationHtml,
} from "@/lib/email-templates";

const NOTIFICATION_EMAIL = "info@fundacionfortius.org";
const MAX_ATTACHMENT_SIZE = 8 * 1024 * 1024;
const ALLOWED_ATTACHMENT_EXTENSIONS = new Set([
  "pdf",
  "doc",
  "docx",
  "txt",
  "md",
]);

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

  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" "),
  };
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
    throw new Error(
      "El adjunto debe estar en formato PDF, DOC, DOCX, TXT o MD.",
    );
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

  if (organization) {
    finalMessageParts.push(`Organización: ${organization}`);
  }

  finalMessageParts.push(message);

  if (attachment) {
    finalMessageParts.push(`Archivo adjunto: ${attachment.file.name}`);
  }

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
    console.error(
      "[submitFoundationContact] notification failed",
      notificationResult.error,
    );
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
    console.error(
      "[submitFoundationContact] confirmation failed",
      confirmationResult.error,
    );
  }

  return {
    success: true,
    message:
      "Tu mensaje ha quedado registrado. El equipo de la Fundación te responderá lo antes posible.",
  };
}