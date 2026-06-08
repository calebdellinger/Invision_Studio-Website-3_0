import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { AiDeploymentApproaches } from "@/components/site/service/AiDeploymentApproaches";
import { AiSpaceBackground } from "@/components/site/service/AiSpaceBackground";
import { ConstructionTradeSimulator } from "@/components/site/service/ConstructionTradeSimulator";
import { AiStatsChart } from "@/components/site/service/AiStatsChart";

export const metadata: Metadata = {
  title: "AI Integrations & Workflow Automation",
  description:
    "Creative-grade AI workflow automation. Connect custom vision models, auto-tagging, GPT copywriting, and automated publishing routes to save hours on manual operations.",
  keywords: [
    "AI workflow automation",
    "creative AI integrations",
    "automated asset tagging",
    "computer vision for DAM",
    "automated social media copywriting",
    "Shopify AI upload sync",
    "Make Zapier brand pipelines",
    "creative agency AI automation",
  ],
  alternates: {
    canonical: "/services/ai-integrations",
  },
  openGraph: {
    title: "AI Workflow Integration Services | Invision Creative",
    description:
      "Automate asset ingestion, tag products with computer vision, draft copy, and route deliverables instantly.",
    images: [
      {
        url: "/ai-creative-workflow.png",
        width: 1200,
        height: 675,
        alt: "Invision Creative AI workflow automation pipeline.",
      },
    ],
  },
};

// ─── Inline icons ─────────────────────────────────────────────────────────────

function IconTag() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}

function IconWrite() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}

function IconRoute() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="6" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </svg>
  );
}

// ─── FAQ data ─────────────────────────────────────────────────────────────────

