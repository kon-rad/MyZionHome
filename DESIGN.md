# NatureHouse — Design Prompts & Direction

The digital home for **"Secluded Retreat with Workspaces & Nature Trails"** — an entire home on 6 private acres in Zion, Illinois. This document is the design brief: the aesthetic system, the page-by-page prompts, and the copy voice that the site is built against.

---

## 1. Aesthetic Direction — "Curated Wilderness"

Refined, editorial, calm. The feeling of a design-magazine spread about a forest retreat — never rustic-cabin kitsch, never generic-startup gradient. Style meets serenity.

**Mood words:** secluded · curated · golden-hour · slow · exclusive · grounded

### Palette — "Forest & Sand"
| Token | Hex | Use |
| --- | --- | --- |
| `--paper` | `#F5F0E6` | Primary page background (warm oat) |
| `--paper-deep` | `#EBE3D3` | Section alternation, cards |
| `--forest` | `#20301F` | Darkest anchor — hero overlay, footer, dark sections |
| `--moss` | `#5E6E4E` | Secondary green, borders, muted UI |
| `--sage` | `#9AA786` | Soft accents, dividers |
| `--amber` | `#C98A3C` | Golden-hour accent — CTAs, links, highlights |
| `--clay` | `#A65A38` | Rare secondary accent (warmth) |
| `--ink` | `#1B211A` | Body text on light |
| `--cream` | `#F7F3EA` | Text on dark |

Dominant = paper + forest. Amber is the sharp accent used sparingly (a golden thread, not a flood). Never purple-on-white.

### Typography
- **Display / headings:** `Fraunces` (variable, optical) — high contrast, soft serifs, `wght 300–600`, generous. Use large, tight leading, occasional italic for warmth.
- **Body / UI:** `Instrument Sans` — humanist, quiet, legible.
- **Mono accents (labels, coordinates, metadata):** `JetBrains Mono` at small caps / letter-spaced for "GPS", section eyebrows, tags.

### Texture & Atmosphere
- Subtle **film-grain overlay** (SVG noise, ~4% opacity) across the whole page for depth.
- **Gradient-mesh** warm glows behind the forest sections (amber → forest).
- Hairline **1px moss borders**, generous negative space, editorial asymmetry.
- Soft, long shadows; rounded-but-restrained corners (large radii on media, near-square on structural blocks).

### Motion
- One orchestrated hero load: staggered fade-up reveals (eyebrow → title lines → CTA → stats).
- Scroll-triggered fade/slide-in on section entry (IntersectionObserver).
- Hover: media gently scales + warms; buttons fill with amber; underlines draw in.
- Respect `prefers-reduced-motion`.

---

## 2. Landing Page — Section Prompts

> Design prompt for the landing page as a whole: *A cinematic, editorial one-page retreat site. Open on a silent full-bleed drone flight over a forested 6-acre property at golden hour, a serif headline dissolving in over it. Scroll into a warm oat-paper world of asymmetric photo spreads, quiet stats, an amenities index, an interactive map, and guest voices — anchored by a floating concierge chat. Calm, exclusive, unforgettable.*

### 2.1 Hero — Drone Video
- Full-viewport autoplaying, muted, looping **drone video** of the property (forest canopy → house reveal). Poster image for first paint; dark forest gradient scrim bottom + top for text legibility.
- Overlaid: mono eyebrow `ZION · ILLINOIS · 6 PRIVATE ACRES`, then large Fraunces headline **"Where style meets serenity."** in two staggered lines. Sub: the one-line pitch. Primary CTA `Check availability` (amber), ghost CTA `Take the tour`.
- Corner meta: `4.68 ★ · 112 reviews` and a small scroll-cue.
- Subtle parallax / slow zoom on the video.

### 2.2 Highlights strip
- Three editorial cards from listing highlights: **Self check-in** (smart lock), **Extra spacious** (6 guests, 3 beds), **Peace & quiet** (far from neighbors, corn fields on one side). Icon + Fraunces label + one line.

### 2.3 The Space (About)
- Asymmetric two-column: left, a tall portrait photo (hammock / trail); right, the "refined escape on 6 private acres" narrative + the productivity/serenity angle (fast WiFi, dedicated workspaces, meditation area, private forest trail). Pull-quote treatment.

