import type { ReactNode } from "react";
import { ServicePageShell } from "./ServicePageShell";

export type PlatformTradeoff = {
  strength: string;
  weakness: string;
};

export type SocialPillar = {
  title: string;
  body: string;
};

type SocialServiceShellProps = {
  platform: string;
  eyebrow?: string;
  title: string;
  subtitle: string;
  powerTitle: string;
  powerBody: ReactNode;
  assetTitle?: string;
  assetBody: ReactNode;
  /** One row: platform strengths vs weaknesses (per your strategy table). */
  tradeoffs: PlatformTradeoff[];
  pillars?: SocialPillar[];
  cadence?: string[];
  metrics?: string[];
};

export function SocialServiceShell({
  platform,
  eyebrow,
  title,
  subtitle,
  powerTitle,
  powerBody,
  assetTitle,
  assetBody,
  tradeoffs,
  pillars = [],
  cadence = [],
  metrics = [],
}: SocialServiceShellProps) {
  const grid =
    tradeoffs.length === 1 ? (
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-white [font-family:var(--font-montserrat)] sm:text-3xl">
          Platform strengths & trade-offs
        </h2>
        <p className="mt-3 text-sm text-zinc-500">
          How {platform} fits your strategy — what you leverage, what you plan
          for.
        </p>
        <div className="mt-8 overflow-hidden rounded-xl border border-white/[0.08] bg-[#111]/80 ring-1 ring-inset ring-white/[0.03]">
          <div className="grid md:grid-cols-2">
            <div className="border-b border-white/[0.06] p-6 md:border-b-0 md:border-r md:border-white/[0.06]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--brand-creative)]">
                Strengths
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                {tradeoffs[0].strength}
              </p>
            </div>
            <div className="p-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-600">
                Weaknesses
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-500">
                {tradeoffs[0].weakness}
              </p>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-white [font-family:var(--font-montserrat)] sm:text-3xl">
          Strengths & trade-offs
        </h2>
        <p className="mt-3 text-sm text-zinc-500">
          Strategic realities on {platform} — what you gain, what you accept.
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {tradeoffs.map((row, i) => (
            <li
              key={i}
              className="rounded-xl border border-white/[0.07] bg-[#111]/80 p-5 ring-1 ring-inset ring-white/[0.03]"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--brand-creative)]">
                Strength
              </p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                {row.strength}
              </p>
              <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-600">
                Trade-off
              </p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                {row.weakness}
              </p>
            </li>
          ))}
        </ul>
      </div>
    );

  return (
    <ServicePageShell
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
      powerTitle={powerTitle}
      powerBody={powerBody}
      assetTitle={assetTitle}
      assetBody={assetBody}
      footerSlot={
        <div className="space-y-12">
          {grid}

          {pillars.length ? (
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-white [font-family:var(--font-montserrat)] sm:text-3xl">
                Platform playbook
              </h2>
              <p className="mt-3 text-sm text-zinc-500">
                A practical system for making {platform} content consistent and
                conversion-aware.
              </p>
              <ul className="mt-8 grid gap-4 sm:grid-cols-3">
                {pillars.map((pillar) => (
                  <li
                    key={pillar.title}
                    className="rounded-xl border border-white/[0.08] bg-[#111]/80 p-5 ring-1 ring-inset ring-white/[0.03]"
                  >
                    <h3 className="text-base font-semibold tracking-tight text-white">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                      {pillar.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {cadence.length ? (
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-white [font-family:var(--font-montserrat)] sm:text-3xl">
                Cadence that keeps momentum
              </h2>
              <p className="mt-3 text-sm text-zinc-500">
                We plan around repeatable publishing rhythms, not one-off spikes.
              </p>
              <ul className="mt-6 space-y-3 rounded-xl border border-white/[0.08] bg-[#111]/80 p-5 ring-1 ring-inset ring-white/[0.03]">
                {cadence.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-zinc-300">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-creative)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {metrics.length ? (
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-white [font-family:var(--font-montserrat)] sm:text-3xl">
                What we measure
              </h2>
              <p className="mt-3 text-sm text-zinc-500">
                Metrics that indicate true platform fit and business traction.
              </p>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {metrics.map((metric) => (
                  <li
                    key={metric}
                    className="rounded-xl border border-white/[0.08] bg-[#111]/80 p-5 text-sm leading-relaxed text-zinc-300 ring-1 ring-inset ring-white/[0.03]"
                  >
                    {metric}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      }
    />
  );
}
