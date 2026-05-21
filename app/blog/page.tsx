import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getRecentArticles } from '@/lib/articles';
import { SILOS } from '@/lib/silos';
import { getAuthor } from '@/lib/authors';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Tous les articles',
  description:
    "L'archive complète : rupture, no contact, reconquête, comprendre son ex, se reconstruire. Mise à jour continue.",
  path: '/blog',
});

/**
 * Le Protocole des 7 Jours — index des articles.
 * Crème, centré, titres Playfair, grille sobre. Aucune zone de conversion.
 */
export default function BlogIndexPage() {
  const articles = getRecentArticles(60);

  return (
    <>
      {/* En-tête */}
      <section className="container-wide pt-14 md:pt-20 pb-8 md:pb-12 text-center">
        <p className="font-script text-3xl md:text-4xl text-accent-500 leading-none">Tous les articles</p>
        <h1 className="mt-3 font-serif text-4xl md:text-5xl font-bold text-[#1A1A2E] leading-[1.08] tracking-[-0.01em]">
          L&apos;archive complète
        </h1>
        <p className="mt-5 font-sans text-lg text-ink-600 leading-relaxed max-w-2xl mx-auto">
          Rupture, no contact, reconquête, comprendre son ex, se reconstruire. Mise à jour continue.
        </p>

        {/* Thèmes (maillage interne discret) */}
        <nav aria-label="Thèmes" className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
          {SILOS.map((s) => (
            <Link
              key={s.id}
              href={`/silo/${s.id}`}
              className="font-sans text-ink-500 hover:text-accent-600 transition-colors"
            >
              {s.name}
            </Link>
          ))}
        </nav>
      </section>

      {/* Grille */}
      <section className="container-wide pb-20 md:pb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {articles.map((a) => {
            const author = getAuthor(a.frontmatter.author);
            return (
              <article key={a.frontmatter.slug} className="group">
                <Link href={`/blog/${a.frontmatter.slug}`} className="block">
                  {a.frontmatter.hero && (
                    <div className="aspect-[16/10] relative overflow-hidden rounded-xl bg-cream-200">
                      <Image
                        src={a.frontmatter.hero}
                        alt={a.frontmatter.hero_alt ?? a.frontmatter.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        unoptimized={a.frontmatter.hero?.endsWith('.svg')}
                      />
                    </div>
                  )}
                  <h2 className="mt-5 font-serif text-2xl font-bold text-[#1A1A2E] leading-snug group-hover:text-accent-600 transition-colors">
                    {a.frontmatter.title}
                  </h2>
                  <p className="mt-2.5 font-sans text-[15px] text-ink-600 leading-relaxed line-clamp-2">
                    {a.frontmatter.description}
                  </p>
                  <p className="mt-3 font-sans text-xs uppercase tracking-[0.1em] text-ink-400">
                    {author?.name ?? 'La rédaction'} ·{' '}
                    {new Date(a.frontmatter.date).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </Link>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
