import { newSpecPage } from "@stencil/core/testing";

import { FlipLightbox } from "./flip-lightbox";

describe("flip-lightbox", () => {
  it("renders its slides and controls", async () => {
    const page = await newSpecPage({
      components: [FlipLightbox],
      html: `
        <flip-lightbox label="Lightbox">
          <flip-file-viewer description="Cute dog in a blaket." file="/sample.jpg" type="image/jpeg"></flip-file-viewer>
          <flip-file-viewer file="/sample.mp4" type="video/mp4"></flip-file-viewer>
        </flip-lightbox>
      `,
    });

    expect(page.root).toEqualHtml(`
      <flip-lightbox label="Lightbox">
        <mock:shadow-root>
          <section aria-hidden="true" aria-label="Lightbox" aria-modal="true" class="lightbox" id="lightbox" role="dialog" tabindex="-1">
            <div class="lightbox__body" role="document">
              <header class="lightbox__header">
                <button aria-label="Close modal" class="lightbox__close-button">
                  <flip-icon-close></flip-icon-close>
                </button>
              </header>
              <div aria-roledescription="carousel" class="lightbox__content" role="group">
                <div aria-atomic="false" aria-live="polite" class="lightbox__slides">
                  <slot></slot>
                </div>
              </div>
              <div class="lightbox__controls">
                <button aria-label="Previous slide" class="lightbox__previous-slide-button" disabled="">
                  <flip-icon-arrow-left></flip-icon-arrow-left>
                </button>
                <button aria-label="Next slide" class="lightbox__next-slide-button">
                  <flip-icon-arrow-right></flip-icon-arrow-right>
                </button>
              </div>
            </div>
          </section>
        </mock:shadow-root>
        <flip-file-viewer active="true" aria-label="undefined" aria-roledescription="slide" description="Cute dog in a blaket." file="/sample.jpg" role="group" type="image/jpeg" style="transform: translate3d(-0%, 0, 0);"></flip-file-viewer>
        <flip-file-viewer active="false" aria-hidden="true" aria-label="undefined" aria-roledescription="slide" file="/sample.mp4\" role=\"group\" type=\"video/mp4\" style=\"transform: translate3d(-0%, 0, 0);\"></flip-file-viewer>
      </flip-lightbox>
    `);
  });
});
