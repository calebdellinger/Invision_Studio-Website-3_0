import Link from "next/link";
import type { ReactNode } from "react";

const heading = "font-semibold tracking-tight text-zinc-900 [font-family:var(--font-montserrat)]";

type ServicePageShellProps = {
  eyebrow?: string;
  title: string;
  subtitle: string;
  headerMediaSlot?: ReactNode;
  headerEdgeSlot?: ReactNode;
  introSlot?: ReactNode;
  powerSectionSpacingClassName?: string;
  powerTitle: string;
  powerBody: ReactNode;
  assetTitle?: string;
  assetBody: ReactNode;
  /** Photo / video: "compound effect" block (optional). */
  compoundTitle?: string;
  compoundBody?: ReactNode;
  footerSlot?: ReactNode;
};

export function ServicePageShell({
  eyebrow = "Services",
  title,
  subtitle,
  headerMediaSlot,
  headerEdgeSlot,
  introSlot,
  powerSectionSpacingClassName = "pt-14",
  powerTitle,
  powerBody,
  assetTitle = "Asset Library",
  assetBody,
  compoundTitle,
  compoundBody,
  footerSlot,
}: ServicePageShellProps) {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <header className="border-b border-black/[0.06] pb-12">
        {headerMediaSlot ? (
          <div className="relative">
            {headerMediaSlot}
            {headerEdgeSlot ? (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex translate-y-1/2 justify-center">
                {headerEdgeSlot}
              </div>
            ) : null}
          </div>
        ) : (
          <>
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--brand-creative)]">
              {eyebrow}
            </p>
            <h1 className={`mt-4 text-4xl leading-[1.1] sm:text-5xl ${heading}`}>
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-600">
              {subtitle}
            </p>
            {introSlot ? <div className="mt-8">{introSlot}</div> : null}
          </>
        )}
      </header>

      <section className={powerSectionSpacingClassName}>
        <h2 className={`text-2xl sm:text-3xl ${heading}`}>{powerTitle}</h2>
        <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-zinc-600">
          {powerBody}
        </div>
      </section>

      <section className="pt-14">
        <h2 className={`text-2xl sm:text-3xl ${heading}`}>{assetTitle}</h2>
        <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-zinc-600">
          {assetBody}
        </div>
      </section>

      {compoundTitle && compoundBody ? (
        <section className="pt-14">
          <h2 className={`text-2xl sm:text-3xl ${heading}`}>{compoundTitle}</h2>
          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-zinc-600">
            {compoundBody}
          </div>
        </section>
      ) : null}

      {footerSlot ? (
        <div className="mt-14 border-t border-black/[0.06] pt-12">{footerSlot}</div>
      ) : null}

      <div className="mt-14 flex flex-wrap gap-4">
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-full bg-[var(--brand-creative)] px-8 py-3.5 text-sm font-semibold text-[#0a0a0a] shadow-[0_4px_24px_-4px_color-mix(in_srgb,var(--brand-creative)_45%,transparent)] transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_-6px_color-mix(in_srgb,var(--brand-creative)_50%,transparent)]"
        >
          Start a project
        </Link>
        <Link
          href="/services"
          className="inline-flex items-center justify-center rounded-full border border-black/10 px-8 py-3.5 text-sm font-medium text-zinc-600 transition-colors hover:border-black/20 hover:text-black"
        >
          All services
        </Link>
      </div>
    </div>
  );
}
