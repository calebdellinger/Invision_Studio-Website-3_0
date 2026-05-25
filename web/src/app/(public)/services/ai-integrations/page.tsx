import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { ServicePageShell } from "@/components/site/service/ServicePageShell";
import { AiWorkflowSimulator } from "@/components/site/service/AiWorkflowSimulator";
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

// ─── Icons ───────────────────────────────────────────────────────────────────

function IconTag() {
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
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}

function IconRoute() {
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
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="6" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </svg>
  );
}

function IconWrite() {
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
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}

// ─── Capabilities Grid ────────────────────────────────────────────────────────

function AiCapabilitiesGrid() {
  const items = [
    {
      Icon: IconTag,
      title: "Computer Vision & Metadata",
      desc: "Analyze and catalog thousands of brand photos and video clips instantly. Identify subject names, color palettes, and category tags to build searchable visual libraries without manual data entry.",
    },
    {
      Icon: IconWrite,
      title: "Brand-Voice Copywriters",
      desc: "Turn a raw script, rough outline, or folder of images into structured draft captions for LinkedIn, Instagram, and X. Fine-tuned with template structures matching your exact corporate style.",
    },
    {
      Icon: IconRoute,
      title: "Automated Routing & Syncs",
      desc: "Deploy API webhooks that listen for human approval cues, automatically generating transcripts, cropping vertical clips, and syncing deliverables to your Shopify store, Webflow site, or corporate DAM.",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {items.map(({ Icon, title, desc }) => (
        <div
          key={title}
          className="rounded-xl border border-white/[0.08] bg-[#0e0e0f] p-5 ring-1 ring-inset ring-white/[0.03]"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md border border-white/10 bg-[#121213] text-[var(--brand-creative)]">
              <Icon />
            </span>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--brand-creative)]">
              {title.split(" ")[0]}
            </p>
          </div>
          <h4 className="mt-4 text-base font-semibold text-white">{title}</h4>
          <p className="mt-2 text-xs leading-relaxed text-zinc-400">{desc}</p>
        </div>
      ))}
    </div>
  );
}

// ─── Big Stat Row ─────────────────────────────────────────────────────────────

