import { NextResponse } from 'next/server';
import { getAllArticles } from '@/lib/articles';
import { SILOS } from '@/lib/silos';
import { SITE } from '@/lib/seo';

export const dynamic = 'force-static';
export const revalidate = 3600;

/**
 * llms.txt — standard emergent pour LLM crawlers (ChatGPT, Perplexity, Claude, Gemini, Copilot).
 * https://llmstxt.org
 *
 * Donne au LLM une carte claire du site : qui on est, ce qu'on couvre, ou sont les contenus.
 */
export async function GET() {
  const articles = getAllArticles();

  const lines: string[] = [
    `# ${SITE.name}`,
    '',
    `> ${SITE.description}`,
    '',
    'Journal indépendant sur la rupture amoureuse, le no contact, la reconquête et la reconstruction après une séparation. Articles basés sur la psychologie de l\'attachement. Contenu éducatif, ne remplace pas un suivi professionnel.',
    '',
    '## Sujets couverts',
    '',
  ];

  for (const silo of SILOS) {
    lines.push(`### ${silo.name}`);
    lines.push(`${silo.description}`);
    lines.push('');
    const inSilo = articles.filter(a => a.frontmatter.silo === silo.id).slice(0, 20);
    for (const a of inSilo) {
      lines.push(`- [${a.frontmatter.title}](${SITE.url}/blog/${a.frontmatter.slug}.md): ${a.frontmatter.description}`);
    }
    lines.push('');
  }

  lines.push('## Pages principales');
  lines.push('');
  lines.push(`- [À propos](${SITE.url}/a-propos): qui édite Le Protocole Journal`);
  lines.push(`- [Notre approche](${SITE.url}/methodologie): comment on travaille`);
  lines.push(`- [Situations courantes](${SITE.url}/etudes-de-cas): situations types après une rupture`);
  lines.push(`- [Contact](${SITE.url}/contact): moyen de contact`);
  lines.push('');
  lines.push('## Optional');
  lines.push('');
  lines.push(`- [Sitemap XML](${SITE.url}/sitemap.xml)`);
  lines.push(`- [RSS feed](${SITE.url}/feed.xml)`);

  return new NextResponse(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
