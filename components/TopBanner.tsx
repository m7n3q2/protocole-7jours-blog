import Link from 'next/link';
import { getRecentArticles } from '@/lib/articles';

/**
 * Le Protocole · Journal — TopBanner
 * Bandeau themage rupture : message d'accroche + dernier article.
 */

export default function TopBanner() {
  const articles = getRecentArticles(1);
  const last = articles[0];
  const total = getRecentArticles(999).length;

  return (
    <div className="bg-ink-950 text-cream-50 text-xs">
      <div className="container-wide flex h-9 items-center justify-between gap-4">
        <p className="hidden sm:flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-400 animate-pulse-soft" aria-hidden="true" />
          <span className="font-medium">Rupture recente ? Les premiers jours sont decisifs.</span>
          <span className="text-cream-300">·</span>
          <span className="text-cream-300">{total} articles publiés</span>
        </p>
        <p className="sm:hidden flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-400 animate-pulse-soft" aria-hidden="true" />
          <span>{total} articles · 1 par jour</span>
        </p>
        {last && (
          <Link
            href={`/blog/${last.frontmatter.slug}`}
            className="hidden md:inline-flex items-center gap-2 text-cream-200 hover:text-cream-50 transition truncate max-w-md group"
          >
            <span className="text-cream-400">Dernier :</span>
            <span className="truncate">{last.frontmatter.title}</span>
            <span className="text-accent-400 transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        )}
      </div>
    </div>
  );
}
