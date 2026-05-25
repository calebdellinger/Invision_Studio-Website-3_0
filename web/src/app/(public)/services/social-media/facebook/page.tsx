import type { Metadata } from "next";
import { SocialServiceShell } from "@/components/site/service/SocialServiceShell";

export const metadata: Metadata = {
  title: "Facebook",
  description:
    "Facebook strategy — local reach, community, and paid distribution trade-offs.",
};

export default function FacebookServicePage() {
  return (
    <SocialServiceShell
      eyebrow="Social · Facebook"
      platform="Facebook"
      title="Facebook strategy"
      subtitle="Community, events, and distribution at scale — especially when your audience values familiarity, local relevance, and practical offers."
      powerTitle="Why Facebook matters"
      powerBody={
        <>
          <p>
            Facebook remains a practical layer for groups, events, and offers
            that need context — paired with paid tools when organic alone
            isn’t enough.
          </p>
          <p>
            For many service businesses, it is still the most direct path to
            community-driven visibility where recommendations and social proof
            influence conversion behavior.
          </p>
        </>
      }
      assetTitle="Content as a reusable library"
      assetBody={
        <>
          <p>
            Creative and copy variants become testable assets — so you learn
            what to scale without rebuilding from scratch each week.
          </p>
          <p>
            Organic content, testimonial posts, and offer creatives can all be
            repurposed into paid variations, turning your page activity into a
            testing engine.
          </p>
        </>
      }
      tradeoffs={[
        {
          strength:
            "Incredible for local reach and community groups; best for older demographics.",
          weakness:
            'Organic reach for business pages is low; often requires "Pay-to-Play" ads.',
        },
      ]}
      pillars={[
        {
          title: "Community anchors",
          body: "Build recurring post formats around local trust signals: testimonials, team moments, and practical education.",
        },
        {
          title: "Offer clarity",
          body: "Use clear benefit-led messaging with low-friction calls to action across posts, events, and page sections.",
        },
        {
          title: "Paid amplification",
          body: "Promote top-performing posts to matched audiences and turn proven messaging into lead campaigns.",
        },
      ]}
      cadence={[
        "Maintain a steady posting rhythm focused on relevance over volume.",
        "Pair local event windows and seasonality with targeted offer content.",
        "Refresh best-performing creatives monthly for ongoing paid distribution.",
      ]}
      metrics={[
        "Meaningful comments and shares from local audience segments.",
        "Event responses and offer clicks from community-driven posts.",
        "Cost per result when promoting proven organic creatives.",
        "Lead quality and close rates from Facebook-origin traffic.",
      ]}
    />
  );
}
