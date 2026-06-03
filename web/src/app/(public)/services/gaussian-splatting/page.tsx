import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ServicePageShell } from "@/components/site/service/ServicePageShell";

export const metadata: Metadata = {
  title: "Gaussian Splatting & Volumetric 3D Scanning",
  description:
    "High-fidelity Gaussian Splatting and 3D digital twins. Immersive virtual tours of homes, on-site safety training models, volumetric analysis, and site mapping.",
  keywords: [
    "Gaussian Splatting services",
    "3D volumetric scanning",
    "virtual tours of homes",
    "real estate 3D scanning",
    "on-site safety training digital twins",
    "volumetric inspection analysis",
    "3D terrain mapping",
    "Unreal Engine 5 digital twins",
    "WebGPU 3D scan viewer",
  ],
  alternates: {
    canonical: "/services/gaussian-splatting",
  },
  openGraph: {
    title: "Gaussian Splatting & 3D Scanning Services | Invision Creative",
    description:
      "Photorealistic digital twins, immersive real estate walkthroughs, industrial training, and inspection mapping.",
    images: [
      {
        url: "/brand/logo_white.svg",
        width: 1600,
        height: 900,
        alt: "Invision Creative Gaussian Splatting services.",
      },
    ],
  },
};

// ─── Inline icons ─────────────────────────────────────────────────────────────

function IconHome() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function IconChart() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function IconMap() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
      <line x1="9" y1="3" x2="9" y2="18" />
      <line x1="15" y1="6" x2="15" y2="21" />
    </svg>
  );
}

// ─── FAQ Data ─────────────────────────────────────────────────────────────────

