import Link from "next/link";
import type { GuideMeta } from "@/lib/content";
import Reveal from "./Reveal";
import { ArrowIcon } from "./Icons";

export default function GuidebookPreview({ guides }: { guides: GuideMeta[] }) {
  const featured = guides.slice(0, 3);
  return (
    <section id="guidebook" className="bg-paper-deep py-24 sm:py-32">
      <div className="edge">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">The Guidebook</p>
            <h2 className="mt-4 max-w-lg font-display text-4xl font-light leading-tight text-forest sm:text-5xl">
              Know the land before you arrive.
            </h2>
          </div>
          <Link
            href="/guidebook"
            className="group inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-clay transition hover:text-forest"
          >
            Open the guidebook
            <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {featured.map((g, i) => (
            <Reveal key={g.slug} delay={i * 110}>
              <Link
                href={`/guidebook/${g.slug}`}
                className="group block overflow-hidden rounded-2xl border border-moss/15 bg-paper transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_60px_-30px_rgba(32,48,31,0.55)]"
              >
                <div
                  className="aspect-[3/2] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${g.image})` }}
                />
                <div className="p-6">
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-amber">
                    {g.category} · {g.readTime}
                  </p>
                  <h3 className="mt-3 font-display text-xl text-forest">{g.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">
                    {g.excerpt}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
