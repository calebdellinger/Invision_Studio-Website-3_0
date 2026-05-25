import type { Metadata } from "next";
import { SocialServiceShell } from "@/components/site/service/SocialServiceShell";

export const metadata: Metadata = {
  title: "YouTube",
  description:
    "YouTube strategy — SEO, authority, and long-form trade-offs.",
};

export default function YoutubeServicePage() {
  return (
    <SocialServiceShell
      eyebrow="Social · YouTube"
      platform="YouTube"
      title="YouTube strategy"
      subtitle="Search-led video that can compound for years. YouTube is where depth, proof, and discoverability can coexist when your library is structured intentionally."
      powerTitle="Why YouTube matters"
      powerBody={
        <>
          <p>
            YouTube pairs discovery with depth — a place where proof, education,
            and brand authority can live longer than a single trend cycle.
          </p>
          <p>
            Unlike most feed-first platforms, your best videos can keep working
            through search and recommendations long after publish day. That
            makes content quality and topic alignment especially valuable.
          </p>
        </>
      }
      assetTitle="Content as a reusable library"
      assetBody={
        <>
          <p>
            Titles, chapters, and packaging turn uploads into evergreen assets —
            not one-off spikes — when the system is built intentionally.
          </p>
          <p>
            One long-form production can be repurposed into shorts, clips,
            landing-page proof, and social snippets, giving your team more
            leverage from each filming session.
          </p>
        </>
      }
      tradeoffs={[
        {
          strength:
            "High SEO value (Google Search); builds deep authority and long-term trust.",
          weakness:
            "High barrier to entry; requires significant time investment to see growth.",
        },
      ]}
      pillars={[
        {
          title: "Topic architecture",
          body: "Prioritize repeatable content clusters tied to your offer, so each upload strengthens category relevance.",
        },
        {
          title: "Packaging system",
          body: "Use thumbnail and title frameworks that improve click-through without drifting into low-trust clickbait.",
        },
        {
          title: "Retention design",
          body: "Script stronger openings, pacing shifts, and segment transitions to keep watch time healthy.",
        },
      ]}
      cadence={[
        "Publish with consistency over volume; quality and retention matter more than frequency spikes.",
        "Pair long-form anchors with short-form cuts to increase discovery entry points.",
        "Review topic performance monthly and double down on videos with strong viewer duration.",
      ]}
      metrics={[
        "Click-through rate by traffic source to validate packaging.",
        "Average view duration and retention curves to evaluate narrative quality.",
        "Returning viewers as a trust and authority indicator.",
        "Qualified leads or inquiries generated from video paths.",
      ]}
    />
  );
}
