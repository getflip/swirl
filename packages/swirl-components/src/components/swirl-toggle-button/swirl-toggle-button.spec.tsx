import { newSpecPage } from "@stencil/core/testing";

import { SwirlToggleButton } from "./swirl-toggle-button";

describe("swirl-toggle-button", () => {
  it("renders with a label and identifier", async () => {
    const page = await newSpecPage({
      components: [SwirlToggleButton],
      html: `<swirl-toggle-button label="Label" identifier="identifier"></swirl-toggle-button>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-toggle-button identifier="identifier" label="Label">
        <mock:shadow-root>
          <button aria-pressed="false" class="button" type="button">
            <span class="button__label">
              Label
            </span>
          </button>
        </mock:shadow-root>
      </swirl-toggle-button>
    `);
  });

  it("becomes pressed when clicked", async () => {
    const page = await newSpecPage({
      components: [SwirlToggleButton],
      html: `<swirl-toggle-button label="Label" identifier="identifier"></swirl-toggle-button>`,
    });

    const button =
      page.root.shadowRoot.querySelector<HTMLButtonElement>("button");

    button.click();

    await page.waitForChanges();

    expect(page.root).toEqualHtml(`
      <swirl-toggle-button identifier="identifier" label="Label">
        <mock:shadow-root>
          <button aria-pressed="true" class="button button--pressed" type="button">
            <span class="button__label">
              Label
            </span>
          </button>
        </mock:shadow-root>
      </swirl-toggle-button>
    `);
  });
});
