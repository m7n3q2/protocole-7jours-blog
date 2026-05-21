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
      <h1 className="font-serif text-4xl font-bold text-[#1A1A2E]">Conditions générales d&apos;utilisation</h1>

      <div className="prose prose-lg mt-8">
        <p className="lead">
          En accédant et en utilisant le site {SITE.url}, vous acceptez les conditions ci-dessous.
          Si vous n&apos;acceptez pas ces conditions, merci de ne pas utiliser le site.
        </p>

        <h2>Accès au site</h2>
        <p>
          Le site est accessible 24 heures sur 24, sauf cas de maintenance ou de force majeure.
          Aucune garantie de disponibilité ininterrompue n&apos;est donnée. L&apos;éditeur se réserve le droit
          d&apos;interrompre temporairement ou définitivement l&apos;accès au site sans préavis.
        </p>

        <h2>Contenu éditorial et avertissement</h2>
        <p>
          Les articles publiés sur ce site sont à but informatif et éducatif.
          Ils ne constituent pas un conseil psychologique, psychiatrique ou médical réglementé.
          Ce contenu ne remplace pas un suivi professionnel de santé mentale.
          Pour tout problème psychologique ou de santé, consulte un professionnel qualifié.
          Le lecteur reste seul responsable de l&apos;usage qu&apos;il fait des contenus publiés.
        </p>

        <h2>Liens externes</h2>
        <p>
          Le site contient des liens vers le produit Le Protocole des 7 Jours et vers des ressources tierces
          fournis à titre informatif. La responsabilité de l&apos;éditeur ne saurait être engagée
          concernant le contenu ou la disponibilité de ces ressources.
        </p>

        <h2>Conduite des utilisateurs</h2>
        <p>
          Vous vous engagez à ne pas perturber le bon fonctionnement du site, notamment via du
          scraping massif, des tentatives d&apos;intrusion, ou toute autre action portant atteinte
          à la sécurité ou à l&apos;intégrité du service.
        </p>

        <h2>Modification des CGU</h2>
        <p>
          Les présentes conditions peuvent être modifiées à tout moment. La version en vigueur est
          celle publiée sur cette page à la date de votre visite.
        </p>

        <h2>Contact</h2>
        <p>
          Toute question relative aux présentes conditions peut être adressée via le{' '}
          <Link href="/contact">formulaire de contact</Link>.
        </p>

        <h2>Loi applicable</h2>
        <p>
          Les présentes conditions sont régies par le droit français. Tout litige relèvera des
          tribunaux français compétents.
        </p>
      </div>
    </div>
  );
}
