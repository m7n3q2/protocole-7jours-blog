import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { AUTHORS, getAuthor } from '@/lib/authors';
import { getArticlesByAuthor } from '@/lib/articles';
import { buildMetadata } from '@/lib/seo';
import AuthorAvatar from '@/components/AuthorAvatar';

export async function generateStaticParams() {
  return AUTHORS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) return {};
  return buildMetadata({
    title: author.name,
    description: `${author.name}, ${author.role}. ${author.bio.slice(0, 160)}`,
    path: `/auteurs/${slug}`,
  });
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) return notFound();

  const articles = getArticlesByAuthor(slug);

  return (
    <div className="container-prose pt-20 md:pt-24 pb-16">
      <div className="flex items-center gap-6">
        <AuthorAvatar author={author} size="lg" />
        <div>
          <h1 className="font-sans text-4xl font-bold text-ink-950">{author.name}</h1>
          <p className="mt-1 text-lg text-accent-700 font-medium">{author.role}</p>
        </div>
      </div>

      <p className="mt-8 text-lg text-ink-700 leading-relaxed">{author.bio}</p>

      {articles.length > 0 && (
        <section className="mt-16 border-t border-ink-100 pt-12">
          <h2 className="font-sans text-2xl font-bold text-ink-950 mb-6">
            Articles de {author.name.split(' ')[0]}
          </h2>
          <div className="space-y-6">
            {articles.map((a) => (
              <Link
                key={a.frontmatter.slug}
                href={`/blog/${a.frontmatter.slug}`}
                className="group block rounded-lg border border-ink-100 bg-white p-5 hover:border-accent-500 transition"
              >
                <p className="label-silo">{a.frontmatter.silo}</p>
                <p className="mt-2 font-sans text-xl font-bold text-ink-950 group-hover:text-accent-600 leading-tight">
                  {a.frontmatter.title}
                </p>
                <p className="mt-2 text-sm text-ink-600 line-clamp-2">{a.frontmatter.description}</p>
                <p className="mt-2 article-meta">{a.readingTime.text}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
