const STOPWORDS = new Set([
  'le','la','les','de','du','des','un','une','et','ou','à','a','en','pour','sur','avec','dans','que','qui','est','sont','ce','ces','cet','cette','au','aux','se','sa','son','ses','par','plus','moins','vos','notre','votre','nous','vous','ils','elles','leur','leurs','via','comme','sans','afin','être','été','fait','faire','ainsi','this','that','with','from','your','have','will','about'
]);

export function stripHtml(html = '') {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript[^>]*>[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function sentenceSplit(text = '') {
  return text
    .replace(/\s+/g, ' ')
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length >= 55 && s.length <= 260)
    .slice(0, 160);
}

export function tokenize(text = '') {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[^\p{L}\p{N}\s-]/gu, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 3 && !STOPWORDS.has(w));
}

export function topKeywords(text = '', limit = 14) {
  const counts = new Map();
  for (const token of tokenize(text)) counts.set(token, (counts.get(token) || 0) + 1);

  return [...counts.entries()]
    .filter(([, c]) => c >= 1)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([word]) => word);
}

export function compactAnswer(text = '', max = 210) {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const sliced = clean.slice(0, max);
  const lastStop = Math.max(sliced.lastIndexOf('.'), sliced.lastIndexOf(','), sliced.lastIndexOf(' '));
  return `${sliced.slice(0, lastStop > 80 ? lastStop : max).trim()}…`;
}
