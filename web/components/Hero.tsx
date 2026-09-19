"use client";

import { SITE } from "@/lib/data";
import { HERO_VIDEO } from "@/lib/media";
import { StarIcon, ArrowIcon } from "./Icons";

export default function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-forest">
      {/* Drone video background (poster paints instantly; video loops muted) */}
      <video
        className="absolute inset-0 h-full w-full object-cover animate-slow-zoom"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={HERO_VIDEO.poster}
      >
        <source src={HERO_VIDEO.src} type="video/mp4" />
      </video>

      {/* Scrims for legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest/70 via-forest/25 to-forest/85" />
      <div className="absolute inset-0 bg-gradient-to-r from-forest/60 via-transparent to-transparent" />

      <div className="edge relative flex h-full flex-col justify-end pb-20 sm:pb-24">
        <p className="eyebrow text-amber-bright animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <a
            href={SITE.airbnbUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 hover:underline"
          >
            {SITE.name}
          </a>{" "}
          · Zion, Illinois · 6 Private Acres
        </p>

        <h1 className="mt-5 max-w-3xl font-display text-5xl font-light leading-[0.95] text-cream sm:text-7xl lg:text-8xl">
          <span className="block animate-fade-up" style={{ animationDelay: "0.25s" }}>
            Where style
          </span>
          <span
            className="block italic text-amber-bright animate-fade-up"
            style={{ animationDelay: "0.45s" }}
          >
            meets serenity.
          </span>
        </h1>

        <p
          className="mt-6 max-w-xl text-base text-cream/80 sm:text-lg animate-fade-up"
          style={{ animationDelay: "0.65s" }}
        >
          {SITE.pitch}
        </p>

        <div
          className="mt-9 flex flex-wrap items-center gap-4 animate-fade-up"
          style={{ animationDelay: "0.85s" }}
        >
          <a href={SITE.airbnbUrl} target="_blank" rel="noopener noreferrer" className="btn-amber">
            Check availability <ArrowIcon className="h-3.5 w-3.5" />
          </a>
          <a href="/gallery" className="btn-ghost">
            Take the tour
          </a>
        </div>
      </div>

      {/* Corner rating meta */}
      <div
        className="absolute right-6 top-24 hidden items-center gap-2 rounded-full border border-cream/20 bg-forest/40 px-4 py-2 backdrop-blur-sm sm:flex lg:right-16 animate-fade-up"
        style={{ animationDelay: "1s" }}
      >
        <StarIcon className="h-3.5 w-3.5 text-amber-bright" />
        <span className="font-mono text-[0.72rem] tracking-wide text-cream">
          {SITE.rating} · {SITE.reviewCount} reviews
        </span>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-cream/50">
          Scroll
        </span>
        <span className="h-10 w-px animate-pulse bg-gradient-to-b from-amber-bright to-transparent" />
      </div>
    </section>
  );
}
