import { newSpecPage } from "@stencil/core/testing";

import { SwirlSpinner } from "./swirl-spinner";

describe("swirl-spinner", () => {
  it("renders the spinner", async () => {
    const page = await newSpecPage({
      components: [SwirlSpinner],
      html: `<swirl-spinner></swirl-spinner>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-spinner>
        <mock:shadow-root>
          <span class="spinner spinner--size-m">
            <svg aria-hidden="true" class="spinner__indicator" focusable="false" viewBox="0 0 50 50">
              <circle class="spinner__background" cx="25" cy="25" fill="none" r="20" stroke-width="4"></circle>
              <circle class="spinner__circle" cx="25" cy="25" fill="none" r="20" stroke-width="4"></circle>
            </svg>
          </span>
        </mock:shadow-root>
      </swirl-spinner>
    `);
  });

  it("renders a label with role 'status'", async () => {
    const page = await newSpecPage({
      components: [SwirlSpinner],
      html: `<swirl-spinner label="Loading stuff …"></swirl-spinner>`,
    });

    expect(page.root.shadowRoot.querySelector('[role="status"]')).toBeDefined();

    expect(
      page.root.shadowRoot.querySelector("swirl-visually-hidden").innerText
    ).toEqual(`Loading stuff …`);
  });
});
