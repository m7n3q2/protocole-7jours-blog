import Link from 'next/link';
import { SILOS } from '@/lib/silos';

/**
 * Le Protocole · Journal — SiloNav (refonte 2026)
 * - Top variant : chips avec index numérique discret + accent active
 * - Bottom variant : grid silos avec numéro géant italic en background
 */

export default function SiloNav({
  activeSlug,
  variant = 'top',
}: {
  activeSlug?: string;
  variant?: 'top' | 'bottom';
}) {
  if (variant === 'top') {
    return (
      <nav aria-label="Tous les sujets" className="mb-10 border-b border-ink-100 pb-7">
        <div className="flex items-center gap-2 text-xs text-ink-500 mb-4">
          <Link href="/" className="hover:text-ink-900 transition-colors">Accueil</Link>
          <span className="text-ink-300">›</span>
          <Link href="/blog" className="hover:text-ink-900 transition-colors">Tous les sujets</Link>
          {activeSlug && (
            <>
              <span className="text-ink-300">›</span>
              <span className="text-ink-900 font-medium">{SILOS.find((s) => s.id === activeSlug)?.name}</span>
            </>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {SILOS.map((s, i) => {
            const active = s.id === activeSlug;
            return (
              <Link
                key={s.id}
                href={`/silo/${s.id}`}
                className={
                  active
                    ? 'inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm bg-ink-950 text-cream-50 font-medium'
                    : 'inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm bg-cream-200 text-ink-700 hover:bg-white hover:border-ink-200 hover:text-ink-950 border border-transparent transition'
                }
              >
                <span className={active ? 'font-mono text-[10px] text-accent-400' : 'font-mono text-[10px] text-ink-400'}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                {s.name}
              </Link>
            );
          })}
        </div>
      </nav>
    );
  }

  return (
    <nav aria-label="Explorer un autre sujet" className="mt-20 pt-12 border-t border-ink-100">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-700 font-semibold mb-2">
        Continuer ailleurs
      </p>
      <p className="font-sans text-2xl font-bold text-ink-950 mb-6 tracking-tight">
        Explorer un autre sujet
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {SILOS.filter((s) => s.id !== activeSlug).map((s, i) => (
          <Link
            key={s.id}
            href={`/silo/${s.id}`}
            className="
              group relative overflow-hidden rounded-xl border border-ink-100 bg-white p-6
              hover:border-accent-300 hover:-translate-y-0.5 hover:shadow-elev transition
            "
          >
            <span className="
              absolute right-3 top-2 font-sans italic text-5xl leading-none text-accent-50
              group-hover:text-accent-100 transition-colors
            ">
              {String(i + 1).padStart(2, '0')}
            </span>
            <p className="relative font-sans text-lg font-bold text-ink-950 group-hover:text-accent-700 transition-colors">
              {s.name}
            </p>
            <p className="relative mt-1 text-sm text-ink-600 line-clamp-2 leading-relaxed">
              {s.description}
            </p>
          </Link>
        ))}
      </div>
    </nav>
  );
}
