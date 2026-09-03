jest.mock("tabbable", () => ({
  tabbable: (element: HTMLElement | null) => (element ? [element] : []),
}));

import { newSpecPage, SpecPage } from "@stencil/core/testing";

import { SwirlButton } from "../swirl-button/swirl-button";
import { SwirlPopover } from "../swirl-popover/swirl-popover";
import { SwirlPopoverTrigger } from "./swirl-popover-trigger";

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

const behaviorTemplate = `
  <div>
    <swirl-popover-trigger swirl-popover="popover">
      <button id="trigger">Trigger popover</button>
    </swirl-popover-trigger>
    <swirl-popover label="Popover" id="popover" style="display: none;">
      <div>Content</div>
    </swirl-popover>
  </div>
`;

describe("swirl-popover-trigger", () => {
  beforeAll(() => {
    class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    }

    global.ResizeObserver = ResizeObserver;
  });

  it("renders its trigger element and adds aria attributes", async () => {
    const page = await newSpecPage({
      components: [SwirlPopoverTrigger, SwirlButton],
      html: `
        <swirl-popover id="popover"></swirl-popover>
        <swirl-popover-trigger swirl-popover="popover">
          <swirl-button label="trigger"></swirl-button>
        </swirl-popover-trigger>
      `,
    });

    expect(page.root).toEqualHtml(`
      <swirl-popover-trigger swirl-popover="popover">
        <swirl-button label="trigger" swirl-aria-controls="popover" swirl-aria-expanded="false" swirl-aria-haspopup="dialog">
          <button aria-controls="popover" aria-expanded="false" aria-haspopup="dialog" class="button button--icon-position-start button--intent-default button--size-m button--text-align-center button--variant-ghost" type="button">
            <span class="button__icon"></span>
            <span class="button__label">
              trigger
            </span>
          </button>
        </swirl-button>
      </swirl-popover-trigger>
    `);
  });

  it("renders its trigger element and adds aria attributes when triggered via hover", async () => {
    const page = await newSpecPage({
      components: [SwirlPopoverTrigger, SwirlButton],
      html: `
        <swirl-popover id="popover"></swirl-popover>
        <swirl-popover-trigger swirl-popover="popover" trigger-on-hover="true">
          <swirl-button label="trigger"></swirl-button>
        </swirl-popover-trigger>
      `,
    });

    expect(page.root).toEqualHtml(`
      <swirl-popover-trigger swirl-popover="popover" trigger-on-hover="true">
        <swirl-button label="trigger" swirl-aria-haspopup="dialog">
          <button aria-haspopup="dialog" class="button button--icon-position-start button--intent-default button--size-m button--text-align-center button--variant-ghost" type="button">
            <span class="button__icon"></span>
            <span class="button__label">
              trigger
            </span>
          </button>
        </swirl-button>
      </swirl-popover-trigger>
    `);
  });

  it("renders its trigger element and adds aria attributes when triggered via focus", async () => {
    const page = await newSpecPage({
      components: [SwirlPopoverTrigger, SwirlButton],
      html: `
        <swirl-popover id="popover"></swirl-popover>
        <swirl-popover-trigger swirl-popover="popover" trigger="focus">
          <swirl-button label="trigger"></swirl-button>
        </swirl-popover-trigger>
      `,
    });

    expect(page.root).toEqualHtml(`
      <swirl-popover-trigger swirl-popover="popover" trigger="focus">
        <swirl-button label="trigger" swirl-aria-haspopup="dialog">
          <button aria-haspopup="dialog" class="button button--icon-position-start button--intent-default button--size-m button--text-align-center button--variant-ghost" type="button">
            <span class="button__icon"></span>
            <span class="button__label">
              trigger
            </span>
          </button>
        </swirl-button>
      </swirl-popover-trigger>
    `);
  });

  it("does not open the popover on focus by default", async () => {
    const page = await newSpecPage({
      components: [SwirlPopover, SwirlPopoverTrigger],
      html: behaviorTemplate,
    });

    const trigger = page.body.querySelector<HTMLElement>("#trigger");
    trigger.dispatchEvent(new FocusEvent("focusin", { bubbles: true }));

    await new Promise((resolve) => setTimeout(resolve, 150));
    await page.waitForChanges();

    expect(isPopoverOpen(page)).toBeFalsy();
  });

  it('opens the popover on focus when trigger="focus"', async () => {
    const page = await newSpecPage({
      components: [SwirlPopover, SwirlPopoverTrigger],
      html: behaviorTemplate,
    });

    page.root.trigger = "focus";
    await page.waitForChanges();

    const trigger = page.body.querySelector<HTMLElement>("#trigger");
    trigger.dispatchEvent(new FocusEvent("focusin", { bubbles: true }));

    await new Promise((resolve) => setTimeout(resolve, 150));
    await page.waitForChanges();

    expect(isPopoverOpen(page)).toBeTruthy();
  });

  it('opens the popover on focus when trigger="hover focus" (space-separated string)', async () => {
    const page = await newSpecPage({
      components: [SwirlPopover, SwirlPopoverTrigger],
      html: behaviorTemplate,
    });

    page.root.trigger = "hover focus";
    await page.waitForChanges();

    const trigger = page.body.querySelector<HTMLElement>("#trigger");
    trigger.dispatchEvent(new FocusEvent("focusin", { bubbles: true }));

    await new Promise((resolve) => setTimeout(resolve, 150));
    await page.waitForChanges();

    expect(isPopoverOpen(page)).toBeTruthy();
  });

  it("opens the popover on focus when trigger is an array containing 'focus'", async () => {
    const page = await newSpecPage({
      components: [SwirlPopover, SwirlPopoverTrigger],
      html: behaviorTemplate,
    });

    page.root.trigger = ["focus"];
    await page.waitForChanges();

    const trigger = page.body.querySelector<HTMLElement>("#trigger");
    trigger.dispatchEvent(new FocusEvent("focusin", { bubbles: true }));

    await new Promise((resolve) => setTimeout(resolve, 150));
    await page.waitForChanges();

    expect(isPopoverOpen(page)).toBeTruthy();
  });

  it("does not open the popover on click when trigger is set explicitly without 'click'", async () => {
    const page = await newSpecPage({
      components: [SwirlPopover, SwirlPopoverTrigger],
      html: behaviorTemplate,
    });

    page.root.trigger = ["focus"];
    await page.waitForChanges();

    page.root.click();
    await new Promise((resolve) => setTimeout(resolve, 150));
    await page.waitForChanges();

    expect(isPopoverOpen(page)).toBeFalsy();
  });

  it('opens the popover on focus when legacy trigger-on-hover="true" is set, and warns', async () => {
    const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});

    const page = await newSpecPage({
      components: [SwirlPopover, SwirlPopoverTrigger],
      html: `
        <div>
          <swirl-popover-trigger swirl-popover="popover" trigger-on-hover="true">
            <button id="trigger">Trigger popover</button>
          </swirl-popover-trigger>
          <swirl-popover label="Popover" id="popover" style="display: none;">
            <div>Content</div>
          </swirl-popover>
        </div>
      `,
    });

    const trigger = page.body.querySelector<HTMLElement>("#trigger");
    trigger.dispatchEvent(new FocusEvent("focusin", { bubbles: true }));

    await new Promise((resolve) => setTimeout(resolve, 150));
    await page.waitForChanges();

    expect(isPopoverOpen(page)).toBeTruthy();
    expect(warnSpy).toHaveBeenCalledWith(expect.stringMatching(/deprecated/));

    warnSpy.mockRestore();
  });

  it("does not open the popover on focus when 'click' is active without 'hover' (dead-click guard)", async () => {
    const page = await newSpecPage({
      components: [SwirlPopover, SwirlPopoverTrigger],
      html: behaviorTemplate,
    });

    page.root.trigger = ["click", "focus"];
    await page.waitForChanges();

    const trigger = page.body.querySelector<HTMLElement>("#trigger");
    trigger.dispatchEvent(new FocusEvent("focusin", { bubbles: true }));

    await new Promise((resolve) => setTimeout(resolve, 150));
    await page.waitForChanges();

    expect(isPopoverOpen(page)).toBeFalsy();
  });

  it("opens the popover on focus when 'click' and 'hover' are both active alongside 'focus'", async () => {
    const page = await newSpecPage({
      components: [SwirlPopover, SwirlPopoverTrigger],
      html: behaviorTemplate,
    });

    page.root.trigger = ["click", "hover", "focus"];
    await page.waitForChanges();

    const trigger = page.body.querySelector<HTMLElement>("#trigger");
    trigger.dispatchEvent(new FocusEvent("focusin", { bubbles: true }));

    await new Promise((resolve) => setTimeout(resolve, 150));
    await page.waitForChanges();

    expect(isPopoverOpen(page)).toBeTruthy();
  });

  it("warns and drops unsupported trigger values", async () => {
    const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});

    const page = await newSpecPage({
      components: [SwirlPopover, SwirlPopoverTrigger],
      html: behaviorTemplate,
    });

    page.root.trigger = "focus nope";
    await page.waitForChanges();

    expect(warnSpy).toHaveBeenCalledWith(expect.stringMatching(/nope/));

    const trigger = page.body.querySelector<HTMLElement>("#trigger");
    trigger.dispatchEvent(new FocusEvent("focusin", { bubbles: true }));

    await new Promise((resolve) => setTimeout(resolve, 150));
    await page.waitForChanges();

    expect(isPopoverOpen(page)).toBeTruthy();

    warnSpy.mockRestore();
  });

  it("opens the popover on focus without moving focus into the popover", async () => {
    const page = await newSpecPage({
      components: [SwirlPopover, SwirlPopoverTrigger],
      html: behaviorTemplate,
    });

    page.root.trigger = ["focus"];
    await page.waitForChanges();

    const trigger = page.body.querySelector<HTMLElement>("#trigger");
    const contentContainer = page.doc
      .querySelector("swirl-popover")
      .shadowRoot.querySelector<HTMLElement>(".popover__content");
    const contentFocusSpy = jest.spyOn(contentContainer, "focus");

    trigger.dispatchEvent(new FocusEvent("focusin", { bubbles: true }));

    await new Promise((resolve) => setTimeout(resolve, 150));
    await page.waitForChanges();

    expect(isPopoverOpen(page)).toBeTruthy();
    expect(contentFocusSpy).not.toHaveBeenCalled();
  });

  it("closes the popover on focusout when focus moves outside the trigger and popover", async () => {
    const page = await newSpecPage({
      components: [SwirlPopover, SwirlPopoverTrigger],
      html: behaviorTemplate,
    });

    page.root.trigger = ["focus"];
    await page.waitForChanges();

    const trigger = page.body.querySelector<HTMLElement>("#trigger");
    trigger.dispatchEvent(new FocusEvent("focusin", { bubbles: true }));
    await new Promise((resolve) => setTimeout(resolve, 150));
    await page.waitForChanges();

    expect(isPopoverOpen(page)).toBeTruthy();

    const outsideEl = page.doc.createElement("div");
    page.body.appendChild(outsideEl);

    trigger.dispatchEvent(
      new FocusEvent("focusout", { bubbles: true, relatedTarget: outsideEl })
    );
    // A comfortable margin above the popover's own 150ms close animation,
    // since the two timers are started independently.
    await new Promise((resolve) => setTimeout(resolve, 250));
    await page.waitForChanges();

    expect(isPopoverOpen(page)).toBeFalsy();
  });

  it("does not close the popover on focusout when focus moves into the popover", async () => {
    const page = await newSpecPage({
      components: [SwirlPopover, SwirlPopoverTrigger],
      html: behaviorTemplate,
    });

    page.root.trigger = ["focus"];
    await page.waitForChanges();

    const trigger = page.body.querySelector<HTMLElement>("#trigger");
    trigger.dispatchEvent(new FocusEvent("focusin", { bubbles: true }));
    await new Promise((resolve) => setTimeout(resolve, 150));
    await page.waitForChanges();

    expect(isPopoverOpen(page)).toBeTruthy();

    const popoverEl = page.doc.querySelector("swirl-popover");

    trigger.dispatchEvent(
      new FocusEvent("focusout", { bubbles: true, relatedTarget: popoverEl })
    );
    await new Promise((resolve) => setTimeout(resolve, 150));
    await page.waitForChanges();

    expect(isPopoverOpen(page)).toBeTruthy();
  });

  it("closes the popover on Escape when focused", async () => {
    const page = await newSpecPage({
      components: [SwirlPopover, SwirlPopoverTrigger],
      html: behaviorTemplate,
    });

    page.root.trigger = ["focus"];
    await page.waitForChanges();

    const trigger = page.body.querySelector<HTMLElement>("#trigger");
    trigger.dispatchEvent(new FocusEvent("focusin", { bubbles: true }));
    await new Promise((resolve) => setTimeout(resolve, 150));
    await page.waitForChanges();

    expect(isPopoverOpen(page)).toBeTruthy();

    trigger.dispatchEvent(
      new KeyboardEvent("keydown", { code: "Escape", bubbles: true })
    );
    // A comfortable margin above the popover's own 150ms close animation,
    // since the two timers are started independently.
    await new Promise((resolve) => setTimeout(resolve, 250));
    await page.waitForChanges();

    expect(isPopoverOpen(page)).toBeFalsy();
  });

  it("does not stop Escape from propagating when the popover is already closed", async () => {
    const page = await newSpecPage({
      components: [SwirlPopover, SwirlPopoverTrigger],
      html: behaviorTemplate,
    });

    page.root.trigger = ["focus"];
    await page.waitForChanges();

    const ancestorHandler = jest.fn();
    page.body.addEventListener("keydown", ancestorHandler);

    const trigger = page.body.querySelector<HTMLElement>("#trigger");
    trigger.dispatchEvent(
      new KeyboardEvent("keydown", { code: "Escape", bubbles: true })
    );

    expect(ancestorHandler).toHaveBeenCalled();
  });

  it("re-derives the trigger methods when the trigger prop changes at runtime", async () => {
    const page = await newSpecPage({
      components: [SwirlPopover, SwirlPopoverTrigger],
      html: behaviorTemplate,
    });

    page.root.trigger = ["focus"];
    await page.waitForChanges();

    page.root.trigger = ["click"];
    await page.waitForChanges();

    const trigger = page.body.querySelector<HTMLElement>("#trigger");
    trigger.dispatchEvent(new FocusEvent("focusin", { bubbles: true }));

    await new Promise((resolve) => setTimeout(resolve, 150));
    await page.waitForChanges();

    expect(isPopoverOpen(page)).toBeFalsy();
  });

  it("keeps a hover-opened popover open when focus moves onto the trigger and the pointer leaves", async () => {
    const page = await newSpecPage({
      components: [SwirlPopover, SwirlPopoverTrigger],
      html: behaviorTemplate,
    });

    page.root.trigger = ["hover", "focus"];
    await page.waitForChanges();

    const trigger = page.body.querySelector<HTMLElement>("#trigger");

    page.root.dispatchEvent(new MouseEvent("mouseenter"));
    await new Promise((resolve) => setTimeout(resolve, 150));
    await page.waitForChanges();

    expect(isPopoverOpen(page)).toBeTruthy();

    trigger.dispatchEvent(new FocusEvent("focusin", { bubbles: true }));
    await page.waitForChanges();

    page.root.dispatchEvent(new MouseEvent("mouseleave"));
    await new Promise((resolve) => setTimeout(resolve, 150));
    await page.waitForChanges();

    expect(isPopoverOpen(page)).toBeTruthy();
  });
});
