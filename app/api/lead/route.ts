import { NextRequest, NextResponse } from 'next/server';
import { sendLeadNotification, sendBlockerAlert } from '@/lib/telegram';
import { pushLeadToNotion } from '@/lib/notion-leads';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const RATE_LIMIT_PER_HOUR = 10;
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

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';

  // Rate limit
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
    // Silently drop bots — pas d'erreur visible pour ne pas leur indiquer le honeypot
    return NextResponse.json({ ok: true });
  }

  // Required fields — formulaire contact blog
  const required = ['nom', 'email', 'societe', 'ca', 'situation', 'projet'];
  for (const f of required) {
    if (!body[f] || typeof body[f] !== 'string' || body[f].trim().length === 0) {
      return NextResponse.json({ error: 'missing_fields', field: f }, { status: 400 });
    }
  }

  // Email validation basique
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return NextResponse.json({ error: 'invalid_email' }, { status: 400 });
  }

  if (isDisposableEmail(body.email)) {
    return NextResponse.json({ error: 'disposable_email_blocked' }, { status: 400 });
  }

  // Build lead payload — format contact blog
  const lead = {
    nom: body.nom.trim().slice(0, 200),
    email: body.email.trim().toLowerCase().slice(0, 200),
    tel: 'Non renseigne',
    site: body.societe?.trim().slice(0, 300) || undefined,
    budget: String(body.ca ?? 'blog'),
    projet: `[${body.situation ?? 'Contact blog'}] ${body.projet.trim().slice(0, 4500)}`,
    source: `protocole7jours:contact`,
  };

  // Send Telegram (CRITIQUE — c'est la source de vérité)
  const tg = await sendLeadNotification(lead);

  if (!tg.ok) {
    // Lead reçu mais Telegram fail = blocage critique
    // On essaie quand même Notion + on log + on alerte
    try {
      await pushLeadToNotion(lead);
    } catch {}

    // Alerte blocage en parallèle (best effort)
    sendBlockerAlert({
      pipeline: 'api/lead',
      step: 'sendLeadNotification',
      reason: 'Telegram a échoué pour ce lead. Le lead est reçu mais pas notifié.',
      actionRequired: `Aller dans Notion DB Leads chercher le lead de ${lead.nom} (${lead.email}). Vérifier le bot Telegram.`,
      logsRef: `Lead reçu à ${new Date().toISOString()}`,
    }).catch(() => {});

    // Renvoie quand même OK au front (lead enregistré)
    return NextResponse.json({ ok: true, warning: 'notify_failed' });
  }

  // Push Notion (best effort, non bloquant)
  pushLeadToNotion(lead).catch(() => {});

  return NextResponse.json({ ok: true });
}
