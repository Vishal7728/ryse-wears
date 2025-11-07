export type EventName = 'view_product' | 'search' | 'filter_change' | 'add_to_cart' | 'checkout_start';

interface EventPayload {
  [key: string]: string | number | boolean | undefined;
}

interface AnalyticsEvent {
  name: EventName;
  payload: EventPayload;
  ts: number;
}

const STORAGE_KEY = 'ryse_analytics_events_v1';

export function recordEvent(name: EventName, payload: EventPayload = {}) {
  try {
    const events = getEventsRaw();
    events.push({ name, payload, ts: Date.now() });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events.slice(-500)));
  } catch {}
}

export function getEventsRaw(): AnalyticsEvent[] {
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
      const category = e.payload.category;
      const subcategory = e.payload.subcategory;
      const gender = e.payload.gender;
      
      if (typeof category === 'string') {
        categoryScore[category] = (categoryScore[category] || 0) + 3;
      }
      
      if (typeof subcategory === 'string') {
        categoryScore[subcategory] = (categoryScore[subcategory] || 0) + 2;
      }
      
      if (typeof gender === 'string') {
        genderScore[gender] = (genderScore[gender] || 0) + 2;
      }
    }
    
    if (e.name === 'search' && e.payload?.query) {
      const key = String(e.payload.query).toLowerCase();
      categoryScore[key] = (categoryScore[key] || 0) + 1;
    }
  }
  
  return { categoryScore, genderScore };
}