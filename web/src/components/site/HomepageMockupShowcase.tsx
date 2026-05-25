import Image from "next/image";
import { readFileSync } from "node:fs";
import { join } from "node:path";

type Mockup = {
  title: string;
  subtitle: string;
  metric: string;
  accentClass: string;
  accentBg: string;
  heroLabel: string;
  variant:
    | "concrete"
    | "excavating"
    | "detailing"
    | "builder"
    | "whiteout"
    | "currentstone";
  images: string[];
};

const MOCKUPS: Mockup[] = [
  {
    title: "Whiteout Co.",
    subtitle: "Snow + ice management mockup concept",
    metric: "Cinematic seasonal visuals improved contact intent +44%",
    accentClass: "text-emerald-300",
    accentBg: "bg-emerald-400",
    heroLabel: "Book winter service",
    variant: "whiteout",
    images: [
      "/rebuild-gallery/6F4A3334.jpg",
      "/rebuild-gallery/6F4A3492.jpg",
      "/rebuild-gallery/6F4A8380-2.jpg",
    ],
  },
  {
    title: "Custom Home Builder",
    subtitle: "Design-build homes and full interior packages",
    metric: "Styled project imagery increased consultation starts +38%",
    accentClass: "text-violet-300",
    accentBg: "bg-violet-400",
    heroLabel: "Start your build consult",
    variant: "builder",
    images: [
      "/rebuild-gallery/DJI_20250602131946_0254_D.jpg",
      "/rebuild-gallery/6F4A8380-2.jpg",
      "/rebuild-gallery/6F4A3334.jpg",
    ],
  },
  {
    title: "Car Detailing Shop",
    subtitle: "Paint correction, wraps, and ceramic coating",
    metric: "Before/after hero imagery improved bookings +52%",
    accentClass: "text-sky-300",
    accentBg: "bg-sky-400",
    heroLabel: "Reserve a detail slot",
    variant: "detailing",
    images: [
      "/rebuild-gallery/badass.jpg",
      "/rebuild-gallery/6F4A3492.jpg",
      "/rebuild-gallery/6F4A8380-2.jpg",
    ],
  },
  {
    title: "Current & Stone",
    subtitle: "Refined lifestyle commerce mockup concept",
    metric: "Editorial imagery increased product exploration +39%",
    accentClass: "text-amber-200",
    accentBg: "bg-amber-300",
    heroLabel: "Shop the latest drop",
    variant: "currentstone",
    images: [
      "/rebuild-gallery/DJI_20250602131946_0254_D.jpg",
      "/rebuild-gallery/6F4A3334.jpg",
      "/rebuild-gallery/badass.jpg",
    ],
  },
];

function withHiddenScrollbar(html: string) {
  const hiddenScrollbarStyle = `<style>
html, body {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
html::-webkit-scrollbar,
body::-webkit-scrollbar {
  width: 0;
  height: 0;
  display: none;
}
</style>`;

  return html.includes("</head>")
    ? html.replace("</head>", `${hiddenScrollbarStyle}</head>`)
    : `${hiddenScrollbarStyle}${html}`;
}

const pumpkinPatchHtml = withHiddenScrollbar(
  readFileSync(
  join(process.cwd(), "src/components/site/pumpkin_patch_v2.html"),
  "utf8",
  ),
);
const apexDetailHtml = withHiddenScrollbar(
  readFileSync(
  join(process.cwd(), "src/components/site/apex_detail_mockup.html"),
  "utf8",
  ),
);
const whiteoutCoHtml = withHiddenScrollbar(
  readFileSync(
  join(process.cwd(), "src/components/site/whiteout_co_mockup.html"),
  "utf8",
  ),
);
const currentAndStoneHtml = withHiddenScrollbar(
  readFileSync(
  join(process.cwd(), "src/components/site/current_and_stone_mockup.html"),
  "utf8",
  ),
);

