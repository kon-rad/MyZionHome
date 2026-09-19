import { getAvailability, SYNC_SECONDS } from "@/lib/availability";

export const runtime = "nodejs";

export async function GET() {
  const data = await getAvailability();
  return Response.json(data, {
    headers: { "Cache-Control": `public, s-maxage=${SYNC_SECONDS}, stale-while-revalidate` },
  });
}
