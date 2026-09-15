import { newSpecPage } from "@stencil/core/testing";

import { SwirlResourceList } from "../swirl-resource-list/swirl-resource-list";
import { SwirlTooltip } from "../swirl-tooltip/swirl-tooltip";
import { SwirlResourceListItem } from "./swirl-resource-list-item";

(global as any).MutationObserver = class {
  constructor() {}
  disconnect() {}
  observe() {}
};

const focusIn = (el: HTMLElement) =>
  el.dispatchEvent(new Event("focusin", { bubbles: true }));

const focusOut = (el: HTMLElement, nextFocusedElement?: HTMLElement) => {
  const event = new Event("focusout", { bubbles: true });

  Object.defineProperty(event, "relatedTarget", {
    value: nextFocusedElement ?? null,
  });

  el.dispatchEvent(event);
};

describe("swirl-resource-list-item", () => {
  it("renders label, description and media", async () => {
    const page = await newSpecPage({
      components: [SwirlResourceListItem],
      html: `
        <div role="grid">
          <swirl-resource-list-item
            description="Description"
            label="Label"
          >
            <swirl-avatar label="John Doe" src="https://picsum.photos/id/433/144/144" slot="media"></swirl-avatar>
          </swirl-resource-list-item>
        </div>
      `,
    });

    const id = page.root.querySelector("[id]").id;

    expect(page.root).toEqualHtml(`
      <swirl-resource-list-item description="Description" label="Label" role="row">
        <div class="resource-list-item resource-list-item--interactive resource-list-item--label-weight-medium" role="gridcell">
          <button aria-label="Label" aria-labelledby="${id}" class="resource-list-item__content" part="resource-list-item__content" tabindex="0" type="button">
            <span class="resource-list-item__media">
              <swirl-avatar label="John Doe" src="https://picsum.photos/id/433/144/144" slot="media"></swirl-avatar>
            </span>
            <span class="resource-list-item__label-container">
              <span class="resource-list-item__label" id="${id}">
                Label
              </span>
              <span class="resource-list-item__description">
                Description
              </span>
            </span>
          </button>
          <span class="resource-list-item__control"></span>
        </div>
      </swirl-resource-list-item>
    `);
  });

  it("renders as link", async () => {
    const page = await newSpecPage({
      components: [SwirlResourceListItem],
      html: `
        <div role="grid">
          <swirl-resource-list-item href="#" label="Label" swirl-aria-current="page"></swirl-resource-list-item>
        </div>
      `,
    });

    const element = page.root.querySelector(".resource-list-item__content");

    expect(element.tagName).toBe("A");
    expect(element.getAttribute("href")).toBe("#");
    expect(element.getAttribute("aria-current")).toBe("page");
  });

  it("renders as checkbox", async () => {
    const page = await newSpecPage({
      components: [SwirlResourceListItem],
      html: `
        <div role="grid">
          <swirl-resource-list-item label="Label" selectable="true"></swirl-resource-list-item>
        </div>
      `,
    });

    const spy = jest.fn();

    page.root.addEventListener("valueChange", spy);

    const element = page.root.querySelector(
      ".resource-list-item__content"
    ) as HTMLElement;

    expect(element.getAttribute("role")).toBe("checkbox");
    expect(element.getAttribute("aria-checked")).toBe("false");

    element.click();
    await page.waitForChanges();
    expect(spy.mock.calls[0][0].detail).toBe(true);
    expect(element.getAttribute("aria-checked")).toBe("true");

    element.click();
    await page.waitForChanges();
    expect(spy.mock.calls[1][0].detail).toBe(false);
    expect(element.getAttribute("aria-checked")).toBe("false");
  });

  it("renders meta information", async () => {
    const page = await newSpecPage({
      components: [SwirlResourceListItem],
      html: `
        <div role="grid">
          <swirl-resource-list-item label="Label" meta="Meta"></swirl-resource-list-item>
        </div>
      `,
    });

    expect(page.root.querySelector(".resource-list-item__meta")).not.toBeNull();
  });

  it("renders a control", async () => {
    const page = await newSpecPage({
      components: [SwirlResourceListItem],
      html: `
        <div role="grid">
          <swirl-resource-list-item label="Label">
            <swirl-button label="Label" slot="control"></swirl-button>
          </swirl-resource-list-item>
        </div>
      `,
    });

    expect(
      page.root.querySelector(".resource-list-item__control").children.length
    ).toBe(1);
  });

  it("can be draggable", async () => {
    const page = await newSpecPage({
      components: [SwirlResourceListItem],
      html: `
        <div role="grid">
          <swirl-resource-list-item allow-drag="true" label="Resource List Item"></swirl-resource-list-item>
        </div>
      `,
    });

    const spy = jest.fn();

    const dragHandle = page.root.querySelector(
      ".resource-list-item__drag-handle"
    );

    page.root.addEventListener("toggleDrag", spy);

    dragHandle.dispatchEvent(new KeyboardEvent("keydown", { code: "Space" }));

    expect(
      page.root
        .querySelector(".resource-list-item__drag-handle")
        .getAttribute("aria-label")
    ).toBe('Move item "Resource List Item"');

    expect(spy).toHaveBeenCalled();
  });

  it("renders a plain text", async () => {
    const page = await newSpecPage({
      components: [SwirlResourceListItem],
      html: `
        <div role="grid">
          <swirl-resource-list-item label="<button>Button</button>" allow-html="false" description="<button>Description</button>"></swirl-resource-list-item>
        </div>
      `,
    });

    expect(
      page.root.querySelector<HTMLElement>(".resource-list-item__label")
        .innerText
    ).toBe("<button>Button</button>");

    expect(
      page.root.querySelector<HTMLElement>(".resource-list-item__description")
        .innerText
    ).toBe("<button>Description</button>");
  });

  it("renders label with tooltip when labelTooltip is provided", async () => {
    const page = await newSpecPage({
      components: [SwirlResourceListItem, SwirlTooltip],
      html: `
        <div role="grid">
          <swirl-resource-list-item
            label="Label with tooltip"
            label-tooltip="This is a tooltip"
            label-tooltip-position="right"
          ></swirl-resource-list-item>
        </div>
      `,
    });

    const tooltip = page.root.querySelector("swirl-tooltip");

    expect(tooltip).not.toBeNull();
    expect(tooltip.content).toBe("This is a tooltip");
    expect(tooltip.position).toBe("right");
  });

  it("renders the checkbox as a decorative element", async () => {
    const page = await newSpecPage({
      components: [SwirlResourceListItem],
      html: `
        <div role="grid">
          <swirl-resource-list-item
            label="Label"
            selectable="true"
          ></swirl-resource-list-item>
        </div>
      `,
    });

    const checkbox = page.root.querySelector(".resource-list-item__checkbox");

    expect(checkbox.tagName).toBe("SPAN");
    expect(checkbox.getAttribute("aria-hidden")).toBe("true");
    expect(checkbox.getAttribute("role")).toBeNull();
  });

  it("keeps the control out of the tab order until the row has focus", async () => {
    const page = await newSpecPage({
      components: [SwirlResourceList, SwirlResourceListItem],
      html: `
        <swirl-resource-list semantics="grid">
          <swirl-resource-list-item label="Label">
            <div slot="control"><button type="button">Options</button></div>
          </swirl-resource-list-item>
        </swirl-resource-list>
      `,
    });

    const content = page.root.querySelector<HTMLElement>(
      ".resource-list-item__content"
    );

    const control = page.root.querySelector<HTMLElement>(
      '[slot="control"] button'
    );

    expect(control.getAttribute("tabindex")).toBe("-1");

    focusIn(content);
    await page.waitForChanges();

    expect(control.getAttribute("tabindex")).toBe("0");

    focusOut(content);
    await page.waitForChanges();

    expect(control.getAttribute("tabindex")).toBe("-1");
  });

  it("keeps the control tabbable when focus moves to it from the row", async () => {
    const page = await newSpecPage({
      components: [SwirlResourceList, SwirlResourceListItem],
      html: `
        <swirl-resource-list semantics="grid">
          <swirl-resource-list-item label="Label">
            <div slot="control"><button type="button">Options</button></div>
          </swirl-resource-list-item>
        </swirl-resource-list>
      `,
    });

    const content = page.root.querySelector<HTMLElement>(
      ".resource-list-item__content"
    );

    const control = page.root.querySelector<HTMLElement>(
      '[slot="control"] button'
    );

    focusIn(content);
    await page.waitForChanges();

    expect(control.getAttribute("tabindex")).toBe("0");

    // Focus leaves the content for the control inside the same row, so the row
    // keeps focus and the control stays reachable.
    focusOut(content, control);
    await page.waitForChanges();

    expect(control.getAttribute("tabindex")).toBe("0");
  });

  it("renders the checkbox between the row content and the meta information", async () => {
    const page = await newSpecPage({
      components: [SwirlResourceListItem],
      html: `
        <div role="grid">
          <swirl-resource-list-item
            label="Label"
            meta="Meta"
            selectable="true"
          ></swirl-resource-list-item>
        </div>
      `,
    });

    const children = Array.from(
      page.root.querySelector(".resource-list-item").children
    ).map((child) => child.className);

    expect(children.indexOf("resource-list-item__checkbox")).toBe(
      children.indexOf("resource-list-item__content") + 1
    );
    expect(children.indexOf("resource-list-item__checkbox")).toBe(
      children.indexOf("resource-list-item__meta") - 1
    );
  });
});
