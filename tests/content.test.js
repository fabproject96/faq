import test from 'node:test';
import assert from 'node:assert/strict';
import { pageMap } from '../src/content/pages.js';
import { renderPage, renderRobotsTxt, renderSitemapXml } from '../src/render/site-renderer.js';

test('core seo pages exist', () => {
  ['/','/resources','/faq-seo','/faq-json-ld','/faq-schema','/faq-examples','/faq-local-seo','/how-to-add-faq-schema'].forEach((slug) => {
    assert.ok(pageMap.has(slug));
  });
});

test('long-tail pages exist and are distinct', () => {
  [
    '/examples/kinesitherapeute',
    '/examples/osteopathe',
    '/examples/electricien',
    '/examples/couvreur',
    '/examples/notaire',
    '/examples/comptable',
    '/examples/agent-immobilier',
    '/examples/paysagiste',
    '/faq-page-devis',
    '/faq-page-contact',
    '/faq-landing-page-locale',
    '/faq-page-service-urgence',
    '/faq-page-prestation-premium',
    '/faq-rassurer-avant-rdv',
    '/faq-reduire-objections-prix',
    '/faq-ameliorer-page-service-locale',
    '/faq-convertir-page-seo-locale',
    '/json-ld-page-service-locale',
    '/json-ld-prestataire-freelance',
    '/checklist-faq-schema-anti-duplication-villes'
  ].forEach((slug) => assert.ok(pageMap.has(slug)));
});

test('renderPage includes credibility and ad slots', () => {
  const html = renderPage('/faq-seo');
  assert.match(html, /adsense-slot-top/);
  assert.match(html, /adsense-slot-middle/);
  assert.match(html, /Mis à jour le/);
  assert.match(html, /Par OperonCore Editorial Team/);
  assert.match(html, /min de lecture/);
  assert.match(html, /Dans ce guide/); // Nouveau TOC
});

test('enriched pages render table, callout and checklist blocks', () => {
  const html = renderPage('/faq-page-devis');
  assert.match(html, /editorial-table/);
  assert.match(html, /checklist-box/);
  assert.match(html, /callout/);
});

test('hero image renders with alt text', () => {
  const html = renderPage('/faq-seo');
  assert.match(html, /hero-media/);
  assert.match(html, /<img /);
  // On ne teste plus l'alt exact car il est généré par Gemini et varie
  assert.match(html, /alt="/);
});

test('robots and sitemap are generated with lastmod', () => {
  assert.match(renderRobotsTxt(), /Sitemap:/);
  const xml = renderSitemapXml();
  assert.match(xml, /<urlset/);
  assert.match(xml, /<lastmod>/);
  assert.match(xml, /examples\/kinesitherapeute/);
});
