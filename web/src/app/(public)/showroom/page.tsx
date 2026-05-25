import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Showroom",
  description:
    "Trade album showcases — dirt work & grading, concrete, demolition, and roofing.",
};

const showcases: { href: string; title: string; tag: string }[] = [
  {
    href: "/showroom/dirt-work",
    title: "Dirt Work / Grading",
    tag: "Earthwork",
  },
  {
    href: "/showroom/concrete",
    title: "Concrete",
    tag: "Flatwork",
  },
  {
    href: "/showroom/demo",
    title: "Demo",
    tag: "Demolition",
  },
  {
    href: "/showroom/roofing",
    title: "Roofing",
    tag: "Exteriors",
  },
];

export default function ShowroomPage() {
  return (
    <div className="flex flex-1 flex-col px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-zinc-600">
          Albums
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white [font-family:var(--font-montserrat)] sm:text-4xl">
          Showroom
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-500">
          Browse trade showcases pulled from live albums — pick a vertical below.
        </p>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:gap-5">
          {showcases.map(({ href, title, tag }) => (
            <li key={href}>
              <Link
                href={href}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#141414] p-6 shadow-[12px_18px_40px_-18px_rgba(0,0,0,0.75)] ring-1 ring-inset ring-white/[0.04] transition-[border-color,transform,box-shadow] hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--brand-creative)_35%,transparent)] hover:shadow-[14px_22px_48px_-16px_rgba(0,0,0,0.78)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-creative)]"
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--brand-creative)]">
                  {tag}
                </span>
                <span className="mt-3 font-serif text-2xl text-white">{title}</span>
                <span className="mt-4 text-xs font-medium text-zinc-500 transition-colors group-hover:text-zinc-400">
                  Open showcase →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
