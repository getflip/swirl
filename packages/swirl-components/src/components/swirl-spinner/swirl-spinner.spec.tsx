import { newSpecPage } from "@stencil/core/testing";

import { FlipSpinner } from "./swirl-spinner";

describe("flip-spinner", () => {
  it("renders the spinner", async () => {
    const page = await newSpecPage({
      components: [FlipSpinner],
      html: `<flip-spinner></flip-spinner>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-spinner>
        <mock:shadow-root>
          <span class="spinner spinner--size-m">
            <svg aria-hidden="true" class="spinner__indicator" focusable="false" viewBox="0 0 50 50">
              <circle class="spinner__background" cx="25" cy="25" fill="none" r="20" stroke-width="4"></circle>
              <circle class="spinner__circle" cx="25" cy="25" fill="none" r="20" stroke-width="4"></circle>
            </svg>
          </span>
        </mock:shadow-root>
      </flip-spinner>
    `);
  });

  it("renders a label with role 'status'", async () => {
    const page = await newSpecPage({
      components: [FlipSpinner],
      html: `<flip-spinner label="Loading stuff …"></flip-spinner>`,
    });

    expect(page.root.shadowRoot.querySelector('[role="status"]')).toBeDefined();

    expect(
      page.root.shadowRoot.querySelector("flip-visually-hidden").innerText
    ).toEqual(`Loading stuff …`);
  });
});
