const closestPassShadowSky = jest.fn();

jest.mock("../../utils", () => ({
  ...jest.requireActual("../../utils"),
  closestPassShadow: closestPassShadowSky,
}));

import { MockElement } from "@stencil/core/mock-doc";
import { newSpecPage } from "@stencil/core/testing";
import { SwirlOptionListItem } from "../swirl-option-list-item/swirl-option-list-item";
import { SwirlCheckbox } from "../swirl-checkbox/swirl-checkbox";

import { SwirlOptionList } from "./swirl-option-list";

(global as any).DocumentFragment = class DocumentFragment extends Node {};
(global as any).ShadowRoot = class ShadowRoot extends DocumentFragment {};

(MockElement.prototype as any).after = function () {
  var argArr = Array.prototype.slice.call(arguments);
  var docFrag = document.createDocumentFragment();

  for (var n = 0; n < argArr.length; n++) {
    docFrag.appendChild(argArr[n]);
  }

  this.parentNode.insertBefore(docFrag, this.nextSibling);
};

(MockElement.prototype as any).before = function () {
  var argArr = Array.prototype.slice.call(arguments);
  var docFrag = document.createDocumentFragment();

  for (var n = 0; n < argArr.length; n++) {
    docFrag.appendChild(argArr[n]);
  }

  this.parentNode.insertBefore(docFrag, this.previousSibling);
};

(global as any).MutationObserver = class {
  constructor() {}
  disconnect() {}
  observe() {}
};