function BigStatRow() {
  const callouts = [
    { value: "98.5%", label: "reduction in tagging speed" },
    { value: "10×", label: "increase in social variants" },
    { value: "0", label: "minutes of manual data sync" },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {callouts.map(({ value, label }) => (
        <div
          key={label}
          className="rounded-xl border border-white/[0.08] bg-[#0c0c0d] p-4 text-center ring-1 ring-inset ring-white/[0.03]"
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

// ─── Page Component ───────────────────────────────────────────────────────────

export default function AiIntegrationsServicePage() {
  const faqItems = [
    {
      question: "Are these tools replacing my creative and marketing teams?",
      answer:
        "Absolutely not. We build systems that replace clicks, not voices. By automating routine administrative tasks — naming files, formatting ratios, generating metadata tags, and publishing draft payloads — your creative team has more hours to spend on concepts, filming, and high-level strategy.",
    },
    {
      question: "Will my proprietary brand data be used to train public models?",
      answer:
        "No. We utilize commercial API connections (e.g. enterprise Google Cloud, OpenAI API, Anthropic Console) which are protected by strict corporate data privacy rules. These contracts explicitly prevent your uploads, transcripts, images, or code configurations from being used to train future public model updates.",
    },
    {
      question: "Can these pipelines connect with our custom DAM or CMS?",
      answer:
        "Yes. We specialize in serverless webhooks, API synchronization, and custom scripting to interface with platforms like Shopify, Adobe Experience Manager (AEM), Webflow, Frame.io, and traditional cloud storage systems (Dropbox, Google Workspace, AWS S3).",
    },
    {
      question: "How long does it take to scope and build a custom AI workflow?",
      answer:
        "Standard ingestion pipelines and copy drafting widgets can be configured and deployed within 2 to 4 weeks. Sophisticated setups that include custom computer vision classification models or multiple API connections generally span 6 to 8 weeks including sandbox testing.",
    },
    {
      question: "Who owns the intellectual property of the generated outputs?",
      answer:
        "You own 100% of all generated copy, metadata, and files. Because the systems are built strictly to support your workflows and write preliminary drafts that your internal staff approves, the assets remain human-directed and legally protected.",
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
        id="ai-faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ServicePageShell
        eyebrow="AI integrations"
        title="Creative-grade workflow automation"
        subtitle="Scale your deliverable output without multiplying your admin hours. We build practical AI pipelines that automatically tag assets, draft brand-specific copy, resize formats, and route files — keeping human validation at the center."
        introSlot={
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0b] ring-1 ring-inset ring-white/[0.03]">
            <div className="relative aspect-[16/9]">
              <Image
                src="/ai-creative-workflow.png"
                alt="Cinematic visualization of an AI creative integration workflow."
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 896px"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25"
                aria-hidden
              />
            </div>
            <p className="border-t border-white/[0.06] px-4 py-3 text-xs tracking-wide text-zinc-500">
              AI shouldn&apos;t replace creative voice — it should eliminate mechanical clicks.
            </p>
          </div>
        }
        powerTitle="Interact with a live ingestion pipeline"
        powerBody={<AiWorkflowSimulator />}
        assetTitle="Core components of our integrations"
        assetBody={
          <div className="space-y-6">
            <p className="text-[15px] leading-relaxed text-zinc-400">
              Generic prompts produce generic output. We audit your creative stack, build custom prompt templates, map secure API nodes, and write deployment scripts to connect systems securely.
            </p>
            <AiCapabilitiesGrid />
          </div>
        }
        compoundTitle="Quantifying the impact, in numbers"
        compoundBody={
          <div className="space-y-6">
            <p className="text-[15px] leading-relaxed text-zinc-400">
              Automating routine data entry and formatting unlocks significant time-to-market advantages. When asset preparation and channel routing are handled in seconds, campaigns launch faster and creative teams build more.
            </p>
            <BigStatRow />
            <AiStatsChart />
          </div>
        }
        footerSlot={
          <div className="space-y-12">
            {/* Our Guardrails Approach */}
            <section className="rounded-2xl border border-white/[0.08] bg-[radial-gradient(circle_at_15%_20%,color-mix(in_srgb,var(--brand-creative)_10%,transparent),transparent_45%),#0f0f10] p-5 ring-1 ring-inset ring-white/[0.03] sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--brand-creative)]">
                    Security & Governance
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white [font-family:var(--font-fraunces)] sm:text-3xl">
                    Guardrails before deployment
                  </h2>
                </div>
                <span className="inline-flex rounded-full border border-[color-mix(in_srgb,var(--brand-creative)_35%,transparent)] bg-[color-mix(in_srgb,var(--brand-creative)_14%,transparent)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--brand-creative)]">
                  Enterprise Safe
                </span>
              </div>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400">
                AI integrations fail when they generate surprises or leak data. We prioritize security checkpoints: keeping models private, ensuring every output goes through a human approval step (HIL), and generating fallback notifications if an API fails.
              </p>
              <div className="mt-8">
                <ul className="grid gap-3 sm:grid-cols-3">
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

            {/* FAQ Accordion */}
            <section>
              <h2 className="text-2xl font-semibold tracking-tight text-white [font-family:var(--font-fraunces)] sm:text-3xl">
                Frequently asked questions
              </h2>
              <p className="mt-3 text-sm text-zinc-500">
                Answers to standard governance and technical concerns before integrating workflows.
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

            {/* Related Services */}
            <section>
              <h2 className="text-2xl font-semibold tracking-tight text-white [font-family:var(--font-fraunces)] sm:text-3xl">
                Connect workflows with
              </h2>
              <p className="mt-3 text-sm text-zinc-500">
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
