import type { Metadata } from "next";
import { SocialServiceShell } from "@/components/site/service/SocialServiceShell";

export const metadata: Metadata = {
  title: "Instagram",
  description:
    "Instagram strategy — visual engagement, community, and algorithm trade-offs.",
};

export default function InstagramServicePage() {
  return (
    <SocialServiceShell
      eyebrow="Social · Instagram"
      platform="Instagram"
      title="Instagram strategy"
      subtitle="A visual-first channel where aesthetics and community behavior signal who you are. Instagram works best when your brand voice is repeatable and instantly recognizable."
      powerTitle="Why Instagram matters"
      powerBody={
        <>
          <p>
            Instagram rewards clarity of look and consistency of voice — ideal
            when your brand lives in frames, motion snippets, and daily
            touchpoints with your audience.
          </p>
          <p>
            The platform blends discovery and nurture. Reels can introduce your
            brand to new viewers, while stories and carousels keep your existing
            audience warm and moving toward action.
          </p>
        </>
      }
      assetTitle="Content as a reusable library"
      assetBody={
        <>
          <p>
            We treat posts, carousels, and reels as modular assets — so your
            grid compounds instead of resetting every campaign cycle.
          </p>
          <p>
            Strong shoots become multiple cuts, thumbnails, sequence styles, and
            captions. That turns creative effort into a system rather than a
            constant scramble for fresh ideas.
          </p>
        </>
      }
      tradeoffs={[
        {
          strength:
            "High visual engagement; perfect for brand aesthetics and community building.",
          weakness:
            'Low "link-click" conversion; highly competitive algorithm.',
        },
      ]}
      pillars={[
        {
          title: "Creative direction",
          body: "Build 3-5 repeatable visual formats that make your brand recognizable within one second of a scroll.",
        },
        {
          title: "Audience nurture",
          body: "Use stories and carousels to answer objections, show process, and deepen trust after first discovery.",
        },
        {
          title: "Conversion path",
          body: "Design profile, highlights, and pinned posts so new visitors know what you do and what to do next.",
        },
      ]}
      cadence={[
        "Publish reels for reach, carousels for education, and stories for daily presence.",
        "Batch-produce creative monthly, then deploy in weekly campaigns with platform-native edits.",
        "Rotate recurring series so your audience expects and recognizes your content themes.",
      ]}
      metrics={[
        "Saves and shares per post to validate value density.",
        "Profile visits and link taps to track buying intent.",
        "Story completion and reply rate to measure relationship strength.",
        "Follower quality over raw follower count to protect relevance.",
      ]}
    />
  );
}
