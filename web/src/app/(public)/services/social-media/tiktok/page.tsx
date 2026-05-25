import type { Metadata } from "next";
import { SocialServiceShell } from "@/components/site/service/SocialServiceShell";

export const metadata: Metadata = {
  title: "TikTok",
  description:
    "TikTok strategy — viral reach, velocity, and attention trade-offs.",
};

export default function TiktokServicePage() {
  return (
    <SocialServiceShell
      eyebrow="Social · TikTok"
      platform="TikTok"
      title="TikTok strategy"
      subtitle="Pattern-breaking reach and rapid learning — built for hooks, native pacing, and high-velocity iteration."
      powerTitle="Why TikTok matters"
      powerBody={
        <>
          <p>
            TikTok rewards ideas that feel native — where personality and
            clarity beat polish-for-polish’s-sake, when the concept is sharp
            enough to hold a scroll.
          </p>
          <p>
            It is often the fastest platform for market feedback. Strong hooks
            reveal quickly what narratives, objections, or offers your audience
            responds to.
          </p>
        </>
      }
      assetTitle="Content as a reusable library"
      assetBody={
        <>
          <p>
            Hooks, formats, and templates stack over time — so you’re not
            guessing what to film every week; you’re refining a system.
          </p>
          <p>
            Once a concept performs, we adapt it into variants for retests,
            audience segments, and offer stages to improve consistency without
            becoming repetitive.
          </p>
        </>
      }
      tradeoffs={[
        {
          strength:
            'Highest potential for "explosive" viral growth; low production barrier.',
          weakness:
            'Very short attention spans; difficult to convert "views" into "long-term fans."',
        },
      ]}
      pillars={[
        {
          title: "Hook-first scripting",
          body: "Design first 1-2 seconds to create immediate relevance before viewers decide to continue or skip.",
        },
        {
          title: "Native storytelling",
          body: "Use voice, captions, and pacing that feel like platform language while preserving brand quality.",
        },
        {
          title: "Iteration loops",
          body: "Rapidly test angles and formats, then scale winners into repeatable content series.",
        },
      ]}
      cadence={[
        "Publish in focused batches to accelerate learning per content theme.",
        "Re-test winning hooks with new openings, visuals, or calls to action.",
        "Bridge top-performing TikTok concepts into Instagram Reels and Shorts.",
      ]}
      metrics={[
        "Hold rate in first 3 seconds to assess hook strength.",
        "Completion rate and rewatches to validate concept quality.",
        "Comments and shares as indicators of resonance and relevance.",
        "Profile visits and downstream actions for conversion potential.",
      ]}
    />
  );
}
