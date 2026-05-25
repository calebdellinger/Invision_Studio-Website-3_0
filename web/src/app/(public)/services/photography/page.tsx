import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { ServicePageShell } from "@/components/site/service/ServicePageShell";

export const metadata: Metadata = {
  title: "Commercial Photography Services",
  description:
    "Commercial photography services for brand, product, and campaign marketing. Build trust, improve conversion quality, and create a reusable visual asset library.",
  keywords: [
    "commercial photography services",
    "brand photography",
    "product photography services",
    "marketing photography",
    "lifestyle photography",
    "creative agency photography",
    "campaign photography",
    "professional photography for business",
  ],
  alternates: {
    canonical: "/services/photography",
  },
  openGraph: {
    title: "Commercial Photography Services | Invision Creative",
    description:
      "Brand and product photography built for websites, ads, and social campaigns.",
    images: [
      {
        url: "/brand/logo_white.svg",
        width: 1600,
        height: 900,
        alt: "Invision Creative commercial photography services.",
      },
    ],
  },
};

// ─── Icons ───────────────────────────────────────────────────────────────────

function IconUsers() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconBox() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

function IconCamera() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

function IconZap() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function IconGlobe() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function IconShare() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

function IconTarget() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function IconPrint() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 6 2 18 2 18 9" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" />
    </svg>
  );
}

// ─── Photography type grid ────────────────────────────────────────────────────

