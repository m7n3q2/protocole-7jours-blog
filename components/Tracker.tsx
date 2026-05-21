'use client';

import { useEffect, useRef } from 'react';

/**
 * Tracker custom analytics — collecte time-on-page, scroll depth, bounce, source.
 * Inséré dans le layout root.
 *
 * Aucun cookie. Session ID en sessionStorage (purgé à la fermeture de l'onglet).
 * Cohérent avec la règle 'no public storage / no PII' du projet.
 */

const ENDPOINT = '/api/track';
const HEARTBEAT_MS = 15_000;
const SCROLL_THRESHOLDS = [25, 50, 75, 100];

function send(event: object) {
  try {
    const data = JSON.stringify(event);
    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      navigator.sendBeacon(ENDPOINT, data);
    } else {
      fetch(ENDPOINT, { method: 'POST', body: data, keepalive: true }).catch(() => {});
    }
  } catch {}
}

function getSessionId(): string {
  if (typeof window === 'undefined') return 'ssr';
  try {
    let id = sessionStorage.getItem('_ldm_sid');
    if (!id) {
      id = Math.random().toString(36).slice(2) + Date.now().toString(36);
      sessionStorage.setItem('_ldm_sid', id);
    }
    return id;
  } catch {
    return 'nostorage';
  }
}

function detectGeoSource(ref: string): string | undefined {
  const map: Array<[string, string]> = [
    ['chat.openai.com', 'chatgpt'],
    ['chatgpt.com', 'chatgpt'],
    ['perplexity.ai', 'perplexity'],
    ['claude.ai', 'claude'],
    ['gemini.google.com', 'gemini'],
    ['copilot.microsoft.com', 'copilot'],
    ['bing.com/copilot', 'copilot'],
    ['phind.com', 'phind'],
    ['you.com', 'you'],
  ];
  for (const [m, s] of map) if (ref.includes(m)) return s;
  return undefined;
}

export default function Tracker() {
  const startedAt = useRef<number>(Date.now());
  const scrollHits = useRef<Set<number>>(new Set());
  const heartbeatTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const sessionId = useRef<string>('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    sessionId.current = getSessionId();
    startedAt.current = Date.now();
    scrollHits.current = new Set();

    const page = window.location.pathname + window.location.search;
    const ref = document.referrer || '';
    const params = new URLSearchParams(window.location.search);
    const geo = detectGeoSource(ref);

    // 1. page_view
    send({
      kind: 'page_view',
      page,
      session_id: sessionId.current,
      ts: Date.now(),
      referrer: ref,
      source: geo ?? (ref ? new URL(ref).hostname.replace('www.', '') : 'direct'),
      utm_source: params.get('utm_source') ?? undefined,
      utm_medium: params.get('utm_medium') ?? undefined,
      utm_campaign: params.get('utm_campaign') ?? undefined,
    });

    // 2. geo_referer (si LLM)
    if (geo) {
      send({
        kind: 'geo_referer',
        page,
        session_id: sessionId.current,
        ts: Date.now(),
        source: geo,
        referrer: ref,
      });
    }

    // 3. scroll depth
    const onScroll = () => {
      const h = document.documentElement;
      const scrollTop = h.scrollTop || document.body.scrollTop;
      const scrollHeight = h.scrollHeight - h.clientHeight;
      if (scrollHeight <= 0) return;
      const pct = Math.round((scrollTop / scrollHeight) * 100);
      for (const t of SCROLL_THRESHOLDS) {
        if (pct >= t && !scrollHits.current.has(t)) {
          scrollHits.current.add(t);
          send({
            kind: 'scroll_depth',
            page,
            session_id: sessionId.current,
            ts: Date.now(),
            depth: t,
            duration: Date.now() - startedAt.current,
          });
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // 4. heartbeat (signal "actif sur la page")
    heartbeatTimer.current = setInterval(() => {
      if (document.visibilityState !== 'visible') return;
      send({
        kind: 'heartbeat',
        page,
        session_id: sessionId.current,
        ts: Date.now(),
        duration: Date.now() - startedAt.current,
      });
    }, HEARTBEAT_MS);

    // 5. exit (durée totale + scroll max)
    const sendExit = () => {
      const maxScroll = scrollHits.current.size > 0
        ? Math.max(...Array.from(scrollHits.current))
        : 0;
      send({
        kind: 'exit',
        page,
        session_id: sessionId.current,
        ts: Date.now(),
        duration: Date.now() - startedAt.current,
        depth: maxScroll,
      });
    };
    const onVisibility = () => { if (document.visibilityState === 'hidden') sendExit(); };
    window.addEventListener('pagehide', sendExit);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pagehide', sendExit);
      document.removeEventListener('visibilitychange', onVisibility);
      if (heartbeatTimer.current) clearInterval(heartbeatTimer.current);
    };
  }, []);

  return null;
}
