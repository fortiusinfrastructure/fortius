import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mammoth from "mammoth";
import TurndownService from "turndown";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const APP_ROOT = path.resolve(__dirname, "..");
const SC = path.join(APP_ROOT, "public", "articulos", "sociedad_civil");

const TARGETS = [
    {
        file: path.join(SC, "2026_05_15. NOTICIA (SC) (ABIERTO). Gobernanza Estratégica en Harvard", "2025 05 15. Gobernanza Estratégica en Harvard.docx"),
        slug: "2026-05-15-gobernanza-estrategica-en-harvard",
        title: "Gobernanza Estratégica en Harvard",
        kind: "noticia",
        published_at: "2026-05-15",
        cover_image: "/images/articles/sociedad-civil/2026-05-15-gobernanza-estrategica-en-harvard.png",
    },
    {
        file: path.join(SC, "2026_06_08. NOTICIA SC (ABIERTO). Fortius en el Estoril Political Forum 2026", "Fortius en el Estoril Political Forum 2026.docx"),
        slug: "2026-06-08-fortius-en-el-estoril-political-forum-2026",
        title: "Fortius en el Estoril Political Forum 2026",
        kind: "noticia",
        published_at: "2026-06-08",
        cover_image: "/images/articles/sociedad-civil/2026-06-08-fortius-en-el-estoril-political-forum-2026.png",
    },
    {
        file: path.join(SC, "2026_06_04. ARTÍCULO (SC) (ABIERTO). Globalización, soberanía y sentido común", "2026_06_04. Globalización, soberanía y sentido común.docx"),
        slug: "2026-06-04-globalizacion-soberania-y-sentido-comun",
        title: "Globalización, soberanía y sentido común",
        kind: "articulo",
        published_at: "2026-06-04",
        cover_image: "/images/articles/sociedad-civil/2026-06-04-globalizacion-soberania-y-sentido-comun.png",
    },
    {
        file: path.join(SC, "2022_10_28. Cómo medir el impacto de las ideas.docx"),
        slug: "2022-10-28-como-medir-el-impacto-de-las-ideas",
        title: "Cómo medir el impacto de las ideas",
        kind: "articulo",
        published_at: "2022-10-28",
        cover_image: "/images/articles/sociedad-civil/2022-10-28-como-medir-el-impacto-de-las-ideas.png",
    },
    {
        file: path.join(SC, "2023_04_15. ¿Cómo vas a medir tu vida_.docx"),
        slug: "2023-04-15-como-vas-a-medir-tu-vida",
        title: "¿Cómo vas a medir tu vida?",
        kind: "articulo",
        published_at: "2023-04-15",
        cover_image: "/images/articles/sociedad-civil/2023-04-15-como-vas-a-medir-tu-vida.png",
    },
];

async function convertOne(t) {
    const { value: html } = await mammoth.convertToHtml(
        { path: t.file },
        { convertImage: mammoth.images.imgElement(() => Promise.resolve({ src: "" })) },
    );
    const turndown = new TurndownService({
        headingStyle: "atx",
        bulletListMarker: "-",
        codeBlockStyle: "fenced",
        emDelimiter: "_",
    });
    turndown.addRule("dropImages", {
        filter: "img",
        replacement: (_c, node) => {
            const alt = (node.getAttribute && node.getAttribute("alt")) || "";
            return alt ? `\n\n> _Imagen: ${alt}_\n\n` : "";
        },
    });
    const md = turndown.turndown(html).trim();
    const excerpt = md
        .replace(/[#>*_`]/g, "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 280);

    return {
        slug: t.slug,
        title: t.title,
        category: "sociedad-civil",
        kind: t.kind,
        access: "public",
        cover_image: t.cover_image,
        published_at: t.published_at,
        excerpt,
        content_markdown: md,
        subproducts: [],
        source_file: path.relative(APP_ROOT, t.file),
    };
}

const out = [];
for (const t of TARGETS) {
    try {
        out.push(await convertOne(t));
        console.error(`  ✓ ${t.slug}`);
    } catch (err) {
        console.error(`  ✗ ${t.slug}: ${err.message}`);
    }
}
await fs.writeFile(path.join(__dirname, "_tmp-new-articles.json"), JSON.stringify(out, null, 2) + "\n", "utf8");
console.error(`\nWrote ${out.length} entries`);
