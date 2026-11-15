"use client";

import Link from "next/link";
import { useAuth } from "./AuthProvider";

export default function AuthButton() {
  const { user, loading, configured } = useAuth();
  if (!configured || loading) return null;

  if (!user) {
    return (
      <Link
        href="/login"
        className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-cream/80 transition-colors hover:text-amber"
      >
        Sign in
      </Link>
    );
  }
  return (
    <Link href="/account" className="flex items-center gap-2" aria-label="Your account">
      {user.photoURL ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={user.photoURL} alt="" referrerPolicy="no-referrer" className="h-7 w-7 rounded-full border border-cream/30" />
      ) : (
        <span className="grid h-7 w-7 place-items-center rounded-full bg-amber font-mono text-xs text-forest">
          {(user.displayName ?? user.email ?? "?")[0].toUpperCase()}
        </span>
      )}
    </Link>
  );
}
