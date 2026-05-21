/**
 * Le Protocole des 7 Jours — logo officiel (réplique exacte du site de vente).
 * "Le Protocole" en script Caveat cramoisi, "des 7 JOURS" avec le 7 en Playfair Display.
 * Pur CSS, aucune image. Prop `dark` pour fond sombre (footer).
 */
export default function Logo({
  dark = false,
  className = '',
}: {
  dark?: boolean;
  className?: string;
}) {
  const navy = dark ? 'text-cream-50' : 'text-[#1A1A2E]';
  return (
    <span
      aria-label="Le Protocole des 7 Jours"
      className={`inline-flex flex-col items-center leading-none select-none ${className}`}
    >
      {/* Ligne 1 : "Le Protocole" en script cramoisi */}
      <span className="relative inline-block leading-none">
        <span className="absolute -top-2 left-0 font-script text-base font-normal text-accent-500 -rotate-6">
          Le
        </span>
        <span className="font-script text-[2.35rem] font-bold text-accent-500 leading-none pl-3">
          Protocole
        </span>
      </span>

      {/* Ligne 2 : "des 7 JOURS" */}
      <span className="mt-1 flex items-baseline gap-1.5">
        <span className={`font-sans text-sm font-medium lowercase ${navy}`}>des</span>
        <span className="font-serif text-[2.85rem] font-black text-accent-500 leading-none">7</span>
        <span className={`font-sans text-xl font-extrabold tracking-[0.04em] ${navy}`}>JOURS</span>
      </span>
    </span>
  );
}
