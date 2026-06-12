/**
 * Migration: sube los PDFs de public/docs/ al bucket Supabase `library-docs`
 * (carpeta `ieam/`) y verifica que sean accesibles públicamente.
 *
 * Uso:
 *   pnpm tsx apps/web-ieam/scripts/migrate-docs-to-storage.ts
 *
 * Requiere en apps/web-ieam/.env(.local):
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *
 * IDEMPOTENTE: usa upsert; re-ejecutar es seguro.
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const BUCKET = 'library-docs';
const FOLDER = 'ieam';
const DOCS_DIR = path.resolve(__dirname, '../public/docs');

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
}

const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
});

const CONTENT_TYPES: Record<string, string> = {
    '.pdf': 'application/pdf',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
};

/**
 * Storage object keys must be ASCII-safe. Strip diacritics and replace any
 * remaining unsafe char so the key matches what resolveMaterialUrl() produces.
 * Keep this logic in sync with src/lib/utils/content.ts → sanitizeDocKey().
 */
function sanitizeKey(filename: string): string {
    return filename
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^A-Za-z0-9._-]/g, '-');
}

async function ensureBucket(): Promise<void> {
    const { data: buckets, error } = await admin.storage.listBuckets();
    if (error) throw error;
    const exists = buckets?.some((b) => b.name === BUCKET);
    if (exists) {
        console.log(`✓ Bucket '${BUCKET}' already exists`);
        return;
    }
    const { error: createErr } = await admin.storage.createBucket(BUCKET, {
        public: true,
        fileSizeLimit: 52428800, // 50 MB
    });
    if (createErr) throw createErr;
    console.log(`✓ Bucket '${BUCKET}' created (public, 50 MB limit)`);
}

async function uploadAll(): Promise<string[]> {
    const files = fs
        .readdirSync(DOCS_DIR)
        .filter((f) => path.extname(f).toLowerCase() === '.pdf');

    console.log(`\nUploading ${files.length} PDFs to ${BUCKET}/${FOLDER}/ …\n`);

    const uploaded: string[] = [];
    for (const file of files) {
        const buffer = fs.readFileSync(path.join(DOCS_DIR, file));
        const ext = path.extname(file).toLowerCase();
        const key = `${FOLDER}/${sanitizeKey(file)}`;

        const { error } = await admin.storage.from(BUCKET).upload(key, buffer, {
            contentType: CONTENT_TYPES[ext] ?? 'application/octet-stream',
            upsert: true,
        });

        if (error) {
            console.error(`  ✗ ${file}: ${error.message}`);
            continue;
        }
        uploaded.push(file);
        console.log(`  ✓ ${file}`);
    }
    return uploaded;
}

async function verify(sampleFile: string): Promise<void> {
    const { data } = admin.storage.from(BUCKET).getPublicUrl(`${FOLDER}/${sanitizeKey(sampleFile)}`);
    const url = data.publicUrl;
    console.log(`\nVerifying public access:\n  ${url}`);
    const res = await fetch(url, { method: 'HEAD' });
    console.log(`  HTTP ${res.status} · content-type: ${res.headers.get('content-type')}`);
    if (!res.ok) {
        console.error('  ✗ Public URL not reachable — check bucket visibility.');
        process.exit(1);
    }
    console.log('  ✓ Reachable');
}

async function main() {
    console.log('IEAM docs → Supabase Storage migration\n');
    await ensureBucket();
    const uploaded = await uploadAll();
    if (uploaded.length === 0) {
        console.error('\nNo files uploaded.');
        process.exit(1);
    }
    await verify('infografía-75paísesexcluidos_ES.pdf');
    console.log(`\nDone. ${uploaded.length} files in ${BUCKET}/${FOLDER}/.`);
    console.log(
        `Public base: ${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${FOLDER}/`,
    );
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
