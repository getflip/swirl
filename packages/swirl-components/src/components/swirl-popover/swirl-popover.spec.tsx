jest.mock("tabbable", () => ({
  tabbable: (element: HTMLElement | null) => (element ? [element] : []),
}));

import { newSpecPage, SpecPage } from "@stencil/core/testing";

import { SwirlPopoverTrigger } from "../swirl-popover-trigger/swirl-popover-trigger";
import { SwirlPopover } from "./swirl-popover";

(global as any).IntersectionObserver = class {
  constructor() {}
  disconnect() {}
  observe() {}
};

function isPopoverOpen(page: SpecPage) {
  return !page.doc
    .querySelector("swirl-popover")
    .shadowRoot.querySelector(".popover")
    .classList.contains("popover--inactive");
}

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
            <div class="popover popover--animation-scale-in-xy popover--inactive popover--padded popover--placement-undefined" popover="manual">
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

  it("opens on click and closes on blur", async () => {
    const page = await newSpecPage({
      components: [SwirlPopover, SwirlPopoverTrigger],
      html: template,
    });

    expect(isPopoverOpen(page)).toBeFalsy();

    // click trigger
    const trigger = page.root;

    trigger.click();
    await new Promise((resolve) => setTimeout(resolve, 150));
    await page.waitForChanges();

    expect(isPopoverOpen(page)).toBeTruthy();

    // blur popover
    page.win.dispatchEvent(new FocusEvent("focusin"));

    await new Promise((resolve) => setTimeout(resolve, 150));
    await page.waitForChanges();

    expect(isPopoverOpen(page)).toBeFalsy();
  });

  it("opens on click and closes on esc", async () => {
    const page = await newSpecPage({
      components: [SwirlPopover, SwirlPopoverTrigger],
      html: template,
    });

    expect(isPopoverOpen(page)).toBeFalsy();

    // click trigger
    const trigger = page.root;

    trigger.click();
    await new Promise((resolve) => setTimeout(resolve, 150));
    await page.waitForChanges();

    expect(isPopoverOpen(page)).toBeTruthy();

    // close via escape key
    page.doc
      .querySelector("swirl-popover")
      .shadowRoot.querySelector(".popover")
      .dispatchEvent(new KeyboardEvent("keydown", { code: "Escape" }));

    await new Promise((resolve) => setTimeout(resolve, 150));
    await page.waitForChanges();

    expect(isPopoverOpen(page)).toBeFalsy();
  });

  it("opens on click and closes on blur into iframe", async () => {
    const page = await newSpecPage({
      components: [SwirlPopover, SwirlPopoverTrigger],
      html: `
        <div>
          <div>
            <swirl-popover-trigger swirl-popover="popover">
              <button id="trigger">Trigger popover</button>
            </swirl-popover-trigger>
            <swirl-popover label="Popover" id="popover" style="display: none;">
              <div>Content</div>
            </swirl-popover>
          </div>
          <iframe id="iframe"></iframe>
        </div>
      `,
    });

    expect(isPopoverOpen(page)).toBeFalsy();

    // click trigger
    const trigger = page.body.querySelector<HTMLElement>("#trigger");

    trigger.click();
    await new Promise((resolve) => setTimeout(resolve, 150));
    await page.waitForChanges();

    expect(isPopoverOpen(page)).toBeTruthy();

    const iframe = page.body.querySelector<HTMLElement>("#iframe");
    iframe.click();

    await new Promise((resolve) => setTimeout(resolve, 150));
    await page.waitForChanges();

    expect(isPopoverOpen(page)).toBeFalsy();
  });

  it("does not close on blur when focus is lost to an element other then an iframe", async () => {
    const page = await newSpecPage({
      components: [SwirlPopover, SwirlPopoverTrigger],
      html: template,
    });

    expect(isPopoverOpen(page)).toBeFalsy();

    // click trigger
    const trigger = page.body.querySelector<HTMLElement>("#trigger");

    trigger.click();
    await new Promise((resolve) => setTimeout(resolve, 150));
    await page.waitForChanges();

    expect(isPopoverOpen(page)).toBeTruthy();

    page.win.dispatchEvent(new FocusEvent("blur"));

    await new Promise((resolve) => setTimeout(resolve, 150));
    await page.waitForChanges();

    expect(isPopoverOpen(page)).toBeTruthy();
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

  it("returns focus to trigger on close when returnFocusToTrigger is true", async () => {
    const page = await newSpecPage({
      components: [SwirlPopover, SwirlPopoverTrigger],
      html: template,
    });

    const popover =
      page.body.querySelector<HTMLSwirlPopoverElement>("swirl-popover");
    const trigger = page.body.querySelector<HTMLElement>("#trigger");

    const focusSpy = jest.spyOn(trigger, "focus");

    await popover.open(trigger);
    await new Promise((resolve) => setTimeout(resolve, 150));
    await page.waitForChanges();

    expect(isPopoverOpen(page)).toBeTruthy();

    await popover.close();
    await new Promise((resolve) => setTimeout(resolve, 150));
    await page.waitForChanges();

    expect(isPopoverOpen(page)).toBeFalsy();
    expect(focusSpy).toHaveBeenCalled();
  });

  it("does not return focus to trigger on close when returnFocusToTrigger is false", async () => {
    const page = await newSpecPage({
      components: [SwirlPopover, SwirlPopoverTrigger],
      html: `
        <div>
          <swirl-popover-trigger swirl-popover="popover">
            <button id="trigger">Trigger popover</button>
          </swirl-popover-trigger>
          <swirl-popover label="Popover" id="popover" return-focus-to-trigger="false" style="display: none;">
            <div>Content</div>
          </swirl-popover>
        </div>
      `,
    });

    const popover =
      page.body.querySelector<HTMLSwirlPopoverElement>("swirl-popover");
    const trigger = page.body.querySelector<HTMLElement>("#trigger");

    const focusSpy = jest.spyOn(trigger, "focus");

    await popover.open(trigger);
    await new Promise((resolve) => setTimeout(resolve, 150));
    await page.waitForChanges();

    expect(isPopoverOpen(page)).toBeTruthy();

    await popover.close();
    await new Promise((resolve) => setTimeout(resolve, 150));
    await page.waitForChanges();

    expect(isPopoverOpen(page)).toBeFalsy();
    expect(focusSpy).not.toHaveBeenCalled();
  });

  it("does not return focus to trigger when close is called with disableFocus", async () => {
    const page = await newSpecPage({
      components: [SwirlPopover, SwirlPopoverTrigger],
      html: template,
    });

    const popover =
      page.body.querySelector<HTMLSwirlPopoverElement>("swirl-popover");
    const trigger = page.body.querySelector<HTMLElement>("#trigger");

    const focusSpy = jest.spyOn(trigger, "focus");

    await popover.open(trigger);
    await new Promise((resolve) => setTimeout(resolve, 150));
    await page.waitForChanges();

    expect(isPopoverOpen(page)).toBeTruthy();

    await popover.close(true);
    await new Promise((resolve) => setTimeout(resolve, 150));
    await page.waitForChanges();

    expect(isPopoverOpen(page)).toBeFalsy();
    expect(focusSpy).not.toHaveBeenCalled();
  });
});
