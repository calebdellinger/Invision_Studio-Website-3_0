import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ServicePageShell } from "@/components/site/service/ServicePageShell";

export const metadata: Metadata = {
  title: "3D Scanning & Gaussian Splatting Services",
  description:
    "High-fidelity Gaussian Splatting and volumetric digital twins. Immersive virtual tours, on-site safety training models, volumetric analysis, and site mapping.",
  keywords: [
    "3D scanning services",
    "Gaussian Splatting",
    "volumetric 3D scanning",
    "virtual tours of homes",
    "on-site safety training digital twins",
    "volumetric inspection analysis",
    "3D terrain mapping",
    "Unreal Engine 5 digital twins",
    "WebGPU 3D scan viewer",
  ],
  alternates: {
    canonical: "/services/3d-scanning",
  },
  openGraph: {
    title: "3D Scanning & Gaussian Splatting Services | Invision Creative",
    description:
      "Photorealistic digital twins, industrial training, and inspection mapping. 10x faster than traditional 3D modeling.",
    images: [
      {
        url: "/brand/logo_white.svg",
        width: 1600,
        height: 900,
        alt: "Invision Creative 3D Scanning services.",
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

function IconZap() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function IconCurrency() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
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
    question: "Is Gaussian Splatting cheaper than hiring a 3D artist to build models in Unreal Engine?",
    answer:
      "Significantly. Building a photorealistic digital twin by hand in a game engine can take weeks of modeling, texturing, and lighting work. Our Gaussian Splatting workflow captures the exact reality in hours. You get 100% accuracy for a fraction of the cost, making it feasible for training, marketing, and inspections where traditional 3D modeling would be budget-prohibitive.",
  },
  {
    question: "Can these interactive 3D scans run on normal mobile browsers?",
    answer:
      "Yes. We optimize our datasets using customized compression schemas. By utilizing modern WebGL and WebGPU canvas pipelines, our models load instantly and run at 60fps directly in mobile browsers without requiring any specialized applications.",
  },
  {
    question: "How can we use these scans for machine operation training?",
    answer:
      "Because our scans are volumetrically accurate digital twins, we can create interactive training modules where technicians 'walk' through the site, identify specific machine components, and practice safety protocols in a 1:1 replica of the actual environment they will be working in.",
  },
  {
    question: "Are these datasets compatible with Unreal Engine 5 or Unity?",
    answer:
      "Absolutely. We deliver cleaned `.ply` volumetric splat datasets that integrate seamlessly into Unreal Engine 5, Unity, and Blender. This allows development teams to use real-world assets as high-fidelity environments for cinematic virtual production or interactive training apps.",
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

function StatsStrip() {
  return (
    <div className="px-4 py-12">
      <div className="mx-auto grid max-w-3xl grid-cols-3 gap-4">
        {[
          { value: "−90%", label: "cost reduction · vs 3D modeling" },
          { value: "100%", label: "reality match · photographic volumetric" },
          { value: "60fps", label: "web performance · no plugin needed" },
        ].map(({ value, label }) => (
          <div key={label} className="text-center">
            <p className="text-2xl font-bold text-[var(--brand-creative)] sm:text-3xl [font-family:var(--font-montserrat)]">
              {value}
            </p>
            <p className="mt-1 text-[11px] leading-snug text-zinc-500">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CostComparisonSection() {
  const points = [
    {
      icon: <IconCurrency />,
      title: "Cost Efficiency",
      desc: "Traditional 3D environment design requires expensive artists and weeks of labor. Gaussian Splatting captures the same detail in hours, reducing production costs by up to 90%.",
    },
    {
      icon: <IconZap />,
      title: "Rapid Turnaround",
      desc: "Go from on-site capture to a web-ready interactive twin in days, not months. Perfect for construction progress tracking and fast-paced real estate markets.",
    },
    {
      icon: <IconShield />,
      title: "Absolute Accuracy",
      desc: "Manual modeling involves guesswork and 'artistic license'. Our scans use high-resolution 8K sensor data to ensure every pipe, wire, and structural element is exactly where it should be.",
    },
  ];

  return (
    <section className="border-t border-zinc-200 px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--brand-creative)]">
          The Advantage
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl [font-family:var(--font-fraunces)]">
          Why Gaussian Splatting beats traditional 3D modeling
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {points.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-5.5 text-left transition-all duration-300 ease-out shadow-[0_6px_16px_-4px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.02),inset_0_2px_0_rgba(255,255,255,1),inset_0_-4px_0_rgba(240,240,243,1)] hover:-translate-y-1 hover:rotate-[-1deg] hover:border-zinc-300 hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.1),0_6px_12px_-2px_rgba(0,0,0,0.03),inset_0_2px_0_rgba(255,255,255,1),inset_0_-4px_0_rgba(228,228,231,1)]"
            >
              {/* Shimmer sweep */}
              <span
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-zinc-100/35 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full"
                aria-hidden
              />
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-[var(--brand-creative)] shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.03),inset_0_-2px_0_rgba(228,228,231,1)]">
                {icon}
              </span>
              <h4 className="mt-4 text-base font-semibold text-zinc-900">{title}</h4>
              <p className="mt-2 text-xs leading-relaxed text-zinc-600">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrainingShowcase() {
  return (
    <section className="border-t border-zinc-200 px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--brand-creative)]">
          Real-World Training
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl [font-family:var(--font-fraunces)]">
          Show exactly how to operate machines
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600">
          Static manuals and 2D videos are limited. Our 3D digital twins allow you to place technicians inside a photorealistic environment where they can interact with the actual equipment they'll use on site.
        </p>
        
        <div className="mt-10 overflow-hidden rounded-3xl border border-zinc-200/80 bg-white shadow-[0_16px_36px_-8px_rgba(0,0,0,0.05),inset_0_2px_0_rgba(255,255,255,1),inset_0_-4px_0_rgba(240,240,243,1)]">
          <div className="grid md:grid-cols-2">
            <div className="p-6 lg:p-8">
              <div className="inline-flex rounded-full bg-[var(--brand-creative)]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--brand-creative)]">
                Case Study: Heavy Machinery
              </div>
              <h3 className="mt-4 text-xl font-semibold text-zinc-900">Excavator Safety Walkthrough</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                We captured a high-density Gaussian Splat of a Caterpillar 320 excavator. New operators use this scan to:
              </p>
              <ul className="mt-6 space-y-3 text-xs text-zinc-700">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--brand-creative)]">●</span>
                  Identify hydraulic check points and shut-off valves.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--brand-creative)]">●</span>
                  Visualize blind spots from the operator's perspective.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--brand-creative)]">●</span>
                  Practice on-site positioning before ever stepping foot in the cab.
                </li>
              </ul>
            </div>
            <div className="relative aspect-video md:aspect-auto bg-zinc-100">
               <div className="absolute inset-0 flex items-center justify-center opacity-40">
                 <IconMap />
               </div>
               {/* This is a placeholder for a specific training visual or another iframe if needed */}
               <div className="absolute inset-0 bg-gradient-to-l from-zinc-50 via-transparent to-transparent hidden md:block" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function UseCaseGrid() {
  const cases = [
    {
      Icon: IconHome,
      label: "Real Estate & Spaces",
      title: "Virtual Tours of Homes",
      description:
        "Luxury real estate walkthroughs that feel like video, but let the user navigate anywhere. Gaussian Splatting captures natural light shafts, glass reflections, and complex textiles with absolute photorealism.",
      applications: ["Luxury property tours", "Retail showroom twins", "Hotel & resort showcases"],
    },
    {
      Icon: IconShield,
      label: "Operations & HR",
      title: "On-Site Training & Safety",
      description:
        "Create 1:1 volumetric replicas of active factories, drilling rigs, or hazard zones. Enable technicians to perform walkthroughs, identify safety exits, and locate shut-off valves virtually.",
      applications: ["Industrial safety walkthroughs", "Equipment location training", "Crisis response planning"],
    },
    {
      Icon: IconChart,
      label: "Construction & Engineering",
      title: "Inspections & Analysis",
      description:
        "Assess structural integrity, verify construction progress over time, and analyze spacing tolerances. Compare volumetric captures to CAD models to verify assembly alignment and detect architectural drift.",
      applications: ["Construction delta analysis", "Structural wear inspections", "Clearance measurement check"],
    },
    {
      Icon: IconMap,
      label: "GIS & Surveying",
      title: "Precision Site Mapping",
      description:
        "Capture wide-area coordinates, terrain elevations, and building footprints. High-density volumetric scanning yields beautiful, readable 3D maps perfect for civil planning.",
      applications: ["Topography mapping", "Outdoor infrastructure twins", "Environmental documentation"],
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {cases.map(({ Icon, label, title, description, applications }) => (
        <div
          key={title}
          className="group relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-5.5 text-left transition-all duration-300 ease-out shadow-[0_6px_16px_-4px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.02),inset_0_2px_0_rgba(255,255,255,1),inset_0_-4px_0_rgba(240,240,243,1)] hover:-translate-y-1 hover:rotate-[1deg] hover:border-zinc-300 hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.1),0_6px_12px_-2px_rgba(0,0,0,0.03),inset_0_2px_0_rgba(255,255,255,1),inset_0_-4px_0_rgba(228,228,231,1)]"
        >
          {/* Shimmer sweep */}
          <span
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-zinc-100/35 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full"
            aria-hidden
          />
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-[var(--brand-creative)] shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.03),inset_0_-2px_0_rgba(228,228,231,1)]">
              <Icon />
            </span>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--brand-creative)]">
              {label}
            </p>
          </div>
          <h3 className="mt-4 text-base font-semibold text-zinc-900">{title}</h3>
          <p className="mt-2 text-xs leading-relaxed text-zinc-600">{description}</p>
          <div className="mt-4 flex flex-wrap gap-1.5 relative z-10">
            {applications.map((app) => (
              <span
                key={app}
                className="rounded-full border border-zinc-200 bg-zinc-100 px-2.5 py-0.5 text-[9px] font-medium tracking-wide text-zinc-600"
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
    { label: "Capture Resolution", value: "8K sensor source data with high-density photographic capture" },
    { label: "Splat Density", value: "Up to 15 million points per standard room sector" },
    { label: "Web Delivery Format", value: "WebGPU/WebGL binary stream (.ply) for zero-plugin browser loading" },
    { label: "Offline Rendering", value: "PLY cloud maps, Blender integration templates, Unreal Engine 5 plugins" },
    { label: "Browser Performance", value: "Solid 60fps on modern mobile and desktop screens" },
  ];

  return (
    <div className="rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-[0_16px_36px_-8px_rgba(0,0,0,0.05),inset_0_2px_0_rgba(255,255,255,1),inset_0_-4px_0_rgba(240,240,243,1)]">
      <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--brand-creative)]">
        Technical Specifications
      </p>
      <h3 className="mt-1 text-xl font-semibold text-zinc-900 [font-family:var(--font-montserrat)] tracking-tight">
        Technical Deliverables Matrix
      </h3>
      <p className="mt-2 text-xs text-zinc-500">
        Every project includes a complete package of optimized, industry-standard digital assets.
      </p>
      
      <div className="mt-6 divide-y divide-zinc-100">
        {techSpecs.map((spec) => (
          <div
            key={spec.label}
            className="flex flex-col py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between sm:gap-6 group/row hover:bg-zinc-50/20 transition-colors rounded-xl px-2 -mx-2"
          >
            <div className="flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-creative)]" />
              <span className="text-xs font-bold text-zinc-800">{spec.label}</span>
            </div>
            <span className="mt-2 text-xs text-zinc-600 font-medium sm:mt-0 sm:text-right max-w-md bg-zinc-50/50 border border-zinc-200/40 rounded-lg px-3.5 py-2 shadow-[inset_0_1px_2px_rgba(0,0,0,0.01)]">
              {spec.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SpecComparisonTable() {
  const specs = [
    { feature: "Capture Time", splats: "1 - 2 hours", mesh: "3 - 5 hours", photo: "2 - 4 hours" },
    { feature: "Reflections & Glass", splats: "Photorealistic (Natural)", mesh: "Failed (Distorted / Warped)", photo: "Static only" },
    { feature: "Mobile Compatibility", splats: "60fps (WebGPU/WebGL)", mesh: "Heavy downloads / sluggish", photo: "2D limitation" },
    { feature: "Game Engine Ready", splats: "Yes (UE5/Unity PLY)", mesh: "Yes (Mesh decimation needed)", photo: "No (Texture only)" },
    { feature: "Volumetric Accuracy", splats: "High (Photogrammetric)", mesh: "Low (Edge clipping)", photo: "N/A" },
  ];

  return (
    <div className="overflow-x-auto rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-[0_16px_36px_-8px_rgba(0,0,0,0.05),inset_0_2px_0_rgba(255,255,255,1),inset_0_-4px_0_rgba(240,240,243,1)]">
      <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--brand-creative)]">
        Technology Contrast
      </p>
      <h3 className="mt-2 text-xl font-semibold text-zinc-900 [font-family:var(--font-montserrat)] tracking-tight">
        Gaussian Splatting vs. Legacy Methods
      </h3>
      <table className="mt-6 w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-zinc-200">
            <th className="pb-4 pr-6 text-[10px] font-bold uppercase tracking-wider text-zinc-400">Feature</th>
            <th className="pb-4 px-6 border-x border-[var(--brand-creative)]/5 bg-[var(--brand-creative)]/[0.02] text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--brand-creative)]/10 px-3 py-1 text-[9px] font-extrabold uppercase tracking-widest text-[var(--brand-creative)] shadow-[0_2px_4px_rgba(80,161,42,0.04)]">
                Gaussian Splatting
              </span>
            </th>
            <th className="pb-4 px-6 text-[10px] font-bold uppercase tracking-wider text-zinc-500 text-center">Legacy Mesh</th>
            <th className="pb-4 pl-6 text-[10px] font-bold uppercase tracking-wider text-zinc-500 text-center">Standard Photo</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 text-zinc-700">
          {specs.map((spec) => (
            <tr key={spec.feature} className="group/row hover:bg-zinc-50/40 transition-colors">
              <td className="py-4 pr-6 font-bold text-zinc-800 border-b border-zinc-100">
                {spec.feature}
              </td>
              
              {/* Gaussian Splatting (Featured Column Highlight) */}
              <td className="py-4 px-6 text-center bg-[var(--brand-creative)]/[0.02] border-x border-[var(--brand-creative)]/5 border-b border-zinc-100/80">
                <span className="inline-flex items-center justify-center font-bold text-[color-mix(in_srgb,var(--brand-creative)_90%,black_10%)] bg-[var(--brand-creative)]/5 px-2.5 py-1 rounded-lg">
                  {spec.splats}
                </span>
              </td>
              
              {/* Legacy Mesh */}
              <td className="py-4 px-6 text-center text-zinc-500 border-b border-zinc-100">
                <span className="inline-flex items-center justify-center font-semibold text-zinc-500 bg-zinc-100/50 px-2 py-0.5 rounded-md">
                  {spec.mesh}
                </span>
              </td>
              
              {/* Standard Photo */}
              <td className="py-4 pl-6 text-center text-zinc-400 border-b border-zinc-100">
                <span className="inline-flex items-center justify-center font-medium text-zinc-400 bg-zinc-100/20 px-2 py-0.5 rounded-md">
                  {spec.photo}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Main Page Entry ─────────────────────────────────────────────────────────

export default function ThreeDScanningServicePage() {
  return (
    <div className="bg-white">
      <Script
        id="gaussian-faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ServicePageShell
        eyebrow="3D Scanning & Gaussian Splatting"
        title="Photorealistic digital twins that breathe with light"
        subtitle="Go beyond flat images and chunky polygon models. We use Gaussian Splatting to convert physical homes, jobsites, and assets into interactive digital twins. Experience true depth, natural light reflections, and volumetric spatial accuracy."
        introSlot={
          <div className="mt-8 space-y-4">
            <div className="overflow-hidden rounded-xl relative group bg-white">
              <iframe
                src="/viewer/index.html?content=/gaussian-splatting-files/gs_Excavator_2.compressed.ply&settings=/gaussian-splatting-files/settings-0ece2333.json"
                className="w-full h-[400px] sm:h-[500px] md:h-[600px] rounded-xl outline-none"
                style={{ border: "none" }}
                allow="xr-spatial-tracking; fullscreen"
                title="Interactive 3D Gaussian Splatting Viewer"
              />
              <div className="absolute top-4 right-4 pointer-events-none rounded bg-black/50 px-2 py-1 text-xs text-white/70 backdrop-blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Interactive 3D Viewer
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-xs text-zinc-500 bg-zinc-50 py-2.5 px-4 rounded-lg border border-zinc-200">
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-[var(--brand-creative)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
                <span><strong>Click and drag</strong> to rotate around the model</span>
              </div>
              <span className="hidden sm:block w-1 h-1 rounded-full bg-zinc-300"></span>
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-[var(--brand-creative)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span><strong>Click annotations</strong> to focus on details</span>
              </div>
            </div>
          </div>
        }
        powerTitle="Four spatial use cases we deliver"
        powerBody={
          <>
            <StatsStrip />
            <UseCaseGrid />
          </>
        }
        assetTitle="Volumetric Deliverables & Integration"
        assetBody={
          <div className="space-y-12">
            <DeliverablesBreakdown />
            <CostComparisonSection />
            <TrainingShowcase />
          </div>
        }
        compoundTitle="Comparative Benchmarks"
        compoundBody={
          <div className="space-y-6">
            <p className="text-sm leading-relaxed text-zinc-600">
              Unlike Matterport or standard photogrammetry which stretch pictures over rigid triangles, Gaussian Splatting models the scene using millions of fuzzy 3D ellipsoids. This captures semi-transparent zones, fine wires, foliage, and glass highlights with perfect clarity.
            </p>
            <SpecComparisonTable />
          </div>
        }
        footerSlot={
          <div className="space-y-12">
            
            {/* FAQ Block */}
            <section>
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 [font-family:var(--font-fraunces)] sm:text-3xl">
                Frequently asked questions
              </h2>
              <p className="mt-3 text-sm text-zinc-500">
                Answers to key spatial precision, speed, and cost questions.
              </p>
              <div className="mt-6 space-y-3">
                {faqItems.map((item) => (
                  <details
                    key={item.question}
                    className="group rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.04),inset_0_2px_0_rgba(255,255,255,1),inset_0_-3px_0_rgba(240,240,243,1)] transition-colors duration-300 hover:border-zinc-300"
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

            {/* Related Services */}
            <section>
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 [font-family:var(--font-fraunces)] sm:text-3xl">
                Pair 3D digital twins with
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
                    desc: "Inject high-resolution detail photos alongside volumetric models for marketing portfolios and detail highlights.",
                  },
                  {
                    href: "/services/videography",
                    label: "Dynamic Assets",
                    title: "Professional Videography",
                    desc: "Generate cinematic drone footage and walkthrough cuts to introduce properties before viewers dive into interactive paths.",
                  },
                  {
                    href: "/services/ai-integrations",
                    label: "Automated Workflows",
                    title: "AI & Automation Integrations",
                    desc: "Connect your volumetric models to auto-tagging vision pipelines or sync inspections directly to ERP database systems.",
                  },
                ].map(({ href, label, title, desc }) => (
                  <Link
                    key={href}
                    href={href}
                    className="group relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-5.5 text-left transition-all duration-300 ease-out shadow-[0_6px_16px_-4px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.02),inset_0_2px_0_rgba(255,255,255,1),inset_0_-4px_0_rgba(240,240,243,1)] hover:-translate-y-1 hover:rotate-[1deg] hover:border-[var(--brand-creative)]/50 hover:shadow-[0_12px_24px_-8px_rgba(80,161,42,0.08),0_6px_12px_-2px_rgba(80,161,42,0.03),inset_0_2px_0_rgba(255,255,255,1),inset_0_-4px_0_rgba(228,228,231,1)]"
                  >
                    {/* Shimmer sweep */}
                    <span
                      className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-zinc-100/35 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full"
                      aria-hidden
                    />
                    <p className="relative z-10 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--brand-creative)]">
                      {label}
                    </p>
                    <h3 className="relative z-10 mt-2 text-lg font-semibold tracking-tight text-zinc-900">
                      {title}
                    </h3>
                    <p className="relative z-10 mt-2 text-sm leading-relaxed text-zinc-600 font-normal">
                      {desc}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        }
      />
    </div>
  );
}
