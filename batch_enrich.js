import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import fs from "fs";
import { pages } from "./src/content/pages.js";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "AIzaSyBB71OoQFYqVsWBqJaF20fFI6biFaqWaig");
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

async function enrichOne(page) {
  const filePath = `./enriched_data/${page.slug.replace(/\//g, "_")}.json`;
  if (fs.existsSync(filePath)) {
    console.log(`Déjà enrichi : ${page.slug}`);
    return;
  }

  console.log(`Enrichissement de : ${page.slug}...`);
  const prompt = `
Tu es un expert en SEO sémantique. Transforme cette ébauche JSON en un guide complet de 1200+ mots.
{
    "slug": "${page.slug}",
    "title": "${page.title}",
    "description": "${page.description}",
    "h1": "${page.h1}",
    "intro": "${page.intro}"
}

INSTRUCTIONS :
1. Développe chaque section pour atteindre 1200 mots min.
2. Ajoute des sections profondes (psychologie, CTR, AIDA, IA/SGE).
3. Utilise des structures riches : h2, paragraphs, bullets, checklist, table, callout.
4. Génère une URL d'image Unsplash réaliste pour "hero": https://images.unsplash.com/photo-XXXXXXXXXXXX?auto=format&fit=crop&w=1200&q=80
5. Réponds UNIQUEMENT en JSON pur :
{
  "hero": { "src": "URL", "alt": "ALT" },
  "intro": "LONGUE_INTRO",
  "sections": [ { "h2": "...", "paragraphs": [...], "bullets": [...], "checklist": [...], "callout": {...}, "table": {...} } ]
}
`.trim();

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim().replace(/```json/g, "").replace(/```/g, "");
    JSON.parse(text); // Validation
    fs.writeFileSync(filePath, text);
    console.log(`Succès : ${page.slug}`);
  } catch (e) {
    console.error(`Échec pour ${page.slug} :`, e.message);
  }
}

async function main() {
  const toEnrich = pages.filter(p => ["pillar", "guide", "example"].includes(p.type));
  console.log(`${toEnrich.length} pages à enrichir.`);
  
  for (const page of toEnrich) {
    await enrichOne(page);
    // Petit délai pour respecter les quotas
    await new Promise(r => setTimeout(r, 2000));
  }
}

main();
