import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Suspense } from "react";
import { AutoOpenSocialPlatform } from "@/components/site/service/AutoOpenSocialPlatform";
import { SocialBundleSavingsEstimator } from "@/components/site/service/SocialBundleSavingsEstimator";
import { SocialPlatformStrengthGrid } from "@/components/site/service/SocialPlatformStrengthGrid";

export const metadata: Metadata = {
  title: "Social Media Management Services",
  description:
    "Social media management services with platform strategy, content systems, and bundled photo/video production to improve reach, trust, and ROI.",
  keywords: [
    "social media management services",
    "social media strategy",
    "content creation services",
    "social media and photography package",
    "social media and videography package",
    "instagram management",
    "youtube strategy",
    "social media agency",
    "social media content production",
  ],
  alternates: {
    canonical: "/services/social-media",
  },
  openGraph: {
    title: "Social Media Management Services | Invision Creative",
    description:
      "Platform strategy, content production, and bundled packages for social media growth.",
    images: [
      {
        url: "/brand/logo_white.svg",
        width: 1800,
        height: 1200,
        alt: "Mountain landscape representing cinematic content production and brand storytelling.",
      },
    ],
  },
};

export default function SocialMediaOverviewPage() {
  const faqItems = [
    {
      question:
        "What is included in your social media management service?",
      answer:
        "Our social media management includes strategy, content planning, publishing cadence, platform optimization, creative direction, and ongoing performance review.",
    },
    {
      question:
        "Why bundle social media with photography or videography?",
      answer:
        "Most execution effort is in creating high-quality content. Bundling social management with recurring shoots reduces duplicate planning, production overhead, and revision cycles.",
    },
    {
      question:
        "How much can bundling social media and content production save?",
      answer:
        "Savings depend on scope, but bundled workflows generally lower total monthly cost compared to hiring separate teams for social management and content production.",
    },
    {
      question:
        "How does this page support both SEO and GEO visibility?",
      answer:
        "We structure content with clear intent sections, platform-specific guidance, and FAQ schema so search engines and AI answer systems can better interpret service relevance.",
    },
  ] as const;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <Script
        id="social-media-faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Suspense fallback={null}>
        <AutoOpenSocialPlatform />
      </Suspense>
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <header className="max-w-4xl border-b border-white/[0.06] pb-12">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--brand-creative)]">
            Social media management
          </p>
          <h1 className="mt-4 text-4xl leading-[1.1] font-semibold tracking-tight text-white [font-family:var(--font-fraunces)] sm:text-5xl">
            Social media management that compounds
          </h1>
          <p className="mt-5 text-base leading-relaxed text-zinc-400">
            Social media management is where brands win attention, trust, and
            demand in real time. The goal is not to post more; it is to build a
            content system that compounds across platforms and revenue cycles.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-zinc-500">
            This page is structured for both SEO (search engine optimization)
            and GEO (generative engine optimization) so users and AI answer
            systems can clearly understand service value, platform fit, and
            outcomes.
          </p>
        </header>

        <section className="pt-14">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight text-white [font-family:var(--font-fraunces)] sm:text-4xl">
              Why does it matter?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-500">
              Select a platform tile to see where each network is strongest and
              which algorithm signals matter most for growth.
            </p>
          </div>
          <SocialPlatformStrengthGrid />
        </section>

        <section className="pt-14">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-semibold tracking-tight text-white [font-family:var(--font-fraunces)] sm:text-4xl">
              Bundle strategy: social + production
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-500">
              Most of the work is in the content itself. When social management
              and production are handled together, planning and execution become
              faster, more consistent, and more cost-efficient.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-500">
              Why pay a photographer or videographer separately each cycle when
              one bundled workflow can reduce overlap and save budget?
            </p>
          </div>
          <div className="mt-8">
            <SocialBundleSavingsEstimator />
          </div>
        </section>

        <section className="pt-14">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-semibold tracking-tight text-white [font-family:var(--font-fraunces)] sm:text-4xl">
              How we make it tangible
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-500">
              We build social around production, publishing, and performance
              loops so your team can feel momentum in measurable terms.
            </p>
          </div>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            <li className="rounded-2xl border border-white/[0.08] bg-[#111]/85 p-6 ring-1 ring-inset ring-white/[0.03]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--brand-creative)]">
                01 · Capture
              </p>
              <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">
                Production clarity
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                We plan visuals in batches so one shoot fuels multiple weeks of
                platform-ready content and campaign variations.
              </p>
            </li>
            <li className="rounded-2xl border border-white/[0.08] bg-[#111]/85 p-6 ring-1 ring-inset ring-white/[0.03]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--brand-creative)]">
                02 · Deploy
              </p>
              <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">
                Publishing rhythm
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                We assign each format a purpose: discovery, nurture, or
                conversion, so posting feels strategic instead of random.
              </p>
            </li>
            <li className="rounded-2xl border border-white/[0.08] bg-[#111]/85 p-6 ring-1 ring-inset ring-white/[0.03]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--brand-creative)]">
                03 · Optimize
              </p>
              <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">
                Performance feedback
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                We review platform signals each month and turn insights into the
                next round of creative, messaging, and targeting decisions.
              </p>
            </li>
          </ul>
        </section>

        <section className="pt-14">
          <h2 className="text-3xl font-semibold tracking-tight text-white [font-family:var(--font-fraunces)] sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-zinc-500">
            Quick answers for buyers comparing social media management services
            and bundled content production.
          </p>
          <div className="mt-6 space-y-3">
            {faqItems.map((item) => (
              <details
                key={item.question}
                className="group rounded-xl border border-white/[0.08] bg-[#111]/80 p-5 ring-1 ring-inset ring-white/[0.03]"
              >
                <summary className="cursor-pointer list-none text-sm font-semibold tracking-tight text-white">
                  {item.question}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="pt-14">
          <h2 className="text-3xl font-semibold tracking-tight text-white [font-family:var(--font-fraunces)] sm:text-4xl">
            Related services
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-500">
            Combine social with photo and video production for stronger
            multi-channel outcomes.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Link
              href="/services/photography"
              className="rounded-xl border border-white/[0.08] bg-[#111]/80 p-5 ring-1 ring-inset ring-white/[0.03] transition-[border-color,transform] hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--brand-creative)_35%,transparent)]"
            >
              <h3 className="text-lg font-semibold tracking-tight text-white">
                Photography services
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                Build a reusable still image library for monthly social campaigns.
              </p>
            </Link>
            <Link
              href="/services/videography"
              className="rounded-xl border border-white/[0.08] bg-[#111]/80 p-5 ring-1 ring-inset ring-white/[0.03] transition-[border-color,transform] hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--brand-creative)_35%,transparent)]"
            >
              <h3 className="text-lg font-semibold tracking-tight text-white">
                Videography services
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                Produce short and long-form motion assets for social distribution.
              </p>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
