/**
 * SEO helpers : metadata, schema.org, OG.
 * Tout passe par ici pour rester cohérent.
 */

import type { Metadata } from 'next';

export const SITE = {
  name: 'Le Protocole · Journal',
  tagline: 'Journal de la reconstruction après rupture.',
  description:
    "Traverser une rupture, comprendre son ex, no contact, reconquête : des articles concrets pour les moments difficiles. Contenu éducatif, ne remplace pas un accompagnement professionnel.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://blog.leprotocoledesseptjours.com',
  defaultOgImage: '/og-default.jpg',
  locale: 'fr_FR',
};

type BuildMetaInput = {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
  noIndex?: boolean;
};

export function buildMetadata(input: BuildMetaInput = {}): Metadata {
  const title = input.title
    ? `${input.title} · ${SITE.name}`
    : `Le Protocole · Journal : rupture, no contact, reconquête`;
  const description = input.description ?? SITE.description;
  const url = `${SITE.url}${input.path ?? ''}`;
  const ogImage = input.ogImage ?? `${SITE.url}${SITE.defaultOgImage}`;

  return {
    title,
    description,
    metadataBase: new URL(SITE.url),
    alternates: { canonical: url },
    robots: input.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
    verification: { other: { 'msvalidate.01': '28CA4DDB43E9BDF654795840C8353440' } },
    openGraph: {
      type: input.type ?? 'website',
      locale: SITE.locale,
      url,
      siteName: SITE.name,
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(input.type === 'article' && {
        publishedTime: input.publishedTime,
        modifiedTime: input.modifiedTime,
        authors: input.authors,
        tags: input.tags,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

/** Schema.org Organization, à injecter dans le layout root */
export const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/logo.png`,
  description: SITE.description,
  sameAs: [], // à remplir au fur et à mesure (LinkedIn page, Twitter, etc.)
};

/** Schema.org Article (à injecter dans chaque article) */
export function articleSchema(opts: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  authorUrl?: string;
  keywords?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: { '@type': 'WebPage', '@id': opts.url },
    headline: opts.title,
    description: opts.description,
    image: [opts.image],
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    author: { '@type': 'Person', name: opts.authorName, ...(opts.authorUrl && { url: opts.authorUrl }) },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      logo: { '@type': 'ImageObject', url: `${SITE.url}/logo.png` },
    },
    ...(opts.keywords && { keywords: opts.keywords.join(', ') }),
  };
}

/** Schema.org FAQPage (rich snippets Google) */
export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.question,
      acceptedAnswer: { '@type': 'Answer', text: it.answer },
    })),
  };
}

export function jsonLd(data: object) {
  return { __html: JSON.stringify(data) };
}
