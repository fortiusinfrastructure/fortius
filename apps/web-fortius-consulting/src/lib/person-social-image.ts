import "server-only";

import { existsSync } from "node:fs";
import { join } from "node:path";
import { createAbsoluteUrl } from "@/lib/site-config";

const DEFAULT_SOCIAL_IMAGE = "/branding/fortius-consulting-lockup-dark.png";

export function getPersonSocialImage(photo?: string | string[]) {
    const candidates = Array.isArray(photo) ? photo : photo ? [photo] : [];

    for (const candidate of candidates) {
        if (!candidate.startsWith("/")) continue;
        const relativePath = candidate.slice(1);
        if (existsSync(join(process.cwd(), "public", relativePath))) {
            return createAbsoluteUrl(candidate);
        }
    }

    return createAbsoluteUrl(DEFAULT_SOCIAL_IMAGE);
}