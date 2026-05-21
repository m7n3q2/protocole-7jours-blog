import { NextResponse } from 'next/server';
import { getAllArticles } from '@/lib/articles';
import { SITE } from '@/lib/seo';
import { getAuthor } from '@/lib/authors';

export const dynamic = 'force-static';
export const revalidate = 3600;

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const articles = getAllArticles().slice(0, 50);

  const items = articles.map((a) => {
    const author = getAuthor(a.frontmatter.author);
    return `
    <item>
      <title>${escapeXml(a.frontmatter.title)}</title>
      <link>${SITE.url}/blog/${a.frontmatter.slug}</link>
      <guid>${SITE.url}/blog/${a.frontmatter.slug}</guid>
      <description>${escapeXml(a.frontmatter.description)}</description>
      <pubDate>${new Date(a.frontmatter.date).toUTCString()}</pubDate>
      ${author ? `<dc:creator>${escapeXml(author.name)}</dc:creator>` : ''}
      <category>${escapeXml(a.frontmatter.silo)}</category>
    </item>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${escapeXml(SITE.name)}</title>
  <link>${SITE.url}</link>
  <description>${escapeXml(SITE.description)}</description>
  <language>fr-FR</language>
  <atom:link href="${SITE.url}/feed.xml" rel="self" type="application/rss+xml"/>
  ${items.join('')}
</channel>
</rss>`;

  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
