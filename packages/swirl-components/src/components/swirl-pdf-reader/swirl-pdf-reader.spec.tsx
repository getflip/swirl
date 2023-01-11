import { newSpecPage } from "@stencil/core/testing";

import { FlipPdfReader } from "./swirl-pdf-reader";

describe("flip-pdf-reader", () => {
  it("renders file viewer and controls", async () => {
    const page = await newSpecPage({
      components: [FlipPdfReader],
      html: `<flip-pdf-reader file="/sample.pdf" label="PDF Reader"></flip-pdf-reader>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-pdf-reader file="/sample.pdf" label="PDF Reader">
        <mock:shadow-root>
          <section aria-hidden="true" aria-label="PDF Reader" aria-modal="true" class="pdf-reader" id="pdf-reader" role="dialog" tabindex="-1">
            <div class="pdf-reader__body" role="document">
              <header class="pdf-reader__header">
                <span class="pdf-reader__header-left">
                  <flip-button class="pdf-reader__close-button" hidelabel="" icon="<flip-icon-close></flip-icon-close>" label="Close PDF viewer"></flip-button>
                  <span class="pdf-reader__label">
                    PDF Reader
                  </span>
                </span>
                <span class="pdf-reader__header-center">
                  <span class="pdf-reader__zoom-button-container">
                    <flip-button class="pdf-reader__zoom-button" hidelabel="" icon="<flip-icon-remove></flip-icon-remove>" label="Zoom out"></flip-button>
                    <flip-button class="pdf-reader__zoom-button" hidelabel="" icon="<flip-icon-add></flip-icon-add>" label="Zoom in"></flip-button>
                  </span>
                  <span class="pdf-reader__zoom-select-container">
                    <select aria-label="Select zoom" class="pdf-reader__zoom-select" id="zoom-select" name="zoom-select">
                      <option selected="" value="auto">
                        Full width
                      </option>
                      <option value="0.5">
                        50%
                      </option>
                      <option value="0.75">
                        75%
                      </option>
                      <option value="1">
                        100%
                      </option>
                      <option value="1.25">
                        125%
                      </option>
                      <option value="1.5">
                        150%
                      </option>
                    </select>
                    <flip-icon-expand-more class="pdf-reader__zoom-select-icon"></flip-icon-expand-more>
                  </span>
                </span>
                <span class="pdf-reader__header-right">
                  <flip-button class="pdf-reader__print-button" hidelabel="" icon="<flip-icon-print></flip-icon-print>" label="Print PDF"></flip-button>
                  <flip-button class="pdf-reader__download-button" hidelabel="" icon="<flip-icon-download></flip-icon-download>" label="Download PDF"></flip-button>
                </span>
              </header>
              <div class="pdf-reader__content">
                <flip-file-viewer file="/sample.pdf" type="application/pdf" zoom="auto"></flip-file-viewer>
                <div class="pdf-reader__mobile-zoom-controls">
                  <button aria-label="Full width" class="pdf-reader__mobile-zoom-button" type="button">
                    <flip-icon-fullscreen-exit></flip-icon-fullscreen-exit>
                  </button>
                  <button aria-label="Zoom in" class="pdf-reader__mobile-zoom-button" type="button">
                    <flip-icon-add></flip-icon-add>
                  </button>
                  <button aria-label="Zoom out" class="pdf-reader__mobile-zoom-button" type="button">
                    <flip-icon-remove></flip-icon-remove>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </mock:shadow-root>
      </flip-pdf-reader>
    `);
  });

  it("allows to zoom", async () => {
    const page = await newSpecPage({
      components: [FlipPdfReader],
      html: `<flip-pdf-reader file="/sample.pdf" label="PDF Reader"></flip-pdf-reader>`,
    });

    const viewer = page.root.shadowRoot.querySelector("flip-file-viewer");
    const zoomSelect = page.root.shadowRoot.querySelector<HTMLSelectElement>(
      '[aria-label="Select zoom"]'
    );

    expect(viewer.getAttribute("zoom")).toBe("auto");

    page.root.shadowRoot
      .querySelector<HTMLFlipButtonElement>('flip-button[label="Zoom in"]')
      .click();

    await page.waitForChanges();

    expect(viewer.getAttribute("zoom")).toBe("1");

    page.root.shadowRoot
      .querySelector<HTMLFlipButtonElement>('flip-button[label="Zoom out"]')
      .click();

    await page.waitForChanges();

    expect(viewer.getAttribute("zoom")).toBe("0.75");

    zoomSelect.value = "auto";
    zoomSelect.dispatchEvent(new Event("change"));

    await page.waitForChanges();

    expect(viewer.getAttribute("zoom")).toBe("auto");
  });
});
