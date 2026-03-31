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
  return `<section class="quick-faq" id="faq" aria-labelledby="faq-title">
    <h2 id="faq-title">Questions fréquentes (FAQ)</h2>
    <dl>${items.map((item) => `<dt>${esc(item.q)}</dt><dd>${esc(item.a)}</dd>`).join('')}</dl>
  </section>`;
}

function renderToc(sections = []) {
  const eligible = sections.filter((s) => s?.h2);
  if (eligible.length < 3) return '';
  return `<nav class="toc" aria-labelledby="toc-title">
    <h2 id="toc-title">Dans ce guide</h2>
    <ol>${eligible.map((section) => `<li><a href="#${esc(slugify(section.h2))}">${esc(section.h2)}</a></li>`).join('')}</ol>
  </nav>`;
}

function renderSection(section) {
  const listItems = (section.list || []).map((path) => {
    const pg = pageMap.get(path);
    return `<li><a href="${path}">${esc(pg?.h1 || path)}</a></li>`;
  });

  return `<section class="article-section">
    ${section.h2 ? `<h2 id="${esc(slugify(section.h2))}">${esc(section.h2)}</h2>` : ''}
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

  const adsenseScript = `
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9232304229735146"
     crossorigin="anonymous"></script>`;

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
  ${adsenseScript}
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
      <span class="kicker">${esc(page.cluster || 'SEO Editorial')}</span>
      <h1>${esc(page.h1)}</h1>
      
      <div class="meta-line">
        <span>🕒 ${readingMinutes} min de lecture</span>
        <span>📅 Mis à jour le ${esc(page.updatedAt || '2026-03-13')}</span>
        <span>✍️ Par ${esc(page.author || site.editorialTeam)}</span>
      </div>

      <p class="intro">${esc(page.intro || '')}</p>

      <figure class="hero-media">
        <img src="${page.hero?.src || site.defaultHero.src}" alt="${esc(page.hero?.alt || page.h1)}" loading="eager" />
      </figure>

      ${renderToc(page.sections || [])}

      ${page.keyTakeaways?.length ? `
      <section class="key-points">
        <h2>Points clés à retenir</h2>
        <ul>${page.keyTakeaways.map((k) => `<li>${esc(k)}</li>`).join('')}</ul>
      </section>` : ''}

      <div class="ad-slot" aria-label="adsense-slot-top"></div>

      ${(page.sections || []).map((section, i) => {
        const html = renderSection(section);
        if (i === 1) {
          return `${html}<div class="ad-slot" aria-label="adsense-slot-middle"></div>`;
        }
        return html;
      }).join('')}

      ${renderQuickFaq(page.quickFaq || [])}

      <section class="cta-tool-block" aria-label="Outil FAQ Builder gratuit">
        <div class="cta-tool-inner">
          <div class="cta-tool-text">
            <h2>⚡ Générez votre FAQ JSON-LD en 30 secondes</h2>
            <p>Notre outil gratuit produit un balisage schema propre, validé et prêt à coller sur votre site — sans coder.</p>
          </div>
          <a class="cta-tool-btn" href="/tool">Lancer l’outil FAQ Builder →</a>
        </div>
      </section>
    </article>

    <aside class="sidebar">
      <div class="card card-tool-cta">
        <p class="card-tool-label">Outil gratuit</p>
        <h3>FAQ Builder JSON-LD</h3>
        <p>Générez vos balises schema en 30 secondes, sans coder.</p>
        <a class="sidebar-tool-btn" href="/tool">⚡ Lancer l'outil →</a>
      </div>
      <div class="card">
        <h3>Articles liés</h3>
        <ul>${related.map((p) => `<li><a href="${p.slug}">${esc(p.h1)}</a></li>`).join('')}</ul>
      </div>
      <div class="card">
        <h3>Tous les articles</h3>
        <ul>
          <li><a href="/articles">Catalogue complet (54 articles)</a></li>
          <li><a href="/faq-examples">Exemples par métier</a></li>
          <li><a href="/faq-seo">Guide FAQ SEO</a></li>
        </ul>
      </div>
      <div class="card">
        <h3>À propos</h3>
        <ul>
          <li><a href="/about">Notre mission</a></li>
          <li><a href="/contact">Nous contacter</a></li>
          <li><a href="/privacy">Confidentialité</a></li>
          <li><a href="/mentions">Mentions légales</a></li>
        </ul>
      </div>
      <div class="ad-slot" aria-label="adsense-slot-sidebar"></div>
    </aside>
  </main>

  <footer class="footer">
    <div class="container">
      <p>© ${new Date().getFullYear()} OperonCore — Hub éditorial SEO & FAQ Schema.</p>
    </div>
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
