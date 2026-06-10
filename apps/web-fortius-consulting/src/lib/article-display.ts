import type { Article, ArticleCategory, ArticleKind } from "./articles";

const CATEGORY_FALLBACKS: Record<ArticleCategory, { src: string; alt: string; hardFallback: string }> = {
    politica: {
        src: "/images/articles/politica/default.jpg",
        alt: "Portada editorial de política y geopolítica.",
        hardFallback: "/images/eje2.jpg",
    },
    "sociedad-civil": {
        src: "/images/articles/sociedad-civil/default.jpg",
        alt: "Portada editorial de sociedad civil e influencia institucional.",
        hardFallback: "/images/eje1.png",
    },
    home: {
        src: "/images/articles/politica/default.jpg",
        alt: "Portada editorial de Fortius Consulting.",
        hardFallback: "/images/eje2.jpg",
    },
};

const KIND_COPY: Record<ArticleKind, { label: string; summary: string; bullets: string[] }> = {
    comentario: {
        label: "Comentario editorial",
        summary: "Una lectura de posición para entender contexto, tesis e implicaciones prácticas.",
        bullets: ["Argumento central", "Contexto político", "Conclusiones estratégicas"],
    },
    informe: {
        label: "Informe estratégico",
        summary: "Documento de trabajo orientado a diagnóstico, escenarios y toma de decisión.",
        bullets: ["Diagnóstico", "Escenarios", "Recomendaciones"],
    },
    nota: {
        label: "Nota de inteligencia",
        summary: "Pieza breve de seguimiento para captar señales tempranas y movimientos relevantes.",
        bullets: ["Señales clave", "Riesgos", "Implicaciones inmediatas"],
    },
    evento: {
        label: "Evento y oportunidad",
        summary: "Ficha operativa para evaluar participación, agenda, networking y contexto del encuentro.",
        bullets: ["Fechas y formato", "Acceso y agenda", "Valor para stakeholders"],
    },
    noticia: {
        label: "Noticia",
        summary: "Actualidad de Fortius: presencia institucional, encuentros y actividad en el ecosistema.",
        bullets: ["Qué ha ocurrido", "Por qué importa", "Quiénes participan"],
    },
    articulo: {
        label: "Artículo de análisis",
        summary: "Pieza de fondo para profundizar en una cuestión política, institucional o cultural.",
        bullets: ["Marco conceptual", "Contexto ampliado", "Lectura de largo plazo"],
    },
};

export function getArticleCover(category: ArticleCategory) {
    return CATEGORY_FALLBACKS[category] ?? CATEGORY_FALLBACKS.home;
}

export function getArticleImageSources(article: Article) {
    const base = getArticleCover(article.category);
    const sourceFileBase = article.source_file
        ? article.source_file.split("/").at(-1)?.replace(/\.docx$/i, "")
        : null;

    const sourceFileCandidates = sourceFileBase
        ? [
              `/images/articles/${article.category}/${sourceFileBase}.png`,
              `/images/articles/${article.category}/${sourceFileBase}.jpg`,
          ]
        : [];

    // Slug-based names first (all images have been renamed to {slug}.png).
    // Source_file candidates are kept as fallback for any future articles
    // whose images haven't been renamed yet.
    const allSources = [
        `/images/articles/${article.category}/${article.slug}.png`,
        `/images/articles/${article.category}/${article.slug}.jpg`,
        ...sourceFileCandidates,
        base.src,
        base.hardFallback,
    ].filter((value, index, list) => Boolean(value) && list.indexOf(value) === index);

    const [primarySrc, ...fallbackSources] = allSources as [string, ...string[]];

    return {
        primarySrc: primarySrc ?? base.hardFallback,
        fallbackSources,
        alt: base.alt,
    };
}

export function getArticleKindCopy(kind: ArticleKind) {
    return KIND_COPY[kind] ?? KIND_COPY.articulo;
}

export interface ArticleLeadData {
    author: string | null;
    imageNote: string | null;
    markdown: string;
}

export interface EventPackage {
    name: string;
    price: string | null;
    summary: string | null;
}

export interface EventArticleData {
    date: string | null;
    location: string | null;
    organizer: string | null;
    packages: EventPackage[];
}

