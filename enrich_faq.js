import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "AIzaSyBB71OoQFYqVsWBqJaF20fFI6biFaqWaig");
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const targetSlug = "/faq-seo";

async function enrichArticle() {
  console.log(`Enrichissement de l'article : ${targetSlug}...`);

  const prompt = `
Tu es un expert en SEO sémantique et en rédaction de contenu de haute qualité.
Ton objectif est de transformer une ébauche d'article JSON en un guide complet de plus de 1200 mots, ultra-détaillé et utile pour les PME et freelances.

Voici le contenu actuel (JSON) :
{
    "slug": "/faq-seo",
    "title": "FAQ SEO: méthode complète, checklist et erreurs à éviter",
    "description": "Guide pilier FAQ SEO: définition, utilité, cadre d’usage, erreurs, checklist et cas concret.",
    "h1": "FAQ SEO: construire un bloc utile, crédible et performant",
    "intro": "Une FAQ SEO performante ne sert pas à “faire du volume”, mais à répondre aux vraies questions qui bloquent la décision. Cette page vous donne une méthode complète pour construire une FAQ lisible, utile et maintenable, avec un cadre éditorial réellement exploitable en PME, freelance ou agence.",
    "keyTakeaways": [
      "Une FAQ forte répond à des objections réelles, pas à des mots-clés isolés.",
      "4 à 8 questions solides valent mieux que 20 questions faibles.",
      "La cohérence entre contenu visible, FAQ et schema est essentielle.",
      "La maintenance trimestrielle fait la différence sur la durée."
    ]
}

INSTRUCTIONS :
1. Développe chaque section pour atteindre un total de 1200 mots minimum.
2. Ajoute des sections profondes sur :
    - La psychologie de l'utilisateur qui consulte une FAQ.
    - L'impact du Schema Markup (JSON-LD) sur le taux de clic (CTR).
    - Comment transformer une FAQ en outil de conversion (AIDA).
    - L'avenir des FAQ avec l'IA (Search Generative Experience / SearchGPT).
3. Pour chaque section, fournis :
    - Un titre h2 accrocheur.
    - Plusieurs paragraphes détaillés (au moins 3-4 par section).
    - Parfois des "bullets", "checklist", "table" ou "callout" (info ou warning) pour enrichir la mise en page.
4. Génère une URL d'image réaliste (via Unsplash Source ou similaire) pour l'objet "hero" : https://images.unsplash.com/photo-XXXXXXXXXXXX?auto=format&fit=crop&w=1200&q=80
5. Conserve la structure JSON suivante pour la sortie :
{
  "hero": { "src": "URL_UNSPLASH", "alt": "ALT_TEXT" },
  "intro": "INTRO_ENRICHIE_LONGUE",
  "sections": [
    {
      "h2": "TITRE",
      "paragraphs": ["P1", "P2", "P3", "P4"],
      "bullets": ["B1", "B2"],
      "callout": { "kind": "info", "title": "TITRE", "text": "TEXTE" },
      "table": { "headers": ["H1", "H2"], "rows": [ ["R1C1", "R1C2"], ["R2C1", "R2C2"] ] }
    },
    ...
  ]
}

Réponds UNIQUEMENT avec le JSON pur, sans markdown, sans texte autour.
`.trim();

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim().replace(/```json/g, "").replace(/```/g, "");
    
    // Test de validité JSON
    JSON.parse(text);
    
    fs.writeFileSync("enriched_article.json", text);
    console.log("Article enrichi sauvegardé dans enriched_article.json");
  } catch (error) {
    console.error("Erreur lors de la génération :", error);
  }
}

enrichArticle();
