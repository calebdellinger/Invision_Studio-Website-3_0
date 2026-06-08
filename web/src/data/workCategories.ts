/**
 * Home “What we do” tiles — each links to a dedicated service page.
 */
import { ServiceTypeIconId } from "@/components/site/service/ServiceTypeIcon";

export type WorkCategory = {
  href: string;
  title: string;
  tagline: string;
  image: string;
  iconId: ServiceTypeIconId;
};

export const WORK_CATEGORIES: WorkCategory[] = [
  {
    href: "/services/social-media",
    title: "Social Media",
    tagline: "Content built for feeds and campaigns",
    image: "/rebuild-gallery/badass.jpg",
    iconId: "social",
  },
  {
    href: "/services/photography",
    title: "Photography",
    tagline: "Stills, stories, and campaign imagery",
    image: "/rebuild-gallery/6F4A3334.jpg",
    iconId: "photo",
  },
  {
    href: "/services/videography",
    title: "Videography",
    tagline: "Motion, edit, and sound that holds attention",
    image: "/rebuild-gallery/DJI_20250602131946_0254_D.jpg",
    iconId: "video",
  },
  {
    href: "/services/3d-scanning",
    title: "3D Scanning",
    tagline: "Volumetric 3D scans and digital twins of physical spaces",
    image: "/rebuild-gallery/3pillarsHero.jpg",
    iconId: "gaussian",
  },
  {
    href: "/services/ai-integrations",
    title: "AI Integrations",
    tagline: "Workflow helpers that speed delivery without diluting your voice",
    image: "/ai-creative-workflow.png",
    iconId: "ai",
  },
];
