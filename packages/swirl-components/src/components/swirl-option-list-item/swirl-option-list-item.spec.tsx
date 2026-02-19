import { newSpecPage } from "@stencil/core/testing";

import { SwirlOptionListItem } from "./swirl-option-list-item";

describe("swirl-option-list-item", () => {
  it("renders with label and icon", async () => {
    const page = await newSpecPage({
      components: [SwirlOptionListItem],
      html: `<swirl-option-list-item
              icon="<swirl-icon-mention></swirl-icon-mention>"
              label="Option List Item"
              selected="true"
              disabled="false"
              context="single-select"
              value="Value">
            </swirl-option-list-item>`,
    });

    const id = page.root.children[0].id;

    expect(page.root).toEqualHtml(`
      <swirl-option-list-item context="single-select" disabled="false" icon="<swirl-icon-mention></swirl-icon-mention>" label="Option List Item" selected="true" value="Value">
        <div aria-labelledby="${id}-label" aria-selected="true" class="option-list-item option-list-item--context-single-select option-list-item--selected" id="${id}" part="option-list-item" role="option">
          <span class="option-list-item__icon">
            <swirl-icon-mention size="24"></swirl-icon-mention>
          </span>
          <span class="option-list-item__avatar"></span>
          <span class="option-list-item__label-container">
            <span class="option-list-item__label" id="${id}-label" part="option-list-item__label" style="white-space: nowrap;">
              Option List Item
            </span>
          </span>
          <span class="option-list-item__selection-icon">
            <swirl-icon-check-small size="24"></swirl-icon-check-small>
          </span>
        </div>
      </swirl-option-list-item>
    `);
  });

  it("renders with avatar", async () => {
    const page = await newSpecPage({
      components: [SwirlOptionListItem],
      html: `
        <swirl-option-list-item label="Option List Item" value="Value">
          <swirl-avatar label="John Doe" initials="PS" src="https://picsum.photos/id/433/144/144" slot="avatar"></swirl-avatar>
        </swirl-option-list-item>
      `,
    });

    expect(
      page.root
        .querySelector(".option-list-item__avatar")
        .querySelector("swirl-avatar")
    ).toBeDefined();
  });

  it("can be draggable", async () => {
    const page = await newSpecPage({
      components: [SwirlOptionListItem],
      html: `<swirl-option-list-item
              allow-drag="true"
              label="Option List Item"
              value="Value">
            </swirl-option-list-item>`,
    });

    const spy = jest.fn();

    const dragHandle = page.root.querySelector(
      ".option-list-item__drag-handle"
    );

    page.root.addEventListener("toggleDrag", spy);

    dragHandle.dispatchEvent(new KeyboardEvent("keydown", { code: "Space" }));

    expect(
      page.root
        .querySelector(".option-list-item__drag-handle")
        .getAttribute("aria-label")
    ).toBe('Move option "Option List Item"');

    expect(spy).toHaveBeenCalled();
  });

  it("renders indeterminate state in multi-select", async () => {
    const page = await newSpecPage({
      components: [SwirlOptionListItem],
      html: `<swirl-option-list-item
              context="multi-select"
              indeterminate="true"
              label="Option List Item"
              value="Value">
            </swirl-option-list-item>`,
    });

    const id = page.root.children[0].id;

    expect(page.root).toEqualHtml(`
      <swirl-option-list-item context="multi-select" indeterminate="true" label="Option List Item" value="Value">
        <div aria-labelledby="${id}-label" class="option-list-item option-list-item--context-multi-select option-list-item--indeterminate" id="${id}" part="option-list-item" role="option">
          <span class="option-list-item__checkbox">
            <span class="option-list-item__checkbox-box">
              <span class="option-list-item__checkbox-indeterminate-icon"></span>
            </span>
          </span>
          <span class="option-list-item__avatar"></span>
          <span class="option-list-item__label-container">
            <span class="option-list-item__label" id="${id}-label" part="option-list-item__label" style="white-space: nowrap;">
              Option List Item
            </span>
          </span>
        </div>
      </swirl-option-list-item>
    `);
  });
});
