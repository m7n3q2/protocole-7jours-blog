import { NextRequest, NextResponse } from 'next/server';
import { pushLeadToNotion } from '@/lib/notion-leads';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const RATE_LIMIT_PER_HOUR = 20;
const memory = new Map<string, { count: number; resetAt: number }>();

function rateLimit(ip: string): { allowed: boolean } {
  const now = Date.now();
  const cur = memory.get(ip);
  if (!cur || now > cur.resetAt) {
    memory.set(ip, { count: 1, resetAt: now + 3600_000 });
    return { allowed: true };
  }
  cur.count += 1;
  return { allowed: cur.count <= RATE_LIMIT_PER_HOUR };
}

function isDisposableEmail(email: string): boolean {
  const blocked = [
    'mailinator', 'tempmail', 'guerrillamail', '10minutemail', 'throwaway',
    'yopmail', 'fakeinbox', 'sharklasers', 'mohmal', 'getairmail',
  ];
  const lower = email.toLowerCase();
  return blocked.some((b) => lower.includes(b));
}

/**
 * Capture email pour lead magnet.
 * Pousse dans Notion DB Leads avec source distinctive ("lead-magnet:<slug>").
 * Pas de notification Telegram (volume potentiel élevé, on évite le spam).
 * Le download du PDF est géré côté client après réponse OK.
 */
export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';

  const rl = rateLimit(ip);
  if (!rl.allowed) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'bad_json' }, { status: 400 });
  }

  // Honeypot
  const honeypotField = process.env.HONEYPOT_FIELD_NAME ?? 'website_url';
  if (body[honeypotField]) {
    return NextResponse.json({ ok: true });
  }

  // Required fields minimaux
  if (!body.email || typeof body.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return NextResponse.json({ error: 'invalid_email' }, { status: 400 });
  }
  if (isDisposableEmail(body.email)) {
    return NextResponse.json({ error: 'disposable_email_blocked' }, { status: 400 });
  }

  const magnetSlug = (body.magnet || 'unknown').toString().slice(0, 60);
  const sitePrefix = process.env.SITE_PREFIX_TELEGRAM ?? '';
  const siteTag = sitePrefix ? sitePrefix.replace(/[\[\]]/g, '').toLowerCase().trim() : 'protocole7j';

  // Build lead payload minimal
  const lead = {
    nom: (body.email.split('@')[0] || 'Lead').slice(0, 100),
    email: body.email.trim().toLowerCase().slice(0, 200),
    tel: '',
    site: undefined,
    budget: 'Je ne sais pas encore',
    projet: `[Lead magnet] ${magnetSlug} — capture email avant download du PDF.`,
    source: `lead-magnet:${siteTag}:${magnetSlug}`.slice(0, 200),
  };

  // Push Notion uniquement (pas de Telegram pour ne pas spam le canal)
  pushLeadToNotion(lead).catch(() => {});

  return NextResponse.json({ ok: true });
}
