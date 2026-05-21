/**
 * Personas auteurs — Le Protocole · Journal (marque blanche, fictifs mais cohérents).
 * Convention : pas de profils sociaux externes.
 * Page auteur sur le blog uniquement, avec bio détaillée.
 * Noms neutres, accompagnants en relations et reconstruction après rupture.
 */

export type Author = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  /** Domaines d'expertise (pour assignation auto des articles selon le silo) */
  expertise: string[];
  /** Initiales pour avatar généré côté client (pas de photo réelle) */
  initials: string;
  /** Image de profil — chemin local ou placeholder initiales */
  avatarUrl: string;
};

export const AUTHORS: Author[] = [
  {
    slug: 'camille-sorel',
    name: 'Camille Sorel',
    role: 'Accompagnatrice en relations et reconstruction après rupture',
    bio: "Camille a accompagné des centaines de personnes dans les mois qui suivent une séparation : ceux qui souffrent en silence, ceux qui envoient trop de messages, ceux qui ne comprennent pas pourquoi ça s'est terminé. Son approche repose sur la psychologie de l'attachement et sur des outils concrets, pas sur des promesses magiques. Elle écrit sur la traversée de la rupture et la compréhension de soi.",
    expertise: ['traverser-la-rupture', 'se-comprendre'],
    initials: 'CS',
    avatarUrl: '/images/authors/camille-sorel.jpg',
  },
  {
    slug: 'thomas-reval',
    name: 'Thomas Reval',
    role: 'Spécialiste no contact et psychologie après rupture',
    bio: "Thomas s'est spécialisé dans les dynamiques relationnelles après une rupture : pourquoi le silence radio fonctionne ou pas, ce que l'ex pense vraiment, comment reprendre contact sans tout gâcher. Il combine une approche directe avec une lecture fine des mécanismes psychologiques en jeu. Il écrit sur le no contact et la compréhension de l'ex.",
    expertise: ['no-contact', 'comprendre-son-ex'],
    initials: 'TR',
    avatarUrl: '/images/authors/thomas-reval.jpg',
  },
  {
    slug: 'lea-marchand',
    name: 'Léa Marchand',
    role: 'Accompagnatrice en reconquête et reconstruction de soi',
    bio: "Léa travaille avec des personnes qui veulent soit récupérer leur ex, soit tourner la page proprement, mais qui ne savent pas comment s'y prendre. Elle a vu les mêmes erreurs se répéter : trop insister, disparaître trop vite, revenir sans avoir changé. Son objectif : aider à comprendre ce qui s'est passé et à agir de façon cohérente. Elle écrit sur la reconquête amoureuse et les erreurs après rupture.",
    expertise: ['reconquete-amoureuse', 'erreurs-apres-rupture'],
    initials: 'LM',
    avatarUrl: '/images/authors/lea-marchand.jpg',
  },
];

export function getAuthor(slug: string): Author | undefined {
  return AUTHORS.find((a) => a.slug === slug);
}

/** Auto-assigne un auteur à un article selon le silo */
export function pickAuthorForSilo(siloId: string): Author {
  const matches = AUTHORS.filter((a) => a.expertise.includes(siloId));
  if (matches.length === 0) return AUTHORS[0];
  // Round-robin simple basé sur la date pour répartir l'écriture
  const idx = new Date().getDate() % matches.length;
  return matches[idx];
}
