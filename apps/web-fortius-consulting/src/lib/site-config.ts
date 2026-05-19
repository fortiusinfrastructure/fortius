export const SITE_NAME = "Fortius Consulting";

export const SITE_DESCRIPTION =
    "Consultoría estratégica para organizaciones con principios e inteligencia política para decisiones de alto impacto.";

export const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL || "https://fortiusconsulting.org";

export function createAbsoluteUrl(path = "/") {
    return new URL(path, SITE_URL).toString();
}