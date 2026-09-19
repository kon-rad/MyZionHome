import { RATING_BREAKDOWN, REVIEWS, SITE } from "@/lib/data";
import Reveal from "./Reveal";
import { StarIcon } from "./Icons";

export default function Reviews() {
  return (
    <section id="reviews" className="bg-paper py-24 sm:py-32">
      <div className="edge">
        <Reveal className="flex flex-col gap-8 border-b border-moss/20 pb-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">Guest voices</p>
            <div className="mt-4 flex items-center gap-4">
              <span className="font-display text-6xl text-forest">{SITE.rating}</span>
              <div>
                <div className="flex gap-1 text-amber">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} className="h-4 w-4" />
                  ))}
                </div>
                <p className="mt-1 font-mono text-xs tracking-wide text-moss">
                  {SITE.reviewCount} reviews · 5 years hosting
                </p>
              </div>
            </div>
          </div>

          <div className="grid w-full max-w-md grid-cols-2 gap-x-8 gap-y-3">
            {RATING_BREAKDOWN.map((r) => (
              <div key={r.label} className="flex items-center gap-3">
                <span className="w-24 text-xs text-ink/70">{r.label}</span>
                <div className="relative h-1 flex-1 rounded-full bg-moss/15">
                  <span
                    className="absolute inset-y-0 left-0 rounded-full bg-forest"
                    style={{ width: `${(r.score / 5) * 100}%` }}
                  />
                </div>
                <span className="w-7 text-right font-mono text-xs text-forest">
                  {r.score}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {REVIEWS.map((r, i) => (
            <Reveal
              key={r.name + r.date}
              delay={(i % 3) * 90}
              className="mb-5 break-inside-avoid rounded-2xl border border-moss/15 bg-paper-deep/60 p-6"
            >
              <div className="flex gap-1 text-amber">
                {Array.from({ length: r.stars }).map((_, s) => (
                  <StarIcon key={s} className="h-3.5 w-3.5" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink/80">
                &ldquo;{r.text}&rdquo;
              </p>
              <p className="mt-4 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-moss">
                {r.name} · {r.from} · {r.date}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
