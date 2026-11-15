// Server-only Firestore access via the Admin SDK (bypasses the deny-all client rules).
// FIREBASE_SERVICE_ACCOUNT holds the service-account JSON, raw or base64.
// Returns null when unset so pages can fall back gracefully.
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

export function getDb(): Firestore | null {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!raw) return null;
  if (!getApps().length) {
    const json = raw.trim().startsWith("{") ? raw : Buffer.from(raw, "base64").toString("utf8");
    initializeApp({ credential: cert(JSON.parse(json)) });
  }
  return getFirestore();
}

// Verifies a Firebase ID token from an `Authorization: Bearer <token>` header.
// Returns the decoded token, or null when missing, invalid, or auth is unconfigured.
export async function verifyBearer(req: Request) {
  const header = req.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token || !getDb()) return null; // getDb() also initializes the admin app
  try {
    return await getAuth().verifyIdToken(token);
  } catch {
    return null;
  }
}
