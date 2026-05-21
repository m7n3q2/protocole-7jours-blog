import Link from 'next/link';
import { SITE } from '@/lib/seo';
import { SILOS } from '@/lib/silos';

/**
 * Le Protocole · Journal — Footer
 * Fond ink-950 sombre, point accent rouge, maillage silos + legales.
 * Maillage discret vers le produit leprotocoledesseptjours.com.
 */

export default function Footer() {
  return (
    <footer className="bg-ink-950 text-ink-200 relative overflow-hidden site-footer">
      <span
        aria-hidden="true"
        className="absolute -right-44 -bottom-32 w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(196,30,58,0.08), rgba(196,30,58,0) 65%)' }}
      />
      <div className="container-wide pt-28 pb-12 md:pt-32 md:pb-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 relative">
        <div className="md:col-span-2">
          <Link href="/" className="flex flex-col items-start leading-none group">
            <span className="font-sans text-2xl font-bold text-white tracking-tight">
              <span>le protocole</span><span className="text-accent-400 transition-colors group-hover:text-accent-300 ml-0.5">·</span>
            </span>
            <span className="mt-1.5 text-ink-400 font-sans text-[10px] font-medium uppercase tracking-[0.2em]">
              Journal · Rupture et reconquête
            </span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed max-w-md text-ink-400">
            Journal indépendant sur la traversée de la rupture, le no contact et la reconquête amoureuse.
            Contenu éducatif : ne remplace pas un suivi psychologique ou médical.
          </p>
          <p className="mt-4 text-sm">
            <a
              href="https://leprotocoledesseptjours.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-400 hover:text-accent-300 transition-colors underline underline-offset-2"
            >
              Le Protocole des 7 Jours (programme complet)
            </a>
          </p>
        </div>

        <FooterCol title="Sujets">
          {SILOS.map((s) => (
            <li key={s.id}>
              <FooterLink href={`/silo/${s.id}`}>{s.name}</FooterLink>
            </li>
          ))}
        </FooterCol>

        <div>
          <FooterColTitle>Le journal</FooterColTitle>
          <ul className="space-y-2 text-sm">
            <li><FooterLink href="/a-propos">À propos</FooterLink></li>
            <li><FooterLink href="/methodologie">Notre approche</FooterLink></li>
            <li><FooterLink href="/contact">Contact</FooterLink></li>
            <li><FooterLink href="/feed.xml">Flux RSS</FooterLink></li>
          </ul>
          <div className="mt-6">
            <FooterColTitle>Legal</FooterColTitle>
            <ul className="space-y-2 text-sm">
              <li><FooterLink href="/mentions-legales" muted>Mentions légales</FooterLink></li>
              <li><FooterLink href="/politique-confidentialite" muted>Confidentialité</FooterLink></li>
              <li><FooterLink href="/cgu" muted>CGU</FooterLink></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-ink-800 relative">
        <div className="container-wide py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-3">
          <p className="font-sans text-[10px] sm:text-[11px] uppercase tracking-wider text-ink-500 leading-relaxed">
            &copy; {new Date().getFullYear()} LE PROTOCOLE · JOURNAL
            <span className="hidden sm:inline"> · Contenu éducatif</span>
          </p>
          <p className="hidden md:block font-sans text-[11px] uppercase tracking-wider text-ink-500">
            Indépendant · Éthique · Soutien après rupture
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-ink-500 mb-3 font-semibold">
      <span className="text-accent-500">//</span> {children}
    </p>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <FooterColTitle>{title}</FooterColTitle>
      <ul className="space-y-2 text-sm">{children}</ul>
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
      className={`
        relative ${muted ? 'text-ink-400' : 'text-ink-200'} hover:text-white transition-colors
        after:content-[''] after:absolute after:left-0 after:-bottom-0.5
        after:h-px after:w-0 hover:after:w-full
        after:bg-accent-500 after:transition-[width] after:duration-200
      `}
    >
      {children}
    </Link>
  );
}
