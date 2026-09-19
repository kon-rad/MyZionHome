# Contributing to NatureHouse

Thanks for your interest in improving NatureHouse. This project is friendly to
first-time contributors — the content is mostly markdown, and the code is a small,
dependency-light Next.js app.

## Ways to contribute

- **Content fixes** — typos, clearer copy, better guidebook articles
  (`web/content/`). No coding required.
- **Bug fixes** — something broken in the UI or the chatbot.
- **Features** — new sections, accessibility improvements, performance.
- **Docs** — the files in `docs/` and the READMEs.

## Getting set up

Follow **[docs/ONBOARDING.md](./docs/ONBOARDING.md)**. Short version:

```bash
cd web
cp .env.example .env.local
npm install
npm run dev
```

## Before you open a PR

1. **Build must pass:**
   ```bash
   cd web
   npm run build     # type-checks + compiles every route
   npm run lint      # eslint
   ```
2. **Keep it scoped.** One logical change per PR.
3. **Match the style.** Read a nearby file first; mirror its patterns, naming,
   and Tailwind usage. Server components load data and pass it to client
   components — keep that boundary.
4. **Never commit secrets.** `.env.local` is git-ignored; only `.env.example`
   (empty template) is tracked. Double-check `git status` before committing.
5. **Don't commit large binaries** unless intended. Real photos/video belong in
   `web/public/media/` but consider a CDN for heavy video (see
   [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)).

## Commit & PR conventions

- Write clear, imperative commit messages ("Add fire-pit photo to gallery").
- In the PR description, say **what** changed and **why**, and note anything a
  reviewer should test manually (e.g. "ask the concierge about parking").
- Link any related issue.

## Reporting bugs / requesting features

Open an issue with:

- What you expected vs. what happened.
- Steps to reproduce (URL/section, browser).
- For the chatbot: the question you asked and the answer you got.

## Code of Conduct

By participating you agree to the
[Code of Conduct](./CODE_OF_CONDUCT.md). Be kind.

## License

By contributing, you agree that your contributions are licensed under the
project's [MIT License](./LICENSE). Note that property-specific content and media
are not licensed for reuse; contribute generic improvements to those only if they
are clearly reusable (e.g. example placeholders).
