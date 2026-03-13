const els = {
  input: document.querySelector('#input'),
  generate: document.querySelector('#generate'),
  status: document.querySelector('#status'),
  quota: document.querySelector('#quota'),
  faq: document.querySelector('#faq-output'),
  json: document.querySelector('#json-output'),
  html: document.querySelector('#html-output'),
  history: document.querySelector('#history'),
  notes: document.querySelector('#notes'),
  tone: document.querySelector('#tone')
};

let latest = { faq: '', json: '', html: '' };

async function track(event, meta = {}) {
  await fetch('/api/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event, meta })
  }).catch(() => {});
}

function setStatus(message, ok = true) {
  els.status.className = ok ? 'status ok' : 'status err';
  els.status.textContent = message;
}

function mode() {
  return document.querySelector('input[name="mode"]:checked').value;
}

function persistHistory(payload) {
  const key = 'operoncore-faq-history';
  const current = JSON.parse(localStorage.getItem(key) || '[]');
  current.unshift({ ...payload, createdAt: new Date().toISOString() });
  localStorage.setItem(key, JSON.stringify(current.slice(0, 8)));
  renderHistory();
}

function renderHistory() {
  const key = 'operoncore-faq-history';
  const current = JSON.parse(localStorage.getItem(key) || '[]');
  els.history.innerHTML = current.length
    ? current
        .map((h) => `<div><strong>${new Date(h.createdAt).toLocaleString()}</strong><p>${h.faq.slice(0, 160)}...</p></div>`)
        .join('')
    : '<p class="muted">Aucune génération récente.</p>';
}

async function loadConfig() {
  const cfg = await fetch('/api/config').then((r) => r.json());
  document.title = cfg.seo.title;
  document.querySelector('#eyebrow').textContent = cfg.landingContent.hero.eyebrow;
  document.querySelector('#hero-title').textContent = cfg.landingContent.hero.title;
  document.querySelector('#hero-subtitle').textContent = cfg.landingContent.hero.subtitle;
  document.querySelector('#cta-main').textContent = cfg.landingContent.ctas.primary;
  document.querySelector('#cta-secondary').textContent = cfg.landingContent.ctas.secondary;
  document.querySelector('#brand-name').textContent = cfg.branding.company;
  document.querySelector('#quota').textContent = `Plan gratuit: ${cfg.limits.freeDailyLimit} générations/jour.`;

  const trust = document.querySelector('#trust-points');
  cfg.landingContent.trustPoints.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    trust.append(li);
  });

  const pricingGrid = document.querySelector('#pricing-grid');
  cfg.pricing.plans.forEach((plan) => {
    const div = document.createElement('div');
    div.className = `plan card ${plan.highlighted ? 'highlight' : ''}`;
    div.innerHTML = `<h3>${plan.name}</h3><p><strong>${cfg.pricing.currency}${plan.price}${plan.period}</strong></p><p>${plan.description}</p><ul>${plan.features
      .map((f) => `<li>${f}</li>`)
      .join('')}</ul><button class="btn ${plan.highlighted ? 'btn-primary' : 'btn-secondary'}">${plan.cta || 'Choisir'}</button>`;
    pricingGrid.append(div);
  });
}

els.generate.addEventListener('click', async () => {
  const input = els.input.value.trim();
  if (!input) return setStatus('Ajoutez une URL ou un texte.', false);

  els.generate.disabled = true;
  els.generate.textContent = 'Génération...';
  setStatus('Analyse en cours...', true);

  try {
    const selectedMode = mode();
    await track('cta_primary_click', { selectedMode });

    const resp = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode: selectedMode, input, tone: els.tone.value })
    });

    const data = await resp.json();
    if (!resp.ok) throw Object.assign(new Error(data.error || 'Erreur'), { code: data.code });

    latest = {
      faq: data.output.plainText,
      json: data.output.jsonLd,
      html: data.output.html
    };

    els.faq.textContent = latest.faq;
    els.json.textContent = latest.json;
    els.html.textContent = latest.html;
    els.notes.innerHTML = (data.output.notes || []).map((n) => `<li>${n}</li>`).join('');

    if (typeof data.quota?.remaining === 'number') {
      els.quota.textContent = `Il vous reste ${data.quota.remaining} génération(s) gratuite(s) aujourd’hui.`;
    }

    persistHistory(latest);
    setStatus('Résultats générés. Vérifiez puis publiez.', true);
  } catch (e) {
    if (e.code === 'FREE_LIMIT_REACHED') {
      setStatus('Limite gratuite atteinte. Passez au plan Pro pour continuer.', false);
      await track('free_limit_reached', { from: 'ui' });
    } else {
      setStatus(e.message || 'Erreur de génération.', false);
    }
  } finally {
    els.generate.disabled = false;
    els.generate.textContent = 'Générer';
  }
});

document.querySelectorAll('[data-copy]').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const value = latest[btn.dataset.copy];
    if (!value) return;
    await navigator.clipboard.writeText(value);
    const before = btn.textContent;
    btn.textContent = 'Copié';
    setTimeout(() => (btn.textContent = before), 900);
  });
});

document.querySelectorAll('[data-example]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const type = btn.dataset.example;
    if (type === 'url') {
      els.input.value = 'https://example.com';
      document.querySelector('input[value="url"]').checked = true;
    } else {
      els.input.value =
        'Notre agence SEO aide les entreprises locales à structurer leurs contenus, améliorer leur visibilité et répondre aux intentions de recherche via des FAQ pertinentes. Nous produisons des blocs prêts à intégrer afin de gagner du temps et renforcer la crédibilité des pages services.';
      document.querySelector('input[value="text"]').checked = true;
    }
  });
});

document.querySelector('#email-submit').addEventListener('click', async () => {
  const emailEl = document.querySelector('#email');
  const status = document.querySelector('#email-status');
  const email = emailEl.value.trim();
  status.textContent = 'Envoi...';

  const resp = await fetch('/api/lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, source: 'footer_form' })
  });
  const data = await resp.json();

  if (resp.ok) {
    status.className = 'status ok';
    status.textContent = 'Inscription confirmée.';
    emailEl.value = '';
  } else {
    status.className = 'status err';
    status.textContent = data.error || 'Erreur.';
  }
});

document.querySelector('#cta-main').addEventListener('click', () => track('cta_primary_click', { source: 'hero' }));
document.querySelector('#cta-secondary').addEventListener('click', () => track('pricing_view', { source: 'hero' }));

loadConfig();
renderHistory();
track('page_view');
