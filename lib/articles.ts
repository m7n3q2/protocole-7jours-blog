/**
 * Lecture et parsing des articles MDX dans content/articles/.
 * Tout est local (pas de CMS) → simple, rapide, build statique.
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import type { SiloId } from '@/lib/silos';

const ARTICLES_DIR = path.join(process.cwd(), 'content', 'articles');

export type ArticleFrontmatter = {
  title: string;
  description: string;
  slug: string;
  date: string; // ISO
  updated?: string;
  silo: SiloId;
  author: string; // author slug
  keywords?: string[];
  hero?: string; // path image (default /images/{slug}.jpg)
  hero_alt?: string;
  /** Article hub d'un silo ? */
  is_hub?: boolean;
  /** Articles spokes liés à ce hub (pour navigation) */
  related?: string[];
  /** FAQ structurée pour Schema.org */
  faq?: { question: string; answer: string }[];
  /** Score qualité interne (review pipeline) */
  quality_score?: number;
};

export type Article = {
  frontmatter: ArticleFrontmatter;
  content: string;
  readingTime: { text: string; minutes: number };
};

export function getArticleSlugs(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}

export function getArticle(slug: string): Article | null {
  const filePath = path.join(ARTICLES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const frontmatter = { ...data, slug } as ArticleFrontmatter;
  // SVG hero auto si pre-genere : prend le pas sur frontmatter.hero (jpg)
  try {
    const heroSvg = path.join(process.cwd(), 'public', 'illustrations', `${slug}-hero.svg`);
    if (fs.existsSync(heroSvg)) {
      frontmatter.hero = `/illustrations/${slug}-hero.svg`;
    }
  } catch { /* fs unavailable, garder hero original */ }
  return {
    frontmatter,
    content: injectIllustrations(content, frontmatter),
    readingTime: readingTime(content),
  };
}

/**
 * Injecte jusqu'à 2 illustrations thématiques dans le corps de l'article (après H2 #3 et #5).
 * Source : images pré-générées par `lib/pregenerate_article_illustrations.py` et commitées
 * dans `/public/illustrations/<slug>-<n>.jpg`. Servies depuis Vercel CDN (instantané, 0 dépendance externe).
 * Si l'image n'existe pas (article récent pas encore pré-généré), on skip silencieusement
 * cette position — l'article reste lisible sans le placeholder broken.
 */
function injectIllustrations(content: string, fm: ArticleFrontmatter): string {
  const lines = content.split('\n');
  const h2Indexes: number[] = [];
  lines.forEach((l, i) => { if (/^##\s+/.test(l)) h2Indexes.push(i); });
  if (h2Indexes.length < 3) return content;

  // Check si les images pré-générées existent (au build-time, fs sync OK car build serveur Node)
  // Note: en runtime serverless on a pas d'fs accessible, on assume que oui (le check existsSync est build-time only)
  const fs = require('fs');
  const path = require('path');
  const publicDir = path.join(process.cwd(), 'public', 'illustrations');

  function illustrationFor(idx: number, h2Title: string): string | null {
    const cleanTitle = h2Title.replace(/^#+\s*/, '').replace(/[?:!]+/g, '').slice(0, 80);
    const fileName = `${fm.slug}-${idx + 1}.svg`;
    const filePath = path.join(publicDir, fileName);
    try {
      if (!fs.existsSync(filePath)) return null; // skip si pas pré-générée
    } catch { /* fs unavailable, assume ok */ }
    const url = `/illustrations/${fileName}`;
    const alt = `Illustration : ${cleanTitle}`;
    return `\n\n![${alt}](${url})\n`;
  }

  const positions = [Math.min(2, h2Indexes.length - 1), Math.min(4, h2Indexes.length - 1)];
  const inserts: { at: number; md: string }[] = [];
  positions.forEach((posIdx, i) => {
    const h2Line = h2Indexes[posIdx];
    if (h2Line === undefined) return;
    const h2Title = lines[h2Line];
    const md = illustrationFor(i, h2Title);
    if (!md) return; // skip si image pré-générée absente
    let insertAt = h2Line + 1;
    while (insertAt < lines.length && lines[insertAt].trim() !== '') insertAt++;
    inserts.push({ at: insertAt, md });
  });
  inserts.sort((a, b) => b.at - a.at);
  for (const ins of inserts) {
    lines.splice(ins.at, 0, ins.md);
  }
  return lines.join('\n');
}

export function getAllArticles(): Article[] {
  return getArticleSlugs()
    .map((slug) => getArticle(slug))
    .filter((a): a is Article => a !== null)
    .sort((a, b) => (a.frontmatter.date > b.frontmatter.date ? -1 : 1));
}

export function getArticlesBySilo(silo: SiloId): Article[] {
  return getAllArticles().filter((a) => a.frontmatter.silo === silo);
}

export function getArticlesByAuthor(authorSlug: string): Article[] {
  return getAllArticles().filter((a) => a.frontmatter.author === authorSlug);
}

export function getRecentArticles(n = 6): Article[] {
  return getAllArticles().slice(0, n);
}

export function getRelatedArticles(article: Article, n = 4): Article[] {
  const all = getAllArticles().filter((a) => a.frontmatter.slug !== article.frontmatter.slug);

  // Priorité 1 : articles du même silo
  const sameSilo = all.filter((a) => a.frontmatter.silo === article.frontmatter.silo);

  // Priorité 2 : articles explicitement liés via frontmatter.related
  const explicitRelated = (article.frontmatter.related ?? [])
    .map((slug) => all.find((a) => a.frontmatter.slug === slug))
    .filter((a): a is Article => a !== undefined);

  const merged = Array.from(new Set([...explicitRelated, ...sameSilo].map((a) => a.frontmatter.slug)))
    .map((slug) => all.find((a) => a.frontmatter.slug === slug))
    .filter((a): a is Article => a !== undefined);

  return merged.slice(0, n);
}
