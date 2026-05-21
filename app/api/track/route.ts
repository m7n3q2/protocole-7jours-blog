import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

/**
 * Endpoint custom analytics — appelé par <Tracker /> côté client.
 *
 * Events collectés (tous via beacon, non bloquants) :
 *  - page_view       : entrée sur une page
 *  - heartbeat       : toutes les 15s tant que la page est active
 *  - scroll_depth    : 25%, 50%, 75%, 100% atteint
 *  - exit            : pagehide / visibilitychange (fin de session sur la page)
 *  - lead_start      : focus sur le 1er champ du formulaire /contact
 *  - lead_submit     : POST /api/lead réussi
 *  - geo_referer     : visite depuis ChatGPT/Perplexity/Claude/Gemini
 *
 * Stockage V1 : log structuré dans Vercel Logs (lecture via API) + (V2) Vercel KV.
 * Le scheduled task daily_article aggrège chaque nuit et commit data/analytics/YYYY-MM.jsonl.
 */

type Event = {
  kind: string;
  page: string;
  session_id: string;
  ts: number;
  depth?: number;
  duration?: number;
  source?: string;
  referrer?: string;
  ua?: string;
  country?: string;
  device?: 'mobile' | 'desktop' | 'tablet';
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
};

function detectDevice(ua: string | null): 'mobile' | 'desktop' | 'tablet' {
  if (!ua) return 'desktop';
  if (/iPad|Tablet/i.test(ua)) return 'tablet';
  if (/Mobile|Android|iPhone|iPod/i.test(ua)) return 'mobile';
  return 'desktop';
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json() as Partial<Event>;

    // Sanitize + enrich côté serveur
    const event: Event = {
      kind: String(data.kind ?? 'unknown').slice(0, 32),
      page: String(data.page ?? '').slice(0, 200),
      session_id: String(data.session_id ?? '').slice(0, 40),
      ts: Number(data.ts) || Date.now(),
      depth: typeof data.depth === 'number' ? Math.round(data.depth) : undefined,
      duration: typeof data.duration === 'number' ? Math.round(data.duration) : undefined,
      source: data.source ? String(data.source).slice(0, 32) : undefined,
      referrer: data.referrer ? String(data.referrer).slice(0, 200) : undefined,
      utm_source: data.utm_source ? String(data.utm_source).slice(0, 60) : undefined,
      utm_medium: data.utm_medium ? String(data.utm_medium).slice(0, 60) : undefined,
      utm_campaign: data.utm_campaign ? String(data.utm_campaign).slice(0, 60) : undefined,
      ua: req.headers.get('user-agent')?.slice(0, 200) ?? undefined,
      country: req.headers.get('x-vercel-ip-country') ?? undefined,
      device: detectDevice(req.headers.get('user-agent')),
    };

    // Log structuré (récupérable via Vercel Logs API)
    console.log('[track]', JSON.stringify(event));
  } catch {
    // Silencieux : ne JAMAIS bloquer l'expérience utilisateur pour de l'analytics
  }
  return new NextResponse(null, { status: 204 });
}
