import fs from 'fs';
import { translate } from '@vitalets/google-translate-api';

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function translateText(text, targetLangCode) {
    if (!text) return text;
    let retries = 3;
    while (retries > 0) {
        try {
            const res = await translate(text, { to: targetLangCode });
            return res.text;
        } catch (e) {
            console.error(`Error translating text (retries left: ${retries - 1}):`, e.message || e);
            retries--;
            if (retries === 0) throw e;
            await sleep(3000);
        }
    }
}

async function main() {
    console.log("Reading JSON files...");
    const basePath = 'apps/web-escuela-hispanica/src/messages';
    const esData = JSON.parse(fs.readFileSync(`${basePath}/es.json`, 'utf8'));
    const enData = JSON.parse(fs.readFileSync(`${basePath}/en.json`, 'utf8'));
    const ptData = JSON.parse(fs.readFileSync(`${basePath}/pt.json`, 'utf8'));
    
    const authors = esData.Biografias.authors;
    const authorKeys = Object.keys(authors);
    
    console.log(`Found ${authorKeys.length} authors to translate.`);
    
    // Process serially to avoid rate limits
    for (let i = 0; i < authorKeys.length; i++) {
        const key = authorKeys[i];
        console.log(`[${i + 1}/${authorKeys.length}] Translating ${key}...`);
        
        const esBio = authors[key].shortBio;
        
        let enText = esBio;
        let ptText = esBio;
        
        try {
            enText = await translateText(esBio, 'en');
        } catch(e) {
            console.error("Failed EN for " + key);
        }
        
        try {
            ptText = await translateText(esBio, 'pt');
        } catch(e) {
            console.error("Failed PT for " + key);
        }
        
        if (!enData.Biografias.authors[key]) enData.Biografias.authors[key] = { ...authors[key] };
        enData.Biografias.authors[key].shortBio = enText;
        
        if (!ptData.Biografias.authors[key]) ptData.Biografias.authors[key] = { ...authors[key] };
        ptData.Biografias.authors[key].shortBio = ptText;
        
        // Small delay
        await sleep(1000);
    }
    
    console.log("Writing translated JSON back to files...");
    fs.writeFileSync(`${basePath}/en.json`, JSON.stringify(enData, null, 4) + '\\n');
    fs.writeFileSync(`${basePath}/pt.json`, JSON.stringify(ptData, null, 4) + '\\n');
    
    console.log("Translation complete!");
}

main().catch(e => {
    console.error("Script failed:", e);
    process.exit(1);
});
