import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { ArrowIcon } from "@/components/Icons";
import { SITE } from "@/lib/data";
import { getAvailability } from "@/lib/availability";
import { nightlyRate, PRICING } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Availability",
  description: "Open and booked dates for the retreat in Zion, Illinois.",
};

export const revalidate = 900; // keep in step with SYNC_SECONDS

const MONTHS_AHEAD = 6;
const DOW = ["S", "M", "T", "W", "T", "F", "S"];
const iso = (y: number, m: number, d: number) =>
  `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

export default async function AvailabilityPage() {
  const { configured, booked, error, syncedAt } = await getAvailability();
  const bookedSet = new Set(booked);
  const now = new Date();
  const today = iso(now.getFullYear(), now.getMonth(), now.getDate());
  const months = Array.from({ length: MONTHS_AHEAD }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    return { y: d.getFullYear(), m: d.getMonth() };
  });

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
          <p className="eyebrow mt-6 text-amber-bright">Availability</p>
          <h1 className="mt-4 max-w-2xl font-display text-5xl font-light leading-tight sm:text-6xl">
            Find your dates.
          </h1>
          <p className="mt-4 max-w-lg text-cream/70">
            Open dates are shown below and stay in step with the booking calendar.
          </p>
        </div>
      </section>

      <section className="edge py-16">
        {!configured || error ? (
          <p className="max-w-xl text-ink/70">
            The live calendar is unavailable right now. Check dates directly on{" "}
            <a href={SITE.airbnbUrl} className="text-clay underline" target="_blank" rel="noopener noreferrer">
              the Airbnb listing
            </a>
            .
          </p>
        ) : (
          <>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {months.map(({ y, m }) => {
                const first = new Date(y, m, 1);
                const days = new Date(y, m + 1, 0).getDate();
                return (
                  <div key={`${y}-${m}`}>
                    <h2 className="font-display text-2xl font-light">
                      {first.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                    </h2>
                    <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs">
                      {DOW.map((d, i) => (
                        <div key={i} className="pb-1 font-mono text-[0.62rem] text-moss">{d}</div>
                      ))}
                      {Array.from({ length: first.getDay() }, (_, i) => <div key={`e${i}`} />)}
                      {Array.from({ length: days }, (_, i) => {
                        const date = iso(y, m, i + 1);
                        const past = date < today;
                        const taken = bookedSet.has(date);
                        const rate = !past && !taken ? nightlyRate(date) : null;
                        return (
                          <div
                            key={date}
                            title={taken ? "Booked" : past ? "" : "Available"}
                            className={
                              "flex aspect-square flex-col items-center justify-center rounded " +
                              (past
                                ? "text-ink/25"
                                : taken
                                  ? "bg-paper-deep text-ink/35 line-through"
                                  : "bg-moss/10 text-ink")
                            }
                          >
                            <span>{i + 1}</span>
                            {rate != null && (
                              <span className="text-[0.55rem] text-moss">${rate}</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-ink/60">
              <span className="flex items-center gap-2"><i className="h-3 w-3 rounded bg-moss/10 ring-1 ring-moss/30" /> Available</span>
              <span className="flex items-center gap-2"><i className="h-3 w-3 rounded bg-paper-deep" /> Booked</span>
              {PRICING.baseNightly != null && <span>Nightly rates in {PRICING.currency}</span>}
              {syncedAt && <span>Synced {new Date(syncedAt).toLocaleString("en-US", { timeZone: "America/Chicago" })} CT</span>}
            </div>
            <a href={SITE.airbnbUrl} target="_blank" rel="noopener noreferrer" className="btn-amber mt-10 inline-flex">
              Book these dates <ArrowIcon className="h-3.5 w-3.5" />
            </a>
          </>
        )}
      </section>

      <Footer />
    </main>
  );
}
