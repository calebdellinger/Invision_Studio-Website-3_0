"use client";

import Image from "next/image";
import { motion } from "framer-motion";

function BrowserChrome({ children, url }: { children: React.ReactNode; url: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl shadow-[0_40px_80px_-24px_rgba(0,0,0,0.85)] border border-white/10 ring-1 ring-white/5"
    >
      <div className="flex items-center gap-3 border-b border-white/10 bg-black/40 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-white/10" />
          <span className="h-3 w-3 rounded-full bg-white/10" />
          <span className="h-3 w-3 rounded-full bg-white/10" />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <span className="rounded-md bg-white/5 px-4 py-1 text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-medium">
            {url}
          </span>
        </div>
        <div className="w-[52px]" />
      </div>
      <div className="relative">
        {children}
        <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/5 rounded-b-2xl" />
      </div>
    </motion.div>
  );
}

function PhoneChrome({ children }: { children: React.ReactNode }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-[180px] shrink-0 overflow-hidden rounded-[2.8rem] bg-[#050505] p-[7px] shadow-[0_40px_80px_-24px_rgba(0,0,0,0.95)] border border-white/10"
    >
      {/* Dynamic Island style notch */}
      <div className="absolute inset-x-0 top-[12px] z-10 flex justify-center">
        <div className="h-5 w-24 rounded-full bg-black border border-white/5" />
      </div>
      <div className="overflow-hidden rounded-[2.4rem] bg-black ring-1 ring-white/5">
        {children}
      </div>
    </motion.div>
  );
}

function StatCard({ value, label, accent }: { value: string; label: string; accent: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative flex flex-col gap-2 p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
    >
      <div 
        className="absolute top-0 left-6 h-px w-12 transition-all group-hover:w-20" 
        style={{ backgroundColor: accent }} 
      />
      <span className="font-serif text-5xl text-white tracking-tight">{value}</span>
      <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-semibold">{label}</span>
    </motion.div>
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
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="flex flex-col gap-4 group"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-zinc-900 ring-1 ring-white/10 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
        <Image src={imageSrc} alt={label} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 90vw, 30vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        {overlay}
      </div>
      <div className="px-1">
        <p className="text-sm font-semibold tracking-wide text-zinc-900">{label}</p>
        <p className="mt-1 text-[11px] uppercase tracking-widest text-zinc-500">{sublabel}</p>
      </div>
    </motion.div>
  );
}

