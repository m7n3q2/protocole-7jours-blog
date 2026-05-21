/**
 * Personas auteurs — Le Protocole · Journal (marque blanche, fictifs mais coherents).
 * Convention : pas de profils sociaux externes.
 * Page auteur sur le blog uniquement, avec bio detaillee.
 * Noms neutres, accompagnants en relations et reconstruction apres rupture.
 */

export type Author = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  /** Domaines d'expertise (pour assignation auto des articles selon le silo) */
  expertise: string[];
  /** Initiales pour avatar genere cote client (pas de photo reelle) */
  initials: string;
  /** Image de profil — chemin local ou placeholder initiales */
  avatarUrl: string;
};

export const AUTHORS: Author[] = [
  {
    slug: 'camille-sorel',
    name: 'Camille Sorel',
    role: 'Accompagnatrice en relations et reconstruction apres rupture',
    bio: "Camille a accompagne des centaines de personnes dans les mois qui suivent une separation : ceux qui souffrent en silence, ceux qui envoient trop de messages, ceux qui ne comprennent pas pourquoi ca s est termine. Son approche repose sur la psychologie de l attachement et sur des outils concrets, pas sur des promesses magiques. Elle ecrit sur la traversee de la rupture et la comprehension de soi.",
    expertise: ['traverser-la-rupture', 'se-comprendre'],
    initials: 'CS',
    avatarUrl: '/images/authors/camille-sorel.jpg',
  },
  {
    slug: 'thomas-reval',
    name: 'Thomas Reval',
    role: 'Specialiste no contact et psychologie apres rupture',
    bio: "Thomas s est specialise dans les dynamiques relationnelles apres une rupture : pourquoi le silence radio fonctionne ou pas, ce que l ex pense vraiment, comment reprendre contact sans tout gacher. Il combine une approche directe avec une lecture fine des mecanismes psychologiques en jeu. Il ecrit sur le no contact et la comprehension de l ex.",
    expertise: ['no-contact', 'comprendre-son-ex'],
    initials: 'TR',
    avatarUrl: '/images/authors/thomas-reval.jpg',
  },
  {
    slug: 'lea-marchand',
    name: 'Lea Marchand',
    role: 'Accompagnatrice en reconquete et reconstruction de soi',
    bio: "Lea travaille avec des personnes qui veulent soit recuperer leur ex, soit tourner la page proprement, mais qui ne savent pas comment s y prendre. Elle a vu les memes erreurs se repeter : trop insister, disparaitre trop vite, revenir sans avoir change. Son objectif : aider a comprendre ce qui s est passe et a agir de facon coherente. Elle ecrit sur la reconquete amoureuse et les erreurs apres rupture.",
    expertise: ['reconquete-amoureuse', 'erreurs-apres-rupture'],
    initials: 'LM',
    avatarUrl: '/images/authors/lea-marchand.jpg',
  },
];

export function getAuthor(slug: string): Author | undefined {
  return AUTHORS.find((a) => a.slug === slug);
}

/** Auto-assigne un auteur a un article selon le silo */
export function pickAuthorForSilo(siloId: string): Author {
  const matches = AUTHORS.filter((a) => a.expertise.includes(siloId));
  if (matches.length === 0) return AUTHORS[0];
  // Round-robin simple base sur la date pour repartir l'ecriture
  const idx = new Date().getDate() % matches.length;
  return matches[idx];
}
