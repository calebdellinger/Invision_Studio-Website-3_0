type InvisionMonogramProps = {
  className?: string;
};

/** Full Invision Creative lockup — light artwork for dark UI (`/brand/logo_white.svg`). */
export function InvisionMonogram({ className = "" }: InvisionMonogramProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- SVG lockup; next/image wrapper breaks sizing in the fixed header.
    <img
      src="/brand/logo_white.svg"
      alt=""
      decoding="async"
      fetchPriority="high"
      className={`block h-[var(--header-logo-height)] w-auto max-w-none shrink-0 object-contain ${className}`}
    />
  );
}
