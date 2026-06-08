"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function InternalLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      const res = await fetch("/api/internal/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        setError(data?.error ?? "Could not sign in");
        setPending(false);
        return;
      }
      const from = searchParams.get("from");
      router.push(from && from.startsWith("/internal") ? from : "/internal");
      router.refresh();
    } catch {
      setError("Network error");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-sm space-y-4 rounded-lg border border-black/10 bg-white/30 p-6 backdrop-blur">
      <label className="block text-sm text-zinc-600">
        Password
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 w-full rounded-md border border-black/15 bg-black/40 px-3 py-2 text-sm text-zinc-900 outline-none ring-[var(--brand-creative)]/40 focus:border-[var(--brand-creative)]/50 focus:ring-2"
          required
        />
      </label>
      {error ? <p className="text-sm text-red-400">{error}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-md bg-[var(--brand-creative)] px-4 py-2 text-sm font-semibold text-black transition-opacity disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
