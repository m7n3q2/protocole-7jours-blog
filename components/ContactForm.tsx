'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Le Protocole · Journal — ContactForm
 * Formulaire simple : nom, email, sujet, message.
 * Logique metier (honeypot, validation, rate limit).
 */

type FormState = 'idle' | 'submitting' | 'ok' | 'error';

export default function ContactForm() {
  const [state, setState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const honeypotName = process.env.NEXT_PUBLIC_HONEYPOT_FIELD_NAME ?? 'website_url';

  useEffect(() => {
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('submitting');
    setErrorMsg('');

    const fd = new FormData(e.currentTarget);
    const payload: Record<string, string> = {
      nom: String(fd.get('nom') ?? ''),
      email: String(fd.get('email') ?? ''),
      societe: String(fd.get('sujet') ?? ''),
      ca: 'non-applicable',
      situation: 'Contact blog',
      montant: '',
      projet: String(fd.get('message') ?? ''),
      source: window.location.pathname,
    };
    payload[honeypotName] = String(fd.get(honeypotName) ?? '');

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(
          data.error === 'rate_limited'
            ? 'Trop de tentatives, réessaie dans une heure.'
            : 'Une erreur est survenue, réessaie ou contacte-nous directement.',
        );
        setState('error');
        return;
      }
      setState('ok');
    } catch {
      setErrorMsg('Connexion impossible, réessaie dans quelques secondes.');
      setState('error');
    }
  }

  if (state === 'ok') {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-accent-200 bg-accent-50 p-8 md:p-10 text-center">
        <span
          aria-hidden="true"
          className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-accent-100 opacity-70"
        />
        <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-full bg-white border border-accent-200 mb-4">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="text-accent-600">
            <path d="M5 12l5 5 9-11" />
          </svg>
        </div>
        <p className="relative text-2xl font-sans font-bold text-ink-950">Message bien reçu.</p>
        <p className="relative mt-3 text-ink-700 max-w-md mx-auto leading-relaxed">
          On revient vers toi sous 48h ouvrées. Pense à vérifier tes spams au cas où notre email atterrit là-bas.
        </p>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Prénom" name="nom" required maxLength={200} autoComplete="given-name" />
          <Field label="Email" name="email" type="email" required maxLength={200} autoComplete="email" />
        </div>

        <Field label="Sujet" name="sujet" required maxLength={200} placeholder="ex : question sur un article, suggestion de sujet" />

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-ink-700 mb-1.5">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            minLength={30}
            maxLength={5000}
            placeholder="Ta question, ton retour d'expérience, ce que tu voudrais lire sur ce blog."
            className="w-full rounded-lg border border-ink-200 bg-white px-4 py-3 text-ink-900 focus:border-accent-500 focus:ring-2 focus:ring-accent-100 focus:outline-none transition resize-y"
          />
        </div>

        {/* Honeypot */}
        <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', height: 0, overflow: 'hidden' }}>
          <label>
            Site web (laissez vide)
            <input type="text" name={honeypotName} tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        {state === 'error' && (
          <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-900">
            {errorMsg}
          </div>
        )}

        <button
          type="submit"
          disabled={state === 'submitting'}
          className="btn-primary w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          {state === 'submitting' ? 'Envoi en cours...' : (
            <>
              Envoyer le message
              <span className="font-sans italic text-lg leading-none transition-transform group-hover:translate-x-0.5">→</span>
            </>
          )}
        </button>

        <p className="text-xs text-ink-500 leading-relaxed">
          En envoyant ce formulaire, tu acceptes que tes données soient utilisées pour te recontacter.
          Aucune diffusion à un tiers, jamais.{' '}
          <a href="/politique-confidentialite" className="underline underline-offset-2 hover:text-ink-700">
            Voir notre politique de confidentialité.
          </a>
        </p>
      </form>
    </>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required = false,
  maxLength,
  placeholder,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  maxLength?: number;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-ink-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        maxLength={maxLength}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full rounded-lg border border-ink-200 bg-white px-4 py-3 text-ink-900 placeholder:text-ink-400 focus:border-accent-500 focus:ring-2 focus:ring-accent-100 focus:outline-none transition"
      />
    </div>
  );
}
