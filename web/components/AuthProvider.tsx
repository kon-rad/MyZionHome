"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut as fbSignOut,
  type User,
} from "firebase/auth";
import { authConfigured, getClientAuth } from "@/lib/firebase-client";

type AuthCtx = {
  user: User | null;
  loading: boolean;
  configured: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  getToken: () => Promise<string | null>;
};

const Ctx = createContext<AuthCtx | null>(null);

export function useAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth must be used inside <AuthProvider>");
  return v;
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(authConfigured);

  useEffect(() => {
    const auth = getClientAuth();
    if (!auth) return;
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  const value = useMemo<AuthCtx>(
    () => ({
      user,
      loading,
      configured: authConfigured,
      async signInWithGoogle() {
        const auth = getClientAuth();
        if (!auth) throw new Error("Sign-in is not configured");
        const cred = await signInWithPopup(auth, new GoogleAuthProvider());
        // Create or refresh the profile document (server verifies the token).
        const token = await cred.user.getIdToken();
        await fetch("/api/profile", { method: "POST", headers: { Authorization: `Bearer ${token}` } });
      },
      async signOut() {
        const auth = getClientAuth();
        if (auth) await fbSignOut(auth);
      },
      async getToken() {
        return user ? user.getIdToken() : null;
      },
    }),
    [user, loading]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