const faqItems = [
  {
    question: "What is Gaussian Splatting and how does it differ from traditional 3D scanning?",
    answer:
      "Traditional 3D scanning projects points onto a polygon mesh, which struggles with complex geometries like leaves, glass reflections, and hair. Gaussian Splatting represents physical space using overlapping 3D ellipsoids (Gaussians) with mathematical transparency and color channels. This makes it possible to capture volumetric lighting, real reflections, and photorealistic environments without polygon limitations.",
  },
  {
    question: "Can these interactive 3D scans run on normal mobile browsers?",
    answer:
      "Yes. We optimize our splat datasets using customized compression schemas. By utilizing modern WebGL and WebGPU canvas pipelines, our models load instantly and run at 60fps directly in mobile browsers (iOS and Android) without requiring any downloads, plugins, or specialized applications.",
  },
  {
    question: "How long does a scanning session take on site?",
    answer:
      "A typical residential home or small commercial building scan can be captured in 1 to 2 hours using high-grade camera rigs and Lidar captures. Industrial complexes or large outdoor mapping coordinates vary depending on acreage but generally range from a half-day to two full production days.",
  },
  {
    question: "Are these datasets compatible with game engines like Unreal Engine 5 or Unity?",
    answer:
      "Absolutely. We deliver fully cleaned `.ply` volumetric splat datasets that integrate seamlessly into Unreal Engine 5, Unity, and Blender. This allows development teams to use real-world assets as high-fidelity environments for cinematic virtual production, game levels, or interactive training applications.",
  },
  {
    question: "Can we use Gaussian Splatting to make actual measurements?",
    answer:
      "Yes. By combining photographic Gaussian splat datasets with Lidar telemetry, our digital twins are cross-referenced to absolute dimensions. This enables millimeter-accurate scale measurement tools inside the interactive viewer for structural inspections, clearances, and mapping analysis.",
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

// ─── Components ───────────────────────────────────────────────────────────────

function UseCaseGrid() {
  const cases = [
    {
      Icon: IconHome,
      label: "Real Estate & Spaces",
      title: "Virtual Tours of Homes",
      description:
        "Luxury real estate walkthroughs that feel like video, but let the user navigate anywhere. Unlike polygonal meshes (e.g. Matterport) which warp and clip, Gaussian Splatting captures natural light shafts, glass reflections, and complex textiles with absolute photorealism.",
      applications: ["Luxury property tours", "Retail showroom twins", "Hotel & resort showcases"],
    },
    {
      Icon: IconShield,
      label: "Operations & HR",
      title: "On-Site Training & Safety",
      description:
        "Create 1:1 volumetric replicas of active factories, drilling rigs, electrical grids, or hazard zones. Enable new technicians to perform walkthroughs, identify safety exits, and locate shut-off valves virtually, reducing training overhead and incident risks.",
      applications: ["Industrial safety walkthroughs", "Equipment location training", "Crisis response planning"],
    },
    {
      Icon: IconChart,
      label: "Construction & Engineering",
      title: "Inspections & Analysis",
      description:
        "Assess structural integrity, verify construction progress over time, and analyze spacing tolerances in volumetric 3D. Compare monthly scans to CAD models to verify assembly alignment and detect architectural drift.",
      applications: ["Construction delta analysis", "Structural wear inspections", "Clearance measurement check"],
    },
    {
      Icon: IconMap,
      label: "GIS & Surveying",
      title: "Precision Site Mapping",
      description:
        "Capture wide-area coordinates, terrain elevations, and building footprints. High-density volumetric scanning yields beautiful, readable 3D maps perfect for geological archives, civil planning, and outdoor asset management.",
      applications: ["Topography mapping", "Outdoor infrastructure twins", "Environmental documentation"],
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {cases.map(({ Icon, label, title, description, applications }) => (
        <div
          key={title}
          className="rounded-xl border border-white/[0.08] bg-[#0c0c0d] p-5 ring-1 ring-inset ring-white/[0.03]"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md border border-white/10 bg-[#121213] text-[var(--brand-creative)]">
              <Icon />
            </span>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--brand-creative)]">
              {label}
            </p>
          </div>
          <h3 className="mt-4 text-base font-semibold text-white">{title}</h3>
          <p className="mt-2 text-xs leading-relaxed text-zinc-400">{description}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {applications.map((app) => (
              <span
                key={app}
                className="rounded-full border border-white/[0.07] bg-white/[0.03] px-2.5 py-0.5 text-[9px] font-medium tracking-wide text-zinc-500"
              >
                {app}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function DeliverablesBreakdown() {
  const techSpecs = [
    { label: "Capture Resolution", value: "8K sensor source data with active Lidar calibration" },
    { label: "Splat Density", value: "Up to 15 million points per standard room sector" },
    { label: "Web Delivery Format", value: "WebGPU/WebGL binary stream (.ply) for zero-plugin browser loading" },
    { label: "Offline Rendering", value: "PLY cloud maps, Blender integration templates, Unreal Engine 5 plugins" },
    { label: "Browser Performance", value: "Solid 60fps on modern mobile and desktop screens" },
  ];

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-white/[0.07] bg-[#0c0c0d] p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Technical Deliverables Matrix</h3>
        <p className="mt-1 text-xs text-zinc-500">Every scanning project includes a complete package of digital files.</p>
        <div className="mt-4 divide-y divide-white/[0.06]">
          {techSpecs.map((spec) => (
            <div key={spec.label} className="flex flex-col py-3 sm:flex-row sm:justify-between sm:gap-6">
              <span className="text-xs font-semibold text-zinc-400">{spec.label}</span>
              <span className="mt-1 text-xs text-zinc-300 sm:mt-0 sm:text-right">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="rounded-lg border border-white/[0.05] bg-white/[0.01] px-4 py-3 text-xs leading-relaxed text-zinc-500">
        <span className="font-semibold text-zinc-400">Production Note:</span> We coordinate directly with your web team to provide easy &lt;iframe&gt; embeds or customizable React canvas nodes for seamless web integration.
      </p>
    </div>
  );
}

function SpecComparisonTable() {
  const specs = [
    { feature: "Capture Time", splats: "1 - 2 hours", mesh: "3 - 5 hours", lidar: "2 - 4 hours" },
    { feature: "Reflections & Glass", splats: "Photorealistic (Natural)", mesh: "Failed (Distorted / Warped)", lidar: "Incomplete (Point cloud only)" },
    { feature: "Mobile Compatibility", splats: "60fps (WebGPU/WebGL)", mesh: "Heavy downloads / sluggish", lidar: "Heavy raw point clouds" },
    { feature: "Game Engine Ready", splats: "Yes (UE5/Unity PLY)", mesh: "Yes (Mesh decimation needed)", lidar: "Yes (Heavy reconstruction)" },
    { feature: "Volumetric Accuracy", splats: "High (millimeter-matched)", mesh: "Low (edge clipping)", lidar: "Ultra-High" },
  ];

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/[0.08] bg-[#0d0d0e] p-6 ring-1 ring-inset ring-white/[0.03]">
      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--brand-creative)]">
        Technology Contrast
      </p>
      <h3 className="mt-2 text-xl font-semibold text-white [font-family:var(--font-montserrat)]">
        Volumetric Splatting vs. Legacy Methods
      </h3>
      <p className="mt-1 text-xs text-zinc-500">
        How Gaussian Splatting stacks up against polygon meshing and raw Lidar scans.
      </p>
      <table className="mt-6 w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-white/[0.08] text-zinc-500 font-semibold uppercase tracking-wider">
            <th className="pb-3 pr-4">Feature</th>
            <th className="pb-3 px-4 text-[var(--brand-creative)]">Gaussian Splatting</th>
            <th className="pb-3 px-4">Legacy Mesh</th>
            <th className="pb-3 pl-4">Raw Lidar</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.06] text-zinc-300">
          {specs.map((spec) => (
            <tr key={spec.feature}>
              <td className="py-3 pr-4 font-medium text-zinc-400">{spec.feature}</td>
              <td className="py-3 px-4 font-semibold text-[color-mix(in_srgb,var(--brand-creative)_90%,white_10%)]">{spec.splats}</td>
              <td className="py-3 px-4 text-zinc-500">{spec.mesh}</td>
              <td className="py-3 pl-4 text-zinc-500">{spec.lidar}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Main Page Entry ─────────────────────────────────────────────────────────

export default function GaussianSplattingServicePage() {
  return (
    <>
      <Script
        id="gaussian-faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ServicePageShell
        eyebrow="Volumetric Scanning"
        title="Photorealistic 3D scans that breathe with light"
        subtitle="Go beyond flat images and chunky polygon models. We use Gaussian Splatting to scan physical homes, jobsites, and assets, converting them into interactive 3D digital twins. Experience true depth, natural light reflections, and volumetric spatial accuracy."

        powerTitle="Four spatial use cases we deliver"
        powerBody={<UseCaseGrid />}
        assetTitle="Volumetric Deliverables & Integration"
        assetBody={<DeliverablesBreakdown />}
        compoundTitle="Comparative Benchmarks"
        compoundBody={
          <div className="space-y-6">
            <p className="text-sm leading-relaxed text-zinc-400">
              Unlike Matterport or standard photogrammetry which stretch pictures over rigid triangles, Gaussian Splatting models the scene using millions of fuzzy 3D ellipsoids. This captures semi-transparent zones, fine wires, foliage, and glass highlights with perfect clarity.
            </p>
            <SpecComparisonTable />
          </div>
        }
        footerSlot={
          <div className="space-y-12">
            
            {/* FAQ Block */}
            <section>
              <h2 className="text-2xl font-semibold tracking-tight text-white [font-family:var(--font-fraunces)] sm:text-3xl">
                Frequently asked questions
              </h2>
              <p className="mt-3 text-sm text-zinc-500">
                Answers to key spatial precision, speed, and browser compatibility questions.
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
                Pair volumetric scans with
              </h2>
              <p className="mt-3 text-sm text-zinc-500">
                Volumetric digital twins operate best as part of a connected media ecosystem.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  {
                    href: "/services/photography",
                    label: "Original Assets",
                    title: "Commercial Photography",
                    desc: "Inject high-resolution, sharp detail photos alongside volumetric models for marketing portfolios, detail highlights, and print materials.",
                  },
                  {
                    href: "/services/videography",
                    label: "Dynamic Assets",
                    title: "Professional Videography",
                    desc: "Generate 4K cinematic drone footage and walkthrough cuts to introduce properties and sites before viewers dive into interactive splat paths.",
                  },
                  {
                    href: "/services/ai-integrations",
                    label: "Automated Workflows",
                    title: "AI & Automation Integrations",
                    desc: "Connect your volumetric models to auto-tagging vision pipelines or sync active site inspections directly to project management ERP database systems.",
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
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400 font-normal">
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
