/**
 * Home “What we do” tiles — each links to a dedicated service page.
 */
export type WorkCategory = {
  href: string;
  title: string;
  tagline: string;
};

export const WORK_CATEGORIES: WorkCategory[] = [
  {
    href: "/services/social-media",
    title: "Social media",
    tagline: "Content built for feeds and campaigns",
  },
  {
    href: "/services/photography",
    title: "Photo",
    tagline: "Stills, stories, and campaign imagery",
  },
  {
    href: "/services/videography",
    title: "Video",
    tagline: "Motion, edit, and sound that holds attention",
  },
  {
    href: "/services/ai-integrations",
    title: "AI integrations",
    tagline: "Workflow helpers that speed delivery without diluting your voice",
  },
  /*
  {
    href: "/services/gaussian-splatting",
    title: "Gaussian splatting",
    tagline: "Volumetric 3D scans and digital twins of physical spaces",
  },
  */
];
