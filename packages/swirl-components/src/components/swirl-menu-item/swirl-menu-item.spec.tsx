import { newSpecPage } from "@stencil/core/testing";

import { SwirlMenuItem } from "./swirl-menu-item";
import { SwirlMenu } from "../swirl-menu/swirl-menu";
import { SwirlPopover } from "../swirl-popover/swirl-popover";

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
        <swirl-popover label="Menu" trigger="trigger">
          <swirl-menu label="Menu" expanded>
            <swirl-menu-item label="Item"></swirl-menu-item>
          </swirl-menu>
        </swirl-popover>`,
    });

    expect(page.root.querySelector("swirl-menu-item")).toEqualHtml(`
      <swirl-menu-item label="Item">
        <mock:shadow-root>
          <div class="menu-item">
            <swirl-action-list-item intent="default" label="Item"></swirl-action-list-item>
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
        <swirl-popover label="Menu" trigger="trigger">
          <swirl-menu label="Menu" variant="selection">
            <swirl-menu-item label="Item" value="Value"></swirl-menu-item>
          </swirl-menu>
        </swirl-popover>`,
    });

    expect(page.root.querySelector("swirl-menu-item")).toEqualHtml(`
      <swirl-menu-item label="Item" value="Value">
        <mock:shadow-root>
          <div class="menu-item">
            <swirl-option-list-item label="Item" swirlariarole="menuitemradio" value="Value"></swirl-option-list-item>
            <slot></slot>
          </div>
        </mock:shadow-root>
      </swirl-menu-item>
    `);
  });
});
