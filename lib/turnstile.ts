/**
 * Cloudflare Turnstile verification (anti-bot, gratuit illimité).
 * https://developers.cloudflare.com/turnstile/
 */

export async function verifyTurnstile(
  token: string | null,
  ip?: string,
): Promise<{ success: boolean; error?: string }> {
  if (!token) return { success: false, error: 'No token provided' };

  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    // En dev, si pas de secret, on laisse passer (logged comme warning)
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[Turnstile] No TURNSTILE_SECRET_KEY in env, skipping verification (dev only)');
      return { success: true };
    }
    return { success: false, error: 'Missing TURNSTILE_SECRET_KEY' };
  }

  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.append('remoteip', ip);

  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });
    const data = (await res.json()) as { success: boolean; 'error-codes'?: string[] };
    if (!data.success) {
      return { success: false, error: (data['error-codes'] ?? []).join(',') || 'verification failed' };
    }
    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : 'unknown' };
  }
}
