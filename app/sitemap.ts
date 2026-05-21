import type { MetadataRoute } from 'next';
import { getAllArticles } from '@/lib/articles';
import { SILOS } from '@/lib/silos';
import { AUTHORS } from '@/lib/authors';
import { SITE } from '@/lib/seo';

// Re-genere le sitemap toutes les heures (au lieu d'un cache statique fige au 1er build).
// Sans ca, les articles MDX ajoutes ne sont jamais listes meme si /blog les voit.
export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles().map((a) => ({
    url: `${SITE.url}/blog/${a.frontmatter.slug}`,
    lastModified: a.frontmatter.updated ?? a.frontmatter.date,
    changeFrequency: 'monthly' as const,
    priority: a.frontmatter.is_hub ? 0.9 : 0.7,
  }));

  const silos = SILOS.map((s) => ({
    url: `${SITE.url}/silo/${s.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const authors = AUTHORS.map((a) => ({
    url: `${SITE.url}/auteurs/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.4,
  }));

  const staticPages = [
    { url: SITE.url, priority: 1.0 },
    { url: `${SITE.url}/blog`, priority: 0.9 },
    { url: `${SITE.url}/contact`, priority: 0.9 },
    { url: `${SITE.url}/a-propos`, priority: 0.6 },
    { url: `${SITE.url}/methodologie`, priority: 0.6 },
    { url: `${SITE.url}/etudes-de-cas`, priority: 0.7 },
    { url: `${SITE.url}/mentions-legales`, priority: 0.2 },
    { url: `${SITE.url}/politique-confidentialite`, priority: 0.2 },
    { url: `${SITE.url}/cgu`, priority: 0.2 },
  ].map((p) => ({ ...p, lastModified: new Date(), changeFrequency: 'monthly' as const }));

  return [...staticPages, ...silos, ...authors, ...articles];
}
