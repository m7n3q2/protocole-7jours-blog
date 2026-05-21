import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import Link from 'next/link';

/**
 * Composants MDX customisés pour les articles.
 * Override les éléments standards pour un rendu blog-magazine.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children, ...props }) => (
      <h2 className="mdx-h2" {...props}>
        <span className="mdx-h2-bar" aria-hidden="true" />
        <span className="mdx-h2-text">{children}</span>
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 className="mdx-h3" {...props}>
        {children}
      </h3>
    ),
    p: ({ children, ...props }) => (
      <p className="mdx-p" {...props}>
        {children}
      </p>
    ),
    a: ({ href = '', children, ...props }) => {
      const isExternal = href.startsWith('http');
      if (isExternal) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer" className="mdx-a" {...props}>
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className="mdx-a">
          {children}
        </Link>
      );
    },
    ul: ({ children, ...props }) => (
      <ul className="mdx-ul" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="mdx-ol" {...props}>
        {children}
      </ol>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote className="mdx-blockquote" {...props}>
        {children}
      </blockquote>
    ),
    img: ({ src = '', alt = '' }) => (
      <span className="mdx-img-wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="mdx-img"
        />
        {alt && !/^Illustration\s*:/i.test(alt) && <span className="mdx-img-caption">{alt}</span>}
      </span>
    ),
    table: ({ children, ...props }) => (
      <div className="mdx-table-wrap">
        <table className="mdx-table" {...props}>{children}</table>
      </div>
    ),
    th: ({ children, ...props }) => (
      <th className="mdx-th" {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td className="mdx-td" {...props}>
        {children}
      </td>
    ),
    code: ({ children, ...props }) => (
      <code className="mdx-code" {...props}>
        {children}
      </code>
    ),
    hr: () => <hr className="mdx-hr" />,
    ...components,
  };
}
