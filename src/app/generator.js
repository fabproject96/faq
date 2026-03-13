import { compactAnswer, sentenceSplit, topKeywords } from './text-utils.js';

const QUESTION_TEMPLATES = [
  (k) => `Comment ${k} améliore-t-il les performances ou la visibilité ?`,
  (k) => `Quels sont les bénéfices concrets de ${k} ?`,
  (k) => `Comment mettre en place ${k} efficacement ?`,
  (k) => `Quelles erreurs éviter avec ${k} ?`,
  (k) => `Pourquoi ${k} est-il important pour le SEO/AEO ?`
];

function scoreSentence(sentence, keyword) {
  const lower = sentence.toLowerCase();
  let score = 0;
  if (lower.includes(keyword)) score += 3;
  if (/avantage|bénéfice|impact|améliore|gagne|optimise|réduit|qualité|conversion/i.test(lower)) score += 2;
  if (/comment|pourquoi|étape|processus|méthode|stratégie/i.test(lower)) score += 1;
  return score;
}

function pickSupportSentence(sentences, keyword, usedSentences) {
  const ranked = sentences
    .map((s) => ({ s, score: scoreSentence(s, keyword) }))
    .filter((x) => x.score > 0 && !usedSentences.has(x.s))
    .sort((a, b) => b.score - a.score);
  return ranked[0]?.s;
}

function dedupeBySimilarity(items) {
  const unique = [];
  const seen = new Set();
  for (const item of items) {
    const key = item.question.toLowerCase().replace(/[^a-zà-ÿ0-9\s]/gi, '').split(/\s+/).slice(0, 7).join(' ');
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(item);
  }
  return unique;
}

function applyTone(answer, tone = 'neutre') {
  if (tone === 'commercial') return `${answer} Cette approche aide aussi à accélérer la conversion.`;
  if (tone === 'pedagogique') return `${answer} En pratique, commencez par une page prioritaire puis étendez progressivement.`;
  return answer;
}

function buildFaqItems(text, options = {}) {
  const maxItems = options.maxItems || 6;
  const tone = options.tone || 'neutre';
  const sentences = sentenceSplit(text);
  const keywords = topKeywords(text, 16).filter((k) => k.length > 4);
  const usedSentences = new Set();

  const candidates = [];
  keywords.forEach((keyword, idx) => {
    const support = pickSupportSentence(sentences, keyword, usedSentences);
    if (!support) return;
    usedSentences.add(support);

    const template = QUESTION_TEMPLATES[idx % QUESTION_TEMPLATES.length];
    const answer = applyTone(compactAnswer(support), tone);
    candidates.push({ question: template(keyword), answer });
  });

  if (candidates.length < 4) {
    const fallback = [
      'Quels résultats attendre dans les premières semaines ?',
      'Quel format est prêt à intégrer immédiatement sur un site ?',
      'Comment assurer une FAQ utile pour les utilisateurs et les moteurs ?'
    ];

    fallback.forEach((question, i) => {
      if (candidates.length >= maxItems) return;
      const sentence = sentences[i] || text;
      candidates.push({ question, answer: applyTone(compactAnswer(sentence), tone) });
    });
  }

  return dedupeBySimilarity(candidates).slice(0, maxItems);
}

export function buildFaqOutput(text, options = {}) {
  const faq = buildFaqItems(text, options);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };

  const html = `<section class="faq-block">\n  <h2>FAQ</h2>\n  ${faq
    .map(
      (item) => `<article class="faq-item">\n    <h3>${escapeHtml(item.question)}</h3>\n    <p>${escapeHtml(item.answer)}</p>\n  </article>`
    )
    .join('\n  ')}\n</section>`;

  const plainText = faq.map((item, i) => `${i + 1}. ${item.question}\n${item.answer}`).join('\n\n');

  return {
    faq,
    jsonLd: JSON.stringify(jsonLd, null, 2),
    html,
    plainText,
    notes: [
      'Relisez les réponses et adaptez-les à votre offre réelle.',
      'Évitez de publier des FAQ sans lien avec la page source.',
      'Vérifiez le rendu JSON-LD dans Google Rich Results Test.'
    ]
  };
}

function escapeHtml(str = '') {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
