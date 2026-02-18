jest.mock("tabbable", () => ({
  tabbable: (element: HTMLElement | null) => (element ? [element] : []),
}));

import { newSpecPage } from "@stencil/core/testing";
import { SwirlDialog } from "./swirl-dialog";

(global as any).MutationObserver = class {
  constructor() {}
  disconnect() {}
  observe() {}
};

describe("swirl-dialog", () => {
  it("renders content and heading", async () => {
    const page = await newSpecPage({
      components: [SwirlDialog],
      html: `<swirl-dialog label="Dialog">Content</swirl-dialog>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-dialog label="Dialog">
        <mock:shadow-root>
          <dialog aria-describedby="content" aria-labelledby="label" class="dialog" closedby="none" role="alertdialog">
            <div class="dialog__backdrop"></div>
            <div class="dialog__body" part="dialog__body" role="document">
              <h2 class="dialog__heading" part="dialog__heading" id="label">
                Dialog
              </h2>
              <div class="dialog__content" part="dialog__content" id="content">
                <slot></slot>
              </div>
              <div class="dialog__controls"></div>
            </div>
          </dialog>
        </mock:shadow-root>
        Content
      </swirl-dialog>
    `);
  });

  it("renders left controls", async () => {
    const page = await newSpecPage({
      components: [SwirlDialog],
      html: `<swirl-dialog label="Dialog"><div slot="left-controls">Left</div></swirl-dialog>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-dialog label="Dialog">
        <mock:shadow-root>
          <dialog aria-describedby="content" aria-labelledby="label" class="dialog" closedby="none" role="alertdialog">
            <div class="dialog__backdrop"></div>
            <div class="dialog__body" part="dialog__body" role="document">
              <h2 class="dialog__heading" part="dialog__heading" id="label">
                Dialog
              </h2>
              <div class="dialog__content" part="dialog__content" id="content">
                <slot></slot>
              </div>
              <div class="dialog__controls">
                <div class="dialog__left_controls">
                  <slot name="left-controls"></slot>
                 </div>
              </div>
            </div>
          </dialog>
        </mock:shadow-root>
        <div slot="left-controls">Left</div>
      </swirl-dialog>
    `);
  });

  it("can hide the label", async () => {
    const page = await newSpecPage({
      components: [SwirlDialog],
      html: `<swirl-dialog hide-label label="Dialog">Content</swirl-dialog>`,
    });

    expect(page.root.shadowRoot.querySelector("h2")).toBeNull();

    expect(
      page.root.shadowRoot.querySelector(".dialog").getAttribute("aria-label")
    ).toBe("Dialog");
  });

  it("renders controls and fires events", async () => {
    const page = await newSpecPage({
      components: [SwirlDialog],
      html: `<swirl-dialog label="Dialog" primary-action-label="Primary" secondary-action-label="Secondary">Content</swirl-dialog>`,
    });

    const primarySpy = jest.fn();
    const secondarySpy = jest.fn();

    const buttons = page.root.shadowRoot.querySelectorAll("swirl-button");

    page.root.addEventListener("primaryAction", primarySpy);
    page.root.addEventListener("secondaryAction", secondarySpy);

    buttons[0].click();
    buttons[1].click();

    expect(buttons[0].getAttribute("label")).toEqual("Secondary");
    expect(buttons[1].getAttribute("label")).toEqual("Primary");

    expect(primarySpy).toHaveBeenCalled();
    expect(secondarySpy).toHaveBeenCalled();
  });

  it("emits toggleDialog event when dialog is toggled", async () => {
    const page = await newSpecPage({
      components: [SwirlDialog],
      html: `<swirl-dialog label="Dialog">Content</swirl-dialog>`,
    });

    const toggleSpy = jest.fn();
    page.root.addEventListener("toggleDialog", toggleSpy);

    const dialogEl = page.root.shadowRoot.querySelector("dialog");

    // Simulate toggle event with "open" state
    const openEvent = new Event("toggle") as any;
    openEvent.newState = "open";
    dialogEl.dispatchEvent(openEvent);

    expect(toggleSpy).toHaveBeenCalledTimes(1);
    expect(toggleSpy.mock.calls[0][0].detail.newState).toBe("open");
    expect(toggleSpy.mock.calls[0][0].detail.dialog).toBe(dialogEl);

    // Simulate toggle event with "closed" state
    const closeEvent = new Event("toggle") as any;
    closeEvent.newState = "closed";
    dialogEl.dispatchEvent(closeEvent);

    expect(toggleSpy).toHaveBeenCalledTimes(2);
    expect(toggleSpy.mock.calls[1][0].detail.newState).toBe("closed");
  });

  it("returns focus to custom element when returnFocusTo is set", async () => {
    const page = await newSpecPage({
      components: [SwirlDialog],
      html: `
        <button id="focus-return-target" type="button">Trigger</button>
        <swirl-dialog label="Dialog" return-focus-to="#focus-return-target">Content</swirl-dialog>
      `,
    });

    const dialog = page.root as HTMLSwirlDialogElement;
    const button = page.doc.querySelector<HTMLButtonElement>(
      "#focus-return-target"
    );

    const spy = jest.spyOn(button, "focus");

    await dialog.open();
    await new Promise((resolve) => setTimeout(resolve, 200));

    await page.root.close(true);
    await new Promise((resolve) => setTimeout(resolve, 200));

    expect(spy).toHaveBeenCalled();
  });
});
