import { newSpecPage } from "@stencil/core/testing";

import { SwirlMenu } from "../swirl-menu/swirl-menu";
import { SwirlPopover } from "../swirl-popover/swirl-popover";
import { SwirlMenuItem } from "./swirl-menu-item";

(global as any).DocumentFragment = class DocumentFragment extends Node {};
(global as any).ShadowRoot = class ShadowRoot extends DocumentFragment {};

(global as any).MutationObserver = class {
  constructor() {}
  disconnect() {}
  observe() {}
};

describe("swirl-menu-item", () => {
  it("renders a menu item", async () => {
    const page = await newSpecPage({
      components: [SwirlPopover, SwirlMenu, SwirlMenuItem],
      html: `
        <swirl-popover label="Menu">
          <swirl-menu label="Menu">
            <swirl-menu-item label="Item"></swirl-menu-item>
          </swirl-menu>
        </swirl-popover>
      `,
    });

    expect(page.root.querySelector("swirl-menu-item")).toEqualHtml(`
      <swirl-menu-item label="Item">
        <mock:shadow-root>
          <div class="menu-item">
            <swirl-action-list-item intent="default" label="Item" truncatelabel=""></swirl-action-list-item>
            <slot></slot>
          </div>
        </mock:shadow-root>
      </swirl-menu-item>
    `);
  });

  it("renders an option list for selection variant", async () => {
    const page = await newSpecPage({
      components: [SwirlPopover, SwirlMenu, SwirlMenuItem],
      html: `
        <swirl-popover label="Menu">
          <swirl-menu label="Menu" variant="selection">
            <swirl-menu-item label="Item" value="Value"></swirl-menu-item>
          </swirl-menu>
        </swirl-popover>`,
    });

    expect(page.root.querySelector("swirl-menu-item")).toEqualHtml(`
      <swirl-menu-item label="Item" value="Value">
        <mock:shadow-root>
          <div class="menu-item">
            <swirl-option-list-item label="Item" swirlariarole="menuitemradio" truncatelabel="" value="Value"></swirl-option-list-item>
            <slot></slot>
          </div>
        </mock:shadow-root>
      </swirl-menu-item>
    `);
  });

  it("returns the parent menu", async () => {
    const page = await newSpecPage({
      components: [SwirlPopover, SwirlMenu, SwirlMenuItem],
      html: `
        <swirl-popover label="Menu">
          <swirl-menu id="root" label="Menu" variant="selection">
            <swirl-menu-item id="item" label="Item" value="Value"></swirl-menu-item>
          </swirl-menu>
        </swirl-popover>`,
    });

    const item = page.root.querySelector<HTMLSwirlMenuItemElement>("#item");

    expect((await item.getParentMenu()).id).toBe("root");
  });
});
