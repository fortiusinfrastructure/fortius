/**
 * POST /api/admin/articulos/convert
 *
 * Accepts multipart/form-data with files[]: one or more .docx files.
 * Converts each file (mammoth → HTML → Markdown) and upserts to Supabase.
 *
 * Auth: logged-in user with role 'admin' or 'super_admin' in the Foundation org,
 * or the X-Admin-Secret header (for CLI use).
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createServerClient, createAdminClient } from "@fortius/database";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const mammoth = require("mammoth") as typeof import("mammoth");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const TurndownService = require("turndown") as typeof import("turndown");

const ORG_SLUG = "fortius-foundation";
const ORG_NAME = "Fortius Foundation";
const ORG_DOMAIN = "fundacionfortius.org";
const ADMIN_ROLES = ["admin", "super_admin"];

// ── Helpers ────────────────────────────────────────────────────────────────

function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

function parseFilename(filename: string): { publishedAt: string | null; title: string } {
  const base = filename.normalize("NFC").replace(/\.docx$/i, "").trim();
  const dateMatch = base.match(/^(\d{4})_(\d{2})_(\d{2})/);
  const publishedAt = dateMatch ? `${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}` : null;
  const rest = dateMatch ? base.slice(dateMatch[0].length).replace(/^[.\s]+/, "") : base;
  const title = rest.replace(/[\s.,;:_-]+$/, "").trim();
  return { publishedAt, title };
}

async function convertBuffer(buffer: Buffer, filename: string): Promise<{
  slug: string; title: string; published_at: string | null; excerpt: string; content_markdown: string;
}> {
  const { publishedAt, title } = parseFilename(filename);

  const { value: html } = await mammoth.convertToHtml(
    { buffer },
    { convertImage: mammoth.images.imgElement(() => Promise.resolve({ src: "" })) },
  );

  const turndown = new TurndownService({ headingStyle: "atx", bulletListMarker: "-", codeBlockStyle: "fenced" });
  turndown.addRule("dropImages", {
    filter: "img",
    replacement: (_: string, node: Element) => {
      const alt = node.getAttribute?.("alt") ?? "";
      return alt ? `\n\n> _Imagen: ${alt}_\n\n` : "";
    },
  });

  const md = turndown.turndown(html).trim();
  const slug = slugify(`${publishedAt ?? ""}-${title}`);
  const excerpt = md.replace(/[#>*_`]/g, "").replace(/\s+/g, " ").trim().slice(0, 280);

  return { slug, title, published_at: publishedAt, excerpt, content_markdown: md };
}

// ── Auth ───────────────────────────────────────────────────────────────────

async function isAuthorized(req: NextRequest): Promise<boolean> {
  const adminSecret = process.env.ADMIN_UPLOAD_SECRET;
  const provided = req.headers.get("x-admin-secret");
  if (adminSecret && provided === adminSecret) return true;

  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const admin = createAdminClient();
  const { data: org } = await admin.from("organizations").select("id").eq("slug", ORG_SLUG).maybeSingle();
  if (!org) return false;

  const { data: membership } = await admin
    .from("user_memberships")
    .select("role")
    .eq("user_id", user.id)
    .eq("organization_id", org.id)
    .eq("status", "active")
    .maybeSingle();

  return ADMIN_ROLES.includes(membership?.role ?? "");
}

// ── Handler ────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (!(await isAuthorized(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid multipart form data" }, { status: 400 });
  }

  const fileEntries = formData.getAll("files[]") as File[];
  if (!fileEntries.length) {
    return NextResponse.json({ error: "No files provided" }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: "Supabase env vars not configured" }, { status: 500 });
  }

  const admin = createClient(supabaseUrl, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });

  // Ensure org exists
  const { data: existingOrg } = await admin.from("organizations").select("id").eq("slug", ORG_SLUG).maybeSingle();
  let orgId: string = existingOrg?.id;
  if (!orgId) {
    const { data: newOrg, error: orgErr } = await admin.from("organizations")
      .insert({ slug: ORG_SLUG, name: ORG_NAME, domain: ORG_DOMAIN })
      .select("id").single();
    if (orgErr) return NextResponse.json({ error: `Cannot create org: ${orgErr.message}` }, { status: 500 });
    orgId = newOrg.id;
  }

  const results: Array<{ filename: string; status: "ok" | "error"; slug?: string; title?: string; error?: string }> = [];
  const slugCount = new Map<string, number>();

  for (const file of fileEntries) {
    if (!file.name.toLowerCase().endsWith(".docx")) {
      results.push({ filename: file.name, status: "error", error: "Not a .docx file" });
      continue;
    }

    try {
      const buffer = Buffer.from(await file.arrayBuffer());
      const article = await convertBuffer(buffer, file.name);

      const count = (slugCount.get(article.slug) ?? 0) + 1;
      slugCount.set(article.slug, count);
      if (count > 1) article.slug = `${article.slug}-${count}`;

      const { error: upsertErr } = await admin.from("articles").upsert(
        {
          organization_id: orgId,
          slug: article.slug,
          title_es: article.title,
          excerpt_es: article.excerpt || null,
          content_es: article.content_markdown,
          category: "blog",
          published_at: article.published_at ? `${article.published_at}T00:00:00Z` : null,
          status: "published",
          metadata: { kind: "articulo", source_file: file.name, content_format: "markdown" },
        },
        { onConflict: "organization_id,slug", ignoreDuplicates: false },
      );

      if (upsertErr) throw new Error(upsertErr.message);
      results.push({ filename: file.name, status: "ok", slug: article.slug, title: article.title });
    } catch (err) {
      results.push({ filename: file.name, status: "error", error: err instanceof Error ? err.message : String(err) });
    }
  }

  const ok = results.filter((r) => r.status === "ok").length;
  const errors = results.filter((r) => r.status === "error").length;
  return NextResponse.json({ ok, errors, results }, { status: 200 });
}
