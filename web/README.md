# MyZionHome

The digital home for **"Secluded Retreat with Workspaces & Nature Trails"** — an entire home on 6 private acres in Zion, Illinois. A cinematic, editorial site with a drone-video hero, an interactive gallery, an interactive location map, a local guidebook, and an AI concierge that answers guest questions from a markdown knowledge base via **Together AI**.

Built with Next.js (App Router) + TypeScript + Tailwind CSS. See `DESIGN.md` for the full design brief.

## Quick start

```bash
cp .env.example .env.local   # then paste your TOGETHER_API_KEY
npm install
npm run dev                  # http://localhost:3000
```

> New here? Start with **[../docs/ONBOARDING.md](../docs/ONBOARDING.md)**. Architecture lives in **[../docs/ARCHITECTURE.md](../docs/ARCHITECTURE.md)**, and how to change the site's content is in **[../docs/CONTENT-GUIDE.md](../docs/CONTENT-GUIDE.md)**.

For production:

```bash
npm run build && npm start
```

## Environment

| Var | Purpose |
| --- | --- |
| `TOGETHER_API_KEY` | Together AI key ([get one](https://api.together.xyz/settings/api-keys)). The chatbot works only when this is set; otherwise it returns a friendly fallback. |
| `TOGETHER_MODEL` | Chat model. Default `meta-llama/Llama-3.3-70B-Instruct-Turbo` (cheap + strong). Cheaper: `meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo`. Free/test: `meta-llama/Llama-3.3-70B-Instruct-Turbo-Free`. |

## Structure

```
app/
  page.tsx                 Landing page (hero → highlights → space → gallery →
                           amenities → location → guidebook → reviews → footer)
  gallery/page.tsx         Full gallery with filters + lightbox
  guidebook/page.tsx       Guide index
  guidebook/[slug]/page.tsx  Individual guide (renders markdown)
  api/chat/route.ts        Streaming concierge endpoint (Together AI)
components/                Hero, Nav, Gallery, Amenities, LocationMap, Reviews,
                           Chatbot, Footer, ...
content/
  knowledge/*.md           Concierge knowledge base (house, logistics, FAQ,
                           amenities, area, reviews) — edit to update the bot
  guidebook/*.md           Local area guides (frontmatter + markdown)
lib/
  data.ts                  Structured listing data (highlights, amenities, ...)
  media.ts                 Gallery manifest + hero video path
  content.ts               Guidebook markdown loader
  knowledge.ts             Assembles the concierge system prompt
public/media/              Photos + drone video (see public/media/README.md)
scripts/gen-placeholders.mjs  Regenerates placeholder gallery images
```

## Updating content

- **What the concierge knows:** edit the markdown in `content/knowledge/`. It is read at request time and stuffed into the system prompt, and the bot is instructed to answer only from it (and to defer to the host for pricing/availability/exact address).
- **Guidebook pages:** add or edit `content/guidebook/*.md`. Frontmatter fields: `title`, `excerpt`, `category`, `order`, `image`, `readTime`.
- **Gallery:** drop real media into `public/media/` and edit `lib/media.ts`. See `public/media/README.md`.
- **Listing facts (drive times, amenities, reviews):** `lib/data.ts`.

## Notes

- The map is an OpenStreetMap embed at an **approximate** location; the exact address is intentionally withheld (shared after booking), matching the Airbnb listing.
- The hero looks best with a real `public/media/drone-hero.mp4`. Until then it shows the placeholder poster.
