"use client";

import { useState } from "react";
import { DRONE_VIDEOS } from "@/lib/data";
import Reveal from "./Reveal";

function VideoCard({ v }: { v: (typeof DRONE_VIDEOS)[number] }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="overflow-hidden rounded-2xl border border-moss/15 bg-paper">
      <div className="relative aspect-video bg-forest">
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`}
            title={v.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play ${v.title}`}
            className="group absolute inset-0 h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(https://i.ytimg.com/vi/${v.id}/hqdefault.jpg)` }}
          >
            <span className="absolute inset-0 bg-forest/25 transition group-hover:bg-forest/10" />
            <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-amber text-forest transition group-hover:scale-110">
              <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg text-forest">{v.title}</h3>
        <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-amber">
          {v.note}
        </p>
      </div>
    </div>
  );
}

export default function DroneVideos() {
  const [first, ...rest] = DRONE_VIDEOS;
  return (
    <section id="air" className="scroll-mt-20 bg-paper py-24 sm:py-32">
      <div className="edge">
        <Reveal>
          <p className="eyebrow">Bird&apos;s-Eye View</p>
          <h2 className="mt-4 max-w-xl font-display text-4xl font-light leading-tight text-forest sm:text-5xl">
            Zion Home from the Air.
          </h2>
          <p className="mt-4 max-w-lg text-ink/65">
            Six acres, the tree line, and the fields around them, filmed by drone across
            the seasons.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <VideoCard v={first} />
        </Reveal>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {rest.map((v, i) => (
            <Reveal key={v.id} delay={(i % 2) * 110}>
              <VideoCard v={v} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
