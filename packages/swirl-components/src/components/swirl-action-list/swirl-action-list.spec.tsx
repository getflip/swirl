import { newSpecPage } from "@stencil/core/testing";

import { FlipActionList } from "./swirl-action-list";

describe("flip-action-list", () => {
  const template = `
    <flip-action-list>
      <button role="menuitem" tabindex="-1" type="button">Item</button>
      <button role="menuitem" tabindex="-1" type="button">Item</button>
    </flip-action-list>
  `;

  it("renders its children", async () => {
    const page = await newSpecPage({
      components: [FlipActionList],
      html: template,
    });

    expect(page.root).toEqualHtml(`
      <flip-action-list>
        <mock:shadow-root>
          <div aria-orientation="vertical" class="action-list" role="menu">
            <slot></slot>
          </div>
        </mock:shadow-root>
        <button role="menuitem" tabindex="-1" type="button">
          Item
        </button>
        <button role="menuitem" tabindex="-1" type="button">
          Item
        </button>
      </flip-action-list>
    `);
  });

  it("cycles through the menu items", async () => {
    const page = await newSpecPage({
      components: [FlipActionList],
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
