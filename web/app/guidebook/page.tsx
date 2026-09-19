import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { getAllGuides } from "@/lib/content";
import { ArrowIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Guidebook",
  description:
    "Local guides for the MyZionHome retreat: getting here, Navy graduations, beaches, family day trips, food, and remote work.",
};

export default function GuidebookPage() {
  const guides = getAllGuides();
  return (
    <main className="bg-paper">
      <section className="bg-forest pb-16 pt-32 text-cream">
        <div className="edge">
          <Link
            href="/"
            className="inline-flex rotate-180 items-center font-mono text-xs text-cream/60 transition hover:text-amber-bright"
            aria-label="Back home"
          >
            <ArrowIcon className="h-4 w-4" />
          </Link>
          <p className="eyebrow mt-6 text-amber-bright">The Guidebook</p>
          <h1 className="mt-4 max-w-2xl font-display text-5xl font-light leading-tight sm:text-6xl">
            Local knowledge for a better stay.
          </h1>
          <p className="mt-4 max-w-lg text-cream/70">
            Everything from the drive in to the best day trips, written from the
            house and the guests who have stayed here.
          </p>
        </div>
      </section>

      <section className="edge grid gap-6 py-16 md:grid-cols-2 lg:grid-cols-3">
        {guides.map((g, i) => (
          <Reveal key={g.slug} delay={(i % 3) * 90}>
            <Link
              href={`/guidebook/${g.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-moss/15 bg-paper-deep/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_60px_-30px_rgba(32,48,31,0.5)]"
            >
              <div
                className="aspect-[3/2] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${g.image})` }}
              />
              <div className="flex flex-1 flex-col p-6">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-amber">
                  {g.category} · {g.readTime}
                </p>
                <h2 className="mt-3 font-display text-xl text-forest">{g.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/65">
                  {g.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-clay">
                  Read guide
                  <ArrowIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </section>

      <Footer />
    </main>
  );
}
