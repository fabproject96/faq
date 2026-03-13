import crypto from 'node:crypto';
import { appendJsonRecord, readJsonArray } from './storage.js';

const FREE_DAILY_LIMIT = Number(process.env.FREE_DAILY_LIMIT || 10);

function todayKey() {
  const d = new Date();
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
}

export function clientFingerprint(req) {
  const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '0.0.0.0').toString().split(',')[0].trim();
  const ua = (req.headers['user-agent'] || 'unknown').toString();
  const key = `${ip}|${ua.slice(0, 80)}`;
  return crypto.createHash('sha256').update(key).digest('hex').slice(0, 24);
}

export function resolvePlan(req) {
  const proToken = process.env.PRO_API_TOKEN;
  const token = req.headers['x-api-key'];
  if (proToken && token && token === proToken) return 'pro';
  return 'free';
}

export async function enforceGenerationQuota(req) {
  const plan = resolvePlan(req);
  if (plan === 'pro') return { allowed: true, plan, remaining: null, limit: null };

  const fp = clientFingerprint(req);
  const events = await readJsonArray('usage.json');
  const day = todayKey();
  const used = events.filter((e) => e.day === day && e.fp === fp && e.type === 'generation').length;

  if (used >= FREE_DAILY_LIMIT) {
    return { allowed: false, plan, remaining: 0, limit: FREE_DAILY_LIMIT };
  }

  await appendJsonRecord('usage.json', { day, fp, type: 'generation' });
  return { allowed: true, plan, remaining: FREE_DAILY_LIMIT - used - 1, limit: FREE_DAILY_LIMIT };
}
