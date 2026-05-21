'use client';

import { useEffect, useState } from 'react';

/**
 * Le Protocole · Journal — LeadMagnetPopup
 * Top-art gradient marine + glow cramoisi. Guide gratuit rupture.
 * Logique metier identique (cooldown, honeypot, fetch /api/lead-magnet).
 */

const STORAGE_KEY = 'protocole7j_lm_dismissed_at';
const DELAY_BEFORE_SHOW = 30_000;
const COOLDOWN_DAYS = 30;
const MAGNET_SLUG = 'guide-traverser-rupture';
const PDF_PATH = '/lead-magnets/guide-traverser-rupture.pdf';

export default function LeadMagnetPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');

  useEffect(() => {
    try {
      const dismissedAt = localStorage.getItem(STORAGE_KEY);
      if (dismissedAt) {
        const ms = Date.now() - parseInt(dismissedAt, 10);
        if (ms < COOLDOWN_DAYS * 24 * 3600 * 1000) return;
      }
    } catch { /* SSR */ }
    const t = setTimeout(() => setOpen(true), DELAY_BEFORE_SHOW);
    return () => clearTimeout(t);
  }, []);

  function dismiss() {
    try { localStorage.setItem(STORAGE_KEY, Date.now().toString()); } catch {}
    setOpen(false);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const formData = new FormData(e.currentTarget);
      const res = await fetch('/api/lead-magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          magnet: MAGNET_SLUG,
          website_url: formData.get('website_url') ?? '',
        }),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('ok');
      const a = document.createElement('a');
      a.href = PDF_PATH;
      a.download = 'guide-traverser-rupture-leprotocole.pdf';
      a.click();
      try { localStorage.setItem(STORAGE_KEY, Date.now().toString()); } catch {}
    } catch {
      setStatus('error');
    }
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lm-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/65 backdrop-blur-sm animate-fade-in"
      onClick={(e) => { if (e.target === e.currentTarget) dismiss(); }}
    >
      <div className="relative w-full max-w-lg rounded-2xl bg-cream-50 shadow-pop border border-ink-100 overflow-hidden animate-pop-in">
        {/* Top art — gradient marine profond + glow cramoisi */}
        <div className="relative h-28 overflow-hidden" style={{ background: 'linear-gradient(155deg, #0f172a 0%, #1A1A2E 50%, #2d1a2e 100%)' }}>
          <span aria-hidden="true" className="absolute -right-10 -top-10 w-44 h-44 rounded-full border border-white/15" />
          <span aria-hidden="true" className="absolute right-8 top-8 w-10 h-10 rounded-full blur-xl opacity-80" style={{ background: '#C41E3A' }} />
          <p className="absolute left-6 top-5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/85">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-400" aria-hidden="true" />
            Guide gratuit · 7 etapes
          </p>
          <div className="absolute left-6 bottom-3 flex gap-3 items-baseline text-white">
            <span className="font-sans italic text-2xl leading-none">7</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/70">Etapes cles</span>
            <span className="text-white/40">·</span>
            <span className="font-sans italic text-2xl leading-none">10 min</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/70">De lecture</span>
          </div>

          <button
            type="button"
            onClick={dismiss}
            aria-label="Fermer"
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 text-white border border-white/20 flex items-center justify-center text-lg leading-none hover:bg-black/60 transition"
          >
            ×
          </button>
        </div>

        {status === 'ok' ? (
          <div className="p-7 text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-700 mb-2">Telechargement OK</p>
            <p className="text-3xl font-sans font-bold text-ink-950 mb-3 leading-tight">Merci.</p>
            <p className="text-ink-700 mb-2">Ton telechargement a demarre.</p>
            <p className="text-sm text-ink-500">
              Si rien ne se passe,{' '}
              <a href={PDF_PATH} download className="underline text-accent-700">
                clique ici pour telecharger directement
              </a>.
            </p>
            <button type="button" onClick={dismiss} className="mt-6 btn-secondary">
              Fermer
            </button>
          </div>
        ) : (
          <div className="p-7">
            <h2 id="lm-title" className="font-sans text-2xl md:text-[1.65rem] font-bold text-ink-950 leading-[1.15]">
              Les <span className="italic text-accent-500">7 etapes</span> pour traverser une rupture sans se perdre
            </h2>
            <p className="mt-3 text-ink-700 leading-relaxed text-[0.9375rem]">
              Guide gratuit : comprendre ce qui se passe, eviter les erreurs classiques, retrouver ta stabilite.
            </p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-2.5">
              <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', height: 0, overflow: 'hidden' }}>
                <label>
                  Site web (laissez vide)
                  <input type="text" name="website_url" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ton@email.com"
                className="w-full px-4 py-3 rounded-lg border border-ink-200 bg-white text-ink-900 focus:border-accent-500 focus:ring-2 focus:ring-accent-100 outline-none transition"
                autoComplete="email"
                disabled={status === 'loading'}
              />

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed group justify-center"
              >
                {status === 'loading' ? 'Preparation du guide...' : (
                  <>
                    Telecharger le guide gratuit
                    <span className="font-sans italic text-lg leading-none transition-transform group-hover:translate-x-0.5">→</span>
                  </>
                )}
              </button>

              {status === 'error' && (
                <p role="alert" className="text-sm text-red-600">
                  Une erreur est survenue. Reessaie ou contacte-nous directement.
                </p>
              )}

              <p className="text-xs text-ink-500 leading-relaxed pt-1">
                Livre immediatement. Pas de spam.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
