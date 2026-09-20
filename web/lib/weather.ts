// Weather data from Open-Meteo (free, no API key). Server-only.
//   forecast API: next 7 days plus a few recent days (reanalysis, effectively observed)
//   archive API:  long-range history, used for backfilling and as a no-database fallback
import { SITE } from "./data";

export type WeatherDay = {
  date: string; // YYYY-MM-DD, property-local (America/Chicago)
  highF: number;
  lowF: number;
  precipIn: number;
  code: number; // WMO weather code
  kind: "forecast" | "observed";
};

const TZ = "America/Chicago";
const DAILY = "temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code";

const localToday = () =>
  new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(new Date()); // YYYY-MM-DD

function base(): URLSearchParams {
  return new URLSearchParams({
    latitude: String(SITE.approxLat),
    longitude: String(SITE.approxLng),
    daily: DAILY,
    temperature_unit: "fahrenheit",
    precipitation_unit: "inch",
    timezone: TZ,
  });
}

function toDays(daily: any, today: string): WeatherDay[] {
  const out: WeatherDay[] = [];
  daily.time.forEach((date: string, i: number) => {
    const high = daily.temperature_2m_max[i];
    const low = daily.temperature_2m_min[i];
    if (high == null || low == null) return; // archive lags a couple of days
    out.push({
      date,
      highF: Math.round(high),
      lowF: Math.round(low),
      precipIn: Math.round((daily.precipitation_sum[i] ?? 0) * 100) / 100,
      code: daily.weather_code[i] ?? 0,
      kind: date < today ? "observed" : "forecast",
    });
  });
  return out;
}

async function get(url: string) {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Open-Meteo responded ${res.status}`);
  return res.json();
}

// Today + next 6 days as forecast, plus the last 3 days as observed.
export async function fetchRecentAndForecast(): Promise<WeatherDay[]> {
  const p = base();
  p.set("past_days", "3");
  p.set("forecast_days", "7");
  const j = await get(`https://api.open-meteo.com/v1/forecast?${p}`);
  return toDays(j.daily, localToday());
}

// Observed history for a date range (inclusive), from the archive API.
export async function fetchArchive(from: string, to: string): Promise<WeatherDay[]> {
  const p = base();
  p.set("start_date", from);
  p.set("end_date", to);
  const j = await get(`https://archive-api.open-meteo.com/v1/archive?${p}`);
  return toDays(j.daily, localToday());
}

export const todayLocal = localToday;

// WMO weather interpretation codes -> label.
export function describeCode(code: number): string {
  if (code === 0) return "Clear";
  if (code <= 2) return "Partly cloudy";
  if (code === 3) return "Overcast";
  if (code === 45 || code === 48) return "Fog";
  if (code >= 51 && code <= 57) return "Drizzle";
  if (code >= 61 && code <= 67) return "Rain";
  if (code >= 71 && code <= 77) return "Snow";
  if (code >= 80 && code <= 82) return "Showers";
  if (code === 85 || code === 86) return "Snow showers";
  if (code >= 95) return "Thunderstorms";
  return "Mixed";
}
