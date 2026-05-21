import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Mentions légales',
  description: 'Mentions légales du site blog.leprotocoledesseptjours.com.',
  path: '/mentions-legales',
});

/**
 * Le Protocole · Journal — app/mentions-legales/page.tsx
 * Page legale : aucune info perso, email impersonnel, caveat YMYL.
 */

export default function LegalNoticePage() {
  return (
    <div className="container-prose pt-20 md:pt-24 pb-12 pb-20">
      <nav className="flex flex-wrap items-center gap-2 text-xs text-ink-500 mb-6" aria-label="Fil d'Ariane">
        <Link href="/" className="hover:text-ink-900 transition-colors">Accueil</Link>
        <span className="text-ink-300">›</span>
        <span className="text-ink-900 font-medium">Mentions légales</span>
      </nav>

      <p className="label-silo">Légal</p>
      <h1 className="mt-3.5 font-sans text-4xl md:text-5xl font-bold text-ink-950 leading-[1.02] tracking-[-0.025em]">
        Mentions <span className="italic font-normal text-accent-700">légales.</span>
      </h1>
      <p className="mt-3.5 font-mono text-xs uppercase tracking-[0.12em] text-ink-500">Mise à jour · 1er janvier 2026</p>

      <aside className="my-8 rounded-lg border border-ink-100 bg-white p-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500 mb-2 font-semibold">Sommaire</p>
        <ol className="list-decimal pl-5 text-sm space-y-1">
          <li><a href="#editeur" className="text-accent-700 underline underline-offset-2 hover:text-accent-800">Éditeur du site</a></li>
          <li><a href="#hebergement" className="text-accent-700 underline underline-offset-2 hover:text-accent-800">Hébergement</a></li>
          <li><a href="#propriete" className="text-accent-700 underline underline-offset-2 hover:text-accent-800">Propriété intellectuelle</a></li>
          <li><a href="#responsabilite" className="text-accent-700 underline underline-offset-2 hover:text-accent-800">Responsabilité éditoriale</a></li>
          <li><a href="#liens" className="text-accent-700 underline underline-offset-2 hover:text-accent-800">Liens externes et affiliation</a></li>
          <li><a href="#contact" className="text-accent-700 underline underline-offset-2 hover:text-accent-800">Contact</a></li>
        </ol>
      </aside>

      <div className="mt-10 max-w-[72ch] text-lg text-ink-700 leading-relaxed space-y-4">
        <LegalH2 id="editeur">Éditeur du site</LegalH2>
        <p>Le site <strong className="text-ink-900">blog.leprotocoledesseptjours.com</strong> est edite par une entite editoriale independante. Conformement a l&apos;article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l&apos;economie numerique, le site est publie de maniere professionnelle.</p>
        <p>Directeur de la publication : la redaction.</p>
        <p>Le site n&apos;est rattache a aucune agence, aucun editeur tiers ni partenariat commercial obligatoire.</p>
        <p>Pour nous contacter : <Link href="/contact" className="text-accent-700 underline underline-offset-2 hover:text-accent-800">formulaire de contact</Link> ou contact@leprotocoledesseptjours.com.</p>

        <LegalH2 id="hebergement">Hébergement</LegalH2>
        <p>Le site est heberge sur Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, Etats-Unis. Infrastructure CDN Europe.</p>
        <p>Les donnees utilisateurs (formulaires de contact) sont stockees dans Notion (Notion Labs, Inc.), conformement aux clauses contractuelles types signees et a la politique de confidentialite du present site.</p>

        <LegalH2 id="propriete">Propriété intellectuelle</LegalH2>
        <p>L&apos;ensemble des contenus presents sur le site (textes, analyses, mise en page) est protege par le droit d&apos;auteur. Toute reproduction, representation, modification, publication ou adaptation, totale ou partielle, sans autorisation ecrite prealable, est interdite.</p>
        <p>Les citations courtes accompagnees de l&apos;attribution claire de la source et du lien vers l&apos;article original sont autorisees dans la limite de l&apos;article L.122-5 du Code de la propriete intellectuelle.</p>

        <LegalH2 id="responsabilite">Responsabilité éditoriale</LegalH2>
        <p>Les contenus publies sur ce site sont des analyses editoriales a but informatif sur les sujets de la rupture amoureuse, du no contact et de la reconquete. Ils ne constituent pas un conseil psychologique, psychiatrique ou medical reglemente. Ce contenu est educatif et ne remplace pas un suivi professionnel. Pour tout probleme de sante mentale, consulte un professionnel de sante qualifie.</p>
        <p>Les methodes et exemples cites refletent l&apos;etat des recherches et pratiques a la date de publication. Toute decision reste sous la responsabilite du lecteur.</p>

        <LegalH2 id="liens">Liens externes et affiliation</LegalH2>
        <p>Le site contient un lien commercial vers le produit <a href="https://leprotocoledesseptjours.com" target="_blank" rel="noopener noreferrer" className="text-accent-700 underline underline-offset-2 hover:text-accent-800">Le Protocole des 7 Jours</a>. Ce lien est clairement identifie dans le site. Il peut egalement contenir des liens vers des ressources tierces fournis a titre informatif.</p>
        <p>Aucune affiliation cachee n&apos;existe sur le site. Tous les liens commerciaux sont identifies.</p>

        <LegalH2 id="contact">Contact</LegalH2>
        <p>Pour toute question relative au present site, contacte la redaction via le <Link href="/contact" className="text-accent-700 underline underline-offset-2 hover:text-accent-800">formulaire de contact</Link> ou a l&apos;adresse contact@leprotocoledesseptjours.com.</p>
      </div>
    </div>
  );
}

function LegalH2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="!mt-12 font-sans text-2xl font-bold text-ink-950 tracking-tight flex items-center gap-2.5 scroll-mt-24">
      <span aria-hidden="true" className="inline-block w-5 h-0.5 bg-accent-500 flex-shrink-0" />
      {children}
    </h2>
  );
}
