"use server";

const WEB3FORMS_API_URL = "https://api.web3forms.com/submit";

interface Web3FormsContactInput {
    name: string;
    email: string;
    subject: string;
    message: string;
    organization?: string;
    contextVertical?: string;
    contextPlan?: string;
}

interface Web3FormsResponse {
    success?: boolean;
    message?: string;
}

interface Web3FormsField {
    name: string;
    value?: string;
}

async function sendWeb3FormsNotification({
    fromName,
    email,
    subject,
    message,
    fields = [],
}: {
    fromName: string;
    email: string;
    subject: string;
    message: string;
    fields?: Web3FormsField[];
}) {
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
        return { success: false, error: "missing_web3forms_access_key" };
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
        const payload = new FormData();
        payload.append("access_key", accessKey);
        payload.append("subject", subject);
        payload.append("from_name", fromName);
        payload.append("name", fromName);
        payload.append("email", email);
        payload.append("message", message);
        payload.append("botcheck", "");

        for (const field of fields) {
            payload.append(field.name, field.value || "No indicado");
        }

        const response = await fetch(WEB3FORMS_API_URL, {
            method: "POST",
            body: payload,
            signal: controller.signal,
        });
        const result = (await response.json()) as Web3FormsResponse;

        if (!response.ok || !result.success) {
            return {
                success: false,
                error: result.message || "web3forms_request_failed",
            };
        }

        return { success: true };
    } catch (error) {
        const message = error instanceof Error ? error.message : "unknown_error";
        return { success: false, error: message };
    } finally {
        clearTimeout(timeoutId);
    }
}

export async function sendContactNotificationWithWeb3Forms({
    name,
    email,
    subject,
    message,
    organization,
    contextVertical,
    contextPlan,
}: Web3FormsContactInput) {
    return sendWeb3FormsNotification({
        fromName: name,
        email,
        subject: `Nuevo contacto web · ${subject}`,
        message,
        fields: [
            { name: "organization", value: organization },
            { name: "area", value: contextVertical || "General" },
            { name: "plan", value: contextPlan },
        ],
    });
}

export async function sendNewsletterNotificationWithWeb3Forms(email: string) {
    return sendWeb3FormsNotification({
        fromName: "Fortius Consulting",
        email,
        subject: "Nueva suscripción al boletín — Fortius Consulting",
        message: `Nueva suscripción al boletín:\n\nEmail: ${email}`,
        fields: [{ name: "source", value: "web-fortius-consulting" }],
    });
}