export function HomepageMockupShowcase() {
  return (
    <div className="w-full bg-[#050505] selection:bg-[var(--brand-creative)] selection:text-white">

      {/* Part 1: Featured Mockup Sites */}
      <section className="relative w-full px-4 py-32 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[var(--brand-creative)]/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative mx-auto w-full max-w-6xl">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--brand-creative)]"
          >
            Digital Presence
          </motion.p>
          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.9] tracking-tight text-white"
            >
              What your business<br /> could look like.
            </motion.h2>
          </div>

          {/* Mockup A: Whiteout Co (HIDDEN - PRESERVED IN CODE)
          <div className="mt-24 grid items-center gap-16 lg:grid-cols-[1fr_2fr]">
            <div className="flex flex-col gap-8">
              <div className="space-y-4">
                <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-zinc-400">
                  Concept 01
                </div>
                <h3 className="font-serif text-4xl text-white tracking-tight">Whiteout Co.</h3>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-creative)]">Snow &amp; ice management</p>
              </div>
              <p className="text-[15px] leading-relaxed text-zinc-400 font-medium">
                Cinematic winter photography transforms a seasonal service business into a brand
                people remember and trust before they read a single word.
              </p>
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-white/10" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                  +44pt conversion lift
                </p>
              </div>
            </div>
            <BrowserChrome url="whiteout-co.com">
              <div className="aspect-[16/10] overflow-hidden bg-black">
                <iframe
                  title="Whiteout Co homepage mockup"
                  src="/mockups/whiteout_co_mockup.html"
                  className="h-full w-full opacity-90 group-hover:opacity-100 transition-opacity"
                  loading="lazy"
                  aria-label="Whiteout Co homepage mockup"
                />
              </div>
            </BrowserChrome>
          </div>

          <div className="my-32 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          */}

          {/* Mockup B: Apex Detail */}
          <div className="mt-24 grid items-center gap-16 lg:grid-cols-[2fr_1fr]">
            <div className="order-2 lg:order-1 flex items-end gap-8">
              <div className="flex-1">
                <BrowserChrome url="apexdetailco.com">
                  <div className="aspect-[4/3] overflow-hidden bg-black">
                    <iframe
                      title="Apex Detail homepage mockup"
                      src="/mockups/apex_detail_mockup.html"
                      className="h-full w-full opacity-90"
                      loading="lazy"
                      aria-label="Apex Detail homepage mockup"
                    />
                  </div>
                </BrowserChrome>
              </div>
              <div className="hidden sm:block">
                <PhoneChrome>
                  <div style={{ height: 360, overflow: "hidden" }} className="bg-black">
                    <iframe
                      title="Apex Detail mobile mockup"
                      src="/mockups/apex_detail_mockup.html"
                      className="h-full w-full opacity-90"
                      loading="lazy"
                      aria-label="Apex Detail mobile view"
                      style={{ 
                        width: "375px", 
                        height: "812px", 
                        transform: "scale(0.4426)", 
                        transformOrigin: "top left",
                        border: "none"
                      }}
                    />
                  </div>
                </PhoneChrome>
              </div>
            </div>
            <div className="order-1 lg:order-2 flex flex-col gap-8">
              <div className="space-y-4">
                <h3 className="font-serif text-4xl text-white tracking-tight">Apex Detail</h3>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-creative)]">Paint correction &amp; ceramic coating</p>
              </div>
              <p className="text-[15px] leading-relaxed text-zinc-400 font-medium">
                High-gloss before/after imagery does the selling. Customers see the
                transformation before they book.
              </p>
              <p className="text-[10px] uppercase tracking-widest text-zinc-600 opacity-60">
                * This is a creative concept and not an actual company
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Part 2: Full-bleed editorial statement */}
      <section className="relative w-full overflow-hidden h-[70vh] min-h-[500px]">
        <Image
          src="/rebuild-gallery/DJI_20250602131946_0254_D.jpg"
          alt="Aerial site photography"
          fill
          className="object-cover object-center scale-105"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black" />
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <div className="max-w-4xl">
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--brand-creative)]"
            >
              The Visual Advantage
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-8 font-serif text-[clamp(2.5rem,8vw,6rem)] leading-[0.9] tracking-tighter text-white"
            >
              You have 50 milliseconds<br />
              to earn the click.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-10 mx-auto max-w-xl text-base leading-relaxed text-zinc-300 font-medium"
            >
              That is how long it takes a visitor to judge your brand.
              Professional photography does not just look good &mdash;
              it is the difference between a scroll and a sale.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Part 3: One shoot, every surface */}
      <section className="w-full bg-white px-4 py-32 sm:px-6 lg:px-8 selection:bg-black selection:text-white">
        <div className="mx-auto w-full max-w-6xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400">
            Versatility
          </p>
          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.9] tracking-tight text-zinc-950">
              One shoot.<br /> Every surface.
            </h2>
            <p className="max-w-xs text-sm leading-relaxed text-zinc-500 lg:text-right font-medium">
              Great photography works across your entire business ecosystem.
            </p>
          </div>

          <div className="mt-20 grid gap-10 sm:grid-cols-3">
            <UseCaseCard
              label="Website hero"
              sublabel="First Impression"
              imageSrc="/rebuild-gallery/6F4A3334.jpg"
              overlay={
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="rounded-xl bg-black/40 px-4 py-3 backdrop-blur-md border border-white/10">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-300">Homepage</p>
                    <p className="mt-0.5 text-xs font-semibold text-white">Built for the hook</p>
                  </div>
                </div>
              }
            />
            <UseCaseCard
              label="Social content"
              sublabel="Digital Pulse"
              imageSrc="/rebuild-gallery/badass.jpg"
              overlay={
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="flex items-center gap-3 rounded-xl bg-black/40 px-4 py-3 backdrop-blur-md border border-white/10">
                    <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]" />
                    <div>
                      <p className="text-[10px] font-bold text-white uppercase tracking-wider">Instagram</p>
                      <p className="text-[10px] font-medium text-zinc-400">Content optimized</p>
                    </div>
                  </div>
                </div>
              }
            />
            <UseCaseCard
              label="Print and signage"
              sublabel="Physical Touch"
              imageSrc="/rebuild-gallery/6F4A8380-2.jpg"
              overlay={
                <div className="absolute inset-0 flex items-end p-5">
                  <div className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 backdrop-blur-md">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-300">8K Ready</p>
                    <p className="mt-0.5 text-xs font-semibold text-white">Full-bleed, any format</p>
                  </div>
                </div>
              }
            />
          </div>

          <div className="mt-16 flex flex-wrap gap-3">
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
                className="rounded-full border border-zinc-200 bg-zinc-50 px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:bg-zinc-100 transition-colors cursor-default"
              >
                {use}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Part 4: Impact stats */}
      <section className="relative w-full overflow-hidden bg-black px-4 py-32 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-[0.15] scale-110 grayscale pointer-events-none">
          <Image
            src="https://photos.smugmug.com/IDEAL-Homes/i-JFdr97z/0/LF4qXLcTBkGJnzGsP82hqKWjpNt85mm8TWB4rmxp3/XL/BW_Plans_macro-2-XL.jpg"
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
            aria-hidden={true}
          />
        </div>
        <div className="relative mx-auto w-full max-w-6xl">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--brand-creative)] text-center"
          >
            By the numbers
          </motion.p>
          <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard value="118%" label="higher conversion" accent="var(--brand-creative)" />
            <StatCard value="50ms" label="to earn trust" accent="#34d399" />
            <StatCard value="40x" label="more shares" accent="#f59e0b" />
            <StatCard value="67%" label="quality priority" accent="#38bdf8" />
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-800 text-center"
          >
            Data: Redfin · MIT Media Lab · HubSpot · BigCommerce
          </motion.p>
        </div>
      </section>

    </div>
  );
}
