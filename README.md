<div align="center">

# 🌲 NatureHouse

**The digital home for a secluded 6-acre retreat in Zion, Illinois.**

A cinematic, editorial website with a drone-video hero, an interactive gallery,
a local guidebook, and an AI concierge that answers guest questions from a
markdown knowledge base.

[![License: MIT](https://img.shields.io/badge/License-MIT-C98A3C.svg)](./LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-20301F.svg)](https://nextjs.org)
[![Powered by Together AI](https://img.shields.io/badge/AI-Together%20AI-5E6E4E.svg)](https://together.ai)

</div>

---

## What this is

NatureHouse is an open-source marketing + guest-experience site for a single
short-term rental (an Airbnb "entire home"). It is built to be **forkable**: the
whole personality of the site lives in editable markdown and a couple of data
files, so anyone can point it at their own property.

Highlights:

- 🎬 **Drone-video hero** with a cinematic editorial landing page
- 🖼️ **Filterable gallery** with a full-screen lightbox (photos + video)
- 🗺️ **Interactive map** at an approximate location (exact address withheld)
- 📖 **Local guidebook** rendered from markdown files
- 💬 **AI concierge** streaming from Together AI, grounded in a markdown knowledge base
- ♿ Accessible, responsive, and `prefers-reduced-motion` aware

## Repository layout

```
NatureHouse/
├── README.md            ← you are here (project overview)
├── DESIGN.md            ← the design brief / aesthetic system
├── LICENSE              ← MIT (code) — see the note about content/media
├── CONTRIBUTING.md      ← how to contribute
├── CODE_OF_CONDUCT.md
├── docs/                ← developer & contributor documentation
│   ├── ONBOARDING.md    ← START HERE: set up and run locally in ~5 min
│   ├── ARCHITECTURE.md  ← how the code is organized and why
│   ├── CONTENT-GUIDE.md ← edit copy, guidebook, gallery, listing facts
│   ├── CHATBOT.md       ← how the AI concierge works
│   └── DEPLOYMENT.md    ← ship it (Vercel / Node)
└── web/                 ← the Next.js application
    ├── app/             ← routes (App Router) + API
    ├── components/      ← UI components
    ├── content/         ← markdown: knowledge base + guidebook
    ├── lib/             ← data + loaders
    ├── public/media/    ← photos + drone video
    └── .env.example     ← copy to .env.local and add your key
```

## Quick start

```bash
cd web
cp .env.example .env.local     # add your TOGETHER_API_KEY
npm install
npm run dev                    # http://localhost:3000
```

Full setup, troubleshooting, and a tour of the codebase are in
**[docs/ONBOARDING.md](./docs/ONBOARDING.md)**.

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 15 (App Router) + React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Content | Markdown (`gray-matter` + `marked`) |
| AI | Together AI (OpenAI-compatible, streaming) |
| Map | OpenStreetMap embed (no API key) |

## Security

- Secrets live only in `web/.env.local`, which is **git-ignored**. Never commit it.
- The only committed env file is `web/.env.example` (a safe, empty template).
- The map shows an **approximate** location by design; the exact address is
  shared with guests after booking.

See **[docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)** for production secret handling.

## Contributing

Contributions are welcome. Please read **[CONTRIBUTING.md](./CONTRIBUTING.md)**
and the **[Code of Conduct](./CODE_OF_CONDUCT.md)** first.

## License

Source code is [MIT licensed](./LICENSE). Property-specific content and media are
not licensed for reuse — replace them with your own when forking.
