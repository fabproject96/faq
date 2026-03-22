import { pages } from './src/content/pages.js';
import fs from 'fs';

const baseUrl = 'https://operoncore.com';
const urls = pages.map(p => {
    const slug = p.slug === '/' ? '' : p.slug;
    return `  <url>
    <loc>${baseUrl}${slug}</loc>
    <lastmod>${p.updatedAt || '2026-03-21'}</lastmod>
    <priority>${p.slug === '/' ? '1.0' : '0.8'}</priority>
  </url>`;
}).join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

fs.writeFileSync('./public/sitemap.xml', xml);
console.log('Sitemap.xml generated with ' + pages.length + ' pages.');
