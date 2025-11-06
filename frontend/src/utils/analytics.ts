export type EventName = 'view_product' | 'search' | 'filter_change' | 'add_to_cart' | 'checkout_start';

const STORAGE_KEY = 'ryse_analytics_events_v1';

export function recordEvent(name: EventName, payload: Record<string, any> = {}) {
  try {
    const events = getEventsRaw();
    events.push({ name, payload, ts: Date.now() });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events.slice(-500)));
  } catch {}
}

export function getEventsRaw(): any[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function buildPreferences() {
  const events = getEventsRaw();
  const categoryScore: Record<string, number> = {};
  const genderScore: Record<string, number> = {};
  for (const e of events) {
    if (e.name === 'view_product' && e.payload) {
      if (e.payload.category) categoryScore[e.payload.category] = (categoryScore[e.payload.category] || 0) + 3;
      if (e.payload.subcategory) categoryScore[e.payload.subcategory] = (categoryScore[e.payload.subcategory] || 0) + 2;
      if (e.payload.gender) genderScore[e.payload.gender] = (genderScore[e.payload.gender] || 0) + 2;
    }
    if (e.name === 'search' && e.payload?.query) {
      const key = String(e.payload.query).toLowerCase();
      categoryScore[key] = (categoryScore[key] || 0) + 1;
    }
  }
  return { categoryScore, genderScore };
}


