import { fetchArchive, fetchRecentAndForecast, todayLocal } from "@/lib/weather";
import { saveDays } from "@/lib/weather-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

// Daily from Vercel Cron (see vercel.json); Vercel sends `Authorization: Bearer $CRON_SECRET`.
// Optional one-off history load: GET /api/cron/weather?backfill=2023-01-01 (same auth).
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const backfill = new URL(req.url).searchParams.get("backfill");
    let archived = 0;
    if (backfill) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(backfill)) return new Response("Bad backfill date", { status: 400 });
      // The archive lags ~2 days; the daily job covers the most recent days.
      const end = new Date(`${todayLocal()}T00:00:00Z`);
      end.setUTCDate(end.getUTCDate() - 3);
      archived = await saveDays(await fetchArchive(backfill, end.toISOString().slice(0, 10)));
    }
    const recent = await saveDays(await fetchRecentAndForecast());
    return Response.json({ ok: true, saved: recent, backfilled: archived });
  } catch (err) {
    return new Response(`Weather job failed: ${(err as Error).message}`, { status: 502 });
  }
}
