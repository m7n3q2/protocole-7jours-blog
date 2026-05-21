import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata, SITE } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: "Conditions générales d'utilisation",
  description: "Conditions générales d'utilisation du site blog.leprotocoledesseptjours.com.",
  path: '/cgu',
  noIndex: true,
});

export default function CGUPage() {
  return (
    <div className="container-prose pt-20 md:pt-24 pb-16">
      <h1 className="font-sans text-4xl font-bold text-ink-950">Conditions générales d&apos;utilisation</h1>

      <div className="prose prose-lg mt-8">
        <p className="lead">
          En accedant et en utilisant le site {SITE.url}, vous acceptez les conditions ci-dessous.
          Si vous n&apos;acceptez pas ces conditions, merci de ne pas utiliser le site.
        </p>

        <h2>Accès au site</h2>
        <p>
          Le site est accessible 24 heures sur 24, sauf cas de maintenance ou de force majeure.
          Aucune garantie de disponibilite ininterrompue n&apos;est donnee. L&apos;editeur se reserve le droit
          d&apos;interrompre temporairement ou definitivement l&apos;acces au site sans preavis.
        </p>

        <h2>Contenu éditorial et avertissement</h2>
        <p>
          Les articles publies sur ce site sont a but informatif et educatif.
          Ils ne constituent pas un conseil psychologique, psychiatrique ou medical reglemente.
          Ce contenu ne remplace pas un suivi professionnel de sante mentale.
          Pour tout probleme psychologique ou de sante, consulte un professionnel qualifie.
          Le lecteur reste seul responsable de l&apos;usage qu&apos;il fait des contenus publies.
        </p>

        <h2>Liens externes</h2>
        <p>
          Le site contient des liens vers le produit Le Protocole des 7 Jours et vers des ressources tierces
          fournis a titre informatif. La responsabilite de l&apos;editeur ne saurait etre engagee
          concernant le contenu ou la disponibilite de ces ressources.
        </p>

        <h2>Conduite des utilisateurs</h2>
        <p>
          Vous vous engagez a ne pas perturber le bon fonctionnement du site, notamment via du
          scraping massif, des tentatives d&apos;intrusion, ou toute autre action portant atteinte
          a la securite ou a l&apos;integrite du service.
        </p>

        <h2>Modification des CGU</h2>
        <p>
          Les presentes conditions peuvent etre modifiees a tout moment. La version en vigueur est
          celle publiee sur cette page a la date de votre visite.
        </p>

        <h2>Contact</h2>
        <p>
          Toute question relative aux presentes conditions peut etre adressee via le{' '}
          <Link href="/contact">formulaire de contact</Link>.
        </p>

        <h2>Loi applicable</h2>
        <p>
          Les presentes conditions sont regies par le droit francais. Tout litige relevera des
          tribunaux francais competents.
        </p>
      </div>
    </div>
  );
}
