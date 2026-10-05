import { getDb } from "../../../lib/db";

export const runtime = "nodejs";

export async function GET() {
  const { data } = getDb();
  const byPair = new Map();
  for (const row of data.labels) {
    if (!byPair.has(row.pair_id)) byPair.set(row.pair_id, []);
    byPair.get(row.pair_id).push(row);
  }

  let multi = 0;
  let agree = 0;
  for (const [, labels] of byPair) {
    if (labels.length < 2) continue;
    multi += 1;
    const prefs = new Set(labels.map((l) => l.preference));
    if (prefs.size === 1) agree += 1;
  }

  const labelerMap = new Map();
  for (const row of data.labels) {
    labelerMap.set(row.labeler, (labelerMap.get(row.labeler) || 0) + 1);
  }
  const labelers = [...labelerMap.entries()]
    .map(([labeler, labels]) => ({ labeler, labels }))
    .sort((a, b) => b.labels - a.labels);

  return Response.json({
    pairs_with_multiple_labelers: multi,
    full_agreement: agree,
    agreement_rate: multi === 0 ? null : Number((agree / multi).toFixed(3)),
    labelers,
  });
}
