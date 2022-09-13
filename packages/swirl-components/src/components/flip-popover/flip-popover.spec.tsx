import { newSpecPage } from "@stencil/core/testing";

import { FlipPopover } from "./flip-popover";

describe("flip-popover", () => {
  const template = `
    <flip-popover label="Popover">
      <flip-button label="Trigger popover" slot="trigger"></flip-button>
      <div slot="content">Content</div>
    </flip-popover>
  `;

  it("renders the trigger and content", async () => {
    const page = await newSpecPage({
      components: [FlipPopover],
      html: template,
    });

    expect(page.root).toEqualHtml(`
      <flip-popover label="Popover">
        <mock:shadow-root>
          <div class="popover popover--inactive">
            <div class="popover__trigger">
              <slot name="trigger"></slot>
            </div>
            <div aria-hidden="true" aria-label="Popover" class="popover__content" id="popover" role="dialog" tabindex="-1">
              <span class="popover__handle"></span>
              <div class="popover__scroll-container">
                <slot name="content"></slot>
              </div>
            </div>
          </div>
        </mock:shadow-root>
        <flip-button label="Trigger popover" slot="trigger"></flip-button>
        <div slot="content">
          Content
        </div>
      </flip-popover>
    `);
  });

  it("opens on click and closes on blur/esc", async () => {
    const page = await newSpecPage({
      components: [FlipPopover],
      html: template,
    });

    function isOpen() {
      return !page.root.shadowRoot
        .querySelector(".popover")
        .classList.contains("popover--inactive");
    }

    expect(isOpen()).toBeFalsy();

    // click trigger
    const trigger = page.root.shadowRoot.querySelector(
      ".popover__trigger"
    ) as HTMLElement;

    trigger.click();
    await page.waitForChanges();

    expect(isOpen()).toBeTruthy();

    // blur popover
    window.dispatchEvent(new FocusEvent("focusout"));
    await new Promise((resolve) => setTimeout(resolve, 150));
    await page.waitForChanges();

    expect(isOpen()).toBeFalsy();

    // re-open popover
    trigger.click();
    await page.waitForChanges();

    expect(isOpen()).toBeTruthy();

    // close via escape key
    page.root.shadowRoot
      .querySelector(".popover")
      .dispatchEvent(new KeyboardEvent("keydown", { code: "Escape" }));

    await new Promise((resolve) => setTimeout(resolve, 150));
    await page.waitForChanges();

    expect(isOpen()).toBeFalsy();
  });
});
