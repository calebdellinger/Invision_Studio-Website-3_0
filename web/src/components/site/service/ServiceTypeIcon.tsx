import type { SVGProps } from "react";

export type ServiceTypeIconId = "photo" | "video" | "social" | "ai";

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
          <rect x="4" y="4" width="16" height="16" rx="2.5" />
          <path d="M9 9.5h6M9 12h6M9 14.5h3.5" opacity={0.5} />
          <circle cx="8" cy="9.5" r="1.2" fill="currentColor" stroke="none" />
          <circle cx="16" cy="12" r="1.2" fill="currentColor" stroke="none" />
          <circle cx="8" cy="14.5" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      );
  }
}
