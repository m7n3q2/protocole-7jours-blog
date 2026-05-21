import type { Metadata } from 'next';
import Link from 'next/link';
import { AUTHORS } from '@/lib/authors';
import { buildMetadata } from '@/lib/seo';
import AuthorAvatar from '@/components/AuthorAvatar';

export const metadata: Metadata = buildMetadata({
  title: 'À propos',
  description: 'Le Protocole · Journal : un média indépendant pour aider les personnes en rupture amoureuse à traverser cette période et à mieux comprendre ce qui se passe.',
  path: '/a-propos',
});

/**
 * Le Protocole · Journal — app/a-propos/page.tsx
 * Mission, auteurs fictifs, E-E-A-T, caveat sante mentale, lien produit discret.
 */

export default function AboutPage() {
  return (
    <div className="container-prose pt-20 md:pt-24 pb-16 md:pb-20">
      <p className="label-silo">À propos</p>
      <h1 className="mt-4 font-sans text-4xl md:text-5xl lg:text-6xl font-bold text-ink-950 leading-[1.02] tracking-[-0.025em] max-w-[18ch]">
        Comprendre, tenir,{' '}
        <span className="italic font-normal text-accent-700">avancer.</span>
      </h1>

      <div className="mt-10 max-w-[72ch]">
        <p className="font-sans italic text-xl text-ink-700 leading-snug">
          Le Protocole · Journal est un média indépendant sur la rupture amoureuse, le no contact
          et la reconquête. Pour les moments où on ne sait plus quoi faire, quoi penser, quoi ressentir.
        </p>

        <h2 className="mt-12 font-sans text-2xl md:text-[1.625rem] font-bold text-ink-950 tracking-tight flex items-center gap-2.5">
          <span aria-hidden="true" className="inline-block w-5 h-0.5 bg-accent-500 flex-shrink-0" />
          Pourquoi ce journal
        </h2>
        <p className="mt-4 text-lg text-ink-700 leading-relaxed">
          Après une rupture, on cherche des réponses. Pourquoi ça s&apos;est terminé ? Que pense mon ex ?
          Le no contact, ça sert à quoi vraiment ? Les forums regorgent d&apos;avis contradictoires.
          Ce journal existe pour apporter de la clarté : des articles structurés, appuyés sur la
          psychologie de l&apos;attachement et l&apos;expérience de terrain, sans promesses magiques.
        </p>
        <p className="mt-4 text-lg text-ink-700 leading-relaxed">
          On couvre les deux familles d&apos;intention : ceux qui souffrent et cherchent à tenir,
          et ceux qui veulent comprendre comment récupérer leur ex de façon saine.
        </p>

        <h2 className="mt-12 font-sans text-2xl md:text-[1.625rem] font-bold text-ink-950 tracking-tight flex items-center gap-2.5">
          <span aria-hidden="true" className="inline-block w-5 h-0.5 bg-accent-500 flex-shrink-0" />
          Qui écrit
        </h2>
        <p className="mt-4 text-lg text-ink-700 leading-relaxed">
          Trois accompagnants spécialisés en relations et reconstruction après rupture.
          Chacun couvre son domaine de compétence.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-10">
          {AUTHORS.map((a) => (
            <Link
              key={a.slug}
              href={`/auteurs/${a.slug}`}
              className="group block rounded-xl border border-ink-100 bg-white p-5 hover:border-accent-300 hover:-translate-y-0.5 transition"
            >
              <AuthorAvatar author={a} size="lg" />
              <p className="mt-3.5 font-sans text-lg font-bold text-ink-950 tracking-tight">{a.name}</p>
              <p className="mt-0.5 text-sm text-ink-600">{a.role}</p>
            </Link>
          ))}
        </div>

        <h2 className="mt-12 font-sans text-2xl md:text-[1.625rem] font-bold text-ink-950 tracking-tight flex items-center gap-2.5">
          <span aria-hidden="true" className="inline-block w-5 h-0.5 bg-accent-500 flex-shrink-0" />
          Ce qu&apos;on ne fait pas
        </h2>
        <ul className="mt-4 space-y-2 text-lg text-ink-700 leading-relaxed pl-5 marker:text-accent-500 list-disc">
          <li>Pas de manipulation ou de techniques de contr&ocirc;le. Notre approche est éthique : comprendre, pas manipuler.</li>
          <li>Pas de promesses que ton ex reviendra. On ne peut pas prédire l&apos;avenir d&apos;une relation.</li>
          <li>Pas de contenu qui remplace un suivi psychologique. Si tu souffres intensément, consulte un professionnel de santé mentale.</li>
          <li>Pas d&apos;affiliation cachee. Le seul lien commercial est celui vers le Protocole des 7 Jours, indique clairement.</li>
        </ul>

        <h2 className="mt-12 font-sans text-2xl md:text-[1.625rem] font-bold text-ink-950 tracking-tight flex items-center gap-2.5">
          <span aria-hidden="true" className="inline-block w-5 h-0.5 bg-accent-500 flex-shrink-0" />
          Le Protocole des 7 Jours
        </h2>
        <p className="mt-4 text-lg text-ink-700 leading-relaxed">
          Ce journal est associé au{' '}
          <a
            href="https://leprotocoledesseptjours.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-700 underline underline-offset-2 decoration-accent-200 hover:decoration-accent-500 hover:text-accent-800 transition"
          >
            Protocole des 7 Jours
          </a>
          , un programme complet (37 euros) pour traverser la première semaine après une rupture.
          Si les articles de ce journal t&apos;aident, le programme va plus loin avec une méthode structurée.
        </p>
        <p className="mt-4 text-lg text-ink-700 leading-relaxed">
          Pour toute question : <Link href="/contact" className="text-accent-700 underline underline-offset-2 decoration-accent-200 hover:decoration-accent-500 hover:text-accent-800 transition">
            via le formulaire de contact
          </Link>.
        </p>
      </div>
    </div>
  );
}
