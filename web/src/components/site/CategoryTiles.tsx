import Link from "next/link";
import { WORK_CATEGORIES } from "@/data/workCategories";

/** Home: full-width “What we do” tile grid — deep-links to service detail routes. */
export function CategoryTiles() {
  return (
    <section
      className="border-t border-zinc-200 bg-white px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
      aria-labelledby="what-we-do-heading"
    >
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--brand-creative)]">
          What we do
        </p>
        <h2
          id="what-we-do-heading"
          className="mt-3 font-serif text-3xl tracking-tight text-zinc-900 sm:text-4xl"
        >
          Explore by service
        </h2>

        <ul className="mt-10 grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WORK_CATEGORIES.map((cat, i) => (
            <li key={cat.href}>
              <Link
                href={cat.href}
                className="group relative flex min-h-[200px] flex-col justify-end overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-6 ring-1 ring-inset ring-white/[0.04] transition-[border-color,box-shadow] duration-300 hover:border-[color-mix(in_srgb,var(--brand-creative)_35%,transparent)] hover:shadow-[0_0_40px_-8px_color-mix(in_srgb,var(--brand-creative)_25%,transparent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-creative)]"
              >
                <span
                  className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full opacity-[0.07] transition-opacity duration-300 group-hover:opacity-[0.12]"
                  style={{
                    background: `radial-gradient(circle at center, var(--brand-creative), transparent 70%)`,
                  }}
                  aria-hidden
                />
                <span
                  className="pointer-events-none absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent"
                  aria-hidden
                />
                <span className="text-[10px] font-medium tabular-nums text-zinc-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mt-3 font-serif text-xl leading-tight text-white sm:text-2xl">
                  {cat.title}
                </span>
                <span className="mt-2 text-xs leading-relaxed text-zinc-500">
                  {cat.tagline}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
