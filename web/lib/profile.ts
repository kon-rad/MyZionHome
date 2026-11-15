// User profile documents: `users/{uid}`. Written only by the server after the
// caller's Firebase ID token has been verified.
import { getDb } from "./firebase";

export type Profile = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  provider: string;
  createdAt: string;
  lastLoginAt: string;
};

export async function upsertProfile(t: {
  uid: string;
  email?: string;
  name?: string;
  picture?: string;
  firebase?: { sign_in_provider?: string };
}): Promise<Profile> {
  const db = getDb();
  if (!db) throw new Error("Database is not configured");
  const ref = db.collection("users").doc(t.uid);
  const now = new Date().toISOString();
  return db.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    const existing = snap.exists ? (snap.data() as Profile) : null;
    const profile: Profile = {
      uid: t.uid,
      email: t.email ?? null,
      displayName: t.name ?? existing?.displayName ?? null,
      photoURL: t.picture ?? existing?.photoURL ?? null,
      provider: t.firebase?.sign_in_provider ?? "google.com",
      createdAt: existing?.createdAt ?? now,
      lastLoginAt: now,
    };
    tx.set(ref, profile);
    return profile;
  });
}

export async function getProfile(uid: string): Promise<Profile | null> {
  const db = getDb();
  if (!db) return null;
  const snap = await db.collection("users").doc(uid).get();
  return snap.exists ? (snap.data() as Profile) : null;
}
