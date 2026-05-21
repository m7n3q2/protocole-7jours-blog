import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { SILOS, siloFromSlug } from '@/lib/silos';
import { getArticlesBySilo } from '@/lib/articles';
import { getAuthor } from '@/lib/authors';
import { buildMetadata } from '@/lib/seo';
import SiloNav from '@/components/SiloNav';

/**
 * Le Protocole · Journal — app/silo/[slug]/page.tsx
 * Hub card avec gradient accent + circle decoratif, articles grid responsive.
 */

export async function generateStaticParams() {
  return SILOS.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const silo = siloFromSlug(slug);
  if (!silo) return {};
  return buildMetadata({
    title: silo.name,
    description: silo.description,
    path: `/silo/${slug}`,
  });
}

export default async function SiloPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const silo = siloFromSlug(slug);
  if (!silo) return notFound();

  const articles = getArticlesBySilo(silo.id);
  const hub = articles.find((a) => a.frontmatter.is_hub);
  const spokes = articles.filter((a) => !a.frontmatter.is_hub);
  const siloIndex = SILOS.findIndex((s) => s.id === silo.id);

  return (
    <div className="container-wide pt-20 md:pt-24 pb-16 md:pb-20">
      <SiloNav activeSlug={silo.id} variant="top" />

      <div className="max-w-3xl">
        <p className="label-silo">Sujet · {String(siloIndex + 1).padStart(2, '0')} / {String(SILOS.length).padStart(2, '0')}</p>
        <h1 className="mt-4 font-sans text-4xl md:text-5xl lg:text-6xl font-bold text-ink-950 leading-[1.02] tracking-[-0.025em]">
          {silo.name.split(' ').slice(0, -1).join(' ')}
          {silo.name.includes(' ') && <br />}
          <span className="italic font-normal text-accent-700">{silo.name.split(' ').slice(-1)[0]}.</span>
        </h1>
        <p className="mt-4 text-lg text-ink-700 leading-relaxed">{silo.description}</p>
      </div>

      {hub && (
        <section className="mt-12">
          <Link
            href={`/blog/${hub.frontmatter.slug}`}
            className="
              group block relative overflow-hidden rounded-2xl border border-accent-200 p-8
              bg-accent-50 bg-[radial-gradient(60%_50%_at_100%_0%,rgba(196,30,58,0.10),rgba(196,30,58,0)_60%)]
              hover:border-accent-500 hover:-translate-y-0.5 hover:shadow-elev transition
            "
          >
            <span aria-hidden="true" className="absolute -right-10 -top-10 w-56 h-56 rounded-full border border-accent-500/18" />
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-700 mb-2">Le guide complet</p>
            <h2 className="font-sans text-2xl md:text-3xl font-bold text-ink-950 leading-tight tracking-tight">
              {hub.frontmatter.title}
            </h2>
            <p className="mt-3 text-ink-700 leading-relaxed max-w-2xl">{hub.frontmatter.description}</p>
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.12em] text-accent-700 font-semibold inline-flex items-center gap-2">
              Lire le guide complet
              <span className="font-sans italic text-base leading-none transition-transform group-hover:translate-x-0.5">→</span>
            </p>
          </Link>
        </section>
      )}

      {spokes.length > 0 && (
        <section className="mt-16">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <h2 className="font-sans text-3xl font-bold text-ink-950 tracking-tight">Tous les articles {silo.name}</h2>
            <span className="font-mono text-xs uppercase tracking-[0.12em] text-ink-500">{spokes.length} articles</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {spokes.map((a) => {
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
                    <h3 className="mt-4 font-sans text-xl font-bold text-ink-950 group-hover:text-accent-700 leading-tight tracking-tight transition-colors">
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
        </section>
      )}

      {articles.length === 0 && (
        <div className="mt-16 rounded-xl border border-ink-100 bg-cream-100 p-12 text-center">
          <p className="font-sans text-2xl text-ink-950">Premiers articles a venir</p>
          <p className="mt-2 text-ink-600">La redaction prepare les articles de ce theme.</p>
        </div>
      )}

      <SiloNav activeSlug={silo.id} variant="bottom" />
    </div>
  );
}
