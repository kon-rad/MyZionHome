"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";

const messages: Record<string, string> = {
  "auth/popup-closed-by-user": "Sign-in was cancelled.",
  "auth/cancelled-popup-request": "Sign-in was cancelled.",
  "auth/popup-blocked": "Your browser blocked the sign-in window. Allow pop-ups and try again.",
  "auth/operation-not-allowed": "Google sign-in isn't enabled yet.",
  "auth/unauthorized-domain": "This domain isn't authorized for sign-in yet.",
};

export default function LoginPage() {
  const { user, loading, configured, signInWithGoogle } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (user) router.replace("/account");
  }, [user, router]);

  async function go() {
    setError(null);
    setBusy(true);
    try {
      await signInWithGoogle();
    } catch (e) {
      const code = (e as { code?: string }).code ?? "";
      setError(messages[code] ?? "Something went wrong signing in. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-forest px-4 text-cream">
      <div className="w-full max-w-sm text-center">
        <p className="eyebrow text-amber-bright">Welcome</p>
        <h1 className="mt-4 font-display text-4xl font-light">Sign in</h1>
        <p className="mt-3 text-sm text-cream/70">
          Use your Google account. We save your name, email and photo to your profile.
        </p>

        <button
          onClick={go}
          disabled={!configured || loading || busy}
          className="mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-cream px-6 py-3 text-sm font-medium text-ink transition hover:bg-white disabled:opacity-50"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
            <path fill="#4285F4" d="M23 12.3c0-.8-.1-1.5-.2-2.2H12v4.3h6.2a5.3 5.3 0 0 1-2.3 3.5v2.9h3.7c2.2-2 3.4-5 3.4-8.5z" />
            <path fill="#34A853" d="M12 24c3.1 0 5.7-1 7.6-2.8l-3.7-2.9c-1 .7-2.3 1.1-3.9 1.1-3 0-5.5-2-6.4-4.7H1.8v3A11.5 11.5 0 0 0 12 24z" />
            <path fill="#FBBC05" d="M5.6 14.7a6.9 6.9 0 0 1 0-4.4v-3H1.8a11.5 11.5 0 0 0 0 10.4l3.8-3z" />
            <path fill="#EA4335" d="M12 4.8c1.7 0 3.2.6 4.4 1.7l3.3-3.3A11.5 11.5 0 0 0 1.8 7.3l3.8 3C6.5 6.8 9 4.8 12 4.8z" />
          </svg>
          {busy ? "Signing in..." : "Continue with Google"}
        </button>

        {!configured && <p className="mt-4 text-sm text-clay">Sign-in isn&apos;t configured on this site.</p>}
        {error && <p role="alert" className="mt-4 text-sm text-amber-bright">{error}</p>}

        <Link href="/" className="mt-10 inline-block font-mono text-[0.68rem] uppercase tracking-[0.18em] text-cream/50 hover:text-amber-bright">
          ← Back home
        </Link>
      </div>
    </main>
  );
}
