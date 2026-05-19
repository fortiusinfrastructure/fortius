export type ArticleVisualTheme =
  | "emerald"
  | "forest"
  | "gold"
  | "navy"
  | "plum"
  | "stone";

export interface ArticleVisual {
  eyebrow: string;
  label: string;
  motif: string;
  theme: ArticleVisualTheme;
}

export const ARTICLE_VISUALS: Record<string, ArticleVisual> = {
  "2025-04-17-darse-a-los-demas": { eyebrow: "Servicio", label: "Entrega", motif: "Caridad, sacrificio y servicio", theme: "emerald" },
  "2025-01-15-2025-en-3-retos": { eyebrow: "Tercer Sector", label: "2025", motif: "Tecnología, relato e impacto", theme: "forest" },
  "2024-12-24-navidad-y-filantropia": { eyebrow: "Filantropía", label: "Navidad", motif: "Generosidad, fe y fundraising", theme: "gold" },
  "2024-06-06-historia-de-dos-ciudades": { eyebrow: "Europa", label: "Dos ciudades", motif: "Budapest, Bucarest y poder político", theme: "navy" },
  "2024-03-02-causas-nobles-y-ventajas-competitivas": { eyebrow: "Misión", label: "Causas nobles", motif: "Valores, competencia y lealtad", theme: "plum" },
  "2024-01-20-sobre-advocacy-y-lobby": { eyebrow: "Incidencia", label: "Advocacy & Lobby", motif: "Influencia pública con criterio", theme: "stone" },
  "2023-12-20-pensar-como-inversion": { eyebrow: "Pensamiento", label: "Invertir en pensar", motif: "Ideas fuertes para una sociedad viva", theme: "navy" },
  "2023-12-11-sociedad-civil-organizada-y-fuerte": { eyebrow: "Sociedad civil", label: "Fortius", motif: "Organización, libertad y fortaleza", theme: "forest" },
  "2023-11-04-alianzas": { eyebrow: "Cooperación", label: "Alianzas", motif: "Redes, comunidad y escala", theme: "emerald" },
  "2023-10-29-primero-crea-valor": { eyebrow: "Fundraising", label: "Crear valor", motif: "Impacto antes de pedir apoyo", theme: "gold" },
  "2023-09-10-profesionalizarse-no-es-una-opcion": { eyebrow: "Excelencia", label: "Profesionalizar", motif: "Rigor, talento y sostenibilidad", theme: "stone" },
  "2023-05-10-la-revolucion-del-impacto": { eyebrow: "Impacto", label: "Revolución", motif: "Medir mejor para servir mejor", theme: "plum" },
  "2023-04-15-como-vas-a-medir-tu-vida": { eyebrow: "Vida y legado", label: "Medir tu vida", motif: "Sentido, trabajo y propósito", theme: "emerald" },
  "2023-01-11-la-destruccion-creadora": { eyebrow: "Organizaciones", label: "Renovar", motif: "Carisma, institución y cambio", theme: "navy" },
  "2022-10-28-como-medir-el-impacto-de-las-ideas": { eyebrow: "Medición", label: "Ideas", motif: "Qué cuenta como impacto real", theme: "forest" },
};