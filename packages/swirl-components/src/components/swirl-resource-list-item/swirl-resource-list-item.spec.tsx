import { newSpecPage } from "@stencil/core/testing";

import { SwirlResourceList } from "../swirl-resource-list/swirl-resource-list";
import { SwirlTooltip } from "../swirl-tooltip/swirl-tooltip";
import { SwirlResourceListItem } from "./swirl-resource-list-item";

(global as any).MutationObserver = class {
  constructor() {}
  disconnect() {}
  observe() {}
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

  describe("progressive selection", () => {
    const renderItem = async (props: string) =>
      newSpecPage({
        components: [SwirlResourceListItem],
        html: `
          <div role="grid">
            <swirl-resource-list-item label="Label" ${props}></swirl-resource-list-item>
          </div>
        `,
      });

    const renderCheckboxItem = async (props = "") =>
      renderItem(`selectable="true" selection-mode="checkbox" ${props}`);

    it("renders the row as a plain button in checkbox mode", async () => {
      const page = await renderCheckboxItem();

      const content = page.root.querySelector(".resource-list-item__content");

      expect(content.tagName).toBe("BUTTON");
      expect(content.getAttribute("role")).toBeNull();
      expect(content.getAttribute("aria-checked")).toBeNull();
    });

    it("renders an interactive checkbox in checkbox mode", async () => {
      const page = await renderCheckboxItem();

      const checkbox = page.root.querySelector(".resource-list-item__checkbox");

      expect(checkbox.tagName).toBe("BUTTON");
      expect(checkbox.getAttribute("role")).toBe("checkbox");
      expect(checkbox.getAttribute("aria-checked")).toBe("false");
      expect(checkbox.getAttribute("aria-label")).toBe('Select "Label"');
      expect(checkbox.getAttribute("aria-hidden")).toBeNull();
    });

    it("keeps the checkbox aria-hidden in row mode", async () => {
      const page = await renderItem('selectable="true"');

      const checkbox = page.root.querySelector(".resource-list-item__checkbox");

      expect(checkbox.tagName).toBe("SPAN");
      expect(checkbox.getAttribute("aria-hidden")).toBe("true");
      expect(checkbox.getAttribute("role")).toBeNull();
    });

    it("toggles when the checkbox is clicked in checkbox mode", async () => {
      const page = await renderCheckboxItem();

      const spy = jest.fn();
      page.root.addEventListener("valueChange", spy);

      const checkbox = page.root.querySelector<HTMLElement>(
        ".resource-list-item__checkbox"
      );

      checkbox.click();
      await page.waitForChanges();

      expect(spy.mock.calls[0][0].detail).toBe(true);
      expect(checkbox.getAttribute("aria-checked")).toBe("true");

      checkbox.click();
      await page.waitForChanges();

      expect(spy.mock.calls[1][0].detail).toBe(false);
      expect(checkbox.getAttribute("aria-checked")).toBe("false");
    });

    it("does not bubble a checkbox click to the host", async () => {
      const page = await renderCheckboxItem();

      const spy = jest.fn();
      page.root.addEventListener("click", spy);

      page.root
        .querySelector<HTMLElement>(".resource-list-item__checkbox")
        .click();
      await page.waitForChanges();

      expect(spy).not.toHaveBeenCalled();
    });

    const renderInList = async (semantics: string, props: string) =>
      newSpecPage({
        components: [SwirlResourceList, SwirlResourceListItem],
        html: `
          <swirl-resource-list semantics="${semantics}">
            <swirl-resource-list-item label="Label" ${props}></swirl-resource-list-item>
          </swirl-resource-list>
        `,
      });

    it("keeps the checkbox out of the tab order inside a grid list", async () => {
      const page = await renderInList(
        "grid",
        'selectable="true" selection-mode="checkbox"'
      );

      expect(
        page.root
          .querySelector(".resource-list-item__checkbox")
          .getAttribute("tabindex")
      ).toBe("-1");
    });

    it("keeps a checkbox created after the first render out of the tab order", async () => {
      const page = await renderInList("grid", 'selectable="true"');

      page.root.querySelector("swirl-resource-list-item").selectionMode =
        "checkbox";
      await page.waitForChanges();

      expect(
        page.root
          .querySelector(".resource-list-item__checkbox")
          .getAttribute("tabindex")
      ).toBe("-1");
    });

    const focusIn = (el: HTMLElement) =>
      el.dispatchEvent(new Event("focusin", { bubbles: true }));

    const focusOut = (el: HTMLElement, nextFocusedElement?: HTMLElement) => {
      const event = new Event("focusout", { bubbles: true });

      Object.defineProperty(event, "relatedTarget", {
        value: nextFocusedElement ?? null,
      });

      el.dispatchEvent(event);
    };

    it("makes the checkbox tabbable while the row content has focus", async () => {
      const page = await renderInList(
        "grid",
        'selectable="true" selection-mode="checkbox"'
      );

      focusIn(
        page.root.querySelector<HTMLElement>(".resource-list-item__content")
      );
      await page.waitForChanges();

      expect(
        page.root
          .querySelector(".resource-list-item__checkbox")
          .getAttribute("tabindex")
      ).toBe("0");
    });

    it("keeps the checkbox tabbable while the checkbox itself has focus", async () => {
      const page = await renderInList(
        "grid",
        'selectable="true" selection-mode="checkbox"'
      );

      const content = page.root.querySelector<HTMLElement>(
        ".resource-list-item__content"
      );

      const checkbox = page.root.querySelector<HTMLElement>(
        ".resource-list-item__checkbox"
      );

      focusIn(content);
      focusOut(content, checkbox);
      focusIn(checkbox);
      await page.waitForChanges();

      expect(checkbox.getAttribute("tabindex")).toBe("0");
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

    it("removes the checkbox from the tab order when focus leaves from the checkbox", async () => {
      const page = await renderInList(
        "grid",
        'selectable="true" selection-mode="checkbox"'
      );

      const checkbox = page.root.querySelector<HTMLElement>(
        ".resource-list-item__checkbox"
      );

      focusIn(checkbox);
      checkbox.click();
      await page.waitForChanges();

      expect(checkbox.getAttribute("aria-checked")).toBe("true");
      expect(checkbox.getAttribute("tabindex")).toBe("0");

      focusOut(checkbox, page.body);
      await page.waitForChanges();

      expect(checkbox.getAttribute("tabindex")).toBe("-1");
    });

    it("renders the checkbox between the row content and the meta information", async () => {
      const page = await renderCheckboxItem('meta="Meta"');

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

    it("reflects the item's disabled state on the checkbox", async () => {
      const enabled = await renderCheckboxItem();

      expect(
        enabled.root
          .querySelector(".resource-list-item__checkbox")
          .hasAttribute("disabled")
      ).toBe(false);

      const disabled = await renderCheckboxItem('disabled="true"');

      expect(
        disabled.root
          .querySelector(".resource-list-item__checkbox")
          .hasAttribute("disabled")
      ).toBe(true);
    });

    it("does not toggle from a disabled checkbox", async () => {
      const page = await renderCheckboxItem('disabled="true"');

      const spy = jest.fn();
      page.root.addEventListener("valueChange", spy);

      page.root
        .querySelector<HTMLElement>(".resource-list-item__checkbox")
        .click();
      await page.waitForChanges();

      expect(spy).not.toHaveBeenCalled();
      expect(page.root.checked).toBe(false);
    });

    it("emits activate with the item when the row is clicked in checkbox mode", async () => {
      const page = await renderCheckboxItem();

      const spy = jest.fn();
      page.root.addEventListener("activate", spy);

      page.root
        .querySelector<HTMLElement>(".resource-list-item__content")
        .click();
      await page.waitForChanges();

      expect(spy).toHaveBeenCalled();
      expect(spy.mock.calls[0][0].detail).toBe(page.root);
    });

    it("emits activate from a checked row without changing the selection", async () => {
      const page = await renderCheckboxItem('checked="true"');

      const activate = jest.fn();
      const valueChange = jest.fn();

      page.root.addEventListener("activate", activate);
      page.root.addEventListener("valueChange", valueChange);

      page.root
        .querySelector<HTMLElement>(".resource-list-item__content")
        .click();
      await page.waitForChanges();

      expect(activate).toHaveBeenCalled();
      expect(valueChange).not.toHaveBeenCalled();
      expect(page.root.checked).toBe(true);
    });

    it("does not emit activate when the row is clicked in row mode", async () => {
      const page = await renderItem('selectable="true"');

      const spy = jest.fn();
      page.root.addEventListener("activate", spy);

      page.root
        .querySelector<HTMLElement>(".resource-list-item__content")
        .click();
      await page.waitForChanges();

      expect(spy).not.toHaveBeenCalled();
    });

    it("does not emit activate when the checkbox is clicked", async () => {
      const page = await renderCheckboxItem();

      const spy = jest.fn();
      page.root.addEventListener("activate", spy);

      page.root
        .querySelector<HTMLElement>(".resource-list-item__checkbox")
        .click();
      await page.waitForChanges();

      expect(spy).not.toHaveBeenCalled();
    });

    it("does not emit activate from a disabled row", async () => {
      const page = await renderCheckboxItem('disabled="true"');

      const spy = jest.fn();
      page.root.addEventListener("activate", spy);

      // The row container, since a disabled <button> swallows clicks anyway.
      page.root.querySelector<HTMLElement>(".resource-list-item").click();
      await page.waitForChanges();

      expect(spy).not.toHaveBeenCalled();
    });
  });
});
