import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ServicePageShell } from "@/components/site/service/ServicePageShell";

export const metadata: Metadata = {
  title: "Commercial Videography Services",
  description:
    "Commercial videography for brand films, testimonials, social reels, and product video. Motion content that earns attention, builds trust, and converts.",
  keywords: [
    "commercial videography services",
    "brand film production",
    "testimonial video",
    "social media video content",
    "product video",
    "corporate video production",
    "drone videography",
    "marketing video services",
  ],
  alternates: {
    canonical: "/services/videography",
  },
  openGraph: {
    title: "Commercial Videography Services | Invision Creative",
    description:
      "Motion content built for brand films, social platforms, ads, and long-term archive.",
    images: [
      {
        url: "/brand/logo_white.svg",
        width: 1600,
        height: 900,
        alt: "Invision Creative commercial videography services.",
      },
    ],
  },
};

// ─── Icons ───────────────────────────────────────────────────────────────────

interface IconProps {
  className?: string;
}

function IconFilm({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
      <line x1="7" y1="2" x2="7" y2="22" />
      <line x1="17" y1="2" x2="17" y2="22" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="2" y1="7" x2="7" y2="7" />
      <line x1="2" y1="17" x2="7" y2="17" />
      <line x1="17" y1="17" x2="22" y2="17" />
      <line x1="17" y1="7" x2="22" y2="7" />
    </svg>
  );
}

