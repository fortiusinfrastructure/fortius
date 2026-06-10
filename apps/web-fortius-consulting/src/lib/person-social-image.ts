import "server-only";

import { createAbsoluteUrl } from "@/lib/site-config";

const DEFAULT_SOCIAL_IMAGE = "/branding/fortius-consulting-lockup-dark.png";

export function getPersonSocialImage(photo?: string | string[]) {
    const candidates = Array.isArray(photo) ? photo : photo ? [photo] : [];

    for (const candidate of candidates) {
        if (candidate.startsWith("/")) {
            return createAbsoluteUrl(candidate);
        }
    }

    return createAbsoluteUrl(DEFAULT_SOCIAL_IMAGE);
}