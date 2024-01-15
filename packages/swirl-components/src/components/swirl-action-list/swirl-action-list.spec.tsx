import { newSpecPage } from "@stencil/core/testing";

import { SwirlActionList } from "./swirl-action-list";

(global as any).MutationObserver = class {
  constructor() {}
  disconnect() {}
  observe() {}
};

describe("swirl-action-list", () => {
  const template = `
    <swirl-action-list>
      <button role="menuitem" tabindex="-1" type="button">Item</button>
      <button role="menuitem" tabindex="-1" type="button">Item</button>
    </swirl-action-list>
  `;

  it("renders its children", async () => {
    const page = await newSpecPage({
      components: [SwirlActionList],
      html: template,
    });

    expect(page.root).toEqualHtml(`
      <swirl-action-list>
        <mock:shadow-root>
          <div aria-orientation="vertical" class="action-list" role="menu" tabindex="0">
            <slot></slot>
          </div>
        </mock:shadow-root>
        <button role="menuitem" tabindex="-1" type="button">
          Item
        </button>
        <button role="menuitem" tabindex="-1" type="button">
          Item
        </button>
      </swirl-action-list>
    `);
  });

  it("cycles through the menu items", async () => {
    const page = await newSpecPage({
      components: [SwirlActionList],
      html: template,
    });

    const firstItemSpy = jest.fn();
    const secondItemSpy = jest.fn();

    const list = page.root.shadowRoot.querySelector(".action-list");
    const items = page.root.querySelectorAll<HTMLElement>('[role="menuitem"]');

    items[0].addEventListener("focus", firstItemSpy);
    items[1].addEventListener("focus", secondItemSpy);

    list.dispatchEvent(new KeyboardEvent("keydown", { code: "ArrowDown" }));
    (page.doc as any).activeElement = items[0];

    expect(firstItemSpy).toHaveBeenCalledTimes(1);
    expect(secondItemSpy).toHaveBeenCalledTimes(0);

    list.dispatchEvent(new KeyboardEvent("keydown", { code: "ArrowDown" }));
    (page.doc as any).activeElement = items[1];

    expect(firstItemSpy).toHaveBeenCalledTimes(1);
    expect(secondItemSpy).toHaveBeenCalledTimes(1);

    list.dispatchEvent(new KeyboardEvent("keydown", { code: "ArrowDown" }));
    (page.doc as any).activeElement = items[0];

    expect(firstItemSpy).toHaveBeenCalledTimes(2);
    expect(secondItemSpy).toHaveBeenCalledTimes(1);

    list.dispatchEvent(new KeyboardEvent("keydown", { code: "ArrowUp" }));
    (page.doc as any).activeElement = items[1];

    expect(firstItemSpy).toHaveBeenCalledTimes(2);
    expect(secondItemSpy).toHaveBeenCalledTimes(2);
  });
});