function IconStar({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

// Rename this function to avoid naming conflict with global/local type, and accept className
function IconVideo({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  );
}

function IconWind({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
    </svg>
  );
}

function IconSmartphone({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  );
}

function IconCalendar({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function IconScissors({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <line x1="20" y1="4" x2="8.12" y2="15.88" />
      <line x1="14.47" y1="14.48" x2="20" y2="20" />
      <line x1="8.12" y1="8.12" x2="12" y2="12" />
    </svg>
  );
}

function IconLayers({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

function IconTarget({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
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

// ─── Video type grid ──────────────────────────────────────────────────────────

function VideoTypeGrid() {
  const types = [
    {
      Icon: IconFilm,
      label: "Brand Films",
      tagline: "Your story, cinematically told",
      description:
        "60–120 second productions that communicate who you are, what you stand for, and why it matters — the video that lives on your homepage and closes the gap between stranger and believer.",
      formats: ["Homepage hero video", "About page", "Trade shows", "Pitch decks"],
    },
    {
      Icon: IconStar,
      label: "Testimonial Videos",
      tagline: "Your best clients do the selling",
      description:
        "Real customers, real results, real emotion. Testimonial video is the highest-trust content format because it removes you from the equation entirely and lets your work speak through someone else's experience.",
      formats: ["Sales pages", "Google Ads", "Email campaigns", "Case studies"],
    },
    {
      Icon: IconVideo,
      label: "Product & Service Videos",
      tagline: "Show exactly what you deliver",
      description:
        "Demonstrate your service in action — before a prospect ever picks up the phone. Product and service videos answer objections, clarify scope, and pre-sell the client on choosing you.",
      formats: ["Product pages", "Landing pages", "YouTube", "Sales decks"],
    },
    {
      Icon: IconSmartphone,
      label: "Social Reels & Shorts",
      tagline: "Native content for native platforms",
      description:
        "Platform-optimized vertical content for TikTok, Instagram Reels, and YouTube Shorts. Shot and edited for the way people actually consume — fast, visual, and built for the algorithm.",
      formats: ["Instagram Reels", "TikTok", "YouTube Shorts", "Facebook Stories"],
    },
    {
      Icon: IconWind,
      label: "Drone & Aerial",
      tagline: "Scale and scope that ground cameras can't capture",
      description:
        "Aerial footage that communicates size, location, and ambition. From job sites to commercial properties to events, drone footage adds a cinematic dimension that elevates every production it's paired with.",
      formats: ["Project showcases", "Real estate", "Event coverage", "Brand intros"],
    },
    {
      Icon: IconCalendar,
      label: "Event Coverage",
      tagline: "Capture moments that prove your brand is active",
      description:
        "Launches, trade shows, groundbreakings, team milestones — event video turns a single day into months of content. It shows a live, growing business and creates social proof at scale.",
      formats: ["Social content", "Email recaps", "Press coverage", "Internal comms"],
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {types.map(({ Icon, label, tagline, description, formats }) => (
        <div
          key={label}
          className="group relative rounded-2xl border border-zinc-200 bg-zinc-50/50 p-6 transition-all duration-300 hover:border-[var(--brand-creative)] hover:bg-white hover:shadow-xl"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-200 bg-white text-[var(--brand-creative)] transition-colors group-hover:border-[var(--brand-creative)]/20 group-hover:bg-[var(--brand-creative)]/5">
              <Icon className="h-6 w-6" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 group-hover:text-[var(--brand-creative)] transition-colors">
              {label}
            </p>
          </div>
          
          <h3 className="mt-6 font-serif text-2xl tracking-tight text-zinc-950">
            {tagline}
          </h3>
          
          <p className="mt-3 text-sm leading-relaxed text-zinc-500 font-medium">
            {description}
          </p>
          
          <div className="mt-6 flex flex-wrap gap-2">
            {formats.map((f) => (
              <span
                key={f}
                className="rounded-md border border-zinc-200 bg-white px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-zinc-400 group-hover:text-zinc-600 transition-colors"
              >
                {f}
              </span>
            ))}
          </div>

          {/* Technical detail markup */}
          <div className="absolute right-4 bottom-4 h-4 w-4 opacity-0 transition-opacity group-hover:opacity-20">
             <div className="absolute right-0 bottom-0 h-full w-full border-r border-b border-zinc-950" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Video deliverables breakdown ─────────────────────────────────────────────

function VideoDeliverablesMap() {
  const outputs = [
    {
      Icon: IconFilm,
      category: "Long-form",
      color: "purple",
      deliverables: [
        { name: "Hero brand film", duration: "90–120 sec", note: "Homepage, about page, pitch decks" },
        { name: "Extended cut", duration: "2–4 min", note: "YouTube, in-depth landing pages" },
      ],
    },
    {
      Icon: IconScissors,
      category: "Social cuts",
      color: "pink",
      deliverables: [
        { name: "Instagram Reel", duration: "15–30 sec", note: "Feed, Explore, and Stories" },
        { name: "TikTok / Shorts", duration: "15–60 sec", note: "Vertical format, native caption" },
        { name: "Facebook cut", duration: "30–60 sec", note: "Feed and boosted placements" },
      ],
    },
    {
      Icon: IconTarget,
      category: "Ad creative",
      color: "orange",
      deliverables: [
        { name: "Pre-roll ad", duration: "15 sec", note: "YouTube and Google Display" },
        { name: "Paid social ad", duration: "15–30 sec", note: "Meta Ads Manager placements" },
        { name: "Retargeting cut", duration: "6–15 sec", note: "Warm audience re-engagement" },
      ],
    },
    {
      Icon: IconLayers,
      category: "B-roll & stills",
      color: "blue",
      deliverables: [
        { name: "B-roll library", duration: "Raw clips", note: "Future edits, background video" },
        { name: "Video thumbnails", duration: "Still frames", note: "YouTube, email, blog headers" },
        { name: "Behind the scenes", duration: "Candid cuts", note: "Culture content, LinkedIn" },
      ],
    },
  ] as const;

  const colorMap = {
    purple: {
      badge: "border-purple-200 bg-purple-50 text-purple-700",
      icon: "border-purple-100 bg-purple-50 text-purple-600",
      dot: "bg-purple-500",
    },
    pink: {
      badge: "border-pink-200 bg-pink-50 text-pink-700",
      icon: "border-pink-100 bg-pink-50 text-pink-600",
      dot: "bg-pink-500",
    },
    orange: {
      badge: "border-orange-200 bg-orange-50 text-orange-700",
      icon: "border-orange-100 bg-orange-50 text-orange-600",
      dot: "bg-orange-500",
    },
    blue: {
      badge: "border-blue-200 bg-blue-50 text-blue-700",
      icon: "border-blue-100 bg-blue-50 text-blue-600",
      dot: "bg-blue-500",
    },
  };

  return (
    <div className="space-y-6">
      {/* Source */}
      <div className="group relative rounded-2xl border border-zinc-200 bg-zinc-50/50 p-8 text-center transition-all hover:bg-white hover:shadow-lg">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-200 bg-white text-[var(--brand-creative)] shadow-sm transition-transform group-hover:scale-110">
          <IconVideo className="h-8 w-8" />
        </div>
        <h4 className="mt-6 font-serif text-2xl font-semibold text-zinc-950">One Production Day</h4>
        <p className="mt-3 mx-auto max-w-xl text-sm leading-relaxed text-zinc-500 font-medium">
          A single shoot generates enough raw material to
          produce a full library of deliverables — horizontal,
          vertical, long, and short — without ever returning to set.
        </p>
        <div className="absolute -bottom-6 left-1/2 h-6 w-px -translate-x-1/2 bg-gradient-to-b from-zinc-200 to-transparent" aria-hidden />
      </div>

      {/* Output grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {outputs.map(({ Icon, category, color, deliverables }) => {
          const c = colorMap[color];
          return (
            <div
              key={category}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="mb-6 flex items-center justify-between gap-2.5">
                <div className="flex items-center gap-3">
                  <span className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border ${c.icon}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] ${c.badge}`}>
                    {category}
                  </span>
                </div>
                <div className="h-px flex-1 bg-zinc-100" />
              </div>
              <ul className="space-y-4">
                {deliverables.map((d) => (
                  <li key={d.name} className="group/item flex items-start gap-3">
                    <span className={`mt-[6px] h-1.5 w-1.5 flex-shrink-0 rounded-full ${c.dot} transition-transform group-hover/item:scale-150`} aria-hidden />
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <p className="text-sm font-bold text-zinc-900">{d.name}</p>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">{d.duration}</span>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-zinc-500 font-medium">{d.note}</p>
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

// ─── Video stats chart ────────────────────────────────────────────────────────

function VideoStatsChart() {
  const stats = [
    {
      label: "Consumers who prefer video to learn about a product or service",
      value: 72,
      source: "HubSpot",
    },
    {
      label: "People who say a brand video convinced them to make a purchase",
      value: 88,
      source: "Wyzowl",
    },
    {
      label: "Consumers who want to see more video content from brands they support",
      value: 54,
      source: "HubSpot",
    },
    {
      label: "Uplift in landing page conversions when video is included",
      value: 80,
      source: "Unbounce",
    },
    {
      label: "Video marketers who report a positive ROI from video content",
      value: 88,
      source: "Wyzowl",
    },
  ];

  return (
    <div className="rounded-2xl border border-black/[0.08] bg-white p-6 ring-1 ring-inset ring-black/[0.03]">
      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--brand-creative)]">
        Industry data
      </p>
      <h3 className="mt-2 text-xl font-semibold text-zinc-900 [font-family:var(--font-montserrat)]">
        Video outperforms every other content format
      </h3>
      <p className="mt-1 text-xs text-zinc-600">
        Sources: HubSpot · Wyzowl · Unbounce · Brightcove
      </p>
      <div className="mt-6 space-y-5">
        {stats.map((stat, i) => (
          <div key={stat.label}>
            <div className="mb-2 flex items-start justify-between gap-4">
              <p className="text-xs leading-snug text-zinc-600">{stat.label}</p>
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

function BigVideoStatRow() {
  const callouts = [
    { value: "1,200%", label: "more shares than text and images combined" },
    { value: "88%", label: "of buyers cite video in their decision" },
    { value: "80%", label: "conversion lift on video landing pages" },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {callouts.map(({ value, label }) => (
        <div
          key={label}
          className="relative rounded-2xl border border-zinc-200 bg-white p-6 transition-all duration-300 hover:shadow-lg"
        >
          <div className="absolute top-0 left-6 h-1 w-8 bg-[var(--brand-creative)]" />
          <p className="font-serif text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
            {value}
          </p>
          <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.25em] leading-snug text-zinc-400">{label}</p>
        </div>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function VideographyServicePage() {
  const faqItems = [
    {
      question: "What types of video does Invision Creative produce?",
      answer:
        "Brand films, testimonial videos, product and service demos, social reels, drone footage, and event coverage. Every project is planned around your marketing goals — not just a deliverable checklist.",
    },
    {
      question: "How many videos will we get from a single production day?",
      answer:
        "It depends on scope, but a standard production day typically yields 1 long-form brand cut plus 3–6 social and ad edits in multiple aspect ratios. We plan the shot list to maximize deliverables without inflating time on set.",
    },
    {
      question: "How do you plan a video shoot for multiple platforms at once?",
      answer:
        "Before we shoot, we map every deliverable to its placement — 16:9 for YouTube and web, 9:16 for Reels and TikTok, 1:1 for ads. We block and frame accordingly so every cut looks intentional, not cropped.",
    },
    {
      question: "Can we use footage from past shoots in future videos?",
      answer:
        "Absolutely — that's the point of building an archive. Every production adds to a growing library of footage we can draw from for future campaigns, brand updates, and seasonal content without returning to set.",
    },
    {
      question: "What's the turnaround time for a finished video?",
      answer:
        "Standard delivery is 2–3 weeks from shoot date for primary deliverables. Social cuts and shorter edits can often be delivered sooner. Rush timelines are available for time-sensitive launches.",
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
        id="videography-faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ServicePageShell
        eyebrow="Videography"
        title="Motion content built to move people"
        subtitle="In a saturated market, video is the format that earns real attention. It conveys scale, expertise, and personality in seconds — then lives in your content library for years, compounding its value with every reuse."
        headerMediaSlot={
          <div className="relative left-1/2 -mt-[calc(var(--header-height)+4rem)] w-dvw max-w-none -translate-x-1/2 overflow-hidden sm:-mt-[calc(var(--header-height)+5rem)] lg:-mt-[calc(var(--header-height)+6rem)]">
            <div className="relative aspect-[16/9]">
              <video
                src="https://photos.smugmug.com/RebiuldWeb/i-ZnVBKGh/0/KQ9wsS75zkbfrQTHZvKhB27CZGDCLw7MWMGQD96CT/1920/DJI_20250602130614_0246_D-1920.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-white sm:h-36 lg:h-44"
                aria-hidden
              />
            </div>
          </div>
        }
        powerTitle="Six production formats we deliver"
        powerBody={<VideoTypeGrid />}
        assetTitle="One production day. Dozens of deliverables."
        assetBody={
          <div className="space-y-5">
            <p className="text-[15px] leading-relaxed text-zinc-600">
              The biggest myth in video production is that you need separate
              shoots for each platform. We plan every production to generate a
              full library of content from one session — horizontal, vertical,
              long, short, paid, organic — all from the same day on set.
            </p>
            <VideoDeliverablesMap />
          </div>
        }
        compoundTitle="The video advantage, in numbers"
        compoundBody={
          <div className="space-y-5">
            <p className="text-[15px] leading-relaxed text-zinc-600">
              Video isn&#39;t just popular — it&#39;s the highest-performing
              content format across awareness, consideration, and conversion. The
              data is consistent across industries and platforms.
            </p>
            <BigVideoStatRow />
            <VideoStatsChart />
            <div className="rounded-xl border border-black/[0.08] bg-white px-5 py-4">
              <p className="text-xs leading-relaxed text-zinc-600">
                <span className="font-semibold text-zinc-600">The share gap is real:</span>{" "}
                Video content generates{" "}
                <span className="font-semibold text-[var(--brand-creative)]">1,200% more shares</span>{" "}
                than text and images combined (Brightcove). That means every
                video you publish has a 12× greater chance of reaching audiences
                you haven&#39;t paid to reach yet.
              </p>
            </div>
          </div>
        }
        footerSlot={
          <div className="space-y-12">
            {/* The compound effect */}
            <section className="rounded-2xl border border-black/[0.08] bg-[radial-gradient(circle_at_15%_20%,color-mix(in_srgb,var(--brand-creative)_10%,transparent),transparent_45%),#0f0f10] p-5 ring-1 ring-inset ring-black/[0.03] sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--brand-creative)]">
                    Long-term strategy
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 [font-family:var(--font-fraunces)] sm:text-3xl">
                    The archive compound effect
                  </h2>
                </div>
                <span className="inline-flex rounded-full border border-[color-mix(in_srgb,var(--brand-creative)_35%,transparent)] bg-[color-mix(in_srgb,var(--brand-creative)_14%,transparent)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--brand-creative)]">
                  Equity, not expense
                </span>
              </div>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-600">
                Every shoot we do together adds to a shared footage library. Over
                time, that archive becomes one of your most valuable production
                assets — a resource we can draw from to create new brand films,
                campaign content, and seasonal updates without returning to set.
                The longer we work together, the more that library compounds in
                value.
              </p>
              <div className="mt-8">
                <ul className="grid gap-3 sm:grid-cols-3">
                  {[
                    {
                      id: "Year 1",
                      label: "Foundation",
                      desc: "Core brand film, hero content, and social library. Your visual voice is established.",
                    },
                    {
                      id: "Year 2",
                      label: "Expansion",
                      desc: "Campaign layers, testimonial library, and seasonal content. Efficiency improves as archive grows.",
                    },
                    {
                      id: "Year 3+",
                      label: "Compound",
                      desc: "Full brand films assembled from archive footage. Production costs drop. Content velocity increases.",
                    },
                  ].map(({ id, label, desc }) => (
                    <li
                      key={id}
                      className="rounded-xl border border-black/[0.08] bg-white/85 p-5 ring-1 ring-inset ring-black/[0.03]"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--brand-creative)]">
                          {label}
                        </p>
                        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-600">
                          {id}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                        {desc}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 [font-family:var(--font-fraunces)] sm:text-3xl">
                Frequently asked questions
              </h2>
              <p className="mt-3 text-sm text-zinc-600">
                Answers to the questions clients ask before their first
                production.
              </p>
              <div className="mt-6 space-y-3">
                {faqItems.map((item) => (
                  <details
                    key={item.question}
                    className="group rounded-xl border border-black/[0.08] bg-white/80 p-5 ring-1 ring-inset ring-black/[0.03]"
                  >
                    <summary className="cursor-pointer list-none text-sm font-semibold tracking-tight text-zinc-900">
                      {item.question}
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>

            {/* Related services */}
            <section>
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 [font-family:var(--font-fraunces)] sm:text-3xl">
                Pair video with
              </h2>
              <p className="mt-3 text-sm text-zinc-600">
                Video performs best as part of a connected content system.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  {
                    href: "/services/photography",
                    label: "Related service",
                    title: "Photography",
                    desc: "Combine motion and stills from the same session. One production day. Two complete content libraries. Cohesive across every channel.",
                  },
                  {
                    href: "/services/social-media",
                    label: "Related service",
                    title: "Social media content",
                    desc: "Take your video library and deploy it systematically — formatted, captioned, and scheduled for each platform's algorithm.",
                  },
                  {
                    href: "/work",
                    label: "Portfolio",
                    title: "See our work",
                    desc: "Review real productions and campaign examples before starting. Style, scope, and execution quality — all visible before you commit.",
                  },
                ].map(({ href, label, title, desc }) => (
                  <Link
                    key={href}
                    href={href}
                    className="group rounded-xl border border-black/[0.08] bg-white/80 p-5 ring-1 ring-inset ring-black/[0.03] transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--brand-creative)_35%,transparent)] hover:shadow-[0_0_30px_-10px_color-mix(in_srgb,var(--brand-creative)_30%,transparent)]"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--brand-creative)]">
                      {label}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold tracking-tight text-zinc-900">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-600">
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
