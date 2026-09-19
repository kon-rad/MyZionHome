import { DRIVE_TIMES, SITE } from "@/lib/data";
import Reveal from "./Reveal";
import { PinIcon } from "./Icons";

export default function LocationMap() {
  const { approxLat: lat, approxLng: lng } = SITE;
  const bbox = `${lng - 0.09},${lat - 0.07},${lng + 0.09},${lat + 0.07}`;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;
  const maxMin = DRIVE_TIMES[DRIVE_TIMES.length - 1].min;

  return (
    <section id="location" className="bg-paper-deep py-24 sm:py-32">
      <div className="edge grid gap-12 lg:grid-cols-2 lg:items-start">
        <Reveal>
          <p className="eyebrow">Where you&rsquo;ll be</p>
          <h2 className="mt-4 font-display text-4xl font-light leading-tight text-forest sm:text-5xl">
            Secluded, yet close to everything.
          </h2>
          <p className="mt-5 max-w-md text-ink/75 leading-relaxed">
            {SITE.location}, minutes from the Wisconsin border and midway between
            Chicago and Milwaukee. Far from neighbors, with corn fields on one side.
            The exact address is shared after booking.
          </p>

          <div className="mt-8 overflow-hidden rounded-2xl border border-moss/25 shadow-lg">
            <iframe
              title="Approximate location map"
              src={src}
              className="h-[340px] w-full grayscale-[0.15]"
              loading="lazy"
            />
          </div>
          <p className="mt-3 flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-moss">
            <PinIcon className="h-3.5 w-3.5" /> Approximate area · exact pin after booking
          </p>
        </Reveal>

        <Reveal delay={150}>
          <h3 className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-amber">
            Drive times
          </h3>
          <ul className="mt-5">
            {DRIVE_TIMES.map((d) => (
              <li
                key={d.place}
                className="group flex items-center gap-4 border-b border-moss/15 py-3.5"
              >
                <span className="w-14 shrink-0 font-display text-2xl text-forest">
                  {d.min}
                  <span className="ml-0.5 text-xs text-moss">m</span>
                </span>
                <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-moss/15">
                  <span
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-sage to-amber"
                    style={{ width: `${(d.min / maxMin) * 100}%` }}
                  />
                </div>
                <span className="w-40 shrink-0 text-right text-sm text-ink/80">
                  {d.place}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
