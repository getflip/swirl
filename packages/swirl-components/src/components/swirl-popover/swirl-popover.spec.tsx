import { newSpecPage } from "@stencil/core/testing";

import { SwirlPopover } from "./swirl-popover";

describe("swirl-popover", () => {
  const template = `
    <div>
      <button id="trigger">Trigger popover</button>
      <swirl-popover label="Popover" popover-id="popover" trigger="trigger">
        <div>Content</div>
      </swirl-popover>
    </div>
  `;

  beforeAll(() => {
    class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    }

    global.ResizeObserver = ResizeObserver;
  });

  it("renders the trigger and content", async () => {
    const page = await newSpecPage({
      components: [SwirlPopover],
      html: template,
    });

    expect(page.body).toEqualHtml(`
      <div>
        <button aria-controls="popover" aria-expanded="false" aria-haspopup="dialog" id="trigger">Trigger popover</button>
        <swirl-popover id="popover" label="Popover" popover-id="popover" trigger="trigger">
          <mock:shadow-root>
            <div class="popover popover--animation-scale-in-xy popover--inactive  popover--placement-undefined">
              <div aria-hidden="true" aria-label="Popover" class="popover__content" part="popover__content" role="dialog" tabindex="-1">
                <span class="popover__handle"></span>
                <div class="popover__scroll-container">
                  <slot></slot>
                </div>
              </div>
            </div>
          </mock:shadow-root>
          <div>
            Content
          </div>
        </swirl-popover>
      </div>
    `);
  });

  it("opens on click and closes on blur/esc", async () => {
    const page = await newSpecPage({
      components: [SwirlPopover],
      html: template,
    });

    function isOpen() {
      return !page.root.shadowRoot
        .querySelector(".popover")
        .classList.contains("popover--inactive");
    }

    expect(isOpen()).toBeFalsy();

    // click trigger
    const trigger = page.body.querySelector("#trigger") as HTMLElement;

    trigger.click();
    await page.waitForChanges();

    expect(isOpen()).toBeTruthy();

    // blur popover
    page.win.dispatchEvent(new FocusEvent("focusin"));

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
