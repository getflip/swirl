import { newSpecPage } from "@stencil/core/testing";

import { SwirlTooltip } from "./swirl-tooltip";

const expectedVisible = (isPromo = false) => `
<span class="tooltip tooltip--active tooltip--actual-placement-undefined ${
  isPromo ? "tooltip--promo" : ""
} tooltip--visible">
  <span aria-describedby="tooltip" class="tooltip__reference">
    <slot></slot>
  </span>
  <span class="tooltip__popper" style="position: absolute;">
    <span class="tooltip__bubble" id="tooltip" part="tooltip__bubble" role="tooltip">
      <span class="tooltip__content">
        Tooltip
      </span>
    </span>
    <span class="tooltip__arrow" style="visibility: visible;"></span>
  </span>
</span>`;

const expectedHidden = (isPromo = false) => `
<span class="tooltip tooltip--active tooltip--actual-placement-top ${
  isPromo ? "tooltip--promo" : ""
}">
  <span aria-describedby="tooltip" class="tooltip__reference">
    <slot></slot>
  </span>
  <span class="tooltip__popper" style="position: absolute; top: 0px; left: NaNpx;">
    <span class="tooltip__arrow" style="visibility: hidden;"></span>
  </span>
</span>`;

describe("swirl-tooltip", () => {
  beforeAll(() => {
    class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    }

    global.ResizeObserver = ResizeObserver;
  });

  it("renders the reference", async () => {
    const page = await newSpecPage({
      components: [SwirlTooltip],
      html: `<swirl-tooltip content="Tooltip" position="top"><swirl-button label="Trigger"></swirl-button></swirl-tooltip>`,
    });

    expect(page.root.children[0]).toEqualHtml(
      '<swirl-button label="Trigger"></swirl-button>'
    );
  });

  it("shows/hides the positioned popper on focus/blur", async () => {
    const page = await newSpecPage({
      components: [SwirlTooltip],
      html: `<swirl-tooltip content="Tooltip" delay="0" position="bottom"><swirl-button label="Trigger"></swirl-button></swirl-tooltip>`,
    });

    const referenceEl = page.root.shadowRoot.querySelector(
      ".tooltip__reference"
    ) as HTMLElement;

    referenceEl.dispatchEvent(new FocusEvent("focusin"));

    page.waitForChanges();
    await new Promise((resolve) => setTimeout(resolve));

    expect(page.root.shadowRoot.innerHTML).toEqualHtml(expectedVisible());

    referenceEl.dispatchEvent(new FocusEvent("focusout"));

    page.waitForChanges();
    await new Promise((resolve) => setTimeout(resolve));

    expect(page.root.shadowRoot.innerHTML).toEqualHtml(expectedHidden());
  });

  it("shows/hides the positioned popper on mouseenter/mouseleave", async () => {
    const page = await newSpecPage({
      components: [SwirlTooltip],
      html: `<swirl-tooltip content="Tooltip" delay="0" position="bottom"><swirl-button label="Trigger"></swirl-button></swirl-tooltip>`,
    });

    page.root.dispatchEvent(new MouseEvent("mouseenter"));

    // wait for delay
    await new Promise((resolve) => setTimeout(resolve));

    page.waitForChanges();
    await new Promise((resolve) => setTimeout(resolve));

    expect(page.root.shadowRoot.innerHTML).toEqualHtml(expectedVisible());

    page.root.dispatchEvent(new MouseEvent("mouseleave"));

    page.waitForChanges();
    await new Promise((resolve) => setTimeout(resolve));

    expect(page.root.shadowRoot.innerHTML).toEqualHtml(expectedHidden());
  });

  it("renders the promo tooltip", async () => {
    const page = await newSpecPage({
      components: [SwirlTooltip],
      html: `<swirl-tooltip content="Tooltip" delay="0" position="bottom" is-promo="true"><swirl-button label="Trigger"></swirl-button></swirl-tooltip>`,
    });

    expect(page.root.shadowRoot.innerHTML).toEqualHtml(expectedVisible(true));

    const referenceEl = page.root.shadowRoot.querySelector(
      ".tooltip__reference"
    ) as HTMLElement;

    referenceEl.click();

    await new Promise((resolve) => setTimeout(resolve));
    page.waitForChanges();
    await new Promise((resolve) => setTimeout(resolve));

    expect(page.root.shadowRoot.innerHTML).toEqualHtml(expectedHidden(true));

    page.root.dispatchEvent(new MouseEvent("mouseenter"));

    page.waitForChanges();
    await new Promise((resolve) => setTimeout(resolve));

    expect(page.root.shadowRoot.innerHTML).toEqualHtml(expectedHidden(true));

    referenceEl.dispatchEvent(new FocusEvent("focusin"));

    page.waitForChanges();
    await new Promise((resolve) => setTimeout(resolve));

    expect(page.root.shadowRoot.innerHTML).toEqualHtml(expectedHidden(true));
  });
});
