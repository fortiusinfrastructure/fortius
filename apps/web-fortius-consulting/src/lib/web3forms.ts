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

export async function sendContactNotificationWithWeb3Forms({
    name,
    email,
    subject,
    message,
    organization,
    contextVertical,
    contextPlan,
}: Web3FormsContactInput) {
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
        return { success: false, error: "missing_web3forms_access_key" };
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
        const payload = new FormData();
        payload.append("access_key", accessKey);
        payload.append("subject", `Nuevo contacto web · ${subject}`);
        payload.append("from_name", name);
        payload.append("name", name);
        payload.append("email", email);
        payload.append("organization", organization || "No indicada");
        payload.append("area", contextVertical || "General");
        payload.append("plan", contextPlan || "No indicado");
        payload.append("message", message);
        payload.append("botcheck", "");

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