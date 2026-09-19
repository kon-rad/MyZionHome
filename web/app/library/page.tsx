import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { ArrowIcon } from "@/components/Icons";
import { LIBRARY, formatYear } from "@/lib/library";

export const metadata: Metadata = {
  title: "Library",
  description: "The NatureHouse guest library: books on code, AI, ideas, and the classics.",
};

export default function LibraryPage() {
  const total = LIBRARY.reduce((n, c) => n + c.books.length, 0);
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
          <p className="eyebrow mt-6 text-amber-bright">The Library</p>
          <h1 className="mt-4 max-w-2xl font-display text-5xl font-light leading-tight sm:text-6xl">
            Take one off the shelf.
          </h1>
          <p className="mt-4 max-w-lg text-cream/70">
            {total} books across {LIBRARY.length} collections, free for guests to read
            during your stay. Please put them back where you found them.
          </p>
          <nav className="mt-8 flex flex-wrap gap-2" aria-label="Collections">
            {LIBRARY.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className="rounded-full border border-cream/25 px-4 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-cream/80 transition hover:border-amber hover:text-amber"
              >
                {c.name}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {LIBRARY.map((c, ci) => (
        <section
          key={c.id}
          id={c.id}
          className={`scroll-mt-20 py-16 sm:py-24 ${ci % 2 ? "bg-paper-deep" : ""}`}
        >
          <div className="edge">
            <Reveal className="grid items-end gap-8 md:grid-cols-[1fr_1.2fr]">
              <div>
                <p className="eyebrow">
                  Collection {String(ci + 1).padStart(2, "0")} · {c.books.length} books
                </p>
                <h2 className="mt-4 font-display text-4xl font-light leading-tight text-forest sm:text-5xl">
                  {c.name}
                </h2>
                <p className="mt-4 max-w-md text-ink/65">{c.blurb}</p>
              </div>
              <div
                role="img"
                aria-label={`Shelf photo: ${c.name}`}
                className="aspect-[16/10] rounded-2xl bg-cover bg-center shadow-[0_28px_60px_-30px_rgba(32,48,31,0.55)]"
                style={{ backgroundImage: `url(${c.photo})` }}
              />
            </Reveal>

            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {c.books.map((b, i) => (
                <Reveal key={b.title} delay={(i % 2) * 110}>
                  <article className="h-full rounded-2xl border border-moss/15 bg-paper p-6">
                    <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-amber">
                      {formatYear(b.year)}
                    </p>
                    <h3 className="mt-2 font-display text-xl text-forest">{b.title}</h3>
                    <p className="mt-1 text-sm italic text-clay">{b.author}</p>
                    <p className="mt-3 text-sm leading-relaxed text-ink/70">{b.summary}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      <Footer />
    </main>
  );
}
