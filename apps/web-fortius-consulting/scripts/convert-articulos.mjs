/**
 * Convert .docx files in public/articulos/{politica,sociedad_civil} into a
 * single articles.json seed file (Markdown + metadata).
 *
 * Usage:
 *   pnpm run articulos:convert
 *
 * Filename pattern expected (best-effort, tolerates noise):
 *   YYYY_MM_DD[-DD]. <KIND> [(ABIERTO|PAGO)]. <Title>.docx
 *
 * Output: src/data/articles.json
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mammoth from "mammoth";
import TurndownService from "turndown";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const APP_ROOT = path.resolve(__dirname, "..");
const ARTICULOS_DIR = path.join(APP_ROOT, "public", "articulos");
const OUT_FILE = path.join(APP_ROOT, "src", "data", "articles.json");

const CATEGORY_MAP = {
    política: "politica",
    politica: "politica",
    sociedad_civil: "sociedad-civil",
    "sociedad-civil": "sociedad-civil",
    home: "home",
};

// Order matters: longest/most specific first.
const KIND_PATTERNS = [
    { re: /^nota\s+inteligencia\s+pol[ií]tica/i, kind: "nota" },
    { re: /^eventos?\s*(?:&|y)\s*oportunidades/i, kind: "evento" },
    { re: /^informe/i, kind: "informe" },
    { re: /^comentario/i, kind: "comentario" },
];

function slugify(input) {
    return input
        .toString()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 90);
}

function cleanTitle(raw) {
    let t = raw
        .replace(/\((?:pago|abierto)\)/gi, "")
        .replace(/^[\s\.,;:_-]+/, "")
        .replace(/[\s\.,;:_-]+$/, "")
        .trim();

    // Filenames cannot contain ? — Word users replace it with _ at the end.
    if (t.startsWith("¿") && !t.includes("?")) t = `${t}?`;
    if (t.startsWith("¡") && !t.includes("!")) t = `${t}!`;

    // Pair-style _italics_ → use guillemets; lone underscores → space.
    t = t.replace(/_([^_]+)_/g, "«$1»").replace(/_/g, " ");
    return t.replace(/\s{2,}/g, " ").trim();
}

function parseFilename(filename) {
    // macOS stores filenames in NFD (decomposed). Normalize for regex matching.
    const base = filename.normalize("NFC").replace(/\.docx$/i, "").trim();

    // Date: YYYY_MM_DD[-DD] at start
    const dateMatch = base.match(/^(\d{4})_(\d{2})_(\d{2})(?:-\d{1,2})?/);
    const publishedAt = dateMatch
        ? `${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}`
        : null;

    let rest = dateMatch ? base.slice(dateMatch[0].length) : base;
    rest = rest.replace(/^[\.\s]+/, "");

    // Detect access tag anywhere
    let access = "public";
    if (/\(pago\)/i.test(rest)) access = "paid";
    else if (/\(abierto\)/i.test(rest)) access = "public";

    // Detect kind and strip the kind+access prefix from the title.
    let kind = "articulo";
    let title = rest;
    for (const { re: kindRe, kind: k } of KIND_PATTERNS) {
        const stripRe = new RegExp(
            kindRe.source + "\\s*(?:\\((?:pago|abierto)\\))?\\s*\\.?\\s*",
            "i",
        );
        const m = rest.match(stripRe);
        if (m && m.index === 0) {
            kind = k;
            title = rest.slice(m[0].length);
            break;
        }
    }

    return { publishedAt, access, kind, title: cleanTitle(title) };
}

function extractSubproductos(markdown) {
    // Split by H1/H2/H3 headings; any heading containing "subproducto" or
    // "anexo" becomes a separate subproduct section.
    const lines = markdown.split("\n");
    const sections = [];
    let current = { heading: null, level: 0, body: [] };
    const flush = () => {
        if (current.heading || current.body.join("").trim()) {
            sections.push({
                heading: current.heading,
                level: current.level,
                body: current.body.join("\n").trim(),
            });
        }
    };
    for (const line of lines) {
        const m = line.match(/^(#{1,3})\s+(.+?)\s*$/);
        if (m) {
            flush();
            current = { heading: m[2], level: m[1].length, body: [] };
        } else {
            current.body.push(line);
        }
    }
    flush();

    const subs = [];
    const main = [];
    for (const s of sections) {
        const isSub = s.heading && /^(subproducto|anexo)\b/i.test(s.heading);
        if (isSub) {
            subs.push({ title: s.heading, content: s.body });
        } else {
            if (s.heading) {
                main.push(`${"#".repeat(s.level)} ${s.heading}`);
            }
            if (s.body) main.push(s.body);
        }
    }
    return { mainMarkdown: main.join("\n\n").trim(), subproducts: subs };
}

async function convertOne(filePath, category) {
    const filename = path.basename(filePath);
    const meta = parseFilename(filename);

    // Discard embedded images (Word stores them as base64). We keep alt text
    // as a placeholder; a future iteration can upload them to Supabase storage.
    const { value: html } = await mammoth.convertToHtml(
        { path: filePath },
        {
            convertImage: mammoth.images.imgElement(() =>
                Promise.resolve({ src: "" }),
            ),
        },
    );
    const turndown = new TurndownService({
        headingStyle: "atx",
        bulletListMarker: "-",
        codeBlockStyle: "fenced",
        emDelimiter: "_",
    });
    turndown.addRule("dropImages", {
        filter: "img",
        replacement: (_content, node) => {
            const alt = (node.getAttribute && node.getAttribute("alt")) || "";
            return alt ? `\n\n> _Imagen: ${alt}_\n\n` : "";
        },
    });
    const md = turndown.turndown(html).trim();
    const { mainMarkdown, subproducts } = extractSubproductos(md);

    const slug = slugify(`${meta.publishedAt || ""}-${meta.title}`);
    const excerpt = mainMarkdown
        .replace(/[#>*_`]/g, "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 280);

    return {
        slug,
        title: meta.title,
        category,
        kind: meta.kind,
        access: meta.access,
        published_at: meta.publishedAt,
        excerpt,
        content_markdown: mainMarkdown,
        subproducts: meta.access === "paid" ? subproducts : [],
        source_file: path.relative(APP_ROOT, filePath),
    };
}

async function walkCategory(folder, category) {
    const dir = path.join(ARTICULOS_DIR, folder);
    let entries = [];
    try {
        entries = await fs.readdir(dir, { withFileTypes: true });
    } catch {
        return [];
    }
    const out = [];
    for (const entry of entries) {
        if (!entry.isFile() || !entry.name.toLowerCase().endsWith(".docx")) continue;
        const full = path.join(dir, entry.name);
        try {
            out.push(await convertOne(full, category));
            console.log(`  ✓ ${category}/${entry.name}`);
        } catch (err) {
            console.error(`  ✗ ${category}/${entry.name}: ${err.message}`);
        }
    }
    return out;
}

async function main() {
    console.log("📄 Converting .docx → articles.json");
    const all = [];
    for (const [folder, category] of Object.entries(CATEGORY_MAP)) {
        const items = await walkCategory(folder, category);
        all.push(...items);
    }

    // Ensure slugs are unique (append numeric suffix on collision).
    const seen = new Map();
    for (const a of all) {
        const count = (seen.get(a.slug) ?? 0) + 1;
        seen.set(a.slug, count);
        if (count > 1) a.slug = `${a.slug}-${count}`;
    }

    // Sort newest first.
    all.sort((a, b) => (b.published_at || "").localeCompare(a.published_at || ""));

    await fs.mkdir(path.dirname(OUT_FILE), { recursive: true });
    await fs.writeFile(OUT_FILE, JSON.stringify(all, null, 2) + "\n", "utf8");
    console.log(`\n✅ Wrote ${all.length} articles → ${path.relative(APP_ROOT, OUT_FILE)}`);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
