import { newSpecPage } from "@stencil/core/testing";

import { SwirlTooltip } from "./swirl-tooltip";

const expectedVisible = `
<span class="tooltip tooltip--active tooltip--actual-placement-undefined tooltip--intent-default tooltip--visible">
  <span aria-describedby="tooltip" class="tooltip__reference">
    <slot></slot>
  </span>
  <span class="tooltip__popper" style="position: absolute; max-width: 17.5rem;">
    <span class="tooltip__bubble" id="tooltip" part="tooltip__bubble" role="tooltip">
      <span class="tooltip__content">
        Tooltip
      </span>
    </span>
    <span class="tooltip__arrow" style="visibility: visible;"></span>
  </span>
</span>`;

const expectedHidden = `
<span class="tooltip tooltip--active tooltip--actual-placement-top tooltip--intent-default">
  <span aria-describedby="tooltip" class="tooltip__reference">
    <slot></slot>
  </span>
  <span class="tooltip__popper" style="position: absolute; max-width: 17.5rem; top: 0px; left: NaNpx;">
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

    expect(page.root.shadowRoot.innerHTML).toEqualHtml(expectedVisible);

    referenceEl.dispatchEvent(new FocusEvent("focusout"));

    page.waitForChanges();
    await new Promise((resolve) => setTimeout(resolve));

    expect(page.root.shadowRoot.innerHTML).toEqualHtml(expectedHidden);
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

    expect(page.root.shadowRoot.innerHTML).toEqualHtml(expectedVisible);

    page.root.dispatchEvent(new MouseEvent("mouseleave"));

    page.waitForChanges();
    await new Promise((resolve) => setTimeout(resolve));

    expect(page.root.shadowRoot.innerHTML).toEqualHtml(expectedHidden);
  });

  it("should not show tooltip on hover when trigger doesn't include 'hover'", async () => {
    const page = await newSpecPage({
      components: [SwirlTooltip],
      html: `<swirl-tooltip content="Tooltip" delay="0" position="bottom"><swirl-button label="Trigger"></swirl-button></swirl-tooltip>`,
    });

    page.root.trigger = ["focus"];
    await page.waitForChanges();

    page.root.dispatchEvent(new MouseEvent("mouseenter"));

    page.waitForChanges();
    await new Promise((resolve) => setTimeout(resolve));

    expect(page.root.shadowRoot.querySelector(".tooltip--visible")).toBeNull();
  });

  it("should not show tooltip on focus when trigger doesn't include 'focus'", async () => {
    const page = await newSpecPage({
      components: [SwirlTooltip],
      html: `<swirl-tooltip content="Tooltip" delay="0" position="bottom"><swirl-button label="Trigger"></swirl-button></swirl-tooltip>`,
    });

    page.root.trigger = ["hover"];
    await page.waitForChanges();

    const referenceEl = page.root.shadowRoot.querySelector(
      ".tooltip__reference"
    ) as HTMLElement;

    referenceEl.dispatchEvent(new FocusEvent("focusin"));

    page.waitForChanges();
    await new Promise((resolve) => setTimeout(resolve));

    expect(page.root.shadowRoot.querySelector(".tooltip--visible")).toBeNull();
  });

  it("respects the max-width setting", async () => {
    const page = await newSpecPage({
      components: [SwirlTooltip],
      html: `<swirl-tooltip content="Tooltip"><swirl-button label="Trigger"></swirl-button></swirl-tooltip>`,
    });

    expect(
      page.root.shadowRoot.querySelector<HTMLElement>(".tooltip__popper").style
        .maxWidth
    ).toBe("17.5rem");

    page.root.setAttribute("max-width", "10rem");
    await page.waitForChanges();

    expect(
      page.root.shadowRoot.querySelector<HTMLElement>(".tooltip__popper").style
        .maxWidth
    ).toBe("10rem");
  });
});
