"use client";

import { useCallback, useEffect, useState } from "react";
import type { MediaItem, MediaCategory } from "@/lib/media";
import { PlayIcon, CloseIcon, ArrowIcon } from "./Icons";

const spanClass: Record<string, string> = {
  big: "sm:col-span-2 sm:row-span-2",
  wide: "sm:col-span-2",
  tall: "sm:row-span-2",
};

export default function Gallery({
  items,
  categories,
  showFilters = false,
}: {
  items: MediaItem[];
  categories?: MediaCategory[];
  showFilters?: boolean;
}) {
  const [filter, setFilter] = useState<string>("All");
  const [active, setActive] = useState<number | null>(null);

  const visible =
    filter === "All" ? items : items.filter((i) => i.category === filter);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (dir: number) => {
      setActive((cur) => {
        if (cur === null) return cur;
        const n = visible.length;
        return (cur + dir + n) % n;
      });
    },
    [visible.length]
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, step]);

  const current = active !== null ? visible[active] : null;

  return (
    <>
      {showFilters && categories && (
        <div className="no-scrollbar mb-8 flex gap-2 overflow-x-auto pb-1">
          {["All", ...categories].map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`whitespace-nowrap rounded-full border px-4 py-2 font-mono text-[0.66rem] uppercase tracking-[0.16em] transition-all ${
                filter === c
                  ? "border-forest bg-forest text-cream"
                  : "border-moss/25 text-moss hover:border-forest/50"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <div className="grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[190px] sm:grid-cols-3 lg:grid-cols-4">
        {visible.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => setActive(idx)}
            className={`group relative overflow-hidden rounded-xl bg-forest-800 text-left ${
              item.span ? spanClass[item.span] : ""
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage: `url(${item.type === "video" ? item.poster : item.src})`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-90" />

            {item.type === "video" && (
              <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-cream/60 bg-forest/40 text-cream backdrop-blur-sm transition-transform group-hover:scale-110">
                <PlayIcon className="ml-0.5 h-5 w-5" />
              </span>
            )}

            <div className="absolute inset-x-0 bottom-0 translate-y-2 p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <p className="font-sans text-xs leading-snug text-cream">{item.caption}</p>
            </div>

            <span className="absolute left-3 top-3 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-cream/70">
              {item.category}
            </span>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {current && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-forest/95 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <button
            className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-cream/30 text-cream transition hover:bg-cream/10"
            onClick={close}
            aria-label="Close"
          >
            <CloseIcon className="h-5 w-5" />
          </button>

          <button
            className="absolute left-4 top-1/2 grid h-12 w-12 -translate-y-1/2 rotate-180 place-items-center rounded-full border border-cream/25 text-cream transition hover:bg-cream/10"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Previous"
          >
            <ArrowIcon className="h-5 w-5" />
          </button>
          <button
            className="absolute right-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-cream/25 text-cream transition hover:bg-cream/10"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next"
          >
            <ArrowIcon className="h-5 w-5" />
          </button>

          <figure
            className="max-h-[85vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            {current.type === "video" ? (
              <video
                className="mx-auto max-h-[78vh] w-auto rounded-xl"
                src={current.src}
                poster={current.poster}
                controls
                autoPlay
                playsInline
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={current.src}
                alt={current.caption}
                className="mx-auto max-h-[78vh] w-auto rounded-xl object-contain"
              />
            )}
            <figcaption className="mt-4 text-center font-sans text-sm text-cream/80">
              {current.caption}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
