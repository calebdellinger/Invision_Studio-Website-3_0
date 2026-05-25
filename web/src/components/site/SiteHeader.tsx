import Link from "next/link";

const nav = [
  { href: "/services", label: "Services" },
  { href: "/showroom", label: "Showroom" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "My Story" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-[20px] z-50 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full items-center justify-between gap-3 overflow-hidden rounded-md border border-white/35 bg-white/22 px-4 py-[0.45rem] backdrop-blur-xl supports-[backdrop-filter]:bg-white/18 sm:gap-6 sm:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center pl-1 text-[var(--foreground)] sm:pl-2"
          aria-label="Invision Creative home"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- SVG lockup used directly for precise header sizing. */}
          <img
            src="/brand/logo_dark.svg"
            alt=""
            decoding="async"
            fetchPriority="high"
            className="block h-[var(--header-logo-height)] w-auto max-w-none shrink-0 object-contain"
          />
        </Link>

        <nav
          className="flex min-h-0 flex-1 flex-wrap items-center justify-end gap-x-3 gap-y-1 text-sm font-semibold text-[var(--brand-creative)] sm:gap-x-5 sm:text-base"
          aria-label="Primary"
        >
          {nav.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="transition-colors hover:text-[color-mix(in_oklab,var(--brand-creative)_80%,black)]"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
