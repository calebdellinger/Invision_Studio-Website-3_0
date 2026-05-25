import Link from "next/link";
import { BrandSwitch } from "@/components/brand/BrandSwitch";

const MARKETING_URL = "https://invisionmarketing.io/";

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-black/40 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-10">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-center text-xs text-zinc-500 sm:text-left">
            © {new Date().getFullYear()} Invision Creative. Photography, video,
            social, and AI integrations.
          </p>
          <p className="text-center text-xs text-zinc-500">
            Need SEO, ads, or lead-focused web?{" "}
            <Link
              href={MARKETING_URL}
              className="text-[var(--brand-partner)] underline-offset-4 transition-colors hover:text-[var(--brand-partner)]/80 hover:underline"
            >
              Invision Marketing
            </Link>
          </p>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row sm:gap-6">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-[var(--brand-creative)] px-6 py-2.5 text-sm font-semibold text-black transition-opacity hover:opacity-90"
          >
            Contact
          </Link>
          <BrandSwitch />
        </div>
      </div>
    </footer>
  );
}