function cleanTextBlock(block: string): string {
    return block
        .split("\n")
        .map((line) => stripFormatting(line))
        .join(" ")
        .replace(/\s+/g, " ")
        .trim();
}

function truncateText(text: string, max = 220): string {
    const cleaned = text.replace(/\s+/g, " ").trim();
    if (cleaned.length <= max) return cleaned;
    return `${cleaned.slice(0, max).trimEnd()}…`;
}

function stripFormatting(line: string): string {
    return line.replace(/^>\s*/, "").replace(/[*_`#]/g, "").trim();
}

function normalize(line: string): string {
    return stripFormatting(line)
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .toLowerCase()
        .replace(/[^\p{L}\p{N}]+/gu, " ")
        .trim();
}

function extractPrefixedValue(line: string, prefix: string): string | null {
    const plain = stripFormatting(line);
    if (!plain.toLowerCase().startsWith(prefix.toLowerCase())) return null;
    return plain.slice(prefix.length).trim() || null;
}

function cleanPreviewText(text: string): string {
    return truncateText(
        text
            .replace(/imagen:\s*.*?(?=\s+[A-ZÁÉÍÓÚÜÑ¿¡])/iu, "")
            .replace(/autor:\s*[^.]+/giu, "")
            .replace(/fecha:\s*[^.]+/giu, "")
            .replace(/\s+/g, " ")
            .trim(),
    );
}

function plainLines(markdown: string): string[] {
    return markdown
        .split("\n")
        .map((line) => stripFormatting(line))
        .map((line) => line.replace(/\[(.*?)\]\((.*?)\)/g, "$1"))
        .map((line) => line.trim())
        .filter(Boolean);
}

export function getArticleSectionTitles(markdown: string, limit = 4): string[] {
    const titles = markdown
        .split("\n")
        .filter((line) => /^#{1,6}\s+/.test(line.trim()))
        .map((line) => cleanTextBlock(line.replace(/^#{1,6}\s+/, "")))
        .filter(Boolean)
        .filter((title) => {
            const value = normalize(title);
            return value !== normalize("Resumen Ejecutivo") && value !== normalize("Opciones de Adquisición");
        });

    return [...new Set(titles)].slice(0, limit);
}

export function getExecutiveSummary(markdown: string, maxParagraphs = 2): string | null {
    const blocks = markdown.split(/\n\s*\n/g).map((block) => block.trim()).filter(Boolean);
    const start = blocks.findIndex((block) => normalize(cleanTextBlock(block)).includes(normalize("Resumen Ejecutivo")));
    if (start === -1) return null;

    const collected: string[] = [];
    for (let i = start + 1; i < blocks.length; i += 1) {
        const block = blocks[i] ?? "";
        if (/^#{1,6}\s+/.test(block.trim())) break;
        const cleaned = cleanTextBlock(block);
        const value = normalize(cleaned);
        if (!cleaned || value === normalize("Resumen Ejecutivo")) continue;
        if (cleaned.length < 80) continue;
        collected.push(cleaned);
        if (collected.length >= maxParagraphs) break;
    }

    return collected.length > 0 ? collected.join(" ") : null;
}

export function getFirstNarrativeParagraph(markdown: string): string | null {
    const blocks = markdown.split(/\n\s*\n/g).map((block) => block.trim()).filter(Boolean);
    for (const block of blocks) {
        if (/^#{1,6}\s+/.test(block.trim())) continue;
        const cleaned = cleanTextBlock(block);
        const value = normalize(cleaned);
        if (!cleaned) continue;
        if (value === normalize("Resumen Ejecutivo")) continue;
        if (value.startsWith(normalize("Autor:")) || value.startsWith(normalize("Fecha:"))) continue;
        if (cleaned.length < 80) continue;
        return cleaned;
    }
    return null;
}

export function getArticleLeadData(article: Article): ArticleLeadData {
    const lines = [...article.content_markdown.split("\n")];
    let imageNote: string | null = null;

    while (lines[0]?.trim() === "") lines.shift();

    if (stripFormatting(lines[0] ?? "").toLowerCase().startsWith("imagen:")) {
        imageNote = stripFormatting(lines.shift() ?? "").replace(/^imagen:\s*/i, "").trim();
        while (lines[0]?.trim() === "") lines.shift();
    }

    if (
        normalize(lines[0] ?? "") === normalize(article.title) ||
        normalize(lines[0] ?? "").startsWith(normalize(article.title))
    ) {
        lines.shift();
        while (lines[0]?.trim() === "") lines.shift();
    }

    let author: string | null = null;
    let nonEmptySeen = 0;
    const cleaned: string[] = [];

    for (const line of lines) {
        if (line.trim() !== "") nonEmptySeen += 1;
        const canExtractMeta = nonEmptySeen <= 8;

        const possibleAuthor = canExtractMeta ? extractPrefixedValue(line, "Autor:") : null;
        if (!author && possibleAuthor) {
            author = possibleAuthor;
            continue;
        }

        const possibleDate = canExtractMeta ? extractPrefixedValue(line, "Fecha:") : null;
        if (possibleDate) continue;

        const possibleImage = canExtractMeta ? extractPrefixedValue(line, "Imagen:") : null;
        if (possibleImage) {
            imageNote = imageNote ?? possibleImage;
            continue;
        }

        cleaned.push(line);
    }

    return {
        author,
        imageNote,
        markdown: cleaned.join("\n").replace(/Área Privada/gi, "Área clientes").trim(),
    };
}

export function getArticleSummary(article: Article): string {
    if (article.kind === "evento") {
        const event = getEventArticleData(article);
        const summary = [
            event?.organizer ? `Organizado por ${event.organizer}.` : null,
            event?.date ? `Fecha: ${event.date}.` : null,
            event?.location ? `Ubicación: ${event.location}.` : null,
        ]
            .filter(Boolean)
            .join(" ");

        if (summary) return truncateText(summary, 180);
    }

    const lead = getArticleLeadData(article);
    const summary =
        getExecutiveSummary(lead.markdown, 1) ??
        getFirstNarrativeParagraph(lead.markdown) ??
        cleanPreviewText(article.excerpt);

    return truncateText(summary, 240);
}

export function getEventArticleData(article: Article): EventArticleData | null {
    if (article.kind !== "evento") return null;

    const lead = getArticleLeadData(article);
    const lines = plainLines(lead.markdown);
    let date: string | null = null;
    let location: string | null = null;
    let organizer: string | null = null;

    for (let i = 0; i < lines.length - 7; i += 1) {
        if (
            normalize(lines[i] ?? "") === "evento" &&
            normalize(lines[i + 1] ?? "") === "fecha" &&
            normalize(lines[i + 2] ?? "") === "ubicacion" &&
            normalize(lines[i + 3] ?? "") === "organizador"
        ) {
            date = lines[i + 5] ?? null;
            location = lines[i + 6] ?? null;
            organizer = lines[i + 7] ?? null;
            break;
        }
    }

    const packages: EventPackage[] = [];
    const seen = new Set<string>();

    for (let i = 0; i < lines.length; i += 1) {
        const line = lines[i] ?? "";
        const normalized = normalize(line);

        if (!normalized.includes("paquete")) continue;
        if (normalized.includes("detalle del paquete")) continue;
        if (seen.has(normalized)) continue;

        seen.add(normalized);

        let price: string | null = null;
        let summary: string | null = null;

        for (let j = i + 1; j < Math.min(i + 10, lines.length); j += 1) {
            const next = lines[j] ?? "";
            const nextNormalized = normalize(next);

            if (!price) {
                const priceMatch = next.match(/[0-9][0-9.]*\s*€/u);
                if (priceMatch?.[0]) price = priceMatch[0];
            }

            const isMetaLine = ["detalle del paquete", "descripcion", "precio", "agenda de reuniones", "reuniones garantizadas", "soporte fortius", "acompanamiento en terreno"].includes(nextNormalized);
            if (!summary && !isMetaLine && next.length > 30 && !next.match(/[0-9][0-9.]*\s*€/u)) {
                summary = next;
            }
        }

        packages.push({ name: line, price, summary });
    }

    return { date, location, organizer, packages: packages.slice(0, 3) };
}