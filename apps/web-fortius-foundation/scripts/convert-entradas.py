from __future__ import annotations

from pathlib import Path
from typing import Dict, List, Optional
from xml.etree import ElementTree as ET
from zipfile import ZipFile
import re
import unicodedata


APP_ROOT = Path(__file__).resolve().parents[1]
ENTRADAS_DIR = APP_ROOT / "public" / "entradas"
OUT_FILE = APP_ROOT / "src" / "content" / "articles.ts"
NS = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}


def slugify(text: str) -> str:
    normalized = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode("ascii")
    return re.sub(r"[^a-zA-Z0-9]+", "-", normalized.lower()).strip("-")


def escape(text: str) -> str:
    return text.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")


def read_paragraphs(file_path: Path) -> List[str]:
    with ZipFile(file_path) as zf:
        xml = zf.read("word/document.xml")

    root = ET.fromstring(xml)
    paragraphs: List[str] = []
    for par in root.findall(".//w:body/w:p", NS):
        text = "".join(node.text or "" for node in par.findall(".//w:t", NS)).strip()
        if text:
            paragraphs.append(text)
    return paragraphs


def parse_one(file_path: Path) -> Dict[str, Optional[str]]:
    match = re.match(r"(\d{4})_(\d{2})_(\d{2})\.\s*(.+)\.docx$", file_path.name)
    if not match:
        raise ValueError(f"Nombre no soportado: {file_path.name}")

    published_at = f"{match.group(1)}-{match.group(2)}-{match.group(3)}"
    paragraphs = read_paragraphs(file_path)
    title = paragraphs[0] if paragraphs else match.group(4).strip()
    author = None
    body: List[str] = []

    for paragraph in paragraphs[1:]:
        lowered = paragraph.lower()
        if lowered.startswith("fecha:"):
            continue
        if lowered.startswith("autor:"):
            author = paragraph.split(":", 1)[1].strip() or None
            continue
        body.append(paragraph)

    excerpt = re.sub(r"\s+", " ", " ".join(body[:2])).strip()[:280]
    return {
        "slug": f"{published_at}-{slugify(title)}",
        "title": title,
        "published_at": published_at,
        "author": author,
        "excerpt": excerpt,
        "content": "\n\n".join(body),
        "source_file": file_path.name,
    }


def main() -> None:
    articles = [parse_one(path) for path in sorted(ENTRADAS_DIR.glob("*.docx"))]
    articles.sort(key=lambda item: item["published_at"] or "", reverse=True)

    lines = [
        'export interface FoundationArticle {',
        '  slug: string;',
        '  title: string;',
        '  category: "foundation";',
        '  kind: "articulo";',
        '  published_at: string;',
        '  author: string | null;',
        '  excerpt: string;',
        '  content: string;',
        '  source_file: string;',
        '}',
        '',
        'export const FOUNDATION_ARTICLES: FoundationArticle[] = [',
    ]

    for article in articles:
        author_value = "null"
        if article["author"]:
            author_value = f'"{escape(str(article["author"]))}"'

        lines.extend([
            '  {',
            f'    slug: "{escape(article["slug"] or "")}",',
            f'    title: "{escape(article["title"] or "")}",',
            '    category: "foundation",',
            '    kind: "articulo",',
            f'    published_at: "{escape(article["published_at"] or "")}",',
            f'    author: {author_value},',
            f'    excerpt: "{escape(article["excerpt"] or "")}",',
            f'    content: `{escape(article["content"] or "")}`,',
            f'    source_file: "{escape(article["source_file"] or "")}",',
            '  },',
        ])

    lines.append('];')
    OUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    OUT_FILE.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"✅ {len(articles)} entradas convertidas → {OUT_FILE.relative_to(APP_ROOT)}")


if __name__ == "__main__":
    main()