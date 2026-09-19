import { buildSystemPrompt } from "@/lib/knowledge";

export const runtime = "nodejs";

const TOGETHER_URL = "https://api.together.xyz/v1/chat/completions";
const DEFAULT_MODEL = "meta-llama/Llama-3.3-70B-Instruct-Turbo";

type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

export async function POST(req: Request) {
  const apiKey = process.env.TOGETHER_API_KEY;
  if (!apiKey) {
    return new Response(
      "The concierge is not configured yet. Please add TOGETHER_API_KEY to .env.local. In the meantime, you can reach the host Konrad through the Airbnb listing.",
      { status: 200, headers: { "Content-Type": "text/plain; charset=utf-8" } }
    );
  }

  let messages: ChatMessage[] = [];
  try {
    const body = await req.json();
    messages = Array.isArray(body.messages) ? body.messages : [];
  } catch {
    return new Response("Bad request", { status: 400 });
  }

  // Keep only the last ~10 turns and strip any client-sent system messages.
  const history = messages
    .filter((m) => m.role === "user" || m.role === "assistant")
    .slice(-10);

  const payload = {
    model: process.env.TOGETHER_MODEL || DEFAULT_MODEL,
    stream: true,
    temperature: 0.4,
    max_tokens: 700,
    messages: [
      { role: "system", content: buildSystemPrompt() },
      ...history,
    ],
  };

  const upstream = await fetch(TOGETHER_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => "");
    return new Response(
      `Sorry, the concierge hit a snag reaching the model${
        detail ? `: ${detail.slice(0, 200)}` : ""
      }. Please try again, or message the host through Airbnb.`,
      { status: 200, headers: { "Content-Type": "text/plain; charset=utf-8" } }
    );
  }

  // Transform the OpenAI-compatible SSE stream into a plain text token stream.
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = upstream.body!.getReader();
      let buffer = "";
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const data = trimmed.slice(5).trim();
            if (data === "[DONE]") {
              controller.close();
              return;
            }
            try {
              const json = JSON.parse(data);
              const token = json.choices?.[0]?.delta?.content;
              if (token) controller.enqueue(encoder.encode(token));
            } catch {
              // ignore keep-alive / partial lines
            }
          }
        }
        controller.close();
      } catch (err) {
        controller.error(err);
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
    },
  });
}
