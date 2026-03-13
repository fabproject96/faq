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
  assert.match(html, /future-adsense-slot-top/);
  assert.match(html, /future-adsense-slot-middle/);
  assert.match(html, /Mis à jour le/);
  assert.match(html, /Par OperonCore Editorial Team/);
  assert.match(html, /Pages liées \(maillage sémantique\)/);
  assert.match(html, /Contenu conçu pour PME, freelances et agences/);
  assert.match(html, /Lecture estimée:/);
  assert.match(html, /FAQ express/);
  assert.match(html, /Sommaire/);
});

test('enriched pages render table, callout and checklist blocks', () => {
  const html = renderPage('/faq-page-devis');
  assert.match(html, /editorial-note/);
  assert.match(html, /editorial-table/);
  assert.match(html, /checklist-box/);
  assert.match(html, /callout/);
});

test('hero image renders with alt text', () => {
  const html = renderPage('/faq-seo');
  assert.match(html, /hero-media/);
  assert.match(html, /<img /);
  assert.match(html, /alt="Guide complet sur la création de FAQ SEO utiles, crédibles et orientées conversion"/);
});

test('robots and sitemap are generated with lastmod', () => {
  assert.match(renderRobotsTxt(), /Sitemap:/);
  const xml = renderSitemapXml();
  assert.match(xml, /<urlset/);
  assert.match(xml, /<lastmod>/);
  assert.match(xml, /examples\/kinesitherapeute/);
});
