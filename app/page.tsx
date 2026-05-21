import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getRecentArticles } from '@/lib/articles';
import { getAuthor } from '@/lib/authors';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({ title: undefined });

/**
 * Le Protocole des 7 Jours — accueil du blog.
 * Présentation alignée sur le site de vente : crème, centré, titres Playfair,
 * aucune zone de conversion. Objectif = lecture et trafic.
 */
export default function HomePage() {
  const articles = getRecentArticles(12);

  return (
    <>
      {/* Intro */}
      <section className="container-wide pt-14 md:pt-20 pb-10 md:pb-14 text-center">
        <p className="font-script text-3xl md:text-4xl text-accent-500 leading-none">Le journal</p>
        <h1 className="mt-3 font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1A2E] leading-[1.08] tracking-[-0.01em] max-w-3xl mx-auto">
          Traverser la rupture, comprendre, avancer.
        </h1>
        <p className="mt-5 font-sans text-lg md:text-xl text-ink-600 leading-relaxed max-w-2xl mx-auto">
          Des articles concrets sur la rupture amoureuse, le no contact, la reconquête et la
          reconstruction de soi. Pour les moments où on ne sait plus quoi faire.
        </p>
      </section>

      {/* Articles */}
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
                    {author?.name ?? 'La rédaction'} · {a.readingTime.text}
                  </p>
                </Link>
              </article>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/blog"
            className="font-sans text-sm font-semibold text-accent-600 hover:text-accent-700 inline-flex items-center gap-2 transition-colors"
          >
            Tous les articles
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
