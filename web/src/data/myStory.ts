import { showroom } from "@/data/rebuildGallery";

/**
 * Roadmap sections for /about (My Story).
 * Swap `portrait` filename for your headshot; update copy as you go.
 * `width` / `height` are layout hints for next/image — natural aspect is preserved with object-contain.
 */
export type MyStoryBlock =
  | {
      kind: "portrait";
      image: { src: string; alt: string };
      width: number;
      height: number;
    }
  | {
      kind: "split";
      imageSide: "left" | "right";
      image: { src: string; alt: string };
      width: number;
      height: number;
      title: string;
      body: string;
      /** Optional photo credit (e.g. stock / CC license). */
      imageCredit?: string;
    };

export const myStoryBlocks: MyStoryBlock[] = [
  {
    kind: "portrait",
    image: {
      src: showroom("6F4A3334.jpg"),
      alt: "Portrait",
    },
    width: 1600,
    height: 2000,
  },
  {
    kind: "split",
    imageSide: "left",
    image: {
      src: "/my-story/canon-rebel-t5.jpg",
      alt: "Canon EOS Rebel T5 (EOS 1200D) DSLR",
    },
    width: 4495,
    height: 3002,
    title: "8th Grade",
    body: "I bought my first camera in the 8th grade. I’d saved all my money from landscaping as a summer job and went to Costco for the Canon T5 — about $700. Arguably the greatest purchase I ever made: it began a passion I’ve never put down.",
    imageCredit:
      "Canon EOS 1200D (same model as the Rebel T5). Photo: Kārlis Dambrāns, Wikimedia Commons, CC BY 2.0.",
  },
  {
    kind: "split",
    imageSide: "right",
    image: {
      src: "/my-story/great-outdoors.jpg",
      alt: "Snowy mountain morning — rigs, shelter, and coffee in the Mt. Baker parking lot",
    },
    width: 2400,
    height: 1350,
    title: "The Great Outdoors",
    body: "This passion to capture the world around me has evolved over the years, but its foundational roots have always revolved — and always will revolve — around my next biggest passion: the outdoors. There’s nothing better than waking up on a cold, brisk morning and drinking a cup of coffee in the parking lot of Mt. Baker.",
  },
  {
    kind: "split",
    imageSide: "left",
    image: {
      src: "/my-story/little-things.jpg",
      alt: "Blue hour on the beach — pebbles in the sand, ocean and headland softened in the distance",
    },
    width: 2400,
    height: 1600,
    title: "The Little Things",
    body: "These two passions have shaped who I am not only as a photographer but also as a human being — realizing that it’s the small things in life that make it worth living.",
  },
  {
    kind: "split",
    imageSide: "right",
    image: {
      src: "/my-story/challenge.jpg",
      alt: "Steep forest steps and yellow rope — looking up the climb",
    },
    width: 1600,
    height: 2400,
    title: "The Challenge",
    body: "I’ve never seen myself as just a landscape or action sports photographer, but as someone who strives to be the best that I can be — continually challenging the way I view the world, people, and everything in between.",
  },
  {
    kind: "split",
    imageSide: "left",
    image: {
      src: "/my-story/where-are-you-headed.jpg",
      alt: "Heisler steam locomotive — engineer beside the engine, steam and headlight",
    },
    width: 1600,
    height: 2400,
    title: "Where are you headed",
    body: "This all being said, it would be an honor to hop on the train of your vision — helping you bring it to life through the lens of photography and video. In doing so, we can work together to create new ideas, challenge each other, and develop a relationship that will stand the test of time.",
  },
];
