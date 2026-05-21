import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Situations courantes',
  description: "Situations types après une rupture : no contact avec enfants, ex en couple, après 6 mois. Des grilles de lecture concrètes.",
  path: '/etudes-de-cas',
});

export default function CasesPage() {
  return (
    <div className="container-wide pt-20 md:pt-24 pb-16">
      <div className="max-w-3xl">
        <p className="label-silo">Situations courantes</p>
        <h1 className="mt-4 font-serif text-5xl font-bold text-[#1A1A2E] leading-tight">
          Reconnais ta situation
        </h1>
        <p className="mt-4 text-lg text-ink-700">
          Quelques situations types après une rupture : chacune a sa dynamique spécifique,
          ses écueils et ses leviers. Retrouve la tienne pour lire les articles les plus pertinents.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {CASES.map((c, i) => (
          <article key={i} className="rounded-2xl border border-ink-100 bg-white p-8">
            <p className="text-sm uppercase tracking-wider text-accent-700 font-medium">{c.tag}</p>
            <h2 className="mt-2 font-serif text-2xl font-bold text-[#1A1A2E] leading-tight">{c.title}</h2>
            <p className="mt-3 text-ink-600 leading-relaxed">{c.summary}</p>
            <p className="mt-6 text-sm text-ink-500 italic">{c.note}</p>
          </article>
        ))}
      </div>

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

const CASES = [
  {
    tag: 'Rupture récente',
    title: 'J\'ai été quitté(e) il y a moins d\'une semaine',
    summary: "La période la plus intense. Les erreurs les plus fréquentes se font dans ces premiers jours. No contact immédiat, gestion des messages compulsifs, stabilisation émotionnelle.",
    note: "Situation couverte dans les silos Traverser la rupture et Éviter les erreurs.",
  },
  {
    tag: 'No contact',
    title: 'Je fais le no contact depuis 2 semaines',
    summary: "La tentation de craquer est maximale entre J+10 et J+21. Comprendre ce qui se passe de l&apos;autre côté pendant ce silence, et comment tenir sans envoyer ce message.",
    note: "Situation couverte dans le silo No contact.",
  },
  {
    tag: 'Ex en couple',
    title: 'Mon ex est déjà avec quelqu\'un d\'autre',
    summary: "La situation la plus douloureuse. Différence entre rebond et nouvelle relation sérieuse, ce que ça signifie pour tes chances, et pourquoi agir vite est presque toujours une mauvaise idée.",
    note: "Situation couverte dans les silos Comprendre son ex et Reconquête amoureuse.",
  },
  {
    tag: 'Attachement anxieux',
    title: 'Je ne pense qu\'a lui/elle, je ne dors plus',
    summary: "L&apos;attachement anxieux amplifie la douleur post-rupture. Comprendre pourquoi tu réagis aussi fort, et des outils concrets pour ne pas te perdre dans cette période.",
    note: "Situation couverte dans les silos Se comprendre et Traverser la rupture.",
  },
  {
    tag: 'Trop de messages envoyés',
    title: 'J\'ai envoyé trop de messages après la rupture',
    summary: "Les messages compulsifs post-rupture sont l&apos;erreur la plus courante. Comprendre l&apos;impact réel, si c&apos;est réparable, et comment reprendre contact après une période de silence.",
    note: "Situation couverte dans les silos Éviter les erreurs et Reconquête amoureuse.",
  },
  {
    tag: 'Rupture ancienne',
    title: 'C\'est terminé depuis 6 mois et je n\'arrive pas à passer à autre chose',
    summary: "Quand la douleur persiste longtemps, ça signale souvent un attachement profond ou une dépendance affective à travailler. Les pistes pour enfin avancer.",
    note: "Situation couverte dans les silos Se comprendre et Traverser la rupture.",
  },
];
