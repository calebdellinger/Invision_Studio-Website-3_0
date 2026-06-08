import type { SVGProps } from "react";

export type ServiceTypeIconId = "photo" | "video" | "social" | "ai" | "gaussian";

type IconProps = SVGProps<SVGSVGElement> & { id: ServiceTypeIconId };

/**
 * Simple, recognizable marks for service categories (inline SVG, no icon font).
 */
export function ServiceTypeIcon({ id, className, ...rest }: IconProps) {
  const cn = className ?? "h-full w-full";

  switch (id) {
    case "photo":
      return (
        <svg
          className={cn}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.35}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
          {...rest}
        >
          <path d="M4 8.5h2.2L7.2 6h3.1l.9 2.5H20a1 1 0 0 1 1 1V18a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a1 1 0 0 1 1-1Z" />
          <circle cx="12" cy="13.5" r="3.2" />
          <path d="M8 6V5a1 1 0 0 1 1-1h1.2a1 1 0 0 1 1 1v1" opacity={0.85} />
        </svg>
      );
    case "video":
      return (
        <svg
          className={cn}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.35}
          strokeLinejoin="round"
          aria-hidden
          {...rest}
        >
          <rect x="4.25" y="7" width="11.5" height="10" rx="1.75" />
          <path
            d="M17.25 9.35v5.3l3.9-2.2a.65.65 0 0 0 0-1.15l-3.9-2.15Z"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      );
    case "social":
      return (
        <svg className={cn} viewBox="0 0 24 24" fill="none" aria-hidden {...rest}>
          <path
            d="M12 4.5a2.2 2.2 0 1 1 0 4.4 2.2 2.2 0 0 1 0-4.4ZM6.5 14.8a2.2 2.2 0 1 1 0 4.4 2.2 2.2 0 0 1 0-4.4ZM17.5 14.8a2.2 2.2 0 1 1 0 4.4 2.2 2.2 0 0 1 0-4.4Z"
            stroke="currentColor"
            strokeWidth={1.35}
            strokeLinecap="round"
          />
          <path
            d="m10.1 8.4-1.8 4.2M13.9 8.4l1.8 4.2M9.2 15.2h5.6"
            stroke="currentColor"
            strokeWidth={1.25}
            strokeLinecap="round"
          />
        </svg>
      );
    case "ai":
      return (
        <svg
          className={cn}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.35}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
          {...rest}
        >
          {/* Neural Network Nodes & Connections */}
          {/* Layer 1 */}
          <circle cx="4" cy="8" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="4" cy="16" r="1.5" fill="currentColor" stroke="none" />
          
          {/* Layer 2 (Center) */}
          <circle cx="12" cy="6" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="12" cy="18" r="1.5" fill="currentColor" stroke="none" />

          {/* Layer 3 */}
          <circle cx="20" cy="8" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="20" cy="16" r="1.5" fill="currentColor" stroke="none" />

          {/* Connections - L1 to L2 */}
          <path d="M5.5 8.5 L10.5 6.5" opacity="0.4" />
          <path d="M5.5 8.5 L10.5 11.5" opacity="0.4" />
          <path d="M5.5 15.5 L10.5 12.5" opacity="0.4" />
          <path d="M5.5 15.5 L10.5 17.5" opacity="0.4" />
          
          {/* Connections - L2 to L3 */}
          <path d="M13.5 6.5 L18.5 7.5" opacity="0.4" />
          <path d="M13.5 11.5 L18.5 8.5" opacity="0.4" />
          <path d="M13.5 12.5 L18.5 15.5" opacity="0.4" />
          <path d="M13.5 17.5 L18.5 16.5" opacity="0.4" />

          {/* Cross-layer highlight */}
          <path d="M5.5 8.5 L10.5 17.5" opacity="0.2" strokeDasharray="2 2" />
          <path d="M13.5 6.5 L18.5 15.5" opacity="0.2" strokeDasharray="2 2" />
        </svg>
      );
    case "gaussian":
      return (
        <svg
          className={cn}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.35}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
          {...rest}
        >
          {/* A 3D-ish ellipsoidal representation of Gaussian Splatting */}
          <ellipse cx="12" cy="12" rx="9" ry="5" transform="rotate(-30 12 12)" strokeDasharray="2 2" opacity={0.3} />
          <ellipse cx="12" cy="12" rx="7" ry="3.5" transform="rotate(-30 12 12)" opacity={0.6} />
          <ellipse cx="12" cy="12" rx="4" ry="2" transform="rotate(-30 12 12)" fill="currentColor" fillOpacity={0.15} />
          {/* Splatted point cloud particles around the center */}
          <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="8" cy="9.5" r="1.1" fill="currentColor" stroke="none" />
          <circle cx="16" cy="14.5" r="1.1" fill="currentColor" stroke="none" />
          <circle cx="14" cy="8.5" r="0.9" fill="currentColor" stroke="none" />
          <circle cx="10" cy="15.5" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      );
  }
}
