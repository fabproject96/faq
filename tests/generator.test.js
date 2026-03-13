import test from 'node:test';
import assert from 'node:assert/strict';
import { buildFaqOutput } from '../src/app/generator.js';

test('buildFaqOutput returns quality outputs', () => {
  const source =
    'OperonCore propose un outil spécialisé pour transformer une page web en FAQ utiles, avec JSON-LD et HTML prêts à intégrer. Les agences SEO gagnent du temps et améliorent la cohérence des réponses. Le workflow guide l’utilisateur depuis l’analyse de contenu jusqu’à la publication finale. Le système aide aussi à limiter les erreurs de structure et à renforcer la lisibilité pour les internautes.';

  const out = buildFaqOutput(source, { maxItems: 6, tone: 'pedagogique' });

  assert.ok(out.faq.length >= 4);
  assert.match(out.jsonLd, /"@type": "FAQPage"/);
  assert.match(out.html, /<section class="faq-block">/);
  assert.ok(out.faq.every((item) => item.question.length > 20));
  assert.ok(out.notes.length >= 2);
});
