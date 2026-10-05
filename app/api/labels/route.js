import { getDb } from "../../../lib/db";

export const runtime = "nodejs";

export async function POST(request) {
  const body = await request.json();
  const {
    pair_id,
    preference,
    accuracy,
    helpfulness,
    safety,
    instruction_following,
    comment = "",
    labeler = "manalipansuriya57",
  } = body;

  if (!pair_id || !["A", "B", "tie"].includes(preference)) {
    return Response.json({ error: "Invalid payload" }, { status: 400 });
  }

  const dims = [accuracy, helpfulness, safety, instruction_following];
  if (dims.some((n) => !Number.isInteger(n) || n < 1 || n > 5)) {
    return Response.json({ error: "Rubric scores must be integers 1–5" }, { status: 400 });
  }

  const db = getDb();
  const pair = db.data.pairs.find((p) => p.id === pair_id);
  if (!pair) return Response.json({ error: "Pair not found" }, { status: 404 });

  const id = db.data.nextLabelId++;
  db.data.labels.push({
    id,
    pair_id,
    labeler,
    preference,
    accuracy,
    helpfulness,
    safety,
    instruction_following,
    comment,
    created_at: new Date().toISOString(),
  });
  db.save();

  return Response.json({ id, status: "saved" });
}
