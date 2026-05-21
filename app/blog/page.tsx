import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getRecentArticles } from '@/lib/articles';
import { SILOS } from '@/lib/silos';
import { getAuthor } from '@/lib/authors';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Tous les articles',
  description: "L'archive complete : rupture, no contact, reconquete, comprendre son ex, se reconstruire. 6 themes, mise a jour continue.",
  path: '/blog',
});

/**
 * Le Protocole · Journal — app/blog/page.tsx
 * Index articles : breadcrumb + chips silos + grid responsive + pagination.
 */

export default function BlogIndexPage() {
  const articles = getRecentArticles(12);
  const total = getRecentArticles(999).length;

  return (
    <>
      <div className="container-wide pt-20 md:pt-24 pb-6">
        <nav className="flex flex-wrap items-center gap-2 text-xs text-ink-500 mb-8" aria-label="Fil d'Ariane">
          <Link href="/" className="hover:text-ink-900 transition-colors">Accueil</Link>
          <span className="text-ink-300">›</span>
          <span className="text-ink-900 font-medium">Tous les articles</span>
        </nav>

        <p className="label-silo">Archive complète</p>
        <h1 className="mt-3 font-sans text-4xl md:text-5xl font-bold text-ink-950 leading-[1.05] tracking-[-0.025em]">
          Tous les articles<br />
          <span className="italic font-normal text-accent-700">par ordre de publication.</span>
        </h1>
        <p className="mt-4 text-lg text-ink-700 leading-relaxed max-w-2xl">
          {total} articles, 6 themes, mise a jour continue. Filtre par theme ou navigue dans l&apos;ordre chronologique.
        </p>

        <div className="mt-10 flex flex-wrap gap-2">
          <Link href="/blog" className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm bg-ink-950 text-cream-50 font-medium">
            <span className="font-mono text-[10px] text-accent-400">00</span>
            Tous
          </Link>
          {SILOS.map((s, i) => (
            <Link
              key={s.id}
              href={`/silo/${s.id}`}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm bg-cream-200 text-ink-700 hover:bg-white hover:border-ink-200 hover:text-ink-950 border border-transparent transition"
            >
              <span className="font-mono text-[10px] text-ink-400">{String(i + 1).padStart(2, '0')}</span>
              {s.name}
            </Link>
          ))}
        </div>
      </div>

      <section className="container-wide pt-12 md:pt-16 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((a) => {
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
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    )}
                  </div>
                  <p className="mt-4 label-silo">{a.frontmatter.silo}</p>
                  <h2 className="mt-2.5 font-serif text-xl font-bold text-ink-950 group-hover:text-accent-700 leading-tight tracking-tight transition-colors">
                    {a.frontmatter.title}
                  </h2>
                  <p className="mt-2 text-sm text-ink-600 leading-relaxed line-clamp-2">
                    {a.frontmatter.description}
                  </p>
                  <p className="mt-3 article-meta">
                    {author?.name ?? 'La rédaction'} · {new Date(a.frontmatter.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </Link>
              </article>
            );
          })}
        </div>

        {total > 12 && (
          <div className="mt-12 text-center">
            <Link href="/blog/page/2" className="btn-secondary inline-flex group">
              Articles plus anciens
              <span className="font-serif italic text-lg leading-none transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
        )}
      </section>

      <section className="next-step-cta relative overflow-hidden text-white mt-16 md:mt-20">
        <span aria-hidden="true" className="pointer-events-none absolute -right-40 -bottom-32 w-[480px] h-[480px] rounded-full bg-[radial-gradient(circle,rgba(196,30,58,0.12),rgba(196,30,58,0)_60%)]" />
        <div className="container-wide relative py-24 md:py-32 text-center max-w-3xl mx-auto">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-400 mb-5">Pour aller plus loin</p>
          <h2 className="font-sans text-3xl md:text-4xl font-bold leading-tight">
            Besoin d&apos;un accompagnement structure ?
          </h2>
          <p className="mt-5 text-ink-300 max-w-xl mx-auto leading-relaxed">
            Le Protocole des 7 Jours est un programme complet pour traverser la premiere semaine apres une rupture.
          </p>
          <div className="mt-10">
            <a href="https://leprotocoledesseptjours.com" target="_blank" rel="noopener noreferrer" className="btn-primary group inline-flex">
              Decouvrir le protocole
              <span className="font-sans italic text-lg leading-none transition-transform group-hover:translate-x-0.5">→</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