const faqItems = [
  {
    question: "Are these platforms designed to replace my office estimators or field crews?",
    answer:
      "No. We build platforms that automate administrative processes, data entry, and documentation search—not professional expertise. By taking over manual takeoffs, supplier price comparisons, and proposal formatting, your estimators can bid on 4x the volume of projects, letting your team focus on winning and managing larger jobs.",
  },
  {
    question: "Will my proprietary business and estimating data be used to train public models?",
    answer:
      "Never. In our Fully Private flavor, the platform operates entirely on-premise on local dedicated hardware (like a Mac Studio), meaning your data never leaves your physical office and no external API calls are made. For Cloud and Hybrid setups, we use enterprise-grade APIs with corporate data agreements that strictly prohibit your uploads, databases, or prompts from being used for public model training.",
  },
  {
    question: "Can this custom platform connect with our existing ERP, CRM, and field software?",
    answer:
      "Yes. We specialize in custom integrations connecting the platform directly to your current tools—such as Procore, QuickBooks, Sage, Salesforce, HubSpot, active telematics databases, and corporate cloud drives (Dropbox, AWS S3, Google Drive).",
  },
  {
    question: "How long does it take to audit, build, and deploy a custom platform?",
    answer:
      "Our process begins with a 2-week deep audit of your operations data and industry workflows. A custom Cloud platform is typically deployed and online in 4 to 6 weeks. Hybrid and Fully Private setups requiring dedicated local hardware configurations generally take 6 to 10 weeks, which includes full network sandbox testing.",
  },
  {
    question: "What is the typical financial return on investment (ROI)?",
    answer:
      "A custom platform behaves like an asset that pays for itself. Most clients realize a full return on their investment within the first 60 to 90 days. This is achieved through direct overhead reduction (cutting administrative planning and material takeoff times by up to 90%) and immediate top-line revenue capacity (allowing you to respond to major RFPs in minutes rather than days, locking in larger contracts before your competitors can respond).",
  },
] as const;

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AiIntegrationsServicePage() {
  return (
    <>
      <Script
        id="ai-faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── SPACE HERO ─────────────────────────────────────────────────────── */}
      <section className="relative -mt-[var(--header-height)] min-h-dvh overflow-hidden">
        <AiSpaceBackground />

        {/* Edge vignette — keeps title legible against busy canvas */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_82%_82%_at_50%_46%,transparent_18%,rgba(255,255,255,0.7)_72%,#fff_100%)]"
          aria-hidden
        />
        {/* Bottom fade into content area */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white to-transparent"
          aria-hidden
        />

        {/* ── HUD Card A — system status (desktop xl only) ── */}
        <div className="hud-float-a pointer-events-none absolute left-[5%] top-[42%] hidden xl:block">
          <div className="rounded-lg border border-zinc-200 bg-white/80 p-3.5 backdrop-blur-md">
            <div className="mb-2.5 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--brand-creative)] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--brand-creative)]" />
              </span>
              <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-zinc-600">
                System Active
              </span>
            </div>
            <div className="space-y-1.5 font-mono text-[10px]">
              {[
                { label: "Operations Audit", ok: true },
                { label: "Industry Ingest", ok: true },
                { label: "Custom Platform", ok: true },
              ].map(({ label, ok }) => (
                <div key={label} className="flex items-center justify-between gap-6">
                  <span className="text-zinc-600">{label}</span>
                  <span className={ok ? "text-[var(--brand-creative)]" : "text-red-400"}>
                    {ok ? "●" : "○"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── HUD Card B — pipeline metrics (desktop xl only) ── */}
        <div className="hud-float-b pointer-events-none absolute right-[5%] top-[40%] hidden xl:block">
          <div className="rounded-lg border border-zinc-200 bg-white/80 p-3.5 backdrop-blur-md">
            <p className="mb-2.5 font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-zinc-600">
              Platform Performance
            </p>
            <div className="space-y-2">
              <div>
                <p className="font-mono text-xl font-bold leading-none text-[var(--brand-creative)]">
                  +8.4%
                </p>
                <p className="mt-0.5 text-[10px] text-zinc-600">average gross profit margin</p>
              </div>
              <div className="border-t border-zinc-200 pt-2">
                <p className="font-mono text-xl font-bold leading-none text-zinc-900">12x</p>
                <p className="mt-0.5 text-[10px] text-zinc-600">faster commercial bid times</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Main hero content ── */}
        <div className="relative z-10 flex min-h-dvh flex-col items-center justify-center px-4 pb-20 pt-[var(--header-height)] text-center">
          {/* Eyebrow chip */}
          <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-[color-mix(in_srgb,var(--brand-creative)_30%,transparent)] bg-[color-mix(in_srgb,var(--brand-creative)_8%,transparent)] px-4 py-1.5">
            <span
              className="h-1.5 w-1.5 rounded-full bg-[var(--brand-creative)]"
              aria-hidden
            />
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--brand-creative)]">
              Custom AI Platforms
            </span>
          </div>

          {/* Title */}
          <h1 className="max-w-4xl leading-[0.93] tracking-tight text-zinc-900 [font-family:var(--font-fraunces)]">
            <span className="block text-[clamp(2.75rem,8.5vw,6rem)] font-semibold">
              Custom AI Platforms
            </span>
            <span className="block text-[clamp(1.5rem,4vw,3.5rem)] font-medium text-zinc-600">
              engineered for operations, built for growth
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-7 max-w-2xl text-[15px] leading-relaxed text-zinc-600 sm:text-base">
            We audit your internal business processes and cross-reference industry intelligence to construct
            a completely custom AI integration platform. Reduce operational overhead by up to 40%
            and win larger commercial contracts—with security built directly into your network.
          </p>

          {/* Capability chips */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {[
              "Operations Audit",
              "Industry Data Ingest",
              "Overhead Cost Savings",
              "Client Acquisition ROI",
            ].map((cap) => (
              <span
                key={cap}
                className="rounded-full border border-zinc-200 bg-zinc-100 px-3.5 py-1.5 text-[11px] font-medium tracking-wide text-zinc-600"
              >
                {cap}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-[var(--brand-creative)] px-8 py-3.5 text-sm font-semibold text-zinc-900 shadow-[0_4px_24px_-4px_color-mix(in_srgb,var(--brand-creative)_45%,transparent)] transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_-6px_color-mix(in_srgb,var(--brand-creative)_50%,transparent)]"
            >
              Start a project
            </Link>
            <a
              href="#pipeline"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-200 px-8 py-3.5 text-sm font-medium text-zinc-600 transition-colors hover:border-zinc-300 hover:text-black"
            >
              See it in action
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <polyline points="19 12 12 19 5 12" />
              </svg>
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 animate-bounce"
          aria-hidden
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 text-zinc-700"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </section>

      {/* ── CONTENT ─────────────────────────────────────────────────────────── */}
      <div className="relative z-10 bg-white">
        {/* Green separator line at hero transition */}
        <div
          className="h-px bg-gradient-to-r from-transparent via-[color-mix(in_srgb,var(--brand-creative)_35%,transparent)] to-transparent"
          aria-hidden
        />

        {/* Stats strip */}
        <div className="px-4 py-12">
          <div className="mx-auto grid max-w-3xl grid-cols-3 gap-4">
            {[
              { value: "−40%", label: "overhead reduction · automation" },
              { value: "12x", label: "bidding speed · custom proposals" },
              { value: "+48%", label: "lead close rate · rapid quoting" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-2xl font-bold text-[var(--brand-creative)] sm:text-3xl [font-family:var(--font-montserrat)]">
                  {value}
                </p>
                <p className="mt-1 text-[11px] leading-snug text-zinc-600">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Deployment approaches ── */}
        <AiDeploymentApproaches />

        {/* ── Construction trade simulator ── */}
        <section
          id="pipeline"
          className="border-t border-zinc-200 px-4 py-16 sm:py-20"
        >
          <div className="mx-auto max-w-3xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--brand-creative)]">
              Interactive
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl [font-family:var(--font-fraunces)]">
              See AI work on a real jobsite problem
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600">
              Built for small construction crews — excavation, electrical, plumbing, and
              carpentry. Each trade gets AI integrations aimed at the tasks that usually
              slip through the cracks: fuel, materials, routing, compliance, and waste.
            </p>
            <div className="mt-8">
              <ConstructionTradeSimulator />
            </div>
          </div>
        </section>

        {/* ── Core capabilities ── */}
        <section className="border-t border-zinc-200 px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--brand-creative)]">
              Core components
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl [font-family:var(--font-fraunces)]">
              Three integration layers, one custom platform
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600">
              Generic templates produce generic results. We conduct a deep, two-stage data analysis of your
              specific operational patterns and external industry data to construct a dedicated platform for your business.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                {
                  icon: <IconTag />,
                  tag: "Operations",
                  title: "Internal Operations Ingest",
                  desc: "We securely process your historical databases—estimating spreadsheets, CRM customer records, team communications, and SOPs—to align the platform with how your specific business operates.",
                },
                {
                  icon: <IconWrite />,
                  tag: "Market",
                  title: "Industry Intelligence Fusion",
                  desc: "The platform cross-references internal data with external industry indexes, including distributor pricing feeds, public RFP portals, local regulatory codes, and material price drifts.",
                },
                {
                  icon: <IconRoute />,
                  tag: "Platform",
                  title: "Custom Integration Platform",
                  desc: "We deploy secure API connections, custom dashboards, and automated alert nodes to seamlessly connect your office estimators with your active field teams and customer acquisition channels.",
                },
              ].map(({ icon, tag, title, desc }) => (
                <div
                  key={tag}
                  className="rounded-xl border border-zinc-200 bg-zinc-50 p-5 ring-1 ring-inset ring-zinc-100"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md border border-zinc-200 bg-zinc-50 text-[var(--brand-creative)]">
                      {icon}
                    </span>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--brand-creative)]">
                      {tag}
                    </p>
                  </div>
                  <h4 className="mt-4 text-base font-semibold text-zinc-900">{title}</h4>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-600">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Impact in numbers ── */}
        <section className="border-t border-zinc-200 px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--brand-creative)]">
              Efficiency data
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl [font-family:var(--font-fraunces)]">
              Quantifying the impact, by trade
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600">
              The same four subs from the simulator — excavation, electrical, plumbing, and
              carpentry. Each row shows how long manual planning takes versus an AI-assisted
              workflow your crew lead can review and run.
            </p>
            <div className="mt-8">
              <AiStatsChart />
            </div>
          </div>
        </section>

        {/* ── Security & guardrails ── */}
        <section className="border-t border-zinc-200 px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl border border-zinc-200 bg-[radial-gradient(circle_at_15%_20%,color-mix(in_srgb,var(--brand-creative)_10%,transparent),transparent_45%),#0f0f10] p-5 ring-1 ring-inset ring-zinc-100 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--brand-creative)]">
                    Security & Governance
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 [font-family:var(--font-fraunces)] sm:text-3xl">
                    Guardrails before deployment
                  </h2>
                </div>
                <span className="inline-flex rounded-full border border-[color-mix(in_srgb,var(--brand-creative)_35%,transparent)] bg-[color-mix(in_srgb,var(--brand-creative)_14%,transparent)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--brand-creative)]">
                  Enterprise Safe
                </span>
              </div>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-600">
                AI integrations fail when they generate surprises or leak data. We
                prioritize security checkpoints: keeping models private, ensuring
                every output goes through a human approval step (HIL), and generating
                fallback notifications if an API fails.
              </p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  {
                    id: "01",
                    label: "Data Privacy",
                    desc: "Zero public training. Your uploads, brand assets, and content parameters are kept isolated using secure business accounts.",
                  },
                  {
                    id: "02",
                    label: "Human Review",
                    desc: "Automated pipelines deposit items into drafts. Nothing publishes or syncs without a team member checking off the final output.",
                  },
                  {
                    id: "03",
                    label: "Reliability",
                    desc: "API monitors alert our developers if a webhook fails, enabling instant fallbacks so operations don't stall.",
                  },
                ].map(({ id, label, desc }) => (
                  <li
                    key={id}
                    className="rounded-xl border border-zinc-200 bg-zinc-50 p-5 ring-1 ring-inset ring-zinc-100"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--brand-creative)]">
                        {label}
                      </p>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-600">
                        {id}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-700">{desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="border-t border-zinc-200 px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 [font-family:var(--font-fraunces)] sm:text-3xl">
              Frequently asked questions
            </h2>
            <p className="mt-3 text-sm text-zinc-600">
              Answers to standard security, operational, and financial concerns before deploying a custom platform.
            </p>
            <div className="mt-6 space-y-3">
              {faqItems.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-xl border border-zinc-200 bg-zinc-50 p-5 ring-1 ring-inset ring-zinc-100"
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
          </div>
        </section>

        {/* ── Related services ── */}
        <section className="border-t border-zinc-200 px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 [font-family:var(--font-fraunces)] sm:text-3xl">
              Connect workflows with
            </h2>
            <p className="mt-3 text-sm text-zinc-600">
              AI pipelines operate best when fed with premium original media.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                {
                  href: "/services/photography",
                  label: "Original Assets",
                  title: "Commercial Photography",
                  desc: "Inject high-resolution, custom brand imagery straight into your ingest pipeline. Auto-tag colors and crop aspect ratios for instant catalog syncs.",
                },
                {
                  href: "/services/videography",
                  label: "Dynamic Assets",
                  title: "Professional Videography",
                  desc: "Feed raw video clips into visual analyzer AI. Generate high-hook social cuts, add captions, and route exports across digital platforms.",
                },
                {
                  href: "/services/social-media",
                  label: "Channel Delivery",
                  title: "Social Media Systems",
                  desc: "Synchronize your approved content drafts directly to social media scheduling software. Push updates seamlessly to Instagram, LinkedIn, and X.",
                },
              ].map(({ href, label, title, desc }) => (
                <Link
                  key={href}
                  href={href}
                  className="group rounded-xl border border-zinc-200 bg-zinc-50 p-5 ring-1 ring-inset ring-zinc-100 transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--brand-creative)_35%,transparent)] hover:shadow-[0_0_30px_-10px_color-mix(in_srgb,var(--brand-creative)_30%,transparent)]"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--brand-creative)]">
                    {label}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight text-zinc-900">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">{desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTAs ── */}
        <div className="border-t border-zinc-200 px-4 py-14">
          <div className="mx-auto flex max-w-3xl flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-[var(--brand-creative)] px-8 py-3.5 text-sm font-semibold text-zinc-900 shadow-[0_4px_24px_-4px_color-mix(in_srgb,var(--brand-creative)_45%,transparent)] transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_-6px_color-mix(in_srgb,var(--brand-creative)_50%,transparent)]"
            >
              Start a project
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-full border border-zinc-200 px-8 py-3.5 text-sm font-medium text-zinc-600 transition-colors hover:border-zinc-300 hover:text-black"
            >
              All services
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
