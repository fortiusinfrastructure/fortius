import type { Metadata } from "next";
import { LegalDocument } from "@/components/foundation/LegalDocument";
import { LEGAL_NOTICE_CONTENT } from "@/content/legal";

export const metadata: Metadata = {
  title: "Aviso legal — Fundación Fortius",
  description: "Información legal básica del sitio de Fundación Fortius.",
};

export default function LegalPage() {
  return <LegalDocument content={LEGAL_NOTICE_CONTENT} />;
}