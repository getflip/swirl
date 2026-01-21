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
          <dialog aria-label="PDF Reader" class="pdf-reader" closedby="none" id="pdf-reader">
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
                  <swirl-popover-trigger>
                    <swirl-button class="pdf-reader__menu-button" hidelabel="" icon="<swirl-icon-more-vertikal></swirl-icon-more-vertikal>" label="Open file menu"></swirl-button>
                  </swirl-popover-trigger>
                </span>
                <span class="pdf-reader__floating-tools">
                  <button aria-label="Toggle side by side view" class="pdf-reader__floating-tool-button" type="button">
                    <swirl-icon-menu-book></swirl-icon-menu-book>
                  </button>
                  <button aria-controls="thumbnails" aria-expanded="false" aria-label="Toggle thumbnails" class="pdf-reader__floating-tool-button" type="button">
                    <swirl-icon-file-copy></swirl-icon-file-copy>
                  </button>
                </span>
              </header>
              <div class="pdf-reader__content">
                <nav aria-label="Page thumbnails" class="pdf-reader__thumbnails" id="thumbnails"></nav>
                <swirl-file-viewer class="pdf-reader__viewer" file="/sample.pdf" type="application/pdf" viewmode="single" zoom="auto"></swirl-file-viewer>
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
            <swirl-popover animation="scale-in-y" disablescrolllock="" id="menu" label="File menu" placement="bottom-end">
              <swirl-stack>
                <div class="pdf-reader__meta">
                  <div class="pdf-reader__file-icon">
                    <svg fill="none" height="36" viewBox="0 0 24 36" width="24">
                      <path d="M7.01755 21.6V15.192H8.39455C8.64655 15.192 8.86855 15.225 9.06055 15.291C9.25255 15.357 9.42655 15.474 9.58255 15.642C9.73855 15.81 9.84655 16.008 9.90655 16.236C9.96655 16.458 9.99655 16.761 9.99655 17.145C9.99655 17.433 9.97855 17.676 9.94255 17.874C9.91255 18.072 9.84355 18.258 9.73555 18.432C9.60955 18.642 9.44155 18.807 9.23155 18.927C9.02155 19.041 8.74555 19.098 8.40355 19.098H7.93555V21.6H7.01755ZM7.93555 16.056V18.234H8.37655C8.56255 18.234 8.70655 18.207 8.80855 18.153C8.91055 18.099 8.98555 18.024 9.03355 17.928C9.08155 17.838 9.10855 17.727 9.11455 17.595C9.12655 17.463 9.13255 17.316 9.13255 17.154C9.13255 17.004 9.12955 16.863 9.12355 16.731C9.11755 16.593 9.09055 16.473 9.04255 16.371C8.99455 16.269 8.92255 16.191 8.82655 16.137C8.73055 16.083 8.59255 16.056 8.41255 16.056H7.93555Z" fill="white"></path>
                      <path d="M10.6826 21.6V15.192H12.0416C12.5696 15.192 12.9686 15.336 13.2386 15.624C13.5146 15.912 13.6526 16.32 13.6526 16.848V19.845C13.6526 20.445 13.5056 20.889 13.2116 21.177C12.9236 21.459 12.5066 21.6 11.9606 21.6H10.6826ZM11.6006 16.056V20.736H12.0236C12.2816 20.736 12.4646 20.673 12.5726 20.547C12.6806 20.415 12.7346 20.211 12.7346 19.935V16.848C12.7346 16.596 12.6836 16.401 12.5816 16.263C12.4796 16.125 12.2936 16.056 12.0236 16.056H11.6006Z" fill="white"></path>
                      <path d="M14.5146 21.6V15.192H17.2506V16.056H15.4326V18H17.0166V18.864H15.4326V21.6H14.5146Z" fill="white"></path>
                      <path d="M3.59961 9.00001C3.59961 8.0059 4.4055 7.20001 5.39961 7.20001H14.854C15.3314 7.20001 15.7893 7.38965 16.1268 7.72722L19.8724 11.4728C20.21 11.8104 20.3996 12.2682 20.3996 12.7456V27C20.3996 27.9941 19.5937 28.8 18.5996 28.8H5.39961C4.4055 28.8 3.59961 27.9941 3.59961 27V9.00001Z" fill="#FF574D"></path>
                      <path d="M15.5996 7.36166V10.2C15.5996 11.1941 16.4055 12 17.3996 12H20.2379C20.3237 12.1884 20.3768 12.3913 20.3937 12.6H17.3996C16.0785 12.6 15.0067 11.5325 14.9996 10.213L14.9996 7.20587C15.2083 7.2228 15.4112 7.27593 15.5996 7.36166Z" fill="white"></path>
                      <path d="M7.01755 21.6V15.192H8.39455C8.64655 15.192 8.86855 15.225 9.06055 15.291C9.25255 15.357 9.42655 15.474 9.58255 15.642C9.73855 15.81 9.84655 16.008 9.90655 16.236C9.96655 16.458 9.99655 16.761 9.99655 17.145C9.99655 17.433 9.97855 17.676 9.94255 17.874C9.91255 18.072 9.84355 18.258 9.73555 18.432C9.60955 18.642 9.44155 18.807 9.23155 18.927C9.02155 19.041 8.74555 19.098 8.40355 19.098H7.93555V21.6H7.01755ZM7.93555 16.056V18.234H8.37655C8.56255 18.234 8.70655 18.207 8.80855 18.153C8.91055 18.099 8.98555 18.024 9.03355 17.928C9.08155 17.838 9.10855 17.727 9.11455 17.595C9.12655 17.463 9.13255 17.316 9.13255 17.154C9.13255 17.004 9.12955 16.863 9.12355 16.731C9.11755 16.593 9.09055 16.473 9.04255 16.371C8.99455 16.269 8.92255 16.191 8.82655 16.137C8.73055 16.083 8.59255 16.056 8.41255 16.056H7.93555Z" fill="white"></path>
                      <path d="M10.6826 21.6V15.192H12.0416C12.5696 15.192 12.9686 15.336 13.2386 15.624C13.5146 15.912 13.6526 16.32 13.6526 16.848V19.845C13.6526 20.445 13.5056 20.889 13.2116 21.177C12.9236 21.459 12.5066 21.6 11.9606 21.6H10.6826ZM11.6006 16.056V20.736H12.0236C12.2816 20.736 12.4646 20.673 12.5726 20.547C12.6806 20.415 12.7346 20.211 12.7346 19.935V16.848C12.7346 16.596 12.6836 16.401 12.5816 16.263C12.4796 16.125 12.2936 16.056 12.0236 16.056H11.6006Z" fill="white"></path>
                      <path d="M14.5146 21.6V15.192H17.2506V16.056H15.4326V18H17.0166V18.864H15.4326V21.6H14.5146Z" fill="white"></path>
                    </svg>
                  </div>
                  <div class="pdf-reader__file-info">
                    <swirl-text truncate="" weight="semibold">
                      PDF Reader
                    </swirl-text>
                    <swirl-text color="subdued" size="sm" truncate="">
                      PDF Document
                    </swirl-text>
                  </div>
                </div>
                <swirl-separator></swirl-separator>
                <swirl-action-list class="pdf-reader__menu">
                  <swirl-action-list-item class="pdf-reader__print-button" icon="<swirl-icon-print></swirl-icon-print>" label="Print PDF"></swirl-action-list-item>
                  <swirl-action-list-item class="pdf-reader__download-button" icon="<swirl-icon-download></swirl-icon-download>" label="Download PDF"></swirl-action-list-item>
                  <slot name="menu-items"></slot>
                </swirl-action-list>
              </swirl-stack>
            </swirl-popover>
          </dialog>
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
