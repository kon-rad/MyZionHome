"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import type { Profile } from "@/lib/profile";

export default function AccountPage() {
  const { user, loading, signOut, getToken } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const token = await getToken();
      const res = await fetch("/api/profile", { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) setProfile(await res.json());
    })();
  }, [user, getToken]);

  if (!user) return <main className="min-h-screen bg-paper" />;

  const fmt = (iso?: string) =>
    iso ? new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "-";

  return (
    <main className="min-h-screen bg-paper pb-20 pt-32">
      <div className="edge max-w-xl">
        <p className="eyebrow text-moss">Account</p>
        <div className="mt-6 flex items-center gap-4">
          {user.photoURL && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.photoURL} alt="" referrerPolicy="no-referrer" className="h-16 w-16 rounded-full" />
          )}
          <div>
            <h1 className="font-display text-3xl font-light">{user.displayName ?? "Your profile"}</h1>
            <p className="text-ink/60">{user.email}</p>
          </div>
        </div>

        <dl className="mt-8 grid grid-cols-2 gap-4 text-sm">
          <div><dt className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-moss">Member since</dt><dd className="mt-1">{fmt(profile?.createdAt)}</dd></div>
          <div><dt className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-moss">Last sign-in</dt><dd className="mt-1">{fmt(profile?.lastLoginAt)}</dd></div>
        </dl>

        <div className="mt-10 flex gap-4">
          <button onClick={async () => { await signOut(); router.replace("/"); }} className="btn-amber">Sign out</button>
          <Link href="/" className="btn-ghost text-ink">Home</Link>
        </div>
      </div>
    </main>
  );
}
