import { verifyBearer } from "@/lib/firebase";
import { getProfile, upsertProfile } from "@/lib/profile";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// POST: called right after sign-in; creates the profile or refreshes lastLoginAt.
export async function POST(req: Request) {
  const token = await verifyBearer(req);
  if (!token) return new Response("Unauthorized", { status: 401 });
  try {
    return Response.json(await upsertProfile(token));
  } catch {
    return new Response("Could not save profile", { status: 500 });
  }
}

// GET: the signed-in user's own profile.
export async function GET(req: Request) {
  const token = await verifyBearer(req);
  if (!token) return new Response("Unauthorized", { status: 401 });
  const profile = await getProfile(token.uid);
  return profile ? Response.json(profile) : new Response("Not found", { status: 404 });
}
