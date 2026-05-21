import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Situations courantes',
  description: "Situations types apres une rupture : no contact avec enfants, ex en couple, apres 6 mois. Des grilles de lecture concretes.",
  path: '/etudes-de-cas',
});

export default function CasesPage() {
  return (
    <div className="container-wide pt-20 md:pt-24 pb-16">
      <div className="max-w-3xl">
        <p className="label-silo">Situations courantes</p>
        <h1 className="mt-4 font-sans text-5xl font-bold text-ink-950 leading-tight">
          Reconnais ta situation
        </h1>
        <p className="mt-4 text-lg text-ink-700">
          Quelques situations types apres une rupture : chacune a sa dynamique specifique,
          ses ecueils et ses leviers. Retrouve la tienne pour lire les articles les plus pertinents.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {CASES.map((c, i) => (
          <article key={i} className="rounded-2xl border border-ink-100 bg-white p-8">
            <p className="text-sm uppercase tracking-wider text-accent-700 font-medium">{c.tag}</p>
            <h2 className="mt-2 font-sans text-2xl font-bold text-ink-950 leading-tight">{c.title}</h2>
            <p className="mt-3 text-ink-600 leading-relaxed">{c.summary}</p>
            <p className="mt-6 text-sm text-ink-500 italic">{c.note}</p>
          </article>
        ))}
      </div>

      <div className="mt-16 rounded-2xl bg-cream-100 border border-ink-100 p-10 text-center">
        <p className="font-sans text-xl text-ink-950 max-w-2xl mx-auto">
          Tous les articles du journal sont gratuits et accessibles sans inscription.
          Pour un accompagnement structure sur 7 jours, decouvre le programme complet.
        </p>
        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          <Link href="/blog" className="btn-primary">Lire les articles</Link>
          <a href="https://leprotocoledesseptjours.com" target="_blank" rel="noopener noreferrer" className="btn-secondary">
            Le Protocole des 7 Jours
          </a>
        </div>
      </div>
    </div>
  );
}

const CASES = [
  {
    tag: 'Rupture recente',
    title: 'J\'ai ete quitte il y a moins d\'une semaine',
    summary: "La periode la plus intense. Les erreurs les plus frequentes se font dans ces premiers jours. No contact immediat, gestion des messages compulsifs, stabilisation emotionnelle.",
    note: "Situation couverte dans les silos Traverser la rupture et Eviter les erreurs.",
  },
  {
    tag: 'No contact',
    title: 'Je fais le no contact depuis 2 semaines',
    summary: "La tentation de craquer est maximale entre J+10 et J+21. Comprendre ce qui se passe de l&apos;autre cote pendant ce silence, et comment tenir sans envoyer ce message.",
    note: "Situation couverte dans le silo No contact.",
  },
  {
    tag: 'Ex en couple',
    title: 'Mon ex est deja avec quelqu\'un d\'autre',
    summary: "La situation la plus douloureuse. Difference entre rebond et nouvelle relation serieuse, ce que ca signifie pour tes chances, et pourquoi agir vite est presque toujours une mauvaise idee.",
    note: "Situation couverte dans les silos Comprendre son ex et Reconquete amoureuse.",
  },
  {
    tag: 'Attachement anxieux',
    title: 'Je ne pense qu\'a lui/elle, je ne dors plus',
    summary: "L&apos;attachement anxieux amplifie la douleur post-rupture. Comprendre pourquoi tu reagis aussi fort, et des outils concrets pour ne pas te perdre dans cette periode.",
    note: "Situation couverte dans les silos Se comprendre et Traverser la rupture.",
  },
  {
    tag: 'Trop de messages envoyes',
    title: 'J\'ai envoye trop de messages apres la rupture',
    summary: "Les messages compulsifs post-rupture sont l&apos;erreur la plus courante. Comprendre l&apos;impact reel, si c&apos;est reparable, et comment reprendre contact apres une periode de silence.",
    note: "Situation couverte dans les silos Eviter les erreurs et Reconquete amoureuse.",
  },
  {
    tag: 'Rupture ancienne',
    title: 'C\'est termine depuis 6 mois et je n\'arrive pas a passer a autre chose',
    summary: "Quand la douleur persiste longtemps, ca signale souvent un attachement profond ou une dependance affective a travailler. Les pistes pour enfin avancer.",
    note: "Situation couverte dans les silos Se comprendre et Traverser la rupture.",
  },
];
