import Image from "next/image";
function BrowserChrome({ children, url }: { children: React.ReactNode; url: string }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-[#101010] shadow-[0_40px_80px_-24px_rgba(0,0,0,0.85)] ring-1 ring-white/[0.06]">
      <div className="flex items-center gap-3 border-b border-white/[0.06] bg-[#161616] px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <span className="rounded-md bg-[#0a0a0a] px-4 py-1 text-[11px] tracking-wide text-zinc-500">
            {url}
          </span>
        </div>
        <div className="w-[52px]" />
      </div>
      {children}
    </div>
  );
}

function PhoneChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-[180px] shrink-0 overflow-hidden rounded-[2.4rem] bg-[#0a0a0a] p-[6px] shadow-[0_40px_80px_-24px_rgba(0,0,0,0.9)] ring-1 ring-white/10">
      <div className="absolute inset-x-0 top-[6px] z-10 flex justify-center">
        <div className="h-5 w-20 rounded-b-xl bg-[#0a0a0a]" />
      </div>
      <div className="overflow-hidden rounded-[2rem] bg-black">{children}</div>
    </div>
  );
}

function StatPill({ value, label, accent }: { value: string; label: string; accent: string }) {
  return (
    <div className="flex flex-col gap-1.5 border-l-2 pl-4" style={{ borderColor: accent }}>
      <span className="font-serif text-4xl text-white">{value}</span>
      <span className="text-xs uppercase tracking-[0.18em] text-zinc-500">{label}</span>
    </div>
  );
}

function UseCaseCard({
  label,
  sublabel,
  imageSrc,
  overlay,
}: {
  label: string;
  sublabel: string;
  imageSrc: string;
  overlay?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-zinc-900 ring-1 ring-white/[0.07]">
        <Image src={imageSrc} alt={label} fill className="object-cover" sizes="(max-width: 768px) 90vw, 30vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {overlay}
      </div>
      <div>
        <p className="text-sm font-medium text-zinc-900">{label}</p>
        <p className="mt-0.5 text-xs text-zinc-500">{sublabel}</p>
      </div>
    </div>
  );
}

