import styles from "./HeroMockupStage.module.css";

export function HeroMockupStage() {
  return (
    <section className="relative flex min-h-[calc(100dvh-var(--header-height))] w-full items-center justify-center overflow-hidden bg-white p-0">
      <div className={`relative z-10 -translate-y-[5%] scale-[0.324] ${styles.stage}`}>
        <div className={styles.deck}>
          <div className={styles.carousel}>
            <div className={`${styles.pane} ${styles.paneA}`}>
              <iframe
                title="Apex Detail hero mockup"
                src="/mockups/apex_detail_mockup.html"
                className="h-full w-full bg-black"
                loading="eager"
                aria-label="Apex Detail hero mockup"
              />
            </div>
            <div className={`${styles.pane} ${styles.paneB}`}>
              <iframe
                title="Pumpkin Patch hero mockup"
                src="/mockups/pumpkin_patch_v2.html"
                className="h-full w-full bg-black"
                loading="eager"
                aria-label="Pumpkin Patch hero mockup"
              />
            </div>
            <div className={`${styles.pane} ${styles.paneC}`}>
              <iframe
                title="Whiteout Co hero mockup"
                src="/mockups/whiteout_co_mockup.html"
                className="h-full w-full bg-black"
                loading="eager"
                aria-label="Whiteout Co hero mockup"
              />
            </div>
            <div className={`${styles.pane} ${styles.paneD}`}>
              <iframe
                title="Current & Stone hero mockup"
                src="/mockups/current_and_stone_mockup.html"
                className="h-full w-full bg-black"
                loading="eager"
                aria-label="Current & Stone hero mockup"
              />
            </div>
            <div className={`${styles.pane} ${styles.paneE}`}>
              <iframe
                title="Meridian Build hero mockup"
                src="/mockups/meridian_build_hero (1).html"
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

