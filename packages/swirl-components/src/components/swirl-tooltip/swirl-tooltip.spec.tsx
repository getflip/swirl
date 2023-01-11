import { newSpecPage } from "@stencil/core/testing";

import { SwirlTooltip } from "./swirl-tooltip";

const expectedVisible = `
<span class="tooltip">
  <span aria-describedby="tooltip" class="tooltip__reference" tabindex="0">
    <slot></slot>
  </span>
  <span class="tooltip__popper">
    <span class="tooltip__bubble" id="tooltip" role="tooltip">
      <span class="tooltip__content">
        Tooltip
      </span>
      <span class="tooltip__arrow"></span>
    </span>
  </span>
</span>`;

const expectedHidden = `
<span class="tooltip">
  <span aria-describedby="tooltip" class="tooltip__reference" tabindex="0">
    <slot></slot>
  </span>
  <span class="tooltip__popper" style="top: 0px; left: NaNpx;"></span>
</span>`;

describe("swirl-tooltip", () => {
  it("renders the reference", async () => {
    const page = await newSpecPage({
      components: [SwirlTooltip],
      html: `<swirl-tooltip content="Tooltip" position="top"><swirl-badge label="Trigger"></swirl-badge></swirl-tooltip>`,
    });

    expect(page.root.children[0]).toEqualHtml(
      '<swirl-badge label="Trigger"></swirl-badge>'
    );
  });

  it("shows/hides the positioned popper on focus/blur", async () => {
    const page = await newSpecPage({
      components: [SwirlTooltip],
      html: `<swirl-tooltip content="Tooltip" delay="0" position="bottom"><swirl-badge label="Trigger"></swirl-badge></swirl-tooltip>`,
    });

    const referenceEl = page.root.shadowRoot.querySelector(
      ".tooltip__reference"
    ) as HTMLElement;

    referenceEl.focus();

    page.waitForChanges();
    await new Promise((resolve) => setTimeout(resolve));

    expect(page.root.shadowRoot.innerHTML).toEqualHtml(expectedVisible);

    referenceEl.blur();

    page.waitForChanges();
    await new Promise((resolve) => setTimeout(resolve));

    expect(page.root.shadowRoot.innerHTML).toEqualHtml(expectedHidden);
  });

  it("shows/hides the positioned popper on mouseenter/mouseleave", async () => {
    const page = await newSpecPage({
      components: [SwirlTooltip],
      html: `<swirl-tooltip content="Tooltip" delay="0" position="bottom"><swirl-badge label="Trigger"></swirl-badge></swirl-tooltip>`,
    });

    page.root.dispatchEvent(new MouseEvent("mouseenter"));

    // wait for delay
    await new Promise((resolve) => setTimeout(resolve));

    page.waitForChanges();
    await new Promise((resolve) => setTimeout(resolve));

    expect(page.root.shadowRoot.innerHTML).toEqualHtml(expectedVisible);

    page.root.dispatchEvent(new MouseEvent("mouseleave"));

    page.waitForChanges();
    await new Promise((resolve) => setTimeout(resolve));

    expect(page.root.shadowRoot.innerHTML).toEqualHtml(expectedHidden);
  });
});
