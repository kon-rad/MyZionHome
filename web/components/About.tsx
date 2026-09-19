import { BEDROOMS, SITE } from "@/lib/data";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="space" className="relative overflow-hidden bg-paper py-24 sm:py-32">
      {/* warm mesh glow */}
      <div className="pointer-events-none absolute -right-40 top-0 h-[36rem] w-[36rem] rounded-full bg-amber/10 blur-3xl" />

      <div className="edge relative grid gap-14 lg:grid-cols-2 lg:items-center">
        <Reveal className="order-2 lg:order-1">
          <p className="eyebrow">The Space</p>
          <h2 className="mt-4 max-w-md font-display text-4xl font-light leading-tight text-forest sm:text-5xl">
            A refined escape where
            <span className="italic text-clay"> productivity </span>
            meets rest.
          </h2>
          <p className="mt-6 max-w-md text-ink/75 leading-relaxed">
            Thoughtfully designed for both focus and calm. Fast WiFi and dedicated
            workspaces, a serene meditation corner, and a private forest trail to
            walk before the first call. Return to elegant rooms, a cozy lounge, or a
            hammock under the trees.
          </p>
          <p className="mt-4 max-w-md text-ink/75 leading-relaxed">
            The fully equipped kitchen has a coffee machine, a moka pot, and
            complimentary beverages. Each bedroom balances a comfortable bed with an
            ergonomic desk. Calm, curated, and exclusive.
          </p>

          <blockquote className="mt-8 border-l-2 border-amber pl-5 font-display text-xl italic text-forest/90">
            &ldquo;Perfect for a weekend retreat away from the city. Quiet
            meditations, reading, and the fall beauty of the property.&rdquo;
            <cite className="mt-2 block font-sans text-xs not-italic tracking-wide text-moss">
              — Andrea, Chicago
            </cite>
          </blockquote>
        </Reveal>

        <Reveal delay={150} className="order-1 lg:order-2">
          <div className="relative">
            <div
              className="aspect-[4/5] w-full rounded-3xl bg-cover bg-center shadow-[0_40px_80px_-40px_rgba(32,48,31,0.6)]"
              style={{ backgroundImage: "url(/media/gallery/drone-0126.jpg)" }}
            />
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-moss/15 bg-paper px-6 py-4 shadow-lg sm:block">
              <p className="font-display text-3xl text-forest">6</p>
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-moss">
                private acres
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Stay details */}
      <div className="edge relative mt-24">
        <Reveal className="flex flex-wrap items-baseline gap-x-8 gap-y-3 border-y border-moss/20 py-6">
          {[
            `${SITE.guests} guests`,
            `${SITE.bedrooms} bedrooms`,
            `${SITE.beds} beds`,
            `${SITE.baths} baths`,
            "Single level",
          ].map((s, i) => (
            <span key={s} className="flex items-baseline gap-8">
              <span className="font-display text-2xl text-forest">{s}</span>
              {i < 4 && <span className="h-4 w-px bg-moss/30" />}
            </span>
          ))}
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BEDROOMS.map((b, i) => (
            <Reveal
              key={b.name}
              delay={i * 90}
              className="rounded-2xl bg-paper-deep p-6 transition-colors hover:bg-paper-deep/70"
            >
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-amber">
                {b.detail}
              </p>
              <h3 className="mt-2 font-display text-lg text-forest">{b.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">{b.note}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
