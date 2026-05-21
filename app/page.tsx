import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getRecentArticles } from '@/lib/articles';
import { SILOS } from '@/lib/silos';
import { getAuthor } from '@/lib/authors';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({ title: undefined });

/**
 * Le Protocole · Journal — app/page.tsx
 * Journal rupture/reconquete. Hero doux + grille silos + derniers articles.
 */

export default function HomePage() {
  const recent = getRecentArticles(6);
  const total = getRecentArticles(999).length;

  return (
    <>
      {/* ============================================================
          HERO
          ============================================================ */}
      <section className="relative overflow-hidden border-b border-ink-100 bg-cream-100">
        {/* Decorative orbs */}
        <span aria-hidden="true" className="pointer-events-none absolute -right-32 -top-16 w-[460px] h-[460px] rounded-full border border-accent-500/10" />
        <span aria-hidden="true" className="pointer-events-none absolute right-20 top-32 w-20 h-20 rounded-full bg-accent-400/20 blur-2xl" />
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(196,30,58,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(196,30,58,0.03)_1px,transparent_1px)] bg-[length:32px_32px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_30%,transparent_80%)]" />

        <div className="container-wide relative py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="label-silo">Journal indépendant</p>
            <h1 className="mt-4 font-sans text-5xl md:text-6xl lg:text-7xl font-bold text-ink-950 leading-[1.02] tracking-[-0.025em]">
              Traverser la rupture.{' '}
              <span className="italic text-accent-500">Comprendre. Avancer.</span>
            </h1>
            <p className="mt-6 text-xl text-ink-700 leading-relaxed max-w-2xl">
              Articles concrets sur la rupture amoureuse, le no contact, la reconquête et la reconstruction de soi.
              Pour les moments où on ne sait plus quoi faire.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink-500">
              <span className="inline-flex items-center gap-1.5">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-500 animate-pulse-soft" aria-hidden="true" />
                {total > 0 ? `${total} articles` : 'Journal en cours'}
              </span>
              <span>·</span>
              <span>6 thèmes</span>
              <span>·</span>
              <span>Nouveau contenu chaque semaine</span>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/blog" className="btn-primary group">
                Tous les articles
                <span className="font-sans italic text-lg leading-none transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
              <Link href="https://leprotocoledesseptjours.com" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                Le Protocole des 7 Jours
              </Link>
            </div>

            {/* Stat cards glassmorphism */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-[740px]">
              <StatCard value={String(total > 0 ? total : '...')} label="Articles" mono />
              <StatCard value="6" label="Thèmes" mono />
              <StatCard value="Quotidien" label="Cadence" />
              <StatCard value="Gratuit" label="Accès" />
            </div>

            <div className="mt-10 pt-6 border-t border-accent-500/20 max-w-2xl">
              <p className="font-sans text-[11px] uppercase tracking-[0.16em] text-ink-500 mb-3">
                Ce journal couvre
              </p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-600">
                <span className="font-medium">Traverser la rupture</span>
                <span className="text-ink-300">·</span>
                <span className="font-medium">No contact</span>
                <span className="text-ink-300">·</span>
                <span className="font-medium">Reconquête</span>
                <span className="text-ink-300">·</span>
                <span className="font-medium">Comprendre son ex</span>
                <span className="text-ink-300">·</span>
                <span className="font-medium">Se reconstruire</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SILOS
          ============================================================ */}
      <section className="container-wide pt-20 md:pt-24 pb-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <h2 className="font-sans text-3xl md:text-4xl font-bold text-ink-950 tracking-tight">Par thème</h2>
          <Link href="/blog" className="group text-sm text-accent-700 hover:text-accent-800 inline-flex items-center gap-2">
            Voir tous les articles
            <span className="font-sans italic text-base leading-none transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SILOS.map((silo, i) => (
            <Link
              key={silo.id}
              href={`/silo/${silo.id}`}
              className="
                group relative overflow-hidden rounded-xl border border-ink-100 bg-white p-7
                hover:border-accent-300 hover:-translate-y-0.5 hover:shadow-elev transition
              "
            >
              <span aria-hidden="true" className="absolute right-3 top-2 font-sans italic text-5xl leading-none text-accent-50 group-hover:text-accent-100 transition-colors">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="relative font-sans text-2xl font-bold text-ink-950">
                {silo.name}
              </p>
              <p className="relative mt-2 text-sm text-ink-600 leading-relaxed">{silo.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ============================================================
          ARTICLES RECENTS
          ============================================================ */}
      {recent.length > 0 && (
        <section className="border-t border-ink-100 bg-white py-16 md:py-20">
          <div className="container-wide">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
              <h2 className="font-sans text-3xl md:text-4xl font-bold text-ink-950 tracking-tight">Derniers articles</h2>
              <Link href="/blog" className="group text-sm text-accent-700 hover:text-accent-800 inline-flex items-center gap-2">
                Tout voir
                <span className="font-sans italic text-base leading-none transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recent.map((a) => {
                const author = getAuthor(a.frontmatter.author);
                return (
                  <article key={a.frontmatter.slug} className="group">
                    <Link href={`/blog/${a.frontmatter.slug}`} className="block">
                      <div className="aspect-[16/10] relative overflow-hidden rounded-lg bg-ink-100">
                        {a.frontmatter.hero && (
                          <Image
                            src={a.frontmatter.hero}
                            alt={a.frontmatter.hero_alt ?? a.frontmatter.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              unoptimized={a.frontmatter.hero?.endsWith('.svg')}
            />
                        )}
                      </div>
                      <p className="mt-4 label-silo">{a.frontmatter.silo}</p>
                      <h3 className="mt-2.5 font-sans text-xl font-bold text-ink-950 group-hover:text-accent-700 leading-tight tracking-tight transition-colors">
                        {a.frontmatter.title}
                      </h3>
                      <p className="mt-2 text-sm text-ink-600 leading-relaxed line-clamp-2">
                        {a.frontmatter.description}
                      </p>
                      <p className="mt-3 article-meta">
                        {author?.name ?? 'La rédaction'} · {a.readingTime.text}
                      </p>
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================
          CTA DISCRET VERS LE PRODUIT
          ============================================================ */}
      <section className="next-step-cta relative overflow-hidden text-white mt-16 md:mt-20">
        <span aria-hidden="true" className="pointer-events-none absolute -right-40 -bottom-32 w-[480px] h-[480px] rounded-full bg-[radial-gradient(circle,rgba(196,30,58,0.12),rgba(196,30,58,0)_60%)]" />
        <div className="container-wide relative py-24 md:py-32 text-center max-w-3xl mx-auto">
          <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-accent-400 mb-3">Pour aller plus loin</p>
          <h2 className="font-sans text-3xl md:text-4xl font-bold leading-tight">
            Les 7 premiers jours après une rupture sont critiques.
          </h2>
          <p className="mt-4 text-ink-300 max-w-xl mx-auto leading-relaxed">
            Le Protocole des 7 Jours est un programme complet pour se stabiliser émotionnellement
            et reprendre le contrôle dans la semaine qui suit la séparation.
          </p>
          <div className="mt-8">
            <a
              href="https://leprotocoledesseptjours.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary group inline-flex"
            >
              Découvrir le protocole
              <span className="font-sans italic text-lg leading-none transition-transform group-hover:translate-x-0.5">→</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function StatCard({ value, label, mono = false }: { value: string; label: string; mono?: boolean }) {
  return (
    <div className="relative rounded-xl border border-accent-500/15 bg-white/55 backdrop-blur-xl px-4 py-3.5">
      <p className={mono
        ? 'font-mono font-semibold text-3xl md:text-4xl text-ink-950 leading-none tracking-[-0.04em]'
        : 'font-sans italic text-2xl md:text-3xl text-ink-950 leading-none tracking-[-0.02em] truncate'}>
        {value}
      </p>
      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-500">{label}</p>
    </div>
  );
}
