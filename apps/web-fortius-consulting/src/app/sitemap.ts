import type { MetadataRoute } from "next";
import { createAbsoluteUrl } from "@/lib/site-config";

const routes = [
    "/",
    "/nosotros",
    "/sociedad-civil",
    "/politica",
    "/contacto",
    "/fundacion",
    "/aviso-legal",
    "/politica-de-privacidad",
    "/cookies",
];

export default function sitemap(): MetadataRoute.Sitemap {
    return routes.map((route) => ({
        url: createAbsoluteUrl(route),
        lastModified: new Date(),
    }));
}