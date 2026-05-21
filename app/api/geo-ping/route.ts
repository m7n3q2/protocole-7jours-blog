import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

/**
 * Endpoint léger qui log les visites en provenance des LLM (ChatGPT, Perplexity, etc.).
 * Stocké dans un fichier append-only pour stats GEO.
 *
 * V1 minimaliste : on log juste dans les access logs Vercel.
 * V2 (post-MVP) : Vercel KV ou Supabase pour analyse fine.
 */
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    // Pour l'instant juste un log structuré (visible dans Vercel Logs)
    console.log(
      JSON.stringify({
        kind: 'geo_visit',
        source: data.source,
        page: data.page,
        ts: data.ts,
        ua: req.headers.get('user-agent')?.slice(0, 200),
      }),
    );
  } catch {
    // ignore
  }
  return new NextResponse(null, { status: 204 });
}
