"use client";

import { usePathname } from "next/navigation";

export function InternalTeamHeader() {
  const pathname = usePathname();
  const isLogin = pathname === "/internal/login";

  async function logout() {
    await fetch("/api/internal/session", { method: "DELETE" });
    window.location.href = "/internal/login";
  }

  if (isLogin) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => void logout()}
      className="rounded-md border border-black/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-200 transition-colors hover:border-black/25 hover:bg-white/10"
    >
      Sign out
    </button>
  );
}
