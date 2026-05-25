import type { Metadata } from "next";
import Link from "next/link";
import { BundlePricingBuilder } from "@/components/site/pricing/BundlePricingBuilder";

export const metadata: Metadata = {
  title: "Pricing & packages",
  description:
    "Interactive pricing for photography, videography, social content support, and drone add-ons — bundle discounts, recurring savings, and multi-shoot volume capped at 30%.",
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "Pricing & packages | Invision Creative",
    description:
      "Live calculator: four tiers per category, Apple-style step-down value, bundle rules, and transparent savings.",
  },
};

export default function PricingPage() {
  return (
    <div className="mx-auto w-full max-w-[72rem] bg-[#0b0b0b] px-5 py-14 sm:px-7 sm:py-18 lg:px-10 lg:py-22">
      <header className="max-w-2xl border-b border-white/[0.06] pb-9">
        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--brand-creative)]">
          Pricing
        </p>
        <h1 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Packages & live estimate
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-400">
          Figures here are planning estimates — usually within about 90% of final numbers for the
          scope you configure. They may change after we review details, timeline, and
          deliverables together. Combining services applies a{" "}
          <span className="text-zinc-300">5%–10% bundle discount</span> (10% when photo, video, and
          social are all in the estimate).
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-[var(--brand-creative)] px-5 py-2.5 text-sm font-semibold text-black shadow-[0_4px_20px_-6px_color-mix(in_srgb,var(--brand-creative)_45%,transparent)] transition-[transform,box-shadow] hover:-translate-y-0.5"
          >
            Start a project
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-zinc-400 transition-colors hover:border-white/25 hover:text-white"
          >
            All services
          </Link>
        </div>
      </header>

      <div className="bg-[#0b0b0b] pt-12 lg:pt-14">
        <BundlePricingBuilder />
      </div>
    </div>
  );
}
