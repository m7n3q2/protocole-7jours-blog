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
 * Page légale : aucune info perso, email impersonnel, caveat YMYL.
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
      <h1 className="mt-3.5 font-serif text-4xl md:text-5xl font-bold text-[#1A1A2E] leading-[1.02] tracking-[-0.025em]">
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
        <p>Le site <strong className="text-ink-900">blog.leprotocoledesseptjours.com</strong> est édité par une entité éditoriale indépendante. Conformément à l&apos;article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie numérique, le site est publié de manière professionnelle.</p>
        <p>Directeur de la publication : la rédaction.</p>
        <p>Le site n&apos;est rattaché à aucune agence, aucun éditeur tiers ni partenariat commercial obligatoire.</p>
        <p>Pour nous contacter : <Link href="/contact" className="text-accent-700 underline underline-offset-2 hover:text-accent-800">formulaire de contact</Link> ou contact@leprotocoledesseptjours.com.</p>

        <LegalH2 id="hebergement">Hébergement</LegalH2>
        <p>Le site est hébergé sur Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis. Infrastructure CDN Europe.</p>
        <p>Les données utilisateurs (formulaires de contact) sont stockées dans Notion (Notion Labs, Inc.), conformément aux clauses contractuelles types signées et à la politique de confidentialité du présent site.</p>

        <LegalH2 id="propriete">Propriété intellectuelle</LegalH2>
        <p>L&apos;ensemble des contenus présents sur le site (textes, analyses, mise en page) est protégé par le droit d&apos;auteur. Toute reproduction, représentation, modification, publication ou adaptation, totale ou partielle, sans autorisation écrite préalable, est interdite.</p>
        <p>Les citations courtes accompagnées de l&apos;attribution claire de la source et du lien vers l&apos;article original sont autorisées dans la limite de l&apos;article L.122-5 du Code de la propriété intellectuelle.</p>

        <LegalH2 id="responsabilite">Responsabilité éditoriale</LegalH2>
        <p>Les contenus publiés sur ce site sont des analyses éditoriales à but informatif sur les sujets de la rupture amoureuse, du no contact et de la reconquête. Ils ne constituent pas un conseil psychologique, psychiatrique ou médical réglementé. Ce contenu est éducatif et ne remplace pas un suivi professionnel. Pour tout problème de santé mentale, consulte un professionnel de santé qualifié.</p>
        <p>Les méthodes et exemples cités reflètent l&apos;état des recherches et pratiques à la date de publication. Toute décision reste sous la responsabilité du lecteur.</p>

        <LegalH2 id="liens">Liens externes et affiliation</LegalH2>
        <p>Le site contient un lien commercial vers le produit <a href="https://leprotocoledesseptjours.com" target="_blank" rel="noopener noreferrer" className="text-accent-700 underline underline-offset-2 hover:text-accent-800">Le Protocole des 7 Jours</a>. Ce lien est clairement identifié dans le site. Il peut également contenir des liens vers des ressources tierces fournis à titre informatif.</p>
        <p>Aucune affiliation cachée n&apos;existe sur le site. Tous les liens commerciaux sont identifiés.</p>

        <LegalH2 id="contact">Contact</LegalH2>
        <p>Pour toute question relative au présent site, contacte la rédaction via le <Link href="/contact" className="text-accent-700 underline underline-offset-2 hover:text-accent-800">formulaire de contact</Link> ou à l&apos;adresse contact@leprotocoledesseptjours.com.</p>
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