function PhotoTypeGrid() {
  const types = [
    {
      Icon: IconUsers,
      label: "Brand Photography",
      tagline: "Tell your story before a word is read",
      description:
        "Team portraits, workspace environments, and culture moments that communicate who you are — authentically. Brand photography replaces skepticism with trust on first glance.",
      channels: ["About pages", "LinkedIn banners", "Press kits", "Email headers"],
    },
    {
      Icon: IconBox,
      label: "Product Photography",
      tagline: "Let quality speak for itself",
      description:
        "Clean, detailed imagery that eliminates purchase hesitation. When a prospect can clearly see what they're getting, the gap between interest and action closes fast.",
      channels: ["Product pages", "E-commerce", "Google Shopping", "Print catalogs"],
    },
    {
      Icon: IconCamera,
      label: "Lifestyle Photography",
      tagline: "Show your work in its natural habitat",
      description:
        "Contextual imagery that helps prospects picture themselves as your customer. Emotion over specification — the style of photo that makes people feel something before they decide.",
      channels: ["Social feeds", "Hero sections", "Ad creative", "Brochures"],
    },
    {
      Icon: IconZap,
      label: "Campaign Photography",
      tagline: "Hero visuals engineered to convert",
      description:
        "Custom imagery designed around a specific launch, promotion, or marketing moment. Every frame is intentional. Every image is built to stop the scroll and drive the next step.",
      channels: ["Paid ads", "Landing pages", "OOH / Billboards", "Magazine features"],
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {types.map(({ Icon, label, tagline, description, channels }) => (
        <div
          key={label}
          className="rounded-xl border border-white/[0.08] bg-[#0e0e0e] p-5 ring-1 ring-inset ring-white/[0.03]"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md border border-white/10 bg-[#111] text-[var(--brand-creative)]">
              <Icon />
            </span>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--brand-creative)]">
              {label}
            </p>
          </div>
          <p className="mt-3 text-[15px] font-semibold text-white">{tagline}</p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">{description}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {channels.map((ch) => (
              <span
                key={ch}
                className="rounded-full border border-white/[0.07] bg-white/[0.03] px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-zinc-500"
              >
                {ch}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Asset reuse map ──────────────────────────────────────────────────────────

function AssetReuseMap() {
  const categories = [
    {
      id: "web",
      label: "Website & Digital",
      Icon: IconGlobe,
      color: "blue",
      items: [
        { name: "Homepage Hero", desc: "Full-viewport banner that sets the first impression" },
        { name: "Service Pages", desc: "Mid-page context photos that support your copy" },
        { name: "Email Campaigns", desc: "Headers, seasonal promos, and product spotlights" },
      ],
    },
    {
      id: "social",
      label: "Social Media",
      Icon: IconShare,
      color: "pink",
      items: [
        { name: "Instagram Feed", desc: "Posts, carousels, and a cohesive profile grid" },
        { name: "Facebook Posts", desc: "Organic and boosted content across the platform" },
        { name: "LinkedIn", desc: "Company page updates, team announcements" },
      ],
    },
    {
      id: "ads",
      label: "Paid Advertising",
      Icon: IconTarget,
      color: "orange",
      items: [
        { name: "Meta Ads", desc: "Feed and Story placements on Facebook & Instagram" },
        { name: "Google Display", desc: "Remarketing banners and Display Network campaigns" },
        { name: "Out-of-Home", desc: "Billboards, transit, and large-format signage" },
      ],
    },
    {
      id: "print",
      label: "Print & Collateral",
      Icon: IconPrint,
      color: "amber",
      items: [
        { name: "Brochures", desc: "Leave-behinds, mailers, and sales materials" },
        { name: "Client Proposals", desc: "Professional project and service proposals" },
        { name: "Magazine / Press", desc: "Editorial features, advertorials, press coverage" },
      ],
    },
  ] as const;

  const colorMap = {
    blue: {
      badge: "border-blue-400/20 bg-blue-400/5 text-blue-400",
      icon: "border-blue-400/20 bg-blue-400/10 text-blue-400",
    },
    pink: {
      badge: "border-pink-400/20 bg-pink-400/5 text-pink-400",
      icon: "border-pink-400/20 bg-pink-400/10 text-pink-400",
    },
    orange: {
      badge: "border-orange-400/20 bg-orange-400/5 text-orange-400",
      icon: "border-orange-400/20 bg-orange-400/10 text-orange-400",
    },
    amber: {
      badge: "border-amber-400/20 bg-amber-400/5 text-amber-400",
      icon: "border-amber-400/20 bg-amber-400/10 text-amber-400",
    },
  };

  return (
    <div className="space-y-5">
      {/* Source card */}
      <div className="relative rounded-2xl border border-[color-mix(in_srgb,var(--brand-creative)_30%,transparent)] bg-[color-mix(in_srgb,var(--brand-creative)_6%,#0a0a0a)] p-6 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl border border-[color-mix(in_srgb,var(--brand-creative)_40%,transparent)] bg-[color-mix(in_srgb,var(--brand-creative)_14%,transparent)] text-[var(--brand-creative)]">
          <IconCamera />
        </div>
        <p className="mt-3 text-base font-semibold text-white [font-family:var(--font-montserrat)]">
          One Professional Photo Shoot
        </p>
        <p className="mt-1 text-sm text-zinc-400">
          A single session with Invision Creative builds a library of assets
          deployable across every channel you use — simultaneously.
        </p>
        <div className="absolute bottom-0 left-1/2 h-5 w-px -translate-x-1/2 translate-y-full bg-gradient-to-b from-[color-mix(in_srgb,var(--brand-creative)_50%,transparent)] to-transparent" aria-hidden />
      </div>

      {/* Destination grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {categories.map(({ id, label, Icon, color, items }) => {
          const c = colorMap[color];
          return (
            <div
              key={id}
              className="rounded-xl border border-white/[0.07] bg-[#0d0d0d] p-5"
            >
              <div className="mb-4 flex items-center gap-2.5">
                <span
                  className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md border ${c.icon}`}
                >
                  <Icon />
                </span>
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] ${c.badge}`}
                >
                  {label}
                </span>
              </div>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.name} className="flex items-start gap-2.5">
                    <span className="mt-[3px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--brand-creative)]" aria-hidden />
                    <div>
                      <p className="text-sm font-medium text-zinc-200">{item.name}</p>
                      <p className="text-xs leading-relaxed text-zinc-500">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Stats chart ──────────────────────────────────────────────────────────────

function PhotoStatsChart() {
  const stats = [
    {
      label: "Consumers say visuals are the #1 purchase influencer",
      value: 93,
      source: "Kissmetrics",
    },
    {
      label: "More views on content that includes imagery",
      value: 94,
      source: "Venngage",
    },
    {
      label: "Online shoppers who rate image quality as \"very important\"",
      value: 67,
      source: "BigCommerce",
    },
    {
      label: "Higher click-through rate with professional creative",
      value: 45,
      source: "HubSpot",
    },
    {
      label: "Faster property listings that close with professional photography",
      value: 32,
      source: "Redfin",
    },
  ];

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#0d0d0d] p-6 ring-1 ring-inset ring-white/[0.03]">
      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--brand-creative)]">
        Industry data
      </p>
      <h3 className="mt-2 text-xl font-semibold text-white [font-family:var(--font-montserrat)]">
        Why professional photography is non-negotiable
      </h3>
      <p className="mt-1 text-xs text-zinc-500">
        Sources: Kissmetrics · BigCommerce · Venngage · HubSpot · Redfin
      </p>
      <div className="mt-6 space-y-5">
        {stats.map((stat, i) => (
          <div key={stat.label}>
            <div className="mb-2 flex items-start justify-between gap-4">
              <p className="text-xs leading-snug text-zinc-400">{stat.label}</p>
              <p className="flex-shrink-0 text-sm font-bold text-[var(--brand-creative)]">
                {stat.value}%
              </p>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className="bar-grow-anim h-full rounded-full bg-[var(--brand-creative)]"
                style={{
                  width: `${stat.value}%`,
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Big stat callouts ────────────────────────────────────────────────────────

function BigStatRow() {
  const callouts = [
    { value: "94%", label: "more content views with images" },
    { value: "2.3×", label: "more social engagement" },
    { value: "93%", label: "of purchases are visually driven" },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {callouts.map(({ value, label }) => (
        <div
          key={label}
          className="rounded-xl border border-white/[0.08] bg-[#0d0d0d] p-4 text-center ring-1 ring-inset ring-white/[0.03]"
        >
          <p className="text-2xl font-bold text-[var(--brand-creative)] sm:text-3xl [font-family:var(--font-montserrat)]">
            {value}
          </p>
          <p className="mt-1 text-[11px] leading-snug text-zinc-500">{label}</p>
        </div>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PhotographyServicePage() {
  const faqItems = [
    {
      question: "What types of commercial photography does Invision Creative offer?",
      answer:
        "We produce brand photography, product photography, lifestyle photography, and campaign hero imagery — each mapped to a specific role in your marketing funnel, from trust-building to conversion.",
    },
    {
      question: "How many images will we walk away with after a shoot?",
      answer:
        "Every project is scoped individually, but most commercial sessions deliver 40–120+ final edited images, formatted and organized by intended use (web, social, print, ads). You'll always know exactly what you're getting before we start.",
    },
    {
      question: "Can we use the same photos across multiple channels?",
      answer:
        "That's the point. We plan every shoot with multi-channel deployment in mind — so a single set of images supports your website, paid ads, social content, print materials, and proposals without needing a separate session for each.",
    },
    {
      question: "How long does it take to get the final images?",
      answer:
        "Standard delivery is within 7–14 business days of the shoot date. Rush timelines are available for campaigns or launches with hard deadlines — just flag it during the project brief.",
    },
    {
      question: "Do we get full usage rights to the photos?",
      answer:
        "Yes. All commercial deliverables include full, unlimited usage rights. Your images, your business — use them however, wherever, and for as long as you need.",
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
        id="photography-faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ServicePageShell
        eyebrow="Photography"
        title="Commercial photography that performs"
        subtitle="Your visuals are the first thing a prospect evaluates — before they read a word of your copy. Professional photography is a trust signal, a memory cue, and a conversion asset that works across every channel you touch."
        introSlot={
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0b] ring-1 ring-inset ring-white/[0.03]">
            <div className="relative aspect-[16/9]">
              <Image
                src="/brand/logo_white.svg"
                alt="Cinematic commercial photography for brand and marketing campaigns."
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 896px"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15"
                aria-hidden
              />
            </div>
            <p className="border-t border-white/[0.06] px-4 py-3 text-xs tracking-wide text-zinc-500">
              Visual quality is your brand before the first conversation.
            </p>
          </div>
        }
        powerTitle="Four disciplines that build a complete visual identity"
        powerBody={<PhotoTypeGrid />}
        assetTitle="Shoot once. Deploy everywhere."
        assetBody={
          <div className="space-y-5">
            <p className="text-[15px] leading-relaxed text-zinc-400">
              Stock imagery looks like stock imagery. Competitors can use it too
              — and often do. A custom photo shoot creates a visual library that
              is entirely yours: unique, brand-matched, and deployable across
              every channel you use without ever returning to production.
            </p>
            <AssetReuseMap />
          </div>
        }
        compoundTitle="The business case, in numbers"
        compoundBody={
          <div className="space-y-5">
            <p className="text-[15px] leading-relaxed text-zinc-400">
              The ROI on professional imagery is well documented. Across
              industries, companies that invest in quality photography see
              measurable improvements in engagement, conversions, and time-to-decision.
            </p>
            <BigStatRow />
            <PhotoStatsChart />
          </div>
        }
        footerSlot={
          <div className="space-y-12">
            {/* What makes ours different */}
            <section className="rounded-2xl border border-white/[0.08] bg-[radial-gradient(circle_at_15%_20%,color-mix(in_srgb,var(--brand-creative)_10%,transparent),transparent_45%),#0f0f10] p-5 ring-1 ring-inset ring-white/[0.03] sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--brand-creative)]">
                    Our approach
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white [font-family:var(--font-fraunces)] sm:text-3xl">
                    Strategy before shutter
                  </h2>
                </div>
                <span className="inline-flex rounded-full border border-[color-mix(in_srgb,var(--brand-creative)_35%,transparent)] bg-[color-mix(in_srgb,var(--brand-creative)_14%,transparent)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--brand-creative)]">
                  Built to convert
                </span>
              </div>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400">
                Most photographers show up and shoot. We show up with a plan. Before
                the camera comes out, every image is mapped to a job — trust-building,
                product clarity, lifestyle aspiration, or conversion. That intent is
                what separates a gallery of pretty pictures from a visual system that
                actually moves a business forward.
              </p>
              <div className="mt-8">
                <ul className="grid gap-3 sm:grid-cols-3">
                  {[
                    {
                      id: "01",
                      label: "Clarity",
                      desc: "Sharp, intentional images explain quality faster than dense copy and reduce purchase uncertainty.",
                    },
                    {
                      id: "02",
                      label: "Consistency",
                      desc: "Repeating visual language across site and social builds recognition and signals professionalism.",
                    },
                    {
                      id: "03",
                      label: "Context",
                      desc: "Lifestyle and process images show real-world use and give prospects the confidence to move forward.",
                    },
                  ].map(({ id, label, desc }) => (
                    <li
                      key={id}
                      className="rounded-xl border border-white/[0.08] bg-[#111]/85 p-5 ring-1 ring-inset ring-white/[0.03]"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--brand-creative)]">
                          {label}
                        </p>
                        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-600">
                          {id}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                        {desc}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="text-2xl font-semibold tracking-tight text-white [font-family:var(--font-fraunces)] sm:text-3xl">
                Frequently asked questions
              </h2>
              <p className="mt-3 text-sm text-zinc-500">
                Answers to the questions clients ask before their first shoot.
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

            {/* Related services */}
            <section>
              <h2 className="text-2xl font-semibold tracking-tight text-white [font-family:var(--font-fraunces)] sm:text-3xl">
                Pair photography with
              </h2>
              <p className="mt-3 text-sm text-zinc-500">
                Photography works harder when it&#39;s connected to a full
                visual system.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  {
                    href: "/services/videography",
                    label: "Related service",
                    title: "Videography",
                    desc: "Combine stills and motion from the same session. One production day. Two content libraries. Cohesive campaigns across every channel.",
                  },
                  {
                    href: "/services/social-media",
                    label: "Related service",
                    title: "Social media content",
                    desc: "Turn your photo library into a platform-native content system — formatted, scheduled, and optimized for each channel's algorithm.",
                  },
                  {
                    href: "/work",
                    label: "Portfolio",
                    title: "See our work",
                    desc: "Review real visual outputs and campaign examples to evaluate style, range, and execution quality before starting a project.",
                  },
                ].map(({ href, label, title, desc }) => (
                  <Link
                    key={href}
                    href={href}
                    className="group rounded-xl border border-white/[0.08] bg-[#111]/80 p-5 ring-1 ring-inset ring-white/[0.03] transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--brand-creative)_35%,transparent)] hover:shadow-[0_0_30px_-10px_color-mix(in_srgb,var(--brand-creative)_30%,transparent)]"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--brand-creative)]">
                      {label}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold tracking-tight text-white">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                      {desc}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        }
      />
    </>
  );
}
