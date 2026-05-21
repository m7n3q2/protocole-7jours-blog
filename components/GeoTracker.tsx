'use client';

import { useEffect } from 'react';

/**
 * Track les referers LLM (ChatGPT, Perplexity, Claude, Gemini, Copilot)
 * pour mesurer la performance GEO (Generative Engine Optimization).
 *
 * Stocke un événement custom dans Vercel Analytics + un beacon vers /api/geo-ping.
 * Tout est self-contained, pas de dépendance à un service externe.
 */
const LLM_REFERERS = [
  { match: 'chat.openai.com', source: 'chatgpt' },
  { match: 'chatgpt.com', source: 'chatgpt' },
  { match: 'perplexity.ai', source: 'perplexity' },
  { match: 'claude.ai', source: 'claude' },
  { match: 'gemini.google.com', source: 'gemini' },
  { match: 'bing.com/copilot', source: 'copilot' },
  { match: 'copilot.microsoft.com', source: 'copilot' },
  { match: 'you.com', source: 'you' },
  { match: 'phind.com', source: 'phind' },
];

export default function GeoTracker() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const ref = document.referrer;
    if (!ref) return;

    const match = LLM_REFERERS.find((r) => ref.includes(r.match));
    if (!match) return;

    // Beacon (non bloquant). L'endpoint /api/geo-ping log dans Vercel KV.
    const data = JSON.stringify({
      source: match.source,
      referer: ref,
      page: window.location.pathname,
      ts: Date.now(),
    });

    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/geo-ping', data);
    } else {
      fetch('/api/geo-ping', { method: 'POST', body: data, keepalive: true }).catch(() => {});
    }

    // Marqueur dataLayer pour Vercel Analytics (event custom)
    const va = (window as unknown as { va?: (action: string, payload: object) => void }).va;
    if (typeof va === 'function') {
      va('event', { name: 'geo_visit', source: match.source });
    }
  }, []);

  return null;
}
