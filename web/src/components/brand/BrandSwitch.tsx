"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

const MARKETING_URL = "https://invisionmarketing.io/";

/** Shown only on Invision Creative; highlights Creative, links to Marketing. */
export function BrandSwitch({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const reduceMotion = useReducedMotion();
  const creativeActive = true;
  const isLight = variant === "light";

  return (
    <div
      className={`relative flex items-center rounded-full p-0.5 transition-all duration-300 ${
        isLight
          ? "border border-zinc-200/80 bg-zinc-100"
          : "border border-black/10 bg-black/50 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
      }`}
      role="group"
      aria-label="Switch Invision brand"
    >
      <div className="relative grid grid-cols-2 text-[10px] font-bold uppercase tracking-[0.12em] sm:text-[11px]">
        <motion.span
          className={`pointer-events-none absolute inset-y-0 left-0 z-0 w-1/2 rounded-full ${
            isLight
              ? "bg-white border border-zinc-200/50 shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
              : "bg-gradient-to-br from-[var(--brand-creative)]/45 to-[var(--brand-creative)]/10 shadow-[0_0_28px_-6px_var(--brand-creative)]"
          }`}
          initial={false}
          animate={{ x: creativeActive ? "100%" : "0%" }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 420, damping: 34 }
          }
        />
        <Link
          href={MARKETING_URL}
          className={`relative z-10 flex min-w-[5.5rem] sm:min-w-[6rem] items-center justify-center rounded-full px-2 py-1 transition-colors ${
            isLight
              ? creativeActive
                ? "text-zinc-500 hover:text-zinc-800"
                : "text-zinc-900"
              : creativeActive
                ? "text-zinc-600 hover:text-zinc-600"
                : "text-zinc-900"
          }`}
        >
          Marketing
        </Link>
        <Link
          href="/"
          className={`relative z-10 flex min-w-[5.5rem] sm:min-w-[6rem] items-center justify-center rounded-full px-2 py-1 transition-colors ${
            isLight
              ? creativeActive
                ? "text-[var(--brand-creative)] font-extrabold"
                : "text-zinc-500 hover:text-zinc-800"
              : creativeActive
                ? "text-zinc-900"
                : "text-zinc-600 hover:text-zinc-600"
          }`}
        >
          Creative
        </Link>
      </div>
    </div>
  );
}
