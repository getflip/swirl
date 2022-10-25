import { newSpecPage } from "@stencil/core/testing";

import { FlipPdfReader } from "./flip-pdf-reader";

describe("flip-pdf-reader", () => {
  it("renders", async () => {
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
                      <option value="2">
                        200%
                      </option>
                      <option value="3">
                        300%
                      </option>
                      <option value="4">
                        400%
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
              </div>
            </div>
          </section>
        </mock:shadow-root>
      </flip-pdf-reader>
    `);
  });
});
