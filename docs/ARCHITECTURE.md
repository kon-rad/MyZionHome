# Architecture

A plain-language map of how NatureHouse is built and why. Read this once and you
will know where to make almost any change.

## Big picture

NatureHouse is a **content-driven Next.js site**. The visual shell is React +
Tailwind; the actual *substance* (what the site says, what the chatbot knows,
which photos show) lives in editable data and markdown files. This separation is
deliberate: a non-developer can update the property without touching components.

```
                 ┌─────────────────────────────────────────┐
   Markdown  ───▶ │ content/knowledge/*.md   content/guidebook/*.md │
   & data         │ lib/data.ts   lib/media.ts                │
                 └───────────────┬─────────────────────────┘
                                 │  (loaders: lib/content.ts, lib/knowledge.ts)
                                 ▼
   React      ───▶  components/*  ──▶  app/*  (routes)  ──▶  HTML
                                 │
   AI         ───▶  app/api/chat/route.ts  ──▶  Together AI (streaming)
```

## Rendering model

- **App Router** (`app/`). Pages are React **Server Components** by default, so
  markdown/data loading happens on the server with no client cost.
- Components that need interactivity are explicitly marked `"use client"`
  (`Nav`, `Hero`, `Gallery`, `Chatbot`, `Reveal`).
- The landing page and guidebook are **statically pre-rendered** at build time.
  The guidebook uses `generateStaticParams` to emit one HTML file per guide.
- Only `app/api/chat` is dynamic (it streams per request).

## Directory responsibilities

### `app/` — routes
| Path | Type | Purpose |
| --- | --- | --- |
| `layout.tsx` | server | Loads fonts (`next/font`), renders `<Nav>` + `<Chatbot>` on every page, sets metadata. |
| `page.tsx` | server | The landing page. Composes section components in order. |
| `gallery/page.tsx` | server | Full gallery; hands all media to the `<Gallery>` client component. |
| `guidebook/page.tsx` | server | Guide index (reads all markdown). |
| `guidebook/[slug]/page.tsx` | server (SSG) | One guide, markdown → HTML. |
| `api/chat/route.ts` | server (dynamic) | Streaming concierge endpoint. |
| `globals.css` | — | Tailwind layers + custom utilities (grain, reveal, prose). |

### `components/` — UI
Presentational sections (`Hero`, `Highlights`, `About`, `Amenities`,
`LocationMap`, `Reviews`, `GalleryPreview`, `GuidebookPreview`, `Footer`) plus
shared pieces:

- `Nav.tsx` — client; transparent-to-solid on scroll.
- `Reveal.tsx` — client; `IntersectionObserver` scroll-in animation wrapper.
- `Gallery.tsx` — client; the grid **and** the lightbox (filter, keyboard nav, video).
- `Chatbot.tsx` — client; the floating concierge widget + streaming reader.
- `Icons.tsx` — inline SVG icons (no icon dependency).

**Convention:** server components import data and pass it *down* as props to
client components. Client components never read the filesystem.

### `lib/` — data & loaders
| File | Runs on | What it does |
| --- | --- | --- |
| `data.ts` | anywhere | Structured listing facts (highlights, bedrooms, amenities, drive times, reviews, host, rules). Pure TypeScript constants. |
| `media.ts` | anywhere | The gallery manifest + hero video path. |
| `content.ts` | server only | Reads `content/guidebook/*.md`, parses frontmatter (`gray-matter`), renders markdown (`marked`). |
| `knowledge.ts` | server only | Concatenates `content/knowledge/*.md` (+ guidebook) into the chatbot **system prompt**. Cached per process. |

### `content/` — the words
- `knowledge/*.md` — the concierge's source of truth (house, logistics, FAQ,
  amenities, area, reviews). Files are read in filename order.
- `guidebook/*.md` — one article per file, with frontmatter driving the cards.

### `public/media/` — the pictures
Real photos and `drone-hero.mp4` go here. The repo ships generated SVG
placeholders (see `scripts/gen-placeholders.mjs`) so the site works before any
real media exists.

## Data flow examples

**Rendering the guidebook index**
`guidebook/page.tsx` (server) → `getAllGuides()` in `lib/content.ts` → reads
`content/guidebook/*.md` → returns sorted metadata → rendered as cards.

**Answering a concierge question**
`Chatbot.tsx` (client) POSTs the chat history to `/api/chat` →
`route.ts` builds the system prompt via `buildSystemPrompt()` in `lib/knowledge.ts`
→ calls Together AI with `stream: true` → the route transforms the OpenAI-style
SSE into a plain text token stream → the client appends tokens live.

## Styling system

- Design tokens (the "Forest & Sand" palette, fonts) are defined in
  `tailwind.config.ts` and surfaced as CSS variables in `app/globals.css`.
- Fonts are loaded with `next/font/google` (Fraunces, Instrument Sans, JetBrains
  Mono) and exposed as CSS variables consumed by Tailwind's `fontFamily`.
- Reusable class recipes (`.btn-amber`, `.eyebrow`, `.prose-nature`, `.reveal`)
  live in `globals.css` under `@layer components`.
- See [../DESIGN.md](../DESIGN.md) for the full aesthetic rationale.

## Dependencies (deliberately few)

`next`, `react`, `react-dom`, `tailwindcss`, `gray-matter`, `marked`. No UI kit,
no icon library, no map SDK, no AI SDK — the chatbot talks to Together AI over
plain `fetch`. Fewer dependencies means a smaller attack surface and easier
long-term maintenance.

## Extending it

- **New landing section:** build `components/Foo.tsx`, add it to `app/page.tsx`.
- **New page:** add `app/foo/page.tsx` (+ a `Footer`), link it in `Nav.tsx`.
- **New guidebook article:** drop a `.md` file in `content/guidebook/` — no code.
- **Swap the AI provider:** `app/api/chat/route.ts` is the only integration
  point; it uses the OpenAI-compatible shape, so most providers are a URL + key
  change. See [CHATBOT.md](./CHATBOT.md).
