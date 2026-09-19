# Deployment

NatureHouse is a standard Next.js 15 app. Any platform that runs Next.js works.
The chatbot route needs a Node.js server runtime (it reads the filesystem), so a
fully static export is not sufficient for the concierge.

## Option A — Vercel (recommended)

1. Push the repo to GitHub (see "Publishing as open source" below).
2. In Vercel, **New Project** → import the repo.
3. Set the **Root Directory** to `web/` (the app is nested).
4. Add environment variables (Project Settings → Environment Variables):
   - `TOGETHER_API_KEY` = your key
   - `TOGETHER_MODEL` = `meta-llama/Llama-3.3-70B-Instruct-Turbo` (or your choice)
5. Deploy. Vercel auto-detects Next.js; no extra config needed.

## Option B — Node server (any host / Docker)

```bash
cd web
npm ci
npm run build
npm start          # serves on $PORT (default 3000)
```

Provide the same env vars in the host's environment. Put it behind a reverse
proxy (nginx/Caddy) for TLS if you are self-hosting.

Minimal Dockerfile sketch (build from the `web/` directory):

```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY web/package*.json ./
RUN npm ci
COPY web/ .
RUN npm run build
ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "start"]
```

## Secrets in production

- **Never** commit `.env.local`. It is git-ignored.
- Set `TOGETHER_API_KEY` through the platform's secret manager / env settings.
- Rotate the key if it is ever exposed. The key is used only server-side.

## Media & performance

- Add real media to `web/public/media/` before launch (see
  [CONTENT-GUIDE.md](./CONTENT-GUIDE.md)). Compress the drone video (H.264 MP4,
  720–1080p) so the hero loads fast.
- Consider moving large video to a CDN or object storage and pointing
  `HERO_VIDEO.src` / gallery `src` at the CDN URL if the file is heavy.

## Pre-launch checklist

- [ ] `npm run build` is clean.
- [ ] `TOGETHER_API_KEY` set in the platform (chatbot answers correctly).
- [ ] Real photos + `drone-hero.mp4` in place, placeholders removed.
- [ ] `lib/data.ts` facts and `SITE.airbnbUrl` are correct.
- [ ] Map coordinates are approximate (not the exact address).
- [ ] Custom domain + TLS configured.
