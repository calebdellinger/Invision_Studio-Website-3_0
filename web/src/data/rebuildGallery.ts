/**
 * Local media in `/public/showroom` (ShowRoom export: Seattle, truck, aerials, stills).
 * Use `showroom()` for filenames with spaces or `+`.
 */
export function showroom(file: string): string {
  return `/showroom/${encodeURIComponent(file)}`;
}

export const rebuildFeaturedStills = [
  {
    src: showroom("20251210_HBUILDS_Seattle-1-2.jpg"),
    alt: "Build progress — Seattle",
  },
  {
    src: showroom("frontPorch.jpg"),
    alt: "Residential exterior",
  },
  {
    src: showroom("20251220_CAPTAINHOOK_NEWTRUCK-10.jpg"),
    alt: "Commercial work truck — wrap and lettering",
  },
] as const;

/**
 * Photography service film-strip: curated `/rebuild-gallery/*` stills.
 */
export const photographyFilmstripSlides = [
  {
    src: "/rebuild-gallery/6F4A3334.jpg",
    alt: "Monochrome mountain landscape — cinematic brand photography.",
  },
  {
    src: "/rebuild-gallery/6F4A3492.jpg",
    alt: "Lifestyle and social-ready photography sample.",
  },
  {
    src: "/rebuild-gallery/6F4A8380-2.jpg",
    alt: "Compact excavator at the end of a trench — black-and-white industrial photography.",
  },
  {
    src: "/rebuild-gallery/badass.jpg",
    alt: "Concrete mixer and pump truck on site — monochrome construction photography.",
  },
  {
    src: "/rebuild-gallery/DJI_20250602131946_0254_D.jpg",
    alt: "Excavator with hydraulic breaker demolishing concrete stairs — on-site action photography.",
  },
  {
    src: "/rebuild-gallery/6F4A3334.jpg",
    alt: "Top-down drone view of an excavator working beside a mirrored-glass commercial building — aerial photography.",
  },
] as const;

export const rebuildServiceVisuals = {
  photo: {
    src: showroom("6F4A3492.jpg"),
    alt: "Photography",
  },
  video: {
    src: showroom("20251210_HBUILDS_Seattle-3-2.jpg"),
    alt: "Video and motion",
  },
  social: {
    src: showroom("20251220_CAPTAINHOOK_NEWTRUCK-3.jpg"),
    alt: "Social and content",
  },
} as const;
