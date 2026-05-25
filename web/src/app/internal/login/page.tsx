import type { Metadata } from "next";
import { Suspense } from "react";
import { InternalLoginForm } from "./InternalLoginForm";

export const metadata: Metadata = {
  title: "Team sign in",
  robots: { index: false, follow: false },
};

export default function InternalLoginPage() {
  return (
    <div className="mx-auto max-w-lg py-16">
      <h1 className="font-serif text-2xl text-white">Team sign in</h1>
      <p className="mt-2 text-sm text-zinc-400">
        Internal area only. This URL is not linked from the public site.
      </p>
      <div className="mt-8">
        <Suspense fallback={<p className="text-sm text-zinc-500">Loading…</p>}>
          <InternalLoginForm />
        </Suspense>
      </div>
    </div>
  );
}
