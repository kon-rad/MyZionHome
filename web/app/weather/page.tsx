import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { ArrowIcon } from "@/components/Icons";
import { SITE } from "@/lib/data";
import {
  describeCode,
  fetchArchive,
  fetchRecentAndForecast,
  todayLocal,
  type WeatherDay,
} from "@/lib/weather";
import { loadRange } from "@/lib/weather-store";

export const metadata: Metadata = {
  title: "Weather",
  description: "Seven-day forecast and searchable weather history for the retreat in Zion, Illinois.",
};

export const dynamic = "force-dynamic";

const MAX_DAYS = 366;
const ISO = /^\d{4}-\d{2}-\d{2}$/;
const addDays = (date: string, n: number) => {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
};
const fmt = (date: string, o: Intl.DateTimeFormatOptions) =>
  new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", { timeZone: "UTC", ...o });

async function loadForecast(today: string): Promise<WeatherDay[]> {
  try {
    const stored = await loadRange(today, addDays(today, 6));
    if (stored && stored.length >= 7) return stored;
  } catch {}
  return (await fetchRecentAndForecast()).filter((d) => d.date >= today).slice(0, 7);
}

async function loadHistory(from: string, to: string): Promise<{ days: WeatherDay[]; source: "database" | "live" }> {
  try {
    const stored = await loadRange(from, to);
    if (stored && stored.length) return { days: stored, source: "database" };
  } catch {}
  try {
    return { days: await fetchArchive(from, to), source: "live" };
  } catch {
    return { days: [], source: "live" };
  }
}

