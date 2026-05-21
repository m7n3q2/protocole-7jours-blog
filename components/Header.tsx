import Link from 'next/link';
import { SILOS } from '@/lib/silos';

/**
 * Le Protocole · Journal — Header
 * Logo texte avec point accent rouge, nav silos rupture/reconquete.
 * Responsive : CTA mobile sur 2 lignes, hamburger hidden (nav masquee sous lg).
 */

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-ink-100 bg-cream-50/92 backdrop-blur supports-[backdrop-filter]:bg-cream-50/85">
      <div className="container-wide flex h-16 items-center justify-between">
        <Link href="/" className="flex flex-col items-start leading-none group min-w-0 shrink">
          <span className="font-sans text-base sm:text-lg font-bold text-ink-950 tracking-tight whitespace-nowrap">
            <span>le protocole</span><span className="text-accent-500 ml-0.5">·</span>
          </span>
          <span className="mt-1 text-ink-500 font-sans text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.14em] sm:tracking-[0.18em] whitespace-nowrap">
            <span className="hidden sm:inline">Journal · Rupture et reconquête</span>
            <span className="sm:hidden">Journal indépendant</span>
          </span>
        </Link>

        <nav aria-label="Principale" className="hidden lg:flex items-center gap-5 text-sm whitespace-nowrap">
          <NavLink href="/blog">Articles</NavLink>
          <NavLink href="/silo/traverser-la-rupture">Rupture</NavLink>
          <NavLink href="/silo/no-contact">No contact</NavLink>
          <NavLink href="/silo/reconquete-amoureuse">Reconquête</NavLink>
          <NavLink href="/silo/comprendre-son-ex">Comprendre son ex</NavLink>
          <NavLink href="/a-propos">À propos</NavLink>
        </nav>

        <Link
          href="https://leprotocoledesseptjours.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary text-xs sm:text-sm shadow-card hover:-translate-y-px transition whitespace-nowrap shrink-0 px-3 sm:px-4 py-1.5 sm:py-2"
        >
          <span className="hidden sm:inline">Le Protocole des 7 Jours</span>
          <span className="sm:hidden flex flex-col items-center leading-[1.1]">
            <span>Protocole</span>
            <span className="text-[9px] font-normal tracking-wide opacity-90">7 jours</span>
          </span>
        </Link>
      </div>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="
        relative text-ink-700 hover:text-ink-950 transition-colors
        after:content-[''] after:absolute after:left-0 after:-bottom-1
        after:h-px after:w-0 hover:after:w-full
        after:bg-accent-500 after:transition-[width] after:duration-200
        focus-visible:outline-none focus-visible:after:w-full
      "
    >
      {children}
    </Link>
  );
}
