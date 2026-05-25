import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resources",
  robots: { index: false, follow: false },
};

const placeholderSections = [
  {
    title: "Brand & assets",
    items: ["Logo files", "Color tokens", "Typography notes"],
  },
  {
    title: "Client delivery",
    items: ["Export presets", "Folder structure", "Review checklist"],
  },
  {
    title: "Learning",
    items: [
      "DaVinci Resolve 19 — Master syllabus (interactive checklists, shortcuts, resources).",
      "Sign in at /internal/login using the shared team password, then open /internal for this dashboard.",
      "Local dev: set INTERNAL_TEAM_PASSWORD and INTERNAL_SESSION_SECRET in web/.env.local, restart npm run dev. If they are missing, protected routes return “Team area is not configured.”",
      "Production: add the same two variables in your host’s environment (e.g. Netlify / Vercel), redeploy, then use your live domain + /internal/login.",
      "Sign out from the button in the internal header when you are done; it clears the session cookie.",
    ],
  },
  {
    title: "Links you use often",
    items: ["Add bookmarks here as you go"],
  },
] as const;

export default function InternalTeamHomePage() {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <h1 className="font-serif text-2xl text-white sm:text-3xl">Team resources</h1>
        <p className="mt-2 max-w-xl text-sm text-zinc-400">
          Central place for internal links, checklists, and files. Replace placeholders with real
          content as you build this out.
        </p>
        <p className="mt-4">
          <Link
            href="/internal/learning/davinci-resolve"
            className="text-sm font-medium text-[var(--brand-creative)] underline-offset-4 transition-colors hover:text-[color-mix(in_srgb,var(--brand-creative)_85%,white)] hover:underline"
          >
            Open DaVinci Resolve 19 Master Syllabus →
          </Link>
        </p>
      </div>

      <ul className="grid gap-6 sm:grid-cols-2">
        {placeholderSections.map((section) => (
          <li
            key={section.title}
            className="rounded-lg border border-white/10 bg-black/25 p-5 backdrop-blur"
          >
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--brand-creative)]">
              {section.title}
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-zinc-300">
              {section.items.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-600" />
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
