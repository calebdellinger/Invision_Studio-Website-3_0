import { readFileSync } from "node:fs";
import { join } from "node:path";
import styles from "./HeroMockupStage.module.css";

function withHiddenScrollUi(html: string) {
  const hiddenScrollStyle = `<style>
html, body {
  overflow: hidden !important;
  scroll-behavior: auto !important;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
html::-webkit-scrollbar,
body::-webkit-scrollbar {
  width: 0;
  height: 0;
  display: none;
}
</style>`;

  const withStyle = html.includes("</head>")
    ? html.replace("</head>", `${hiddenScrollStyle}</head>`)
    : `${hiddenScrollStyle}${html}`;
  return withStyle;
}

const apexDetailHtml = withHiddenScrollUi(
  readFileSync(join(process.cwd(), "src/components/site/apex_detail_mockup.html"), "utf8"),
);
const pumpkinPatchHtml = withHiddenScrollUi(
  readFileSync(join(process.cwd(), "src/components/site/pumpkin_patch_v2.html"), "utf8"),
);
const whiteoutCoHtml = withHiddenScrollUi(
  readFileSync(join(process.cwd(), "src/components/site/whiteout_co_mockup.html"), "utf8"),
);
const currentAndStoneHtml = withHiddenScrollUi(
  readFileSync(join(process.cwd(), "src/components/site/current_and_stone_mockup.html"), "utf8"),
);
const meridianBuildHtml = withHiddenScrollUi(
  readFileSync(join(process.cwd(), "src/components/site/meridian_build_hero (1).html"), "utf8"),
);

export function HeroMockupStage() {
  return (
    <section className="relative flex min-h-[calc(100dvh-var(--header-height))] w-full items-center justify-center overflow-hidden bg-white p-0">
      <div className={`relative z-10 -translate-y-[5%] scale-[0.324] ${styles.stage}`}>
        <div className={styles.deck}>
          <div className={styles.carousel}>
            <div className={`${styles.pane} ${styles.paneA}`}>
              <iframe
                title="Apex Detail hero mockup"
                srcDoc={apexDetailHtml}
                className="h-full w-full bg-black"
                loading="eager"
                aria-label="Apex Detail hero mockup"
              />
            </div>
            <div className={`${styles.pane} ${styles.paneB}`}>
              <iframe
                title="Pumpkin Patch hero mockup"
                srcDoc={pumpkinPatchHtml}
                className="h-full w-full bg-black"
                loading="eager"
                aria-label="Pumpkin Patch hero mockup"
              />
            </div>
            <div className={`${styles.pane} ${styles.paneC}`}>
              <iframe
                title="Whiteout Co hero mockup"
                srcDoc={whiteoutCoHtml}
                className="h-full w-full bg-black"
                loading="eager"
                aria-label="Whiteout Co hero mockup"
              />
            </div>
            <div className={`${styles.pane} ${styles.paneD}`}>
              <iframe
                title="Current & Stone hero mockup"
                srcDoc={currentAndStoneHtml}
                className="h-full w-full bg-black"
                loading="eager"
                aria-label="Current & Stone hero mockup"
              />
            </div>
            <div className={`${styles.pane} ${styles.paneE}`}>
              <iframe
                title="Meridian Build hero mockup"
                srcDoc={meridianBuildHtml}
                className="h-full w-full bg-black"
                loading="eager"
                aria-label="Meridian Build hero mockup"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
