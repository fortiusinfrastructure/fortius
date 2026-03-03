import fs from 'fs';
import path from 'path';

function findFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const stat = fs.statSync(path.join(dir, file));
    if (stat.isDirectory()) {
      findFiles(path.join(dir, file), fileList);
    } else if (file.endsWith('.tsx') && !file.includes('.next')) {
      fileList.push(path.join(dir, file));
    }
  }
  return fileList;
}

const files = findFiles('./src/app/[locale]');
let fixed = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf-8');
  let original = content;

  // Case 1: "export async function generateMetadata(): Promise<Metadata> {"
  content = content.replace(
    /export async function generateMetadata\(\):\s*Promise<Metadata>\s*\{\s*const t = await getTranslations\('([^']+)'\);/g,
    "export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {\n    const { locale } = await params;\n    const t = await getTranslations({ locale, namespace: '$1' });"
  );

  // Case 2: "export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {"
  content = content.replace(
    /export async function generateMetadata\(\{ params: \{ locale \} \}: \{ params: \{ locale: string \} \}\):\s*Promise<Metadata>\s*\{\s*const t = await getTranslations\('([^']+)'\);/g,
    "export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {\n    const { locale } = await params;\n    const t = await getTranslations({ locale, namespace: '$1' });"
  );

  // Case 3: "export async function generateMetadata({ params }: Props): Promise<Metadata> {"
  content = content.replace(
    /export async function generateMetadata\(\{ params \}: (Props|{[^}]+})\):\s*Promise<Metadata>\s*\{\s*const t = await getTranslations\('([^']+)'\);/g,
    "export async function generateMetadata({ params }: $1): Promise<Metadata> {\n    const { locale } = await params;\n    const t = await getTranslations({ locale, namespace: '$2' });"
  );

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log('Fixed:', file);
    fixed++;
  }
}
console.log('Total fixed:', fixed);
