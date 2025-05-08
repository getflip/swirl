import { newSpecPage } from "@stencil/core/testing";

import { SwirlPopoverTrigger } from "../swirl-popover-trigger/swirl-popover-trigger";
import { SwirlPopover } from "./swirl-popover";

(global as any).IntersectionObserver = class {
  constructor() {}
  disconnect() {}
  observe() {}
};

describe("swirl-popover", () => {
  const template = `
    <div>
      <swirl-popover-trigger swirl-popover="popover">
        <button id="trigger">Trigger popover</button>
      </swirl-popover-trigger>
      <swirl-popover label="Popover" id="popover" style="display: none;">
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
      components: [SwirlPopover, SwirlPopoverTrigger],
      html: template,
    });

    expect(page.body).toEqualHtml(`
      <div>
        <swirl-popover-trigger swirl-popover="popover">
          <button aria-controls="popover" aria-expanded="false" aria-haspopup="dialog" id="trigger">Trigger popover</button>
        </swirl-popover-trigger>
        <swirl-popover id="popover" label="Popover" style="display: none;">
          <mock:shadow-root>
            <div class="popover popover--animation-scale-in-xy popover--inactive popover--padded popover--placement-undefined">
              <div aria-hidden="true" aria-label="Popover" class="popover__content" part="popover__content" role="dialog" tabindex="-1">
                <span class="popover__handle"></span>
                <div class="popover__scroll-container" part="popover__scroll-container">
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
      components: [SwirlPopover, SwirlPopoverTrigger],
      html: template,
    });

    function isOpen() {
      return !page.doc
        .querySelector("swirl-popover")
        .shadowRoot.querySelector(".popover")
        .classList.contains("popover--inactive");
    }

    expect(isOpen()).toBeFalsy();

    // click trigger
    const trigger = page.root;

    trigger.click();
    await new Promise((resolve) => setTimeout(resolve, 150));
    await page.waitForChanges();

    expect(isOpen()).toBeTruthy();

    // blur popover
    page.win.dispatchEvent(new FocusEvent("focusin"));

    await new Promise((resolve) => setTimeout(resolve, 150));
    await page.waitForChanges();

    expect(isOpen()).toBeFalsy();

    // re-open popover
    trigger.click();
    await new Promise((resolve) => setTimeout(resolve, 150));
    await page.waitForChanges();

    expect(isOpen()).toBeTruthy();

    // close via escape key
    page.doc
      .querySelector("swirl-popover")
      .shadowRoot.querySelector(".popover")
      .dispatchEvent(new KeyboardEvent("keydown", { code: "Escape" }));

    await new Promise((resolve) => setTimeout(resolve, 150));
    await page.waitForChanges();

    expect(isOpen()).toBeFalsy();
  });

  it("returns the open state", async () => {
    const page = await newSpecPage({
      components: [SwirlPopover, SwirlPopoverTrigger],
      html: template,
    });

    const popover = page.body.querySelector("swirl-popover");
    const trigger = page.body.querySelector("swirl-popover-trigger");

    expect(await popover.isOpen()).toBeFalsy();

    trigger.click();
    expect(await popover.isOpen()).toBeTruthy();

    await popover.close();
    expect(await popover.isOpen()).toBeFalsy();
    await new Promise((resolve) => setTimeout(resolve, 150));

    await popover.open();
    expect(await popover.isOpen()).toBeTruthy();

    popover.shadowRoot
      .querySelector(".popover")
      .dispatchEvent(new KeyboardEvent("keydown", { code: "Escape" }));
    expect(await popover.isOpen()).toBeFalsy();
  });
});
