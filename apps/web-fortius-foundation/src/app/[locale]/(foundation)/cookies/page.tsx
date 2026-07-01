import type { Metadata } from "next";
import { LegalDocument } from "@/components/foundation/LegalDocument";
import { COOKIES_CONTENT } from "@/content/legal";

export const metadata: Metadata = {
  title: "Política de cookies — Fundación Fortius",
  description: "Política de cookies básica del sitio de Fundación Fortius.",
};

export default function CookiesPage() {
  return <LegalDocument content={COOKIES_CONTENT} />;
}