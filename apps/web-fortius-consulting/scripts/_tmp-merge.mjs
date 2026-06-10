import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const APP_ROOT = path.resolve(__dirname, "..");
const ARTICLES = path.join(APP_ROOT, "src", "data", "articles.json");
const NEW = path.join(__dirname, "_tmp-new-articles.json");

const existing = JSON.parse(await fs.readFile(ARTICLES, "utf8"));
const incoming = JSON.parse(await fs.readFile(NEW, "utf8"));

// Remove leftover image-placeholder paragraphs from converted markdown.
function cleanMarkdown(md) {
    return md
        .replace(/\n*_?\s*\\?\[Imagen[^\]]*\\?\]\s*_?\n*/g, "\n\n")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
}

for (const a of incoming) {
    a.content_markdown = cleanMarkdown(a.content_markdown);
}

const incomingSlugs = new Set(incoming.map((a) => a.slug));
const kept = existing.filter((a) => !incomingSlugs.has(a.slug));

const politica = kept.filter((a) => a.category === "politica");
const sociedad = kept.filter((a) => a.category === "sociedad-civil");

const mergedSC = [...sociedad, ...incoming].sort((a, b) =>
    (b.published_at || "").localeCompare(a.published_at || ""),
);

const result = [...politica, ...mergedSC];

await fs.writeFile(ARTICLES, JSON.stringify(result, null, 2) + "\n", "utf8");
console.error(
    `Merged. politica=${politica.length} sociedad-civil=${mergedSC.length} total=${result.length}`,
);
