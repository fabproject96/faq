import { appendJsonRecord, readJsonArray } from './storage.js';

export async function track(event, meta = {}) {
  await appendJsonRecord('analytics.json', { event, meta });
}

export async function analyticsSummary() {
  const events = await readJsonArray('analytics.json');
  const summary = {
    total: events.length,
    page_view: 0,
    cta_primary_click: 0,
    generation_started: 0,
    generation_success: 0,
    generation_error: 0,
    lead_capture: 0,
    pricing_view: 0,
    free_limit_reached: 0
  };

  for (const e of events) {
    if (summary[e.event] !== undefined) summary[e.event] += 1;
  }

  return { summary, recent: events.slice(-20).reverse() };
}
