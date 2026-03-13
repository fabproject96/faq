import { stripHtml } from './text-utils.js';
import { assertPublicHost, validateExternalUrl } from './url-security.js';

const MAX_REDIRECTS = Number(process.env.URL_FETCH_MAX_REDIRECTS || 3);
const MAX_BYTES = Number(process.env.URL_FETCH_MAX_BYTES || 300000);
const TIMEOUT_MS = Number(process.env.URL_FETCH_TIMEOUT_MS || 5000);

function isRedirect(status) {
  return [301, 302, 303, 307, 308].includes(status);
}

async function fetchWithGuard(url, redirects = 0) {
  if (redirects > MAX_REDIRECTS) throw new Error('Trop de redirections URL.');

  const parsed = validateExternalUrl(url);
  await assertPublicHost(parsed.hostname);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  let response;
  try {
    response = await fetch(parsed.toString(), {
      method: 'GET',
      redirect: 'manual',
      signal: controller.signal,
      headers: {
        'User-Agent': 'OperonCore-FAQ-Builder/2.0'
      }
    });
  } catch (error) {
    if (error.name === 'AbortError') throw new Error('Timeout de chargement URL atteint.');
    throw new Error("Impossible de charger l'URL.");
  } finally {
    clearTimeout(timeout);
  }

  if (isRedirect(response.status)) {
    const location = response.headers.get('location');
    if (!location) throw new Error('Redirection invalide.');
    const nextUrl = new URL(location, parsed.toString()).toString();
    return fetchWithGuard(nextUrl, redirects + 1);
  }

  if (!response.ok) {
    throw new Error(`URL inaccessible (${response.status}).`);
  }

  const contentType = (response.headers.get('content-type') || '').toLowerCase();
  if (!contentType.includes('text/html') && !contentType.includes('text/plain')) {
    throw new Error('Type de contenu non supporté.');
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error('Réponse vide.');

  let received = 0;
  const chunks = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    received += value.byteLength;
    if (received > MAX_BYTES) throw new Error('Réponse URL trop volumineuse.');
    chunks.push(value);
  }

  const text = Buffer.concat(chunks).toString('utf8');
  return stripHtml(text).slice(0, 15000);
}

export async function extractTextFromUrl(url) {
  return fetchWithGuard(url, 0);
}
