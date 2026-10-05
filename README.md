# Preference Data Labeling Interface

Side-by-side A/B ranking UI for RLHF-style preference data. Rubric checklist, reviewer comments, and agreement tracking between labelers.

## Stack

Next.js (App Router) · API routes · JSON store (`data/preferences.json`)

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Features

- Pairwise comparison of model responses
- Rubric dimensions: accuracy, helpfulness, safety, instruction-following
- Prefer A / Prefer B / Tie
- Multi-labeler agreement stats on `/api/agreement`