### 2.4 Stay details
- Quiet stat row: `6 guests · 3 bedrooms · 3 beds · 2 baths · Single-level`. Bedroom breakdown cards (Bedroom 1 standing desk + dual monitor + Casper; Master queen + ensuite; Bedroom 3 double; Living room reading nook + swing chair).

### 2.5 Gallery preview
- Masonry / editorial grid teaser (mix of photos + a video tile with play affordance). CTA → full `/gallery`.

### 2.6 Amenities index
- Editorial "index" layout grouped by category (Kitchen & dining, Work & connectivity, Comfort, Outdoors, Safety, Services). Expand to all 53. Mono category labels, two/three columns, hairline dividers. Highlight the differentiators: dedicated workspace in a room with a door, fast WiFi, fire pit, private backyard + patio, 43" HDTV w/ Apple TV + Roku, in-unit washer/dryer, self check-in smart lock.

### 2.7 Location & map
- Interactive map (approx location — exact provided after booking). Beside it, the **drive-time list** as a clean timeline: North Point Marina 10 · Kenosha 16 · Illinois Beach SP 17 · Six Flags Great America 18 · Great Lakes Naval Base 27 · Lake Geneva 44 · Milwaukee 46 · Chicago 55 (min). Note the Russell/Kenosha Rd roundabout construction + gravel-section caveat honestly.

### 2.8 Guidebook preview
- Three cards → `/guidebook` (Navy graduations & Great Lakes, Outdoors & beaches, Food & day-trips). Golden-hour imagery.

### 2.9 Guest voices (Reviews)
- Rating summary bars (Cleanliness 4.7 · Accuracy 4.8 · Check-in 4.9 · Communication 4.9 · Location 4.8 · Value 4.6) + a rotating/quilted set of real 5-star quotes (Andrea's meditation retreat, Lisa's detailed love-letter, Jess & Ben road-trip). Honest, curated — lead with the strongest.

### 2.10 Closing CTA + Footer
- Forest-dark closing band: "Your quiet is waiting." + `Check availability`. Footer: quick links, house rules snapshot (check-in 3PM, checkout 11AM, 6 guests max, no parties), host note (Hosted by Konrad · 5 years · responds within an hour).

### 2.11 Concierge chatbot (persistent)
- Floating amber pill bottom-right → expands to a warm chat panel. Greeting: *"Hi, I'm the NatureHouse concierge. Ask me anything about the house, check-in, or the area."* Suggested chips: "How do I check in?" · "Is it good for a Navy graduation?" · "What's the WiFi like?" · "Nearest grocery?" Answers strictly from the markdown knowledge base via Together AI.

---

## 3. Interior Pages

**/gallery** — Full editorial gallery. Filter tabs (All · Exterior & Drone · Living · Kitchen · Bedrooms · Outdoors · Video). Masonry grid, click → full-screen lightbox with keyboard arrows, captions, and inline video playback.

**/guidebook** — Local guide index: card grid of area guides, each opening a long-form markdown page (`/guidebook/[slug]`) with a hero image, sectioned content, and a back-to-index rail. Guides written from the listing's drive-times and reviews (Navy/Great Lakes, beaches & state parks, Six Flags & Bristol Ren Faire, Kenosha & Lake Geneva day-trips, food & groceries, getting here & the roundabout).

---

## 4. Voice & Copy
Warm, precise, understated-premium. Short sentences. No hype-stacking, no em dashes in guest-facing copy. Honest about the quirks (well water pressure, older farmhouse charm, construction nearby) — trust sells the calm. Host is present but not performative.

---

## 5. Build Notes
- Next.js (App Router, TS) + Tailwind. Fraunces + Instrument Sans + JetBrains Mono via `next/font`.
- Chatbot: `/api/chat` → Together AI (OpenAI-compatible), system prompt assembled from `content/knowledge/*.md`. Streaming.
- Guidebook: markdown in `content/guidebook/*.md` rendered at build/request.
- Media: real photos + drone video dropped into `public/media/`; `lib/media.ts` manifest drives the gallery. Ships with labeled placeholders + a drop-in guide.
- Map: OpenStreetMap embed at approximate coordinates (no key, exact location withheld).