export function HomepageMockupShowcase() {
  return (
    <div className="w-full bg-white">

      {/* Part 1: Featured Mockup Sites */}
      <section className="w-full bg-[#0c0c0c] px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--brand-creative)]">
            Website Mockups
          </p>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-serif text-3xl tracking-tight text-white sm:text-4xl">
              What your business<br className="hidden sm:block" /> could look like.
            </h2>
            <p className="max-w-xs text-sm leading-relaxed text-zinc-400 sm:text-right">
              Two concept sites built entirely around photography we shot for those businesses.
            </p>
          </div>

          {/* Mockup A: Whiteout Co */}
          <div className="mt-16 grid items-center gap-10 lg:grid-cols-[1fr_2fr]">
            <div className="flex flex-col gap-5">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">Concept 01</p>
                <h3 className="mt-2 font-serif text-2xl text-white">Whiteout Co.</h3>
                <p className="mt-1 text-sm text-zinc-400">Snow &amp; ice management</p>
              </div>
              <p className="text-sm leading-relaxed text-zinc-400">
                Cinematic winter photography transforms a seasonal service business into a brand
                people remember and trust before they read a single word.
              </p>
              <div className="h-px w-12 bg-zinc-800" />
              <p className="text-xs italic text-zinc-600">
                Seasonal visuals improved contact intent by 44 points
              </p>
            </div>
            <BrowserChrome url="whiteout-co.com">
              <div className="aspect-[16/10] overflow-hidden">
                <iframe
                  title="Whiteout Co homepage mockup"
                  src="/mockups/whiteout_co_mockup.html"
                  className="h-full w-full"
                  loading="lazy"
                  aria-label="Whiteout Co homepage mockup"
                />
              </div>
            </BrowserChrome>
          </div>

          <div className="my-20 h-px w-full bg-white/[0.06]" />

          {/* Mockup B: Apex Detail */}
          <div className="grid items-center gap-10 lg:grid-cols-[2fr_1fr]">
            <div className="flex items-end gap-5">
              <div className="flex-1">
                <BrowserChrome url="apexdetailco.com">
                  <div className="aspect-[4/3] overflow-hidden">
                    <iframe
                      title="Apex Detail homepage mockup"
                      src="/mockups/apex_detail_mockup.html"
                      className="h-full w-full"
                      loading="lazy"
                      aria-label="Apex Detail homepage mockup"
                    />
                  </div>
                </BrowserChrome>
              </div>
              <PhoneChrome>
                <div style={{ height: 360, overflow: "hidden" }}>
                  <iframe
                    title="Apex Detail mobile mockup"
                    src="/mockups/apex_detail_mockup.html"
                    className="h-full w-full"
                    loading="lazy"
                    aria-label="Apex Detail mobile view"
                    style={{ width: "200%", transform: "scale(0.5)", transformOrigin: "top left" }}
                  />
                </div>
              </PhoneChrome>
            </div>
            <div className="flex flex-col gap-5">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">Concept 02</p>
                <h3 className="mt-2 font-serif text-2xl text-white">Apex Detail</h3>
                <p className="mt-1 text-sm text-zinc-400">Paint correction &amp; ceramic coating</p>
              </div>
              <p className="text-sm leading-relaxed text-zinc-400">
                High-gloss before/after imagery does the selling. Customers see the
                transformation before they book.
              </p>
              <div className="h-px w-12 bg-zinc-800" />
              <p className="text-xs italic text-zinc-600">
                Before/after hero imagery improved bookings by 52 points
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Part 2: Full-bleed editorial statement */}
      <section className="relative w-full overflow-hidden" style={{ minHeight: "420px", height: "65vh" }}>
        <Image
          src="/rebuild-gallery/DJI_20250602131946_0254_D.jpg"
          alt="Aerial site photography"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/10" />
        <div className="absolute inset-0 flex items-center px-6 sm:px-12 lg:px-24">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--brand-creative)]">
              The visual advantage
            </p>
            <h2 className="mt-5 font-serif text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
              You have 50 milliseconds<br />
              to earn the click.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-zinc-300 sm:text-base">
              That is how long it takes a visitor to judge your brand.
              Professional photography does not just look good &mdash;
              it is the difference between a scroll and a sale.
            </p>
          </div>
        </div>
      </section>

      {/* Part 3: One shoot, every surface */}
      <section className="w-full bg-[#f7f7f7] px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--brand-creative)]">
            Versatility
          </p>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-serif text-3xl tracking-tight text-zinc-900 sm:text-4xl">
              One shoot.<br className="hidden sm:block" /> Every surface.
            </h2>
            <p className="max-w-xs text-sm leading-relaxed text-zinc-500 sm:text-right">
              Great photography works across your entire business.
            </p>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            <UseCaseCard
              label="Website hero"
              sublabel="The first thing they see"
              imageSrc="/rebuild-gallery/6F4A3334.jpg"
              overlay={
                <div className="absolute inset-x-0 bottom-0 p-3">
                  <div className="rounded-lg bg-black/60 px-3 py-2 backdrop-blur-sm">
                    <p className="text-[10px] uppercase tracking-widest text-zinc-400">Homepage hero</p>
                    <p className="mt-0.5 text-xs font-medium text-white">Built for the first impression</p>
                  </div>
                </div>
              }
            />
            <UseCaseCard
              label="Social content"
              sublabel="Feed stops, follows earned"
              imageSrc="/rebuild-gallery/badass.jpg"
              overlay={
                <div className="absolute inset-x-0 bottom-0 p-3">
                  <div className="flex items-center gap-2 rounded-lg bg-black/60 px-3 py-2 backdrop-blur-sm">
                    <div className="h-6 w-6 shrink-0 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-400" />
                    <div>
                      <p className="text-[10px] text-zinc-300">@invisioncreative</p>
                      <p className="text-[10px] text-zinc-500">689 likes</p>
                    </div>
                  </div>
                </div>
              }
            />
            <UseCaseCard
              label="Print and signage"
              sublabel="Brochures, mailers, trade show"
              imageSrc="/rebuild-gallery/6F4A8380-2.jpg"
              overlay={
                <div className="absolute inset-0 flex items-end p-3">
                  <div className="w-full rounded-lg border border-white/20 bg-black/50 px-3 py-2 backdrop-blur-sm">
                    <p className="text-[10px] uppercase tracking-widest text-zinc-400">Print ready</p>
                    <p className="mt-0.5 text-xs font-medium text-white">Full-bleed, any format</p>
                  </div>
                </div>
              }
            />
          </div>

          <div className="mt-10 flex flex-wrap gap-2.5">
            {[
              "Google Business profile",
              "Email campaigns",
              "Proposals and pitch decks",
              "Vehicle wraps",
              "Yard signs",
              "LinkedIn",
              "Recruiting materials",
              "Video thumbnails",
            ].map((use) => (
              <span
                key={use}
                className="rounded-full border border-zinc-200 bg-white px-4 py-1.5 text-xs text-zinc-500"
              >
                {use}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Part 4: Impact stats */}
      <section className="relative w-full overflow-hidden bg-[#0c0c0c] px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-[0.06]">
          <Image
            src="/rebuild-gallery/3pillarsHero.jpg"
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
            aria-hidden={true}
          />
        </div>
        <div className="relative mx-auto w-full max-w-6xl">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--brand-creative)]">
            By the numbers
          </p>
          <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <StatPill value="118%" label="more views with pro photos" accent="#a78bfa" />
            <StatPill value="50ms" label="to form a brand opinion" accent="#34d399" />
            <StatPill value="40x" label="more shared visual content" accent="#f59e0b" />
            <StatPill value="67%" label="say image quality is critical" accent="#38bdf8" />
          </div>
          <p className="mt-10 text-xs text-zinc-700">
            Sources: Redfin, MIT Media Lab, HubSpot, BigCommerce
          </p>
        </div>
      </section>

    </div>
  );
}
