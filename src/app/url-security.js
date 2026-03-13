import dns from 'node:dns/promises';
import net from 'node:net';

const PRIVATE_IPV4_RANGES = [
  ['10.0.0.0', '10.255.255.255'],
  ['127.0.0.0', '127.255.255.255'],
  ['169.254.0.0', '169.254.255.255'],
  ['172.16.0.0', '172.31.255.255'],
  ['192.168.0.0', '192.168.255.255'],
  ['0.0.0.0', '0.255.255.255']
];

const BLOCKED_HOSTNAMES = new Set([
  'localhost',
  'metadata.google.internal',
  '169.254.169.254',
  '169.254.170.2',
  '100.100.100.200'
]);

function ipToLong(ip) {
  return ip.split('.').reduce((sum, octet) => (sum << 8) + Number(octet), 0) >>> 0;
}

function isPrivateIpv4(ip) {
  const long = ipToLong(ip);
  return PRIVATE_IPV4_RANGES.some(([start, end]) => long >= ipToLong(start) && long <= ipToLong(end));
}

function isBlockedIpv6(ip) {
  const normalized = ip.toLowerCase();
  return normalized === '::1' || normalized.startsWith('fc') || normalized.startsWith('fd') || normalized.startsWith('fe80');
}

export function validateExternalUrl(rawUrl) {
  let parsed;
  try {
    parsed = new URL(rawUrl);
  } catch {
    throw new Error('URL invalide.');
  }

  if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error('Seuls http/https sont autorisés.');
  if (!parsed.hostname) throw new Error('URL invalide (hostname manquant).');

  const host = parsed.hostname.toLowerCase();
  if (BLOCKED_HOSTNAMES.has(host)) throw new Error('Destination URL non autorisée.');

  return parsed;
}

export async function assertPublicHost(hostname) {
  if (BLOCKED_HOSTNAMES.has(hostname.toLowerCase())) {
    throw new Error('Destination interne bloquée.');
  }

  const records = await dns.lookup(hostname, { all: true, verbatim: true });
  if (!records.length) throw new Error('Impossible de résoudre le domaine.');

  for (const record of records) {
    if (record.family === 4 && isPrivateIpv4(record.address)) {
      throw new Error('IP privée/interne détectée (SSRF bloqué).');
    }
    if (record.family === 6 && isBlockedIpv6(record.address)) {
      throw new Error('IPv6 locale/interne détectée (SSRF bloqué).');
    }
    if (net.isIP(record.address) === 0) {
      throw new Error('Adresse IP résolue invalide.');
    }
  }
}
