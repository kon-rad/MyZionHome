// Server-only Firestore access via the Admin SDK (bypasses the deny-all client rules).
// FIREBASE_SERVICE_ACCOUNT holds the service-account JSON, raw or base64.
// Returns null when unset so pages can fall back gracefully.
import { cert, getApps, initializeApp } from "firebase-admin/app";
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
