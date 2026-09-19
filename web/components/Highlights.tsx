import { HIGHLIGHTS } from "@/lib/data";
import { ICONS } from "./Icons";
import Reveal from "./Reveal";

export default function Highlights() {
  return (
    <section className="edge relative -mt-16 z-10 pb-20 sm:-mt-20">
      <div className="grid gap-4 sm:grid-cols-3">
        {HIGHLIGHTS.map((h, i) => {
          const Icon = ICONS[h.icon];
          return (
            <Reveal
              key={h.title}
              delay={i * 120}
              className="group rounded-2xl border border-moss/15 bg-paper-deep/80 p-7 backdrop-blur-sm transition-all duration-500 hover:border-amber/50 hover:shadow-[0_20px_50px_-24px_rgba(32,48,31,0.5)]"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full bg-forest text-amber-bright transition-colors group-hover:bg-amber group-hover:text-forest">
                <span className="h-5 w-5">
                  <Icon />
                </span>
              </span>
              <h3 className="mt-5 font-display text-xl text-forest">{h.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{h.body}</p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
