/**
 * POST /api/admin/articulos/convert
 *
 * Accepts multipart/form-data with:
 *   - files[]: one or more .docx files
 *   - category: "politica" | "sociedad-civil"
 *
 * Converts each file in-memory (mammoth → HTML → Markdown) and upserts the
 * resulting articles directly into Supabase. Returns a JSON summary.
 *
 * Protected by: a logged-in session with role 'admin' in the consulting org,
 * or a shared secret header (X-Admin-Secret) for scripts/CLI.
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createServerClient, createAdminClient } from "@fortius/database";
// mammoth and turndown are Node-only; they run only in the Next.js runtime.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const mammoth = require("mammoth") as typeof import("mammoth");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const TurndownService = require("turndown") as typeof import("turndown");

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const ALLOWED_CATEGORIES = ["politica", "sociedad-civil"] as const;
type Category = (typeof ALLOWED_CATEGORIES)[number];

const ORG_SLUG = "fortius-consulting";
const ORG_NAME = "Fortius Consulting";
const ORG_DOMAIN = "fortiusconsulting.org";

// ---------------------------------------------------------------------------
// Helpers (mirrors convert-articulos.mjs logic)
// ---------------------------------------------------------------------------

const KIND_PATTERNS: { re: RegExp; kind: string }[] = [
  { re: /^nota\s+inteligencia\s+pol[ií]tica/i, kind: "nota" },
  { re: /^eventos?\s*(?:&|y)\s*oportunidades/i, kind: "evento" },
  { re: /^informe/i, kind: "informe" },
  { re: /^comentario/i, kind: "comentario" },
];

function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

function cleanTitle(raw: string): string {
  let t = raw
    .replace(/\((?:pago|abierto)\)/gi, "")
    .replace(/^[\s.,;:_-]+/, "")
    .replace(/[\s.,;:_-]+$/, "")
    .trim();
  if (t.startsWith("¿") && !t.includes("?")) t = `${t}?`;
  if (t.startsWith("¡") && !t.includes("!")) t = `${t}!`;
  t = t.replace(/_([^_]+)_/g, "«$1»").replace(/_/g, " ");
  return t.replace(/\s{2,}/g, " ").trim();
}

function parseFilename(filename: string): {
  publishedAt: string | null;
  access: "public" | "paid";
  kind: string;
  title: string;
} {
  const base = filename.normalize("NFC").replace(/\.docx$/i, "").trim();

  const dateMatch = base.match(/^(\d{4})_(\d{2})_(\d{2})(?:-\d{1,2})?/);
  const publishedAt = dateMatch
    ? `${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}`
    : null;

  let rest = dateMatch ? base.slice(dateMatch[0].length) : base;
  rest = rest.replace(/^[.\s]+/, "");

  let access: "public" | "paid" = "public";
  if (/\(pago\)/i.test(rest)) access = "paid";

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

function extractMainMarkdown(markdown: string): string {
  const lines = markdown.split("\n");
  const main: string[] = [];
  let currentHeading: string | null = null;
  let currentLevel = 0;
  let currentBody: string[] = [];

  const flush = () => {
    const isSub =
      currentHeading && /^(subproducto|anexo)\b/i.test(currentHeading);
    if (!isSub) {
      if (currentHeading)
        main.push(`${"#".repeat(currentLevel)} ${currentHeading}`);
      if (currentBody.join("").trim()) main.push(currentBody.join("\n").trim());
    }
    currentHeading = null;
    currentLevel = 0;
    currentBody = [];
  };

  for (const line of lines) {
    const m = line.match(/^(#{1,3})\s+(.+?)\s*$/);
    if (m) {
      flush();
      currentHeading = m[2];
      currentLevel = m[1].length;
    } else {
      currentBody.push(line);
    }
  }
  flush();

  return main.join("\n\n").trim();
}

interface ConvertedArticle {
  slug: string;
  title: string;
  category: Category;
  kind: string;
  access: "public" | "paid";
  published_at: string | null;
  excerpt: string;
  content_markdown: string;
}

async function convertBuffer(
  buffer: Buffer,
  filename: string,
  category: Category,
): Promise<ConvertedArticle> {
  const meta = parseFilename(filename);

  const { value: html } = await mammoth.convertToHtml(
    { buffer },
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
    replacement: (_: string, node: Element) => {
      const alt = node.getAttribute?.("alt") ?? "";
      return alt ? `\n\n> _Imagen: ${alt}_\n\n` : "";
    },
  });

  const md = turndown.turndown(html).trim();
  const mainMarkdown = extractMainMarkdown(md);

  const slug = slugify(`${meta.publishedAt ?? ""}-${meta.title}`);
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
  };
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

async function isAuthorized(req: NextRequest): Promise<boolean> {
  // Scripts / CLI: shared secret header
  const adminSecret = process.env.ADMIN_UPLOAD_SECRET;
  const provided = req.headers.get("x-admin-secret");
  if (adminSecret && provided === adminSecret) return true;

  // Browser: logged-in user with role 'admin' in the consulting org
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const admin = createAdminClient();
  const { data: org } = await admin
    .from("organizations")
    .select("id")
    .eq("slug", ORG_SLUG)
    .maybeSingle();
  if (!org) return false;

  const { data: membership } = await admin
    .from("user_memberships")
    .select("role")
    .eq("user_id", user.id)
    .eq("organization_id", org.id)
    .eq("status", "active")
    .maybeSingle();

  return membership?.role === "admin";
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  // --- Auth: admin session or shared secret header ---
  if (!(await isAuthorized(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // --- Parse multipart form ---
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json(
      { error: "Invalid multipart form data" },
      { status: 400 },
    );
  }

  const category = formData.get("category") as string;
  if (!ALLOWED_CATEGORIES.includes(category as Category)) {
    return NextResponse.json(
      { error: `category must be one of: ${ALLOWED_CATEGORIES.join(", ")}` },
      { status: 400 },
    );
  }

  const fileEntries = formData.getAll("files[]") as File[];
  if (!fileEntries.length) {
    return NextResponse.json({ error: "No files provided" }, { status: 400 });
  }

  // --- Supabase client ---
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json(
      { error: "Supabase env vars not configured on the server" },
      { status: 500 },
    );
  }

  const admin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // Ensure org exists
  const { data: existingOrg } = await admin
    .from("organizations")
    .select("id")
    .eq("slug", ORG_SLUG)
    .maybeSingle();

  let orgId: string = existingOrg?.id;
  if (!orgId) {
    const { data: newOrg, error: orgErr } = await admin
      .from("organizations")
      .insert({ slug: ORG_SLUG, name: ORG_NAME, domain: ORG_DOMAIN })
      .select("id")
      .single();
    if (orgErr) {
      return NextResponse.json(
        { error: `Cannot create org: ${orgErr.message}` },
        { status: 500 },
      );
    }
    orgId = newOrg.id;
  }

  // --- Convert & seed each file ---
  const results: Array<{
    filename: string;
    status: "ok" | "error";
    slug?: string;
    title?: string;
    error?: string;
  }> = [];

  // Collect slugs within this batch to handle duplicates
  const slugCount = new Map<string, number>();

  for (const file of fileEntries) {
    if (!file.name.toLowerCase().endsWith(".docx")) {
      results.push({
        filename: file.name,
        status: "error",
        error: "Not a .docx file",
      });
      continue;
    }

    try {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const article = await convertBuffer(buffer, file.name, category as Category);

      // Deduplicate slug within this batch
      const count = (slugCount.get(article.slug) ?? 0) + 1;
      slugCount.set(article.slug, count);
      if (count > 1) article.slug = `${article.slug}-${count}`;

      // Same column mapping as scripts/seed-articles.mjs:
      // canonical columns + consulting fields in metadata JSONB.
      const { error: upsertErr } = await admin.from("articles").upsert(
        {
          organization_id: orgId,
          slug: article.slug,
          title_es: article.title,
          excerpt_es: article.excerpt || null,
          content_es: article.content_markdown,
          category: article.category,
          published_at: article.published_at
            ? `${article.published_at}T00:00:00Z`
            : null,
          status: "published",
          metadata: {
            access_level: article.access,
            kind: article.kind,
            subproducts: [],
            source_file: file.name,
            content_format: "markdown",
          },
        },
        { onConflict: "organization_id,slug", ignoreDuplicates: false },
      );

      if (upsertErr) throw new Error(upsertErr.message);

      results.push({
        filename: file.name,
        status: "ok",
        slug: article.slug,
        title: article.title,
      });
    } catch (err) {
      results.push({
        filename: file.name,
        status: "error",
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  const ok = results.filter((r) => r.status === "ok").length;
  const errors = results.filter((r) => r.status === "error").length;

  return NextResponse.json({ ok, errors, results }, { status: 200 });
}
