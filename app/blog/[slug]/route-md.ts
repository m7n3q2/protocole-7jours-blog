// NOTE : ce fichier est un helper qui sera intégré dans page.tsx via une route /[slug].md
// Servir une version Markdown brute de chaque article pour les LLM crawlers
// (qui préfèrent lire du markdown clean plutôt que du HTML rendu).
// Pattern recommandé par llmstxt.org : /article-slug.md à côté de /article-slug.

// L'implémentation réelle est dans app/blog/[slug]/_md/route.ts pour éviter
// les conflits de routing Next.js.
export {};
