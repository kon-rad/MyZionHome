// Availability synced from the Airbnb calendar export. Server-only.
// AIRBNB_ICAL_URL: Airbnb > Calendar > Availability settings > Connect calendars >
// Export calendar. Treat the URL as a secret; it is unguessable but unauthenticated.
import { bookedNights, parseIcsRanges } from "./ical";

export type Availability = {
  configured: boolean;
  booked: string[]; // sorted YYYY-MM-DD nights that are unavailable
  syncedAt: string | null;
  error?: string;
};

export const SYNC_SECONDS = 900; // re-fetch from Airbnb at most every 15 minutes

export async function getAvailability(): Promise<Availability> {
  const url = process.env.AIRBNB_ICAL_URL;
  if (!url) return { configured: false, booked: [], syncedAt: null };
  try {
    const res = await fetch(url, { next: { revalidate: SYNC_SECONDS } });
    if (!res.ok) throw new Error(`Airbnb calendar responded ${res.status}`);
    const booked = [...bookedNights(parseIcsRanges(await res.text()))].sort();
    return { configured: true, booked, syncedAt: new Date().toISOString() };
  } catch (e) {
    return { configured: true, booked: [], syncedAt: null, error: (e as Error).message };
  }
}
