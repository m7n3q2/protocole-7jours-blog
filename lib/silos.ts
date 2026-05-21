/**
 * Architecture des silos thématiques — Le Protocole · Journal.
 * Source de vérité pour le keyword research, l'internal linking, et le routing /silo/[slug].
 * 6 silos : rupture, ex, no contact, reconquête, erreurs, soi-même.
 */

export type SiloId =
  | 'traverser-la-rupture'
  | 'comprendre-son-ex'
  | 'no-contact'
  | 'reconquete-amoureuse'
  | 'erreurs-apres-rupture'
  | 'se-comprendre';

export type Silo = {
  id: SiloId;
  name: string;
  description: string;
  /** Pourcentage cible de la production éditoriale */
  share: number;
  /** Mots-clés "seed" pour le keyword research */
  seedKeywords: string[];
  /** Hub article slug (article pillar) */
  hubSlug?: string;
};

export const SILOS: Silo[] = [
  {
    id: 'traverser-la-rupture',
    name: 'Traverser la rupture',
    description:
      'Comprendre ce que tu vis, tenir les premiers jours, avancer sans te perdre. Guide concret pour les 30 premiers jours après une rupture.',
    share: 0.20,
    seedKeywords: [
      'rupture amoureuse',
      'comment surmonter une rupture',
      'se remettre d\'une rupture',
      'comment oublier son ex',
      'arreter de penser a son ex',
      'deuil amoureux',
      'manque après rupture',
      'j\'ai été quitté que faire',
      'dépression après rupture',
    ],
    hubSlug: 'comment-surmonter-une-rupture-amoureuse-guide-30-jours',
  },
  {
    id: 'comprendre-son-ex',
    name: 'Comprendre son ex',
    description:
      'Pourquoi ton ex réagit comme ça, ce que ses silences signifient, comment lire ses signaux après la rupture. Psychologie accessible et honnête.',
    share: 0.20,
    seedKeywords: [
      'pourquoi mon ex ne répond plus',
      'mon ex m ignore',
      'signes que mon ex pense encore à moi',
      'signes que mon ex veut revenir',
      'à quoi pense mon ex pendant le silence radio',
      'psychologie masculine rupture',
      'psychologie féminine rupture',
      'mon ex a tourné la page vite',
      'mon ex me recontacte puis m\'ignore',
    ],
    hubSlug: 'psychologie-apres-rupture-pourquoi-ton-ex-reagit-comme-ca',
  },
  {
    id: 'no-contact',
    name: 'No contact',
    description:
      'À quoi sert le no contact, comment le tenir sans craquer, et ce qui se passe pendant cette période de silence radio.',
    share: 0.17,
    seedKeywords: [
      'no contact ex',
      'silence radio ex',
      'règle no contact',
      'combien de temps no contact',
      'no contact 30 jours',
      'mon ex me recontacte pendant le no contact',
      'fin du no contact',
      'premier message après no contact',
      'no contact avec enfants',
    ],
    hubSlug: 'regle-no-contact-a-quoi-ca-sert-comment-la-tenir',
  },
  {
    id: 'reconquete-amoureuse',
    name: 'Reconquete amoureuse',
    description:
      'Comment récupérer son ex de façon saine : les étapes qui fonctionnent, les erreurs à éviter, et comment reprendre contact au bon moment.',
    share: 0.17,
    seedKeywords: [
      'comment récupérer son ex',
      'reconquérir son ex',
      'faire revenir son ex',
      'récupérer son ex homme',
      'récupérer son ex femme',
      'message pour récupérer son ex',
      'reprendre contact avec son ex',
      'récupérer son ex après une dispute',
    ],
    hubSlug: 'comment-recuperer-son-ex-4-etapes-3-erreurs-fatales',
  },
  {
    id: 'erreurs-apres-rupture',
    name: 'Éviter les erreurs',
    description:
      'Les comportements qui éloignent définitivement ton ex et comment les stopper. Le silo le plus proche du produit.',
    share: 0.13,
    seedKeywords: [
      'erreurs après rupture',
      'que faire après une rupture',
      'que ne pas faire après une rupture',
      'supplier son ex',
      'j\'ai envoyé trop de messages',
      'bloquer ou pas son ex',
      'rester amis avec son ex',
      'réseaux sociaux après rupture',
    ],
    hubSlug: 'les-7-erreurs-apres-rupture-comment-les-stopper',
  },
  {
    id: 'se-comprendre',
    name: 'Se comprendre soi-même',
    description:
      'Styles d\'attachement, dépendance affective, estime de soi : comprendre pourquoi tu réagis comme ça et comment changer en profondeur.',
    share: 0.13,
    seedKeywords: [
      'attachement anxieux rupture',
      'attachement évitant rupture',
      'dépendance affective rupture',
      'estime de soi après rupture',
      'reprendre confiance en soi',
      'lâcher prise sur son ex',
      'relation toxique',
      'couper les liens affectifs',
    ],
    hubSlug: 'styles-attachement-rupture-pourquoi-tu-reagis-comme-ca',
  },
];

export function getSilo(id: SiloId): Silo | undefined {
  return SILOS.find((s) => s.id === id);
}

export function siloFromSlug(slug: string): Silo | undefined {
  return SILOS.find((s) => s.id === slug);
}
