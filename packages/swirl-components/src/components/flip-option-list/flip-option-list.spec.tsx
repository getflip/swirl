import { MockElement } from "@stencil/core/mock-doc";
import { newSpecPage } from "@stencil/core/testing";
import { FlipOptionListItem } from "../flip-option-list-item/flip-option-list-item";

import { FlipOptionList } from "./flip-option-list";

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

describe("flip-option-list", () => {
  const template = `
    <flip-option-list label="Option List" multi-select="true">
      <flip-option-list-item label="This is an option" value="1"></flip-option-list-item>
      <flip-option-list-item label="This is an option" value="2"></flip-option-list-item>
      <flip-option-list-item label="This is an option" value="3"></flip-option-list-item>
    </flip-option-list>
  `;

  it("renders its children", async () => {
    const page = await newSpecPage({
      components: [FlipOptionList],
      html: template,
    });

    expect(page.root).toEqualHtml(`
      <flip-option-list label="Option List" multi-select="true">
        <flip-visually-hidden role="alert"></flip-visually-hidden>
        <div aria-label="Option List" aria-multiselectable="true" class="option-list" role="listbox" tabindex="0">
          <flip-option-list-item label="This is an option" value="1"></flip-option-list-item>
          <flip-option-list-item label="This is an option" value="2"></flip-option-list-item>
          <flip-option-list-item label="This is an option" value="3"></flip-option-list-item>
        </div>
      </flip-option-list>
    `);
  });

  it("fires valueChange events for single select", async () => {
    const page = await newSpecPage({
      components: [FlipOptionList, FlipOptionListItem],
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
      components: [FlipOptionList, FlipOptionListItem],
      html: template,
    });

    const items = Array.from(
      page.root.querySelectorAll("flip-option-list-item")
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
      components: [FlipOptionList, FlipOptionListItem],
      html: template,
    });

    const items = Array.from(
      page.root.querySelectorAll("flip-option-list-item")
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
});
