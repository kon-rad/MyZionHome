# The AI Concierge

How the chatbot works, how to configure it, and how to swap the model or provider.

## Overview

The concierge is a floating widget (`components/Chatbot.tsx`) backed by a single
streaming API route (`app/api/chat/route.ts`). It is a **grounded** assistant: it
answers only from the property's markdown knowledge base and defers anything it
does not know to the host.

```
Chatbot.tsx  ──POST /api/chat──▶  route.ts
   (client)     {messages:[...]}     │
      ▲                              ├─ buildSystemPrompt()  ← content/knowledge/*.md
      │                              │        (lib/knowledge.ts)
      └──── streamed text tokens ────┤
                                     └─ fetch Together AI (stream: true)
```

## Grounding (how it stays accurate)

`lib/knowledge.ts`:

- `getKnowledgeBase()` reads and concatenates every file in
  `content/knowledge/` plus the guidebook, and caches the result per process.
- `buildSystemPrompt()` wraps that knowledge in strict instructions: answer only
  from the knowledge base; be warm and concise; never invent amenities,
  distances, prices, or policies; never reveal the exact address; defer pricing/
  availability to the host.

Because the whole knowledge base is small, it is passed in full as the system
prompt on every request (no vector database or retrieval step needed). If your
knowledge base grows very large, that is when you would add retrieval — but for a
single property, full-context is simpler and more reliable.

## Configuration

Set in `web/.env.local` (see `.env.example`):

| Var | Required | Default | Notes |
| --- | --- | --- | --- |
| `TOGETHER_API_KEY` | for the bot to work | — | Without it the bot returns a friendly fallback; the site still runs. |
| `TOGETHER_MODEL` | no | `meta-llama/Llama-3.3-70B-Instruct-Turbo` | Any OpenAI-compatible model id on Together AI. |

**Model choices (cost vs. quality):**

| Model | Rough cost | When |
| --- | --- | --- |
| `meta-llama/Llama-3.3-70B-Instruct-Turbo` | ~$0.88 / 1M | Default. Strong, guest-facing quality. |
| `meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo` | ~$0.18 / 1M | Cheapest solid option. |
| `Qwen/Qwen2.5-7B-Instruct-Turbo` | very cheap | Budget. |
| `meta-llama/Llama-3.3-70B-Instruct-Turbo-Free` | free (rate-limited) | Local testing. |

## The API route

`app/api/chat/route.ts` (`runtime = "nodejs"` because it reads the filesystem):

1. Returns a friendly plain-text fallback if `TOGETHER_API_KEY` is missing.
2. Keeps only the last ~10 user/assistant turns and **discards any client-sent
   system messages** (the system prompt is authored server-side, so the client
   cannot override the grounding).
3. Calls Together AI's OpenAI-compatible `/v1/chat/completions` with
   `stream: true`, `temperature: 0.4`, `max_tokens: 700`.
4. Transforms the upstream SSE (`data: {...}` lines) into a **plain text token
   stream** that the client reads directly — no SSE parsing on the client.

## The client widget

`components/Chatbot.tsx`:

- Seeds a greeting and suggested-question chips.
- Streams the response with a `ReadableStream` reader, appending tokens live.
- Handles network errors with a graceful message.
- Sends the running history so the bot has short-term memory within a session.

## Swapping the provider

The route uses the OpenAI-compatible request/response shape, so most providers
are a two-line change:

- Change `TOGETHER_URL` to the provider's `/chat/completions` endpoint.
- Change the auth header / env var.
- Pick a model id the provider supports.

Everything else (streaming transform, grounding, client) stays the same.

## Cost & safety notes

- `max_tokens` and the trimmed history cap per-request spend.
- The knowledge-base-only instruction reduces hallucination and keeps answers
  on-topic.
- No secrets reach the browser — the key is used only server-side in the route.
