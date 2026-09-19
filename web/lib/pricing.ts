// Nightly pricing. Airbnb's calendar export does not include prices and Airbnb has
// no public pricing API, so rates live here. Set baseNightly (USD) to show prices;
// leave it null to hide them.
export const PRICING = {
  currency: "USD",
  baseNightly: null as number | null,
  weekendNightly: null as number | null, // Fri and Sat nights; falls back to baseNightly
  // Overrides for date ranges (inclusive), e.g. { from: "2026-12-20", to: "2027-01-02", nightly: 300 }
  seasons: [] as { from: string; to: string; nightly: number }[],
};

export function nightlyRate(date: string): number | null {
  const season = PRICING.seasons.find((s) => date >= s.from && date <= s.to);
  if (season) return season.nightly;
  const dow = new Date(`${date}T00:00:00Z`).getUTCDay(); // 5 = Fri, 6 = Sat
  if ((dow === 5 || dow === 6) && PRICING.weekendNightly != null) return PRICING.weekendNightly;
  return PRICING.baseNightly;
}
