import fs from 'fs';
import { pages as originalPages } from './src/content/pages.js';

const ENRICHED_DIR = './enriched_data';

async function merge() {
  console.log("Fusion des contenus enrichis...");
  
  const files = fs.readdirSync(ENRICHED_DIR).filter(f => f.endsWith('.json'));
  console.log(`${files.length} fichiers enrichis trouvés.`);

  const enrichedMap = new Map();
  for (const file of files) {
    const content = JSON.parse(fs.readFileSync(`${ENRICHED_DIR}/${file}`, 'utf8'));
    // Reconstruire le slug à partir du nom de fichier (ex: _faq-seo.json -> /faq-seo)
    const slug = file.replace('.json', '').replace(/_/g, '/');
    enrichedMap.set(slug, content);
  }

  const updatedPages = originalPages.map(page => {
    const enriched = enrichedMap.get(page.slug);
    if (enriched) {
      console.log(`Fusion de : ${page.slug}`);
      return {
        ...page,
        hero: enriched.hero,
        intro: enriched.intro,
        sections: enriched.sections,
        updatedAt: new Date().toISOString().split('T')[0] // Mise à jour de la date
      };
    }
    return page;
  });

  // Génération du nouveau fichier JS
  // On utilise une approche prudente pour préserver les imports et la structure
  const header = `// Fichier généré automatiquement - ${new Date().toISOString()}
import { site, nav } from './pages.js'; // Note: ce script doit être adapté selon la structure exacte

function meta(data) {
  return {
    type: data.type,
    cluster: data.cluster,
    intents: data.intents || [],
    updatedAt: data.updatedAt || '2026-03-13',
    author: data.author || 'OperonCore Editorial Team'
  };
}

export const pages = ${JSON.stringify(updatedPages, null, 2)};
`.trim();

  // Pour ne pas tout casser, on va écrire dans un fichier séparé d'abord
  fs.writeFileSync('./src/content/pages_enriched.js', header);
  console.log("Fusion terminée. Nouveau fichier : src/content/pages_enriched.js");
  console.log("Vérifiez le fichier, puis renommez-le en pages.js pour activer les changements.");
}

merge();
