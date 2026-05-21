import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

import { getArticle, getArticleSlugs, getRelatedArticles } from '@/lib/articles';
import { getAuthor } from '@/lib/authors';
import AuthorAvatar from '@/components/AuthorAvatar';
import { getSilo } from '@/lib/silos';
import { useMDXComponents } from '@/mdx-components';
import { buildMetadata, articleSchema, faqSchema, jsonLd, SITE } from '@/lib/seo';

/**
 * Le Protocole · Journal — app/blog/[slug]/page.tsx
 * Article : hero, lede, TL;DR callout via MDX,
 * FAQ accordeon avec ::after rotate, CTA, related cards.
 * Logique SEO INCHANGEE : generateMetadata, generateStaticParams, JSON-LD Article + FAQ.
 */

export async function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  const author = getAuthor(article.frontmatter.author);
  return buildMetadata({
    title: article.frontmatter.title,
    description: article.frontmatter.description,
    path: `/blog/${slug}`,
    type: 'article',
    publishedTime: article.frontmatter.date,
    modifiedTime: article.frontmatter.updated,
    authors: author ? [author.name] : undefined,
    tags: article.frontmatter.keywords,
    ogImage: article.frontmatter.hero ? `${SITE.url}${article.frontmatter.hero}` : undefined,
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return notFound();

  const author = getAuthor(article.frontmatter.author);
  const silo = getSilo(article.frontmatter.silo);
  const related = getRelatedArticles(article, 4);
  const components = useMDXComponents({});

  const articleLd = articleSchema({
    title: article.frontmatter.title,
    description: article.frontmatter.description,
    url: `${SITE.url}/blog/${slug}`,
    image: article.frontmatter.hero ? `${SITE.url}${article.frontmatter.hero}` : `${SITE.url}/og-default.jpg`,
    datePublished: article.frontmatter.date,
    dateModified: article.frontmatter.updated,
    authorName: author?.name ?? 'La rédaction',
    authorUrl: author ? `${SITE.url}/auteurs/${author.slug}` : undefined,
    keywords: article.frontmatter.keywords,
  });
  const faqLd = article.frontmatter.faq?.length ? faqSchema(article.frontmatter.faq) : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(articleLd)} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqLd)} />}

      <article className="container-prose pt-20 md:pt-24 pb-16 md:pb-20">
        <header>
          <p className="label-silo">{silo?.name ?? article.frontmatter.silo}</p>
          <h1 className="mt-4 font-serif text-4xl md:text-5xl font-bold text-[#1A1A2E] leading-[1.12] tracking-[-0.01em] max-w-[24ch]">
            {article.frontmatter.title}
          </h1>
          <p className="mt-5 font-sans text-lg md:text-xl text-ink-600 leading-relaxed max-w-[46ch]">
            {article.frontmatter.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink-500">
            {author && (
              <Link href={`/auteurs/${author.slug}`} className="flex items-center gap-3 text-ink-700 hover:text-ink-950 transition-colors">
                <AuthorAvatar author={author} size="md" />
                <span className="font-medium">{author.name}</span>
              </Link>
            )}
            <span aria-hidden="true">·</span>
            <time dateTime={article.frontmatter.date}>
              {new Date(article.frontmatter.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </time>
            <span aria-hidden="true">·</span>
            <span>{article.readingTime.text}</span>
          </div>
        </header>

        {article.frontmatter.hero && (
          <div className="mt-10 aspect-video relative overflow-hidden rounded-xl bg-ink-100">
            <Image
              src={article.frontmatter.hero}
              alt={article.frontmatter.hero_alt ?? article.frontmatter.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 800px"
              unoptimized={article.frontmatter.hero?.endsWith('.svg')}
            />
          </div>
        )}

        <div className="mt-12 prose prose-lg max-w-none">
          <MDXRemote
            source={article.content}
            components={components}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
              },
            }}
          />
        </div>

        {article.frontmatter.faq && article.frontmatter.faq.length > 0 && (
          <section className="mt-16 border-t border-ink-100 pt-12">
            <h2 className="font-serif text-3xl font-bold text-[#1A1A2E] mb-6">Questions fréquentes</h2>
            <div className="space-y-2.5">
              {article.frontmatter.faq.map((q, i) => (
                <details key={i} className="group rounded-lg border border-ink-100 hover:border-ink-200 bg-white p-5 transition-colors">
                  <summary className="cursor-pointer font-sans text-lg font-semibold text-ink-950 flex items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
                    <span>{q.question}</span>
                    <span className="font-mono text-xl text-accent-600 flex-shrink-0 transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-ink-700 leading-relaxed">{q.answer}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        <p className="mt-16 border-t border-ink-100 pt-8 font-sans text-[15px] text-ink-500 leading-relaxed">
          Pour aller plus loin :{' '}
          <a
            href="https://leprotocoledesseptjours.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-600 hover:text-accent-700 underline underline-offset-2 font-medium"
          >
            Le Protocole des 7 Jours
          </a>
          .
        </p>

        {related.length > 0 && (
          <section className="mt-20 border-t border-ink-100 pt-12">
            <h2 className="font-serif text-2xl font-bold text-[#1A1A2E] mb-6">À lire ensuite</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {related.map((r) => (
                <Link
                  key={r.frontmatter.slug}
                  href={`/blog/${r.frontmatter.slug}`}
                  className="group rounded-lg border border-ink-100 bg-white p-5 hover:border-accent-300 hover:-translate-y-0.5 transition"
                >
                  <p className="label-silo">{r.frontmatter.silo}</p>
                  <p className="mt-2 font-serif text-lg font-bold text-[#1A1A2E] group-hover:text-accent-600 leading-snug transition-colors">
                    {r.frontmatter.title}
                  </p>
                  <p className="mt-2 text-sm text-ink-600 line-clamp-2 leading-relaxed">{r.frontmatter.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
