"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "./page.module.css";

const EMPTY_RUBRIC = {
  accuracy: 4,
  helpfulness: 4,
  safety: 5,
  instruction_following: 4,
};

export default function Home() {
  const [pair, setPair] = useState(null);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [done, setDone] = useState(false);
  const [preference, setPreference] = useState(null);
  const [rubric, setRubric] = useState(EMPTY_RUBRIC);
  const [comment, setComment] = useState("");
  const [msg, setMsg] = useState("");
  const [agreement, setAgreement] = useState(null);

  const loadNext = useCallback(async () => {
    setMsg("");
    setPreference(null);
    setComment("");
    setRubric(EMPTY_RUBRIC);
    const res = await fetch("/api/next-pair");
    const data = await res.json();
    setDone(Boolean(data.done));
    setPair(data.pair);
    if (data.progress) setProgress(data.progress);
  }, []);

  useEffect(() => {
    fetch("/api/seed", { method: "POST" })
      .then(() => loadNext())
      .catch(() => loadNext());
    fetch("/api/agreement")
      .then((r) => r.json())
      .then(setAgreement)
      .catch(() => {});
  }, [loadNext]);

  async function submit() {
    if (!pair || !preference) {
      setMsg("Pick A, B, or Tie first.");
      return;
    }
    const res = await fetch("/api/labels", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pair_id: pair.id,
        preference,
        ...rubric,
        comment,
        labeler: "manalipansuriya57",
      }),
    });
    if (!res.ok) {
      const err = await res.json();
      setMsg(err.error || "Save failed");
      return;
    }
    const agr = await fetch("/api/agreement").then((r) => r.json());
    setAgreement(agr);
    await loadNext();
  }

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1>Preference Labeling</h1>
        <p>
          Pairwise RLHF-style ranking · labeler <code>manalipansuriya57</code> ·{" "}
          {progress.done}/{progress.total} done
        </p>
      </header>

      {done && <p className={styles.msg}>All pairs labeled. Nice work.</p>}

      {pair && !done && (
        <>
          <section className={styles.prompt}>
            <h2>Prompt</h2>
            <p>{pair.prompt}</p>
            <span className={styles.tag}>{pair.domain}</span>
          </section>

          <section className={styles.grid}>
            {["A", "B"].map((side) => (
              <article
                key={side}
                className={`${styles.card} ${preference === side ? styles.selected : ""}`}
                onClick={() => setPreference(side)}
              >
                <h3>Response {side}</h3>
                <pre>{side === "A" ? pair.response_a : pair.response_b}</pre>
              </article>
            ))}
          </section>

          <div className={styles.actions}>
            <button type="button" onClick={() => setPreference("A")}>
              Prefer A
            </button>
            <button type="button" onClick={() => setPreference("B")}>
              Prefer B
            </button>
            <button type="button" className={styles.ghost} onClick={() => setPreference("tie")}>
              Tie
            </button>
          </div>

          <section className={styles.rubric}>
            <h2>Rubric (winner quality)</h2>
            <div className={styles.rubricGrid}>
              {Object.keys(rubric).map((key) => (
                <label key={key}>
                  {key.replaceAll("_", " ")}
                  <select
                    value={rubric[key]}
                    onChange={(e) =>
                      setRubric((r) => ({ ...r, [key]: Number(e.target.value) }))
                    }
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </label>
              ))}
            </div>
            <label className={styles.comment}>
              Comment
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Why this preference? Note safety, factuality, or instruction issues."
              />
            </label>
            <button type="button" className={styles.submit} onClick={submit}>
              Submit label
            </button>
            {msg && <p className={styles.msg}>{msg}</p>}
          </section>
        </>
      )}

      {agreement && (
        <footer className={styles.footer}>
          Agreement rate:{" "}
          {agreement.agreement_rate === null
            ? "n/a (need 2+ labelers on same pair)"
            : `${(agreement.agreement_rate * 100).toFixed(1)}%`}{" "}
          · labelers:{" "}
          {(agreement.labelers || [])
            .map((l) => `${l.labeler}(${l.labels})`)
            .join(", ") || "none yet"}
        </footer>
      )}
    </main>
  );
}