export default async function WeatherPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; to?: string }>;
}) {
  const sp = await searchParams;
  const today = todayLocal();
  let to = sp.to && ISO.test(sp.to) ? sp.to : today;
  if (to > today) to = today;
  let from = sp.from && ISO.test(sp.from) ? sp.from : addDays(to, -29);
  if (from > to) from = to;
  const tooLong = (new Date(to).getTime() - new Date(from).getTime()) / 86400000 + 1 > MAX_DAYS;
  if (tooLong) from = addDays(to, -(MAX_DAYS - 1));

  const [forecast, history] = await Promise.all([loadForecast(today), loadHistory(from, to)]);
  const { days, source } = history;
  const now = forecast[0];

  const avg = (xs: number[]) => (xs.length ? Math.round(xs.reduce((a, b) => a + b, 0) / xs.length) : 0);
  const hottest = days.reduce<WeatherDay | null>((m, d) => (!m || d.highF > m.highF ? d : m), null);
  const coldest = days.reduce<WeatherDay | null>((m, d) => (!m || d.lowF < m.lowF ? d : m), null);
  const precip = Math.round(days.reduce((s, d) => s + d.precipIn, 0) * 10) / 10;
  const lo = Math.min(...days.map((d) => d.lowF), 0);
  const hi = Math.max(...days.map((d) => d.highF), 1);

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
          <p className="eyebrow mt-6 text-amber-bright">Weather · {SITE.location}</p>
          <h1 className="mt-4 font-display text-5xl font-light leading-tight sm:text-6xl">
            {now ? `${now.highF}°F` : "Weather"}
            {now && <span className="ml-4 text-2xl text-cream/70">{describeCode(now.code)}</span>}
          </h1>
          {now && (
            <p className="mt-4 max-w-lg text-cream/70">
              Today&apos;s high {now.highF}°, low {now.lowF}°
              {now.precipIn > 0 ? `, ${now.precipIn}" precipitation` : ""}. Data from Open-Meteo,
              recorded daily.
            </p>
          )}
        </div>
      </section>

      <section className="edge py-16">
        <h2 className="font-display text-3xl font-light">Next 7 days</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          {forecast.map((d, i) => (
            <div key={d.date} className="rounded-lg border border-moss/15 bg-paper-deep/50 p-4">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-moss">
                {i === 0 ? "Today" : fmt(d.date, { weekday: "short", month: "short", day: "numeric" })}
              </p>
              <p className="mt-3 font-display text-3xl font-light text-ink">{d.highF}°</p>
              <p className="text-sm text-ink/60">Low {d.lowF}°</p>
              <p className="mt-2 text-sm text-ink/70">{describeCode(d.code)}</p>
              {d.precipIn > 0 && <p className="text-xs text-ink/50">{d.precipIn}&quot; precip</p>}
            </div>
          ))}
        </div>
      </section>

      <section className="edge pb-20">
        <h2 className="font-display text-3xl font-light">Weather history</h2>
        <form method="get" className="mt-6 flex flex-wrap items-end gap-4">
          <label className="text-sm text-ink/70">
            <span className="block font-mono text-[0.62rem] uppercase tracking-[0.18em] text-moss">From</span>
            <input type="date" name="from" defaultValue={from} max={today} className="mt-1 rounded border border-moss/30 bg-paper px-3 py-2" />
          </label>
          <label className="text-sm text-ink/70">
            <span className="block font-mono text-[0.62rem] uppercase tracking-[0.18em] text-moss">To</span>
            <input type="date" name="to" defaultValue={to} max={today} className="mt-1 rounded border border-moss/30 bg-paper px-3 py-2" />
          </label>
          <button type="submit" className="btn-amber">Search</button>
        </form>
        {tooLong && <p className="mt-3 text-sm text-clay">Ranges are limited to {MAX_DAYS} days; showing the most recent.</p>}

        {days.length === 0 ? (
          <p className="mt-8 max-w-xl text-ink/60">No weather recorded for {from} to {to}.</p>
        ) : (
          <>
            <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-5">
              {[
                ["Days", String(days.length)],
                ["Avg high", `${avg(days.map((d) => d.highF))}°F`],
                ["Avg low", `${avg(days.map((d) => d.lowF))}°F`],
                ["Hottest", hottest ? `${hottest.highF}°F` : "-"],
                ["Precipitation", `${precip}"`],
              ].map(([k, v]) => (
                <div key={k} className="rounded-lg border border-moss/15 p-4">
                  <dt className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-moss">{k}</dt>
                  <dd className="mt-1 font-display text-2xl font-light">{v}</dd>
                </div>
              ))}
            </dl>
            {coldest && <p className="mt-3 text-sm text-ink/60">Coldest night {coldest.lowF}°F on {fmt(coldest.date, { month: "short", day: "numeric", year: "numeric" })}.</p>}

            <div
              className="mt-8 flex h-48 items-end gap-px"
              role="img"
              aria-label={`Daily high and low temperatures from ${from} to ${to}`}
            >
              {days.map((d) => {
                const top = ((d.highF - lo) / (hi - lo)) * 100;
                const bottom = ((d.lowF - lo) / (hi - lo)) * 100;
                return (
                  <div key={d.date} className="relative h-full min-w-[2px] flex-1" title={`${d.date}: ${d.highF}° / ${d.lowF}°`}>
                    <div
                      className="absolute inset-x-0 rounded-sm bg-amber/70"
                      style={{ bottom: `${bottom}%`, height: `${Math.max(top - bottom, 2)}%` }}
                    />
                  </div>
                );
              })}
            </div>

            <div className="mt-8 max-h-[28rem] overflow-auto">
              <table className="w-full max-w-2xl text-left text-sm">
                <thead className="sticky top-0 bg-paper font-mono text-[0.68rem] uppercase tracking-[0.18em] text-moss">
                  <tr>
                    <th className="py-2 pr-6">Date</th>
                    <th className="py-2 pr-6">High</th>
                    <th className="py-2 pr-6">Low</th>
                    <th className="py-2 pr-6">Precip</th>
                    <th className="py-2">Conditions</th>
                  </tr>
                </thead>
                <tbody>
                  {[...days].reverse().map((d) => (
                    <tr key={d.date} className="border-t border-moss/10">
                      <td className="py-2 pr-6">{fmt(d.date, { month: "short", day: "numeric", year: "numeric" })}</td>
                      <td className="py-2 pr-6">{d.highF}°F</td>
                      <td className="py-2 pr-6">{d.lowF}°F</td>
                      <td className="py-2 pr-6">{d.precipIn}&quot;</td>
                      <td className="py-2">{describeCode(d.code)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {source === "live" && (
              <p className="mt-4 text-xs text-ink/45">Showing live archive data; stored history appears once the daily job has run.</p>
            )}
          </>
        )}
      </section>

      <Footer />
    </main>
  );
}
