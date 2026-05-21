/**
 * Architecture des silos thematiques — Le Protocole · Journal.
 * Source de verite pour le keyword research, l'internal linking, et le routing /silo/[slug].
 * 6 silos : rupture, ex, no contact, reconquete, erreurs, soi-meme.
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
  /** Pourcentage cible de la production editoriale */
  share: number;
  /** Mots-cles "seed" pour le keyword research */
  seedKeywords: string[];
  /** Hub article slug (article pillar) */
  hubSlug?: string;
};

export const SILOS: Silo[] = [
  {
    id: 'traverser-la-rupture',
    name: 'Traverser la rupture',
    description:
      'Comprendre ce que tu vis, tenir les premiers jours, avancer sans te perdre. Guide concret pour les 30 premiers jours apres une rupture.',
    share: 0.20,
    seedKeywords: [
      'rupture amoureuse',
      'comment surmonter une rupture',
      'se remettre d une rupture',
      'comment oublier son ex',
      'arreter de penser a son ex',
      'deuil amoureux',
      'manque apres rupture',
      'j ai ete quitte que faire',
      'depression apres rupture',
    ],
    hubSlug: 'comment-surmonter-une-rupture-amoureuse-guide-30-jours',
  },
  {
    id: 'comprendre-son-ex',
    name: 'Comprendre son ex',
    description:
      'Pourquoi ton ex reagit comme ca, ce que ses silences signifient, comment lire ses signaux apres la rupture. Psychologie accessible et honnete.',
    share: 0.20,
    seedKeywords: [
      'pourquoi mon ex ne repond plus',
      'mon ex m ignore',
      'signes que mon ex pense encore a moi',
      'signes que mon ex veut revenir',
      'a quoi pense mon ex pendant le silence radio',
      'psychologie masculine rupture',
      'psychologie feminine rupture',
      'mon ex a tourne la page vite',
      'mon ex me recontacte puis m ignore',
    ],
    hubSlug: 'psychologie-apres-rupture-pourquoi-ton-ex-reagit-comme-ca',
  },
  {
    id: 'no-contact',
    name: 'No contact',
    description:
      'A quoi sert le no contact, comment le tenir sans craquer, et ce qui se passe pendant cette periode de silence radio.',
    share: 0.17,
    seedKeywords: [
      'no contact ex',
      'silence radio ex',
      'regle no contact',
      'combien de temps no contact',
      'no contact 30 jours',
      'mon ex me recontacte pendant le no contact',
      'fin du no contact',
      'premier message apres no contact',
      'no contact avec enfants',
    ],
    hubSlug: 'regle-no-contact-a-quoi-ca-sert-comment-la-tenir',
  },
  {
    id: 'reconquete-amoureuse',
    name: 'Reconquete amoureuse',
    description:
      'Comment recuperer son ex de facon saine : les etapes qui fonctionnent, les erreurs a eviter, et comment reprendre contact au bon moment.',
    share: 0.17,
    seedKeywords: [
      'comment recuperer son ex',
      'reconquerir son ex',
      'faire revenir son ex',
      'recuperer son ex homme',
      'recuperer son ex femme',
      'message pour recuperer son ex',
      'reprendre contact avec son ex',
      'recuperer son ex apres une dispute',
    ],
    hubSlug: 'comment-recuperer-son-ex-4-etapes-3-erreurs-fatales',
  },
  {
    id: 'erreurs-apres-rupture',
    name: 'Eviter les erreurs',
    description:
      'Les comportements qui eloignent definitivement ton ex et comment les stopper. Le silo le plus proche du produit.',
    share: 0.13,
    seedKeywords: [
      'erreurs apres rupture',
      'que faire apres une rupture',
      'que ne pas faire apres une rupture',
      'supplier son ex',
      'j ai envoye trop de messages',
      'bloquer ou pas son ex',
      'rester amis avec son ex',
      'reseaux sociaux apres rupture',
    ],
    hubSlug: 'les-7-erreurs-apres-rupture-comment-les-stopper',
  },
  {
    id: 'se-comprendre',
    name: 'Se comprendre soi-meme',
    description:
      'Styles d attachement, dependance affective, estime de soi : comprendre pourquoi tu reagis comme ca et comment changer en profondeur.',
    share: 0.13,
    seedKeywords: [
      'attachement anxieux rupture',
      'attachement evitant rupture',
      'dependance affective rupture',
      'estime de soi apres rupture',
      'reprendre confiance en soi',
      'lacher prise sur son ex',
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
