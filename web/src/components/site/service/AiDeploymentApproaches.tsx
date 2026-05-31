import { AiDeploymentOrbit } from "./AiDeploymentOrbit";

export function AiDeploymentApproaches() {
  return (
    <section className="border-t border-white/[0.06] px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--brand-creative)]">
          Deployment models
        </p>
        <h2 className="mt-3 max-w-2xl text-2xl font-semibold tracking-tight text-white sm:text-3xl [font-family:var(--font-fraunces)]">
          Three ways to integrate AI into your business
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
          Every operation has different privacy, speed, and infrastructure needs. We
          scope the right architecture first — then build the pipeline around it.
        </p>

        <AiDeploymentOrbit />
      </div>
    </section>
  );
}
