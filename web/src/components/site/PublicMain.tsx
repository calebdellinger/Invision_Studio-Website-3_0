"use client";

import { usePathname } from "next/navigation";

export function PublicMain({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <main
      className={`relative z-10 flex flex-1 flex-col pt-[var(--header-height)] ${
        isHome ? "bg-white" : "bg-black"
      }`}
    >
      {children}
    </main>
  );
}
