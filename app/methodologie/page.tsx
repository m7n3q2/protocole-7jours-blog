import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Notre approche',
  description: "Comment Le Protocole · Journal aborde les sujets de la rupture : sources, ethique, ton, et limites du contenu editorial.",
  path: '/methodologie',
});

export default function MethodologyPage() {
  return (
    <div className="container-prose pt-20 md:pt-24 pb-16">
      <p className="label-silo">Notre approche</p>
      <h1 className="mt-4 font-sans text-5xl font-bold text-ink-950 leading-tight">
        Comment on travaille
      </h1>

      <div className="prose prose-lg mt-8">
        <p className="lead text-xl text-ink-700">
          Rupture, no contact, reconquete : des sujets qui touchent a l&apos;intime, parfois au YMYL (Your Money Your Life).
          Voici notre methode pour rester utile sans prendre de risques avec la sante emotionnelle de nos lecteurs.
        </p>
      </div>

      <ol className="mt-12 space-y-10">
        {STEPS.map((step, i) => (
          <li key={i} className="rounded-2xl border border-ink-100 bg-white p-8">
            <div className="flex items-baseline gap-4">
              <span className="font-sans text-4xl font-bold text-accent-500">{i + 1}</span>
              <h2 className="font-sans text-2xl font-bold text-ink-950">{step.title}</h2>
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

      <div className="mt-16 rounded-2xl bg-ink-950 text-white p-10 text-center">
        <h2 className="font-sans text-2xl font-bold">Tu traverses une rupture en ce moment ?</h2>
        <p className="mt-3 text-ink-300">Les articles du journal sont gratuits. Le programme complet est disponible sur le site principal.</p>
        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          <Link href="/blog" className="btn-primary inline-flex">Lire les articles</Link>
          <a href="https://leprotocoledesseptjours.com" target="_blank" rel="noopener noreferrer" className="btn-secondary inline-flex">
            Le Protocole des 7 Jours
          </a>
        </div>
      </div>
    </div>
  );
}

const STEPS = [
  {
    title: 'Contenu ancre dans la psychologie de l\'attachement',
    desc: "Nos articles s'appuient sur les travaux de John Bowlby, Mary Ainsworth et leurs successeurs sur la theorie de l'attachement. On explique les comportements post-rupture (withdrawal, protest, resignation) avec ce cadre, pas avec des intuitions de comptoir.",
    bullets: [
      "Styles d'attachement (anxieux, evitant, secure, desorganise) expliques clairement",
      "Mecanismes de defense post-rupture decodes sans jargon",
      "Liens vers les recherches de reference quand c'est pertinent",
      "Distinction systematique entre correlation et causalite",
    ],
  },
  {
    title: 'Ethique de contenu : aider sans manipuler',
    desc: "La reconquete amoureuse est un sujet ou les conseils manipulateurs pullulent. Notre ligne editoriale est claire : on aide les lecteurs a comprendre ce qui se passe et a agir de facon coherente, jamais a manipuler ou a controler l'autre.",
    bullets: [
      "Pas de 'techniques' de manipulation psychologique (negging, jealousy game, etc.)",
      "Distinction entre communication saine et jeux de pouvoir",
      "On dit quand recuperer son ex n'est pas une bonne idee",
      "Respect de l'autonomie des deux personnes dans la relation",
    ],
  },
  {
    title: 'Caveat sante mentale systematique',
    desc: "La rupture amoureuse peut declencher des episodes depressifs, des crises d'angoisse, voire des pensees suicidaires. Ce contenu est educatif : il ne remplace pas un suivi psychologique ou psychiatrique.",
    bullets: [
      "Caveats clairs sur les limites du contenu editorial",
      "Renvoi vers des ressources professionnelles quand le sujet le justifie",
      "Pas de diagnostic, pas de prescription therapeutique",
      "Signalement des situations d'urgence (crisis line, etc.)",
    ],
  },
  {
    title: 'Transparence sur le produit associe',
    desc: "Ce journal est associe au Protocole des 7 Jours, un programme payant. Cette relation est transparente : les liens vers le produit sont identifies, le contenu editorial reste independant.",
    bullets: [
      "Liens vers le produit identifiables et toujours marques",
      "Pas de contenu deguise en editorial pour pousser a l'achat",
      "Les articles du journal restent utiles independamment du produit",
      "Pas de systeme de conversion agressif (pas de countdown timer, pas de fausse urgence)",
    ],
  },
];
