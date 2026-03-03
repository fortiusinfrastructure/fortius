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

  // Replace component usages where `const { locale } = await params;` or `const locale = ...` is available.
  // We'll just replace `const t = await getTranslations('Namespace');` with `const t = await getTranslations({ locale, namespace: 'Namespace' });`
  // ONLY if it's inside a function that has params/locale. Let's do a simple exact match replace, assuming `locale` is defined in the scope (which it is for our pages).
  
  content = content.replace(
    /const t = await getTranslations\('([^']+)'\);/g,
    "const t = await getTranslations({ locale, namespace: '$1' });"
  );
  
  // same with let t
  content = content.replace(
     /let t = await getTranslations\('([^']+)'\);/g,
    "let t = await getTranslations({ locale, namespace: '$1' });"
  );

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log('Fixed:', file);
    fixed++;
  }
}
console.log('Total fixed:', fixed);
