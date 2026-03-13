import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs/promises';
import { buildFaqOutput } from './app/generator.js';
import { extractTextFromUrl } from './app/fetch-url.js';
import { appendJsonRecord, readJsonArray } from './lib/storage.js';
import { analyticsSummary, track } from './lib/analytics.js';
import { enforceGenerationQuota } from './lib/usage.js';
import { branding } from './config/branding.js';
import { pricing } from './config/pricing.js';
import { seo } from './config/seo.js';
import { landingContent } from './config/content.js';
import { pageMap } from './content/pages.js';
import { renderPage, renderRobotsTxt, renderSitemapXml } from './render/site-renderer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const port = Number(process.env.PORT || 3000);
const analyticsEnabled = process.env.ANALYTICS_ENABLED !== 'false';
const jsonBodyLimit = Number(process.env.JSON_BODY_LIMIT_BYTES || 1024 * 1024);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8'
};

function send(res, status, type, body) {
  res.writeHead(status, { 'Content-Type': type });
  res.end(body);
}

function sendJson(res, status, payload) {
  send(res, status, MIME['.json'], JSON.stringify(payload));
}

async function readBody(req) {
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.byteLength;
    if (size > jsonBodyLimit) throw new Error('Payload trop volumineux.');
    chunks.push(chunk);
  }
  const raw = Buffer.concat(chunks).toString('utf8') || '{}';
  return JSON.parse(raw);
}

function requireAdmin(req) {
  const token = req.headers['x-admin-token'];
  const expected = process.env.ADMIN_TOKEN;
  return Boolean(expected && token && token === expected);
}

async function servePublicAsset(res, reqPath) {
  const fullPath = path.normalize(path.join(publicDir, reqPath));
  if (!fullPath.startsWith(publicDir)) return false;

  try {
    const data = await fs.readFile(fullPath);
    const ext = path.extname(fullPath);
    send(res, 200, MIME[ext] || 'application/octet-stream', data);
    return true;
  } catch {
    return false;
  }
}

const TOOL_ALIASES = new Set(['/tool', '/builder', '/generator']);

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  try {
    if (req.method === 'GET' && url.pathname === '/api/config') {
      return sendJson(res, 200, {
        branding,
        pricing,
        seo,
        landingContent,
        limits: { freeDailyLimit: Number(process.env.FREE_DAILY_LIMIT || 10) }
      });
    }

    if (req.method === 'POST' && url.pathname === '/api/generate') {
      const quota = await enforceGenerationQuota(req);
      if (!quota.allowed) {
        if (analyticsEnabled) await track('free_limit_reached', { endpoint: 'generate' });
        return sendJson(res, 429, { error: 'Limite gratuite atteinte. Passez au plan Pro pour continuer.', code: 'FREE_LIMIT_REACHED', limit: quota.limit });
      }

      const { mode, input, tone = 'neutre' } = await readBody(req);
      if (!mode || !input || typeof input !== 'string') return sendJson(res, 400, { error: 'Paramètres invalides.' });
      if (analyticsEnabled) await track('generation_started', { mode, plan: quota.plan });

      let sourceText = input.trim();
      if (mode === 'url') sourceText = await extractTextFromUrl(sourceText);
      if (sourceText.length < 120) return sendJson(res, 400, { error: 'Contenu insuffisant pour générer des FAQ fiables.' });

      const output = buildFaqOutput(sourceText, { tone, maxItems: mode === 'url' ? 8 : 6 });
      if (analyticsEnabled) await track('generation_success', { mode, plan: quota.plan });
      return sendJson(res, 200, { output, quota });
    }

    if (req.method === 'POST' && url.pathname === '/api/lead') {
      const { email, source = 'landing' } = await readBody(req);
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return sendJson(res, 400, { error: 'Email invalide.' });
      await appendJsonRecord('leads.json', { email, source });
      if (analyticsEnabled) await track('lead_capture', { source });
      return sendJson(res, 200, { ok: true });
    }

    if (req.method === 'POST' && url.pathname === '/api/track') {
      const { event, meta = {} } = await readBody(req);
      if (!event) return sendJson(res, 400, { error: 'Event requis.' });
      if (analyticsEnabled) await track(event, meta);
      return sendJson(res, 200, { ok: true });
    }

    if (req.method === 'GET' && url.pathname === '/api/analytics') {
      if (!requireAdmin(req)) return sendJson(res, 401, { error: 'Accès admin requis.' });
      return sendJson(res, 200, await analyticsSummary());
    }

    if (req.method === 'GET' && url.pathname === '/api/admin/leads') {
      if (!requireAdmin(req)) return sendJson(res, 401, { error: 'Accès admin requis.' });
      const leads = await readJsonArray('leads.json');
      return sendJson(res, 200, { total: leads.length, leads: leads.slice(-100).reverse() });
    }

    if (req.method === 'GET' && url.pathname === '/robots.txt') {
      return send(res, 200, MIME['.txt'], renderRobotsTxt());
    }

    if (req.method === 'GET' && url.pathname === '/sitemap.xml') {
      return send(res, 200, MIME['.xml'], renderSitemapXml());
    }

    if (req.method === 'GET' && (url.pathname.startsWith('/app.js') || url.pathname.startsWith('/styles.css') || url.pathname.startsWith('/site.css'))) {
      const served = await servePublicAsset(res, url.pathname);
      if (served) return;
    }

    if (req.method === 'GET' && TOOL_ALIASES.has(url.pathname)) {
      const tool = await fs.readFile(path.join(publicDir, 'tool.html'));
      return send(res, 200, MIME['.html'], tool);
    }

    if (req.method === 'GET' && pageMap.has(url.pathname)) {
      if (analyticsEnabled) await track('page_view', { slug: url.pathname });
      return send(res, 200, MIME['.html'], renderPage(url.pathname));
    }

    if (req.method === 'GET' && url.pathname === '/') {
      if (analyticsEnabled) await track('page_view', { slug: '/' });
      return send(res, 200, MIME['.html'], renderPage('/'));
    }

    if (req.method === 'GET') {
      return send(res, 404, MIME['.html'], renderPage('/resources') || '<h1>Not found</h1>');
    }

    return sendJson(res, 404, { error: 'Not found' });
  } catch (error) {
    if (analyticsEnabled && req.url.includes('/api/generate')) await track('generation_error', { message: error.message });
    return sendJson(res, 500, { error: error.message || 'Erreur interne.' });
  }
});

server.listen(port, () => {
  console.log(`OperonCore FAQ Content Hub démarré sur : http://localhost:${port}`);
});