function WebsiteMockup({
  title,
  subtitle,
  metric,
  accentClass,
  accentBg,
  heroLabel,
  images,
  variant,
}: Mockup) {
  if (variant === "builder") {
    return (
      <article className="aspect-[3/2] overflow-hidden rounded-xl bg-black shadow-[0_24px_55px_-32px_rgba(0,0,0,0.95)]">
        <iframe
          title="Pumpkin Patch homepage mockup"
          srcDoc={pumpkinPatchHtml}
          className="h-full w-full"
          loading="lazy"
          aria-label="Pumpkin Patch homepage mockup"
        />
      </article>
    );
  }

  if (variant === "detailing") {
    return (
      <article className="aspect-[2/3] overflow-hidden rounded-xl bg-black shadow-[0_24px_55px_-32px_rgba(0,0,0,0.95)]">
        <iframe
          title="Apex Detail homepage mockup"
          srcDoc={apexDetailHtml}
          className="h-full w-full"
          loading="lazy"
          aria-label="Apex Detail homepage mockup"
        />
      </article>
    );
  }

  if (variant === "whiteout") {
    return (
      <article className="aspect-[3/2] overflow-hidden rounded-xl bg-black shadow-[0_24px_55px_-32px_rgba(0,0,0,0.95)]">
        <iframe
          title="Whiteout Co homepage mockup"
          srcDoc={whiteoutCoHtml}
          className="h-full w-full"
          loading="lazy"
          aria-label="Whiteout Co homepage mockup"
        />
      </article>
    );
  }

  if (variant === "currentstone") {
    return (
      <article className="aspect-[2/3] overflow-hidden rounded-xl bg-black shadow-[0_24px_55px_-32px_rgba(0,0,0,0.95)]">
        <iframe
          title="Current & Stone homepage mockup"
          srcDoc={currentAndStoneHtml}
          className="h-full w-full"
          loading="lazy"
          aria-label="Current & Stone homepage mockup"
        />
      </article>
    );
  }

  return (
    <article className="overflow-hidden rounded-xl bg-[#0b0b0b] shadow-[0_24px_55px_-32px_rgba(0,0,0,0.95)]">
      <div className="flex items-center justify-between bg-[#0f0f0f] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-zinc-500/70" />
          <span className="h-2 w-2 rounded-full bg-zinc-500/50" />
          <span className="h-2 w-2 rounded-full bg-zinc-500/30" />
        </div>
        <span className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">
          Auto scroll homepage
        </span>
      </div>

      <div className="bg-[#0a0a0a] px-4 py-3">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="font-serif text-base text-white">{title}</p>
            <p className="text-[11px] text-zinc-400">{subtitle}</p>
          </div>
          <button
            type="button"
            className={`rounded-full ${accentBg} px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-black`}
          >
            Get quote
          </button>
        </div>

        <div className="relative overflow-hidden rounded-lg bg-black">
          <Image
            src={images[0]}
            alt=""
            className="h-36 w-full object-cover"
            width={1200}
            height={700}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-3">
            <p className="text-sm font-semibold text-white">{heroLabel}</p>
            <p className="mt-0.5 text-[11px] text-zinc-200">
              High-impact visuals build trust in seconds.
            </p>
          </div>
        </div>

        {variant === "concrete" && (
          <div className="mt-3 grid grid-cols-3 gap-2">
            <StatTile value="214" label="Driveways poured" />
            <StatTile value="4.9" label="Google rating" />
            <StatTile value="24h" label="Quote response" />
          </div>
        )}

        {variant === "excavating" && (
          <div className="mt-3 grid grid-cols-2 gap-2">
            <FeatureRow label="Residential excavation" />
            <FeatureRow label="Drainage and trenching" />
            <FeatureRow label="GPS grade accuracy" />
            <FeatureRow label="Before/after mapping" />
          </div>
        )}

        <div className="mt-3 rounded-lg bg-[#101010] px-3 py-2">
          <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">
            Why imagery matters
          </p>
          <p className={`mt-1 text-xs font-medium ${accentClass}`}>{metric}</p>
        </div>
      </div>
    </article>
  );
}

function StatTile({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-md bg-[#111111] px-2 py-2">
      <p className="text-sm font-semibold text-white">{value}</p>
      <p className="text-[10px] uppercase tracking-[0.14em] text-zinc-500">{label}</p>
    </div>
  );
}

function FeatureRow({ label }: { label: string }) {
  return (
    <div className="rounded-md bg-[#111111] px-2.5 py-2">
      <p className="text-[11px] text-zinc-300">{label}</p>
    </div>
  );
}

export function HomepageMockupShowcase() {
  return (
    <section className="w-full bg-white px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--brand-creative)]">
          Social Feed Extension
        </p>
        <h2 className="mt-3 font-serif text-3xl tracking-tight text-zinc-900 sm:text-4xl">
          Photo-led homepage mockups
        </h2>
        <p className="mt-3 max-w-3xl text-sm text-zinc-600">
          Each one now reads like a real homepage UI. Different structure,
          different hierarchy, same principle: better photography instantly makes
          the website feel premium and credible.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {MOCKUPS.map((mockup) => (
            <WebsiteMockup key={mockup.title} {...mockup} />
          ))}
        </div>
      </div>
    </section>
  );
}
