import { AMENITY_GROUPS } from "@/lib/data";
import Reveal from "./Reveal";

export default function Amenities() {
  return (
    <section id="amenities" className="bg-paper py-24 sm:py-32">
      <div className="edge">
        <Reveal className="max-w-xl">
          <p className="eyebrow">What this place offers</p>
          <h2 className="mt-4 font-display text-4xl font-light leading-tight text-forest sm:text-5xl">
            Fifty-three amenities, quietly considered.
          </h2>
          <p className="mt-5 text-ink/70">
            Everything for focused work and slow rest, from a standing-desk office
            with a door to a fire pit under the trees.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {AMENITY_GROUPS.map((g, i) => (
            <Reveal key={g.label} delay={i * 80}>
              <h3 className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-amber">
                {g.label}
              </h3>
              <ul className="mt-4 space-y-3 border-t border-moss/20 pt-4">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-ink/80"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sage" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
