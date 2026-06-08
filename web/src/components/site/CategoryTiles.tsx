"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { WORK_CATEGORIES } from "@/data/workCategories";
import { ServiceTypeIcon } from "@/components/site/service/ServiceTypeIcon";

function ServiceCard({ cat, index }: { cat: typeof WORK_CATEGORIES[0]; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={cat.href}
        className="group relative block aspect-[4/5] sm:aspect-square lg:aspect-[4/5] overflow-hidden rounded-2xl bg-zinc-50 border border-zinc-200 shadow-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:border-zinc-300"
      >
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-zinc-50/50 to-zinc-100 opacity-50 group-hover:opacity-100 transition-opacity" />

        {/* Icon Container with Drop Shadow */}
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="relative h-20 w-20 text-zinc-900 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2">
            <ServiceTypeIcon 
              id={cat.iconId} 
              className="h-full w-full drop-shadow-[0_10px_15px_rgba(0,0,0,0.1)] transition-all group-hover:drop-shadow-[0_20px_25px_rgba(0,0,0,0.15)]"
            />
            {/* Subtle glow behind icon */}
            <div className="absolute inset-0 -z-10 bg-[var(--brand-creative)]/10 blur-2xl opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="h-px w-6 bg-[var(--brand-creative)] transition-all group-hover:w-10" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          
          <h3 className="mt-3 font-serif text-2xl tracking-tight text-zinc-950">
            {cat.title}
          </h3>
          
          <p className="mt-2 text-xs font-medium leading-relaxed text-zinc-500">
            {cat.tagline}
          </p>
        </div>

        {/* Technical Corner Marking */}
        <div className="absolute right-4 top-4 h-8 w-8 opacity-20 transition-opacity group-hover:opacity-60">
           <div className="absolute right-0 top-0 h-2 w-2 border-r border-t border-zinc-900" />
           <div className="absolute left-0 bottom-0 h-1 w-1 rounded-full bg-[var(--brand-creative)]" />
        </div>
      </Link>
    </motion.li>
  );
}

/** Home: full-width “What we do” tile grid — deep-links to service detail routes. */
export function CategoryTiles() {
  return (
    <section
      className="bg-white px-4 py-32 sm:px-6 lg:px-8 border-t border-zinc-100"
      aria-labelledby="what-we-do-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400">
            Pillars of execution
          </p>
          <h2
            id="what-we-do-heading"
            className="mt-6 font-serif text-[clamp(2rem,5vw,4rem)] leading-[0.9] tracking-tight text-zinc-950"
          >
            Explore by service
          </h2>
          <p className="mt-8 max-w-xl text-sm leading-relaxed text-zinc-500 font-medium">
            Precision engineering across five core creative domains. Discover how our workflows scale photorealism and narrative pacing for modern brands.
          </p>
        </div>

        <ul className="mt-24 grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {WORK_CATEGORIES.map((cat, i) => (
            <ServiceCard key={cat.href} cat={cat} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
