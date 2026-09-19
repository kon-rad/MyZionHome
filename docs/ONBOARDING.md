# Onboarding

Welcome. This guide gets a new contributor from zero to a running dev server and
a first change in about five minutes.

## 1. Prerequisites

- **Node.js 18.18+** (tested on Node 22). Check: `node --version`
- **npm** (ships with Node). Yarn/pnpm also work.
- A **Together AI** API key for the chatbot — optional for UI work.
  Get one at <https://api.together.xyz/settings/api-keys>.

## 2. Install & run

```bash
cd web
cp .env.example .env.local     # then paste your TOGETHER_API_KEY
npm install
npm run dev
```

Open <http://localhost:3000>.

> No key yet? The site runs fine. The concierge just replies with a friendly
> "not configured" fallback until you add `TOGETHER_API_KEY`.

## 3. Verify everything

```bash
npm run build      # type-checks + compiles all routes
npm run lint       # eslint (next/core-web-vitals)
```

A green `npm run build` is the bar for a PR. It type-checks the whole app and
pre-renders the static pages.

## 4. Project tour (where things live)

Everything runs from `web/`.

| You want to change... | Go to |
| --- | --- |
| The landing page order/sections | `app/page.tsx` |
| A specific section's look | `components/<Section>.tsx` |
| Colors, fonts, spacing tokens | `tailwind.config.ts` + `app/globals.css` |
| Listing facts (drive times, amenities, reviews) | `lib/data.ts` |
| Gallery photos/video | `lib/media.ts` + `public/media/` |
| What the chatbot knows | `content/knowledge/*.md` |
| Guidebook articles | `content/guidebook/*.md` |
| The chatbot API | `app/api/chat/route.ts` |

For the full picture, read [ARCHITECTURE.md](./ARCHITECTURE.md). To edit the
site's words and pictures (no React needed), read [CONTENT-GUIDE.md](./CONTENT-GUIDE.md).

## 5. Make your first change

Try editing a headline in `components/Hero.tsx`, save, and watch it hot-reload.
Or add a fact to `content/knowledge/05-faq.md`, restart the dev server, open the
concierge (bottom-right), and ask about it.

## 6. Common issues

| Symptom | Fix |
| --- | --- |
| Chatbot says "not configured" | Add `TOGETHER_API_KEY` to `web/.env.local` and restart `npm run dev`. |
| Chatbot errors reaching the model | Check the key is valid and the `TOGETHER_MODEL` id exists on Together AI. |
| Knowledge edits don't show in chat | The knowledge base is cached per server process — restart the dev server. |
| Hero shows a placeholder, not video | Add `web/public/media/drone-hero.mp4` (see `public/media/README.md`). |
| Multiple-lockfile build warning | Already handled via `outputFileTracingRoot` in `next.config.mjs`. |

## 7. Branch & PR flow

See [CONTRIBUTING.md](../CONTRIBUTING.md). Short version: branch, make the change,
`npm run build` clean, open a PR with a clear description.
