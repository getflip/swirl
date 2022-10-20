import { newSpecPage } from "@stencil/core/testing";

import { FlipPopover } from "./flip-popover";

describe("flip-popover", () => {
  const template = `
    <div>
      <button id="trigger">Trigger popover</button>
      <flip-popover label="Popover" popover-id="popover" trigger="trigger">
        <div>Content</div>
      </flip-popover>
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
      components: [FlipPopover],
      html: template,
    });

    expect(page.body).toEqualHtml(`
      <div>
        <button aria-controls="popover" aria-expanded="false" aria-haspopup="dialog" id="trigger">Trigger popover</button>
        <flip-popover id="popover" label="Popover" popover-id="popover" trigger="trigger">
          <mock:shadow-root>
            <div class="popover popover--inactive">
              <div aria-hidden="true" aria-label="Popover" class="popover__content" role="dialog" tabindex="-1">
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
        </flip-popover>
      </div>
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
    const trigger = page.body.querySelector("#trigger") as HTMLElement;

    trigger.click();
    await page.waitForChanges();

    expect(isOpen()).toBeTruthy();

    // blur popover
    page.root.dispatchEvent(
      new FocusEvent("focusout", { relatedTarget: page.body })
    );

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
