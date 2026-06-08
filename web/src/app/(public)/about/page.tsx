import type { Metadata } from "next";
import Image from "next/image";
import { myStoryBlocks } from "@/data/myStory";

export const metadata: Metadata = {
  title: "My Story",
  description: "The road behind Invision Creative.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-1 flex-col">
      <h1 className="sr-only">My Story</h1>

      {myStoryBlocks.map((block, index) => {
        if (block.kind === "portrait") {
          return (
            <section
              key={`portrait-${index}`}
              className="border-b border-black/5 px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
              aria-label="Introduction"
            >
              <div className="mx-auto flex max-w-3xl justify-center">
                <figure className="w-full max-w-md">
                  <Image
                    src={block.image.src}
                    alt={block.image.alt}
                    width={block.width}
                    height={block.height}
                    className="h-auto w-full rounded-sm object-contain ring-1 ring-inset ring-black/5"
                    sizes="(max-width: 768px) 100vw, 28rem"
                    priority
                  />
                </figure>
              </div>
            </section>
          );
        }

        const isImageLeft = block.imageSide === "left";

        return (
          <section
            key={`split-${index}-${block.title}`}
            className="border-b border-black/5 px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
            aria-labelledby={`story-step-${index}`}
          >
            <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
              <figure
                className={`min-w-0 ${
                  isImageLeft ? "md:order-1" : "md:order-2"
                }`}
              >
                <Image
                  src={block.image.src}
                  alt={block.image.alt}
                  width={block.width}
                  height={block.height}
                  className="h-auto w-full rounded-sm object-contain ring-1 ring-inset ring-black/5"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {"imageCredit" in block && block.imageCredit ? (
                  <figcaption className="mt-2 text-[10px] leading-snug text-zinc-600">
                    {block.imageCredit}
                  </figcaption>
                ) : null}
              </figure>
              <div
                className={`min-w-0 ${
                  isImageLeft ? "md:order-2" : "md:order-1"
                }`}
              >
                <h2
                  id={`story-step-${index}`}
                  className="font-serif text-2xl text-zinc-900 sm:text-3xl"
                >
                  {block.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-zinc-600">
                  {block.body}
                </p>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
