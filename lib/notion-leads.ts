/**
 * Push leads vers la database Notion "Le Protocole · Journal - Leads".
 * Schema contact blog (Sujet, Contexte, Source).
 * Best-effort : si Notion fail, on n'empeche pas l'envoi Telegram (source de verite).
 */

const NOTION_API = 'https://api.notion.com/v1';
const NOTION_VERSION = '2022-06-28';

// Mapping form value (avec €) → option Notion (avec EUR)
function mapCa(formCa: string): string {
  const map: Record<string, string> = {
    'Moins de 500K€': 'Moins de 500K EUR',
    '500K€ à 2M€': '500K EUR a 2M EUR',
    '2M€ à 5M€': '2M EUR a 5M EUR',
    '5M€ à 15M€': '5M EUR a 15M EUR',
    'Plus de 15M€': 'Plus de 15M EUR',
  };
  return map[formCa] ?? 'Non renseigne';
}

function mapStade(formSituation: string): string {
  const map: Record<string, string> = {
    "Je n'ai jamais levé / cédé": 'Pre-levee',
    "J'ai déjà levé une fois": 'Deja leve une fois',
    'Je cherche un acquéreur': 'Cherche acquereur',
    'Je cherche une cible à acquérir': 'Cherche une cible',
    'Conseil ponctuel sur un deal': 'Conseil ponctuel',
  };
  return map[formSituation] ?? 'Pre-levee';
}

/**
 * lead.budget = valeur "ca" du formulaire (ex "2M€ à 5M€")
 * lead.projet = "[situation] Visé : X. Contexte..."
 * lead.site   = société (mappé site → societe au passage)
 */
export async function pushLeadToNotion(lead: {
  nom: string;
  email: string;
  tel: string;
  site?: string;
  budget: string;
  projet: string;
  source?: string;
}): Promise<{ ok: boolean; error?: string }> {
  const token = process.env.NOTION_TOKEN;
  const dbId = process.env.NOTION_LEADS_DB_ID;
  if (!token || !dbId) {
    return { ok: false, error: 'Missing NOTION_TOKEN or NOTION_LEADS_DB_ID' };
  }

  // Extraire situation depuis le préfixe `[Situation] ...` injecté par api/lead route
  const situationMatch = lead.projet.match(/^\[([^\]]+)\]/);
  const situationRaw = situationMatch ? situationMatch[1] : '';
  const stade = mapStade(situationRaw);

  // Extraire montant visé (entre "Visé : " et ". ")
  const montantMatch = lead.projet.match(/Visé\s*:\s*([^.]+)/);
  const montant = montantMatch ? montantMatch[1].trim() : '';

  // Contexte = ce qui reste après le préfixe + montant
  const contexte = lead.projet
    .replace(/^\[[^\]]+\]\s*/, '')
    .replace(/Visé\s*:\s*[^.]+\.\s*/, '')
    .slice(0, 1900);

  // Status : si source contient ":a-filtrer" → "A filtrer" sinon "Nouveau"
  const isAFiltrer = (lead.source ?? '').includes(':a-filtrer');

  const properties = {
    Nom: { title: [{ text: { content: lead.nom } }] },
    Email: { email: lead.email },
    Societe: { rich_text: [{ text: { content: lead.site ?? '' } }] },
    'CA recurrent annuel': { select: { name: mapCa(lead.budget) } },
    Stade: { select: { name: stade } },
    'Montant vise': { rich_text: [{ text: { content: montant } }] },
    Contexte: { rich_text: [{ text: { content: contexte } }] },
    Source: { rich_text: [{ text: { content: lead.source ?? 'protocole7jours:contact' } }] },
    Status: { select: { name: isAFiltrer ? 'A filtrer' : 'Nouveau' } },
    'Date recue': { date: { start: new Date().toISOString() } },
  };

  try {
    const res = await fetch(`${NOTION_API}/pages`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Notion-Version': NOTION_VERSION,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        parent: { database_id: dbId },
        properties,
      }),
    });
    if (!res.ok) {
      const text = await res.text();
      return { ok: false, error: `HTTP ${res.status}: ${text.slice(0, 300)}` };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'unknown' };
  }
}
