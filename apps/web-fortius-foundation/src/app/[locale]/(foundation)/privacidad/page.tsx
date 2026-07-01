import type { Metadata } from "next";
import { LegalDocument } from "@/components/foundation/LegalDocument";
import { PRIVACY_CONTENT } from "@/content/legal";

export const metadata: Metadata = {
  title: "Política de privacidad — Fundación Fortius",
  description: "Política de privacidad básica del sitio de Fundación Fortius.",
};

export default function PrivacyPage() {
  return <LegalDocument content={PRIVACY_CONTENT} />;
}