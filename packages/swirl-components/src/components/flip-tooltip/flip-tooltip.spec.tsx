import { newSpecPage } from "@stencil/core/testing";

import { FlipTooltip } from "./flip-tooltip";

describe("flip-tooltip", () => {
  it("renders the reference", async () => {
    const page = await newSpecPage({
      components: [FlipTooltip],
      html: `<flip-tooltip position="top" tooltip="Tooltip" tooltip-id="tooltip"><flip-badge label="Trigger"></flip-badge></flip-tooltip>`,
    });

    expect(page.root.children[0]).toEqualHtml(
      '<flip-badge label="Trigger"></flip-badge>'
    );
  });

  it("shows/hides the positioned popper on focus/blur", async () => {
    const page = await newSpecPage({
      components: [FlipTooltip],
      html: `<flip-tooltip delay="0" position="bottom" tooltip="Tooltip" tooltip-id="tooltip"><flip-badge label="Trigger"></flip-badge></flip-tooltip>`,
    });

    const referenceEl = page.root.shadowRoot.querySelector(
      ".tooltip__reference"
    ) as HTMLElement;

    referenceEl.focus();

    page.waitForChanges();
    await new Promise((resolve) => setTimeout(resolve));

    expect(page.root.shadowRoot.innerHTML).toEqualHtml(`
          <span class="tooltip">
            <span aria-describedby="tooltip" class="tooltip__reference" tabindex="0">
              <slot></slot>
            </span>
            <span class="tooltip__popper" style="left: 0px; top: 0px;">
              <span class="tooltip__bubble" id="tooltip" role="tooltip">
                <span class="tooltip__content">
                  Tooltip
                </span>
                <span class="tooltip__arrow"></span>
              </span>
            </span>
          </span>`);

    referenceEl.blur();

    page.waitForChanges();
    await new Promise((resolve) => setTimeout(resolve));

    expect(page.root.shadowRoot.innerHTML).toEqualHtml(`
            <span class="tooltip">
              <span aria-describedby="tooltip" class="tooltip__reference" tabindex="0">
                <slot></slot>
              </span>
              <span class="tooltip__popper" style="left: 0px; top: 0px;"></span>
            </span>`);
  });
});
