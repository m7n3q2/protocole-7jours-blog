import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Contact',
  description:
    "Une question sur les articles, une suggestion de sujet ou un retour d'expérience : contacte la rédaction du Protocole · Journal.",
  path: '/contact',
});

/**
 * Le Protocole · Journal — app/contact/page.tsx
 * Page contact simple, sans promesse de consultation.
 */

export default function ContactPage() {
  return (
    <div className="container-prose pt-20 md:pt-28 pb-16 md:pb-20">
      <p className="label-silo">Contact</p>
      <h1 className="mt-4 font-serif text-4xl md:text-5xl font-bold text-[#1A1A2E] leading-[1.05] tracking-[-0.025em]">
        Écrire à{' '}
        <span className="italic font-normal text-accent-700">la rédaction.</span>
      </h1>
      <p className="mt-5 text-lg text-ink-700 leading-relaxed max-w-[55ch]">
        Une question sur un article, une suggestion de sujet ou un retour d&apos;expérience :
        on lit tous les messages. Réponse sous 48h ouvrées.
      </p>

      <div className="mt-10 rounded-2xl border border-ink-100 bg-white p-6 md:p-10 shadow-card">
        <ContactForm />
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        <ReassureBox
          icon={(
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="9" />
            </svg>
          )}
          title="Éditorial indépendant"
        >
          Ce journal n&apos;est pas un service de coaching. Pour un accompagnement personnalisé,
          consulte un professionnel de santé mentale.
        </ReassureBox>
        <ReassureBox
          icon={(
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" />
            </svg>
          )}
          title="Réponse sous 48h"
        >
          On répondra à ton message dans les 48 heures ouvrées. Pas de réponse automatique,
          pas de relance commerciale.
        </ReassureBox>
        <ReassureBox
          icon={(
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />
            </svg>
          )}
          title="Données protégées"
        >
          Tes informations servent uniquement à répondre à ta demande. Pas de revente,
          pas de newsletter automatique.
        </ReassureBox>
      </div>
    </div>
  );
}

function ReassureBox({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-ink-100 bg-white p-5">
      <span aria-hidden="true" className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-accent-50 text-accent-600 mb-2.5">
        {icon}
      </span>
      <p className="font-sans text-lg font-bold text-ink-950 tracking-tight">{title}</p>
      <p className="mt-1.5 text-sm text-ink-600 leading-relaxed">{children}</p>
    </div>
  );
}
