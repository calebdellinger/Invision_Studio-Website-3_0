import Image from "next/image";

type GalleryStillProps = {
  src: string;
  alt: string;
  /** Tailwind aspect ratio utility, e.g. `aspect-[4/5]` */
  aspectClass?: string;
  className?: string;
  sizes: string;
  priority?: boolean;
};

export function GalleryStill({
  src,
  alt,
  aspectClass = "aspect-[4/5]",
  className = "",
  sizes,
  priority,
}: GalleryStillProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-sm ring-1 ring-inset ring-black/5 ${aspectClass} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover object-center"
        sizes={sizes}
        priority={priority}
      />
    </div>
  );
}
