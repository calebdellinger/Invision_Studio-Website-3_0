"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

const MARKETING_URL = "https://invisionmarketing.io/";

/** Shown only on Invision Creative; highlights Creative, links to Marketing. */
export function BrandSwitch() {
  const reduceMotion = useReducedMotion();
  const creativeActive = true;

  return (
    <div
      className="relative flex items-center rounded-full border border-white/10 bg-black/50 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md"
      role="group"
      aria-label="Switch Invision brand"
    >
      <div className="relative grid grid-cols-2 text-[11px] font-semibold uppercase tracking-[0.12em] sm:text-xs">
        <motion.span
          className="pointer-events-none absolute inset-y-0 left-0 z-0 w-1/2 rounded-full bg-gradient-to-br from-[var(--brand-creative)]/45 to-[var(--brand-creative)]/10 shadow-[0_0_28px_-6px_var(--brand-creative)]"
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
          className={`relative z-10 flex min-w-[7.25rem] items-center justify-center rounded-full px-3 py-2 transition-colors sm:min-w-[8.25rem] ${
            creativeActive ? "text-zinc-500 hover:text-zinc-300" : "text-white"
          }`}
        >
          Marketing
        </Link>
        <Link
          href="/"
          className={`relative z-10 flex min-w-[7.25rem] items-center justify-center rounded-full px-3 py-2 transition-colors sm:min-w-[8.25rem] ${
            creativeActive ? "text-white" : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          Creative
        </Link>
      </div>
    </div>
  );
}
