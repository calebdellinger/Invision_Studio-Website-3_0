import type { Metadata } from "next";
import { InternalTeamHeader } from "./InternalTeamHeader";

export const metadata: Metadata = {
  title: "Team resources",
  robots: { index: false, follow: false },
};

export default function InternalTeamLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-dvh bg-white text-zinc-100">
      <div className="border-b border-black/10 bg-black/40 px-4 py-3 backdrop-blur sm:px-6">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <p className="font-serif text-sm tracking-tight text-zinc-900 sm:text-base">
            Invision Creative — team
          </p>
          <InternalTeamHeader />
        </div>
      </div>
      <div className="mx-auto w-full px-4 py-6 sm:px-6">{children}</div>
    </div>
  );
}
