import Link from 'next/link';
import Logo from '@/components/Logo';

/**
 * Le Protocole des 7 Jours — Header du blog.
 * Réplique exacte du site de vente : logo centré seul, fond crème, aucune nav, aucun CTA.
 * (Le maillage interne SEO est assuré par le footer et les liens en contenu.)
 */
export default function Header() {
  return (
    <header className="border-b border-ink-100/70 bg-cream-50">
      <div className="container-wide py-4 sm:py-5 flex justify-center">
        <Link href="/" aria-label="Accueil — Le Protocole des 7 Jours" className="inline-block">
          <Logo />
        </Link>
      </div>
    </header>
  );
}
