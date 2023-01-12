import { newSpecPage } from "@stencil/core/testing";

import { SwirlPdfReader } from "./swirl-pdf-reader";

describe("swirl-pdf-reader", () => {
  it("renders file viewer and controls", async () => {
    const page = await newSpecPage({
      components: [SwirlPdfReader],
      html: `<swirl-pdf-reader file="/sample.pdf" label="PDF Reader"></swirl-pdf-reader>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-pdf-reader file="/sample.pdf" label="PDF Reader">
        <mock:shadow-root>
          <section aria-hidden="true" aria-label="PDF Reader" aria-modal="true" class="pdf-reader" id="pdf-reader" role="dialog" tabindex="-1">
            <div class="pdf-reader__body" role="document">
              <header class="pdf-reader__header">
                <span class="pdf-reader__header-left">
                  <swirl-button class="pdf-reader__close-button" hidelabel="" icon="<swirl-icon-close></swirl-icon-close>" label="Close PDF viewer"></swirl-button>
                  <span class="pdf-reader__label">
                    PDF Reader
                  </span>
                </span>
                <span class="pdf-reader__header-center">
                  <span class="pdf-reader__zoom-button-container">
                    <swirl-button class="pdf-reader__zoom-button" hidelabel="" icon="<swirl-icon-remove></swirl-icon-remove>" label="Zoom out"></swirl-button>
                    <swirl-button class="pdf-reader__zoom-button" hidelabel="" icon="<swirl-icon-add></swirl-icon-add>" label="Zoom in"></swirl-button>
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
                    <swirl-icon-expand-more class="pdf-reader__zoom-select-icon"></swirl-icon-expand-more>
                  </span>
                </span>
                <span class="pdf-reader__header-right">
                  <swirl-button class="pdf-reader__print-button" hidelabel="" icon="<swirl-icon-print></swirl-icon-print>" label="Print PDF"></swirl-button>
                  <swirl-button class="pdf-reader__download-button" hidelabel="" icon="<swirl-icon-download></swirl-icon-download>" label="Download PDF"></swirl-button>
                </span>
              </header>
              <div class="pdf-reader__content">
                <swirl-file-viewer file="/sample.pdf" type="application/pdf" zoom="auto"></swirl-file-viewer>
                <div class="pdf-reader__mobile-zoom-controls">
                  <button aria-label="Full width" class="pdf-reader__mobile-zoom-button" type="button">
                    <swirl-icon-fullscreen-exit></swirl-icon-fullscreen-exit>
                  </button>
                  <button aria-label="Zoom in" class="pdf-reader__mobile-zoom-button" type="button">
                    <swirl-icon-add></swirl-icon-add>
                  </button>
                  <button aria-label="Zoom out" class="pdf-reader__mobile-zoom-button" type="button">
                    <swirl-icon-remove></swirl-icon-remove>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </mock:shadow-root>
      </swirl-pdf-reader>
    `);
  });

  it("allows to zoom", async () => {
    const page = await newSpecPage({
      components: [SwirlPdfReader],
      html: `<swirl-pdf-reader file="/sample.pdf" label="PDF Reader"></swirl-pdf-reader>`,
    });

    const viewer = page.root.shadowRoot.querySelector("swirl-file-viewer");
    const zoomSelect = page.root.shadowRoot.querySelector<HTMLSelectElement>(
      '[aria-label="Select zoom"]'
    );

    expect(viewer.getAttribute("zoom")).toBe("auto");

    page.root.shadowRoot
      .querySelector<HTMLSwirlButtonElement>('swirl-button[label="Zoom in"]')
      .click();

    await page.waitForChanges();

    expect(viewer.getAttribute("zoom")).toBe("1");

    page.root.shadowRoot
      .querySelector<HTMLSwirlButtonElement>('swirl-button[label="Zoom out"]')
      .click();

    await page.waitForChanges();

    expect(viewer.getAttribute("zoom")).toBe("0.75");

    zoomSelect.value = "auto";
    zoomSelect.dispatchEvent(new Event("change"));

    await page.waitForChanges();

    expect(viewer.getAttribute("zoom")).toBe("auto");
  });
});
