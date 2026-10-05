import { getDb } from "../../../lib/db";

export const runtime = "nodejs";

export async function GET() {
  const { data } = getDb();
  const labeled = new Set(
    data.labels.filter((l) => l.labeler === "manalipansuriya57").map((l) => l.pair_id)
  );

  const pair = data.pairs.find((p) => !labeled.has(p.id)) || null;
  if (!pair) {
    return Response.json({ done: true, pair: null, progress: { done: labeled.size, total: data.pairs.length } });
  }

  return Response.json({
    done: false,
    pair,
    progress: { done: labeled.size, total: data.pairs.length },
  });
}
