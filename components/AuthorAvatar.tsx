import type { Author } from '@/lib/authors';

/**
 * Le Protocole · Journal — AuthorAvatar (refonte 2026)
 * Faceless-friendly : monogramme sans italic sur fond accent.
 * Le hash slug détermine la palette de manière déterministe.
 */

const PALETTE = [
  { bg: 'bg-accent-100', text: 'text-accent-700', ring: 'ring-accent-200' },
  { bg: 'bg-ink-100', text: 'text-ink-700', ring: 'ring-ink-200' },
  { bg: 'bg-cream-200', text: 'text-ink-800', ring: 'ring-cream-300' },
];

function hashSlug(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

type Size = 'sm' | 'md' | 'lg';

const SIZE_CLASSES: Record<Size, { box: string; text: string }> = {
  sm: { box: 'w-8 h-8', text: 'text-[11px]' },
  md: { box: 'w-10 h-10', text: 'text-sm' },
  lg: { box: 'w-24 h-24', text: 'text-2xl' },
};

export default function AuthorAvatar({
  author,
  size = 'md',
}: {
  author: Pick<Author, 'name' | 'slug'>;
  size?: Size;
}) {
  const palette = PALETTE[hashSlug(author.slug) % PALETTE.length];
  const { box, text } = SIZE_CLASSES[size];
  return (
    <div
      aria-hidden="true"
      className={`${box} ${palette.bg} ${palette.text} flex-shrink-0 rounded-full flex items-center justify-center font-sans italic font-semibold ${text} ring-1 ring-inset ${palette.ring}`}
    >
      {initials(author.name)}
    </div>
  );
}
