import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Politique de confidentialité',
  description: "Comment Le Protocole · Journal collecte, utilise et protège tes données personnelles.",
  path: '/politique-confidentialite',
});

/**
 * Le Protocole · Journal — app/politique-confidentialite/page.tsx
 * Page RGPD : aucune info perso, contact via formulaire ou email impersonnel.
 */

export default function PrivacyPage() {
  return (
    <div className="container-prose pt-20 md:pt-24 pb-12 pb-20">
      <nav className="flex flex-wrap items-center gap-2 text-xs text-ink-500 mb-6" aria-label="Fil d'Ariane">
        <Link href="/" className="hover:text-ink-900 transition-colors">Accueil</Link>
        <span className="text-ink-300">›</span>
        <span className="text-ink-900 font-medium">Politique de confidentialité</span>
      </nav>

      <p className="label-silo">Légal · Données</p>
      <h1 className="mt-3.5 font-serif text-4xl md:text-5xl font-bold text-[#1A1A2E] leading-[1.02] tracking-[-0.025em]">
        Politique de <span className="italic font-normal text-accent-700">confidentialité.</span>
      </h1>
      <p className="mt-3.5 font-mono text-xs uppercase tracking-[0.12em] text-ink-500">Mise à jour · 1er janvier 2026 · Conforme RGPD</p>

      <aside className="my-8 rounded-lg border border-ink-100 bg-white p-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500 mb-2 font-semibold">Sommaire</p>
        <ol className="list-decimal pl-5 text-sm space-y-1">
          <li><a href="#donnees" className="text-accent-700 underline underline-offset-2 hover:text-accent-800">Données que nous collectons</a></li>
          <li><a href="#finalite" className="text-accent-700 underline underline-offset-2 hover:text-accent-800">Pour quoi nous les utilisons</a></li>
          <li><a href="#duree" className="text-accent-700 underline underline-offset-2 hover:text-accent-800">Durée de conservation</a></li>
          <li><a href="#partage" className="text-accent-700 underline underline-offset-2 hover:text-accent-800">Avec qui nous les partageons</a></li>
          <li><a href="#droits" className="text-accent-700 underline underline-offset-2 hover:text-accent-800">Tes droits RGPD</a></li>
          <li><a href="#cookies" className="text-accent-700 underline underline-offset-2 hover:text-accent-800">Cookies et tracking</a></li>
          <li><a href="#contact" className="text-accent-700 underline underline-offset-2 hover:text-accent-800">Contact DPO</a></li>
        </ol>
      </aside>

      <div className="mt-10 max-w-[72ch] text-lg text-ink-700 leading-relaxed space-y-4">
        <LegalH2 id="donnees">Données que nous collectons</LegalH2>
        <p>Nous collectons uniquement les données strictement nécessaires aux interactions volontaires :</p>
        <ul className="list-disc pl-5 space-y-1.5 marker:text-accent-500">
          <li><strong className="text-ink-900">Formulaire de contact :</strong> prénom, email, description du sujet ou de la question.</li>
          <li><strong className="text-ink-900">Téléchargement de ressource :</strong> email uniquement.</li>
          <li><strong className="text-ink-900">Analytics anonymisés :</strong> pages vues, durée de session, source de trafic (Plausible Analytics, sans cookie, sans empreinte personnelle).</li>
        </ul>

        <LegalH2 id="finalite">Pour quoi nous les utilisons</LegalH2>
        <ul className="list-disc pl-5 space-y-1.5 marker:text-accent-500">
          <li>Te répondre suite à une demande explicite via le formulaire de contact.</li>
          <li>Te livrer la ressource téléchargée et t&apos;envoyer les emails associés (5 maximum sur 14 jours).</li>
          <li>Améliorer le contenu éditorial en mesurant ce qui intéresse l&apos;audience (sans profilage individuel).</li>
        </ul>
        <p>Nous ne vendons jamais tes données. Nous ne les transmettons à aucun tiers à des fins commerciales.</p>

        <LegalH2 id="duree">Durée de conservation</LegalH2>
        <ul className="list-disc pl-5 space-y-1.5 marker:text-accent-500">
          <li><strong className="text-ink-900">Données de contact :</strong> 24 mois maximum après la dernière interaction.</li>
          <li><strong className="text-ink-900">Ressources et séquences email :</strong> jusqu&apos;à désinscription, puis purge sous 30 jours.</li>
          <li><strong className="text-ink-900">Analytics anonymisés :</strong> 12 mois.</li>
        </ul>

        <LegalH2 id="partage">Avec qui nous les partageons</LegalH2>
        <p>Sous-traitants techniques uniquement, sous clauses contractuelles types signées :</p>
        <ul className="list-disc pl-5 space-y-1.5 marker:text-accent-500">
          <li><strong className="text-ink-900">Vercel</strong> (hébergement) : États-Unis, CCT signées.</li>
          <li><strong className="text-ink-900">Notion</strong> (CRM interne) : États-Unis, CCT signées.</li>
          <li><strong className="text-ink-900">Brevo</strong> (envoi des emails post-opt-in) : France, RGPD natif.</li>
        </ul>

        <LegalH2 id="droits">Tes droits RGPD</LegalH2>
        <ul className="list-disc pl-5 space-y-1.5 marker:text-accent-500">
          <li><strong className="text-ink-900">Droit d&apos;accès</strong> à tes données.</li>
          <li><strong className="text-ink-900">Droit de rectification</strong> des données inexactes.</li>
          <li><strong className="text-ink-900">Droit à l&apos;effacement</strong> (oubli).</li>
          <li><strong className="text-ink-900">Droit à la portabilité</strong> de tes données.</li>
          <li><strong className="text-ink-900">Droit d&apos;opposition</strong> au traitement.</li>
          <li><strong className="text-ink-900">Droit de retrait du consentement</strong> à tout moment, notamment pour les séquences email.</li>
        </ul>
        <p>Pour exercer un de ces droits, écris-nous via le <Link href="/contact" className="text-accent-700 underline underline-offset-2 hover:text-accent-800">formulaire de contact</Link> en précisant ta demande. Réponse sous 30 jours maximum.</p>

        <LegalH2 id="cookies">Cookies et tracking</LegalH2>
        <p>Le site utilise <strong className="text-ink-900">Plausible Analytics</strong>, une solution européenne sans cookie, sans empreinte navigateur, sans transfert vers les États-Unis. Aucun consentement n&apos;est requis pour cet outil.</p>
        <p>Les seuls cookies déposés sont strictement techniques : état du formulaire de contact (cooldown anti-spam). Pas de cookie publicitaire, pas de pixel de retargeting.</p>

        <LegalH2 id="contact">Contact DPO</LegalH2>
        <p>Pour toute question relative au traitement de tes données : <Link href="/contact" className="text-accent-700 underline underline-offset-2 hover:text-accent-800">formulaire de contact</Link>, mention RGPD en début de message, ou contact@leprotocoledesseptjours.com.</p>
        <p>Tu peux également saisir la CNIL : <a href="https://www.cnil.fr/fr/plaintes" target="_blank" rel="noopener noreferrer" className="text-accent-700 underline underline-offset-2 hover:text-accent-800">cnil.fr/fr/plaintes</a>.</p>
      </div>
    </div>
  );
}

function LegalH2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="!mt-12 font-serif text-2xl font-bold text-[#1A1A2E] tracking-tight flex items-center gap-2.5 scroll-mt-24">
      <span aria-hidden="true" className="inline-block w-5 h-0.5 bg-accent-500 flex-shrink-0" />
      {children}
    </h2>
  );
}
