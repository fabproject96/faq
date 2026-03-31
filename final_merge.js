import fs from 'fs';
import { pages as originalPages, site, nav } from './src/content/pages_tmp.js';

const ENRICHED_DIR = './enriched_data';

async function merge() {
  console.log("Fusion complète des contenus...");
  
  const files = fs.readdirSync(ENRICHED_DIR).filter(f => f.endsWith('.json'));
  const enrichedMap = new Map();
  for (const file of files) {
    const content = JSON.parse(fs.readFileSync(`${ENRICHED_DIR}/${file}`, 'utf8'));
    const slug = file.replace('.json', '').replace(/_/g, '/');
    enrichedMap.set(slug, content);
  }

  const updatedPages = originalPages.map(page => {
    const enriched = enrichedMap.get(page.slug);
    if (enriched) {
      return {
        ...page,
        hero: enriched.hero,
        intro: enriched.intro,
        sections: enriched.sections,
        keyTakeaways: page.keyTakeaways || [], // Garder les originaux si présents
        updatedAt: new Date().toISOString().split('T')[0]
      };
    }
    return page;
  });

  const header = `export const site = ${JSON.stringify(site, null, 2)};

export const nav = ${JSON.stringify(nav, null, 2)};

function meta(data) {
  return {
    type: data.type,
    cluster: data.cluster,
    intents: data.intents || [],
    updatedAt: data.updatedAt || '2026-03-13',
    author: data.author || site.editorialTeam
  };
}

export const pages = ${JSON.stringify(updatedPages, null, 2)};

export const pageMap = new Map(pages.map((p) => [p.slug, p]));
`.trim();

  fs.writeFileSync('./src/content/pages.js', header);
  console.log(`Fusion terminée. ${updatedPages.length} pages intégrées.`);
}

merge();