describe("swirl-option-list", () => {
  beforeEach(() => {
    closestPassShadowSky.mockReset();
  });

  const template = `
    <swirl-option-list label="Option List" multi-select="true">
      <swirl-option-list-item label="This is an option" value="1"></swirl-option-list-item>
      <swirl-option-list-item label="This is an option" value="2"></swirl-option-list-item>
      <swirl-option-list-item label="This is an option" value="3"></swirl-option-list-item>
    </swirl-option-list>
  `;
  const templateWithSelectAll = `
    <swirl-option-list label="Option List" multi-select="true" show-select-all>
      <swirl-option-list-item label="This is an option" value="1"></swirl-option-list-item>
      <swirl-option-list-item label="This is an option" value="2"></swirl-option-list-item>
      <swirl-option-list-item label="This is an option" value="3"></swirl-option-list-item>
    </swirl-option-list>
  `;

  it("renders its children", async () => {
    const page = await newSpecPage({
      components: [SwirlOptionList],
      html: template,
    });

    expect(page.root).toEqualHtml(`
      <swirl-option-list label="Option List" multi-select="true">
        <swirl-visually-hidden role="alert"></swirl-visually-hidden>
        <div aria-label="Option List" aria-multiselectable="true" class="option-list" role="listbox">
          <swirl-option-list-item label="This is an option" value="1"></swirl-option-list-item>
          <swirl-option-list-item label="This is an option" value="2"></swirl-option-list-item>
          <swirl-option-list-item label="This is an option" value="3"></swirl-option-list-item>
        </div>
      </swirl-option-list>
    `);
  });

  it("fires valueChange events for single select", async () => {
    const page = await newSpecPage({
      components: [SwirlOptionList, SwirlOptionListItem],
      html: template,
    });

    const spy = jest.fn();

    page.root.addEventListener("valueChange", spy);

    page.root
      .querySelector(".option-list")
      .dispatchEvent(
        new KeyboardEvent("keydown", { code: "KeyA", metaKey: true })
      );

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail).toEqual(["1", "2", "3"]);
  });

  it("reflects value changes", async () => {
    const page = await newSpecPage({
      components: [SwirlOptionList, SwirlOptionListItem],
      html: template,
    });

    const items = Array.from(
      page.root.querySelectorAll("swirl-option-list-item")
    );

    for (const item of items) {
      expect(item.selected).toBe(false);
    }

    page.root.value = ["2", "3"];

    expect(items[0].selected).toBe(false);
    expect(items[1].selected).toBe(true);
    expect(items[2].selected).toBe(true);
  });

  it("makes items draggable", async () => {
    const page = await newSpecPage({
      components: [SwirlOptionList, SwirlOptionListItem],
      html: template,
    });

    const items = Array.from(
      page.root.querySelectorAll("swirl-option-list-item")
    );

    const assistiveText =
      page.root.querySelector<HTMLElement>('[role="alert"]');

    const optionList = page.root.querySelector<HTMLElement>(".option-list");

    for (const item of items) {
      expect(item.getAttribute("allow-drag")).toBeNull();
    }

    page.root.setAttribute("allow-drag", "true");
    await page.waitForChanges();

    for (const item of items) {
      expect(item.getAttribute("allow-drag")).toBe("true");
    }

    items[0]
      .querySelector<HTMLButtonElement>(".option-list-item__drag-handle")
      .dispatchEvent(new KeyboardEvent("keydown", { code: "Space" }));
    await page.waitForChanges();

    expect(assistiveText.innerHTML).toBe(
      "Item grabbed. Use arrow keys to move item up or down. Use spacebar to save position."
    );

    optionList.dispatchEvent(
      new KeyboardEvent("keydown", { code: "ArrowDown" })
    );
    await page.waitForChanges();

    expect(assistiveText.innerHTML).toBe("Current position: 2");

    optionList.dispatchEvent(new KeyboardEvent("keydown", { code: "ArrowUp" }));
    await page.waitForChanges();

    expect(assistiveText.innerHTML).toBe("Current position: 1");
  });

  it("renders a select all option when enabled", async () => {
    const page = await newSpecPage({
      components: [SwirlOptionList, SwirlOptionListItem, SwirlCheckbox],
      html: templateWithSelectAll,
    });

    const selectAll = page.root.querySelector(".option-list__select-all");
    const firstChild = page.root.querySelector(".option-list").children[0];

    expect(selectAll).not.toBeNull();
    expect(firstChild).toBe(selectAll);
  });

  it("toggles all items when clicking select all", async () => {
    const page = await newSpecPage({
      components: [SwirlOptionList, SwirlOptionListItem, SwirlCheckbox],
      html: templateWithSelectAll,
    });

    const spy = jest.fn();
    page.root.addEventListener("valueChange", spy);

    const selectAll = page.root.querySelector(".option-list__select-all");
    selectAll.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail).toEqual(["1", "2", "3"]);

    selectAll.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy.mock.calls[1][0].detail).toEqual([]);
  });

  it("updates select-all checkbox state based on selection", async () => {
    const page = await newSpecPage({
      components: [SwirlOptionList, SwirlOptionListItem, SwirlCheckbox],
      html: templateWithSelectAll,
    });

    const getCheckboxState = () =>
      (
        page.root.querySelector(
          ".option-list__select-all swirl-checkbox"
        ) as unknown as SwirlCheckbox
      ).checked;

    // None selected -> unchecked (false)
    expect(getCheckboxState()).toBe(false);

    // Partial selection -> indeterminate
    page.root.value = ["1"];
    await page.waitForChanges();
    expect(getCheckboxState()).toBe("indeterminate");

    // All selected -> checked (true)
    page.root.value = ["1", "2", "3"];
    await page.waitForChanges();
    expect(getCheckboxState()).toBe(true);

    // Back to none -> false
    page.root.value = [];
    await page.waitForChanges();
    expect(getCheckboxState()).toBe(false);
  });

  describe("keyboard navigation and selection", () => {
    it("ArrowDown moves focus from select-all to first item; ArrowUp returns to select-all", async () => {
      const page = await newSpecPage({
        components: [SwirlOptionList, SwirlOptionListItem],
        html: templateWithSelectAll,
      });

      const optionList = page.root.querySelector(".option-list");

      // Initially, select-all should be the focusable element
      let focused = page.root.querySelector('[tabindex="0"]');
      expect(
        focused?.classList.contains("option-list__select-all")
      ).toBeTruthy();

      // ArrowDown -> focus first item
      optionList.dispatchEvent(
        new KeyboardEvent("keydown", { code: "ArrowDown" })
      );
      await page.waitForChanges();
      focused = page.root.querySelector('[tabindex="0"]');
      expect(
        focused?.classList.contains("option-list__select-all")
      ).toBeFalsy();

      // ArrowUp -> back to select-all
      optionList.dispatchEvent(
        new KeyboardEvent("keydown", { code: "ArrowUp" })
      );
      await page.waitForChanges();
      focused = page.root.querySelector('[tabindex="0"]');
      expect(
        focused?.classList.contains("option-list__select-all")
      ).toBeTruthy();
    });

    it("Home focuses select all and End focuses last item", async () => {
      const page = await newSpecPage({
        components: [SwirlOptionList, SwirlOptionListItem],
        html: templateWithSelectAll,
      });

      const optionList = page.root.querySelector(".option-list");

      // Move to an item first
      optionList.dispatchEvent(
        new KeyboardEvent("keydown", { code: "ArrowDown" })
      );
      await page.waitForChanges();

      // End -> last item
      optionList.dispatchEvent(new KeyboardEvent("keydown", { code: "End" }));
      await page.waitForChanges();
      let focused = page.root.querySelector('[tabindex="0"]');
      const items = Array.from(
        page.root.querySelectorAll("swirl-option-list-item")
      );
      const lastItemRole = items[items.length - 1].querySelector(
        '[role="option"]'
      ) as HTMLElement;
      expect(focused).toBe(lastItemRole);
      //
      // // Home -> first item
      optionList.dispatchEvent(new KeyboardEvent("keydown", { code: "Home" }));
      await page.waitForChanges();
      focused = page.root.querySelector('[tabindex="0"]');
      expect(
        focused?.classList.contains("option-list__select-all")
      ).toBeTruthy();
    });

    it("Space/Enter select focused option and Space on select-all selects all", async () => {
      const page = await newSpecPage({
        components: [SwirlOptionList, SwirlOptionListItem, SwirlCheckbox],
        html: templateWithSelectAll,
      });

      const spy = jest.fn();
      page.root.addEventListener("valueChange", spy);

      const optionList = page.root.querySelector(".option-list");

      // Move focus to first item
      optionList.dispatchEvent(
        new KeyboardEvent("keydown", { code: "ArrowDown" })
      );
      await page.waitForChanges();

      let focused = page.root.querySelector('[tabindex="0"]') as HTMLElement;

      closestPassShadowSky.mockImplementation(() => focused);

      const spaceEvent = new KeyboardEvent("keydown", {
        code: "Space",
        bubbles: true,
      });
      focused.dispatchEvent(spaceEvent);
      await page.waitForChanges();

      expect(spy).toHaveBeenCalled();
      expect(spy.mock.calls[0][0].detail).toEqual(["1"]);

      closestPassShadowSky.mockReset();

      // Focus back to select-all
      optionList.dispatchEvent(
        new KeyboardEvent("keydown", { code: "ArrowUp" })
      );
      await page.waitForChanges();
      const selectAll = page.root.querySelector(
        ".option-list__select-all"
      ) as HTMLElement;

      // Press Space on select-all to select all
      const spaceOnSelectAll = new KeyboardEvent("keydown", {
        code: "Space",
        bubbles: true,
      });

      selectAll.dispatchEvent(spaceOnSelectAll);
      await page.waitForChanges();

      expect(spy.mock.calls[spy.mock.calls.length - 1][0].detail).toEqual([
        "1",
        "2",
        "3",
      ]);
    });
  });
});
