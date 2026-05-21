import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Notre approche',
  description: "Comment Le Protocole · Journal aborde les sujets de la rupture : sources, éthique, ton, et limites du contenu éditorial.",
  path: '/methodologie',
});

export default function MethodologyPage() {
  return (
    <div className="container-prose pt-20 md:pt-24 pb-16">
      <p className="label-silo">Notre approche</p>
      <h1 className="mt-4 font-serif text-5xl font-bold text-[#1A1A2E] leading-tight">
        Comment on travaille
      </h1>

      <div className="prose prose-lg mt-8">
        <p className="lead text-xl text-ink-700">
          Rupture, no contact, reconquête : des sujets qui touchent à l&apos;intime, parfois au YMYL (Your Money Your Life).
          Voici notre méthode pour rester utile sans prendre de risques avec la santé émotionnelle de nos lecteurs.
        </p>
      </div>

      <ol className="mt-12 space-y-10">
        {STEPS.map((step, i) => (
          <li key={i} className="rounded-2xl border border-ink-100 bg-white p-8">
            <div className="flex items-baseline gap-4">
              <span className="font-sans text-4xl font-bold text-accent-500">{i + 1}</span>
              <h2 className="font-serif text-2xl font-bold text-[#1A1A2E]">{step.title}</h2>
            </div>
            <p className="mt-4 text-ink-700 leading-relaxed">{step.desc}</p>
            {step.bullets && (
              <ul className="mt-4 ml-6 list-disc space-y-1.5 text-ink-700">
                {step.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            )}
          </li>
        ))}
      </ol>

      <div className="mt-16 text-center">
        <p className="text-sm text-ink-500 leading-relaxed">
          Programme complet :{' '}
          <a href="https://leprotocoledesseptjours.com" target="_blank" rel="noopener noreferrer" className="text-accent-700 underline underline-offset-2 hover:text-accent-800 transition">
            leprotocoledesseptjours.com
          </a>
        </p>
      </div>
    </div>
  );
}

const STEPS = [
  {
    title: 'Contenu ancré dans la psychologie de l\'attachement',
    desc: "Nos articles s'appuient sur les travaux de John Bowlby, Mary Ainsworth et leurs successeurs sur la théorie de l'attachement. On explique les comportements post-rupture (withdrawal, protest, resignation) avec ce cadre, pas avec des intuitions de comptoir.",
    bullets: [
      "Styles d'attachement (anxieux, évitant, sécure, désorganisé) expliqués clairement",
      "Mécanismes de défense post-rupture décodés sans jargon",
      "Liens vers les recherches de référence quand c'est pertinent",
      "Distinction systématique entre corrélation et causalité",
    ],
  },
  {
    title: 'Éthique de contenu : aider sans manipuler',
    desc: "La reconquête amoureuse est un sujet où les conseils manipulateurs pullulent. Notre ligne éditoriale est claire : on aide les lecteurs à comprendre ce qui se passe et à agir de façon cohérente, jamais à manipuler ou à contrôler l'autre.",
    bullets: [
      "Pas de 'techniques' de manipulation psychologique (negging, jealousy game, etc.)",
      "Distinction entre communication saine et jeux de pouvoir",
      "On dit quand récupérer son ex n'est pas une bonne idée",
      "Respect de l'autonomie des deux personnes dans la relation",
    ],
  },
  {
    title: 'Caveat santé mentale systématique',
    desc: "La rupture amoureuse peut déclencher des épisodes dépressifs, des crises d'angoisse, voire des pensées suicidaires. Ce contenu est éducatif : il ne remplace pas un suivi psychologique ou psychiatrique.",
    bullets: [
      "Caveats clairs sur les limites du contenu éditorial",
      "Renvoi vers des ressources professionnelles quand le sujet le justifie",
      "Pas de diagnostic, pas de prescription thérapeutique",
      "Signalement des situations d'urgence (crisis line, etc.)",
    ],
  },
  {
    title: 'Transparence sur le produit associé',
    desc: "Ce journal est associé au Protocole des 7 Jours, un programme payant. Cette relation est transparente : les liens vers le produit sont identifiés, le contenu éditorial reste indépendant.",
    bullets: [
      "Liens vers le produit identifiables et toujours marqués",
      "Pas de contenu déguisé en éditorial pour pousser à l'achat",
      "Les articles du journal restent utiles indépendamment du produit",
      "Pas de système de conversion agressif (pas de countdown timer, pas de fausse urgence)",
    ],
  },
];
