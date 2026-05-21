/**
 * Wrapper Telegram pour les notifications de leads et alertes.
 * Réutilise le bot existant de jobs-watcher (cf. CLAUDE.md).
 *
 * Utilisation côté serveur uniquement (route handler, server action).
 */

const TELEGRAM_API = 'https://api.telegram.org';
const MAX_MSG_LEN = 4000;

type SendOpts = {
  parseMode?: 'HTML' | 'MarkdownV2';
  disablePreview?: boolean;
};

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function splitMessage(msg: string, max = MAX_MSG_LEN): string[] {
  if (msg.length <= max) return [msg];
  const parts: string[] = [];
  let rem = msg;
  while (rem) {
    if (rem.length <= max) {
      parts.push(rem);
      break;
    }
    let cut = rem.lastIndexOf('\n\n', max);
    if (cut <= 0) cut = rem.lastIndexOf('\n', max);
    if (cut <= 0) cut = rem.lastIndexOf(' ', max);
    if (cut <= 0) cut = max;
    parts.push(rem.slice(0, cut).trimEnd());
    rem = rem.slice(cut).trimStart();
  }
  return parts;
}

export async function sendTelegram(
  message: string,
  opts: SendOpts = {},
): Promise<{ ok: boolean; error?: string }> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return { ok: false, error: 'Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID env vars' };
  }

  const parts = splitMessage(message);
  let lastError: string | undefined;

  for (let i = 0; i < parts.length; i++) {
    const text = parts[i];
    const body = new URLSearchParams({
      chat_id: chatId,
      text,
      parse_mode: opts.parseMode ?? 'HTML',
      disable_web_page_preview: String(opts.disablePreview ?? true),
    });

    try {
      const res = await fetch(`${TELEGRAM_API}/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
        // Edge runtime safe : pas de keepalive, timeout côté Vercel
      });
      if (!res.ok) {
        const text = await res.text();
        lastError = `HTTP ${res.status}: ${text.slice(0, 300)}`;
      }
    } catch (e) {
      lastError = e instanceof Error ? e.message : String(e);
    }

    if (i < parts.length - 1) {
      await new Promise((r) => setTimeout(r, 800));
    }
  }

  return lastError ? { ok: false, error: lastError } : { ok: true };
}

/**
 * Format spécial pour les alertes blocage (avec emojis 🚨 multiples).
 */
export async function sendBlockerAlert(opts: {
  pipeline: string;
  step: string;
  reason: string;
  actionRequired: string;
  logsRef?: string;
}): Promise<{ ok: boolean }> {
  const emojiCount = parseInt(process.env.ALERT_EMOJI_COUNT ?? '5', 10);
  const emojis = '🚨'.repeat(emojiCount);

  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? 'Le Décodeur Marketing';
  const siteEmoji = process.env.SITE_PREFIX_EMOJI ?? '📰';
  const siteUpper = siteName.toUpperCase();
  const msg = `${siteEmoji} <b>${escapeHtml(siteUpper)}</b> · ${emojis} <b>BLOCAGE</b> ${emojis}

Pipeline : <code>${escapeHtml(opts.pipeline)}</code>
Étape qui bloque : <code>${escapeHtml(opts.step)}</code>

<b>Raison :</b>
${escapeHtml(opts.reason)}

<b>Action requise :</b>
${escapeHtml(opts.actionRequired)}

${opts.logsRef ? `<i>Logs : ${escapeHtml(opts.logsRef)}</i>` : ''}`;

  const result = await sendTelegram(msg);
  return { ok: result.ok };
}

/**
 * Format spécial pour les notifications de leads.
 */
export async function sendLeadNotification(lead: {
  nom: string;
  email: string;
  tel: string;
  site?: string;
  budget: string;
  projet: string;
  source?: string;
}): Promise<{ ok: boolean }> {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? 'Le Décodeur Marketing';
  const siteEmoji = process.env.SITE_PREFIX_EMOJI ?? '📰';
  const siteUpper = siteName.toUpperCase();
  const msg = `${siteEmoji} <b>${escapeHtml(siteUpper)}</b> · 🎯 <b>Nouveau lead</b>

<b>Nom :</b> ${escapeHtml(lead.nom)}
<b>Email :</b> ${escapeHtml(lead.email)}
<b>Tél :</b> ${escapeHtml(lead.tel)}
<b>Site :</b> ${lead.site ? escapeHtml(lead.site) : '·'}
<b>Budget :</b> ${escapeHtml(lead.budget)}

<b>Projet :</b>
${escapeHtml(lead.projet)}

<i>Source : ${escapeHtml(lead.source ?? '/contact')} • ${new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}</i>`;

  const result = await sendTelegram(msg);
  return { ok: result.ok };
}
