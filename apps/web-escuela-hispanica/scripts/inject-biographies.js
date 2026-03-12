/**
 * Script to inject complete biography texts from the instructions markdown
 * into the es.json translation file.
 * 
 * Run: node scripts/inject-biographies.js
 */
const fs = require("fs");
const path = require("path");

const instructionsPath = path.join(__dirname, "../public/recursos/biografias_instrucciones.md");
const esJsonPath = path.join(__dirname, "../src/messages/es.json");

const text = fs.readFileSync(instructionsPath, "utf-8");
const lines = text.split("\n");

// Map from author name (normalized) to JSON key
const nameToKey = {
    "francisco de vitoria": "vitoria",
    "bartolomé de las casas": "lascasas",
    "martín de azpilcueta": "azpilcueta",
    "domingo de soto": "soto",
    "alonso de la vera cruz": "veracruz",
    "diego de covarrubias y leyva": "covarrubias",
    "fernando vázquez de menchaca": "menchaca",
    "tomás de mercado": "mercado",
    "bartolomé de medina": "medina",
    "josé de anchieta": "anchieta",
    "luis de molina": "molina",
    "pedro da fonseca": "fonseca",
    "domingo báñez": "banez",
    "juan de mariana": "mariana",
    "pedro de aragón": "aragon",
    "francisco suárez": "suarez",
    "josé de acosta": "acosta",
    "roberto belarmino": "belarmino",
    "luis saravia de la calle": "saravia",
    "juan de salas": "salas",
    "juan de solórzano pereira": "solorzano",
    "juan de lugo": "lugo",
    "juan de palafox y mendoza": "palafox",
    "juan caramuel y lobkowitz": "caramuel",
    "pedro murillo velarde": "velarde",
    "pedro rodríguez de campomanes": "campomanes",
    "francisco javier clavijero": "clavijero",
    "gaspar melchor de jovellanos": "jovellanos",
    "juan pablo viscardo y guzmán": "viscardo",
    "francisco martínez marina": "martinezmarina",
    "juan pablo forner": "forner",
    "francisco de miranda": "miranda",
    "melchor de talamantes": "talamantes",
    "servando teresa de mier": "mier",
    "camilo henríquez": "henriquez",
    "andrés bello": "bello",
    "lucas alamán": "alaman",
    "josé maría gutiérrez de estrada": "estrada",
    "bartolomé herrera": "herrera",
    "juan donoso cortés": "cortes",
    "alexandre herculano": "herculano",
    "jaime balmes": "balmes",
    "marcelino menéndez pelayo": "menendez",
    "juan vázquez de mella": "mella",
    "josé rizal": "rizal",
    "apolinario mabini": "mabini",
    "miguel de unamuno": "unamuno",
    "ramiro de maeztu": "maeztu",
    "víctor andrés belaúnde": "belaunde",
    "josé ortega y gasset": "ortega",
    "salvador de madariaga": "madariaga",
    "antónio sardinha": "sardinha",
    "cabral de moncada": "moncada",
    "julio meinvielle": "meinvielle",
    "jaime eyzaguirre": "eyzaguirre",
    "marjorie grice-hutchinson": "grice",
    "mariano navarro rubio": "navarro",
    "mario góngora": "gongora",
    "álvaro d'ors": "dors",
    "carlos stoetzer": "stoetzer",
    "rafael termes carreró": "termes",
    "francisco canals vidal": "canals",
    "ismael sánchez bella": "sanchez",
    "gonzalo fernández de la mora": "mora",
    "juan velarde fuertes": "velardefuertes",
    "efraín gonzález morfín": "gonzalez",
    "dalmacio negro pavón": "negro",
    "carlos alberto sacheri": "sacheri",
    "constantino ocha'a mve bengobesama": "ochaa",
    "pedro schwartz": "schwartz",
    "bernardino bravo lira": "bravo",
    "rafael alvira": "alvira",
    "jaime nogueira pinto": "nogueira",
    "olavo de carvalho": "olavo",
    "antónio josé de brito": "brito",
    "francisco cabrillo rodríguez": "cabrillo",
    "josé manuel moreira": "moreira",
    "donato ndongo-bidyogo": "ndongo",
    "juan belda plans": "belda",
    "jesús huerta de soto": "huerta",
};

// Parse the markdown to extract complete bio for each author
const authorPattern = /^([A-ZÁÉÍÓÚÜÑ][a-záéíóúüñA-ZÁÉÍÓÚÜÑ'ç\s\-\.]+)\s+\(([^)]+)\)$/;
let authors = [];
let current = null;

for (let i = 13; i < lines.length; i++) {
    const line = lines[i].trim();
    const match = line.match(authorPattern);

    if (match && match[1].length < 70) {
        // Save previous author
        if (current && current.lines.length > 0) {
            authors.push(current);
        }
        current = { rawName: match[1], period: match[2], lines: [] };
    } else if (current && line) {
        current.lines.push(line);
    }
}
if (current && current.lines.length > 0) {
    authors.push(current);
}

// Deduplicate by rawName (keep first occurrence)
const seen = new Set();
authors = authors.filter(a => {
    const norm = a.rawName.toLowerCase().trim();
    if (seen.has(norm)) return false;
    seen.add(norm);
    return true;
});

console.log(`Parsed ${authors.length} unique authors`);

// Load the ES JSON
const esJson = JSON.parse(fs.readFileSync(esJsonPath, "utf-8"));
const authorsData = esJson.Biografias.authors;

let updated = 0;
let notFound = [];

for (const author of authors) {
    const norm = author.rawName.toLowerCase().trim();
    const key = nameToKey[norm];
    if (!key) {
        notFound.push(author.rawName);
        continue;
    }
    if (!authorsData[key]) {
        authorsData[key] = {};
    }
    // Join all lines as a single biography text
    const fullBio = author.lines.join("\n");
    authorsData[key].shortBio = fullBio;
    updated++;
}

console.log(`Updated ${updated} authors`);
if (notFound.length > 0) {
    console.warn("Not found in key map:", notFound);
}

fs.writeFileSync(esJsonPath, JSON.stringify(esJson, null, 4));
console.log("Written to es.json");
