import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const APP_ROOT = path.resolve(__dirname, "..");
const ARTICLES_FILE = path.join(APP_ROOT, "src", "data", "articles.json");
const SOURCE_DIR = path.join(APP_ROOT, "public", "articulos");

function normalize(value) {
    return value.normalize("NFC").toLowerCase();
}

async function walk(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files = [];
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) files.push(...await walk(fullPath));
        if (entry.isFile() && /\.docx?$/i.test(entry.name)) files.push(fullPath);
    }
    return files;
}

function expectedAccessFromPath(filePath) {
    const value = normalize(filePath);
    // Explicit tags win
    if (value.includes("abierto")) return "public";
    if (value.includes("pago") || value.includes("cerrado") || value.includes("privado")) return "paid";
    // "EVENTOS & OPORTUNIDADES" files are private by default
    if (value.includes("eventos") && value.includes("oportunidades")) return "paid";
    return "unmarked";
}

const articles = JSON.parse(await fs.readFile(ARTICLES_FILE, "utf8"));
const sourceFiles = await walk(SOURCE_DIR);
const sourceByBaseName = new Map(
    sourceFiles.map((filePath) => [normalize(path.basename(filePath)), filePath]),
);

const missingSources = [];
const accessMismatches = [];

for (const article of articles) {
    const baseName = normalize(path.basename(article.source_file ?? ""));
    const source = sourceByBaseName.get(baseName);
    if (!source) missingSources.push(article.slug);

    const marker = expectedAccessFromPath(source ?? article.source_file ?? "");
    if (marker !== "unmarked" && marker !== article.access) {
        accessMismatches.push(`${article.slug}: ${article.access} should be ${marker}`);
    }
}

console.log(`Articles in JSON: ${articles.length}`);
console.log(`Source .docx files: ${sourceFiles.length}`);
console.log(`Missing source matches: ${missingSources.length}`);
console.log(`Access mismatches: ${accessMismatches.length}`);

for (const slug of missingSources) console.log(`missing-source: ${slug}`);
for (const mismatch of accessMismatches) console.log(`access-mismatch: ${mismatch}`);

if (articles.length !== sourceFiles.length || accessMismatches.length > 0) {
    process.exitCode = 1;
}
