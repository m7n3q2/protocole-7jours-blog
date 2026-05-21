import Link from 'next/link';
import Logo from '@/components/Logo';
import { SILOS } from '@/lib/silos';

/**
 * Le Protocole des 7 Jours — Footer.
 * Fond navy de marque, logo officiel, maillage interne (SEO) + légales,
 * un seul lien discret vers le produit. Aucune zone de conversion.
 */
export default function Footer() {
  return (
    <footer className="bg-[#1A1A2E] text-cream-200/80 mt-20">
      <div className="container-wide pt-16 pb-12 md:pt-20 md:pb-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
        <div className="md:col-span-2">
          <Link href="/" aria-label="Accueil — Le Protocole des 7 Jours" className="inline-block">
            <Logo dark />
          </Link>
          <p className="mt-6 font-sans text-sm leading-relaxed max-w-md text-cream-200/60">
            Le journal de la reconstruction après une rupture : rupture, no contact, reconquête et
            psychologie de l&apos;attachement. Contenu éducatif, ne remplace pas un suivi professionnel.
          </p>
          <p className="mt-5 font-sans text-sm">
            <a
              href="https://leprotocoledesseptjours.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-400 hover:text-accent-300 transition-colors underline underline-offset-2"
            >
              Le Protocole des 7 Jours
            </a>
          </p>
        </div>

        <FooterCol title="Thèmes">
          {SILOS.map((s) => (
            <li key={s.id}>
              <FooterLink href={`/silo/${s.id}`}>{s.name}</FooterLink>
            </li>
          ))}
        </FooterCol>

        <FooterCol title="Le journal">
          <li><FooterLink href="/blog">Tous les articles</FooterLink></li>
          <li><FooterLink href="/a-propos">À propos</FooterLink></li>
          <li><FooterLink href="/methodologie">Notre approche</FooterLink></li>
          <li><FooterLink href="/mentions-legales" muted>Mentions légales</FooterLink></li>
          <li><FooterLink href="/politique-confidentialite" muted>Confidentialité</FooterLink></li>
        </FooterCol>
      </div>

      <div className="border-t border-white/10">
        <div className="container-wide py-6 text-center">
          <p className="font-sans text-[11px] uppercase tracking-[0.14em] text-cream-200/40">
            &copy; {new Date().getFullYear()} Le Protocole des 7 Jours · Contenu éducatif
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-sans text-[11px] uppercase tracking-[0.16em] text-cream-200/40 mb-4 font-semibold">
        {title}
      </p>
      <ul className="space-y-2.5 font-sans text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
  muted = false,
}: {
  href: string;
  children: React.ReactNode;
  muted?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`${muted ? 'text-cream-200/45' : 'text-cream-200/75'} hover:text-white transition-colors`}
    >
      {children}
    </Link>
  );
}
