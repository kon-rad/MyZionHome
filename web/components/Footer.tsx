import Link from "next/link";
import { SITE, HOST, HOUSE_RULES } from "@/lib/data";
import Reveal from "./Reveal";
import { ArrowIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-forest text-cream">
      {/* Closing CTA */}
      <div className="relative border-b border-cream/10">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-amber/10 to-transparent" />
        <div className="edge relative py-24 text-center sm:py-32">
          <Reveal>
            <p className="eyebrow text-amber-bright">Your quiet is waiting</p>
            <h2 className="mx-auto mt-5 max-w-2xl font-display text-4xl font-light leading-tight sm:text-6xl">
              Come slow down among the trees.
            </h2>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <a
                href={SITE.airbnbUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-amber"
              >
                Check availability <ArrowIcon className="h-3.5 w-3.5" />
              </a>
              <Link href="/gallery" className="btn-ghost">
                Explore the gallery
              </Link>
            </div>
            <p className="mt-8 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-cream/55">
              This site is open source ·{" "}
              <a
                href={SITE.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-bright underline-offset-4 hover:underline"
              >
                Fork it on GitHub
              </a>
            </p>
          </Reveal>
        </div>
      </div>

      {/* Footer body */}
      <div className="edge grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-2xl">{SITE.name}</p>
          <p className="mt-3 max-w-xs text-sm text-cream/60">
            Secluded Retreat with Workspaces &amp; Nature Trails. {SITE.location}.
          </p>
          <p className="mt-4 flex items-center gap-2 font-mono text-xs text-amber-bright">
            ★ {SITE.rating} · {SITE.reviewCount} reviews
          </p>
        </div>

        <div>
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-cream/50">
            Explore
          </p>
          <ul className="mt-4 space-y-2 text-sm text-cream/75">
            <li><Link href="/#space" className="hover:text-amber-bright">The Space</Link></li>
            <li><Link href="/gallery" className="hover:text-amber-bright">Gallery</Link></li>
            <li><Link href="/#location" className="hover:text-amber-bright">Location</Link></li>
            <li><Link href="/guidebook" className="hover:text-amber-bright">Guidebook</Link></li>
            <li><Link href="/#reviews" className="hover:text-amber-bright">Reviews</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-cream/50">
            House rules
          </p>
          <ul className="mt-4 space-y-2 text-sm text-cream/75">
            {HOUSE_RULES.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-cream/50">
            Your host
          </p>
          <p className="mt-4 font-display text-lg">{HOST.name}</p>
          <p className="mt-1 text-sm text-cream/70">
            {HOST.years} years hosting · responds {HOST.responseTime}
          </p>
          <p className="mt-3 text-sm text-cream/60">{HOST.bio}</p>
        </div>
      </div>

      <div className="edge flex flex-col items-center justify-between gap-3 border-t border-cream/10 py-6 text-center sm:flex-row sm:text-left">
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-cream/40">
          © {new Date().getFullYear()} {SITE.name} · Zion, Illinois
        </p>
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-cream/40">
          <a href={SITE.repoUrl} target="_blank" rel="noopener noreferrer" className="hover:text-amber-bright">
            Open source on GitHub
          </a>
          {" · "}Ask the concierge, bottom right ↘
        </p>
      </div>
    </footer>
  );
}
