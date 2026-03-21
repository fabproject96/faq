import { nav, pageMap, pages, site } from '../content/pages.js';

function esc(s = '') {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function renderTable(table) {
  if (!table?.headers?.length || !table?.rows?.length) return '';
  return `<div class="table-wrap">
    ${table.caption ? `<p class="table-caption">${esc(table.caption)}</p>` : ''}
    <table class="editorial-table">
      <thead><tr>${table.headers.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead>
      <tbody>
        ${table.rows
          .map((row) => `<tr>${row.map((cell) => `<td>${esc(cell)}</td>`).join('')}</tr>`)
          .join('')}
      </tbody>
    </table>
  </div>`;
}

function renderCallout(callout) {
  if (!callout?.title && !callout?.text) return '';
  const kind = callout.kind || 'info';
  return `<aside class="callout ${kind}">
    ${callout.title ? `<strong>${esc(callout.title)}</strong>` : ''}
    ${callout.text ? `<p>${esc(callout.text)}</p>` : ''}
  </aside>`;
}

function renderChecklist(checklist = []) {
  if (!checklist.length) return '';
  return `<div class="checklist-box">
    <p class="checklist-title">Checklist actionnable</p>
    <ul>${checklist.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>
  </div>`;
}

function slugify(text = '') {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function estimateReadingTime(page) {
  const chunks = [
    page.h1,
    page.intro,
    ...(page.keyTakeaways || []),
    ...(page.quickFaq || []).flatMap((x) => [x.q, x.a]),
    ...(page.sections || []).flatMap((section) => [
      section.h2,
      ...(section.paragraphs || []),
      ...(section.bullets || []),
      ...(section.checklist || []),
      ...(section.table?.rows || []).flat()
    ])
  ]
    .filter(Boolean)
    .join(' ');
  return Math.max(1, Math.ceil(chunks.split(/\s+/).filter(Boolean).length / 200));
}

function renderQuickFaq(items = []) {
  if (!items.length) return '';
  return `<section class="quick-faq" aria-labelledby="quick-faq-title">
    <h2 id="quick-faq-title">FAQ express</h2>
    <dl>${items.map((item) => `<dt>${esc(item.q)}</dt><dd>${esc(item.a)}</dd>`).join('')}</dl>
  </section>`;
}

function renderToc(sections = []) {
  const eligible = sections.filter((s) => s?.h2);
  if (eligible.length < 3) return '';
  return `<nav class="toc" aria-labelledby="toc-title">
    <h2 id="toc-title">Sommaire</h2>
    <ol>${eligible.map((section) => `<li><a href="#${esc(slugify(section.h2))}">${esc(section.h2)}</a></li>`).join('')}</ol>
  </nav>`;
}

function renderSection(section) {
  const listItems = (section.list || []).map((path) => {
    const pg = pageMap.get(path);
    return `<li><a href="${path}">${esc(pg?.h1 || path)}</a></li>`;
  });

  return `<section class="article-section">
    <h2 id="${esc(slugify(section.h2 || 'section'))}">${esc(section.h2 || '')}</h2>
    ${(section.paragraphs || []).map((p) => `<p>${esc(p)}</p>`).join('')}
    ${section.bullets?.length ? `<ul>${section.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>` : ''}
    ${listItems.length ? `<ul>${listItems.join('')}</ul>` : ''}
    ${renderChecklist(section.checklist || [])}
    ${renderCallout(section.callout)}
    ${renderTable(section.table)}
    ${section.links?.length ? `<p class="internal-links">${section.links.map((l) => `<a href="${l.href}">${esc(l.label)}</a>`).join(' · ')}</p>` : ''}
  </section>`;
}

function scoreRelated(page, candidate) {
  let score = 0;
  if (page.cluster && candidate.cluster === page.cluster) score += 4;
  if (page.type && candidate.type === page.type) score += 2;

  const overlap = (page.intents || []).filter((i) => (candidate.intents || []).includes(i)).length;
  score += overlap;

  if (page.type === 'pillar' && candidate.type === 'guide') score += 2;
  if (page.type === 'guide' && candidate.type === 'example') score += 2;
  if (candidate.slug === '/tool') score -= 2;
  return score;
}

function relatedLinks(slug) {
  const page = pageMap.get(slug);
  if (!page) return [];

  return pages
    .filter((p) => p.slug !== slug && p.type !== 'support')
    .map((p) => ({ p, score: scoreRelated(page, p) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 7)
    .map(({ p }) => p);
}

export function renderPage(slug) {
  const page = pageMap.get(slug);
  if (!page) return null;

  const canonical = `${site.baseUrl}${slug === '/' ? '' : slug}`;
  const related = relatedLinks(slug);
  const readingMinutes = estimateReadingTime(page);

  return `<!doctype html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(page.title)}</title>
  <meta name="description" content="${esc(page.description)}" />
  <link rel="canonical" href="${esc(canonical)}" />
  <meta property="og:title" content="${esc(page.title)}" />
  <meta property="og:description" content="${esc(page.description)}" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="${esc(canonical)}" />
  <link rel="stylesheet" href="/site.css" />
</head>
<body>
  <header class="site-header">
    <div class="container nav-wrap">
      <a class="logo" href="/">OperonCore FAQ Hub</a>
      <nav>${nav.map((n) => `<a href="${n.href}">${esc(n.label)}</a>`).join('')}</nav>
    </div>
  </header>

  <main class="container editorial-layout">
    <article>
      <p class="kicker">SEO-first editorial hub</p>
      <h1>${esc(page.h1)}</h1>
      <p class="reading-time">Lecture estimée: ${readingMinutes} min</p>
      <p class="intro">${esc(page.intro || '')}</p>

      <p class="editorial-note">Contenu conçu pour PME, freelances et agences — objectif: utilité pratique et maintenance durable.</p>

      <figure class="hero-media">
        <img src="${esc(page.hero?.src || site.defaultHero.src)}" alt="${esc(page.hero?.alt || page.h1)}" loading="eager" decoding="async" />
      </figure>

      ${page.keyTakeaways?.length ? `<section class="key-points"><h2>Ce qu’il faut retenir</h2><ul>${page.keyTakeaways.map((k) => `<li>${esc(k)}</li>`).join('')}</ul></section>` : ''}
      ${renderQuickFaq(page.quickFaq || [])}
      ${renderToc(page.sections || [])}

      <div class="trust-row">
        <span>Mis à jour le ${esc(page.updatedAt)}</span>
        <span>Par ${esc(page.author)}</span>
        <span>Cluster: ${esc(page.cluster)}</span>
      </div>

      <div class="ad-slot" aria-label="future-adsense-slot-top">Emplacement AdSense futur (top article)</div>

      ${(page.sections || []).map((section, i) => {
        const html = renderSection(section);
        if (i === 1) {
          return `${html}<div class="ad-slot" aria-label="future-adsense-slot-middle">Emplacement AdSense futur (milieu article)</div>`;
        }
        return html;
      }).join('')}

      <section class="article-section">
        <h2>Passer à l’action avec l’outil</h2>
        <p>Utilisez le builder pour générer un brouillon FAQ + JSON-LD, puis adaptez les réponses à votre contexte métier.</p>
        <p><a class="btn" href="/tool">Ouvrir l’outil FAQ + Schema + AEO Builder</a></p>
      </section>

      ${slug === ‘/’ ? `
      <section class="article-section network-section">
        <h2>Réseau de blogs OperonCore</h2>
        <p class="intro">Microsites spécialisés — contenu SEO longue traîne, monétisation AdSense &amp; affiliés.</p>
        <div class="blogs-grid">
          <a href="https://mind.operoncore.com" target="_blank" rel="noopener" class="blog-card">
            <span class="blog-tag">IA &amp; Philosophie</span>
            <strong>EspritIA</strong>
            <span class="blog-desc">Réflexions d’une IA sur l’existence, la cognition et l’humanité. Articles + vidéos YouTube.</span>
            <span class="blog-lang">FR</span>
          </a>
          <a href="https://credit.operoncore.com" target="_blank" rel="noopener" class="blog-card">
            <span class="blog-tag">Finances personnelles</span>
            <strong>CréditNav</strong>
            <span class="blog-desc">40 guides FR sur le crédit, les dettes et les finances personnelles au Canada.</span>
            <span class="blog-lang">FR</span>
          </a>
          <a href="https://maison.operoncore.com" target="_blank" rel="noopener" class="blog-card">
            <span class="blog-tag">Rénovation &amp; Domotique</span>
            <strong>MaisonExpert</strong>
            <span class="blog-desc">59 articles FR sur la rénovation, la domotique et l’entretien de la maison.</span>
            <span class="blog-lang">FR</span>
          </a>
          <a href="https://patte.operoncore.com" target="_blank" rel="noopener" class="blog-card">
            <span class="blog-tag">Animaux de compagnie</span>
            <strong>PatteExpert</strong>
            <span class="blog-desc">20 articles FR sur les soins, la santé et le bien-être des animaux.</span>
            <span class="blog-lang">FR</span>
          </a>
          <a href="https://tech.operoncore.com" target="_blank" rel="noopener" class="blog-card">
            <span class="blog-tag">Technologie</span>
            <strong>TechExpert</strong>
            <span class="blog-desc">60 comparatifs et guides tech FR avec liens affiliés Amazon.ca.</span>
            <span class="blog-lang">FR</span>
          </a>
          <a href="https://margin.operoncore.com" target="_blank" rel="noopener" class="blog-card">
            <span class="blog-tag">Business &amp; Productivité</span>
            <strong>Margin Hub</strong>
            <span class="blog-desc">80 playbooks EN/FR sur la rentabilité, la marge et la croissance.</span>
            <span class="blog-lang">EN / FR</span>
          </a>
          <a href="https://petins.operoncore.com" target="_blank" rel="noopener" class="blog-card">
            <span class="blog-tag">Pet Insurance</span>
            <strong>PetIns Hub</strong>
            <span class="blog-desc">Guides and comparisons on pet insurance plans in North America.</span>
            <span class="blog-lang">EN</span>
          </a>
          <a href="https://faq.operoncore.com" target="_blank" rel="noopener" class="blog-card">
            <span class="blog-tag">FAQ &amp; AEO</span>
            <strong>FAQ Content Hub</strong>
            <span class="blog-desc">Contenu FAQ optimisé pour les moteurs de réponse (AEO/GEO/SGE).</span>
            <span class="blog-lang">FR / EN</span>
          </a>
        </div>
      </section>` : ‘’}
    </article>

    <aside class="sidebar">
      <div class="card">
        <h3>Pages liées (maillage sémantique)</h3>
        <ul>${related.map((p) => `<li><a href="${p.slug}">${esc(p.h1)}</a></li>`).join('')}</ul>
      </div>
      <div class="card">
        <h3>Confiance & transparence</h3>
        <ul>
          <li><a href="/about">À propos</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/privacy">Confidentialité</a></li>
          <li><a href="/mentions">Mentions</a></li>
        </ul>
      </div>
      <div class="ad-slot" aria-label="future-adsense-slot-sidebar">Emplacement AdSense futur (sidebar)</div>
    </aside>
  </main>

  <footer class="container footer">
    <p>© OperonCore — Ressources éditoriales FAQ/Schema. Outil gratuit intégré pour accélérer la production.</p>
  </footer>
</body>
</html>`;
}

export function renderSitemapXml() {
  const urls = pages
    .map((p) => `<url><loc>${site.baseUrl}${p.slug === '/' ? '' : p.slug}</loc><lastmod>${p.updatedAt || '2026-03-13'}</lastmod></url>`)
    .join('');
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
}

export function renderRobotsTxt() {
  return `User-agent: *\nAllow: /\nSitemap: ${site.baseUrl}/sitemap.xml\n`;
}
