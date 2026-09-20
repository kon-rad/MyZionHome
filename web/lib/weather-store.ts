// Firestore persistence for weather. One document per local date in `weather_days`,
// keyed by YYYY-MM-DD. Re-running overwrites: a forecast doc is replaced by a newer
// forecast, and later by the observed values once the day has passed.
import { getDb } from "./firebase";
import type { WeatherDay } from "./weather";

const COL = "weather_days";

export async function saveDays(days: WeatherDay[]): Promise<number> {
  const db = getDb();
  if (!db) throw new Error("FIREBASE_SERVICE_ACCOUNT is not set");
  for (let i = 0; i < days.length; i += 400) {
    const batch = db.batch();
    for (const d of days.slice(i, i + 400)) {
      batch.set(db.collection(COL).doc(d.date), { ...d, updatedAt: new Date().toISOString() });
    }
    await batch.commit();
  }
  return days.length;
}

// Inclusive date range, oldest first. Returns null if the database is not configured.
export async function loadRange(from: string, to: string): Promise<WeatherDay[] | null> {
  const db = getDb();
  if (!db) return null;
  const snap = await db
    .collection(COL)
    .where("date", ">=", from)
    .where("date", "<=", to)
    .orderBy("date")
    .get();
  return snap.docs.map((d) => d.data() as WeatherDay);
}
