import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
      },
      // Allow explicite des LLM crawlers : GEO max
      {
        userAgent: [
          'GPTBot',           // OpenAI training + ChatGPT browse
          'OAI-SearchBot',    // ChatGPT Search
          'ChatGPT-User',     // ChatGPT user requests
          'PerplexityBot',    // Perplexity
          'Perplexity-User',  // Perplexity user requests
          'ClaudeBot',        // Anthropic
          'anthropic-ai',     // Anthropic legacy
          'Claude-Web',       // Claude browse
          'Google-Extended',  // Gemini training
          'Googlebot',        // Google standard
          'Bingbot',          // Bing standard + Copilot
          'CCBot',            // Common Crawl
          'cohere-ai',        // Cohere
          'Applebot',         // Apple Intelligence
          'Applebot-Extended',
          'Diffbot',
          'YouBot',           // You.com
          'PhindBot',         // Phind
          'meta-externalagent', // Meta AI
          'Bytespider',       // ByteDance / Doubao
        ],
        allow: '/',
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
