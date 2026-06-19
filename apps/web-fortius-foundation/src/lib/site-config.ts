export const SITE_NAME = "Fundación Fortius";

export const SITE_DESCRIPTION =
    "Fortius Foundation — grant-making foundation al servicio de una sociedad civil más fuerte.";

export const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NEXT_PUBLIC_VERCEL_URL
        ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
        : "https://fundacionfortius.org");

export function createAbsoluteUrl(path = "/") {
    return new URL(path, SITE_URL).toString();
}