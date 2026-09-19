"use client";

import { useEffect, useRef, useState } from "react";
import { ChatIcon, CloseIcon, SendIcon } from "./Icons";

type Msg = { role: "user" | "assistant"; content: string };

const GREETING =
  "Hi, I'm the NatureHouse concierge. Ask me anything about the house, check-in, or the area.";

const CHIPS = [
  "How do I check in?",
  "Good for a Navy graduation?",
  "What's the WiFi like?",
  "Where's the nearest grocery?",
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: GREETING },
  ]);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;

    const nextHistory: Msg[] = [...messages, { role: "user", content: trimmed }];
    setMessages([...nextHistory, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextHistory.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.body) {
        const fallback = await res.text();
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "assistant", content: fallback };
          return copy;
        });
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      }
    } catch {
      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = {
          role: "assistant",
          content:
            "Sorry, something went wrong. Please try again, or reach the host Konrad through the Airbnb listing.",
        };
        return copy;
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {/* Launcher */}
      <button
        onClick={() => setOpen((o) => !o)}
        className={`fixed bottom-5 right-5 z-[80] flex items-center gap-2.5 rounded-full bg-amber px-5 py-3.5 text-forest shadow-[0_14px_40px_-10px_rgba(201,138,60,0.7)] transition-all duration-300 hover:bg-amber-bright ${
          open ? "scale-90 opacity-0 pointer-events-none" : "scale-100"
        }`}
        aria-label="Open concierge chat"
      >
        <ChatIcon className="h-5 w-5" />
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em]">
          Concierge
        </span>
      </button>

      {/* Panel */}
      <div
        className={`fixed bottom-5 right-5 z-[80] flex w-[min(400px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-3xl border border-moss/25 bg-paper shadow-[0_40px_80px_-20px_rgba(27,33,26,0.55)] transition-all duration-300 ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-6 opacity-0"
        }`}
        style={{ height: "min(560px, calc(100vh - 2.5rem))" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-forest px-5 py-4 text-cream">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-amber text-forest">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M5 19C5 11 11 5 19 5c0 8-6 14-14 14z" strokeLinejoin="round" />
              </svg>
            </span>
            <div>
              <p className="font-display text-base leading-none">NatureHouse Concierge</p>
              <p className="mt-1 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-cream/60">
                Powered by Together AI
              </p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="grid h-8 w-8 place-items-center rounded-full text-cream/70 transition hover:bg-cream/10 hover:text-cream"
            aria-label="Close chat"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-5">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[82%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-forest text-cream"
                    : "bg-paper-deep text-ink"
                }`}
              >
                {m.content || (
                  <span className="inline-flex gap-1">
                    <Dot /> <Dot d={0.15} /> <Dot d={0.3} />
                  </span>
                )}
              </div>
            </div>
          ))}

          {messages.length <= 1 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {CHIPS.map((c) => (
                <button
                  key={c}
                  onClick={() => send(c)}
                  className="rounded-full border border-moss/30 px-3 py-1.5 text-left text-xs text-moss transition hover:border-amber hover:text-forest"
                >
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-2 border-t border-moss/20 bg-paper px-3 py-3"
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about the house or the area..."
            className="flex-1 bg-transparent px-2 text-sm text-ink outline-none placeholder:text-moss/60"
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            className="grid h-9 w-9 place-items-center rounded-full bg-amber text-forest transition hover:bg-amber-bright disabled:opacity-40"
            aria-label="Send"
          >
            <SendIcon className="h-4 w-4" />
          </button>
        </form>
      </div>
    </>
  );
}

function Dot({ d = 0 }: { d?: number }) {
  return (
    <span
      className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-moss"
      style={{ animationDelay: `${d}s` }}
    />
  );
}
